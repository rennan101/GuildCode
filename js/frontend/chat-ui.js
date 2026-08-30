/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — Mini Chat UI Controller
   Collapsible bottom-left widget with Guild & Party channels.
   ═══════════════════════════════════════════════════════════════ */

class ChatUI {
    constructor() {
        this.initialized = false;
        this.isOpen = false;
        this.activeChannel = 'guild'; // 'guild' | 'party'
    }

    async init() {
        if (!this.initialized) {
            this.createDOM();
            this.bindEvents();
            this.initialized = true;
        }

        await this.refreshAccess();

        if (typeof chatManager !== 'undefined') {
            chatManager.startListening((messages, channel, hasAccess) => {
                this.renderMessages(messages, channel, hasAccess);
                this.updateUnreadIndicator();
            });
        }
    }

    async refreshAccess() {
        const widget = document.getElementById('mini-chat-widget');
        if (!widget || typeof chatManager === 'undefined') return;

        const access = await chatManager.checkUserAccess();

        // Se o usuário não estiver em nenhuma guilda nem party, o chat não é exibido
        if (!access.canAccess) {
            widget.style.display = 'none';
            return;
        }

        // Se estiver em uma tela in-game, exibe o widget
        const activeScreen = (typeof app !== 'undefined' && app.engine) ? app.engine.currentScreen : 'dashboard';
        const inGameScreens = ['dashboard', 'ranked', 'tournament', 'party', 'chapter', 'abyss', 'character'];
        if (inGameScreens.includes(activeScreen)) {
            widget.style.display = 'block';
        }

        // Ajusta abas disponíveis
        const tabGuild = document.getElementById('mini-chat-tab-guild');
        const tabParty = document.getElementById('mini-chat-tab-party');

        if (tabGuild) {
            if (!access.hasGuild) {
                tabGuild.style.opacity = '0.4';
                tabGuild.title = 'Você precisa ingressar em uma Guilda';
            } else {
                tabGuild.style.opacity = '1';
                tabGuild.title = 'Canal da Guilda';
            }
        }

        if (tabParty) {
            if (!access.hasParty) {
                tabParty.style.opacity = '0.4';
                tabParty.title = 'Você precisa entrar em uma Party';
            } else {
                tabParty.style.opacity = '1';
                tabParty.title = 'Canal da Party';
            }
        }

        // Se o canal ativo atual não tiver acesso, troca para o que tiver
        if (this.activeChannel === 'guild' && !access.hasGuild && access.hasParty) {
            this.switchChannel('party');
        } else if (this.activeChannel === 'party' && !access.hasParty && access.hasGuild) {
            this.switchChannel('guild');
        }
    }

    createDOM() {
        if (document.getElementById('mini-chat-widget')) return;

        const widget = document.createElement('div');
        widget.id = 'mini-chat-widget';
        widget.className = 'mini-chat-widget collapsed';

        widget.innerHTML = `
            <!-- BARRA ENCOLHIDA -->
            <div class="mini-chat-collapsed-bar" onclick="chatUI.toggleChat()">
                <div class="mini-chat-collapsed-left">
                    <div class="mini-chat-status-pulse"></div>
                    <svg class="mini-chat-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    <span class="mini-chat-collapsed-title">CHAT • <b id="mini-chat-active-channel-label" style="color:var(--cyan);">GUILDA</b></span>
                    <span id="mini-chat-unread-badge" class="mini-chat-unread-badge hidden">0</span>
                </div>
                <button class="mini-chat-toggle-btn" title="Expandir Chat" type="button" aria-label="Expandir Chat">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="18 15 12 9 6 15"/>
                    </svg>
                </button>
            </div>

            <!-- PAINEL EXPANDIDO -->
            <div class="mini-chat-expanded-panel">
                <div class="mini-chat-header">
                    <div class="mini-chat-tabs">
                        <button id="mini-chat-tab-guild" class="mini-chat-tab active" type="button" onclick="chatUI.switchChannel('guild')">
                            <span>GUILDA</span>
                        </button>
                        <button id="mini-chat-tab-party" class="mini-chat-tab" type="button" onclick="chatUI.switchChannel('party')">
                            <span>PARTY</span>
                        </button>
                    </div>
                    <div class="mini-chat-header-actions">
                        <button class="mini-chat-header-btn" type="button" onclick="chatUI.toggleChat()" title="Encolher Chat" aria-label="Encolher Chat">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="6 9 12 15 18 9"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="mini-chat-system-bar">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--gold);flex-shrink:0;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span>O chat é resetado diariamente às 00:00.</span>
                </div>

                <div id="mini-chat-messages" class="mini-chat-messages">
                    <div class="mini-chat-empty">Carregando mensagens...</div>
                </div>

                <form id="mini-chat-form" class="mini-chat-input-row" onsubmit="chatUI.handleSubmit(event)">
                    <input type="text" id="mini-chat-input" class="mini-chat-input" placeholder="Mensagem para a guilda..." maxlength="250" autocomplete="off" />
                    <button type="submit" class="mini-chat-send-btn" title="Enviar Mensagem">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                    </button>
                </form>
            </div>
        `;

        document.body.appendChild(widget);
    }

