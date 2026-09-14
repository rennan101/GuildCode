/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — App: map-crystals.js
   ═══════════════════════════════════════════════════════════════ */

(function() {
    class _AppExtension {
async loadCustomMapPositions() {
        // 1. Carregamento imediato do cache local para renderização instantânea
        try {
            const cachedC = localStorage.getItem('guildcode_custom_map_positions_c_lang');
            const cachedCS = localStorage.getItem('guildcode_custom_map_positions_csharp_unity');
            if (cachedC) this.ui.customMapPositions.c_lang = JSON.parse(cachedC);
            if (cachedCS) this.ui.customMapPositions.csharp_unity = JSON.parse(cachedCS);

            const cachedBossC = localStorage.getItem('guildcode_custom_boss_assignments_c_lang');
            const cachedBossCS = localStorage.getItem('guildcode_custom_boss_assignments_csharp_unity');
            if (cachedBossC) this.ui.customBossAssignments.c_lang = JSON.parse(cachedBossC);
            if (cachedBossCS) this.ui.customBossAssignments.csharp_unity = JSON.parse(cachedBossCS);
        } catch (e) {
            console.warn('[App] Erro ao ler posições/bosses do mapa do localStorage:', e);
        }

        // 2. Carregamento do Firestore global apenas quando autenticado para evitar permission-denied
        const isAuth = typeof authManager !== 'undefined' && authManager && authManager.isAuthenticated && authManager.isAuthenticated();
        if (isAuth && typeof fbDB !== 'undefined' && fbDB) {
            try {
                const doc = await fbDB.collection('system_config').doc('map_positions').get();
                if (doc.exists) {
                    const data = doc.data() || {};
                    if (data.c_lang && Array.isArray(data.c_lang)) {
                        this.ui.customMapPositions.c_lang = data.c_lang;
                        localStorage.setItem('guildcode_custom_map_positions_c_lang', JSON.stringify(data.c_lang));
                    }
                    if (data.csharp_unity && Array.isArray(data.csharp_unity)) {
                        this.ui.customMapPositions.csharp_unity = data.csharp_unity;
                        localStorage.setItem('guildcode_custom_map_positions_csharp_unity', JSON.stringify(data.csharp_unity));
                    }

                    // Extração resiliente de bossAssignments (suporta nested data.bossAssignments e flat data['bossAssignments.xxx'])
                    const bossC = (data.bossAssignments && data.bossAssignments.c_lang) || data['bossAssignments.c_lang'];
                    const bossCS = (data.bossAssignments && data.bossAssignments.csharp_unity) || data['bossAssignments.csharp_unity'];

                    if (bossC && typeof bossC === 'object') {
                        this.ui.customBossAssignments.c_lang = bossC;
                        localStorage.setItem('guildcode_custom_boss_assignments_c_lang', JSON.stringify(bossC));
                    }
                    if (bossCS && typeof bossCS === 'object') {
                        this.ui.customBossAssignments.csharp_unity = bossCS;
                        localStorage.setItem('guildcode_custom_boss_assignments_csharp_unity', JSON.stringify(bossCS));
                    }
                }
            } catch (e) {
                if (e && e.code === 'permission-denied') return;
                console.warn('[App] Erro ao carregar posições/bosses customizados do Firestore:', e);
            }
        }
    }

    listenToCustomMapPositions() {
        if (typeof fbDB === 'undefined' || !fbDB) return;
        const isAuth = typeof authManager !== 'undefined' && authManager && authManager.isAuthenticated && authManager.isAuthenticated();
        if (!isAuth) return;

        // Se já existe um listener ativo, cancela antes de reatribuir
        if (this._mapPositionsUnsubscribe) {
            try { this._mapPositionsUnsubscribe(); } catch (_) {}
            this._mapPositionsUnsubscribe = null;
        }

        try {
            this._mapPositionsUnsubscribe = fbDB.collection('system_config').doc('map_positions').onSnapshot(snapshot => {
                if (!snapshot || !snapshot.exists) return;
                const data = snapshot.data() || {};
                let changed = false;

                if (data.c_lang && Array.isArray(data.c_lang)) {
                    this.ui.customMapPositions.c_lang = data.c_lang;
                    localStorage.setItem('guildcode_custom_map_positions_c_lang', JSON.stringify(data.c_lang));
                    changed = true;
                }
                if (data.csharp_unity && Array.isArray(data.csharp_unity)) {
                    this.ui.customMapPositions.csharp_unity = data.csharp_unity;
                    localStorage.setItem('guildcode_custom_map_positions_csharp_unity', JSON.stringify(data.csharp_unity));
                    changed = true;
                }

                // Extração resiliente de bossAssignments (nested e dot-notation)
                const bossC = (data.bossAssignments && data.bossAssignments.c_lang) || data['bossAssignments.c_lang'];
                const bossCS = (data.bossAssignments && data.bossAssignments.csharp_unity) || data['bossAssignments.csharp_unity'];

                if (bossC && typeof bossC === 'object') {
                    this.ui.customBossAssignments.c_lang = bossC;
                    localStorage.setItem('guildcode_custom_boss_assignments_c_lang', JSON.stringify(bossC));
                    changed = true;
                }
                if (bossCS && typeof bossCS === 'object') {
                    this.ui.customBossAssignments.csharp_unity = bossCS;
                    localStorage.setItem('guildcode_custom_boss_assignments_csharp_unity', JSON.stringify(bossCS));
                    changed = true;
                }

                // Se o mapa estiver visível na tela e não estiver em edição ativa, re-renderiza para atualizar todos os nós e conexões
                if (changed && !this.ui.isMapEditing && this.ui.currentScreen === 'dashboard') {
                    this.ui.renderMapConnections();
                    this.ui.renderMapSpotlightsAndNodes();
                }
            }, err => {
                if (err && err.code === 'permission-denied') return;
                console.warn('[App] Listener map_positions error:', err);
            });
        } catch (e) {
            console.warn('[App] Falha ao registrar snapshot de map_positions:', e);
        }
    }

    toggleMapEditMode() {
        const isMaster = typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.isAdmin());
        if (!isMaster) {
            this.ui.showToast('Apenas Professores e Administradores podem editar o mapa.', 'error');
            return;
        }

        if (this.ui.isMapEditing) {
            this.ui.exitMapEditMode();
        } else {
            this.ui.enterMapEditMode();
        }
    }

    async saveCustomMapPositions() {
        const isMaster = typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.isAdmin());
        if (!isMaster) {
            this.ui.showToast('Ação não autorizada.', 'error');
            return;
        }

        const isCSharp = this.ui.isCSharpWorld();
        const worldKey = isCSharp ? 'csharp_unity' : 'c_lang';
        const newPositions = this.ui.editedMapPositions && this.ui.editedMapPositions[worldKey];
        const newBossAssignments = this.ui.editedBossAssignments && this.ui.editedBossAssignments[worldKey];

        const hasPosChanges = newPositions && Array.isArray(newPositions);
        const hasBossChanges = newBossAssignments && typeof newBossAssignments === 'object';

        if (!hasPosChanges && !hasBossChanges) {
            this.ui.showToast('Nenhuma alteração detectada para salvar.', 'info');
            return;
        }

        // 1. Sempre preserva e aplica localmente imediatamente
        if (hasPosChanges) {
            this.ui.customMapPositions[worldKey] = JSON.parse(JSON.stringify(newPositions));
            localStorage.setItem(`guildcode_custom_map_positions_${worldKey}`, JSON.stringify(newPositions));
        }
        if (hasBossChanges) {
            this.ui.customBossAssignments[worldKey] = JSON.parse(JSON.stringify(newBossAssignments));
            localStorage.setItem(`guildcode_custom_boss_assignments_${worldKey}`, JSON.stringify(newBossAssignments));
        }

        try {
            // 2. Persiste no Firestore para todos os alunos daquele mundo
            if (typeof fbDB !== 'undefined' && fbDB) {
                const updatePayload = {
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                    updatedBy: (authManager && authManager.getCurrentUser()?.uid) || 'teacher',
                    updatedByName: (authManager && authManager.getDisplayName()) || 'Professor'
                };
                if (hasPosChanges) updatePayload[worldKey] = newPositions;
                if (hasBossChanges) {
                    // Grava em dot-notation e no objeto aninhado para compatibilidade universal
                    updatePayload[`bossAssignments.${worldKey}`] = newBossAssignments;
                    updatePayload.bossAssignments = {
                        ...(this.ui.customBossAssignments || {}),
                        [worldKey]: newBossAssignments
                    };
                }

                await fbDB.collection('system_config').doc('map_positions').set(updatePayload, { merge: true });
            }

            if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
                window.soundFX.playCheckCodeSuccess();
            }

            this.ui.showToast('Posições e alocações de Bosses salvas no servidor para todos os jogadores!', 'success');
            this.ui.exitMapEditMode();
        } catch (e) {
            console.error('[App] Erro ao salvar posições e bosses no Firestore:', e);
            const isPermError = e.code === 'permission-denied' || (e.message && e.message.toLowerCase().includes('permission'));
            if (isPermError) {
                this.ui.showToast('Configurações salvas localmente! Para sincronizar com todos os alunos, publique as regras atualizadas no Firebase Console.', 'warning', 8000);
            } else {
                this.ui.showToast('Erro ao sincronizar com o servidor: ' + (e.message || e), 'error');
            }
            this.ui.exitMapEditMode();
        }
    }

    async resetDefaultMapPositions() {
        const isMaster = typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.isAdmin());
        if (!isMaster) return;

        if (!confirm('Deseja restaurar as posições e chefes originais de fábrica para este mapa?')) return;

        const isCSharp = this.ui.isCSharpWorld();
        const worldKey = isCSharp ? 'csharp_unity' : 'c_lang';

        // 1. Limpa localmente primeiro
        this.ui.customMapPositions[worldKey] = null;
        this.ui.customBossAssignments[worldKey] = null;
        localStorage.removeItem(`guildcode_custom_map_positions_${worldKey}`);
        localStorage.removeItem(`guildcode_custom_boss_assignments_${worldKey}`);

        try {
            if (typeof fbDB !== 'undefined' && fbDB) {
                await fbDB.collection('system_config').doc('map_positions').set({
                    [worldKey]: firebase.firestore.FieldValue.delete(),
                    [`bossAssignments.${worldKey}`]: firebase.firestore.FieldValue.delete(),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
            }

            this.ui.showToast(`Posições e Bosses padrão restaurados para o mapa de ${isCSharp ? 'C#' : 'C'}.`, 'info');
            this.ui.exitMapEditMode();
        } catch (e) {
            console.error('[App] Erro ao resetar posições e bosses do mapa:', e);
            this.ui.showToast(`Posições e Bosses resetados localmente (aviso Firestore: ${e.message || e})`, 'warning');
            this.ui.exitMapEditMode();
        }
    }

    // ═══ CONFIGURAÇÃO DE CRISTAIS DE ASCENSÃO (PROFESSOR / MUNDO C#) ═══
    getDefaultCrystalRewardsConfig() {
        return {
            csharp_unity: {
                shop: 1,
                lastAbyss: 1,
                tournament: 4,
                lastBoss: 2,
                pvp: 2
            },
            c_lang: {
                shop: 3,
                lastAbyss: 0,
                tournament: 0,
                lastBoss: 0,
                pvp: 1
            }
        };
    }

    getCrystalRewardsConfig(worldKey = null) {
        if (!worldKey) {
            const isCSharp = (this.ui && typeof this.ui.isCSharpWorld === 'function') 
                ? this.ui.isCSharpWorld() 
                : (this.engine && this.engine.state && this.engine.state.worldId === 'csharp_unity');
            worldKey = isCSharp ? 'csharp_unity' : 'c_lang';
        }

        if (!this.crystalRewardsConfig) {
            this.crystalRewardsConfig = this.getDefaultCrystalRewardsConfig();
        }

        const defaults = this.getDefaultCrystalRewardsConfig()[worldKey] || { shop: 1, lastAbyss: 1, tournament: 4, lastBoss: 2, pvp: 2 };
        const active = this.crystalRewardsConfig[worldKey] || {};
        return { ...defaults, ...active };
    }

    async loadCrystalRewards() {
        this.crystalRewardsConfig = this.getDefaultCrystalRewardsConfig();

        // 1. Tenta carregar do cache local
        try {
            const cachedCS = localStorage.getItem('guildcode_crystal_rewards_csharp_unity');
            if (cachedCS) {
                this.crystalRewardsConfig.csharp_unity = { ...this.crystalRewardsConfig.csharp_unity, ...JSON.parse(cachedCS) };
            }
            const cachedC = localStorage.getItem('guildcode_crystal_rewards_c_lang');
            if (cachedC) {
                this.crystalRewardsConfig.c_lang = { ...this.crystalRewardsConfig.c_lang, ...JSON.parse(cachedC) };
            }
        } catch (e) {
            console.warn('[App] Erro ao carregar cristais do localStorage:', e);
        }

        // 2. Tenta buscar do Firestore apenas quando autenticado para evitar permission-denied
        const isAuth = typeof authManager !== 'undefined' && authManager && authManager.isAuthenticated && authManager.isAuthenticated();
        if (isAuth && typeof fbDB !== 'undefined' && fbDB) {
            try {
                const doc = await fbDB.collection('system_config').doc('crystal_rewards').get();
                if (doc && doc.exists) {
                    const data = doc.data();
                    if (data.csharp_unity && typeof data.csharp_unity === 'object') {
                        this.crystalRewardsConfig.csharp_unity = { ...this.crystalRewardsConfig.csharp_unity, ...data.csharp_unity };
                        localStorage.setItem('guildcode_crystal_rewards_csharp_unity', JSON.stringify(this.crystalRewardsConfig.csharp_unity));
                    }
                    if (data.c_lang && typeof data.c_lang === 'object') {
                        this.crystalRewardsConfig.c_lang = { ...this.crystalRewardsConfig.c_lang, ...data.c_lang };
                        localStorage.setItem('guildcode_crystal_rewards_c_lang', JSON.stringify(this.crystalRewardsConfig.c_lang));
                    }
                }
            } catch (e) {
                if (e && e.code === 'permission-denied') return;
                console.warn('[App] Erro ao buscar crystal_rewards do Firestore:', e);
            }
        }
    }

    listenToCrystalRewards() {
        if (typeof fbDB === 'undefined' || !fbDB) return;
        const isAuth = typeof authManager !== 'undefined' && authManager && authManager.isAuthenticated && authManager.isAuthenticated();
        if (!isAuth) return;

        // Se já existe um listener ativo, cancela antes de reatribuir
        if (this._crystalRewardsUnsubscribe) {
            try { this._crystalRewardsUnsubscribe(); } catch (_) {}
            this._crystalRewardsUnsubscribe = null;
        }

        try {
            this._crystalRewardsUnsubscribe = fbDB.collection('system_config').doc('crystal_rewards').onSnapshot(snapshot => {
                if (!snapshot || !snapshot.exists) return;
                const data = snapshot.data();
                if (!this.crystalRewardsConfig) this.crystalRewardsConfig = this.getDefaultCrystalRewardsConfig();

                if (data.csharp_unity && typeof data.csharp_unity === 'object') {
                    this.crystalRewardsConfig.csharp_unity = { ...this.crystalRewardsConfig.csharp_unity, ...data.csharp_unity };
                    localStorage.setItem('guildcode_crystal_rewards_csharp_unity', JSON.stringify(this.crystalRewardsConfig.csharp_unity));
                }
                if (data.c_lang && typeof data.c_lang === 'object') {
                    this.crystalRewardsConfig.c_lang = { ...this.crystalRewardsConfig.c_lang, ...data.c_lang };
                    localStorage.setItem('guildcode_crystal_rewards_c_lang', JSON.stringify(this.crystalRewardsConfig.c_lang));
                }

                // Re-renderiza a loja ou tela ranqueada se estiver ativa
                const activeScreen = document.querySelector('.screen.active');
                if (activeScreen) {
                    if (activeScreen.id === 'screen-shop' && this.ui) {
                        this.ui.renderGuildShop();
                    } else if (activeScreen.id === 'screen-ranked' && this.ui && this._cachedRankedData) {
                        this.ui.renderRankedScreen(this._cachedRankedData.challenges, this._cachedRankedData.leaderboard);
                    }
                }
            }, err => {
                if (err && err.code === 'permission-denied') return;
                console.warn('[App] Listener crystal_rewards error:', err);
            });
        } catch (e) {
            console.warn('[App] Falha ao registrar snapshot de crystal_rewards:', e);
        }
    }

    openCrystalConfigModal() {
        const isMaster = (typeof authManager !== 'undefined') && (
            (typeof authManager.isTeacher === 'function' && authManager.isTeacher()) ||
            (typeof authManager.isAdmin === 'function' && authManager.isAdmin()) ||
            (typeof authManager.isAdminEmail === 'function' && authManager.isAdminEmail(authManager.currentUser?.email || authManager.userData?.email))
        );
        if (!isMaster) {
            this.ui.showToast('Apenas Professores e Mestres podem configurar os Cristais de Ascensão.', 'error');
            return;
        }

        const modal = document.getElementById('modal-crystal-config');
        if (!modal) return;

        const config = this.getCrystalRewardsConfig('csharp_unity');
        const shopIn = document.getElementById('crystal-cfg-shop');
        const abyssIn = document.getElementById('crystal-cfg-lastAbyss');
        const tourIn = document.getElementById('crystal-cfg-tournament');
        const bossIn = document.getElementById('crystal-cfg-lastBoss');
        const pvpIn = document.getElementById('crystal-cfg-pvp');

        if (shopIn) shopIn.value = config.shop ?? 1;
        if (abyssIn) abyssIn.value = config.lastAbyss ?? 1;
        if (tourIn) tourIn.value = config.tournament ?? 4;
        if (bossIn) bossIn.value = config.lastBoss ?? 2;
        if (pvpIn) pvpIn.value = config.pvp ?? 2;

        this.recalculateCrystalPreview();
        modal.classList.remove('hidden');
    }

    closeCrystalConfigModal() {
        const modal = document.getElementById('modal-crystal-config');
        if (modal) modal.classList.add('hidden');
    }

    recalculateCrystalPreview() {
        const shop = Math.max(0, parseInt(document.getElementById('crystal-cfg-shop')?.value || '0', 10));
        const abyss = Math.max(0, parseInt(document.getElementById('crystal-cfg-lastAbyss')?.value || '0', 10));
        const tour = Math.max(0, parseInt(document.getElementById('crystal-cfg-tournament')?.value || '0', 10));
        const boss = Math.max(0, parseInt(document.getElementById('crystal-cfg-lastBoss')?.value || '0', 10));
        const pvp = Math.max(0, parseInt(document.getElementById('crystal-cfg-pvp')?.value || '0', 10));

        const total = shop + abyss + tour + boss + pvp;
        const pts = (total * 0.5).toFixed(1);

        const totalEl = document.getElementById('crystal-cfg-preview-total');
        const ptsEl = document.getElementById('crystal-cfg-preview-points');
        if (totalEl) totalEl.textContent = `${total} Cristal${total === 1 ? '' : 'is'}`;
        if (ptsEl) ptsEl.textContent = `+${pts} Pontos`;
    }

    async saveCurrentCrystalRewards() {
        const isMaster = typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.isAdmin());
        if (!isMaster) return;

        const shop = Math.max(0, parseInt(document.getElementById('crystal-cfg-shop')?.value || '1', 10));
        const abyss = Math.max(0, parseInt(document.getElementById('crystal-cfg-lastAbyss')?.value || '1', 10));
        const tour = Math.max(0, parseInt(document.getElementById('crystal-cfg-tournament')?.value || '4', 10));
        const boss = Math.max(0, parseInt(document.getElementById('crystal-cfg-lastBoss')?.value || '2', 10));
        const pvp = Math.max(0, parseInt(document.getElementById('crystal-cfg-pvp')?.value || '2', 10));

        const newConfig = {
            shop,
            lastAbyss: abyss,
            tournament: tour,
            lastBoss: boss,
            pvp
        };

        if (!this.crystalRewardsConfig) this.crystalRewardsConfig = this.getDefaultCrystalRewardsConfig();
        this.crystalRewardsConfig.csharp_unity = newConfig;

        // 1. Salva localmente
        localStorage.setItem('guildcode_crystal_rewards_csharp_unity', JSON.stringify(newConfig));

        // 2. Persiste no Firestore
        try {
            if (typeof fbDB !== 'undefined' && fbDB) {
                await fbDB.collection('system_config').doc('crystal_rewards').set({
                    csharp_unity: newConfig,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                    updatedBy: (authManager && authManager.getCurrentUser()?.uid) || 'teacher',
                    updatedByName: (authManager && authManager.getDisplayName()) || 'Professor'
                }, { merge: true });
            }

            if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
                window.soundFX.playCheckCodeSuccess();
            }

            this.ui.showToast('Recompensas de Cristais de Ascensão atualizadas para o Mundo C#!', 'success');
            this.closeCrystalConfigModal();

            // Re-renderiza a loja se estiver aberta
            const activeScreen = document.querySelector('.screen.active');
            if (activeScreen && activeScreen.id === 'screen-shop') {
                this.ui.renderGuildShop();
            }
        } catch (e) {
            console.error('[App] Erro ao salvar crystal_rewards no Firestore:', e);
            this.ui.showToast('Configurações salvas localmente (Aviso Firestore: ' + (e.message || e) + ')', 'warning');
            this.closeCrystalConfigModal();
            if (this.ui && document.querySelector('.screen.active')?.id === 'screen-shop') {
                this.ui.renderGuildShop();
            }
        }
    }

    async resetDefaultCrystalRewards() {
        const isMaster = typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.isAdmin());
        if (!isMaster) return;

        if (!confirm('Deseja restaurar a distribuição padrão de Cristais de Ascensão para o Mundo C#? (1 Loja, 1 Abismo, 4 Torneio, 2 Boss, 2 PVP)')) {
            return;
        }

        const defaults = this.getDefaultCrystalRewardsConfig().csharp_unity;
        document.getElementById('crystal-cfg-shop').value = defaults.shop;
        document.getElementById('crystal-cfg-lastAbyss').value = defaults.lastAbyss;
        document.getElementById('crystal-cfg-tournament').value = defaults.tournament;
        document.getElementById('crystal-cfg-lastBoss').value = defaults.lastBoss;
        document.getElementById('crystal-cfg-pvp').value = defaults.pvp;

        this.recalculateCrystalPreview();
        await this.saveCurrentCrystalRewards();
    }

    cancelMapEditMode() {
        this.ui.exitMapEditMode();
        this.ui.showToast('Edição cancelada. Nenhuma alteração foi salva.', 'info');
    }

    closeArtifactDetailModal() {
        if (this.ui) this.ui.closeArtifactDetailModal();
    }

    openArtifactDetailModal(artifactId) {
        if (this.ui) this.ui.openArtifactDetailModal(artifactId);
    }
    }

    if (typeof GuildCodeApp !== "undefined") {
        const descriptors = Object.getOwnPropertyDescriptors(_AppExtension.prototype);
        delete descriptors.constructor;
        Object.defineProperties(GuildCodeApp.prototype, descriptors);
    }
})();
