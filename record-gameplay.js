const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { execSync } = require('child_process');

const serveHandler = (req, res) => {
    let rawPath = req.url.split('?')[0];
    let filePath = path.join(__dirname, rawPath === '/' ? 'index.html' : rawPath);
    if (!fs.existsSync(filePath)) {
        res.writeHead(404);
        res.end('Not found');
        return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg'
    };
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
};

(async () => {
    console.log('🚀 Iniciando estúdio de gravação de gameplay profissional...');

    const server = http.createServer(serveHandler);
    await new Promise(resolve => server.listen(3333, resolve));
    console.log('⚡ Servidor local ativo em http://localhost:3333');

    const outputDir = path.join(__dirname, 'recordings');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Limpar arquivos temporários anteriores
    const files = fs.readdirSync(outputDir);
    for (const f of files) {
        if (f.endsWith('.webm')) {
            try { fs.unlinkSync(path.join(outputDir, f)); } catch(e){}
        }
    }

    const browser = await chromium.launch({
        headless: true
    });

    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        recordVideo: {
            dir: outputDir,
            size: { width: 1920, height: 1080 }
        },
        deviceScaleFactor: 1
    });

    const page = await context.newPage();

    try {
        console.log('🌐 Navegando até a plataforma...');
        await page.goto('http://localhost:3333', { waitUntil: 'domcontentloaded', timeout: 30000 });
        await page.waitForTimeout(3000);

        // Esperar app e authManager carregarem
        await page.waitForFunction(() => typeof window.app !== 'undefined' && typeof window.authManager !== 'undefined', { timeout: 15000 }).catch(() => {});
        await page.waitForTimeout(1500);

        // Injetar cursor visual profissional e efeitos de clique
        await page.evaluate(() => {
            const cursor = document.createElement('div');
            cursor.id = 'virtual-promo-cursor';
            cursor.style.position = 'fixed';
            cursor.style.width = '22px';
            cursor.style.height = '22px';
            cursor.style.borderRadius = '50%';
            cursor.style.backgroundColor = 'rgba(0, 240, 255, 0.7)';
            cursor.style.border = '2px solid #ffffff';
            cursor.style.boxShadow = '0 0 15px #00f0ff, 0 0 30px rgba(0, 240, 255, 0.5)';
            cursor.style.pointerEvents = 'none';
            cursor.style.zIndex = '999999';
            cursor.style.transition = 'transform 0.08s ease-out, top 0.35s ease-out, left 0.35s ease-out, background-color 0.2s';
            cursor.style.transform = 'translate(-50%, -50%)';
            cursor.style.top = '100px';
            cursor.style.left = '100px';
            document.body.appendChild(cursor);

            window.moveCursorTo = (x, y) => {
                cursor.style.left = `${x}px`;
                cursor.style.top = `${y}px`;
            };

            window.clickCursor = () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
                cursor.style.backgroundColor = 'rgba(255, 215, 0, 0.9)';
                cursor.style.boxShadow = '0 0 25px #ffd700';
                setTimeout(() => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursor.style.backgroundColor = 'rgba(0, 240, 255, 0.7)';
                    cursor.style.boxShadow = '0 0 15px #00f0ff';
                }, 200);
            };
        });

        // ═══════════════════════════════════════════════════════════
        // CENA 1: LANDING PAGE — APRESENTAÇÃO & SCROLL DINÂMICO
        // ═══════════════════════════════════════════════════════════
        console.log('🎬 CENA 1: Landing Page');
        await page.evaluate(() => window.moveCursorTo(960, 400));
        await page.waitForTimeout(1500);

        // Scroll suave pela landing page
        await page.evaluate(async () => {
            window.moveCursorTo(960, 600);
            for (let i = 0; i < 4; i++) {
                window.scrollBy({ top: 400, behavior: 'smooth' });
                await new Promise(r => setTimeout(r, 700));
            }
        });
        await page.waitForTimeout(1000);

        // Retorna ao topo
        await page.evaluate(async () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        await page.waitForTimeout(1500);

        // ═══════════════════════════════════════════════════════════
        // CENA 2: ABERTURA DO LOGIN & AUTENTICAÇÃO REAL
        // ═══════════════════════════════════════════════════════════
        console.log('🔑 CENA 2: Autenticação da Conta rennan.raffaele@unicap.br');
        
        // Mover cursor até o botão de login da navbar
        await page.evaluate(() => {
            const btn = document.getElementById('btn-landing-login') || document.querySelector('.btn-auth-landing');
            if (btn) {
                const rect = btn.getBoundingClientRect();
                window.moveCursorTo(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }
        });
        await page.waitForTimeout(800);
        await page.evaluate(() => window.clickCursor());

        // Abrir modal de login
        await page.evaluate(() => {
            if (window.app && typeof window.app.showAuthModal === 'function') {
                window.app.showAuthModal('login');
            }
        });
        await page.waitForTimeout(1200);

        // Digitar email e senha
        console.log('✍️ Preenchendo credenciais...');
        await page.evaluate(() => {
            const emailInput = document.getElementById('login-email');
            if (emailInput) {
                const rect = emailInput.getBoundingClientRect();
                window.moveCursorTo(rect.left + 50, rect.top + rect.height / 2);
            }
        });
        await page.waitForTimeout(500);
        await page.evaluate(() => window.clickCursor());

        const email = 'rennan.raffaele@unicap.br';
        for (let char of email) {
            await page.type('#login-email', char, { delay: 35 });
        }
        await page.waitForTimeout(400);

        await page.evaluate(() => {
            const passInput = document.getElementById('login-password');
            if (passInput) {
                const rect = passInput.getBoundingClientRect();
                window.moveCursorTo(rect.left + 50, rect.top + rect.height / 2);
            }
        });
        await page.waitForTimeout(500);
        await page.evaluate(() => window.clickCursor());

        const pass = 'Rennan0712@';
        for (let char of pass) {
            await page.type('#login-password', char, { delay: 40 });
        }
        await page.waitForTimeout(600);

        // Mover cursor até botão "Entrar" e clicar
        await page.evaluate(() => {
            const submitBtn = document.getElementById('btn-login-submit') || document.querySelector('#modal-auth-login .btn-primary-auth');
            if (submitBtn) {
                const rect = submitBtn.getBoundingClientRect();
                window.moveCursorTo(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }
        });
        await page.waitForTimeout(600);
        await page.evaluate(() => window.clickCursor());

        // Efetuar login via authManager ou simulação garantida com dados mestres
        console.log('⚡ Efetuando login...');
        await page.evaluate(async () => {
            try {
                if (window.authManager && typeof window.authManager.loginWithEmail === 'function') {
                    await window.authManager.loginWithEmail('rennan.raffaele@unicap.br', 'Rennan0712@');
                }
            } catch (e) {
                console.warn('Firebase login async note:', e);
            }
        });

        // Aguarda carregar dados do usuário e fechar modal
        await page.waitForTimeout(3000);

        // Garantir transição para o Dashboard de gameplay
        await page.evaluate(() => {
            const modal = document.getElementById('modal-auth');
            if (modal) modal.classList.remove('active');
            if (window.app && window.app.ui) {
                window.app.ui.showScreen('dashboard');
                window.app.ui.renderDashboard();
            }
        });
        await page.waitForTimeout(2000);

        // ═══════════════════════════════════════════════════════════
        // CENA 3: DASHBOARD & PANORÂMICA DO MAPA MUNDI
        // ═══════════════════════════════════════════════════════════
        console.log('🗺️ CENA 3: Exploração do Mapa e Trilhas');
        await page.evaluate(async () => {
            window.moveCursorTo(960, 540);
            const panContainer = document.getElementById('map-pan-container');
            if (panContainer) {
                panContainer.style.transition = 'transform 2s ease-in-out';
                panContainer.style.transform = 'translate(-300px, -150px) scale(1.05)';
                await new Promise(r => setTimeout(r, 2200));
                panContainer.style.transform = 'translate(-600px, -200px) scale(1.05)';
                await new Promise(r => setTimeout(r, 2200));
                panContainer.style.transform = 'translate(0px, 0px) scale(1)';
                await new Promise(r => setTimeout(r, 1800));
            }
        });
        await page.waitForTimeout(1000);

        // ═══════════════════════════════════════════════════════════
        // CENA 4: ARENA DE CÓDIGO (CAPÍTULO 1 & EXECUÇÃO DO CÓDIGO)
        // ═══════════════════════════════════════════════════════════
        console.log('💻 CENA 4: Arena de Código & Compilação');
        
        // Mover cursor até o nó do capítulo 1
        await page.evaluate(() => {
            const node = document.querySelector('.map-node[data-chapter="1"]') || document.querySelector('.map-node');
            if (node) {
                const rect = node.getBoundingClientRect();
                window.moveCursorTo(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }
        });
        await page.waitForTimeout(800);
        await page.evaluate(() => window.clickCursor());

        // Abrir capítulo 1
        await page.evaluate(() => {
            if (window.app && typeof window.app.openChapter === 'function') {
                window.app.openChapter(1);
            }
        });
        await page.waitForTimeout(2500);

        // Mover cursor para o editor de código
        await page.evaluate(() => {
            const editor = document.getElementById('code-editor') || document.querySelector('.screen.active textarea');
            if (editor) {
                const rect = editor.getBoundingClientRect();
                window.moveCursorTo(rect.left + 100, rect.top + 80);
            }
        });
        await page.waitForTimeout(600);
        await page.evaluate(() => window.clickCursor());

        // Digitar código profissional em C
        const codeSnippets = `#include <stdio.h>

int main() {
    printf("==============================\\n");
    printf("   CODE LEVELER — ARENA C     \\n");
    printf("   Player: Rennan Raffaele    \\n");
    printf("   Rank: Grão-Mestre Arcane   \\n");
    printf("==============================\\n");
    printf("Status: Execucao 100%% Aprovada!\\n");
    return 0;
}`;

        await page.evaluate(async (text) => {
            const editor = document.getElementById('code-editor') || document.querySelector('.screen.active textarea');
            if (editor) {
                editor.value = '';
                for (let i = 0; i < text.length; i++) {
                    editor.value += text[i];
                    editor.dispatchEvent(new Event('input', { bubbles: true }));
                    await new Promise(r => setTimeout(r, 14));
                }
            }
        }, codeSnippets);
        await page.waitForTimeout(1000);

        // Mover cursor até "Executar Código" e clicar
        await page.evaluate(() => {
            const runBtn = document.querySelector('.screen.active #btn-run-code, #btn-run-code, .screen.active #btn-run-activity, #btn-run-activity');
            if (runBtn) {
                const rect = runBtn.getBoundingClientRect();
                window.moveCursorTo(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }
        });
        await page.waitForTimeout(800);
        await page.evaluate(() => window.clickCursor());

        await page.evaluate(() => {
            const runBtn = document.querySelector('.screen.active #btn-run-code, #btn-run-code, .screen.active #btn-run-activity, #btn-run-activity');
            if (runBtn) runBtn.click();
        });
        await page.waitForTimeout(3000);

        // ═══════════════════════════════════════════════════════════
        // CENA 5: CÂMARA DE GACHA (CONVOCAÇÃO ARCANA & INVOCAÇÃO)
        // ═══════════════════════════════════════════════════════════
        console.log('🌌 CENA 5: Gacha - Invocação Arcana');
        
        // Mover cursor para botão Gacha na sidebar esquerda
        await page.evaluate(() => {
            const gachaBtn = document.querySelector('.nav-btn-gacha');
            if (gachaBtn) {
                const rect = gachaBtn.getBoundingClientRect();
                window.moveCursorTo(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }
        });
        await page.waitForTimeout(800);
        await page.evaluate(() => window.clickCursor());

        await page.evaluate(() => {
            if (window.gachaUI && typeof window.gachaUI.openGachaModal === 'function') {
                window.gachaUI.openGachaModal();
            }
        });
        await page.waitForTimeout(2500);

        // Mover cursor para botão de invocação
        await page.evaluate(() => {
            const summonBtn = document.querySelector('.gacha-pull-btn-primary') || document.getElementById('gacha-btn-free') || document.querySelector('.gacha-pull-btn');
            if (summonBtn) {
                const rect = summonBtn.getBoundingClientRect();
                window.moveCursorTo(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }
        });
        await page.waitForTimeout(1000);
        await page.evaluate(() => window.clickCursor());

        // Acionar invocação
        await page.evaluate(async () => {
            if (window.gachaUI) {
                await window.gachaUI.handleFreeSummon();
            }
        });
        await page.waitForTimeout(4500);

        // Fechar modal de resultado e gacha
        await page.evaluate(() => {
            const resultModal = document.getElementById('gacha-result-modal');
            if (resultModal) resultModal.remove();
            const gachaModal = document.getElementById('modal-gacha');
            if (gachaModal) gachaModal.classList.remove('active');
        });
        await page.waitForTimeout(1200);

        // ═══════════════════════════════════════════════════════════
        // CENA 6: INVENTÁRIO, EQUIPAMENTOS & TRANSMUTAÇÃO
        // ═══════════════════════════════════════════════════════════
        console.log('🛡️ CENA 6: Inventário & Equipamentos');
        
        // Mover cursor para botão Inventário no cabeçalho
        await page.evaluate(() => {
            const invBtn = document.getElementById('btn-inventory');
            if (invBtn) {
                const rect = invBtn.getBoundingClientRect();
                window.moveCursorTo(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }
        });
        await page.waitForTimeout(800);
        await page.evaluate(() => window.clickCursor());

        await page.evaluate(() => {
            if (window.app && typeof window.app.openInventoryScreen === 'function') {
                window.app.openInventoryScreen();
            }
        });
        await page.waitForTimeout(2500);

        // Navegar entre abas: Coroa -> Cálice -> Anéis -> Todos
        const tabs = ['crown', 'chalice', 'ring', 'all'];
        for (let tab of tabs) {
            await page.evaluate((t) => {
                const tabBtn = document.querySelector(`.inv-tab[data-tab="${t}"]`);
                if (tabBtn) {
                    const rect = tabBtn.getBoundingClientRect();
                    window.moveCursorTo(rect.left + rect.width / 2, rect.top + rect.height / 2);
                    window.clickCursor();
                }
                if (window.app && typeof window.app.switchInventoryTab === 'function') {
                    window.app.switchInventoryTab(t);
                }
            }, tab);
            await page.waitForTimeout(1200);
        }

        // ═══════════════════════════════════════════════════════════
        // CENA 7: BOSS BATTLE RAIDS (16 CHEFES LENDÁRIOS)
        // ═══════════════════════════════════════════════════════════
        console.log('👹 CENA 7: Boss Battle Raids');
        
        // Abertura do seletor de Boss Raid
        await page.evaluate(() => {
            if (window.app && typeof window.app.openBossRaidSelector === 'function') {
                window.app.openBossRaidSelector();
            }
        });
        await page.waitForTimeout(2000);

        // Scroll suave pela galeria de 16 Bosses
        await page.evaluate(async () => {
            const content = document.getElementById('ranked-content') || document.getElementById('ranked-screen');
            window.moveCursorTo(960, 540);
            if (content) {
                content.scrollBy({ top: 400, behavior: 'smooth' });
                await new Promise(r => setTimeout(r, 1400));
                content.scrollBy({ top: 450, behavior: 'smooth' });
                await new Promise(r => setTimeout(r, 1400));
                content.scrollBy({ top: 450, behavior: 'smooth' });
                await new Promise(r => setTimeout(r, 1400));
                content.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
        await page.waitForTimeout(1800);

        // ═══════════════════════════════════════════════════════════
        // CENA 8: O ABISMO (DUNGEONS TEMPORIZADAS DE CÓDIGO)
        // ═══════════════════════════════════════════════════════════
        console.log('⏳ CENA 8: O Abismo (Dungeons Temporizadas)');
        
        // Mover cursor até botão ABISMO na sidebar
        await page.evaluate(() => {
            const abyssBtn = document.querySelector('.nav-btn-abyss');
            if (abyssBtn) {
                const rect = abyssBtn.getBoundingClientRect();
                window.moveCursorTo(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }
        });
        await page.waitForTimeout(800);
        await page.evaluate(() => window.clickCursor());

        await page.evaluate(() => {
            if (window.app && typeof window.app.openAbyssScreen === 'function') {
                window.app.openAbyssScreen();
            }
        });
        await page.waitForTimeout(3000);

        // ═══════════════════════════════════════════════════════════
        // CENA 9: GRIMÓRIO / GLOSSÁRIO INTERATIVO
        // ═══════════════════════════════════════════════════════════
        console.log('📚 CENA 9: Grimório / Glossário Arcano');
        
        // Mover cursor até botão GLOSSÁRIO na sidebar
        await page.evaluate(() => {
            const glossBtn = document.querySelector('.nav-btn-glossary');
            if (glossBtn) {
                const rect = glossBtn.getBoundingClientRect();
                window.moveCursorTo(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }
        });
        await page.waitForTimeout(800);
        await page.evaluate(() => window.clickCursor());

        await page.evaluate(() => {
            if (window.app && typeof window.app.openGlossaryScreen === 'function') {
                window.app.openGlossaryScreen();
            } else if (window.glossaryUI) {
                window.glossaryUI.openGlossary();
            }
        });
        await page.waitForTimeout(2000);

        // Alternar categorias de documentação
        const categories = ['pointers', 'memory', 'all'];
        for (let cat of categories) {
            await page.evaluate((c) => {
                if (window.glossaryUI && typeof window.glossaryUI.setCategory === 'function') {
                    window.glossaryUI.setCategory(c);
                }
            }, cat);
            await page.waitForTimeout(1400);
        }

        // ═══════════════════════════════════════════════════════════
        // CENA 10: ENCERRAMENTO NO MAPA COM STATS COMPLETOS
        // ═══════════════════════════════════════════════════════════
        console.log('🏆 CENA 10: Encerramento no Dashboard');
        
        // Mover cursor até botão MISSÕES (Mapa) na sidebar
        await page.evaluate(() => {
            const mapBtn = document.querySelector('.nav-btn-missions');
            if (mapBtn) {
                const rect = mapBtn.getBoundingClientRect();
                window.moveCursorTo(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }
        });
        await page.waitForTimeout(800);
        await page.evaluate(() => window.clickCursor());

        await page.evaluate(() => {
            if (window.app && window.app.ui) {
                window.app.ui.showScreen('dashboard');
                window.app.ui.renderDashboard();
            }
        });
        await page.waitForTimeout(3000);

        console.log('✨ Gravação cinematográfica concluída com sucesso!');

    } catch (err) {
        console.error('Erro durante a gravação:', err);
    } finally {
        console.log('💾 Salvando arquivos de vídeo...');
        await page.close();
        await context.close();
        await browser.close();
        if (server && server.close) server.close();

        const videoFiles = fs.readdirSync(outputDir).filter(f => f.endsWith('.webm'));
        if (videoFiles.length > 0) {
            const rawWebmPath = path.join(outputDir, videoFiles[0]);
            const finalWebmPath = path.join(outputDir, 'codeleveler_gameplay_promo.webm');
            if (rawWebmPath !== finalWebmPath) {
                fs.renameSync(rawWebmPath, finalWebmPath);
            }
            console.log(`🎬 Arquivo WebM gerado em: ${finalWebmPath}`);

            const mp4Path = path.join(outputDir, 'codeleveler_gameplay_promo.mp4');
            console.log('🔄 Convertendo para MP4 Full HD (H.264 / 60fps)...');
            try {
                execSync(`ffmpeg -y -i "${finalWebmPath}" -c:v libx264 -crf 17 -preset slow -pix_fmt yuv420p "${mp4Path}"`, { stdio: 'inherit' });
                console.log(`\n🎉 VÍDEO FINAL GERADO COM SUCESSO: ${mp4Path}`);
            } catch (convErr) {
                console.error('Erro na conversão ffmpeg:', convErr);
            }
        }
    }
})();
