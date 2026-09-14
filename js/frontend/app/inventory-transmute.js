/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — App: inventory-transmute.js
   ═══════════════════════════════════════════════════════════════ */

(function() {
    class _AppExtension {
openShopScreen() {
        this.ui.showScreen('shop');
        this.ui.renderGuildShop();
    }

    openInventoryScreen() {
        this.ui.showScreen('inventory');
        this.ui.renderInventoryScreen();
    }

    switchInventoryTab(tab, btnEl) {
        document.querySelectorAll('.inv-tab').forEach(b => b.classList.remove('active'));
        const targetBtn = btnEl || document.querySelector(`.inv-tab[data-tab="${tab}"]`);
        if (targetBtn) targetBtn.classList.add('active');
        this.ui.renderInventoryGrid(tab);
    }

    async handleStatPointDistribute(avatarId, stat, delta) {
        if (!this.engine) return;
        const res = this.engine.distributeStatPoint(avatarId, stat, delta);
        if (res.success) {
            await this.engine.saveToCloud();
            // Re-renderiza só o card (não a tela inteira, para não perder estado das abas)
            const previewId = this.ui._inventoryPreviewId || avatarId;
            this.ui.renderInventoryAvatarCard(previewId);
        }
    }

    async handleStatPointReset(avatarId) {
        if (!this.engine) return;
        const res = this.engine.resetAvatarStatPoints(avatarId);
        if (res.success) {
            await this.engine.saveToCloud();
            const previewId = this.ui._inventoryPreviewId || avatarId;
            this.ui.renderInventoryAvatarCard(previewId);
        }
    }

    // ─── HANDLERS DE ARTEFATOS (INVENTÁRIO, EQUIPAR, DESTRUIR & MODAL) ───
    async handleArtifactEquip(avatarId, artifactId) {
        if (!this.engine) return;
        const res = this.engine.equipArtifact(avatarId, artifactId);
        if (res.success) {
            await this.engine.saveToCloud();
            this.ui.showToast(`Artefato equipado com sucesso!`, 'success');
            this.ui.closeArtifactDetailModal();
            const previewId = this.ui._inventoryPreviewId || avatarId;
            this.ui.renderInventoryAvatarCard(previewId);
            this.ui.renderInventoryGrid(this.ui._currentInventoryTab || res.slot);
        } else {
            this.ui.showToast(res.reason || 'Erro ao equipar artefato.', 'error');
        }
    }

    async handleArtifactUnequip(avatarId, slot) {
        if (!this.engine) return;
        const res = this.engine.unequipArtifact(avatarId, slot);
        if (res.success) {
            await this.engine.saveToCloud();
            this.ui.showToast(`Artefato desequipado.`, 'info');
            this.ui.closeArtifactDetailModal();
            const previewId = this.ui._inventoryPreviewId || avatarId;
            this.ui.renderInventoryAvatarCard(previewId);
            this.ui.renderInventoryGrid(this.ui._currentInventoryTab || slot);
        }
    }

    async handleArtifactDestroy(artifactId) {
        if (!this.engine) return;
        const art = this.engine.getArtifactById(artifactId);
        if (!art) return;

        if (!confirm(`Deseja realmente destruir "${art.name}" (${art.stars}★) para liberar espaço no inventário? Esta ação não pode ser desfeita.`)) {
            return;
        }

        const res = this.engine.destroyArtifact(artifactId);
        if (res.success) {
            await this.engine.saveToCloud();
            this.ui.showToast(`Artefato destruído. Espaço liberado no inventário!`, 'info');
            this.ui.closeArtifactDetailModal();
            this.ui.renderInventoryGrid(this.ui._currentInventoryTab || art.type);
        } else {
            this.ui.showToast(res.reason || 'Não foi possível destruir o artefato.', 'error');
        }
    }

    // ─── TRANSMUTAÇÃO E FORJA DE ARTEFATOS ───
    startArtifactTransmute(targetId) {
        if (!this.ui) return;
        this.ui.openTransmuteMode(targetId);
    }

    cancelArtifactTransmute() {
        if (!this.ui) return;
        this.ui.closeTransmuteMode();
    }

    toggleTransmuteMaterial(materialId) {
        if (!this.ui) return;
        this.ui.toggleTransmuteMaterial(materialId);
    }

    async executeArtifactTransmute() {
        if (!this.engine || !this.ui) return;
        const targetId = this.ui._transmuteTargetId;
        const materialIds = this.ui._transmuteMaterialIds || [];

        if (!targetId || materialIds.length === 0) {
            this.ui.showToast('Selecione ao menos um artefato como catalisador de transmutação.', 'warning');
            return;
        }

        const res = this.engine.transmuteArtifact(targetId, materialIds);
        if (res.success) {
            await this.engine.saveToCloud();
            if (window.soundFX && typeof window.soundFX.playFanfare === 'function') {
                window.soundFX.playFanfare();
            } else if (window.soundFX && typeof window.soundFX.playMagic === 'function') {
                window.soundFX.playMagic();
            }

            const target = res.target;
            const msg = res.levelsGained > 0
                ? `Transmutação bem-sucedida! ${target.name} subiu para o Nível +${target.level}!`
                : `Transmutação concluída! +${materialIds.length} artefatos consumidos para alimentar ${target.name}.`;

            this.ui.showToast(msg, 'success');
            this.ui.closeTransmuteMode();

            // Atualiza card do avatar se equipado, grid e painel
            const previewAvId = this.ui._inventoryPreviewId || (this.engine.state.currentAvatarId || '02');
            this.ui.renderInventoryAvatarCard(previewAvId);
            this.ui.renderAvatarArtifactSlots(previewAvId);
            this.ui.renderInventoryGrid(this.ui._currentInventoryTab || target.type);
            this.ui.openArtifactDetailModal(target.id);
        } else {
            this.ui.showToast(res.reason || 'Falha ao executar transmutação.', 'error');
        }
    }

    triggerArtifactDrop(chapterId, actIdx) {
        if (typeof ArtifactsManager === 'undefined') return;

        const isCSharp = this.engine && this.engine.state && this.engine.state.worldId === 'csharp_unity';
        const activeChapters = (isCSharp && typeof CSHARP_CHAPTERS !== 'undefined') ? CSHARP_CHAPTERS : (typeof CHAPTERS !== 'undefined' ? CHAPTERS : []);
        const ch = activeChapters.find(c => c.id === chapterId);
        if (!ch) return;

        // Configuração definida pelo professor na atividade (última missão) ou fallback por capítulo
        const act = (ch.activities && ch.activities[actIdx]) ? ch.activities[actIdx] : null;
        const artifactRewardCfg = (act && act.artifactReward) || ch.artifactReward || {};
        let minS = artifactRewardCfg.minStars || (chapterId >= 8 ? 4 : (chapterId >= 4 ? 3 : 3));
        let maxS = artifactRewardCfg.maxStars || (chapterId >= 8 ? 6 : (chapterId >= 4 ? 5 : 4));

        const droppedArtifact = ArtifactsManager.generateDrop({
            baseId: artifactRewardCfg.artifactId || 'random',
            minStars: minS,
            maxStars: maxS,
            chapterId: chapterId
        });

        // Verifica capacidade do inventário
        if (this.engine.isInventoryFull(droppedArtifact.type)) {
            this.showArtifactFullModal(droppedArtifact);
            return;
        }

        // Adiciona à conta e sincroniza na nuvem
        const addRes = this.engine.addArtifact(droppedArtifact);
        if (!addRes.success) {
            this.showArtifactFullModal(droppedArtifact);
            return;
        }

        this.engine.saveToCloud(true);
        this.showArtifactRewardModal(droppedArtifact);
    }

    showArtifactRewardModal(artifact) {
        this._lastDroppedArtifact = artifact;
        const modal = document.getElementById('modal-artifact-reward');
        if (!modal) return;

        const nameEl = document.getElementById('artifact-reward-name');
        const starsEl = document.getElementById('artifact-reward-stars');
        const imgEl = document.getElementById('artifact-reward-img');
        const statEl = document.getElementById('artifact-reward-stat-badge');
        const typeEl = document.getElementById('artifact-reward-type-badge');
        const loreEl = document.getElementById('artifact-reward-lore');
        const capEl = document.getElementById('artifact-reward-capacity-txt');
        const glowEl = document.getElementById('artifact-modal-glow');
        const pedGlowEl = document.getElementById('artifact-pedestal-glow');

        if (nameEl) nameEl.textContent = artifact.name;
        if (starsEl) starsEl.innerHTML = ArtifactsManager.renderStarsHtml(artifact.stars, 6);
        if (imgEl) imgEl.src = artifact.asset;
        if (statEl) statEl.textContent = artifact.displayValue;
        if (typeEl) typeEl.textContent = artifact.slotLabel.toUpperCase();
        if (loreEl) loreEl.textContent = artifact.lore || '';

        const inCat = this.engine ? this.engine.getArtifactsByType(artifact.type).length : 0;
        if (capEl) capEl.textContent = `Espaço na Categoria (${artifact.slotLabel}): ${inCat} / 24`;

        const rarityColor = artifact.rarityColor || '#fbbf24';
        if (glowEl) glowEl.style.background = `radial-gradient(circle, ${rarityColor}33, transparent 70%)`;
        if (pedGlowEl) pedGlowEl.style.setProperty('--rarity-glow', rarityColor);

        if (window.soundFX && typeof window.soundFX.playItemReward === 'function') {
            window.soundFX.playItemReward();
        }

        modal.classList.remove('hidden');
    }

    showArtifactFullModal(droppedArtifact) {
        const modal = document.getElementById('modal-artifact-full');
        const desc = document.getElementById('modal-artifact-full-desc');
        const preview = document.getElementById('modal-artifact-full-preview');
        if (!modal) return;

        if (desc) {
            desc.innerHTML = `O artefato <strong>${droppedArtifact.name}</strong> (${droppedArtifact.stars}★, ${droppedArtifact.displayValue}) foi desintegrado porque sua aba de <strong>${droppedArtifact.slotLabel}</strong> está cheia (24/24).`;
        }
        if (preview) {
            preview.innerHTML = `
                <img src="${droppedArtifact.asset}" style="width:36px;height:36px;opacity:0.6;filter:grayscale(60%);">
                <div style="text-align:left;">
                    <div style="font-size:0.8rem;font-weight:700;color:var(--text-dim);">${droppedArtifact.name}</div>
                    <div style="font-size:0.7rem;color:var(--red);">${droppedArtifact.stars}★ • ${droppedArtifact.displayValue} [DESTRUÍDO]</div>
                </div>
            `;
        }

        if (window.soundFX && typeof window.soundFX.playDanger === 'function') {
            window.soundFX.playDanger();
        }

        modal.classList.remove('hidden');
    }

    closeArtifactFullModal() {
        const modal = document.getElementById('modal-artifact-full');
        if (modal) modal.classList.add('hidden');
    }

    handleArtifactFullOpenInventory() {
        this.closeArtifactFullModal();
        this.openInventoryScreen();
    }

    handleArtifactRewardClaim() {
        const modal = document.getElementById('modal-artifact-reward');
        if (modal) modal.classList.add('hidden');
        const ch = this.ui.currentChapterData;
        if (ch) {
            this.ui.openChapter(ch.id);
        } else {
            this.ui.showScreen('dashboard');
            this.ui.renderDashboard();
        }
    }

    handleArtifactGoInventory() {
        const modal = document.getElementById('modal-artifact-reward');
        if (modal) modal.classList.add('hidden');
        const art = this._lastDroppedArtifact;
        this.openInventoryScreen();
        if (art && art.type) {
            this.switchInventoryTab(art.type);
        }
    }

    handleArtifactFarmAgain() {
        const modal = document.getElementById('modal-artifact-reward');
        if (modal) modal.classList.add('hidden');
        const actIdx = this.engine ? this.engine.state.currentActivity : 0;
        const validActIdx = actIdx >= 0 ? actIdx : 0;
        this.startActivity(validActIdx, true);
        if (this.ui && typeof this.ui.showToast === 'function') {
            this.ui.showToast('Nova variação de desafio carregada para farm de artefato!', 'info');
        }
    }


    async handleBuyShopItem(itemId, cost, amountValue = 1) {
        try {
            const res = this.engine.redeemShopReward(itemId, cost, amountValue);
            if (res.success) {
                if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
                    window.soundFX.playCheckCodeSuccess();
                }

                // Salva progresso na nuvem
                await this.engine.saveToCloud();

                // Atualiza a interface da loja e do topo
                this.ui.renderGuildShop();
                this.ui.renderDashboard();

                let msg = 'Item resgatado com sucesso!';
                if (itemId === 'absence') {
                    msg = `Pergaminho de Presença resgatado! Total: ${res.total}/${res.max} faltas abonadas no semestre.`;
                } else if (itemId === 'extra_point') {
                    msg = `Cristal de Ascensão resgatado! Total: +${res.total}/${res.max} pontos extras acumulados.`;
                } else if (itemId === 'streak_freeze') {
                    msg = `Escudo de Ofensiva ativado! Você possui ${res.freezes}/2 congelamentos estocados.`;
                } else if (itemId === 'raid_potion') {
                    msg = `Poção de Cura Individual obtida! Total em estoque: ${res.total}/${res.max} para Boss Raids.`;
                } else if (itemId === 'raid_group_potion') {
                    msg = `Elixir de Cura Coletiva obtido! Total em estoque: ${res.total}/${res.max} para Boss Raids.`;
                }

                this.ui.showToast(msg, 'success');
            }
        } catch (err) {
            if (window.soundFX && typeof window.soundFX.playError === 'function') {
                window.soundFX.playError();
            }
            this.ui.showToast(err.message || 'Erro ao resgatar item.', 'error');
        }
    }

    // ─── O ABISMO DO CÓDIGO (CONTROLLERS) ───
    }

    if (typeof GuildCodeApp !== "undefined") {
        const descriptors = Object.getOwnPropertyDescriptors(_AppExtension.prototype);
        delete descriptors.constructor;
        Object.defineProperties(GuildCodeApp.prototype, descriptors);
    }
})();
