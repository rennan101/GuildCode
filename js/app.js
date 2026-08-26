/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — Main Application Controller
   Ties together engine, UI, and handles all user interactions.
   ═══════════════════════════════════════════════════════════════ */

class GuildCodeApp {
    constructor() {
        this.engine = new GameEngine();
        this.ui = new UIRenderer(this.engine);
        this.tutorialStep = 0;
    }

    init() {
        this.ui.initParticles();
        this.bindGlobalEvents();

        // Loading screen
        this.ui.showScreen('loading');
        setTimeout(() => {
            if (this.engine.state.initialized && this.engine.getPlayerName()) {
                this.ui.showScreen('dashboard');
                this.ui.renderDashboard();
            } else {
                this.ui.showScreen('title');
            }
        }, 2200);
    }

    bindGlobalEvents() {
        // Title screen
        document.getElementById('btn-start').onclick = () => {
            this.ui.showScreen('name');
            this.ui.setupNameEntry((name) => this.onNameConfirmed(name));
        };

        // Dashboard
        document.getElementById('btn-back-dashboard').onclick = () => {
            this.ui.showScreen('dashboard');
            this.ui.renderDashboard();
        };

        // Chapter editor buttons
        document.getElementById('btn-run-code').onclick = () => {
            const code = document.getElementById('code-editor').value;
            this.ui.runCode(code, 'terminal-output');
        };

        document.getElementById('btn-reset-code').onclick = () => {
            const ch = this.ui.currentChapterData;
            if (ch && ch.experiment) {
                document.getElementById('code-editor').value = ch.experiment.starterCode;
                this.ui.updateLineNumbers(document.getElementById('code-editor'), 'line-numbers');
            }
        };

        document.getElementById('btn-check-code').onclick = () => {
            // For chapter screen, just run the code
            const code = document.getElementById('code-editor').value;
            this.ui.runCode(code, 'terminal-output');
        };

        document.getElementById('btn-clear-terminal').onclick = () => {
            document.getElementById('terminal-output').innerHTML = '<div class="terminal-line system">[ SISTEMA ] Terminal limpo.</div>';
        };

        // Activity editor buttons
        document.getElementById('btn-run-activity').onclick = () => {
            const code = document.getElementById('activity-editor').value;
            this.ui.runCode(code, 'activity-terminal-output');
        };

        document.getElementById('btn-submit-activity').onclick = () => {
            const code = document.getElementById('activity-editor').value;
            const passed = this.ui.checkActivity(code);

            if (passed) {
                const ch = this.ui.currentChapterData;
                const actIdx = this.engine.state.currentActivity;
                this.engine.completeChapterStep(ch.id, `act${actIdx + 1}`);
                this.engine.addXP(ch.activities[actIdx].difficulty === 'easy' ? 30 : 50);
                this.ui.showToast(`+${ch.activities[actIdx].difficulty === 'easy' ? 30 : 50} XP`, 'xp');
                this.engine.incrementStat('activitiesCompleted');

                // Check if all activities are done
                const allDone = ch.activities.every((_, idx) =>
                    this.engine.state.chapters[ch.id] && this.engine.state.chapters[ch.id][`act${idx + 1}`]
                );

                if (allDone) {
                    setTimeout(() => this.completeChapterReward(ch.id), 1000);
                } else {
                    setTimeout(() => {
                        this.ui.showToast('Atividade completada!', 'success');
                        // Return to chapter
                        setTimeout(() => {
                            this.ui.openChapter(ch.id);
                        }, 1500);
                    }, 500);
                }
            }
        };

        document.getElementById('btn-reset-activity').onclick = () => {
            const act = this.ui.currentActivityData;
            if (act) {
                document.getElementById('activity-editor').value = act.starterCode;
                this.ui.updateLineNumbers(document.getElementById('activity-editor'), 'activity-line-numbers');
            }
        };

        document.getElementById('btn-hint').onclick = () => {
            // Switch to hints tab
            const tabs = document.querySelectorAll('.terminal-tab');
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.terminal-panel').forEach(p => p.classList.remove('active'));
            tabs[2].classList.add('active');
            document.getElementById('panel-hints').classList.add('active');
        };

        document.getElementById('btn-back-chapter').onclick = () => {
            if (this.ui.currentChapterData) {
                this.ui.openChapter(this.ui.currentChapterData.id);
            }
        };

        // Reward screen
        document.getElementById('btn-reward-continue').onclick = () => {
            this.ui.showScreen('dashboard');
            this.ui.renderDashboard();
        };

        // Modal
        document.getElementById('btn-modal-close').onclick = () => {
            this.ui.hideModal();
        };

        document.querySelector('.modal-backdrop').onclick = () => {
            this.ui.hideModal();
        };
    }

