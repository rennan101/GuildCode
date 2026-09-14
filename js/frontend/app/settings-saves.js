/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — App: settings-saves.js
   ═══════════════════════════════════════════════════════════════ */

(function() {
    class _AppExtension {
async saveProfileNickname() {
        const input = document.getElementById('profile-edit-name-input');
        if (!input) return;
        const newName = input.value.trim();
        if (!newName) {
            this.ui.showToast('O nickname não pode estar vazio.', 'error');
            return;
        }
        try {
            this.engine.setPlayerName(newName);
            if (typeof authManager !== 'undefined') {
                await authManager.updateDisplayName(newName);
            }
            if (window.soundFX) window.soundFX.playCheckCodeSuccess();
            this.ui.showToast('Nickname atualizado com sucesso!', 'success');
            
            // Sync UI everywhere
            this.ui.renderDashboard();
            this.openMyProfile();
        } catch (e) {
            console.error('Error updating nickname:', e);
            this.ui.showToast('Erro ao atualizar nickname: ' + e.message, 'error');
        }
    }

    // ─── AVATAR SELECTION ───
    async selectAvatar(avatarPath) {
        if (!avatarPath) return;

        // Extrai o ID do avatar (ex: '03')
        const match = avatarPath.match(/avatar_(\d+)\.png/);
        const avId = match ? match[1] : null;

        const isMaster = typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.isAdmin());
        const unlockedList = (this.engine && this.engine.state && this.engine.state.unlockedAvatars) 
            || (window.gameProgress && window.gameProgress.unlockedAvatars) 
            || ['02'];

        // Verifica se o avatar é o inicial (02), se o usuário é mestre, ou se foi desbloqueado no gacha
        const isUnlocked = isMaster || avId === '02' || (avId && unlockedList.includes(avId));

        if (!isUnlocked) {
            this.ui.showToast('Este avatar está bloqueado! Obtenha-o na Câmara de Gacha.', 'warning');
            return;
        }

        try {
            if (this.engine && this.engine.state) {
                this.engine.state.photoURL = avatarPath;
                this.engine.state.avatarId = avId;
                this.engine.state.currentAvatarId = avId;
                this.engine.save();
            }

            if (typeof authManager !== 'undefined') {
                await authManager.updateProfilePhoto(avatarPath);
            }
            if (window.soundFX) window.soundFX.playMagic();

            const skillInfo = (typeof AVATAR_SKILLS_DATA !== 'undefined' && avId) ? AVATAR_SKILLS_DATA[avId] : null;
            if (skillInfo) {
                this.ui.showToast(`Retrato atualizado! Habilidade ativa: ${skillInfo.skillName}`, 'success');
            } else {
                this.ui.showToast('Retrato de avatar atualizado!', 'success');
            }
            
            // Re-render header & global UI
            this.ui.renderDashboard();
            
            // Só atualiza o modal de perfil se ele estiver atualmente aberto
            const profileModal = document.getElementById('modal-player-profile');
            if (profileModal && !profileModal.classList.contains('hidden')) {
                this.openMyProfile();
            }

            // Sincroniza instantaneamente o avatar no mapa (tanto no cache de guilda quanto nos nós do mapa)
            const currentUid = (typeof authManager !== 'undefined' && authManager.getCurrentUser()?.uid) || '';
            if (this.ui.cachedGuildMembers && Array.isArray(this.ui.cachedGuildMembers)) {
                const myMem = this.ui.cachedGuildMembers.find(m => m.uid === currentUid);
                if (myMem) {
                    myMem.photoURL = avatarPath;
                }
            }
            if (typeof this.ui.renderMapSpotlightsAndNodes === 'function') {
                this.ui.renderMapSpotlightsAndNodes();
            }
            if (this.ui && this.ui.currentScreen === 'inventory' && typeof this.ui.renderInventoryScreen === 'function') {
                this.ui.renderInventoryScreen();
            }

            // Propaga o novo avatar para a party ativa (sem regredir level)
            if (typeof partyManager !== 'undefined' && partyManager.currentParty) {
                partyManager.syncMyMemberData().catch(e =>
                    console.warn('[Party] Erro ao sincronizar avatar na party:', e)
                );
            }
        } catch (e) {
            console.error('Error selecting avatar:', e);
            this.ui.showToast('Erro ao atualizar avatar', 'error');
        }
    }

    // ═══ SETTINGS PANEL ═══
    openSettings() {
        const backdrop = document.getElementById('settings-backdrop');
        const themeBtns = document.querySelectorAll('.theme-option');
        
        // Set current values
        const currentTheme = this.engine.state.theme || 'sololeveling';
        themeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === currentTheme);
        });
        
        if (backdrop) {
            this.bindAudioSliderDragging();
            this.updateAudioSettingsUI();
            const toggleEl = document.getElementById('toggle-low-power-mode');
            if (toggleEl) {
                toggleEl.checked = document.body.classList.contains('perf-low-power');
            }
            backdrop.classList.remove('hidden');
            backdrop.classList.add('active');
        }
    }
    
    closeSettings() {
        const backdrop = document.getElementById('settings-backdrop');
        if (backdrop) {
            backdrop.classList.remove('active');
            backdrop.classList.add('hidden');
        }
    }

    // ─── GERENCIAMENTO DE ÁUDIO (SFX / BGM / MUTE & DRAG SLIDERS) ───
    updateAudioSettingsUI() {
        if (!window.soundFX) return;
        const sfxVol = Math.round(window.soundFX.sfxVolume * 100);
        const bgmVol = Math.round(window.soundFX.bgmVolume * 100);
        const sfxMuted = window.soundFX.sfxMuted;
        const bgmMuted = window.soundFX.bgmMuted;

        // SFX UI
        const sfxValEl = document.getElementById('sfx-volume-val');
        const sfxMeterEl = document.getElementById('sfx-meter-fill');
        const sfxThumbEl = document.getElementById('sfx-meter-thumb');
        const sfxTrackEl = document.getElementById('sfx-track-meter');
        const sfxRow = sfxValEl?.closest('.audio-setting-row');
        const sfxMuteBtn = document.getElementById('sfx-mute-btn');

        if (sfxValEl) sfxValEl.textContent = sfxMuted ? 'MUTADO' : `${sfxVol}%`;
        if (sfxMeterEl) sfxMeterEl.style.width = `${sfxVol}%`;
        if (sfxThumbEl) sfxThumbEl.style.left = `${sfxVol}%`;
        if (sfxTrackEl) sfxTrackEl.setAttribute('aria-valuenow', sfxVol);
        if (sfxRow) sfxRow.classList.toggle('muted', !!sfxMuted);
        if (sfxMuteBtn) {
            sfxMuteBtn.classList.toggle('is-muted', !!sfxMuted);
            sfxMuteBtn.querySelector('.mute-icon-unmuted')?.classList.toggle('hidden', !!sfxMuted);
            sfxMuteBtn.querySelector('.mute-icon-muted')?.classList.toggle('hidden', !sfxMuted);
        }

        // BGM UI
        const bgmValEl = document.getElementById('bgm-volume-val');
        const bgmMeterEl = document.getElementById('bgm-meter-fill');
        const bgmThumbEl = document.getElementById('bgm-meter-thumb');
        const bgmTrackEl = document.getElementById('bgm-track-meter');
        const bgmRow = bgmValEl?.closest('.audio-setting-row');
        const bgmMuteBtn = document.getElementById('bgm-mute-btn');

        if (bgmValEl) bgmValEl.textContent = bgmMuted ? 'MUTADO' : `${bgmVol}%`;
        if (bgmMeterEl) bgmMeterEl.style.width = `${bgmVol}%`;
        if (bgmThumbEl) bgmThumbEl.style.left = `${bgmVol}%`;
        if (bgmTrackEl) bgmTrackEl.setAttribute('aria-valuenow', bgmVol);
        if (bgmRow) bgmRow.classList.toggle('muted', !!bgmMuted);
        if (bgmMuteBtn) {
            bgmMuteBtn.classList.toggle('is-muted', !!bgmMuted);
            bgmMuteBtn.querySelector('.mute-icon-unmuted')?.classList.toggle('hidden', !!bgmMuted);
            bgmMuteBtn.querySelector('.mute-icon-muted')?.classList.toggle('hidden', !bgmMuted);
        }
    }

    bindAudioSliderDragging() {
        if (this._audioSlidersBound) return;
        this._audioSlidersBound = true;

        const setupSlider = (trackId, onValueChange) => {
            const track = document.getElementById(trackId);
            if (!track) return;

            let isDragging = false;

            const updateFromPointer = (clientX) => {
                const rect = track.getBoundingClientRect();
                if (rect.width <= 0) return;
                let ratio = (clientX - rect.left) / rect.width;
                ratio = Math.max(0, Math.min(1, ratio));
                // Arredonda para múltiplos de 1%
                const roundedVol = Math.round(ratio * 100) / 100;
                onValueChange(roundedVol);
            };

            const onPointerDown = (e) => {
                if (e.button !== 0 && e.pointerType === 'mouse') return;
                isDragging = true;
                track.classList.add('is-dragging');
                track.setPointerCapture?.(e.pointerId);
                updateFromPointer(e.clientX);
            };

            const onPointerMove = (e) => {
                if (!isDragging) return;
                updateFromPointer(e.clientX);
            };

            const onPointerUp = (e) => {
                if (!isDragging) return;
                isDragging = false;
                track.classList.remove('is-dragging');
                try {
                    track.releasePointerCapture?.(e.pointerId);
                } catch (err) {}
            };

            const onKeyDown = (e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (trackId === 'sfx-track-meter') this.changeSfxVolume(0.05);
                    else this.changeBgmVolume(0.05);
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (trackId === 'sfx-track-meter') this.changeSfxVolume(-0.05);
                    else this.changeBgmVolume(-0.05);
                }
            };

            track.addEventListener('pointerdown', onPointerDown);
            track.addEventListener('pointermove', onPointerMove);
            track.addEventListener('pointerup', onPointerUp);
            track.addEventListener('pointercancel', onPointerUp);
            track.addEventListener('keydown', onKeyDown);
        };

        setupSlider('sfx-track-meter', (vol) => {
            if (!window.soundFX) return;
            window.soundFX.setSfxVolume(vol);
            if (window.soundFX.sfxMuted && vol > 0) {
                window.soundFX.toggleSfxMute();
            }
            this.updateAudioSettingsUI();
        });

        setupSlider('bgm-track-meter', (vol) => {
            if (!window.soundFX) return;
            window.soundFX.setBgmVolume(vol);
            if (window.soundFX.bgmMuted && vol > 0) {
                window.soundFX.toggleBgmMute();
            }
            this.updateAudioSettingsUI();
        });
    }

    changeSfxVolume(delta) {
        if (!window.soundFX) return;
        let newVol = Math.round((window.soundFX.sfxVolume + delta) * 100) / 100;
        newVol = Math.max(0, Math.min(1, newVol));
        window.soundFX.setSfxVolume(newVol);
        if (window.soundFX.sfxMuted && delta > 0) {
            window.soundFX.toggleSfxMute();
        }
        this.updateAudioSettingsUI();
        window.soundFX.playClick();
    }

    toggleSfxMute() {
        if (!window.soundFX) return;
        window.soundFX.toggleSfxMute();
        this.updateAudioSettingsUI();
        if (!window.soundFX.sfxMuted) {
            window.soundFX.playClick();
        }
    }

    changeBgmVolume(delta) {
        if (!window.soundFX) return;
        let newVol = Math.round((window.soundFX.bgmVolume + delta) * 100) / 100;
        newVol = Math.max(0, Math.min(1, newVol));
        window.soundFX.setBgmVolume(newVol);
        if (window.soundFX.bgmMuted && delta > 0) {
            window.soundFX.toggleBgmMute();
        }
        this.updateAudioSettingsUI();
        window.soundFX.playClick();
    }

    toggleBgmMute() {
        if (!window.soundFX) return;
        window.soundFX.toggleBgmMute();
        this.updateAudioSettingsUI();
        window.soundFX.playClick();
    }

    saveSettings() {
        const input = document.getElementById('settings-nickname');
        if (input) {
            const newName = input.value.trim();
            if (newName) {
                this.engine.setPlayerName(newName);
                const nameDisplay = document.getElementById('player-name-display');
                if (nameDisplay) nameDisplay.textContent = newName;
                if (typeof authManager !== 'undefined' && authManager.currentUser) {
                    authManager.currentUser.updateProfile({ displayName: newName }).catch(() => {});
                    if (authManager.userData) authManager.userData.displayName = newName;
                    if (typeof fbDB !== 'undefined') {
                        fbDB.collection('users').doc(authManager.currentUser.uid).update({ displayName: newName }).catch(() => {});
                    }
                }
            }
        }
        this.closeSettings();
        this.ui.showToast('Configurações salvas', 'success');
    }

    setTheme(themeName) {
        this.engine.setTheme(themeName);
        this.loadTheme();
        
        // Update active state in settings
        document.querySelectorAll('.theme-option').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === themeName);
        });
    }

    // ─── MODO DESEMPENHO (BAIXO USO DE CPU/GPU & BATERIA) ───
    toggleLowPowerMode(enable) {
        const isLow = Boolean(enable);
        try {
            localStorage.setItem('guildcode_low_power_mode', isLow ? '1' : '0');
        } catch (e) {}

        document.body.classList.toggle('perf-low-power', isLow);
        const toggleEl = document.getElementById('toggle-low-power-mode');
        if (toggleEl) toggleEl.checked = isLow;

        this.ui.showToast(isLow ? 'Modo Desempenho ativado (menos CPU/GPU)' : 'Modo Alta Fidelidade ativado', 'info');
    }

    loadLowPowerMode() {
        let isLow = false;
        try {
            isLow = localStorage.getItem('guildcode_low_power_mode') === '1';
        } catch (e) {}

        document.body.classList.toggle('perf-low-power', isLow);
        const toggleEl = document.getElementById('toggle-low-power-mode');
        if (toggleEl) toggleEl.checked = isLow;
    }

    // ─── CÓDIGO DE SAVE PESSOAL (EXPORTAR / IMPORTAR) ───
    openExportSaveModal() {
        if (!authManager.isSignedIn()) {
            this.ui.showToast('Faça login para exportar seu save.', 'error');
            return;
        }

        try {
            const code = this.engine.exportSaveCode();
            const modal = document.getElementById('modal-save-code');
            const title = document.getElementById('modal-save-code-title');
            const desc = document.getElementById('modal-save-code-desc');
            const icon = document.getElementById('modal-save-code-icon');
            const exportArea = document.getElementById('save-code-export-area');
            const importArea = document.getElementById('save-code-import-area');
            const output = document.getElementById('save-code-output');

            if (title) title.textContent = 'EXPORTAR CÓDIGO DE SAVE';
            if (desc) desc.textContent = 'Copie este código para um bloco de notas. Se você fechar a guia anônima ou trocar de computador, basta logar na sua conta e importar este código para restaurar instantaneamente!';
            if (icon) icon.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
            if (exportArea) exportArea.classList.remove('hidden');
            if (importArea) importArea.classList.add('hidden');
            if (output) {
                output.value = code;
                setTimeout(() => { output.focus(); output.select(); }, 100);
            }

            if (modal) {
                modal.classList.remove('hidden');
                modal.classList.add('active');
            }
        } catch (e) {
            this.ui.showToast(e.message || 'Erro ao gerar código.', 'error');
        }
    }

    openImportSaveModal() {
        if (!authManager.isSignedIn()) {
            this.ui.showToast('Faça login para importar seu save.', 'error');
            return;
        }

        const modal = document.getElementById('modal-save-code');
        const title = document.getElementById('modal-save-code-title');
        const desc = document.getElementById('modal-save-code-desc');
        const icon = document.getElementById('modal-save-code-icon');
        const exportArea = document.getElementById('save-code-export-area');
        const importArea = document.getElementById('save-code-import-area');
        const input = document.getElementById('save-code-input');
        const err = document.getElementById('save-code-import-error');

        if (title) title.textContent = 'IMPORTAR CÓDIGO DE SAVE';
        if (desc) desc.textContent = 'Cole abaixo o código de save gerado anteriormente. Ele só pode ser aplicado se você estiver logado na mesma conta de origem do save.';
        if (icon) icon.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`;
        if (exportArea) exportArea.classList.add('hidden');
        if (importArea) importArea.classList.remove('hidden');
        if (input) input.value = '';
        if (err) err.textContent = '';

        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('active');
        }
        if (input) {
            setTimeout(() => input.focus(), 100);
        }
    }

    closeSaveCodeModal() {
        const modal = document.getElementById('modal-save-code');
        if (modal) {
            modal.classList.remove('active');
            modal.classList.add('hidden');
        }
    }

    async copyGeneratedSaveCode() {
        const output = document.getElementById('save-code-output');
        if (!output || !output.value) return;

        try {
            await navigator.clipboard.writeText(output.value);
            this.ui.showToast('Código de save copiado com sucesso!', 'success');
        } catch (e) {
            output.focus();
            output.select();
            document.execCommand('copy');
            this.ui.showToast('Código copiado!', 'success');
        }
    }

    async confirmImportSaveCode() {
        const input = document.getElementById('save-code-input');
        const err = document.getElementById('save-code-import-error');
        if (!input) return;

        const codeStr = input.value.trim();
        if (!codeStr) {
            if (err) err.textContent = 'Por favor, cole o código de save.';
            input.focus();
            return;
        }

        if (err) err.textContent = '';
        this.ui.showToast('Verificando autenticidade do save...', 'info');

        try {
            await this.engine.importSaveCode(codeStr);
            this.closeSaveCodeModal();
            this.closeSettings();
            this.ui.showToast('Progresso restaurado e sincronizado com sucesso!', 'success');
            
            // Re-renderiza o estado na UI
            if (this.ui.currentScreen === 'dashboard') {
                this.ui.renderDashboard();
            } else {
                this.ui.render();
            }
        } catch (e) {
            console.error('[App] Save code import failed:', e);
            if (err) err.textContent = e.message || 'Falha ao restaurar save.';
            this.ui.showToast(e.message || 'Erro ao carregar save.', 'error');
        }
    }

    // ─── PONTOS DE RESTAURAÇÃO / SNAPSHOTS DE NUVEM ───
    async openSnapshotsModal() {
        if (!authManager.isSignedIn()) {
            this.ui.showToast('Faça login para acessar os pontos de restauração.', 'error');
            return;
        }

        const modal = document.getElementById('modal-snapshots');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('active');
        }
        await this.loadAndRenderSnapshots();
    }

    closeSnapshotsModal() {
        const modal = document.getElementById('modal-snapshots');
        if (modal) {
            modal.classList.remove('active');
            modal.classList.add('hidden');
        }
    }

    async createManualSnapshot() {
        if (!authManager.isSignedIn()) {
            this.ui.showToast('Faça login para salvar um ponto de restauração.', 'warning');
            return;
        }

        const btn = document.getElementById('btn-create-snapshot-now');
        if (btn) btn.disabled = true;

        this.ui.showToast('Criando ponto de restauração na nuvem...', 'info');
        try {
            const currentState = (this.engine && this.engine.state) ? this.engine.state : null;
            const snapId = await authManager.createProgressSnapshot('manual_backup', currentState);
            if (snapId) {
                this.ui.showToast('Ponto de restauração salvo na nuvem com sucesso!', 'success');
                await this.loadAndRenderSnapshots();
            } else {
                this.ui.showToast('Nenhum dado novo para salvar no ponto de restauração.', 'warning');
            }
        } catch (e) {
            console.error('[App] Erro em createManualSnapshot:', e);
            this.ui.showToast(e.message || 'Erro ao gerar ponto de restauração.', 'error');
        } finally {
            if (btn) btn.disabled = false;
        }
    }

    async loadAndRenderSnapshots() {
        const container = document.getElementById('snapshots-list');
        if (!container) return;

        container.innerHTML = '<div style="text-align:center;padding:1.5rem;color:var(--text-dim);font-size:0.8rem;">Buscando histórico na nuvem...</div>';

        try {
            const list = await authManager.getProgressSnapshots();
            if (!list || list.length === 0) {
                container.innerHTML = `
                    <div style="text-align:center;padding:1.5rem;color:var(--text-dim);font-size:0.8rem;background:rgba(255,255,255,0.02);border:1px dashed var(--border-dim);border-radius:6px;">
                        Nenhum ponto de restauração anterior registrado ainda.<br>
                        <span style="font-size:0.72rem;color:var(--text-secondary);">Clique em <strong>"Criar Ponto Agora"</strong> para registrar seu save atual.</span>
                    </div>
                `;
                return;
            }

            const triggerLabels = {
                manual_backup: 'Ponto Manual do Jogador',
                daily_midnight_auto: 'Ponto Diário Automático (00:00)',
                initial: 'Registro / Save Inicial',
                level_up: 'Subida de Nível',
                chapter_complete: 'Capítulo Concluído'
            };

            container.innerHTML = list.map(snap => {
                let label = snap.trigger;
                if (label.startsWith('level_up_')) {
                    label = `Alcançou Nível ${label.replace('level_up_', '')}`;
                } else if (label.startsWith('chapter_complete_')) {
                    label = `Concluiu Capítulo ${label.replace('chapter_complete_', '')}`;
                } else if (triggerLabels[label]) {
                    label = triggerLabels[label];
                }

                const dateStr = snap.createdAt ? new Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit', month: '2-digit', year: 'numeric',
                    hour: '2-digit', minute: '2-digit', second: '2-digit'
                }).format(new Date(snap.createdAt)) : 'Recente';

                return `
                    <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.03);border:1px solid var(--border-dim);border-radius:6px;padding:0.6rem 0.8rem;gap:0.6rem;">
                        <div style="display:flex;flex-direction:column;gap:0.15rem;min-width:0;">
                            <div style="display:flex;align-items:center;gap:0.4rem;">
                                <span style="font-size:0.8rem;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${label}</span>
                                <span style="font-size:0.68rem;background:rgba(6,182,212,0.15);color:var(--cyan);padding:0.1rem 0.4rem;border-radius:4px;border:1px solid rgba(6,182,212,0.3);font-family:var(--font-code);">Nv. ${snap.level}</span>
                            </div>
                            <div style="font-size:0.7rem;color:var(--text-secondary);">
                                <span>${dateStr}</span> • <span>${snap.completedChaptersCount} caps. concluídos</span>
                            </div>
                        </div>
                        <button type="button" class="settings-btn" style="margin:0;padding:0.35rem 0.7rem;font-size:0.72rem;border-color:rgba(16,185,129,0.4);color:var(--green-bright,#10b981);white-space:nowrap;" onclick="app.confirmRestoreSnapshot('${snap.id}')">
                            RESTAURAR
                        </button>
                    </div>
                `;
            }).join('');
        } catch (e) {
            container.innerHTML = '<div style="text-align:center;padding:1.5rem;color:var(--danger);font-size:0.8rem;">Erro ao carregar histórico da nuvem.</div>';
        }
    }

    async confirmRestoreSnapshot(snapshotId) {
        if (!confirm('Deseja restaurar este ponto de save? Seu progresso atual será substituído pelo estado gravado neste ponto.')) {
            return;
        }

        this.ui.showToast('Restaurando ponto de save...', 'info');
        try {
            const res = await authManager.restoreProgressSnapshot(authManager.currentUser.uid, snapshotId);
            this.closeSnapshotsModal();
            this.closeSettings();
            this.ui.showToast(`Save restaurado com sucesso! Nível ${res.restoredLevel}.`, 'success');

            if (this.ui.currentScreen === 'dashboard') {
                this.ui.renderDashboard();
            } else {
                this.ui.render();
            }
        } catch (e) {
            this.ui.showToast(e.message || 'Falha ao restaurar save.', 'error');
        }
    }

    showDeleteAccountModal() {
        const modal = document.getElementById('modal-delete-account');
        const input = document.getElementById('input-confirm-delete-account');
        const err = document.getElementById('delete-account-error');
        if (input) input.value = '';
        if (err) err.textContent = '';
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('active');
        }
        if (input) {
            setTimeout(() => input.focus(), 100);
        }
    }

    hideDeleteAccountModal() {
        const modal = document.getElementById('modal-delete-account');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('active');
        }
    }

    async confirmDeleteAccount() {
        const input = document.getElementById('input-confirm-delete-account');
        const err = document.getElementById('delete-account-error');
        if (!input) return;
        const typed = input.value.trim();
        if (typed !== 'DELETAR MINHA CONTA') {
            if (err) err.textContent = 'Digite exatamente: DELETAR MINHA CONTA';
            input.focus();
            return;
        }

        if (err) err.textContent = '';
        this.ui.showToast('Excluindo conta do servidor...', 'info');

        try {
            if (typeof authManager !== 'undefined') {
                await authManager.deleteAccount();
                this.hideDeleteAccountModal();
                this.closeSettings();
                this.engine.resetGame();
                this.ui.showToast('Conta excluída com sucesso.', 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 700);
            }
        } catch (e) {
            console.error('[App] Delete account failed:', e);
            if (e && e.code === 'auth/requires-recent-login') {
                if (err) err.textContent = 'Por segurança do Firebase, faça login novamente antes de excluir a conta.';
                this.ui.showToast('Reautenticação necessária para excluir a conta.', 'error');
            } else {
                if (err) err.textContent = 'Erro ao excluir: ' + (e?.message || 'Erro desconhecido');
                this.ui.showToast('Erro ao excluir conta: ' + (e?.message || 'Falha'), 'error');
            }
        }
    }
    
    // ═══ THEME LOADING ═══
    loadTheme() {
        let theme = this.engine.state.theme || 'sololeveling';
        if (theme === 'sao') {
            theme = 'sololeveling';
            this.engine.state.theme = 'sololeveling';
        }
        if (theme === 'kuromi') {
            theme = 'hellokitty';
            this.engine.state.theme = 'hellokitty';
        }
        document.body.className = theme === 'sololeveling' ? '' : 'theme-' + theme;
    }
    
    // ═══ ADMIN DASHBOARD (MULTI-GUILD) ═══
    }

    if (typeof GuildCodeApp !== "undefined") {
        const descriptors = Object.getOwnPropertyDescriptors(_AppExtension.prototype);
        delete descriptors.constructor;
        Object.defineProperties(GuildCodeApp.prototype, descriptors);
    }
})();
