/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — App: admin-guild.js
   ═══════════════════════════════════════════════════════════════ */

(function() {
    class _AppExtension {
async openAdminDashboard() {
        if (typeof authManager === 'undefined' || !authManager.isTeacher()) {
            this.ui.showToast('Acesso restrito a Mestres', 'error');
            return;
        }
        this.ui.showScreen('admin');

        // 1. Instant cache render (0ms response)
        if (this._cachedAdminData) {
            this.ui.renderAdminDashboard(
                this._cachedAdminData.guilds,
                this._cachedAdminData.currentGuild,
                this._cachedAdminData.students,
                this._cachedAdminData.parties || []
            );
        } else {
            const container = document.getElementById('admin-content');
            if (container) {
                container.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:5rem 2rem;gap:1.2rem;"><div class="spinner"></div><div style="font-family:var(--font-display);color:var(--purple-bright);font-size:0.85rem;letter-spacing:0.12em;">CARREGANDO PAINEL DO MESTRE...</div></div>';
            }
        }

        try {
            if (typeof authManager !== 'undefined' && !authManager.userData && authManager.currentUser) {
                await authManager.loadUserData();
            }

            const timeoutPromise = (promise, ms = 5000, fallback = null) => 
                Promise.race([promise, new Promise(res => setTimeout(() => res(fallback), ms))]);

            const guilds = (await timeoutPromise(authManager.getTeacherGuilds(), 5000, [])) || [];
            let currentGuild = null;
            let currentCode = authManager.getClassCode();
            if (!currentCode && authManager.getEffectiveGuildCode) {
                currentCode = await timeoutPromise(authManager.getEffectiveGuildCode(), 3000, '');
            }

            if (currentCode) {
                currentGuild = guilds.find(g => (g.classCode || g.guildCode || g.id) === currentCode) || null;
            }
            if (!currentGuild && guilds.length > 0) {
                currentGuild = guilds[0];
            }
            let students = [];
            let parties = [];
            if (currentGuild) {
                const code = currentGuild.classCode || currentGuild.guildCode || currentGuild.id;
                students = (await timeoutPromise(authManager.getGuildStudents(code, (freshStudents) => {
                    this._cachedAdminData = { guilds, currentGuild, students: freshStudents, parties };
                    const currentActiveScreen = document.querySelector('.screen.active');
                    if (currentActiveScreen && currentActiveScreen.id === 'screen-admin') {
                        this.ui.renderAdminDashboard(guilds, currentGuild, freshStudents, parties);
                    }
                }), 5000, [])) || [];
                if (typeof partyManager !== 'undefined') {
                    parties = (await timeoutPromise(partyManager.getGuildParties(code), 5000, [])) || [];
                }
            }
            this._cachedAdminData = { guilds, currentGuild, students, parties };
            this.ui.renderAdminDashboard(guilds, currentGuild, students, parties);
        } catch (e) {
            console.warn('Could not load guild data for admin:', e);
            this.ui.renderAdminDashboard([], null, [], []);
        }
    }

    async switchAdminGuild(guildCode) {
        if (!guildCode) return;
        try {
            const guilds = await authManager.getTeacherGuilds();
            const currentGuild = guilds.find(g => (g.classCode || g.guildCode || g.id) === guildCode) || null;
            let students = [];
            let parties = [];
            if (currentGuild) {
                students = await authManager.getGuildStudents(guildCode);
                if (typeof partyManager !== 'undefined') {
                    parties = await partyManager.getGuildParties(guildCode);
                }
            }
            this._cachedAdminData = { guilds, currentGuild, students, parties };
            this.ui.renderAdminDashboard(guilds, currentGuild, students, parties);
        } catch (e) {
            console.warn('Switch admin guild error:', e);
        }
    }

    async confirmKickStudent(studentUid, studentName, guildCode) {
        if (!confirm(`Deseja realmente expulsar o aluno "${studentName}" desta guilda?`)) {
            return;
        }
        try {
            await authManager.kickStudent(studentUid, guildCode);
            this.ui.showToast(`Aluno "${studentName}" removido da guilda.`, 'success');
            await this.switchAdminGuild(guildCode);
        } catch (e) {
            console.error('Kick student error:', e);
            this.ui.showToast('Erro ao expulsar aluno da guilda.', 'error');
        }
    }

    // ─── GESTÃO GLOBAL DE USUÁRIOS DA PLATAFORMA (MESTRE / PROFESSOR) ───
    async openAdminAddStudentModal(guildCode, guildName) {
        const modal = document.getElementById('modal-admin-add-student');
        const nameEl = document.getElementById('admin-add-student-guild-name');
        const listEl = document.getElementById('admin-platform-users-list');
        const searchInput = document.getElementById('input-admin-search-platform-users');
        if (!modal || !listEl) return;

        this._currentAdminTargetGuildCode = guildCode;
        if (nameEl) nameEl.textContent = `${guildName} (${guildCode})`;
        if (searchInput) searchInput.value = '';

        listEl.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;padding:2.5rem;"><div class="spinner"></div></div>';
        modal.classList.remove('hidden');

        try {
            const allUsers = await authManager.getAllPlatformUsers();
            this._cachedPlatformUsers = allUsers;
            this.renderPlatformUsersList(allUsers, guildCode);
        } catch (e) {
            console.error('Error fetching platform users:', e);
            listEl.innerHTML = `<div class="pvp-empty" style="text-align:center;padding:2rem;">Erro ao carregar usuários: ${e.message}</div>`;
        }
    }

    renderPlatformUsersList(users, currentGuildCode) {
        const listEl = document.getElementById('admin-platform-users-list');
        if (!listEl) return;

        const targetCode = currentGuildCode || this._currentAdminTargetGuildCode || '';
        const myUid = authManager.currentUser?.uid;

        // Filtra para remover o próprio professor da lista
        const filtered = (users || []).filter(u => u.uid !== myUid);

        if (filtered.length === 0) {
            listEl.innerHTML = '<div class="pvp-empty" style="text-align:center;padding:2rem;">Nenhum usuário encontrado na plataforma.</div>';
            return;
        }

        listEl.innerHTML = filtered.map(u => {
            const displayName = u.displayName || u.email?.split('@')[0] || 'Aprendiz';
            const email = u.email || 'sem email';
            const photoURL = u.photoURL || 'assets/avatars/avatar_02.png';
            const gp = u.gameProgress || {};
            const lvl = gp.level || 1;
            const userClassCode = (u.classCode || u.guildCode || '').trim().toUpperCase();
            const isInThisGuild = userClassCode === targetCode.toUpperCase();
            const isTeacher = u.role === 'teacher' || authManager.isAdminEmail(u.email);

            return `
                <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.03);border:1px solid ${isInThisGuild ? 'var(--cyan)' : 'var(--border-dim)'};padding:0.6rem 0.9rem;border-radius:6px;gap:0.8rem;">
                    <div style="display:flex;align-items:center;gap:0.75rem;min-width:0;flex:1;">
                        <div style="width:36px;height:36px;border-radius:50%;overflow:hidden;border:1px solid var(--border-bright);flex-shrink:0;">
                            <img src="${photoURL}" style="width:100%;height:100%;object-fit:cover;" />
                        </div>
                        <div style="min-width:0;flex:1;">
                            <div style="display:flex;align-items:center;gap:0.4rem;flex-wrap:wrap;">
                                <strong style="font-size:0.85rem;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${displayName}</strong>
                                <span style="font-size:0.65rem;color:var(--cyan);font-weight:700;">LV. ${lvl}</span>
                                ${isTeacher ? '<span style="font-size:0.6rem;color:var(--gold);background:rgba(234,179,8,0.15);border:1px solid var(--gold);padding:0.05rem 0.35rem;border-radius:4px;">MESTRE</span>' : ''}
                            </div>
                            <div style="font-size:0.72rem;color:var(--text-dim);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                                ${email} • ${userClassCode ? `Guilda: <span style="color:var(--gold);">${userClassCode}</span>` : '<span style="color:var(--text-dim);">Sem Guilda</span>'}
                            </div>
                        </div>
                    </div>
                    <div>
                        ${isInThisGuild ? `
                            <span style="font-size:0.7rem;color:var(--cyan);background:rgba(6,182,212,0.15);border:1px solid var(--cyan);padding:0.25rem 0.6rem;border-radius:4px;font-weight:700;">
                                JÁ NA GUILDA ✓
                            </span>
                        ` : `
                            <button class="glow-button primary" style="padding:0.3rem 0.8rem;font-size:0.7rem;" onclick="app.assignStudentToCurrentGuild('${u.uid}', '${displayName.replace(/'/g, "\\'")}')">
                                + ALOCAR
                            </button>
                        `}
                    </div>
                </div>
            `;
        }).join('');
    }

    filterPlatformUsersList(searchTerm) {
        if (!this._cachedPlatformUsers) return;
        const term = (searchTerm || '').trim().toLowerCase();
        const filtered = this._cachedPlatformUsers.filter(u => {
            const name = (u.displayName || '').toLowerCase();
            const email = (u.email || '').toLowerCase();
            const code = (u.classCode || u.guildCode || '').toLowerCase();
            return name.includes(term) || email.includes(term) || code.includes(term);
        });
        this.renderPlatformUsersList(filtered, this._currentAdminTargetGuildCode);
    }

    async assignStudentToCurrentGuild(studentUid, studentName) {
        const guildCode = this._currentAdminTargetGuildCode;
        if (!guildCode) return;

        try {
            await authManager.assignStudentToGuild(studentUid, guildCode);
            this.ui.showToast(`Aprendiz "${studentName}" alocado com sucesso na guilda!`, 'success');
            
            // Recarrega os dados da guilda ativa e a lista do modal
            await this.switchAdminGuild(guildCode);
            const allUsers = await authManager.getAllPlatformUsers();
            this._cachedPlatformUsers = allUsers;
            this.filterPlatformUsersList(document.getElementById('input-admin-search-platform-users')?.value || '');
        } catch (e) {
            console.error('Assign student error:', e);
            this.ui.showToast(e.message || 'Erro ao vincular aprendiz.', 'error');
        }
    }

    closeAdminAddStudentModal() {
        const modal = document.getElementById('modal-admin-add-student');
        if (modal) modal.classList.add('hidden');
    }

    // ─── RESTAURAÇÃO DE PROGRESSO DO ALUNO (PAINEL DO MESTRE) ───
    async openAdminRestoreModal(studentUid, studentName) {
        const modal = document.getElementById('modal-admin-student-restore');
        const nameEl = document.getElementById('admin-restore-student-name');
        const listEl = document.getElementById('admin-restore-snapshots-list');
        if (!modal || !listEl) return;

        if (nameEl) nameEl.textContent = studentName || 'Aluno';
        listEl.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--text-dim);font-size:0.8rem;">Buscando pontos de salvamento em nuvem...</div>';
        modal.classList.remove('hidden');

        try {
            const snapshots = await authManager.getProgressSnapshots(studentUid);
            if (!snapshots || snapshots.length === 0) {
                listEl.innerHTML = `
                    <div style="text-align:center;padding:2rem;color:var(--text-dim);font-size:0.8rem;background:rgba(255,255,255,0.02);border:1px dashed var(--border-dim);border-radius:6px;">
                        Nenhum ponto de restauração (snapshot) encontrado para esta conta.
                    </div>
                `;
                return;
            }

            const triggerLabels = {
                manual_backup: 'Ponto Manual',
                manual_slot_1: 'Slot Manual #1',
                manual_slot_2: 'Slot Manual #2',
                daily_midnight_auto: 'Ponto Diário Automático (00:00)',
                initial: 'Registro / Save Inicial',
                level_up: 'Subida de Nível',
                chapter_complete: 'Capítulo Concluído'
            };

            listEl.innerHTML = snapshots.map(snap => {
                let label = snap.trigger || snap.id;
                if (label.startsWith('level_up_')) {
                    label = `Alcançou Nível ${label.replace('level_up_', '')}`;
                } else if (label.startsWith('chapter_complete_')) {
                    label = `Concluiu Capítulo ${label.replace('chapter_complete_', '')}`;
                } else if (triggerLabels[label]) {
                    label = triggerLabels[label];
                }

                const dateObj = snap.createdAt ? new Date(snap.createdAt) : new Date(snap.createdTimestamp);
                const dateStr = !isNaN(dateObj.getTime()) ? new Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit', month: '2-digit', year: 'numeric',
                    hour: '2-digit', minute: '2-digit', second: '2-digit'
                }).format(dateObj) : 'Data indisponível';

                return `
                    <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.03);border:1px solid var(--border-dim);border-radius:6px;padding:0.7rem 0.9rem;gap:0.8rem;">
                        <div style="display:flex;flex-direction:column;gap:0.2rem;min-width:0;">
                            <div style="display:flex;align-items:center;gap:0.45rem;flex-wrap:wrap;">
                                <strong style="font-size:0.82rem;color:#fff;">${label}</strong>
                                <span style="font-size:0.68rem;background:rgba(6,182,212,0.15);color:var(--cyan);padding:0.05rem 0.4rem;border-radius:4px;border:1px solid rgba(6,182,212,0.3);font-family:var(--font-code);font-weight:700;">
                                    Nv. ${snap.level}
                                </span>
                                <span style="font-size:0.68rem;color:var(--gold);font-family:var(--font-code);">
                                    ${snap.xp || 0} XP
                                </span>
                            </div>
                            <div style="font-size:0.72rem;color:var(--text-secondary);">
                                <span>${dateStr}</span> • <span>${snap.completedChaptersCount} capítulos concluídos</span>
                            </div>
                        </div>
                        <button class="glow-button primary" style="padding:0.35rem 0.85rem;font-size:0.7rem;white-space:nowrap;" onclick="app.restoreStudentProgressSnapshot('${studentUid}', '${snap.id}', '${studentName.replace(/'/g, "\\'")}', ${snap.level})">
                            RESTAURAR ESTE
                        </button>
                    </div>
                `;
            }).join('');
        } catch (err) {
            console.error('[Admin] Erro ao buscar snapshots do aluno:', err);
            listEl.innerHTML = `<div style="text-align:center;padding:1.5rem;color:var(--danger);font-size:0.8rem;">Erro ao carregar backups: ${err.message || 'Falha na conexão'}</div>`;
        }
    }

    closeAdminRestoreModal() {
        const modal = document.getElementById('modal-admin-student-restore');
        if (modal) modal.classList.add('hidden');
    }

    async restoreStudentProgressSnapshot(studentUid, snapshotId, studentName, targetLevel) {
        if (!confirm(`Deseja realmente restaurar o progresso de "${studentName}" para o Nível ${targetLevel}? O aluno terá seu progresso atualizado imediatamente no servidor.`)) {
            return;
        }

        this.ui.showToast(`Restaurando progresso de ${studentName}...`, 'info');
        try {
            const res = await authManager.restoreProgressSnapshot(studentUid, snapshotId);
            this.closeAdminRestoreModal();
            this.ui.showToast(`Progresso de ${studentName} restaurado para o Nível ${res.restoredLevel || targetLevel}!`, 'success');

            // Atualiza a tabela do painel do mestre
            const currentCode = this._cachedAdminData?.currentGuild?.classCode || this._cachedAdminData?.currentGuild?.guildCode || authManager.getClassCode();
            if (currentCode) {
                await this.switchAdminGuild(currentCode);
            }
        } catch (e) {
            console.error('[Admin] restoreStudentProgressSnapshot error:', e);
            this.ui.showToast('Erro ao restaurar progresso: ' + (e.message || 'Falha no Firestore'), 'error');
        }
    }

    async createNewTeacherGuild() {
        const name = prompt('Digite o nome da nova Guilda (Turma):');
        if (!name || !name.trim()) return;
        try {
            const newCode = await authManager.createTeacherGuild(name.trim());
            this.ui.showToast(`Guilda "${name.trim()}" forjada com sucesso! Código: ${newCode}`, 'success');
            await this.openAdminDashboard();
        } catch (e) {
            console.error('Create teacher guild error:', e);
            this.ui.showToast('Erro ao forjar nova guilda: ' + e.message, 'error');
        }
    }

    async editGuildName(guildCode, currentName) {
        if (!guildCode) return;
        this.ui.showEditGuildModal(guildCode, currentName);
    }

    async submitEditGuildName() {
        const input = document.getElementById('input-edit-guild-name');
        const errEl = document.getElementById('edit-guild-error');
        if (!input) return;
        const guildCode = input.dataset.guildCode;
        const newName = input.value.trim();
        if (!newName) {
            if (errEl) errEl.textContent = 'Informe um nome válido para a guilda.';
            return;
        }
        try {
            await authManager.updateGuildName(guildCode, newName);
            this.ui.hideEditGuildModal();
            this.ui.showToast('Nome da guilda atualizado com sucesso!', 'success');
            await this.openAdminDashboard();
        } catch (e) {
            console.error('Edit guild name error:', e);
            if (errEl) errEl.textContent = 'Erro ao atualizar nome: ' + e.message;
        }
    }

    async confirmDeleteGuild(guildCode, guildName) {
        if (!guildCode) return;
        const ok = confirm(`ATENÇÃO: Deseja realmente excluir a guilda "${guildName || guildCode}"?\n\nTodos os vínculos desta guilda serão removidos permanentemente.`);
        if (!ok) return;
        try {
            await authManager.deleteGuild(guildCode);
            this.ui.showToast(`Guilda "${guildName || guildCode}" excluída.`, 'info');
            await this.openAdminDashboard();
        } catch (e) {
            console.error('Delete guild error:', e);
            this.ui.showToast('Erro ao excluir guilda: ' + e.message, 'error');
        }
    }

    async handleCreateGuildSubmit() {
        const input = document.getElementById('input-new-guild-name');
        const errEl = document.getElementById('create-guild-error');
        const btn = document.querySelector('#modal-create-guild .glow-button.primary');
        if (!input) return;

        const guildName = (input.value || '').trim();
        if (!guildName) {
            if (errEl) errEl.textContent = 'Por favor, informe um nome para a Guilda.';
            return;
        }

        if (errEl) errEl.textContent = '';
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<span class="btn-text">Forjando...</span>';
        }

        try {
            const guildData = await authManager.createGuild(guildName);
            this.ui.hideCreateGuildModal();
            this.ui.showToast(`Guilda "${guildData.name}" criada! Código: ${guildData.guildCode}`, 'success');

            // Invalida cache e abre tela de guilda
            if (this.ui._cachedGuildScreenData) {
                this.ui._cachedGuildScreenData = null;
            }
            await this.openGuildScreen();
        } catch (e) {
            console.error('Create guild error:', e);
            if (errEl) errEl.textContent = e.message || 'Erro ao criar Guilda. Verifique suas permissões.';
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<span class="btn-text">Criar Guilda</span><span class="btn-glow"></span>';
            }
        }
    }

    async handleJoinGuildSubmit() {
        const input = document.getElementById('input-guild-join-code');
        const errEl = document.getElementById('join-guild-error');
        const btn = document.getElementById('btn-confirm-join-guild');
        if (!input) return;

        const code = (input.value || '').trim();
        if (!code) {
            if (errEl) errEl.textContent = 'Por favor, informe o código da Guilda.';
            return;
        }

        if (errEl) errEl.textContent = '';
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<span class="btn-text">Conectando...</span>';
        }

        try {
            const guildData = await authManager.joinGuild(code);
            this.ui.hideJoinGuildModal();
            this.ui.showToast(`Vinculado com sucesso à guilda "${guildData.name || code}"!`, 'success');
            
            // Invalida cache da tela de guilda e abre
            if (this.ui._cachedGuildScreenData) {
                this.ui._cachedGuildScreenData = null;
            }
            await this.openGuildScreen();
        } catch (e) {
            console.error('Join guild error:', e);
            if (errEl) errEl.textContent = e.message || 'Código de Guilda inválido ou não encontrado.';
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<span class="btn-text">Ingressar</span><span class="btn-glow"></span>';
            }
        }
    }

    // ─── GUILD SCREEN ───
    async openGuildScreen() {
        if (typeof authManager === 'undefined' || !authManager.isSignedIn()) {
            this.ui.showToast('Faça login para acessar a guilda.', 'info');
            return;
        }

        if (!authManager.userData && authManager.currentUser) {
            await authManager.loadUserData();
        }

        if (!authManager.hasGuild() && !authManager.isTeacher()) {
            this.ui.showJoinGuildModal('Vincule-se a uma guilda para visualizar seus membros.');
            return;
        }

        this.ui.showScreen('guild');
        await this.ui.renderGuildScreen();
    }

    // ─── PLAYER PROFILE (RN-15) ───
    openMyProfile() {
        if (typeof authManager === 'undefined' || !authManager.isSignedIn()) return;
        this.ui.showPlayerProfileModal(authManager.currentUser?.uid);
    }

    openPlayerProfile(uid) {
        if (typeof authManager === 'undefined') return;
        this.ui.showPlayerProfileModal(uid);
    }
    
    // ═══ RANKED / CHALLENGES ═══
    async openRanked() {
        this.ui.showScreen('ranked');
        
        // 1. Instant 0ms render if cached
        if (this._cachedRankedData) {
            this.ui.renderRankedScreen(this._cachedRankedData.challenges, this._cachedRankedData.leaderboard);
        } else {
            const container = document.getElementById('ranked-content');
            if (container) {
                container.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:5rem 2rem;gap:1.2rem;"><div class="spinner"></div><div style="font-family:var(--font-display);color:var(--purple-bright);font-size:0.85rem;letter-spacing:0.12em;">CARREGANDO ARENA PVP & RANKING...</div></div>';
            }
        }

        // 2. Parallel fetch in background com timeout de segurança e SWR
        try {
            if (typeof rankedManager !== 'undefined') {
                const timeoutPromise = (promise, ms = 3500, fallback = []) => 
                    Promise.race([promise, new Promise(res => setTimeout(() => res(fallback), ms))]);

                const [challenges, leaderboard, history] = await Promise.all([
                    timeoutPromise(rankedManager.getPendingChallenges(), 3500, []),
                    timeoutPromise(rankedManager.getGuildLeaderboard((freshLeaderboard) => {
                        this._cachedRankedData = { challenges: this._cachedRankedData?.challenges || [], leaderboard: freshLeaderboard, history: this._cachedRankedData?.history || [] };
                        const currentActiveScreen = document.querySelector('.screen.active');
                        if (currentActiveScreen && currentActiveScreen.id === 'screen-ranked') {
                            this.ui.renderRankedScreen(this._cachedRankedData.challenges, freshLeaderboard, this._cachedRankedData.history);
                        }
                    }), 3500, []),
                    timeoutPromise(rankedManager.getChallengeHistory(), 3500, [])
                ]);
                this._cachedRankedData = { challenges, leaderboard, history };
                this.ui.renderRankedScreen(challenges || [], leaderboard || [], history || []);
                if (this.ui && typeof this.ui.updateNavigationBadges === 'function') {
                    this.ui.updateNavigationBadges();
                }
            }
        } catch (e) {
            console.warn('Could not load ranked data:', e.message);
            this.ui.renderRankedScreen([], [], []);
        }
    }

    async handleClaimPvPTierReward(tierName) {
        if (!this.engine) return;
        try {
            const res = this.engine.claimPvPTierReward(tierName);
            if (res.success) {
                if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
                    window.soundFX.playCheckCodeSuccess();
                }
                await this.engine.saveToCloud();

                let msg = `Recompensa de [${res.tier}] resgatada com sucesso! (+${res.xp} XP, +${res.tokens} Tokens)`;
                if (res.grantedCrystal) {
                    msg += ` ✦ CRISTAL DE ASCENSÃO OBTIDO! (+0.5 ponto acadêmico na média)`;
                }
                this.ui.showToast(msg, 'success');

                // Re-renderiza a tela do PvP mantendo dados de cache
                const challenges = this._cachedRankedData?.challenges || [];
                const leaderboard = this._cachedRankedData?.leaderboard || [];
                this.ui.renderRankedScreen(challenges, leaderboard);
                this.ui.renderDashboard();
            }
        } catch (err) {
            if (window.soundFX && typeof window.soundFX.playError === 'function') {
                window.soundFX.playError();
            }
            this.ui.showToast(err.message || 'Erro ao resgatar recompensa do elo.', 'error');
        }
    }
    
    // ═══ TOURNAMENTS ═══
    async openTournaments() {
        this.ui.showScreen('tournament');
        
        // Interrompe escutas anteriores de lobby se houver
        if (typeof tournamentManager !== 'undefined') {
            tournamentManager.stopListening();
        }

        const container = document.getElementById('tournament-content');
        
        // Se já tiver cache em memória, exibe imediatamente para nunca ficar em branco
        if (typeof tournamentManager !== 'undefined' && tournamentManager.cachedActive && tournamentManager.cachedHallOfFame) {
            this.ui.renderTournamentsScreen(tournamentManager.cachedActive, tournamentManager.cachedHallOfFame);
        } else if (container) {
            container.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:5rem 2rem;gap:1.2rem;"><div class="spinner"></div><div style="font-family:var(--font-display);color:var(--gold);font-size:0.85rem;letter-spacing:0.12em;">CARREGANDO TORNEIOS & HALL DA FAMA...</div></div>';
        }

        // Busca dados atualizados em tempo real
        try {
            if (typeof tournamentManager !== 'undefined') {
                const data = await tournamentManager.getAllData();
                this.ui.renderTournamentsScreen(data.active || [], data.hallOfFame || []);
            }
        } catch (e) {
            console.warn('Could not load tournaments:', e.message);
            const active = (typeof tournamentManager !== 'undefined' && tournamentManager.cachedActive) || [];
            const hall = (typeof tournamentManager !== 'undefined' && tournamentManager.cachedHallOfFame) || [];
            this.ui.renderTournamentsScreen(active, hall);
        }
    }

    async handleRemoveFromHallOfFame(tournamentId, winnerName) {
        if (!confirm(`Deseja remover "${winnerName || 'este campeão'}" do Hall da Fama dos Torneios?`)) return;
        try {
            if (typeof tournamentManager !== 'undefined') {
                await tournamentManager.removeFromHallOfFame(tournamentId);
                this.ui.showToast('Campeão removido do Hall da Fama com sucesso.', 'success');
                await this.openTournaments();
            }
        } catch (e) {
            console.error(e);
            this.ui.showToast(e.message || 'Erro ao remover do Hall da Fama.', 'error');
        }
    }

    // ═══ HINTS PURCHASE & REVELATION ═══
    handleBuyHint(actId, hintIdx) {
        const cost = [5, 10, 15][hintIdx] || 5;
        const isTeacher = typeof authManager !== 'undefined' && authManager.isTeacher();
        const hasFreeHints = typeof this.engine !== 'undefined' && this.engine.hasSkill && this.engine.hasSkill('rv_free_hints');
        
        let finalCost = (isTeacher || hasFreeHints) ? 0 : cost;

        // Bônus de Avatar para Dicas:
        if (finalCost > 0 && typeof getAvatarSkillBonus === 'function') {
            // Rune Coder (04) / Aether Mage (04): Desconto de dica
            const hintDiscount = getAvatarSkillBonus('hint_discount');
            if (hintDiscount > 0) {
                const oldCost = finalCost;
                finalCost = Math.max(1, Math.round(finalCost * (1 - hintDiscount)));
                if (finalCost < oldCost && typeof notifyAvatarSkillTrigger === 'function') {
                    notifyAvatarSkillTrigger(`Desconto de ${Math.round(hintDiscount * 100)}% em Dica`);
                }
            }

            // Senpai Caster (20): Primeira dica grátis por dia
            const freeHintBonus = getAvatarSkillBonus('daily_free_hint');
            if (freeHintBonus > 0) {
                const todayStr = new Date().toISOString().slice(0, 10);
                const lastUsed = localStorage.getItem('guildcode_daily_hint_date');
                if (lastUsed !== todayStr) {
                    localStorage.setItem('guildcode_daily_hint_date', todayStr);
                    finalCost = 0;
                    if (typeof notifyAvatarSkillTrigger === 'function') {
                        notifyAvatarSkillTrigger('Primeira Dica do Dia Gratuita');
                    }
                }
            }
        }

        if (this.engine.isHintUnlocked(actId, hintIdx)) {
            return;
        }

        const currentTokens = this.engine.getTokens();
        if (finalCost > 0 && currentTokens < finalCost) {
            this.ui.showToast(`Tokens insuficientes! Você possui ${currentTokens} e precisa de ${finalCost} Tokens. Complete missões diárias ou mantenha seu streak para ganhar Tokens.`, 'error');
            return;
        }

        if (finalCost > 0) {
            if (!this.engine.spendTokens(finalCost)) {
                this.ui.showToast('Erro ao deduzir Tokens.', 'error');
                return;
            }
        }

        this.engine.unlockHint(actId, hintIdx);
        this.ui.updateTopBarTokens();

        if (this.ui.currentActivity) {
            this.ui.renderHints(this.ui.currentActivity);
        }

        this.ui.showToast(`Dica ${['I', 'II', 'III'][hintIdx]} desbloqueada!${finalCost > 0 ? ` (-${finalCost} Tokens)` : ' (Grátis)'}`, 'success');
    }
    
    // ═══ CHAPTER COMPLETION DIALOGUE ═══
    showCompletionDialogue(chapterId) {
        const ch = CHAPTERS.find(c => c.id === chapterId);
        if (!ch) return;
        
        const narrative = document.getElementById('narrative-section');
        if (!narrative) return;
        
        // Check if completion dialogue already shown
        if (document.querySelector('.completion-dialogue')) return;
        
        const completionDiv = document.createElement('div');
        completionDiv.className = 'completion-dialogue';
        
        // Get completion story from chapter or generate one
        const completionStory = ch.completionStory || this.getDefaultCompletionStory(ch);
        
        completionDiv.innerHTML = '<div class="dialogue-header">MISSAO COMPLETA</div>';
        
        const storyDiv = document.createElement('div');
        storyDiv.id = 'completion-dialogue';
        storyDiv.className = 'dialogue-container';
        completionDiv.appendChild(storyDiv);
        
        narrative.appendChild(completionDiv);
        
        // Use dialogue engine for completion
        const dialogue = new DialogueEngine('completion-dialogue', { autoPlayDelay: 2500 });
        dialogue.start(completionStory, () => {
            // After completion dialogue, scroll to show it
            completionDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
        });
        
        // Scroll to the completion dialogue
        setTimeout(() => completionDiv.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
    }
    
    getDefaultCompletionStory(ch) {
        const playerName = this.engine.getPlayerName();
        return [
            { type: 'gm', name: 'GM', role: 'Guia do Sistema', cssClass: 'gm', text: 'Parabens, ' + playerName + '! Voce completou as missões deste capitulo.' },
            { type: 'narrative', text: 'O modulo ' + ch.unlock + ' comeca a brilhar intensamente. Pecas de codigo se reconstituem no ar.' },
            { type: 'character', name: 'ARKAN', role: 'MESTRE DA GUILDA', cssClass: 'arkan', text: 'Incrivel. Mais um sistema restaurado. A Guilda esta mais forte por sua causa.' },
            { type: 'narrative', text: ch.unlock + ' foi restaurado com sucesso. Novos caminhos se abrem diante de voce.' },
            { type: 'gm', name: 'GM', role: 'Guia do Sistema', cssClass: 'gm', text: 'Continue explorando os proximos capitulos para restaurar o restante dos sistemas da Guilda.' }
        ];
    }
    
    // ═══ STREAK DIÁRIO (OFENSIVA) & LOJA DA GUILDA ═══
    toggleStreakPopover() {
        const popover = document.getElementById('streak-popover');
        if (!popover) return;
        const isHidden = popover.classList.contains('hidden');
        if (isHidden) {
            // Fecha o drawer de missões se estiver aberto para evitar sobreposição
            if (this.ui && typeof this.ui.closeChapterDrawer === 'function') {
                this.ui.closeChapterDrawer();
            }
            this.ui.renderStreakPopover();
            popover.classList.remove('hidden');
        } else {
            popover.classList.add('hidden');
        }
    }
    }

    if (typeof GuildCodeApp !== "undefined") {
        const descriptors = Object.getOwnPropertyDescriptors(_AppExtension.prototype);
        delete descriptors.constructor;
        Object.defineProperties(GuildCodeApp.prototype, descriptors);
    }
})();
