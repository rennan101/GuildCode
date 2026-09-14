/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — App: abyss-runner.js
   ═══════════════════════════════════════════════════════════════ */

(function() {
    class _AppExtension {
openAbyssScreen() {
        this.ui.showScreen('abyss');
        if (this.engine && typeof this.engine.markAllAbyssFloorsAsSeen === 'function') {
            this.engine.markAllAbyssFloorsAsSeen();
            if (this.ui && typeof this.ui.updateNavigationBadges === 'function') {
                this.ui.updateNavigationBadges();
            }
        }
        this.ui.renderAbyssScreen();
        this.startAbyssCountdownTimer();
    }

    closeAbyssFloorModal() {
        const modal = document.getElementById('modal-abyss-floor');
        if (modal) modal.classList.add('hidden');
    }

    handleAbyssPortalClick(chapterId) {
        const isUnlocked = this.engine.isAbyssFloorUnlocked(chapterId);
        if (!isUnlocked) {
            if (window.soundFX && typeof window.soundFX.playError === 'function') {
                window.soundFX.playError();
            }
            this.ui.showToast(`[ ABISMO ] O Andar ${String(chapterId).padStart(2, '0')} está selado! Conclua o Capítulo ${String(chapterId).padStart(2, '0')} na campanha para desbloquear.`, 'error');
            return;
        }

        this.ui.renderAbyssFloorModal(chapterId);
    }

    getAbyssQuestsForFloor(chapterId) {
        const isCSharp = (this.ui && typeof this.ui.isCSharpWorld === 'function' && this.ui.isCSharpWorld()) ||
                         (this.engine && this.engine.state && this.engine.state.worldId === 'csharp_unity') ||
                         (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');

        if (typeof missionsManager !== 'undefined' && missionsManager.getAbyssFloor) {
            const mmQuests = missionsManager.getAbyssFloor(chapterId);
            if (mmQuests && mmQuests.length > 0) return mmQuests;
        }

        if (isCSharp && typeof CSHARP_SIDE_QUESTS !== 'undefined') {
            const csKey = String(chapterId).startsWith('csharp_ch') ? String(chapterId) : `csharp_ch${chapterId}`;
            if (CSHARP_SIDE_QUESTS[csKey]) return CSHARP_SIDE_QUESTS[csKey];
            if (CSHARP_SIDE_QUESTS[chapterId]) return CSHARP_SIDE_QUESTS[chapterId];
        }

        if (typeof SIDE_QUESTS !== 'undefined' && SIDE_QUESTS[chapterId]) {
            return SIDE_QUESTS[chapterId];
        }
        if (typeof SIDEQUESTS !== 'undefined' && SIDEQUESTS[chapterId]) {
            return SIDEQUESTS[chapterId];
        }
        return [];
    }

    startAbyssChamber(chapterId, chamberIdx, isContinuation = false) {
        // Validação Anti-Cheat: Checa se o andar está legitimamente desbloqueado
        if (!this.engine.isAbyssFloorUnlocked(chapterId)) {
            this.ui.showToast(`[ ABISMO ] Acesso Negado! O Andar ${String(chapterId).padStart(2, '0')} está selado.`, 'error');
            this.openAbyssScreen();
            return;
        }

        const quests = this.getAbyssQuestsForFloor(chapterId);
        const quest = quests[chamberIdx];
        if (!quest) return;

        // Modelo Genshin Impact: O desafio do andar SEMPRE inicia na Câmara 1 com cronômetro contínuo.
        // Se alguém tentar disparar uma câmara intermediária sem ser continuação direta, força início na câmara 0.
        if (chamberIdx > 0 && !isContinuation) {
            this.ui.showToast(`[ ABISMO ] O Andar ${String(chapterId).padStart(2, '0')} inicia sempre na Câmara 1. Marchando...`, 'info');
            chamberIdx = 0;
            return this.startAbyssChamber(chapterId, 0, false);
        }

        this.closeAbyssFloorModal();
        this.currentAbyssChamber = { chapterId, chamberIdx, quest };
        this.activityContext = {
            mode: 'abyss',
            chapterId,
            chamberIdx,
            data: quest
        };

        // Inicia ou mantém a corrida contínua do andar
        if (!isContinuation || !this._abyssFloorRun || this._abyssFloorRun.chapterId !== chapterId) {
            // Tempo total do Andar: 15 minutos (900s) + bônus de avatar e Boss Skills
            let totalFloorSeconds = 900;
            if (typeof getAvatarSkillBonus === 'function') {
                const extraTime = getAvatarSkillBonus('abyss_time_bonus');
                if (extraTime > 0) {
                    totalFloorSeconds += extraTime;
                    if (typeof notifyAvatarSkillTrigger === 'function') {
                        notifyAvatarSkillTrigger(`+${extraTime}s no Abismo`);
                    }
                }
            }
            if (this.engine && typeof this.engine.getBossSkillsBonuses === 'function') {
                const bossBonuses = this.engine.getBossSkillsBonuses();
                if (bossBonuses && bossBonuses.abyssTimeBonus > 0) {
                    totalFloorSeconds += bossBonuses.abyssTimeBonus;
                }
            }
            this._abyssFloorRun = {
                chapterId,
                remainingSeconds: totalFloorSeconds,
                startedChamberIdx: chamberIdx
            };
        }

        // Prepara a tela de atividade para execução da câmara
        this.ui.showScreen('activity');
        this.setupAbyssActivityUI(quest, chapterId, chamberIdx);
    }

    setupAbyssActivityUI(quest, chapterId, chamberIdx) {
        this.activityContext = {
            mode: 'abyss',
            chapterId,
            chamberIdx,
            data: quest
        };
        document.getElementById('activity-title-display').textContent = `ANDAR ${String(chapterId).padStart(2, '0')} — ${quest.title.toUpperCase()}`;
        const diffBadge = document.getElementById('activity-difficulty');
        if (diffBadge) {
            diffBadge.textContent = quest.difficulty === 'easy' ? 'FÁCIL' : 'MÉDIO';
            diffBadge.className = `difficulty-badge ${quest.difficulty === 'easy' ? 'easy' : 'medium'}`;
        }

        // Cronômetro contínuo do Andar do Abismo
        const timerContainer = document.getElementById('activity-abyss-timer');
        const timerText = document.getElementById('activity-abyss-countdown-text');
        if (this._abyssActivityInterval) clearInterval(this._abyssActivityInterval);

        if (timerContainer && timerText && this._abyssFloorRun) {
            timerContainer.classList.remove('hidden');

            const updateTimerDisplay = () => {
                const secsLeft = this._abyssFloorRun ? this._abyssFloorRun.remainingSeconds : 0;
                const mins = Math.floor(secsLeft / 60);
                const secs = secsLeft % 60;
                timerText.textContent = `TEMPO DO ANDAR: ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
                if (secsLeft <= 90) {
                    timerContainer.style.borderColor = 'var(--red)';
                    timerContainer.style.color = 'var(--red)';
                } else {
                    timerContainer.style.borderColor = 'var(--purple-bright)';
                    timerContainer.style.color = 'var(--purple-bright)';
                }
            };
            
            updateTimerDisplay();
            this._abyssActivityInterval = setInterval(() => {
                if (!this._abyssFloorRun) return;
                this._abyssFloorRun.remainingSeconds--;
                if (this._abyssFloorRun.remainingSeconds <= 0) {
                    clearInterval(this._abyssActivityInterval);
                    this._abyssActivityInterval = null;
                    this._abyssFloorRun = null;
                    timerText.textContent = `TEMPO ESGOTADO!`;
                    this.showAbyssTimeoutModal();
                } else {
                    updateTimerDisplay();
                }
            }, 1000);
        }

        const backLabel = document.getElementById('btn-back-activity-label');
        if (backLabel) backLabel.textContent = 'ABISMO';

        // Monta o bloco didático de Saída Esperada no Abismo
        let abyssExpectedHtml = '';
        if (quest.tests && quest.tests.length > 0) {
            const hasMultipleLines = quest.tests.some(t => String(t.expected).includes('\n'));
            const isSingleLine = !hasMultipleLines;

            const testExamplesHtml = quest.tests.map((t, idx) => {
                const isMultilineOutput = String(t.expected).includes('\n');
                const lineCount = String(t.expected).split('\n').length;
                const lineAdvice = isMultilineOutput 
                    ? `Saída em <strong>${lineCount} linhas separadas</strong> (use <code>\\n</code> ao final de cada linha)` 
                    : `Saída na <strong>mesma linha</strong>`;

                return `
                    <div class="expected-test-item">
                        <div class="expected-test-meta">
                            <span><strong style="color:var(--cyan);">Câmara Caso ${idx + 1}:</strong> ${t.description || ''}</span>
                            ${t.input ? `<span>Entrada: <code style="color:#fff;background:rgba(255,255,255,0.08);padding:0.1rem 0.3rem;border-radius:3px;">${t.input}</code></span>` : '<span style="color:var(--text-dim);">(sem entrada)</span>'}
                        </div>
                        <div style="font-size:0.68rem;color:var(--text-secondary);margin-bottom:0.2rem;display:flex;align-items:center;gap:0.3rem;">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--purple-bright)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            <span>${lineAdvice}:</span>
                        </div>
                        <pre class="expected-preview-pre">${t.expected}</pre>
                    </div>
                `;
            }).join('');

            abyssExpectedHtml = `
                <div class="expected-output-box" style="border-left-color:var(--purple-bright);">
                    <div class="expected-output-header">
                        <div class="expected-output-title" style="color:var(--purple-bright);">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            SAÍDA EXATA EXIGIDA PELO ABISMO
                        </div>
                        <span class="expected-output-badge ${isSingleLine ? 'singleline' : 'multiline'}">
                            ${isSingleLine ? 'MESMA LINHA' : 'LINHAS SEPARADAS (\\n)'}
                        </span>
                    </div>
                    <div class="expected-tests-list">
                        ${testExamplesHtml}
                    </div>
                    <div class="expected-format-note">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        <span><strong>Atenção:</strong> Respeite letras maiúsculas/minúsculas, pontuação e quebras de linha (<code>\\n</code>).</span>
                    </div>
                </div>
            `;
        }

        const probSection = document.getElementById('problem-section');
        if (probSection) {
            probSection.innerHTML = `
                <div class="problem-statement">
                    <div class="step-indicator abyss" style="color:var(--purple-bright);border-color:var(--purple-bright);padding:0.2rem 0.6rem;border:1px solid var(--purple-bright);display:inline-block;border-radius:3px;font-size:0.75rem;font-weight:700;">CÂMARA ${chamberIdx + 1} — DESAFIO DO ABISMO</div>
                    <div class="problem-title" style="margin-top:0.6rem;font-size:1.15rem;font-weight:700;color:var(--text-primary);">${quest.title}</div>
                    <p style="color:var(--text-secondary);margin:0.8rem 0;line-height:1.6;font-size:0.88rem;">${quest.description}</p>
                    ${abyssExpectedHtml}
                </div>
            `;
        }

        // Setup e Reset do Editor com o código inicial exclusivo do desafio do Abismo
        const isCSharpAbyss = this.ui && typeof this.ui.isCSharpWorld === 'function' && this.ui.isCSharpWorld(quest.starterCode || '');
        const defaultStarter = isCSharpAbyss
            ? 'using UnityEngine;\n\npublic class AbyssChallenge : MonoBehaviour {\n    void Start() {\n        \n    }\n}'
            : '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}';

        const editorTab = document.querySelector('.activity-workspace-row .editor-tab');
        if (editorTab) {
            editorTab.textContent = isCSharpAbyss ? 'Script.cs' : 'main.c';
        }

        const editor = document.getElementById('activity-editor');
        if (editor) {
            editor.value = quest.starterCode || defaultStarter;
            this.ui.attachCodeEditor(editor, 'activity-line-numbers', 'activity-editor-highlight');
        }

        // Reset dos terminais e Renderização das Dicas específicas da Câmara do Abismo
        const terminalPrompt = isCSharpAbyss
            ? '[ SISTEMA ] Desafio do Abismo C# carregado. Digite seu código Unity C# e clique em Executar ou Submeter.'
            : '[ SISTEMA ] Desafio do Abismo carregado. Digite seu código e clique em Executar ou Submeter.';
        document.getElementById('activity-terminal-output').innerHTML = `<div class="terminal-line system">${terminalPrompt}</div>`;
        document.getElementById('activity-test-results').innerHTML = '<div class="terminal-line system">[ SISTEMA ] Clique em "Submeter" para validar todos os casos de teste da Câmara.</div>';
        this.ui.hintLevel = 0;
        this.ui.renderHints(quest);
        this.ui.setupTerminalTabs();
        this.ui.setupNotepad();

        // Botão Reset específico da Câmara
        const resetBtn = document.getElementById('btn-reset-activity');
        if (resetBtn) {
            resetBtn.onclick = () => {
                if (editor) {
                    editor.value = quest.starterCode || defaultStarter;
                    this.ui.attachCodeEditor(editor, 'activity-line-numbers', 'activity-editor-highlight');
                }
            };
        }

        // Override botão voltar para retornar ao Abismo
        const backBtn = document.getElementById('btn-back-chapter');
        if (backBtn) {
            backBtn.onclick = () => {
                if (this._abyssActivityInterval) clearInterval(this._abyssActivityInterval);
                this.openAbyssScreen();
            };
        }

        // Override botão submeter para validar a Câmara do Abismo
        const submitBtn = document.getElementById('btn-submit-activity');
        if (submitBtn) {
            submitBtn.onclick = () => this.handleSubmitAbyssChamber();
        }
    }

    handleActivitySubmit() {
        const code = document.getElementById('activity-editor').value;
        const passed = this.ui.checkActivity(code);
        if (passed) {
            if (window.soundFX) window.soundFX.playCheckCodeSuccess();
            const ch = this.ui.currentChapterData;
            const actIdx = this.engine.state.currentActivity;
            const isLastActivity = !!(ch && ch.activities && actIdx === ch.activities.length - 1);
            const wasAlreadyCompleted = !!(this.engine.state.chapters[ch.id] && this.engine.state.chapters[ch.id]['act' + (actIdx + 1)]);
            
            this.engine.completeChapterStep(ch.id, 'act' + (actIdx + 1));
            
            if (!wasAlreadyCompleted) {
                let xpGain = ch.activities[actIdx].difficulty === 'easy' ? 30 : 50;
                let tokenGain = ch.activities[actIdx].difficulty === 'easy' ? 15 : 25;

                // PERKS DE SUBCLASSE
                const currentUser = typeof authManager !== 'undefined' ? authManager.currentUser : null;

                // Hardcoder Overclock: +20% XP quando sem usar dicas (ou se tiver Reviewer Dicas Econômicas)
                if (this.engine.hasSkill('hc_overclock_xp', currentUser)) {
                    const hintsUsed = this.ui.hintLevel || 0;
                    const hasFreeHints = this.engine.hasSkill('rv_free_hints', currentUser);
                    if (hintsUsed === 0 || hasFreeHints) {
                        xpGain = Math.round(xpGain * 1.2);
                    }
                }
                // Hardcoder Legendary Code: +50% Tokens
                if (this.engine.hasSkill('hc_legendary_code', currentUser)) {
                    tokenGain = Math.round(tokenGain * 1.5);
                }
                // Analyst Oráculo Algorítmico (Visão Espectral): +25% XP e +5 Tokens ao acertar de primeira
                if (this.engine.hasSkill('an_spectral_tests', currentUser) && !window._currentActivityFailed) {
                    xpGain = Math.round(xpGain * 1.25);
                    tokenGain += 5;
                    this.ui.showToast('<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/></svg> [ Oráculo Algorítmico ]: +25% XP & +5 Tokens Bônus de 1ª Tentativa!', 'info');
                }
                // Reviewer Clean Syntax: +10% Tokens
                if (this.engine.hasSkill('rv_clean_syntax', currentUser)) {
                    tokenGain = Math.round(tokenGain * 1.1);
                }
                // Debugger Rebound: +5 XP bônus se corrigiu erro
                if (this.engine.hasSkill('db_rebound_xp', currentUser)) {
                    xpGain += 5;
                }
                // Reviewer Inspiração da Party: +10% XP e +10% Tokens para a party inteira
                if (this.engine.hasSkill('rv_party_leader', typeof authManager !== 'undefined' ? authManager.currentUser : null) || 
                    (typeof partyManager !== 'undefined' && partyManager.hasPartyBuff('rv_party_leader'))) {
                    xpGain = Math.round(xpGain * 1.1);
                    tokenGain = Math.round(tokenGain * 1.1);
                }

                // Princess.exe (16): Comando Soberano - +5% de XP compartilhado para toda a Party
                const hasPrincessPartyBuff = (typeof partyManager !== 'undefined' && partyManager.hasPartyBuff('party_xp_boost')) ||
                                             (typeof getAvatarSkillBonus === 'function' && getAvatarSkillBonus('party_xp_boost') > 0);
                if (hasPrincessPartyBuff) {
                    const partyXpBonus = Math.round(xpGain * 0.05);
                    xpGain += partyXpBonus;
                    if (typeof notifyAvatarSkillTrigger === 'function') {
                        notifyAvatarSkillTrigger('+5% XP da Party');
                    }
                }

                // ── BÔNUS EXCLUSIVO DO AVATAR ATIVO ──
                if (typeof getAvatarSkillBonus === 'function') {
                    // Gearhead (08): +4 Tokens flat por missão concluída
                    const flatTokens = getAvatarSkillBonus('token_flat');
                    if (flatTokens > 0) {
                        tokenGain += flatTokens;
                        if (typeof notifyAvatarSkillTrigger === 'function') {
                            notifyAvatarSkillTrigger(`+${flatTokens} Tokens`);
                        }
                    }

                    // Moon Compiler (07): +15% XP de noite (18h-06h) ou finais de semana
                    const nightBonus = getAvatarSkillBonus('night_xp');
                    if (nightBonus > 0) {
                        const hr = new Date().getHours();
                        const day = new Date().getDay();
                        if (hr >= 18 || hr < 6 || day === 0 || day === 6) {
                            xpGain = Math.round(xpGain * (1 + nightBonus));
                            if (typeof notifyAvatarSkillTrigger === 'function') {
                                notifyAvatarSkillTrigger('+15% XP Noturno');
                            }
                        }
                    }

                    // Fox Coder (09): 20% de chance de duplicar tokens se completou sem dicas
                    const critChance = getAvatarSkillBonus('token_crit_chance');
                    if (critChance > 0 && (this.ui.hintLevel || 0) === 0) {
                        if (Math.random() < critChance) {
                            tokenGain = tokenGain * 2;
                            if (typeof notifyAvatarSkillTrigger === 'function') {
                                notifyAvatarSkillTrigger('Tokens Duplicados!');
                            }
                        }
                    }

                    // Wild Coder (06): 20% de chance de encontrar +10 Tokens adicionais
                    const firstTryTokens = getAvatarSkillBonus('first_try_tokens');
                    if (firstTryTokens > 0) {
                        if (Math.random() < 0.20) {
                            tokenGain += firstTryTokens;
                            if (typeof notifyAvatarSkillTrigger === 'function') {
                                notifyAvatarSkillTrigger(`+${firstTryTokens} Tokens de Tesouro`);
                            }
                        }
                    }

                    // Stack Witch (21): +20% Tokens em ponteiros e structs (Capítulos 09 a 15)
                    const pointersTokenBoost = getAvatarSkillBonus('pointers_token_boost');
                    const chapterNum = ch ? parseInt(String(ch.id).replace(/\D/g, ''), 10) : 0;
                    if (pointersTokenBoost > 0 && chapterNum >= 9) {
                        tokenGain = Math.round(tokenGain * (1 + pointersTokenBoost));
                        if (typeof notifyAvatarSkillTrigger === 'function') {
                            notifyAvatarSkillTrigger('+20% Tokens em Ponteiros');
                        }
                    }

                    // Loremaster (24): +10% em TODOS os ganhos (XP e Tokens)
                    const universalBoost = getAvatarSkillBonus('universal_boost');
                    if (universalBoost > 0) {
                        tokenGain = Math.round(tokenGain * (1 + universalBoost));
                        if (typeof notifyAvatarSkillTrigger === 'function') {
                            notifyAvatarSkillTrigger('+10% Todos os Ganhos');
                        }
                    }
                }

                const leveledUp = this.engine.addXP(xpGain);
                this.engine.addTokens(tokenGain);
                this.ui.showToast(`+${xpGain} XP & +${tokenGain} Tokens!`, 'xp');

                // Game Feel: Números flutuantes na tela e flash de editor
                if (typeof this.ui.spawnFloatingStat === 'function') {
                    this.ui.spawnFloatingStat(`+${xpGain} XP`, 'xp');
                    setTimeout(() => {
                        this.ui.spawnFloatingStat(`+${tokenGain} TOKENS`, 'tokens');
                    }, 180);
                }
                if (typeof this.ui.triggerCodeEditorSurge === 'function') {
                    this.ui.triggerCodeEditorSurge();
                }

                if (leveledUp) {
                    const newLevel = this.engine.getLevel();
                    this.ui.showLevelUpAnimation(newLevel);
                    if (typeof this.ui.triggerScreenShake === 'function') {
                        this.ui.triggerScreenShake();
                    }
                    
                    // Subclasse Debugger Perk: Ofensiva Blindada (db_streak_shield) - concede 1 congelamento a cada 5 níveis
                    if (this.engine.hasSkill('db_streak_shield', currentUser) && newLevel % 5 === 0) {
                        if (!this.engine.state.streak) this.engine.state.streak = { current: 0, best: 0, freezes: 0 };
                        this.engine.state.streak.freezes = (this.engine.state.streak.freezes || 0) + 1;
                        this.ui.showToast('<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> [ Ofensiva Blindada ]: Você ganhou +1 Congelamento de Ofensiva!', 'success');
                    }

                    this.checkSubclassAwakening();
                } else {
                    // Tremor suave satisfatório ao passar em exercício
                    if (typeof this.ui.triggerScreenShake === 'function') {
                        this.ui.triggerScreenShake();
                    }
                }
                this.engine.incrementStat('activitiesCompleted');
            } else {
                this.ui.showToast('Atividade concluída novamente! (Modo Treino)', 'info');
            }

            // Dispara o avanço seguro da ofensiva diária (Streak)
            this.checkAndAdvanceDailyStreak();
            
            this.engine.saveToCloud();
            const allDone = ch.activities.every((_, idx) =>
                this.engine.state.chapters[ch.id] && this.engine.state.chapters[ch.id]['act' + (idx + 1)]
            );
            // Se for a última atividade do capítulo, aciona o drop de Artefato (farm/grind contínuo)
            if (isLastActivity && typeof FarmingTemplatesManager !== 'undefined') {
                const isCSharp = this.engine && this.engine.state && this.engine.state.worldId === 'csharp_unity';
                FarmingTemplatesManager.invalidateVariant(ch.id, actIdx, isCSharp);
            }

            if (allDone && !this.engine.isChapterCompleted(ch.id)) {
                this.engine.addTokens(50); // Bônus por capítulo finalizado
                if (isLastActivity) {
                    setTimeout(() => {
                        this.triggerArtifactDrop(ch.id, actIdx);
                    }, 800);
                } else {
                    setTimeout(() => this.completeChapterReward(ch.id), 1000);
                }
            } else if (isLastActivity) {
                // Drop de artefato contínuo no farm da última missão
                setTimeout(() => {
                    this.triggerArtifactDrop(ch.id, actIdx);
                }, 600);
            } else {
                // Exibe o modal de sucesso da atividade para que o jogador possa rever o código e os testes antes de prosseguir
                setTimeout(() => {
                    this.showActivitySuccessModal(ch.id, actIdx, wasAlreadyCompleted);
                }, 600);
            }
        } else {
            window._currentActivityFailed = true;
            if (window.soundFX) window.soundFX.playCheckCodeFail();
        }
    }

    showActivitySuccessModal(chapterId, actIdx, wasAlreadyCompleted) {
        const modal = document.getElementById('modal-activity-success');
        if (!modal) {
            // Fallback caso o modal não exista no DOM
            this.ui.openChapter(chapterId);
            return;
        }

        const titleEl = document.getElementById('modal-activity-success-title');
        const descEl = document.getElementById('modal-activity-success-desc');
        const isCSharp = this.engine && this.engine.state && this.engine.state.worldId === 'csharp_unity';
        const activeChapters = (isCSharp && typeof CSHARP_CHAPTERS !== 'undefined') ? CSHARP_CHAPTERS : (typeof CHAPTERS !== 'undefined' ? CHAPTERS : []);
        const ch = activeChapters.find(c => c.id === chapterId);
        const act = ch && ch.activities ? ch.activities[actIdx] : null;

        if (titleEl) {
            titleEl.textContent = 'DESAFIO CONCLUÍDO COM SUCESSO!';
        }
        if (descEl) {
            if (wasAlreadyCompleted) {
                descEl.innerHTML = `Você executou com êxito todos os testes de <strong>${act ? act.title : 'Atividade'}</strong> no modo treino.`;
            } else {
                descEl.innerHTML = `Excelente trabalho, Aprendiz! Todos os casos de teste de <strong>${act ? act.title : 'Atividade'}</strong> foram validados e suas recompensas foram sincronizadas na Guilda.`;
            }
        }

        modal.classList.remove('hidden');
    }

    handleActivitySuccessReview() {
        const modal = document.getElementById('modal-activity-success');
        if (modal) modal.classList.add('hidden');
        // Mantém na tela de atividade e foca na aba de Testes para o jogador inspecionar os detalhes
        this.ui.switchTerminalTab('tests');
    }

    handleActivitySuccessContinue() {
        const modal = document.getElementById('modal-activity-success');
        if (modal) modal.classList.add('hidden');
        const ch = this.ui.currentChapterData;
        if (ch) {
            this.ui.openChapter(ch.id);
        } else {
            this.ui.showScreen('dashboard');
            this.ui.renderDashboard();
        }
    }

    showAbyssTimeoutModal() {
        if (window.soundFX && typeof window.soundFX.playDanger === 'function') {
            window.soundFX.playDanger();
        }
        const modal = document.getElementById('modal-abyss-timeout');
        if (modal) {
            // ChronoBot (13): Retorno Temporal - 1 recarga diária gratuita para reiniciar o andar
            const todayStr = new Date().toISOString().split('T')[0];
            const hasChronoBot = typeof getAvatarSkillBonus === 'function' && getAvatarSkillBonus('abyss_retry') > 0;
            const chronoAlreadyUsed = this.engine && this.engine.state && this.engine.state.chronoBotRetryDate === todayStr;
            const canUseChronoBot = hasChronoBot && !chronoAlreadyUsed;

            const retryBtn = modal.querySelector('button.primary');
            if (retryBtn) {
                if (canUseChronoBot) {
                    retryBtn.innerHTML = `
                        <span class="btn-text">Retorno Temporal (ChronoBot)</span>
                        <span class="btn-glow"></span>
                    `;
                    retryBtn.title = 'Retorno Temporal do ChronoBot: Restaura o tempo do andar da câmara atual!';
                } else {
                    retryBtn.innerHTML = `
                        <span class="btn-text">Reiniciar da Câmara 1</span>
                        <span class="btn-glow"></span>
                    `;
                    retryBtn.title = '';
                }
            }
            modal.classList.remove('hidden');
        }
    }

    handleAbyssTimeoutRetry() {
        const modal = document.getElementById('modal-abyss-timeout');
        if (modal) modal.classList.add('hidden');
        if (this._abyssActivityInterval) {
            clearInterval(this._abyssActivityInterval);
            this._abyssActivityInterval = null;
        }

        const todayStr = new Date().toISOString().split('T')[0];
        const hasChronoBot = typeof getAvatarSkillBonus === 'function' && getAvatarSkillBonus('abyss_retry') > 0;
        const chronoAlreadyUsed = this.engine && this.engine.state && this.engine.state.chronoBotRetryDate === todayStr;

        if (this.currentAbyssChamber) {
            const { chapterId, chamberIdx } = this.currentAbyssChamber;

            // Se ChronoBot ativo e não usado hoje: restaura o tempo e recomeça na MESMA câmara
            if (hasChronoBot && !chronoAlreadyUsed) {
                if (this.engine && this.engine.state) {
                    this.engine.state.chronoBotRetryDate = todayStr;
                    this.engine.save();
                }
                if (typeof notifyAvatarSkillTrigger === 'function') {
                    notifyAvatarSkillTrigger('Retorno Temporal Ativado');
                }
                this.ui.showToast('Retorno Temporal ativado! O tempo foi restaurado nesta câmara.', 'success');
                this._abyssFloorRun = null;
                this.startAbyssChamber(chapterId, chamberIdx, false);
                return;
            }

            // Padrão: reinicia a marcha do andar do zero na Câmara 1
            this._abyssFloorRun = null;
            this.startAbyssChamber(chapterId, 0, false);
        } else {
            this._abyssFloorRun = null;
            this.openAbyssScreen();
        }
    }

    handleAbyssTimeoutExit() {
        const modal = document.getElementById('modal-abyss-timeout');
        if (modal) modal.classList.add('hidden');
        if (this._abyssActivityInterval) {
            clearInterval(this._abyssActivityInterval);
            this._abyssActivityInterval = null;
        }
        this._abyssFloorRun = null;
        this.openAbyssScreen();
    }

    async handleSubmitAbyssChamber() {
        if (!this.currentAbyssChamber) return;
        const { chapterId, chamberIdx, quest } = this.currentAbyssChamber;

        const code = document.getElementById('activity-editor').value;
        const outPanel = document.getElementById('activity-terminal-output');
        const testPanel = document.getElementById('activity-test-results');

        // Alterna e destaca automaticamente a aba Testes ao submeter
        this.ui.switchTerminalTab('tests');
        if (testPanel) testPanel.innerHTML = '';

        let allPassed = false;
        let validation = null;

        if (this.ui.missionValidator) {
            validation = this.ui.missionValidator.validateActivity(code, quest);
            allPassed = validation.pass;

            if (testPanel) {
                validation.testResults.forEach((t, idx) => {
                    const el = document.createElement('div');
                    el.className = `test-case ${t.pass ? 'pass' : 'fail'}`;
                    el.innerHTML = `
                        <span class="test-icon">${t.pass ? '[PASS]' : '[FAIL]'}</span>
                        <span>${t.description}</span>
                        <span class="test-detail">${idx + 1}/${validation.testResults.length}</span>
                    `;
                    testPanel.appendChild(el);
                });

                const summary = document.createElement('div');
                const passedCount = validation.testResults.filter(r => r.pass).length;
                summary.className = `test-summary ${allPassed ? 'pass' : 'fail'}`;
                summary.textContent = `Resultado: ${passedCount}/${validation.testResults.length} — ${allPassed ? 'APROVADO' : 'REPROVADO'}`;
                testPanel.appendChild(summary);

                if (!allPassed && validation.errors.length > 0) {
                    validation.errors.forEach(msg => {
                        const el = document.createElement('div');
                        el.className = 'terminal-line error';
                        el.textContent = `[ FALHA ] ${msg}`;
                        testPanel.appendChild(el);
                    });
                }
            }
        } else {
            // Fallback
            const defaultInput = (quest.tests && quest.tests.length > 0) ? (quest.tests[0].input || '') : '';
            const initialExec = this.ui.interpreter.execute(code, defaultInput);
            const norm = s => (s || '').split('\n').map(l => l.trim()).filter(Boolean).join('\n');
            allPassed = quest.tests && quest.tests.length > 0 ? norm(initialExec.output).includes(norm(quest.tests[0].expected)) : true;
        }

        if (allPassed) {
            if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
                window.soundFX.playCheckCodeSuccess();
            }

            let xpGained = quest.xp || (quest.difficulty === 'easy' ? 20 : 35);
            let tokensGained = quest.difficulty === 'easy' ? 10 : 15;

            // Buff da Party / Reviewer T3 (Inspiração da Party)
            if (this.engine.hasSkill('rv_party_leader', typeof authManager !== 'undefined' ? authManager.currentUser : null) || 
                (typeof partyManager !== 'undefined' && partyManager.hasPartyBuff('rv_party_leader'))) {
                xpGained = Math.round(xpGained * 1.1);
                tokensGained = Math.round(tokensGained * 1.1);
            }

            // Princess.exe (16): Comando Soberano - +5% de XP compartilhado para toda a Party
            const hasPrincessPartyBuff = (typeof partyManager !== 'undefined' && partyManager.hasPartyBuff('party_xp_boost')) ||
                                         (typeof getAvatarSkillBonus === 'function' && getAvatarSkillBonus('party_xp_boost') > 0);
            if (hasPrincessPartyBuff) {
                const partyXpBonus = Math.round(xpGained * 0.05);
                xpGained += partyXpBonus;
                if (typeof notifyAvatarSkillTrigger === 'function') {
                    notifyAvatarSkillTrigger('+5% XP da Party');
                }
            }

            // Dark Loli (18): Pacto Obscuro - +25% de XP em desafios do Abismo
            if (typeof getAvatarSkillBonus === 'function') {
                const abyssXpBoost = getAvatarSkillBonus('abyss_xp_boost');
                if (abyssXpBoost > 0) {
                    const bonusXp = Math.round(xpGained * abyssXpBoost);
                    xpGained += bonusXp;
                    if (typeof notifyAvatarSkillTrigger === 'function') {
                        notifyAvatarSkillTrigger('+25% XP no Abismo');
                    }
                }
            }

            // Reset da imunidade a crash da câmara para próxima tentativa
            this._nullImmunityUsedInChamber = false;

            // Conclui câmara no engine (somente concede XP e Tokens se for a primeira vez completada)
            const res = this.engine.completeAbyssChamber(quest.id, xpGained, tokensGained);
            await this.engine.saveToCloud();

            const successMsg = document.createElement('div');
            successMsg.className = 'terminal-line success';
            successMsg.style.marginTop = '0.5rem';
            if (res.firstTime) {
                successMsg.textContent = `[ SUCESSO ] Câmara ${chamberIdx + 1} superada com perfeição! +${res.xpGained} XP • +${res.tokensGained} Tokens`;
                this.ui.showToast(`CÂMARA CONCLUÍDA! +${res.xpGained} XP • +${res.tokensGained} Tokens`, 'success');
            } else {
                successMsg.textContent = `[ SUCESSO ] Câmara ${chamberIdx + 1} superada! (Recompensas desta câmara já foram obtidas na 1ª conclusão).`;
                this.ui.showToast(`CÂMARA SUPERADA!`, 'info');
            }
            if (testPanel) testPanel.appendChild(successMsg);
            
            // Verifica se completou todas as 5 câmaras do andar
            const prog = this.engine.getAbyssFloorProgress(chapterId);
            if (prog.isAllDone && !prog.claimed) {
                if (this._abyssActivityInterval) {
                    clearInterval(this._abyssActivityInterval);
                    this._abyssActivityInterval = null;
                }
                this._abyssFloorRun = null;
                setTimeout(() => {
                    this.ui.showToast(`★ TODAS AS 5 CÂMARAS DO ANDAR ${String(chapterId).padStart(2, '0')} CONCLUÍDAS! O Baú do Andar está disponível!`, 'success');
                }, 1200);
            }

            // Exibe o modal de avanço da câmara após pequeno delay
            setTimeout(() => {
                this.showAbyssSuccessModal(chapterId, chamberIdx, res);
            }, 800);
        } else {
            // NULL (15): Apagão de Ponteiro - imunidade ao 1º erro de execução no Abismo (recompõe sem penalidade)
            if (typeof getAvatarSkillBonus === 'function' && getAvatarSkillBonus('crash_immunity') > 0 && !this._nullImmunityUsedInChamber) {
                this._nullImmunityUsedInChamber = true;
                if (window.soundFX && typeof window.soundFX.playMagic === 'function') {
                    window.soundFX.playMagic();
                }
                if (typeof notifyAvatarSkillTrigger === 'function') {
                    notifyAvatarSkillTrigger('Falha Anulada!');
                }
                this.ui.showToast('Escudo de Anomalia ativado! Primeira falha anulada sem penalidade no Abismo.', 'warning');
                return;
            }

            if (window.soundFX && typeof window.soundFX.playCheckCodeFail === 'function') {
                window.soundFX.playCheckCodeFail();
            }
            this.ui.showToast('Testes não passaram. Ajuste o código e tente novamente.', 'error');
        }
    }

    showAbyssSuccessModal(chapterId, chamberIdx, res) {
        const modal = document.getElementById('modal-abyss-success');
        if (!modal) return;

        const titleEl = document.getElementById('modal-abyss-success-title');
        const descEl = document.getElementById('modal-abyss-success-desc');
        const rewardsEl = document.getElementById('modal-abyss-success-rewards');
        const prevBtn = document.getElementById('btn-abyss-prev-chamber');
        const nextBtn = document.getElementById('btn-abyss-next-chamber');

        const quests = this.getAbyssQuestsForFloor(chapterId);

        const nextIdx = chamberIdx + 1;
        const prevIdx = chamberIdx - 1;
        const hasNext = nextIdx < quests.length;
        const hasPrev = prevIdx >= 0;

        if (titleEl) titleEl.textContent = `CÂMARA ${chamberIdx + 1} SUPERADA!`;
        if (descEl) {
            descEl.innerHTML = hasNext
                ? `Você superou a Câmara ${chamberIdx + 1} do Andar ${String(chapterId).padStart(2, '0')}. O cronômetro contínuo do andar continua rodando. Avance para a <strong>Câmara ${nextIdx + 1}</strong>!`
                : `★ PARABÉNS! Você superou todas as 5 câmaras sequenciais do Andar ${String(chapterId).padStart(2, '0')} dentro do tempo! O Baú de Recompensas do Andar foi liberado!`;
        }

        if (rewardsEl) {
            if (res.firstTime) {
                rewardsEl.innerHTML = `
                    <span class="activity-reward-pill" style="font-size:0.85rem;padding:0.4rem 0.8rem;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="2"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                        +${res.xpGained} XP
                    </span>
                    <span class="activity-reward-pill" style="font-size:0.85rem;padding:0.4rem 0.8rem;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 10h8"/></svg>
                        +${res.tokensGained} Tokens
                    </span>
                `;
            } else {
                rewardsEl.innerHTML = `
                    <span class="activity-reward-pill" style="font-size:0.8rem;padding:0.35rem 0.75rem;color:var(--text-dim);">
                        Recompensas de câmara já resgatadas na primeira vitória.
                    </span>
                `;
            }
        }

        if (prevBtn) {
            if (hasPrev) {
                prevBtn.style.display = '';
                prevBtn.innerHTML = `<span class="btn-text">◀ Câmara ${prevIdx + 1}</span>`;
            } else {
                prevBtn.style.display = 'none';
            }
        }

        if (nextBtn) {
            if (hasNext) {
                nextBtn.style.display = '';
                nextBtn.innerHTML = `<span class="btn-text">Marchar para Câmara ${nextIdx + 1} ➔</span><span class="btn-glow"></span>`;
            } else {
                nextBtn.style.display = '';
                nextBtn.innerHTML = `<span class="btn-text">Ver Baú do Andar ★</span><span class="btn-glow"></span>`;
            }
        }

        modal.classList.remove('hidden');
    }

    handleAbyssNextChamber() {
        const modal = document.getElementById('modal-abyss-success');
        if (modal) modal.classList.add('hidden');

        if (!this.currentAbyssChamber) {
            this.openAbyssScreen();
            return;
        }

        const { chapterId, chamberIdx } = this.currentAbyssChamber;
        const quests = this.getAbyssQuestsForFloor(chapterId);
        const nextIdx = chamberIdx + 1;

        if (nextIdx < quests.length) {
            // Continua a marcha sequencial mantendo o mesmo cronômetro do andar
            this.startAbyssChamber(chapterId, nextIdx, true);
        } else {
            this._abyssFloorRun = null;
            if (this._abyssActivityInterval) {
                clearInterval(this._abyssActivityInterval);
                this._abyssActivityInterval = null;
            }
            this.openAbyssScreen();
            this.ui.renderAbyssFloorModal(chapterId);
        }
    }

    handleAbyssPrevChamber() {
        const modal = document.getElementById('modal-abyss-success');
        if (modal) modal.classList.add('hidden');

        if (!this.currentAbyssChamber) {
            this.openAbyssScreen();
            return;
        }

        const { chapterId, chamberIdx } = this.currentAbyssChamber;
        const prevIdx = chamberIdx - 1;

        if (prevIdx >= 0) {
            this.startAbyssChamber(chapterId, prevIdx, true);
        } else {
            this.openAbyssScreen();
        }
    }

    handleAbyssSuccessReturn() {
        const modal = document.getElementById('modal-abyss-success');
        if (modal) modal.classList.add('hidden');
        if (this._abyssActivityInterval) {
            clearInterval(this._abyssActivityInterval);
            this._abyssActivityInterval = null;
        }
        this._abyssFloorRun = null;
        this.openAbyssScreen();
    }

    async handleClaimAbyssReward(chapterId) {
        try {
            const res = this.engine.claimAbyssFloorReward(chapterId);
            if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
                window.soundFX.playCheckCodeSuccess();
            }

            await this.engine.saveToCloud();
            this.ui.renderAbyssFloorModal(chapterId);
            this.ui.renderAbyssScreen();

            let msg = `BAÚ DO ANDAR ${String(chapterId).padStart(2, '0')} RESGATADO! +${res.bonusXP} XP • +${res.bonusTokens} Tokens • +${res.bonusRenome} Renome!`;
            if (res.bonusCrystals && res.bonusCrystals > 0) {
                msg += ` • +${res.bonusCrystals} Cristal${res.bonusCrystals > 1 ? 'is' : ''} de Ascensão (+${(res.bonusCrystals * 0.5).toFixed(1)} pt na média)!`;
            }
            this.ui.showToast(msg, 'success');
        } catch (e) {
            this.ui.showToast(e.message || 'Erro ao resgatar baú.', 'error');
        }
    }

    handleClaimChamberReward(chapterId, chamberIdx, questId) {
        const quests = this.getAbyssQuestsForFloor(chapterId);
        const quest = quests[chamberIdx];
        if (!quest) return;

        const isCompleted = !!(this.engine.state.abyss && this.engine.state.abyss.completedChambers && this.engine.state.abyss.completedChambers[quest.id || questId]);
        if (!isCompleted) {
            this.ui.showToast(`Conclua a Câmara ${chamberIdx + 1} durante a marcha sequencial do Andar para resgatar.`, 'warning');
            return;
        }

        const isEasy = quest.difficulty === 'easy';
        const xpVal = isEasy ? 20 : 25;
        const tokenVal = isEasy ? 10 : 15;

        if (window.soundFX && typeof window.soundFX.playCheckCodeSuccess === 'function') {
            window.soundFX.playCheckCodeSuccess();
        }
        this.ui.showToast(`[ CÂMARA ${chamberIdx + 1} ] Recompensas desta câmara (+${xpVal} XP, +${tokenVal} Tokens) já foram creditadas ao seu perfil na superação do desafio!`, 'success');
    }

    startAbyssCountdownTimer() {
        const timerEl = document.getElementById('abyss-countdown-text');
        if (!timerEl) return;

        // Ciclo quinzenal de 15 dias baseado na data atual
        const now = new Date();
        const cycleDays = 15;
        const daysIntoYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const daysRemaining = cycleDays - (daysIntoYear % cycleDays);
        const hoursRemaining = 23 - now.getHours();
        const minsRemaining = 59 - now.getMinutes();

        timerEl.textContent = `TEMPORADA: ${daysRemaining}D ${String(hoursRemaining).padStart(2, '0')}H ${String(minsRemaining).padStart(2, '0')}M`;
    }

    // Registra atividade do aluno para manter e avançar a Ofensiva (Streak)
    checkAndAdvanceDailyStreak() {
        const res = this.engine.updateDailyStreak();
        if (res.updated) {
            this.engine.saveToCloud();
            this.ui.renderDashboard();
            if (res.protectedByFreeze) {
                this.ui.showToast('Seu Escudo de Ofensiva protegeu seu Streak Diário!', 'info');
            } else if (res.reset) {
                this.ui.showToast(`Ofensiva Diária iniciada! +${res.bonusTokens} Tokens recebidos!`, 'success');
            } else {
                this.ui.showToast(`OFENSIVA DE ${res.streak} DIAS! +${res.bonusTokens} Tokens de bônus!`, 'success');
            }
        }
    }

    // ─── SUBCLASSES & SKILL TREE (NÍVEL 5+) ───
    }

    if (typeof GuildCodeApp !== "undefined") {
        const descriptors = Object.getOwnPropertyDescriptors(_AppExtension.prototype);
        delete descriptors.constructor;
        Object.defineProperties(GuildCodeApp.prototype, descriptors);
    }
})();