    bindEvents() {
        const input = document.getElementById('mini-chat-input');
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleSubmit(e);
                }
            });
        }
    }

    toggleChat() {
        const widget = document.getElementById('mini-chat-widget');
        if (!widget) return;

        this.isOpen = !this.isOpen;
        if (typeof chatManager !== 'undefined') {
            chatManager.isOpen = this.isOpen;
        }

        if (this.isOpen) {
            widget.classList.remove('collapsed');
            widget.classList.add('expanded');
            if (typeof chatManager !== 'undefined') {
                chatManager.markAsRead();
            }
            this.updateUnreadIndicator();
            this.scrollToBottom();
            const input = document.getElementById('mini-chat-input');
            if (input) setTimeout(() => input.focus(), 150);
        } else {
            widget.classList.remove('expanded');
            widget.classList.add('collapsed');
        }
    }

    async switchChannel(channel) {
        if (this.activeChannel === channel) return;
        this.activeChannel = channel;

        const tabGuild = document.getElementById('mini-chat-tab-guild');
        const tabParty = document.getElementById('mini-chat-tab-party');
        const label = document.getElementById('mini-chat-active-channel-label');
        const input = document.getElementById('mini-chat-input');

        if (channel === 'guild') {
            if (tabGuild) tabGuild.classList.add('active');
            if (tabParty) tabParty.classList.remove('active');
            if (label) { label.textContent = 'GUILDA'; label.style.color = 'var(--cyan)'; }
            if (input) input.placeholder = 'Mensagem para a guilda...';
        } else {
            if (tabParty) tabParty.classList.add('active');
            if (tabGuild) tabGuild.classList.remove('active');
            if (label) { label.textContent = 'PARTY'; label.style.color = 'var(--purple-bright)'; }
            if (input) input.placeholder = 'Mensagem para sua party...';
        }

        const messagesContainer = document.getElementById('mini-chat-messages');
        if (messagesContainer) {
            messagesContainer.innerHTML = '<div class="mini-chat-empty">Conectando ao canal ' + channel.toUpperCase() + '...</div>';
        }

        if (typeof chatManager !== 'undefined') {
            await chatManager.setChannel(channel);
        }
    }

    renderMessages(messages = [], channel = this.activeChannel, hasAccess = true) {
        const container = document.getElementById('mini-chat-messages');
        if (!container) return;

        if (!hasAccess) {
            if (channel === 'party') {
                container.innerHTML = `
                    <div class="mini-chat-empty" style="padding:1.5rem 1rem;text-align:center;">
                        <div style="color:var(--text-ghost);font-size:0.75rem;margin-bottom:0.4rem;">VOCÊ NÃO ESTÁ EM UMA PARTY</div>
                        <div style="font-size:0.7rem;color:var(--text-dim);line-height:1.4;">Crie ou entre em um grupo na tela de <strong>Party</strong> para conversar com seus companheiros.</div>
                    </div>
                `;
            } else {
                container.innerHTML = `
                    <div class="mini-chat-empty" style="padding:1.5rem 1rem;text-align:center;">
                        <div style="color:var(--text-ghost);font-size:0.75rem;margin-bottom:0.4rem;">SEM GUILDA VINCULADA</div>
                        <div style="font-size:0.7rem;color:var(--text-dim);line-height:1.4;">Ingresse em uma <strong>Guilda</strong> para interagir no chat coletivo.</div>
                    </div>
                `;
            }
            return;
        }

        if (!messages || messages.length === 0) {
            container.innerHTML = `
                <div class="mini-chat-empty">
                    <div style="font-size:0.75rem;color:var(--text-dim);">Nenhuma mensagem enviada hoje no canal ${channel.toUpperCase()}.</div>
                    <div style="font-size:0.68rem;color:var(--text-ghost);margin-top:0.2rem;">Envie uma mensagem para iniciar o chat!</div>
                </div>
            `;
            return;
        }

        const currentUid = (typeof authManager !== 'undefined' && authManager.currentUser?.uid) || '';

        let html = '';
        messages.forEach(msg => {
            const isMine = msg.uid === currentUid;
            const isTeacher = msg.isTeacher || msg.role === 'teacher';
            
            // Subclass color
            let subColor = 'var(--cyan)';
            if (isTeacher) subColor = 'var(--gold)';
            else if (typeof SUBCLASSES_DATA !== 'undefined' && msg.subclass && SUBCLASSES_DATA[msg.subclass]) {
                subColor = SUBCLASSES_DATA[msg.subclass].color || 'var(--cyan)';
            }

            // Timestamp formatting (HH:MM)
            let timeStr = '';
            if (msg.createdAt?.seconds) {
                const d = new Date(msg.createdAt.seconds * 1000);
                timeStr = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
            } else if (msg.timestamp) {
                const d = new Date(msg.timestamp);
                timeStr = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
            }

            // Dynamic avatar resolution
            let avatarSrc = msg.photoURL;
            if (isMine && typeof authManager !== 'undefined' && authManager.getPhotoURL) {
                avatarSrc = authManager.getPhotoURL();
            }
            if (!avatarSrc || !avatarSrc.startsWith('assets/avatars/')) {
                avatarSrc = isTeacher ? 'assets/avatars/avatar_01.png' : 'assets/avatars/avatar_02.png';
            }

            html += `
                <div class="mini-chat-msg-row ${isMine ? 'is-mine' : ''}">
                    <div class="mini-chat-msg-avatar-box">
                        <img src="${avatarSrc}" class="mini-chat-msg-avatar" alt="${msg.displayName || 'Jogador'}" style="border-color:${subColor};" />
                    </div>
                    <div class="mini-chat-msg-body">
                        <div class="mini-chat-msg-meta">
                            <span class="mini-chat-msg-author" style="color:${subColor};">${msg.displayName || 'Aprendiz'}</span>
                            ${isTeacher ? '<span class="mini-chat-badge-teacher">MESTRE</span>' : `<span class="mini-chat-msg-lvl">LV.${msg.level || 1}</span>`}
                            <span class="mini-chat-msg-time">${timeStr}</span>
                        </div>
                        <div class="mini-chat-msg-bubble ${isMine ? 'mine' : ''}">
                            ${this.escapeHTML(msg.text || '')}
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
        this.scrollToBottom();
    }

    scrollToBottom() {
        const container = document.getElementById('mini-chat-messages');
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }

    updateUnreadIndicator() {
        const badge = document.getElementById('mini-chat-unread-badge');
        if (!badge || typeof chatManager === 'undefined') return;

        const count = chatManager.unreadCount || 0;
        if (count > 0 && !this.isOpen) {
            badge.textContent = count > 9 ? '9+' : String(count);
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }

    async handleSubmit(e) {
        if (e) e.preventDefault();
        const input = document.getElementById('mini-chat-input');
        if (!input) return;

        const text = input.value.trim();
        if (!text) return;

        input.value = '';

        try {
            if (typeof chatManager !== 'undefined') {
                await chatManager.sendMessage(text);
                this.scrollToBottom();
            }
        } catch (err) {
            console.warn('[ChatUI] Submit error:', err);
            if (typeof app !== 'undefined' && app.ui) {
                app.ui.showToast(err.message || 'Erro ao enviar mensagem.', 'error');
            }
        }
    }

    escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}

const chatUI = new ChatUI();
