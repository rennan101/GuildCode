/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — BOSS BATTLE RAIDS: ANIMATION CONTROLLER
   Sequências animadas de combate, dashes, tremores e números flutuantes
   (Seção 19 de CODE_LEVELER_BOSS_BATTLE_RAIDS.md)
   ═══════════════════════════════════════════════════════════════ */

class RaidAnimations {
    /**
     * Exibe número flutuante de dano, cura ou MISS sobre o elemento
     */
    static showFloatingText(targetEl, text, type = 'damage') {
        if (!targetEl) return;
        const rect = targetEl.getBoundingClientRect();

        const floatEl = document.createElement('div');
        floatEl.className = `raid-floating-text ${type}`;
        floatEl.textContent = text;

        // Posição no centro do elemento alvo
        floatEl.style.left = `${rect.left + rect.width / 2}px`;
        floatEl.style.top = `${rect.top + rect.height * 0.25}px`;

        document.body.appendChild(floatEl);

        setTimeout(() => {
            if (floatEl.parentNode) {
                floatEl.parentNode.removeChild(floatEl);
            }
        }, 1200);
    }

    /**
     * Animação completa de ataque do jogador contra o Boss
     */
    static animatePlayerAttack(playerCardEl, bossArenaEl, damageAmount, isCrit = false) {
        return new Promise(resolve => {
            if (!playerCardEl || !bossArenaEl) {
                resolve();
                return;
            }

            // Som de ataque
            if (window.raidAudio) window.raidAudio.playEvent('attack');

            // 1. Dash de avanço do herói
            playerCardEl.classList.add('anim-hero-dash');

            setTimeout(() => {
                // 2. Impacto no Boss
                bossArenaEl.classList.add('anim-boss-hit');
                if (window.raidAudio) window.raidAudio.playEvent('damage');

                // 3. Número flutuante de dano
                this.showFloatingText(bossArenaEl, `-${damageAmount}`, isCrit ? 'crit' : 'damage');

                setTimeout(() => {
                    bossArenaEl.classList.remove('anim-boss-hit');
                    playerCardEl.classList.remove('anim-hero-dash');
                    resolve();
                }, 400);
            }, 300);
        });
    }

    /**
     * Animação do Boss atacando os jogadores alvos sequencialmente
     */
    static animateBossAttack(bossArenaEl, targetEls = [], damages = []) {
        return new Promise(async resolve => {
            if (!bossArenaEl || targetEls.length === 0) {
                resolve();
                return;
            }

            for (let i = 0; i < targetEls.length; i++) {
                const targetEl = targetEls[i];
                const dmg = damages[i] || 0;

                await new Promise(r => {
                    // Avanço do Boss
                    bossArenaEl.classList.add('anim-boss-dash');
                    if (window.raidAudio) window.raidAudio.playEvent('attack');

                    setTimeout(() => {
                        // Impacto no jogador
                        if (targetEl) {
                            targetEl.classList.add('anim-target-hit');
                            if (window.raidAudio) window.raidAudio.playEvent('damage');
                            this.showFloatingText(targetEl, `-${dmg}`, 'damage');
                        }

                        setTimeout(() => {
                            if (targetEl) targetEl.classList.remove('anim-target-hit');
                            bossArenaEl.classList.remove('anim-boss-dash');
                            r();
                        }, 350);
                    }, 250);
                });
            }

            resolve();
        });
    }

    /**
     * Animação de MISS
     */
    static animateMiss(targetEl) {
        if (window.raidAudio) window.raidAudio.playEvent('miss');
        this.showFloatingText(targetEl, 'MISS', 'miss');
    }

    /**
     * Animação de Cura
     */
    static animateHeal(targetEl, amount) {
        if (window.raidAudio) window.raidAudio.playEvent('item');
        if (targetEl) targetEl.classList.add('anim-target-heal');
        this.showFloatingText(targetEl, `+${amount}`, 'heal');
        setTimeout(() => {
            if (targetEl) targetEl.classList.remove('anim-target-heal');
        }, 500);
    }

    /**
     * Animação de Reviver
     */
    static animateRevive(targetEl, amount) {
        if (window.raidAudio) window.raidAudio.playEvent('revive');
        if (targetEl) targetEl.classList.add('anim-target-revive');
        this.showFloatingText(targetEl, `REVIVIDO (+${amount})`, 'revive');
        setTimeout(() => {
            if (targetEl) targetEl.classList.remove('anim-target-revive');
        }, 800);
    }
}

window.RaidAnimations = RaidAnimations;
