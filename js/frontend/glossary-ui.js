/**
 * GUILDCODE - MÓDULO DE INTERFACE DO GLOSSÁRIO DE C (TELA INTEIRA)
 * Gerencia a navegação, pesquisa em tempo real, filtros por categoria,
 * scroll por drag & drop, exibição com saída no terminal e cópia de snippets.
 */

(function () {
    'use strict';

    class GlossaryUI {
        constructor() {
            this.activeCategory = 'all';
            this.searchQuery = '';
            this.activeTopicId = null;
            this.initialized = false;
        }

        init() {
            if (this.initialized) return;
            this.cacheDOM();
            this.bindEvents();
            this.enableDragScroll(this.categoryTabsContainer);
            this.initialized = true;
        }

        cacheDOM() {
            this.container = document.getElementById('screen-glossary');
            this.categoryTabsContainer = document.getElementById('glossary-category-tabs');
            this.topicsListContainer = document.getElementById('glossary-topics-list');
            this.topicDetailContainer = document.getElementById('glossary-topic-detail');
            this.searchInput = document.getElementById('glossary-search-input');
            this.btnClearSearch = document.getElementById('btn-clear-glossary-search');
            this.countBadge = document.getElementById('glossary-results-count');
        }

        bindEvents() {
            if (this.searchInput) {
                this.searchInput.addEventListener('input', (e) => {
                    this.searchQuery = e.target.value.trim().toLowerCase();
                    if (this.btnClearSearch) {
                        this.btnClearSearch.style.display = this.searchQuery ? 'flex' : 'none';
                    }
                    this.renderTopicsList();
                });
            }

            if (this.btnClearSearch) {
                this.btnClearSearch.addEventListener('click', () => {
                    if (this.searchInput) {
                        this.searchInput.value = '';
                        this.searchQuery = '';
                        this.btnClearSearch.style.display = 'none';
                        this.renderTopicsList();
                        this.searchInput.focus();
                    }
                });
            }
        }

        enableDragScroll(slider) {
            if (!slider) return;
            let isDown = false;
            let startX;
            let scrollLeft;

            slider.addEventListener('mousedown', (e) => {
                isDown = true;
                slider.classList.add('dragging');
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });

            slider.addEventListener('mouseleave', () => {
                isDown = false;
                slider.classList.remove('dragging');
            });

            slider.addEventListener('mouseup', () => {
                isDown = false;
                slider.classList.remove('dragging');
            });

            slider.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 1.6; // Scroll-fast
                slider.scrollLeft = scrollLeft - walk;
            });
        }

        getActiveGlossaryData() {
            const isCSharp = (typeof app !== 'undefined' && app.engine && app.engine.state && app.engine.state.worldId === 'csharp_unity') ||
                             (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');
            if (isCSharp && window.CSHARP_GLOSSARY_DATA) {
                return window.CSHARP_GLOSSARY_DATA;
            }
            return window.C_GLOSSARY_DATA || [];
        }

        getActiveCategories() {
            const isCSharp = (typeof app !== 'undefined' && app.engine && app.engine.state && app.engine.state.worldId === 'csharp_unity') ||
                             (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');
            if (isCSharp && window.CSHARP_GLOSSARY_CATEGORIES) {
                return window.CSHARP_GLOSSARY_CATEGORIES;
            }
            return window.C_GLOSSARY_CATEGORIES || [];
        }

        openGlossary(topicId = null) {
            this.init();
            
            if (window.app && window.app.ui) {
                window.app.ui.showScreen('glossary');
            }

            this.renderCategories();

            const data = this.getActiveGlossaryData();
            if (topicId) {
                this.activeTopicId = topicId;
            } else if (!this.activeTopicId && data && data.length > 0) {
                this.activeTopicId = data[0].id;
            }

            this.renderTopicsList();
            if (this.activeTopicId) {
                this.renderTopicDetail(this.activeTopicId);
            }
        }

        setCategory(catId) {
            this.activeCategory = catId;
            this.renderCategories();
            this.renderTopicsList();
        }

        getFilteredTopics() {
            const data = this.getActiveGlossaryData();
            if (!data) return [];

            return data.filter(topic => {
                const matchesCategory = this.activeCategory === 'all' || topic.category === this.activeCategory;
                
                if (!matchesCategory) return false;

                if (!this.searchQuery) return true;

                const q = this.searchQuery;
                const matchTitle = (topic.title || '').toLowerCase().includes(q);
                const matchSummary = (topic.summary || '').toLowerCase().includes(q);
                const matchSyntax = (topic.syntax || '').toLowerCase().includes(q);
                const matchDesc = (topic.description || '').toLowerCase().includes(q);
                const matchCode = (topic.code || '').toLowerCase().includes(q);
                const matchLevel = (topic.level || '').toLowerCase().includes(q);

                return matchTitle || matchSummary || matchSyntax || matchDesc || matchCode || matchLevel;
            });
        }

        renderCategories() {
            const categories = this.getActiveCategories();
            if (!this.categoryTabsContainer || !categories) return;

            let html = '';
            categories.forEach(cat => {
                const isActive = this.activeCategory === cat.id;
                html += `
                    <button class="glossary-cat-pill ${isActive ? 'active' : ''}" onclick="window.glossaryUI.setCategory('${cat.id}')">
                        <span class="cat-pill-icon">${cat.svg || ''}</span>
                        <span class="cat-pill-label">${cat.name}</span>
                    </button>
                `;
            });

            this.categoryTabsContainer.innerHTML = html;
        }

        renderTopicsList() {
            if (!this.topicsListContainer) return;

            const filtered = this.getFilteredTopics();

            if (this.countBadge) {
                this.countBadge.textContent = `${filtered.length} tópico${filtered.length !== 1 ? 's' : ''}`;
            }

            if (filtered.length === 0) {
                this.topicsListContainer.innerHTML = `
                    <div class="glossary-empty-list">
                        <div class="empty-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </div>
                        <div class="empty-title">Nenhum termo encontrado</div>
                        <p class="empty-desc">Tente buscar por outro conceito, comando ou limpe os filtros de categoria.</p>
                    </div>
                `;
                return;
            }

            // Se o tópico ativo não estiver nos resultados filtrados, selecionar o primeiro
            if (!filtered.some(t => t.id === this.activeTopicId)) {
                this.activeTopicId = filtered[0].id;
                this.renderTopicDetail(this.activeTopicId);
            }

            const allCategories = this.getActiveCategories();
            let html = '';
            filtered.forEach(topic => {
                const isActive = topic.id === this.activeTopicId;
                const categoryObj = (allCategories || []).find(c => c.id === topic.category);
                const catName = categoryObj ? categoryObj.name : topic.category;

                let levelBadgeClass = 'level-beginner';
                if (topic.level === 'Intermediário') levelBadgeClass = 'level-intermediate';
                if (topic.level === 'Avançado') levelBadgeClass = 'level-advanced';

                html += `
                    <div class="glossary-topic-item ${isActive ? 'active' : ''}" onclick="window.glossaryUI.selectTopic('${topic.id}')">
                        <div class="topic-item-header">
                            <span class="topic-item-category">${catName}</span>
                            <span class="topic-item-level ${levelBadgeClass}">${topic.level}</span>
                        </div>
                        <h4 class="topic-item-title">${topic.title}</h4>
                        <p class="topic-item-summary">${topic.summary}</p>
                    </div>
                `;
            });

            this.topicsListContainer.innerHTML = html;
        }

        selectTopic(topicId) {
            this.activeTopicId = topicId;
            this.renderTopicsList();
            this.renderTopicDetail(topicId);

            // Rola SEMPRE o container de detalhes para o topo
            if (this.topicDetailContainer) {
                this.topicDetailContainer.scrollTop = 0;
                if (window.innerWidth < 992) {
                    this.topicDetailContainer.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }

        renderTopicDetail(topicId) {
            if (!this.topicDetailContainer || !window.C_GLOSSARY_DATA) return;

            const allData = this.getActiveGlossaryData();
            const allCategories = this.getActiveCategories();
            const topic = (allData || []).find(t => t.id === topicId);
            if (!topic) return;

            const categoryObj = (allCategories || []).find(c => c.id === topic.category);
            const catName = categoryObj ? `${categoryObj.name}` : topic.category;
            const catSvg = categoryObj ? categoryObj.svg : '';

            let levelBadgeClass = 'level-beginner';
            if (topic.level === 'Intermediário') levelBadgeClass = 'level-intermediate';
            if (topic.level === 'Avançado') levelBadgeClass = 'level-advanced';

            const isCSharp = (typeof app !== 'undefined' && app.engine && app.engine.state && app.engine.state.worldId === 'csharp_unity') ||
                             (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');

            const highlightCode = (code) => {
                if (isCSharp && typeof window.highlightCSharp === 'function') {
                    return window.highlightCSharp(code);
                }
                return this.highlightC(code);
            };

            // Montar Tabela opcional
            let tableHtml = '';
            if (topic.table) {
                let ths = topic.table.headers.map(h => `<th>${h}</th>`).join('');
                let trs = topic.table.rows.map(row => {
                    let tds = row.map((cell, idx) => {
                        return idx === 0 || idx === 2 ? `<td><code>${this.escapeHtml(cell)}</code></td>` : `<td>${cell}</td>`;
                    }).join('');
                    return `<tr>${tds}</tr>`;
                }).join('');

                tableHtml = `
                    <div class="glossary-detail-section">
                        <h4 class="detail-section-title">
                            <span class="title-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></span>
                            ${topic.table.title}
                        </h4>
                        <div class="glossary-table-wrapper">
                            <table class="glossary-table">
                                <thead><tr>${ths}</tr></thead>
                                <tbody>${trs}</tbody>
                            </table>
                        </div>
                    </div>
                `;
            }

            // Tópicos relacionados
            let relatedHtml = '';
            if (topic.related && topic.related.length > 0) {
                let relatedButtons = topic.related.map(relId => {
                    const relTopic = (allData || []).find(t => t.id === relId);
                    if (!relTopic) return '';
                    return `
                        <button class="glossary-related-btn" onclick="window.glossaryUI.selectTopic('${relTopic.id}')">
                            <span class="rel-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>
                            <span class="rel-text">${relTopic.title}</span>
                        </button>
                    `;
                }).join('');

                if (relatedButtons.trim()) {
                    relatedHtml = `
                        <div class="glossary-detail-section">
                            <h4 class="detail-section-title">
                                <span class="title-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></span>
                                Conceitos Relacionados
                            </h4>
                            <div class="glossary-related-grid">
                                ${relatedButtons}
                            </div>
                        </div>
                    `;
                }
            }

            // Bloco de Saída Esperada
            let outputBlockHtml = '';
            if (topic.output) {
                outputBlockHtml = `
                    <div class="glossary-output-container">
                        <div class="output-header-bar">
                            <span class="output-header-label">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                                ${isCSharp ? 'SAÍDA DO CONSOLE UNITY' : 'SAÍDA DO TERMINAL (OUTPUT)'}
                            </span>
                            <span class="output-status-tag">Execução Finalizada (Exit 0)</span>
                        </div>
                        <pre class="output-terminal-pre"><code>${this.escapeHtml(topic.output)}</code></pre>
                    </div>
                `;
            }

            const langName = isCSharp ? 'C# (Unity)' : 'C Language';
            const fileExt = isCSharp ? '.cs' : '.c';

            const html = `
                <div class="glossary-detail-card fade-in">
                    <!-- CABEÇALHO DO TÓPICO -->
                    <div class="glossary-detail-header">
                        <div class="detail-header-meta">
                            <span class="detail-cat-badge">${catSvg} ${catName}</span>
                            <span class="topic-item-level ${levelBadgeClass}">${topic.level}</span>
                            <button class="glossary-export-slide-btn" onclick="window.glossaryUI.exportTopicAsSlidePdf('${topic.id}')" title="Exportar Slide PDF Horizontal">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="12" y1="18" x2="12" y2="12"></line>
                                    <polyline points="9 15 12 18 15 15"></polyline>
                                </svg>
                            </button>
                        </div>
                        <h2 class="detail-title">${topic.title}</h2>
                        <p class="detail-summary-lead">${topic.summary}</p>
                    </div>

                    <!-- SINTAXE / ASSINATURA -->
                    <div class="glossary-detail-section">
                        <h4 class="detail-section-title">
                            <span class="title-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></span>
                            Sintaxe & Assinatura
                        </h4>
                        <div class="glossary-syntax-box">
                            <pre><code>${highlightCode(topic.syntax)}</code></pre>
                        </div>
                    </div>

                    <!-- EXPLICAÇÃO DIDÁTICA -->
                    <div class="glossary-detail-section">
                        <h4 class="detail-section-title">
                            <span class="title-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></span>
                            Explicação Didática
                        </h4>
                        <div class="glossary-explanation-text">
                            ${this.formatDescription(topic.description)}
                        </div>
                    </div>

                    <!-- TABELA AUXILIAR (SE HOUVER) -->
                    ${tableHtml}

                    <!-- BLOCO DE CÓDIGO DE EXEMPLO E SAÍDA DO TERMINAL -->
                    <div class="glossary-detail-section">
                        <div class="code-section-header">
                            <h4 class="detail-section-title" style="margin-bottom:0;">
                                <span class="title-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></span>
                                Código de Exemplo em ${isCSharp ? 'C#' : 'C'}
                            </h4>
                            <button class="glossary-copy-btn" id="btn-copy-c-code" onclick="window.glossaryUI.copyCurrentCode('${topic.id}')">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                <span class="copy-btn-text">Copiar Código</span>
                            </button>
                        </div>
                        <div class="glossary-code-block">
                            <div class="code-block-bar">
                                <div class="code-mac-dots">
                                    <span class="dot red"></span>
                                    <span class="dot yellow"></span>
                                    <span class="dot green"></span>
                                </div>
                                <span class="code-filename">exemplo_${topic.id.replace(/-/g, '_')}${fileExt}</span>
                                <span class="code-lang-tag">${langName}</span>
                            </div>
                            <pre class="code-content"><code>${highlightCode(topic.code)}</code></pre>
                            ${outputBlockHtml}
                        </div>
                    </div>

                    <!-- DICAS DA GUILDA & ARMADILHAS -->
                    <div class="glossary-insights-grid">
                        ${(topic.tips || topic.guildWisdom) ? `
                            <div class="insight-box tip">
                                <div class="insight-header">
                                    <span class="insight-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg></span>
                                    <span class="insight-title">Sabedoria da Guilda (Boa Prática)</span>
                                </div>
                                <p class="insight-body">${topic.tips || topic.guildWisdom}</p>
                            </div>
                        ` : ''}

                        ${topic.pitfalls ? `
                            <div class="insight-box danger">
                                <div class="insight-header">
                                    <span class="insight-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span>
                                    <span class="insight-title">Cuidado com a Armadilha!</span>
                                </div>
                                <p class="insight-body">${topic.pitfalls}</p>
                            </div>
                        ` : ''}
                    </div>

                    <!-- RELACIONADOS -->
                    ${relatedHtml}
                </div>
            `;

            this.topicDetailContainer.innerHTML = html;
        }

        copyCurrentCode(topicId) {
            const allData = this.getActiveGlossaryData();
            const topic = (allData || []).find(t => t.id === topicId);
            if (!topic || !topic.code) return;

            navigator.clipboard.writeText(topic.code).then(() => {
                const btn = document.getElementById('btn-copy-c-code');
                if (btn) {
                    const textSpan = btn.querySelector('.copy-btn-text');
                    if (textSpan) textSpan.textContent = 'Copiado com Sucesso!';
                    btn.classList.add('copied');
                    setTimeout(() => {
                        if (textSpan) textSpan.textContent = 'Copiar Código';
                        btn.classList.remove('copied');
                    }, 2000);
                }

                if (window.app && window.app.ui && window.app.ui.showToast) {
                    window.app.ui.showToast('Código copiado para a área de transferência!', 'success');
                }
            }).catch(err => {
                console.error('Erro ao copiar código:', err);
            });
        exportTopicAsSlidePdf(topicId) {
            const allData = this.getActiveGlossaryData();
            const topic = (allData || []).find(t => t.id === topicId);
            if (!topic) return;

            const isCSharp = this.isCSharpActive();
            const allCategories = this.getActiveCategories();
            const categoryObj = (allCategories || []).find(c => c.id === topic.category);
            const catName = categoryObj ? categoryObj.name : topic.category;
            const langName = isCSharp ? 'C# (Unity)' : 'C Language';

            const highlightCode = (code) => {
                if (!code) return '';
                if (isCSharp && window.app && window.app.ui && typeof window.app.ui.highlightCSharpCode === 'function') {
                    return window.app.ui.highlightCSharpCode(code);
                }
                return this.highlightC(code);
            };

            const slideWindow = window.open('', '_blank', 'width=1280,height=720');
            if (!slideWindow) {
                if (window.app && window.app.ui && window.app.ui.showToast) {
                    window.app.ui.showToast('Permita popups no navegador para exportar o slide PDF.', 'warning');
                }
                return;
            }

            const slideHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>${topic.title} - ${langName} Slide (GuildCode)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Outfit:wght@400;600;700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        @page {
            size: A4 landscape;
            margin: 0;
        }
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        body {
            width: 100vw;
            height: 100vh;
            background: #090a10;
            color: #f8fafc;
            font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .slide-canvas {
            width: 100vw;
            height: 100vh;
            max-width: 100%;
            max-height: 100%;
            background: radial-gradient(circle at 85% 15%, rgba(56, 189, 248, 0.09) 0%, transparent 45%),
                        radial-gradient(circle at 15% 85%, rgba(168, 85, 247, 0.08) 0%, transparent 40%),
                        #0b0d14;
            border: 2px solid rgba(56, 189, 248, 0.25);
            display: flex;
            flex-direction: column;
            padding: 2.2rem 2.8rem;
            position: relative;
        }
        .slide-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 1rem;
            margin-bottom: 1.2rem;
        }
        .slide-header-left {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
        }
        .slide-badges {
            display: flex;
            align-items: center;
            gap: 0.6rem;
        }
        .badge-cat {
            background: rgba(56, 189, 248, 0.15);
            border: 1px solid rgba(56, 189, 248, 0.35);
            color: #38bdf8;
            font-family: 'Outfit', sans-serif;
            font-size: 0.72rem;
            font-weight: 700;
            padding: 0.2rem 0.65rem;
            border-radius: 6px;
            letter-spacing: 0.04em;
        }
        .badge-level {
            background: rgba(168, 85, 247, 0.15);
            border: 1px solid rgba(168, 85, 247, 0.35);
            color: #c084fc;
            font-family: 'Outfit', sans-serif;
            font-size: 0.72rem;
            font-weight: 700;
            padding: 0.2rem 0.65rem;
            border-radius: 6px;
        }
        .slide-title {
            font-family: 'Outfit', sans-serif;
            font-size: 2.0rem;
            font-weight: 900;
            color: #ffffff;
            letter-spacing: -0.01em;
            display: flex;
            align-items: center;
            gap: 0.6rem;
        }
        .slide-summary {
            font-size: 0.95rem;
            color: #94a3b8;
            max-width: 800px;
            line-height: 1.4;
        }
        .slide-brand {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 0.2rem;
        }
        .brand-logo {
            font-family: 'Outfit', sans-serif;
            font-size: 1.1rem;
            font-weight: 900;
            color: #38bdf8;
            letter-spacing: 0.08em;
        }
        .brand-sub {
            font-size: 0.68rem;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.06em;
        }
        .slide-body {
            flex: 1;
            display: grid;
            grid-template-columns: 1.05fr 0.95fr;
            gap: 1.8rem;
            min-height: 0;
        }
        .slide-col {
            display: flex;
            flex-direction: column;
            gap: 1.0rem;
            min-height: 0;
        }
        .card-box {
            background: rgba(15, 23, 42, 0.65);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 8px;
            padding: 1.0rem 1.2rem;
        }
        .card-box.syntax {
            border-left: 4px solid #38bdf8;
            background: rgba(15, 23, 42, 0.85);
        }
        .card-title {
            font-family: 'Outfit', sans-serif;
            font-size: 0.75rem;
            font-weight: 700;
            color: #38bdf8;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .card-content {
            font-size: 0.86rem;
            line-height: 1.6;
            color: #cbd5e1;
        }
        .card-content code {
            font-family: 'JetBrains Mono', monospace;
            background: rgba(56, 189, 248, 0.12);
            color: #38bdf8;
            padding: 0.1rem 0.35rem;
            border-radius: 4px;
            font-size: 0.82rem;
        }
        .syntax-code {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.84rem;
            line-height: 1.5;
            color: #f8fafc;
            white-space: pre-wrap;
            word-break: break-word;
        }
        .code-block-card {
            background: #060911;
            border: 1px solid rgba(56, 189, 248, 0.25);
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            flex: 1;
            min-height: 0;
        }
        .code-header {
            background: rgba(15, 23, 42, 0.95);
            padding: 0.4rem 0.8rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.72rem;
            color: #94a3b8;
            font-family: 'JetBrains Mono', monospace;
        }
        .code-pre {
            padding: 0.8rem 1.0rem;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.80rem;
            line-height: 1.5;
            color: #e2e8f0;
            overflow: hidden;
            white-space: pre;
            flex: 1;
        }
        .output-box {
            background: rgba(0, 0, 0, 0.4);
            border-top: 1px dashed rgba(255, 255, 255, 0.1);
            padding: 0.5rem 0.8rem;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.72rem;
            color: #4ade80;
        }
        .insight-pill {
            display: flex;
            align-items: flex-start;
            gap: 0.6rem;
            background: rgba(56, 189, 248, 0.08);
            border: 1px solid rgba(56, 189, 248, 0.25);
            border-radius: 6px;
            padding: 0.7rem 0.9rem;
            font-size: 0.80rem;
            color: #e2e8f0;
            line-height: 1.5;
        }
        .insight-pill.danger {
            background: rgba(239, 68, 68, 0.08);
            border-color: rgba(239, 68, 68, 0.25);
        }
        .insight-tag {
            font-weight: 700;
            font-family: 'Outfit', sans-serif;
            font-size: 0.68rem;
            text-transform: uppercase;
            padding: 0.15rem 0.45rem;
            border-radius: 4px;
            background: rgba(56, 189, 248, 0.2);
            color: #38bdf8;
            flex-shrink: 0;
        }
        .insight-pill.danger .insight-tag {
            background: rgba(239, 68, 68, 0.2);
            color: #f87171;
        }
        .slide-footer {
            margin-top: 0.8rem;
            padding-top: 0.6rem;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.68rem;
            color: #475569;
            font-family: 'JetBrains Mono', monospace;
        }

        /* Cores de Sintaxe C/C# */
        .c-keyword, .token.keyword { color: #c084fc; font-weight: 600; }
        .c-type, .token.class-name { color: #38bdf8; }
        .c-string, .token.string { color: #4ade80; }
        .c-number, .token.number { color: #facc15; }
        .c-comment, .token.comment { color: #64748b; font-style: italic; }
        .c-preprocessor, .c-func, .token.function { color: #60a5fa; }
        .c-format { color: #f472b6; }
    </style>
</head>
<body>
    <div class="slide-canvas">
        <header class="slide-header">
            <div class="slide-header-left">
                <div class="slide-badges">
                    <span class="badge-cat">${catName}</span>
                    <span class="badge-level">${topic.level}</span>
                </div>
                <h1 class="slide-title">${topic.title}</h1>
                <p class="slide-summary">${topic.summary}</p>
            </div>
            <div class="slide-brand">
                <span class="brand-logo">GUILDCODE</span>
                <span class="brand-sub">${langName} • GRIMÓRIO</span>
            </div>
        </header>

        <main class="slide-body">
            <!-- COLUNA ESQUERDA: SINTAXE E CONCEITO -->
            <div class="slide-col">
                <div class="card-box syntax">
                    <div class="card-title">Sintaxe & Assinatura</div>
                    <div class="syntax-code">${highlightCode(topic.syntax)}</div>
                </div>

                <div class="card-box" style="flex: 1;">
                    <div class="card-title">Conceito & Explicação Didática</div>
                    <div class="card-content">
                        ${this.formatDescription(topic.description)}
                    </div>
                </div>
            </div>

            <!-- COLUNA DIREITA: CÓDIGO DE EXEMPLO E BOAS PRÁTICAS -->
            <div class="slide-col">
                <div class="code-block-card">
                    <div class="code-header">
                        <span>exemplo_${topic.id.replace(/-/g, '_')}${isCSharp ? '.cs' : '.c'}</span>
                        <span>${langName}</span>
                    </div>
                    <pre class="code-pre"><code>${highlightCode(topic.code)}</code></pre>
                    ${topic.output ? `<div class="output-box"><strong>Saída:</strong> ${this.escapeHtml(topic.output)}</div>` : ''}
                </div>

                ${(topic.tips || topic.guildWisdom) ? `
                    <div class="insight-pill">
                        <span class="insight-tag">Dica</span>
                        <div>${topic.tips || topic.guildWisdom}</div>
                    </div>
                ` : (topic.pitfalls ? `
                    <div class="insight-pill danger">
                        <span class="insight-tag">Atenção</span>
                        <div>${topic.pitfalls}</div>
                    </div>
                ` : '')}
            </div>
        </main>

        <footer class="slide-footer">
            <span>GuildCode Knowledge System &copy; 2026 • Material Pedagógico</span>
            <span>ID: ${topic.id}</span>
        </footer>
    </div>

    <script>
        window.addEventListener('load', () => {
            setTimeout(() => {
                window.print();
            }, 450);
        });
    </script>
</body>
</html>`;

            slideWindow.document.open();
            slideWindow.document.write(slideHtml);
            slideWindow.document.close();
        }

        formatDescription(text) {
            if (!text) return '';
            return text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
        }

        escapeHtml(str) {
            if (!str) return '';
            return str
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        }

        highlightC(code) {
            if (!code) return '';
            let s = this.escapeHtml(code);

            // Comments
            s = s.replace(/(\/\/.*$)/gm, '<span class="c-comment">$1</span>');
            s = s.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="c-comment">$1</span>');

            // Preprocessor
            s = s.replace(/(#include|#define|#ifndef|#ifdef|#endif|#else|#pragma)/g, '<span class="c-preprocessor">$1</span>');

            // Strings and chars
            s = s.replace(/(&quot;.*?&quot;)/g, '<span class="c-string">$1</span>');
            s = s.replace(/(&#039;.*?&#039;)/g, '<span class="c-char">$1</span>');

            // Keywords
            const keywords = '\\b(int|float|double|char|void|unsigned|signed|short|long|const|struct|typedef|union|enum|sizeof|if|else|switch|case|default|break|continue|return|while|do|for|goto|static|extern)\\b';
            s = s.replace(new RegExp(keywords, 'g'), '<span class="c-keyword">$1</span>');

            // Format Specifiers inside strings
            s = s.replace(/(%[difsulpxc]|%lf|%lld|%zu|%%)/g, '<span class="c-format">$1</span>');

            // Standard Library Functions
            const funcs = '\\b(printf|scanf|malloc|calloc|realloc|free|strlen|strcpy|strcat|strcmp|strncpy|strncat|fopen|fclose|fprintf|fscanf|fgets|fputs|fread|fwrite|exit)\\b';
            s = s.replace(new RegExp(funcs, 'g'), '<span class="c-func">$1</span>');

            // Numbers
            s = s.replace(/\b(\d+(\.\d+)?f?)\b/g, '<span class="c-number">$1</span>');

            return s;
        }
    }

    window.glossaryUI = new GlossaryUI();
})();