    onNameConfirmed(name) {
        this.engine.setPlayerName(name);
        this.ui.playPrologue(name, () => {
            this.ui.showScreen('dashboard');
            this.ui.renderDashboard();
            this.ui.showToast(`Bem-vindo, ${name}!`, 'info');
        });
    }

    openChapter(chapterId) {
        this.ui.openChapter(chapterId);
    }

    startActivity(activityIndex) {
        this.ui.startActivity(activityIndex);
    }

    startExperiment() {
        const ch = this.ui.currentChapterData;
        if (ch && ch.experiment) {
            document.getElementById('code-editor').value = ch.experiment.starterCode;
            this.ui.updateLineNumbers(document.getElementById('code-editor'), 'line-numbers');
            document.getElementById('terminal-output').innerHTML = '<div class="terminal-line system">[ SISTEMA ] Modo experimentação. Modifique e execute.</div>';
        }
    }

    startTutorial() {
        const ch = this.ui.currentChapterData;
        if (!ch || !ch.tutorial) return;

        this.tutorialStep = this.engine.getTutorialStep(ch.id);
        this.showTutorialStep(ch);
    }

    showTutorialStep(ch) {
        const steps = ch.tutorial.steps;
        if (this.tutorialStep >= steps.length) {
            this.engine.completeChapterStep(ch.id, 'tutorial');
            this.engine.addXP(20);
            this.ui.showToast('Tutorial completo! +20 XP', 'xp');
            this.ui.openChapter(ch.id);
            return;
        }

        const step = steps[this.tutorialStep];
        document.getElementById('code-editor').value = step.starterCode;
        this.ui.updateLineNumbers(document.getElementById('code-editor'), 'line-numbers');

        const terminal = document.getElementById('terminal-output');
        terminal.innerHTML = `
            <div class="terminal-line system">[ TUTORIAL ] Passo ${this.tutorialStep + 1}/${steps.length}</div>
            <div class="terminal-line highlight">${step.instruction}</div>
            <div class="terminal-line info">Dica: ${step.hint}</div>
        `;

        // Override run button to check tutorial
        const originalRun = document.getElementById('btn-run-code').onclick;
        document.getElementById('btn-run-code').onclick = () => {
            const code = document.getElementById('code-editor').value;
            const result = this.ui.runCode(code, 'terminal-output');

            // Check if the tutorial solution is close enough
            const solution = step.solution.replace(/\s+/g, ' ').trim();
            const current = code.replace(/\s+/g, ' ').trim();

            if (current === solution || this.ui.checkActivity(code)) {
                this.engine.completeTutorialStep(ch.id, this.tutorialStep);
                this.tutorialStep++;
                this.engine.addXP(15);
                this.ui.showToast('Passo concluído! +15 XP', 'xp');
                setTimeout(() => this.showTutorialStep(ch), 1000);
            }
        };

        // Override check button to load solution
        document.getElementById('btn-check-code').onclick = () => {
            document.getElementById('code-editor').value = step.solution;
            this.ui.updateLineNumbers(document.getElementById('code-editor'), 'line-numbers');
        };
    }

    completeChapterReward(chapterId) {
        const ch = CHAPTERS.find(c => c.id === chapterId);
        if (!ch) return;

        this.engine.completeChapter(chapterId);
        this.engine.addXP(ch.xpReward);

        this.ui.showReward(chapterId);

        setTimeout(() => {
            this.ui.showModal(
                'SISTEMA DESBLOQUEADO',
                `${ch.unlockIcon} ${ch.unlock} foi restaurado na Guilda! Um novo módulo está operacional.`
            );
        }, 500);
    }
}

// ─── BOOT ───
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new GuildCodeApp();
    app.init();
});
