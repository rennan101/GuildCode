/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — App: subclasses-party.js
   ═══════════════════════════════════════════════════════════════ */

(function() {
    class _AppExtension {
checkSubclassAwakening() {
        const isTeacher = typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.isAdmin());
        if (isTeacher) {
            if (this.engine.state.subclass !== 'cheatcode') {
                this.engine.chooseSubclass('cheatcode', authManager.currentUser);
                this.engine.saveToCloud();
            }
            return;
        }

        const level = this.engine.state.level || 1;
        const subclass = this.engine.state.subclass;

        if (level >= 5 && !subclass) {
            this.selectedSubclassAwakening = 'hardcoder';
            this.ui.renderSubclassAwakeningModal(this.selectedSubclassAwakening);
        }
    }

    selectSubclassAwakening(subclassId) {
        this.selectedSubclassAwakening = subclassId;
        if (window.soundFX && typeof window.soundFX.playClick === 'function') {
            window.soundFX.playClick();
        }
        this.ui.renderSubclassAwakeningModal(this.selectedSubclassAwakening);
    }

    async confirmSubclassChoice() {
        const subclassId = this.selectedSubclassAwakening || 'hardcoder';
        const res = this.engine.chooseSubclass(subclassId, typeof authManager !== 'undefined' ? authManager.currentUser : null);

        if (res.success) {
            await this.engine.saveToCloud();
            const modal = document.getElementById('modal-subclass-awakening');
            if (modal) modal.classList.add('hidden');

            if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
                window.soundFX.playCheckCodeSuccess();
            }

            const sc = res.subclass;
            this.ui.showToast(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> DESPERTAR CONCLUÍDO! Você agora é um ${sc.name.toUpperCase()} (${sc.title})!`, 'success');
            this.ui.renderDashboard();
        } else {
            this.ui.showToast(res.reason || 'Não foi possível selecionar a subclasse.', 'error');
        }
    }

    openSkillTreeModal() {
        const state = this.engine.state;
        const user = typeof authManager !== 'undefined' ? authManager.currentUser : null;
        const isTeacher = typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.isAdmin());

        if (isTeacher) {
            this.engine.state.subclass = 'cheatcode';
        }

        if (!isTeacher && (!state.subclass || (state.level || 1) < 5)) {
            if ((state.level || 1) >= 5 && !state.subclass) {
                this.checkSubclassAwakening();
                return;
            }
            this.ui.showToast('A Árvore de Habilidades é liberada a partir do Nível 5!', 'info');
            return;
        }

        this.ui.renderSkillTreeModal(this.engine.state, user);
    }

    closeSkillTreeModal() {
        const modal = document.getElementById('modal-skill-tree');
        if (modal) modal.classList.add('hidden');
    }

    async handleUnlockSkill(skillId) {
        const user = typeof authManager !== 'undefined' ? authManager.currentUser : null;
        const res = this.engine.unlockSkill(skillId, user);

        if (res.success) {
            await this.engine.saveToCloud();
            this.ui.renderSkillTreeModal(this.engine.state, user);
            if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
                window.soundFX.playCheckCodeSuccess();
            }
            this.ui.showToast(`✦ Habilidade "${res.skill.name}" Desbloqueada!`, 'success');
        } else {
            this.ui.showToast(res.reason || 'Não foi possível desbloquear a habilidade.', 'error');
        }
    }

    // ─── PARTY SYSTEM (ESQUADRÃO DE 4 INTEGRANTES) ───
    async openPartyScreen() {
        if (typeof partyManager === 'undefined') {
            this.ui.showToast('Sistema de Party não inicializado.', 'error');
            return;
        }

        this.ui.showScreen('party');
        const container = document.getElementById('party-content');
        if (container) {
            container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;padding:4rem;"><div class="spinner"></div></div>';
        }

        try {
            if (typeof authManager !== 'undefined' && !authManager.userData && authManager.currentUser) {
                await authManager.loadUserData();
            }

            const classCode = await authManager.getEffectiveGuildCode();
            const party = await partyManager.getUserParty(true);
            const invites = await partyManager.getPendingInvitesForUser();
            const guildParties = await partyManager.getGuildParties(classCode);

            // Sincroniza level/avatar/subclass atual do jogador no documento da party
            if (party) {
                await partyManager.syncMyMemberData();
            }

            // Inicia o listener de atualizações em tempo real
            if (party && party.id) {
                partyManager.startPartyListener(party.id, (updatedParty) => {
                    if (this.ui.currentScreen === 'party') {
                        this.ui.renderPartyScreen(updatedParty, invites, guildParties);
                    }
                });
            } else {
                partyManager.stopPartyListener();
            }

            this.ui.renderPartyScreen(party, invites, guildParties);
            if (this.ui && typeof this.ui.updateNavigationBadges === 'function') {
                this.ui.updateNavigationBadges();
            }
        } catch (e) {
            console.warn('[Party] Erro ao carregar tela de Party:', e);
            this.ui.renderPartyScreen(null, [], []);
        }
    }

    async handleCreateParty() {
        const input = document.getElementById('input-create-party-name');
        const name = input ? input.value.trim() : '';

        try {
            const party = await partyManager.createParty(name);
            if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
                window.soundFX.playCheckCodeSuccess();
            }
            this.ui.showToast(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Party "${party.name}" forjada com sucesso!`, 'success');
            if (typeof chatUI !== 'undefined') chatUI.refreshAccess();
            await this.openPartyScreen();
        } catch (e) {
            this.ui.showToast(e.message || 'Erro ao forjar Party.', 'error');
        }
    }

    async handleRenameParty() {
        if (!partyManager.currentParty) return;
        const currentName = partyManager.currentParty.name || '';
        const newName = prompt('Digite o novo nome para o seu Esquadrão (Party):', currentName);
        if (newName === null) return; // Cancelou
        
        const cleanName = newName.trim();
        if (!cleanName) {
            this.ui.showToast('O nome da Party não pode ficar em branco.', 'error');
            return;
        }
        if (cleanName === currentName) return;

        try {
            await partyManager.renameParty(cleanName);
            this.ui.showToast(`Party renomeada para "${cleanName}" com sucesso!`, 'success');
            await this.openPartyScreen();
        } catch (e) {
            this.ui.showToast(e.message || 'Erro ao renomear Party.', 'error');
        }
    }

    async handleJoinPartyCode(partyCode) {
        if (!partyCode) {
            this.ui.showToast('Digite o código da Party para ingressar.', 'info');
            return;
        }

        try {
            const party = await partyManager.joinPartyByCode(partyCode);
            if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
                window.soundFX.playCheckCodeSuccess();
            }
            this.ui.showToast(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Você ingressou na Party "${party.name}"!`, 'success');
            if (typeof chatUI !== 'undefined') chatUI.refreshAccess();
            await this.openPartyScreen();
        } catch (e) {
            this.ui.showToast(e.message || 'Erro ao ingressar na Party.', 'error');
        }
    }

    async handleLeaveParty() {
        if (!confirm('Deseja realmente sair desta Party?')) return;

        try {
            await partyManager.leaveParty();
            this.ui.showToast('Você saiu da Party.', 'info');
            if (typeof chatUI !== 'undefined') chatUI.refreshAccess();
            await this.openPartyScreen();
        } catch (e) {
            this.ui.showToast(e.message || 'Erro ao sair da Party.', 'error');
        }
    }

    async openPartyInviteModal() {
        const modal = document.getElementById('modal-party-invite');
        const listEl = document.getElementById('party-invite-candidates-list');
        if (!modal || !listEl) return;

        listEl.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;padding:2rem;"><div class="spinner"></div></div>';
        modal.classList.remove('hidden');

        try {
            const classCode = await authManager.getEffectiveGuildCode();
            const allMembers = await authManager.getGuildMembers(classCode);
            const myUid = authManager.currentUser?.uid;
            const partyMemberUids = new Set((partyManager.currentParty?.members || []).map(m => m.uid));

            // Filtra colegas que não estão nesta party e não são o próprio usuário
            const candidates = allMembers.filter(m => m.uid !== myUid && !partyMemberUids.has(m.uid));
            this.ui.renderPartyInviteModal(candidates);
        } catch (e) {
            console.warn('[Party] Erro ao carregar candidatos para convite:', e);
            this.ui.renderPartyInviteModal([]);
        }
    }

    closePartyInviteModal() {
        const modal = document.getElementById('modal-party-invite');
        if (modal) modal.classList.add('hidden');
    }

    async handleInvitePartyMember(targetUid, targetName) {
        try {
            await partyManager.invitePlayer(targetUid, targetName);
            this.closePartyInviteModal();
            this.ui.showToast(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> Convite de Party enviado para ${targetName}!`, 'success');
        } catch (e) {
            this.ui.showToast(e.message || 'Erro ao enviar convite.', 'error');
        }
    }

    async handleAcceptPartyInvite(partyCode) {
        try {
            const party = await partyManager.acceptInvite(partyCode);
            if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
                window.soundFX.playCheckCodeSuccess();
            }
            this.ui.showToast(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Convite aceito! Bem-vindo à Party "${party.name}"!`, 'success');
            if (typeof chatUI !== 'undefined') chatUI.refreshAccess();
            await this.openPartyScreen();
        } catch (e) {
            this.ui.showToast(e.message || 'Erro ao aceitar convite.', 'error');
        }
    }

    async handleDeclinePartyInvite(partyCode) {
        try {
            await partyManager.declineInvite(partyCode);
            this.ui.showToast('Convite recusado.', 'info');
            await this.openPartyScreen();
        } catch (e) {
            this.ui.showToast(e.message || 'Erro ao recusar convite.', 'error');
        }
    }

    async handleKickPartyMember(targetUid, targetName) {
        if (!confirm(`Deseja realmente expulsar ${targetName} da Party?`)) return;

        try {
            await partyManager.kickMember(targetUid);
            this.ui.showToast(`${targetName} foi removido da Party.`, 'info');
            if (typeof chatUI !== 'undefined') chatUI.refreshAccess();
            await this.openPartyScreen();
        } catch (e) {
            this.ui.showToast(e.message || 'Erro ao expulsar integrante.', 'error');
        }
    }

    openGachaModal() {
        if (window.gachaUI) {
            window.gachaUI.openGachaModal();
        }
    }

    openGlossaryScreen(topicId = null) {
        if (window.glossaryUI) {
            window.glossaryUI.openGlossary(topicId);
        } else {
            this.ui.showScreen('glossary');
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // MODO DE EDIÇÃO DO MAPA (PROFESSOR) & SINCRONIZAÇÃO DE COORDENADAS
    // ═══════════════════════════════════════════════════════════════
    }

    if (typeof GuildCodeApp !== "undefined") {
        const descriptors = Object.getOwnPropertyDescriptors(_AppExtension.prototype);
        delete descriptors.constructor;
        Object.defineProperties(GuildCodeApp.prototype, descriptors);
    }
})();
