/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — BOSS BATTLE RAIDS: ANIMATION CONTROLLER
   Sequências animadas de combate, dashes, tremores e números flutuantes
   (Seção 19 de CODE_LEVELER_BOSS_BATTLE_RAIDS.md)
   ═══════════════════════════════════════════════════════════════ */

class RaidAnimations {
    /**
     * Exibe número flutuante de dano, cura ou MISS sobre o elemento
     * Duração estendida para leitura confortável (2400ms)
     */
    static showFloatingText(targetEl, text, type = 'damage') {
        if (!targetEl) return;
        const rect = targetEl.getBoundingClientRect();

        const floatEl = document.createElement('div');
        floatEl.className = `raid-floating-text ${type}`;
        floatEl.textContent = text;

        // Posição no centro do elemento alvo com leve dispersão randômica
        const offsetX = (Math.random() - 0.5) * 24;
        const offsetY = (Math.random() - 0.5) * 12;
        floatEl.style.left = `${rect.left + rect.width / 2 + offsetX}px`;
        floatEl.style.top = `${rect.top + rect.height * 0.25 + offsetY}px`;

        document.body.appendChild(floatEl);

        setTimeout(() => {
            if (floatEl.parentNode) {
                floatEl.parentNode.removeChild(floatEl);
            }
        }, 2400);
    }

    /**
     * Gera partículas dinâmicas voando/saltando a partir do alvo atingido
     * Tipos: 'damage' (faíscas/brasas), 'crit' (estilhaços dourados), 'miss' (fagulhas azuis), 'heal' (orbes esmeralda)
     */
    static spawnImpactParticles(targetEl, type = 'damage', count = 14) {
        if (!targetEl) return;
        const rect = targetEl.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height * 0.4;

        const container = document.body;
        const particleCount = Math.min(24, Math.max(8, count));

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = `raid-impact-particle ${type}`;

            // Vetor radial de explosão e dispersão
            const angle = Math.random() * Math.PI * 2;
            const distance = 40 + Math.random() * 80;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance - (type === 'heal' ? 30 : 15); // cura sobe mais
            const rot = (Math.random() - 0.5) * 360;
            const scale = 0.6 + Math.random() * 0.8;
            const duration = 650 + Math.random() * 450;

            particle.style.left = `${originX}px`;
            particle.style.top = `${originY}px`;
            particle.style.setProperty('--dx', `${dx}px`);
            particle.style.setProperty('--dy', `${dy}px`);
            particle.style.setProperty('--rot', `${rot}deg`);
            particle.style.setProperty('--scale', scale);
            particle.style.animationDuration = `${duration}ms`;

            container.appendChild(particle);

            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, duration + 50);
        }
    }

    /**
     * Aplica breve impacto e flash de impacto na tela/arena
     */
    static triggerScreenImpact(intensity = 'medium') {
        const arena = document.getElementById('boss-raid-arena') || document.querySelector('.boss-raid-arena');
        if (arena) {
            arena.classList.remove('anim-arena-shake', 'anim-arena-shake-heavy');
            void arena.offsetWidth; // Força reflow
            arena.classList.add(intensity === 'heavy' ? 'anim-arena-shake-heavy' : 'anim-arena-shake');
            setTimeout(() => {
                arena.classList.remove('anim-arena-shake', 'anim-arena-shake-heavy');
            }, 450);
        }

        // Breve flash de impacto periférico
        const flash = document.createElement('div');
        flash.className = `raid-impact-flash ${intensity === 'heavy' ? 'crit' : 'standard'}`;
        document.body.appendChild(flash);
        setTimeout(() => {
            if (flash.parentNode) flash.parentNode.removeChild(flash);
        }, 320);
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

                // 3. Efeito de Partículas e Tremor de Impacto
                this.spawnImpactParticles(bossArenaEl, isCrit ? 'crit' : 'damage', isCrit ? 20 : 14);
                this.triggerScreenImpact(isCrit ? 'heavy' : 'medium');

                // 4. Número flutuante de dano com duração estendida
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
                            this.spawnImpactParticles(targetEl, 'damage', 12);
                            this.triggerScreenImpact('medium');
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
     * Animação de MISS com partículas de desvio/deflexão
     */
    static animateMiss(targetEl) {
        if (window.raidAudio) window.raidAudio.playEvent('miss');
        this.spawnImpactParticles(targetEl, 'miss', 8);
        this.showFloatingText(targetEl, 'MISS', 'miss');
    }

    /**
     * Animação de Cura com partículas esmeralda
     */
    static animateHeal(targetEl, amount) {
        if (window.raidAudio) window.raidAudio.playEvent('item');
        if (targetEl) targetEl.classList.add('anim-target-heal');
        this.spawnImpactParticles(targetEl, 'heal', 10);
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
        this.spawnImpactParticles(targetEl, 'heal', 18);
        this.showFloatingText(targetEl, `REVIVIDO (+${amount})`, 'revive');
        setTimeout(() => {
            if (targetEl) targetEl.classList.remove('anim-target-revive');
        }, 800);
    }
}

window.RaidAnimations = RaidAnimations;
