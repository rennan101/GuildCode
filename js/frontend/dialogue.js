/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — Dialogue Engine
   ═══════════════════════════════════════════════════════════════ */

class DialogueEngine {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.messages = [];
        this.currentIndex = 0;
        this.isTyping = false;
        this.autoPlay = false;
        this.autoPlayTimer = null;
        this.autoPlayDelay = options.autoPlayDelay || 3000;
        this.onComplete = options.onComplete || null;
        this.onMessageShow = options.onMessageShow || null;
        this.currentTypewriter = null;
        this.showingPortrait = false;
        this.lastCharacter = null;
    }

    // ─── START DIALOGUE ───
    start(messages, onComplete) {
        this.messages = messages;
        this.currentIndex = 0;
        this.onComplete = onComplete || this.onComplete;
        this.container.innerHTML = '';
        this.showNext();
    }

    // ─── RENDER ALL MESSAGES IMMEDIATELY (Already viewed story) ───
    renderAll(messages) {
        this.messages = messages;
        this.container.innerHTML = '';
        this.lastCharacter = null;
        for (const msg of messages) {
            if (msg.type === 'delay') continue;
            const el = this.createMessageElement(msg);
            if (el) {
                if (msg.type === 'character' || msg.type === 'gm') {
                    const textEl = el.querySelector('.dialogue-text');
                    if (textEl && msg.text) {
                        textEl.innerHTML = msg.text;
                    }
                }
                el.style.opacity = '1';
                this.container.appendChild(el);
            }
        }
    }

    // ─── SHOW NEXT MESSAGE ───
    showNext() {
        if (this.currentIndex >= this.messages.length) {
            this.finish();
            return;
        }

        const msg = this.messages[this.currentIndex];
        this.currentIndex++;

        // Handle delays
        if (msg.type === 'delay') {
            setTimeout(() => this.showNext(), msg.ms || 500);
            return;
        }

        // Create message element
        const el = this.createMessageElement(msg);
        if (el) {
            this.container.appendChild(el);

            // Typewriter for character and GM speech
            if ((msg.type === 'character' || msg.type === 'gm') && msg.text) {
                const textEl = el.querySelector('.dialogue-text');
                if (textEl) {
                    this.typewrite(textEl, msg.text, () => {
                        this.autoAdvance();
                    });
                    return; // Don't autoAdvance until typewriter finishes
                }
            }

            // Scroll into view
            if (this.container) {
                this.container.scrollTop = this.container.scrollHeight;
            }

            // Notify callback
            if (this.onMessageShow) this.onMessageShow(msg);

            // Auto advance after a short delay for non-character messages
            setTimeout(() => this.showNext(), 100);
        } else {
            this.showNext();
        }
    }

    // ─── CREATE MESSAGE DOM ELEMENT ───
    createMessageElement(msg) {
        const wrapper = document.createElement('div');
        wrapper.className = 'dialogue-entry';
        wrapper.style.opacity = '0';
        wrapper.style.transition = 'opacity 0.3s ease';

        switch (msg.type) {
            case 'system':
                wrapper.innerHTML = `<div class="dialogue-system">[ SISTEMA ] ${msg.text}</div>`;
                break;

            case 'narrative':
                wrapper.innerHTML = `<div class="dialogue-narrative">${msg.text}</div>`;
                break;

            case 'character': {
                const char = CHARACTER_LOOKUP[msg.cssClass] || CHARACTER_LOOKUP[msg.name?.toLowerCase()] || null;
                const charColor = char ? char.color : 'var(--text-primary)';
                const charBorder = char ? char.borderColor : 'var(--border-dim)';

                // Show portrait only if character changed
                let portraitHtml = '';
                if (char && msg.cssClass !== this.lastCharacter) {
                    portraitHtml = `<div class="dialogue-portrait" style="border-color: ${charBorder}">
                        <pre class="portrait-ascii" style="color: ${charColor}">${char.portrait.join('\n')}</pre>
                    </div>`;
                    this.showingPortrait = true;
                }

                const nameDisplay = msg.name || (char ? char.fullName : 'Desconhecido');
                const roleDisplay = msg.role || (char ? char.role : '');
                const showName = msg.cssClass !== this.lastCharacter;
                this.lastCharacter = msg.cssClass;

                wrapper.innerHTML = `
                    ${portraitHtml}
                    <div class="dialogue-character" style="border-color: ${charBorder}">
                        ${showName ? `<div class="dialogue-speaker" style="color: ${charColor}">${nameDisplay}</div>` : ''}
                        ${showName && roleDisplay ? `<div class="dialogue-role">${roleDisplay}</div>` : ''}
                        <div class="dialogue-text"></div>
                    </div>
                `;
                break;
            }

            case 'quest':
                wrapper.innerHTML = `<div class="dialogue-quest">${msg.text}</div>`;
                break;

            case 'gm': {
                const gmChar = CHARACTERS.gm;
                let portraitHtml = '';
                if (this.lastCharacter !== 'gm') {
                    portraitHtml = `<div class="dialogue-portrait" style="border-color: ${gmChar.borderColor}">
                        <pre class="portrait-ascii" style="color: ${gmChar.color}">${gmChar.portrait.join('\n')}</pre>
                    </div>`;
                }
                const showGmName = this.lastCharacter !== 'gm';
                this.lastCharacter = 'gm';
                wrapper.innerHTML = `
                    ${portraitHtml}
                    <div class="dialogue-character" style="border-color: ${gmChar.borderColor}">
                        ${showGmName ? `<div class="dialogue-speaker" style="color: ${gmChar.color}">${gmChar.fullName}</div>` : ''}
                        ${showGmName ? `<div class="dialogue-role">${gmChar.role}</div>` : ''}
                        <div class="dialogue-text"></div>
                    </div>
                `;
                break;
            }

            default:
                wrapper.innerHTML = `<div class="dialogue-system">${msg.text || ''}</div>`;
        }

        // Fade in
        requestAnimationFrame(() => {
            requestAnimationFrame(() => { wrapper.style.opacity = '1'; });
        });

        return wrapper;
    }

    // ─── TYPEWRITER EFFECT ───
    typewrite(element, html, callback) {
        this.isTyping = true;
        // Parse HTML into text and tags
        const temp = document.createElement('div');
        temp.innerHTML = html;
        const text = temp.textContent;
        const fullHtml = temp.innerHTML;

        let charIndex = 0;
        let inTag = false;
        let currentHtml = '';

        const type = () => {
            if (charIndex >= text.length) {
                element.innerHTML = fullHtml;
                this.isTyping = false;
                if (callback) callback();
                return;
            }

            charIndex++;
            // Rebuild HTML up to current character count
            let count = 0;
            let htmlIdx = 0;
            while (count < charIndex && htmlIdx < fullHtml.length) {
                if (fullHtml[htmlIdx] === '<') {
                    // Skip tag
                    while (htmlIdx < fullHtml.length && fullHtml[htmlIdx] !== '>') htmlIdx++;
                    htmlIdx++; // skip >
                } else {
                    count++;
                    htmlIdx++;
                }
            }
            element.innerHTML = fullHtml.substring(0, htmlIdx) + '<span class="cursor-blink">_</span>';

            // Auto-scroll as typewriter progresses
            if (this.container) {
                this.container.scrollTop = this.container.scrollHeight;
            }

            this.currentTypewriter = setTimeout(type, 25);
        };

        type();
    }

    // ─── SKIP TYPEWRITER (show full text) ───
    skipTypewriter() {
        if (this.isTyping && this.currentTypewriter) {
            clearTimeout(this.currentTypewriter);
            this.isTyping = false;
            // Show full text of current message
            const entries = this.container.querySelectorAll('.dialogue-entry');
            const lastEntry = entries[entries.length - 1];
            if (lastEntry) {
                const textEl = lastEntry.querySelector('.dialogue-text');
                if (textEl && this.currentIndex > 0) {
                    const prevMsg = this.messages[this.currentIndex - 1];
                    if (prevMsg && prevMsg.text) {
                        textEl.innerHTML = prevMsg.text;
                    }
                }
            }
            this.autoAdvance();
        }
    }

    // ─── AUTO ADVANCE ───
    autoAdvance() {
        if (this.autoPlay) {
            this.autoPlayTimer = setTimeout(() => this.showNext(), this.autoPlayDelay);
        }
        // Otherwise wait for user click
    }

    // ─── USER ADVANCE (click/tap) ───
    advance() {
        // If typewriter is running, skip it
        if (this.isTyping) {
            this.skipTypewriter();
            return;
        }

        // Clear auto-play timer
        if (this.autoPlayTimer) {
            clearTimeout(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }

        // Show next message
        this.showNext();
    }

    // ─── TOGGLE AUTO-PLAY ───
    toggleAutoPlay() {
        this.autoPlay = !this.autoPlay;
        if (this.autoPlay) {
            // Start auto-play from current position
            this.autoAdvance();
        } else {
            if (this.autoPlayTimer) {
                clearTimeout(this.autoPlayTimer);
                this.autoPlayTimer = null;
            }
        }
        return this.autoPlay;
    }

    // ─── FINISH DIALOGUE ───
    finish() {
        this.isTyping = false;
        if (this.currentTypewriter) clearTimeout(this.currentTypewriter);
        if (this.autoPlayTimer) clearTimeout(this.autoPlayTimer);
        if (this.onComplete) this.onComplete();
    }

    // ─── CLEANUP ───
    destroy() {
        this.isTyping = false;
        if (this.currentTypewriter) clearTimeout(this.currentTypewriter);
        if (this.autoPlayTimer) clearTimeout(this.autoPlayTimer);
        this.container.innerHTML = '';
    }
}
