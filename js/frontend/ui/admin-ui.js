/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — UI: Admin & Missions Management
   ═══════════════════════════════════════════════════════════════ */

(function() {
    class _Extension {

    // ─── ADMIN DASHBOARD (MULTI-GUILDA) ───
    renderAdminDashboard(guilds, currentGuild, students, parties = []) {
        this.showScreen('admin');
        const container = document.getElementById('admin-content');
        if (!container) return;

        const selectedGuildCode = currentGuild ? (currentGuild.classCode || currentGuild.guildCode || currentGuild.id) : '';
        const guildName = currentGuild ? currentGuild.name : 'Nenhuma Guilda Selecionada';

        let guildOptionsHtml = '';
        if (guilds && guilds.length > 0) {
            guildOptionsHtml = guilds.map(g => {
                const code = g.classCode || g.guildCode || g.id;
                const isSelected = code === selectedGuildCode ? 'selected' : '';
                return `<option value="${code}" ${isSelected}>${g.name} (${code})</option>`;
            }).join('');
        }

        // Mapeamento de UIDs para identificar alunos em party
        const partyMemberUids = new Set();
        (parties || []).forEach(p => {
            (p.members || []).forEach(m => partyMemberUids.add(m.uid));
        });

        container.innerHTML = `
            <div class="admin-header">
                <h2>PAINEL DO MESTRE (PROFESSOR)</h2>
                <p style="font-size:0.8rem;color:var(--text-secondary);margin-top:0.3rem;">Gerencie suas Guildas, acompanhe os aprendizes, edite atividades pedagógicas e câmaras do Abismo.</p>
            </div>

            <!-- Abas do Painel do Professor -->
            <div class="admin-nav-tabs" style="display:flex;gap:0.8rem;margin:1rem 0;border-bottom:1px solid var(--border-dim);padding-bottom:0.6rem;">
                <button id="tab-admin-guilds" class="terminal-tab active" onclick="app.ui.switchAdminTab('guilds')" style="padding:0.4rem 1.2rem;font-size:0.85rem;display:inline-flex;align-items:center;gap:0.4rem;">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    <span>MINHAS GUILDAS & APRENDIZES</span>
                </button>
                <button id="tab-admin-missions" class="terminal-tab" onclick="app.ui.switchAdminTab('missions')" style="padding:0.4rem 1.2rem;font-size:0.85rem;display:inline-flex;align-items:center;gap:0.4rem;">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                    <span>GESTÃO DE MISSÕES</span>
                </button>
            </div>

            <div id="admin-tab-content-missions" class="hidden">
                <!-- Preenchido dinamicamente por renderAdminMissionsManagement -->
            </div>

            <div id="admin-tab-content-guilds">
            <div class="admin-guild-selector-bar">
                <div style="flex:1;min-width:240px;">
                    <label style="display:block;font-size:0.7rem;color:var(--text-dim);margin-bottom:0.3rem;">SELECIONAR GUILDA ATIVA:</label>
                    <select id="select-admin-guild" class="name-input" style="width:100%;font-family:var(--font-code);font-size:0.85rem;" onchange="app.switchAdminGuild(this.value)">
                        ${guildOptionsHtml || '<option value="">Nenhuma Guilda criada</option>'}
                    </select>
                </div>
                <div>
                    <button class="glow-button primary" style="height:38px;margin-top:1rem;" onclick="app.ui.showCreateGuildModal()">
                        <span class="btn-text">+ FORJAR NOVA GUILDA</span>
                        <span class="btn-glow"></span>
                    </button>
                </div>
            </div>

            ${currentGuild ? `
                <div class="class-code-box" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1.2rem;margin:1rem 0;padding:1rem 1.4rem;width:100%;background:var(--bg-panel);border:1px solid var(--border-dim);border-radius:4px;">
                    <div style="flex:1;min-width:240px;">
                        <div style="font-size:0.75rem;color:var(--text-dim);display:flex;align-items:center;gap:0.6rem;flex-wrap:wrap;">
                            <span>GUILDA ATUAL: <strong style="color:var(--text-primary);font-size:0.95rem;">${guildName}</strong></span>
                            <button class="glow-button" style="padding:0.25rem 0.65rem;font-size:0.62rem;border-color:var(--purple-dim);" onclick="app.ui.showEditGuildModal('${selectedGuildCode}', '${guildName.replace(/'/g, "\\'")}')" title="Editar nome desta guilda">
                                ✎ EDITAR NOME
                            </button>
                            <button class="student-kick-btn" style="padding:0.25rem 0.65rem;font-size:0.62rem;" onclick="app.confirmDeleteGuild('${selectedGuildCode}', '${guildName.replace(/'/g, "\\'")}')" title="Excluir permanentemente esta guilda">
                                ✕ EXCLUIR GUILDA
                            </button>
                        </div>
                        <div class="system-text" style="font-size:0.75rem;margin-top:0.4rem;">CÓDIGO DE CONVOCAÇÃO DOS ALUNOS:</div>
                    </div>
                    <div style="display:flex;align-items:center;gap:0.8rem;background:var(--bg-deep);padding:0.5rem 1rem;border:1px solid var(--purple-dim);border-radius:4px;">
                        <span class="accent-text" style="font-size:1.4rem;letter-spacing:0.12em;font-weight:bold;">${selectedGuildCode}</span>
                        <button class="glow-button primary" style="padding:0.35rem 0.85rem;font-size:0.68rem;" onclick="navigator.clipboard.writeText('${selectedGuildCode}');app.ui.showToast('Código copiado!', 'info')">COPIAR</button>
                    </div>
                </div>

                <div class="admin-stats">
                    <div class="stat-card">
                        <div class="stat-val">${students.length}</div>
                        <div class="stat-label">Aprendizes Inscritos</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-val">${(parties || []).length}</div>
                        <div class="stat-label">Parties Formadas</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-val">${students.filter(s => {
                            const gp = s.gameProgress || {};
                            return (gp.chapters && Object.keys(gp.chapters).length > 0) || (gp.xp && gp.xp > 0) || (gp.level && gp.level > 1);
                        }).length}</div>
                        <div class="stat-label">Ativos na Guilda</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-val">${students.length > 0 ? Math.round(students.reduce((acc, s) => acc + ((s.gameProgress && s.gameProgress.xp) || 0), 0) / students.length) : 0}</div>
                        <div class="stat-label">Média de XP</div>
                    </div>
                </div>

                <!-- ════════ SEÇÃO DE PARTIES FORMADAS ════════ -->
                <div style="margin: 1.8rem 0 1.2rem 0;">
                    <h3 style="margin:0 0 0.6rem 0;color:var(--cyan);font-size:0.85rem;letter-spacing:0.1em;display:flex;justify-content:space-between;align-items:center;">
                        <span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:0.35rem;color:var(--cyan);"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> PARTIES FORMADAS (${(parties || []).length})</span>
                    </h3>

                    ${(!parties || parties.length === 0) ? `
                        <div class="pvp-empty" style="text-align:center;padding:1.5rem;background:var(--bg-panel);border:1px dashed var(--border-dim);font-size:0.8rem;">
                            Nenhuma Party foi formada nesta Guilda ainda. Os aprendizes podem forjar grupos de até 4 integrantes pela aba PARTY.
                        </div>
                    ` : `
                        <div class="admin-party-grid">
                            ${parties.map(p => {
                                const members = p.members || [];
                                return `
                                    <div class="admin-party-card">
                                        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border-dim);padding-bottom:0.5rem;">
                                            <div>
                                                <strong style="font-family:var(--font-display);color:#fff;font-size:0.92rem;">${p.name}</strong>
                                                <div style="font-size:0.68rem;color:var(--text-dim);font-family:var(--font-code);">CÓDIGO: <span style="color:var(--gold);">${p.code || p.id}</span></div>
                                            </div>
                                            <span style="font-size:0.72rem;background:rgba(6,182,212,0.15);color:var(--cyan);border:1px solid var(--cyan);padding:0.15rem 0.5rem;border-radius:12px;font-weight:700;">
                                                ${members.length}/4 Integrantes
                                            </span>
                                        </div>
                                        <div style="display:flex;flex-direction:column;gap:0.4rem;">
                                            ${members.map(m => {
                                                const isLdr = m.uid === p.leaderUid;
                                                const subData = (typeof SUBCLASSES_DATA !== 'undefined' && m.subclass) ? SUBCLASSES_DATA[m.subclass] : null;
                                                return `
                                                    <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(0,0,0,0.25);padding:0.35rem 0.6rem;border-radius:4px;">
                                                        <div style="display:flex;align-items:center;gap:0.5rem;">
                                                            <div style="width:24px;height:24px;border-radius:50%;overflow:hidden;border:1px solid var(--border-bright);">
                                                                <img src="${m.photoURL || 'assets/avatars/avatar_02.png'}" style="width:100%;height:100%;object-fit:cover;" />
                                                            </div>
                                                            <span style="font-size:0.75rem;font-weight:600;color:var(--text-primary);">${m.displayName || 'Aprendiz'}</span>
                                                            ${isLdr ? `<span style="font-size:0.6rem;color:var(--gold);font-weight:bold;">[LÍDER]</span>` : ''}
                                                        </div>
                                                        <div style="display:flex;align-items:center;gap:0.4rem;">
                                                            <span style="font-size:0.68rem;color:var(--cyan);">LV. ${m.level || 1}</span>
                                                            ${subData ? `
                                                                <span style="font-size:0.62rem;color:${subData.color};background:rgba(0,0,0,0.4);border:1px solid ${subData.color};padding:0.05rem 0.35rem;border-radius:8px;">
                                                                    ${subData.badge} ${subData.name}
                                                                </span>
                                                            ` : ''}
                                                        </div>
                                                    </div>
                                                `;
                                            }).join('')}
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    `}
                </div>

                <div style="margin:1.8rem 0 0.8rem 0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.8rem;">
                    <h3 style="margin:0;color:var(--purple-bright);font-size:0.85rem;letter-spacing:0.1em;display:flex;align-items:center;gap:0.4rem;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        <span>APRENDIZES DA GUILDA (${students.length})</span>
                    </h3>
                    <button class="glow-button primary" style="padding:0.35rem 0.9rem;font-size:0.75rem;" onclick="app.openAdminAddStudentModal('${selectedGuildCode}', '${guildName.replace(/'/g, "\\'")}')">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>INSERIR APRENDIZ NA GUILDA
                    </button>
                </div>

                ${students.length === 0 ? `
                    <div class="pvp-empty" style="text-align:center;padding:2rem 1rem;background:var(--bg-panel);border:1px dashed var(--border-dim);">
                        Nenhum aprendiz ingressou nesta Guilda ainda.<br/>
                        Distribua o código <strong>${selectedGuildCode}</strong> para que os alunos possam se vincular.
                    </div>
                ` : `
                    <div class="student-list">
                        ${students.map(s => {
                            const gp = s.gameProgress || {};
                            const chapters = gp.chapters ? Object.values(gp.chapters).filter(c => c.completed).length : 0;
                            const level = gp.level || 1;
                            const xp = gp.xp || 0;
                            const name = s.displayName || s.email?.split('@')[0] || 'Aprendiz';
                            const email = s.email || 'aluno@guildcode.com';
                            const avatarSrc = s.photoURL || 'assets/avatars/avatar_02.png';
                            const renome = gp.renome !== undefined ? gp.renome : 100;
                            const tier = typeof rankedManager !== 'undefined' ? rankedManager.getTierForRenome(renome) : { name: 'Scriptling', icon: '⟨/⟩', color: '#94a3b8' };
                            const isInParty = partyMemberUids.has(s.uid);
                            const studentSubData = (typeof SUBCLASSES_DATA !== 'undefined' && gp.subclass) ? SUBCLASSES_DATA[gp.subclass] : null;
                            const absences = gp.redeemedRewards?.absences || 0;
                            const extraPts = gp.redeemedRewards?.extraPoints || 0.0;
                            const streakDays = gp.streak?.current || 0;
                            const tokensCount = gp.tokens !== undefined ? gp.tokens : 0;

                            return `
                                <div class="admin-student-card">
                                    <!-- Topo: Avatar, Nome, Email e Elo -->
                                    <div class="admin-student-header">
                                        <div class="admin-student-avatar" style="border-color:${tier.color}" onclick="app.openPlayerProfile('${s.uid}')" title="Ver Perfil">
                                            <img src="${avatarSrc}" alt="${name}">
                                        </div>
                                        <div class="admin-student-main-info">
                                            <div class="admin-student-name-row">
                                                <h4 class="admin-student-name" onclick="app.openPlayerProfile('${s.uid}')" title="Ver Perfil: ${name}">${name}</h4>
                                                <span class="admin-student-tier" style="color:${tier.color}; border-color:${tier.color}40;">${tier.icon} ${tier.name}</span>
                                            </div>
                                            <span class="admin-student-email" title="${email}">${email}</span>
                                        </div>
                                    </div>

                                    <!-- Tags de Status e Arquétipo -->
                                    <div class="admin-student-tags-row">
                                        <span class="admin-lvl-badge">LV. ${String(level).padStart(2, '0')} (${xp} XP)</span>
                                        ${studentSubData ? `
                                            <span class="admin-subclass-badge" style="color:${studentSubData.color}; border-color:${studentSubData.color}40; background:${studentSubData.color}15;">
                                                ${studentSubData.badge} ${studentSubData.name}
                                            </span>
                                        ` : '<span class="admin-no-subclass">SEM SUBCLASSE</span>'}
                                        <span class="admin-party-status ${isInParty ? 'in-party' : 'solo'}">
                                            ${isInParty ? '👥 EM PARTY' : 'SOLO'}
                                        </span>
                                    </div>

                                    <!-- Barra de Progresso da Campanha -->
                                    <div class="admin-student-progress-box">
                                        <div class="admin-progress-labels">
                                            <span>Campanha Concluída</span>
                                            <strong>${chapters} / 15 Capítulos</strong>
                                        </div>
                                        <div class="admin-progress-track">
                                            <div class="admin-progress-fill" style="width:${Math.min(100, Math.round((chapters / 15) * 100))}%;"></div>
                                        </div>
                                    </div>

                                    <!-- Métricas & Auditoria Acadêmica -->
                                    <div class="admin-student-metrics-grid">
                                        <div class="admin-metric-chip" title="Saldo de Tokens da Guilda">
                                            <span class="metric-lbl">Tokens</span>
                                            <strong class="metric-val" style="color:var(--gold);">${tokensCount}</strong>
                                        </div>
                                        <div class="admin-metric-chip" title="Dias Consecutivos de Ofensiva">
                                            <span class="metric-lbl">Streak</span>
                                            <strong class="metric-val" style="color:#f97316;display:inline-flex;align-items:center;justify-content:center;gap:0.2rem;">
                                                <span>${streakDays}d</span>
                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                                            </strong>
                                        </div>
                                        <div class="admin-metric-chip" title="Faltas Justificadas no Semestre">
                                            <span class="metric-lbl">Faltas</span>
                                            <strong class="metric-val" style="color:var(--cyan);">${absences} / 12</strong>
                                        </div>
                                        <div class="admin-metric-chip" title="Pontos Extras Obtidos">
                                            <span class="metric-lbl">Pts Extras</span>
                                            <strong class="metric-val" style="color:var(--gold);">+${extraPts.toFixed(1)} / 1.5</strong>
                                        </div>
                                    </div>

                                    <!-- Rodapé de Ações do Aluno -->
                                    <div class="admin-student-actions-row">
                                        <button class="glow-button primary admin-card-btn-restore" onclick="app.openAdminRestoreModal('${s.uid}', '${name.replace(/'/g, "\\'")}')" title="Restaurar backup/save deste aluno">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
                                            <span>RESTAURAR PROGRESSO</span>
                                        </button>
                                        <button class="student-kick-btn admin-card-btn-kick" onclick="app.confirmKickStudent('${s.uid}', '${name.replace(/'/g, "\\'")}', '${selectedGuildCode}')" title="Remover aluno da Guilda">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                                <circle cx="8.5" cy="7" r="4"/>
                                                <line x1="18" y1="8" x2="23" y2="13"/>
                                                <line x1="23" y1="8" x2="18" y2="13"/>
                                            </svg>
                                            <span>REMOVER</span>
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `}
            ` : `
                <div class="pvp-empty" style="text-align:center;padding:3rem 1rem;background:var(--bg-panel);border:1px dashed var(--border-dim);margin-top:1rem;">
                    Você ainda não possui nenhuma Guilda criada.<br/>
                    Clique em <strong>[ + FORJAR NOVA GUILDA ]</strong> acima para começar.
                </div>
            `}
            </div>
        `;
    }

    switchAdminTab(tabKey) {
        const tabGuildsBtn = document.getElementById('tab-admin-guilds');
        const tabMissionsBtn = document.getElementById('tab-admin-missions');
        const guildsContent = document.getElementById('admin-tab-content-guilds');
        const missionsContent = document.getElementById('admin-tab-content-missions');

        if (tabKey === 'missions') {
            if (tabGuildsBtn) tabGuildsBtn.classList.remove('active');
            if (tabMissionsBtn) tabMissionsBtn.classList.add('active');
            if (guildsContent) guildsContent.classList.add('hidden');
            if (missionsContent) {
                missionsContent.classList.remove('hidden');
                this.renderAdminMissionsManagement();
            }
        } else {
            if (tabGuildsBtn) tabGuildsBtn.classList.add('active');
            if (tabMissionsBtn) tabMissionsBtn.classList.remove('active');
            if (guildsContent) guildsContent.classList.remove('hidden');
            if (missionsContent) missionsContent.classList.add('hidden');
        }
    }

    renderAdminMissionsManagement(activeSubTab = 'chapters') {
        const container = document.getElementById('admin-tab-content-missions');
        if (!container) return;

        const chapters = (typeof missionsManager !== 'undefined') ? missionsManager.getChapters() : (typeof CHAPTERS !== 'undefined' ? CHAPTERS : []);
        const abyssFloors = (typeof missionsManager !== 'undefined') ? missionsManager.getAbyssFloors() : (typeof SIDE_QUESTS !== 'undefined' ? SIDE_QUESTS : {});

        let html = `
            <div style="background:var(--bg-panel);border:1px solid var(--border-dim);border-radius:6px;padding:1.2rem;margin-bottom:1.5rem;">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;margin-bottom:1rem;border-bottom:1px solid var(--border-dim);padding-bottom:0.8rem;">
                    <div style="display:flex;gap:0.6rem;">
                        <button class="glow-button ${activeSubTab === 'chapters' ? 'primary' : ''}" style="padding:0.35rem 1rem;font-size:0.75rem;" onclick="app.ui.renderAdminMissionsManagement('chapters')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> MISSÕES DA CAMPANHA (${chapters.length} CAPÍTULOS)
                        </button>
                        <button class="glow-button ${activeSubTab === 'abyss' ? 'primary' : ''}" style="padding:0.35rem 1rem;font-size:0.75rem;" onclick="app.ui.renderAdminMissionsManagement('abyss')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg> CÂMARAS DO ABISMO (${Object.keys(abyssFloors).length} ANDARES)
                        </button>
                    </div>
                    <div style="font-size:0.72rem;color:var(--text-dim);font-family:var(--font-code);">
                        STATUS FIRESTORE: <span style="color:#22c55e;">● CONECTADO</span>
                    </div>
                </div>
        `;

        if (activeSubTab === 'chapters') {
            html += `
                <div style="display:flex;flex-direction:column;gap:1rem;">
                    ${chapters.map((ch, chIdx) => {
                        const acts = ch.activities || [];
                        return `
                            <div style="background:rgba(0,0,0,0.3);border:1px solid var(--border-dim);border-radius:4px;overflow:hidden;">
                                <div style="display:flex;justify-content:space-between;align-items:center;padding:0.8rem 1rem;background:rgba(123,94,167,0.12);border-bottom:1px solid var(--border-dim);">
                                    <div>
                                        <span style="font-family:var(--font-code);color:var(--gold);font-size:0.75rem;font-weight:bold;">CAPÍTULO ${String(ch.id).padStart(2, '0')}</span>
                                        <strong style="margin-left:0.6rem;color:#fff;font-size:0.9rem;">${ch.title}</strong>
                                        <span style="margin-left:0.5rem;font-size:0.75rem;color:var(--text-dim);">(${ch.theme || 'Programação em C'})</span>
                                    </div>
                                    <button class="glow-button primary" style="padding:0.25rem 0.7rem;font-size:0.68rem;" onclick="app.ui.openCreateActivityModal('chapter', ${ch.id})">
                                        + ADICIONAR ATIVIDADE
                                    </button>
                                </div>
                                <div style="padding:0.6rem 1rem;display:flex;flex-direction:column;gap:0.5rem;">
                                    ${acts.length === 0 ? `<p style="font-size:0.75rem;color:var(--text-dim);margin:0.5rem 0;">Nenhuma atividade cadastrada neste capítulo.</p>` : ''}
                                    ${acts.map((act, actIdx) => `
                                        <div style="display:flex;justify-content:space-between;align-items:center;background:var(--bg-deep);padding:0.5rem 0.8rem;border:1px solid var(--border-dim);border-radius:4px;">
                                            <div style="display:flex;align-items:center;gap:0.8rem;">
                                                <span style="font-family:var(--font-code);font-size:0.7rem;color:var(--purple-bright);background:rgba(167,139,250,0.15);padding:0.1rem 0.4rem;border-radius:3px;">
                                                    ${act.id || `ch${ch.id}_a${actIdx+1}`}
                                                </span>
                                                <span style="font-size:0.82rem;font-weight:600;color:var(--text-primary);">${act.title}</span>
                                                <span class="difficulty-badge ${act.difficulty || 'easy'}" style="font-size:0.6rem;padding:0.1rem 0.4rem;">
                                                    ${(act.difficulty || 'easy').toUpperCase()}
                                                </span>
                                                <span style="font-size:0.7rem;color:var(--text-dim);">
                                                    ${(act.tests || []).length} caso(s) de teste
                                                </span>
                                            </div>
                                            <div style="display:flex;gap:0.4rem;">
                                                <button class="glow-button" style="padding:0.2rem 0.6rem;font-size:0.65rem;" onclick="app.ui.openEditActivityModal('chapter', ${ch.id}, ${actIdx})">
                                                    ✎ EDITAR
                                                </button>
                                                <button class="student-kick-btn" style="padding:0.2rem 0.6rem;font-size:0.65rem;" onclick="app.ui.confirmDeleteActivity('chapter', ${ch.id}, ${actIdx}, '${(act.title || '').replace(/'/g, "\\'")}')">
                                                    ✕ EXCLUIR
                                                </button>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        } else {
            html += `
                <div style="display:flex;flex-direction:column;gap:1rem;">
                    ${Object.entries(abyssFloors).map(([floorKey, quests]) => {
                        const qList = Array.isArray(quests) ? quests : [];
                        return `
                            <div style="background:rgba(0,0,0,0.3);border:1px solid var(--border-dim);border-radius:4px;overflow:hidden;">
                                <div style="display:flex;justify-content:space-between;align-items:center;padding:0.8rem 1rem;background:rgba(168,85,247,0.12);border-bottom:1px solid var(--border-dim);">
                                    <div>
                                        <span style="font-family:var(--font-code);color:var(--cyan);font-size:0.75rem;font-weight:bold;">ANDAR ${floorKey}</span>
                                        <strong style="margin-left:0.6rem;color:#fff;font-size:0.9rem;">Câmaras do Abismo</strong>
                                        <span style="margin-left:0.5rem;font-size:0.75rem;color:var(--text-dim);">(${qList.length} Desafios)</span>
                                    </div>
                                    <button class="glow-button primary" style="padding:0.25rem 0.7rem;font-size:0.68rem;" onclick="app.ui.openCreateActivityModal('abyss', '${floorKey}')">
                                        + ADICIONAR CÂMARA
                                    </button>
                                </div>
                                <div style="padding:0.6rem 1rem;display:flex;flex-direction:column;gap:0.5rem;">
                                    ${qList.length === 0 ? `<p style="font-size:0.75rem;color:var(--text-dim);margin:0.5rem 0;">Nenhuma câmara cadastrada neste andar.</p>` : ''}
                                    ${qList.map((q, qIdx) => `
                                        <div style="display:flex;justify-content:space-between;align-items:center;background:var(--bg-deep);padding:0.5rem 0.8rem;border:1px solid var(--border-dim);border-radius:4px;">
                                            <div style="display:flex;align-items:center;gap:0.8rem;">
                                                <span style="font-family:var(--font-code);font-size:0.7rem;color:var(--cyan);background:rgba(6,182,212,0.15);padding:0.1rem 0.4rem;border-radius:3px;">
                                                    ${q.id || `sq${floorKey}_${qIdx+1}`}
                                                </span>
                                                <span style="font-size:0.82rem;font-weight:600;color:var(--text-primary);">${q.title}</span>
                                                <span class="difficulty-badge ${q.difficulty || 'medium'}" style="font-size:0.6rem;padding:0.1rem 0.4rem;">
                                                    ${(q.difficulty || 'medium').toUpperCase()}
                                                </span>
                                                <span style="font-size:0.7rem;color:var(--text-dim);">
                                                    ⏱ ${q.timeLimit || 300}s | <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:0.25rem;"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H7v2h10v-2h-2c-.55 0-1-.45-1-1v-2.34"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg> +${q.xp || 35} XP
                                                </span>
                                            </div>
                                            <div style="display:flex;gap:0.4rem;">
                                                <button class="glow-button" style="padding:0.2rem 0.6rem;font-size:0.65rem;" onclick="app.ui.openEditActivityModal('abyss', '${floorKey}', ${qIdx})">
                                                    ✎ EDITAR
                                                </button>
                                                <button class="student-kick-btn" style="padding:0.2rem 0.6rem;font-size:0.65rem;" onclick="app.ui.confirmDeleteActivity('abyss', '${floorKey}', ${qIdx}, '${(q.title || '').replace(/'/g, "\\'")}')">
                                                    ✕ EXCLUIR
                                                </button>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }

        html += `</div>`;
        container.innerHTML = html;
    }

    openEditActivityModal(mode, parentId, itemIdx) {
        const modal = document.getElementById('modal-edit-mission');
        const modalBody = document.getElementById('modal-mission-body');
        const titleEl = document.getElementById('modal-mission-title');
        const saveBtn = document.getElementById('btn-save-mission-editor');
        if (!modal || !modalBody) return;

        let act = null;
        if (mode === 'chapter') {
            act = missionsManager.getChapterActivity(parentId, itemIdx);
            titleEl.textContent = `EDITAR ATIVIDADE (CAPÍTULO ${parentId})`;
        } else {
            act = missionsManager.getAbyssChamber(parentId, itemIdx);
            titleEl.textContent = `EDITAR CÂMARA (ANDAR ${parentId})`;
        }

        if (!act) return;

        const testsJson = JSON.stringify(act.tests || [], null, 2);
        const reqPatterns = (act.validationRules?.requiredPatterns || []).join(', ');
        const forbPatterns = (act.validationRules?.forbiddenPatterns || []).join(', ');

        modalBody.innerHTML = `
            <div>
                <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">ID DA ATIVIDADE (IMUTÁVEL):</label>
                <input id="edit-mission-id" class="name-input" type="text" value="${act.id || ''}" disabled style="width:100%;opacity:0.7;" />
            </div>
            <div style="display:flex;gap:1rem;">
                <div style="flex:2;">
                    <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">TÍTULO DA MISSÃO:</label>
                    <input id="edit-mission-title" class="name-input" type="text" value="${act.title || ''}" style="width:100%;" />
                </div>
                <div style="flex:1;">
                    <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">DIFICULDADE:</label>
                    <select id="edit-mission-diff" class="name-input" style="width:100%;">
                        <option value="easy" ${act.difficulty === 'easy' ? 'selected' : ''}>FÁCIL (Easy)</option>
                        <option value="medium" ${act.difficulty === 'medium' ? 'selected' : ''}>MÉDIO (Medium)</option>
                        <option value="hard" ${act.difficulty === 'hard' ? 'selected' : ''}>DIFÍCIL (Hard)</option>
                    </select>
                </div>
            </div>
            <div>
                <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">ENUNCIADO / DESCRIÇÃO (HTML PERMITIDO):</label>
                <textarea id="edit-mission-desc" class="name-input" rows="4" style="width:100%;font-family:var(--font-main);font-size:0.8rem;resize:vertical;">${act.description || ''}</textarea>
            </div>
            <div>
                <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">CÓDIGO INICIAL (STARTER CODE EM C):</label>
                <textarea id="edit-mission-starter" class="name-input" rows="5" style="width:100%;font-family:var(--font-code);font-size:0.8rem;resize:vertical;">${act.starterCode || ''}</textarea>
            </div>
            <div style="display:flex;gap:1rem;">
                <div style="flex:1;">
                    <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">PALAVRAS-CHAVE OBRIGATÓRIAS (Separadas por vírgula):</label>
                    <input id="edit-mission-required" class="name-input" type="text" value="${reqPatterns}" placeholder="Ex: printf, scanf, if" style="width:100%;" />
                </div>
                <div style="flex:1;">
                    <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">PALAVRAS PROIBIDAS (Separadas por vírgula):</label>
                    <input id="edit-mission-forbidden" class="name-input" type="text" value="${forbPatterns}" placeholder="Ex: goto" style="width:100%;" />
                </div>
            </div>
            <div>
                <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">CASOS DE TESTE (JSON):</label>
                <textarea id="edit-mission-tests" class="name-input" rows="6" style="width:100%;font-family:var(--font-code);font-size:0.75rem;resize:vertical;">${testsJson}</textarea>
            </div>
            ${(mode === 'chapter') ? `
            <div style="background:rgba(201,169,78,0.08);border:1px solid rgba(201,169,78,0.3);border-radius:8px;padding:0.8rem;margin-top:0.4rem;">
                <label style="display:block;font-size:0.75rem;font-weight:700;color:var(--gold);margin-bottom:0.4rem;letter-spacing:0.05em;">
                    RECOMPENSA FINAL DE ARTEFATO (DROP DA ÚLTIMA MISSÃO):
                </label>
                <div style="display:flex;gap:0.8rem;align-items:center;">
                    <div style="flex:2;">
                        <label style="display:block;font-size:0.68rem;color:var(--text-dim);margin-bottom:0.2rem;">ARTEFATO DA MISSÃO:</label>
                        <select id="edit-mission-artifact-id" class="name-input" style="width:100%;font-size:0.8rem;">
                            <option value="random" ${(!act.artifactReward || act.artifactReward.artifactId === 'random') ? 'selected' : ''}>Qualquer um dos 8 Artefatos (Sorteio)</option>
                            <option value="Crown_Cristal" ${(act.artifactReward?.artifactId === 'Crown_Cristal') ? 'selected' : ''}>Diadema do Bastião Cristalino (+DEF)</option>
                            <option value="Crown_Hollow" ${(act.artifactReward?.artifactId === 'Crown_Hollow') ? 'selected' : ''}>Coroa Oca (+DEF%)</option>
                            <option value="Chalice_Seiva" ${(act.artifactReward?.artifactId === 'Chalice_Seiva') ? 'selected' : ''}>Ânfora da Seiva Primordial (+HP)</option>
                            <option value="Chalice_Vulcano" ${(act.artifactReward?.artifactId === 'Chalice_Vulcano') ? 'selected' : ''}>Cálice da Fonte Vulcânica (+HP%)</option>
                            <option value="Ring_Draco" ${(act.artifactReward?.artifactId === 'Ring_Draco') ? 'selected' : ''}>Anel Dracônico Carmesim (+ATK)</option>
                            <option value="Ring_Oroborus" ${(act.artifactReward?.artifactId === 'Ring_Oroborus') ? 'selected' : ''}>Anel do Ouroboros (+ATK%)</option>
                            <option value="Anklet_Wind" ${(act.artifactReward?.artifactId === 'Anklet_Wind') ? 'selected' : ''}>Grilhão do Vento Vetorial (+SPD)</option>
                            <option value="Anklet_Lightning" ${(act.artifactReward?.artifactId === 'Anklet_Lightning') ? 'selected' : ''}>Elo da Corrente Fulgurante (+SPD%)</option>
                        </select>
                    </div>
                    <div style="flex:1;">
                        <label style="display:block;font-size:0.68rem;color:var(--text-dim);margin-bottom:0.2rem;">MIN ESTRELAS:</label>
                        <select id="edit-mission-artifact-min-stars" class="name-input" style="width:100%;font-size:0.8rem;">
                            <option value="3" ${(act.artifactReward?.minStars === 3 || !act.artifactReward) ? 'selected' : ''}>3★ Comum</option>
                            <option value="4" ${(act.artifactReward?.minStars === 4) ? 'selected' : ''}>4★ Raro</option>
                            <option value="5" ${(act.artifactReward?.minStars === 5) ? 'selected' : ''}>5★ Épico</option>
                            <option value="6" ${(act.artifactReward?.minStars === 6) ? 'selected' : ''}>6★ Lendário</option>
                        </select>
                    </div>
                    <div style="flex:1;">
                        <label style="display:block;font-size:0.68rem;color:var(--text-dim);margin-bottom:0.2rem;">MAX ESTRELAS:</label>
                        <select id="edit-mission-artifact-max-stars" class="name-input" style="width:100%;font-size:0.8rem;">
                            <option value="3" ${(act.artifactReward?.maxStars === 3) ? 'selected' : ''}>3★ Comum</option>
                            <option value="4" ${(act.artifactReward?.maxStars === 4) ? 'selected' : ''}>4★ Raro</option>
                            <option value="5" ${(act.artifactReward?.maxStars === 5) ? 'selected' : ''}>5★ Épico</option>
                            <option value="6" ${(act.artifactReward?.maxStars === 6 || !act.artifactReward) ? 'selected' : ''}>6★ Lendário</option>
                        </select>
                    </div>
                </div>
            </div>
            ` : ''}
        `;

        saveBtn.onclick = async () => {
            try {
                let parsedTests = [];
                try {
                    parsedTests = JSON.parse(document.getElementById('edit-mission-tests').value);
                } catch (e) {
                    this.showToast('Erro no formato JSON dos casos de teste!', 'error');
                    return;
                }

                const reqList = document.getElementById('edit-mission-required').value.split(',').map(s => s.trim()).filter(Boolean);
                const forbList = document.getElementById('edit-mission-forbidden').value.split(',').map(s => s.trim()).filter(Boolean);

                const updatedAct = {
                    ...act,
                    title: document.getElementById('edit-mission-title').value.trim(),
                    difficulty: document.getElementById('edit-mission-diff').value,
                    description: document.getElementById('edit-mission-desc').value,
                    starterCode: document.getElementById('edit-mission-starter').value,
                    tests: parsedTests,
                    validationRules: {
                        requiredPatterns: reqList,
                        forbiddenPatterns: forbList
                    }
                };

                if (mode === 'chapter') {
                    const artIdEl = document.getElementById('edit-mission-artifact-id');
                    const minStarsEl = document.getElementById('edit-mission-artifact-min-stars');
                    const maxStarsEl = document.getElementById('edit-mission-artifact-max-stars');
                    if (artIdEl) {
                        updatedAct.artifactReward = {
                            artifactId: artIdEl.value,
                            minStars: parseInt(minStarsEl.value, 10) || 3,
                            maxStars: parseInt(maxStarsEl.value, 10) || 6
                        };
                    }
                }

                saveBtn.disabled = true;
                saveBtn.innerHTML = '<span class="btn-text">SALVANDO...</span>';

                if (mode === 'chapter') {
                    await missionsManager.saveChapterActivity(parentId, itemIdx, updatedAct);
                } else {
                    await missionsManager.saveAbyssChamber(parentId, itemIdx, updatedAct);
                }

                this.showToast('Missão salva no Firestore com sucesso!', 'success');
                this.closeEditMissionModal();
                this.renderAdminMissionsManagement(mode === 'chapter' ? 'chapters' : 'abyss');
            } catch (err) {
                console.error('[UI] Erro ao salvar atividade:', err);
                this.showToast('Erro ao salvar no Firestore: ' + err.message, 'error');
            } finally {
                saveBtn.disabled = false;
                saveBtn.innerHTML = '<span class="btn-text">SALVAR NO FIRESTORE</span><span class="btn-glow"></span>';
            }
        };

        modal.classList.remove('hidden');
    }

    openCreateActivityModal(mode, parentId) {
        const modal = document.getElementById('modal-edit-mission');
        const modalBody = document.getElementById('modal-mission-body');
        const titleEl = document.getElementById('modal-mission-title');
        const saveBtn = document.getElementById('btn-save-mission-editor');
        if (!modal || !modalBody) return;

        const newId = mode === 'chapter' ? `ch${parentId}_a${Date.now().toString().slice(-4)}` : `sq${parentId}_${Date.now().toString().slice(-4)}`;
        titleEl.textContent = mode === 'chapter' ? `NOVA ATIVIDADE (CAPÍTULO ${parentId})` : `NOVA CÂMARA (ANDAR ${parentId})`;

        modalBody.innerHTML = `
            <div>
                <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">ID DA ATIVIDADE:</label>
                <input id="edit-mission-id" class="name-input" type="text" value="${newId}" style="width:100%;" />
            </div>
            <div style="display:flex;gap:1rem;">
                <div style="flex:2;">
                    <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">TÍTULO DA MISSÃO:</label>
                    <input id="edit-mission-title" class="name-input" type="text" placeholder="Nome do desafio" style="width:100%;" />
                </div>
                <div style="flex:1;">
                    <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">DIFICULDADE:</label>
                    <select id="edit-mission-diff" class="name-input" style="width:100%;">
                        <option value="easy">FÁCIL (Easy)</option>
                        <option value="medium">MÉDIO (Medium)</option>
                        <option value="hard">DIFÍCIL (Hard)</option>
                    </select>
                </div>
            </div>
            <div>
                <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">ENUNCIADO / DESCRIÇÃO:</label>
                <textarea id="edit-mission-desc" class="name-input" rows="4" style="width:100%;font-family:var(--font-main);font-size:0.8rem;resize:vertical;" placeholder="Descreva o que o aluno deve programar..."></textarea>
            </div>
            <div>
                <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">CÓDIGO INICIAL (STARTER CODE EM C):</label>
                <textarea id="edit-mission-starter" class="name-input" rows="5" style="width:100%;font-family:var(--font-code);font-size:0.8rem;resize:vertical;">#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}</textarea>
            </div>
            <div style="display:flex;gap:1rem;">
                <div style="flex:1;">
                    <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">PALAVRAS-CHAVE OBRIGATÓRIAS:</label>
                    <input id="edit-mission-required" class="name-input" type="text" placeholder="Ex: printf, scanf" style="width:100%;" />
                </div>
                <div style="flex:1;">
                    <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">PALAVRAS PROIBIDAS:</label>
                    <input id="edit-mission-forbidden" class="name-input" type="text" placeholder="Ex: goto" style="width:100%;" />
                </div>
            </div>
            <div>
                <label style="display:block;font-size:0.75rem;color:var(--text-dim);margin-bottom:0.2rem;">CASOS DE TESTE (JSON):</label>
                <textarea id="edit-mission-tests" class="name-input" rows="6" style="width:100%;font-family:var(--font-code);font-size:0.75rem;resize:vertical;">[
  {
    "input": "",
    "expected": "Saída esperada",
    "description": "Teste 1"
  }
]</textarea>
            </div>
        `;

        saveBtn.onclick = async () => {
            try {
                let parsedTests = [];
                try {
                    parsedTests = JSON.parse(document.getElementById('edit-mission-tests').value);
                } catch (e) {
                    this.showToast('Erro no formato JSON dos casos de teste!', 'error');
                    return;
                }

                const title = document.getElementById('edit-mission-title').value.trim();
                if (!title) {
                    this.showToast('Informe um título para a missão!', 'error');
                    return;
                }

                const reqList = document.getElementById('edit-mission-required').value.split(',').map(s => s.trim()).filter(Boolean);
                const forbList = document.getElementById('edit-mission-forbidden').value.split(',').map(s => s.trim()).filter(Boolean);

                const newAct = {
                    id: document.getElementById('edit-mission-id').value.trim() || newId,
                    title,
                    difficulty: document.getElementById('edit-mission-diff').value,
                    description: document.getElementById('edit-mission-desc').value,
                    starterCode: document.getElementById('edit-mission-starter').value,
                    hints: [],
                    tests: parsedTests,
                    validationRules: {
                        requiredPatterns: reqList,
                        forbiddenPatterns: forbList
                    }
                };

                if (mode === 'abyss') {
                    newAct.timeLimit = 300;
                    newAct.xp = newAct.difficulty === 'easy' ? 20 : 35;
                }

                saveBtn.disabled = true;
                saveBtn.innerHTML = '<span class="btn-text">CRIANDO...</span>';

                if (mode === 'chapter') {
                    await missionsManager.saveChapterActivity(parentId, -1, newAct);
                } else {
                    await missionsManager.saveAbyssChamber(parentId, -1, newAct);
                }

                this.showToast('Nova missão criada no Firestore com sucesso!', 'success');
                this.closeEditMissionModal();
                this.renderAdminMissionsManagement(mode === 'chapter' ? 'chapters' : 'abyss');
            } catch (err) {
                console.error('[UI] Erro ao criar atividade:', err);
                this.showToast('Erro ao criar no Firestore: ' + err.message, 'error');
            } finally {
                saveBtn.disabled = false;
                saveBtn.innerHTML = '<span class="btn-text">SALVAR NO FIRESTORE</span><span class="btn-glow"></span>';
            }
        };

        modal.classList.remove('hidden');
    }

    async confirmDeleteActivity(mode, parentId, itemIdx, title) {
        if (!confirm(`Tem certeza que deseja excluir permanentemente a missão "${title}"?`)) return;

        try {
            if (mode === 'chapter') {
                await missionsManager.deleteChapterActivity(parentId, itemIdx);
            } else {
                await missionsManager.deleteAbyssChamber(parentId, itemIdx);
            }
            this.showToast('Missão excluída com sucesso!', 'info');
            this.renderAdminMissionsManagement(mode === 'chapter' ? 'chapters' : 'abyss');
        } catch (e) {
            console.error('[UI] Erro ao excluir missão:', e);
            this.showToast('Erro ao excluir: ' + e.message, 'error');
        }
    }

    closeEditMissionModal() {
        const modal = document.getElementById('modal-edit-mission');
        if (modal) modal.classList.add('hidden');
    }

    
    }

    if (typeof UIRenderer !== "undefined") {
        const descriptors = Object.getOwnPropertyDescriptors(_Extension.prototype);
        delete descriptors.constructor;
        Object.defineProperties(UIRenderer.prototype, descriptors);
    }
})();
