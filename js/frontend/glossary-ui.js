/**
 * GUILDCODE - MÓDULO DE INTERFACE DO GLOSSÁRIO DE C (TELA INTEIRA)
 * Gerencia a navegação, pesquisa em tempo real, filtros por categoria,
 * exibição detalhada com syntax highlighting e cópia de snippets de código.
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

        openGlossary(topicId = null) {
            this.init();
            
            if (window.app && window.app.ui) {
                window.app.ui.showScreen('glossary');
            }

            this.renderCategories();

            if (topicId) {
                this.activeTopicId = topicId;
            } else if (!this.activeTopicId && window.C_GLOSSARY_DATA && window.C_GLOSSARY_DATA.length > 0) {
                this.activeTopicId = window.C_GLOSSARY_DATA[0].id;
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
            if (!window.C_GLOSSARY_DATA) return [];

            return window.C_GLOSSARY_DATA.filter(topic => {
                const matchesCategory = this.activeCategory === 'all' || topic.category === this.activeCategory;
                
                if (!matchesCategory) return false;

                if (!this.searchQuery) return true;

                const q = this.searchQuery;
                const matchTitle = topic.title.toLowerCase().includes(q);
                const matchSummary = topic.summary.toLowerCase().includes(q);
                const matchSyntax = topic.syntax.toLowerCase().includes(q);
                const matchDesc = topic.description.toLowerCase().includes(q);
                const matchCode = topic.code.toLowerCase().includes(q);
                const matchLevel = topic.level.toLowerCase().includes(q);

                return matchTitle || matchSummary || matchSyntax || matchDesc || matchCode || matchLevel;
            });
        }

        renderCategories() {
            if (!this.categoryTabsContainer || !window.C_GLOSSARY_CATEGORIES) return;

            let html = '';
            window.C_GLOSSARY_CATEGORIES.forEach(cat => {
                const isActive = this.activeCategory === cat.id;
                html += `
                    <button class="glossary-cat-pill ${isActive ? 'active' : ''}" onclick="window.glossaryUI.setCategory('${cat.id}')">
                        <span class="cat-pill-icon">${cat.icon}</span>
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
                        <div class="empty-icon">🔍</div>
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

            let html = '';
            filtered.forEach(topic => {
                const isActive = topic.id === this.activeTopicId;
                const categoryObj = (window.C_GLOSSARY_CATEGORIES || []).find(c => c.id === topic.category);
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

            // Em telas menores, rolar suavemente até o conteúdo de detalhes
            if (window.innerWidth < 992 && this.topicDetailContainer) {
                this.topicDetailContainer.scrollIntoView({ behavior: 'smooth' });
            }
        }

        renderTopicDetail(topicId) {
            if (!this.topicDetailContainer || !window.C_GLOSSARY_DATA) return;

            const topic = window.C_GLOSSARY_DATA.find(t => t.id === topicId);
            if (!topic) return;

            const categoryObj = (window.C_GLOSSARY_CATEGORIES || []).find(c => c.id === topic.category);
            const catName = categoryObj ? `${categoryObj.icon} ${categoryObj.name}` : topic.category;

            let levelBadgeClass = 'level-beginner';
            if (topic.level === 'Intermediário') levelBadgeClass = 'level-intermediate';
            if (topic.level === 'Avançado') levelBadgeClass = 'level-advanced';

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
                        <h4 class="detail-section-title"><span class="title-icon">📊</span> ${topic.table.title}</h4>
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
                    const relTopic = window.C_GLOSSARY_DATA.find(t => t.id === relId);
                    if (!relTopic) return '';
                    return `
                        <button class="glossary-related-btn" onclick="window.glossaryUI.selectTopic('${relTopic.id}')">
                            <span class="rel-icon">➔</span>
                            <span class="rel-text">${relTopic.title}</span>
                        </button>
                    `;
                }).join('');

                if (relatedButtons.trim()) {
                    relatedHtml = `
                        <div class="glossary-detail-section">
                            <h4 class="detail-section-title"><span class="title-icon">🔗</span> Conceitos Relacionados</h4>
                            <div class="glossary-related-grid">
                                ${relatedButtons}
                            </div>
                        </div>
                    `;
                }
            }

            const html = `
                <div class="glossary-detail-card fade-in">
                    <!-- CABEÇALHO DO TÓPICO -->
                    <div class="glossary-detail-header">
                        <div class="detail-header-meta">
                            <span class="detail-cat-badge">${catName}</span>
                            <span class="topic-item-level ${levelBadgeClass}">${topic.level}</span>
                        </div>
                        <h2 class="detail-title">${topic.title}</h2>
                        <p class="detail-summary-lead">${topic.summary}</p>
                    </div>

                    <!-- SINTAXE / ASSINATURA -->
                    <div class="glossary-detail-section">
                        <h4 class="detail-section-title"><span class="title-icon">⚡</span> Sintaxe & Assinatura</h4>
                        <div class="glossary-syntax-box">
                            <pre><code>${this.highlightC(topic.syntax)}</code></pre>
                        </div>
                    </div>

                    <!-- EXPLICAÇÃO DIDÁTICA -->
                    <div class="glossary-detail-section">
                        <h4 class="detail-section-title"><span class="title-icon">📖</span> Explicação Didática</h4>
                        <div class="glossary-explanation-text">
                            ${this.formatDescription(topic.description)}
                        </div>
                    </div>

                    <!-- TABELA AUXILIAR (SE HOUVER) -->
                    ${tableHtml}

                    <!-- BLOCO DE CÓDIGO DE EXEMPLO -->
                    <div class="glossary-detail-section">
                        <div class="code-section-header">
                            <h4 class="detail-section-title" style="margin-bottom:0;"><span class="title-icon">💻</span> Código de Exemplo em C</h4>
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
                                <span class="code-filename">exemplo_${topic.id.replace(/-/g, '_')}.c</span>
                                <span class="code-lang-tag">C Language</span>
                            </div>
                            <pre class="code-content"><code>${this.highlightC(topic.code)}</code></pre>
                        </div>
                    </div>

                    <!-- DICAS DA GUILDA & ARMADILHAS -->
                    <div class="glossary-insights-grid">
                        ${topic.tips ? `
                            <div class="insight-box tip">
                                <div class="insight-header">
                                    <span class="insight-icon">💡</span>
                                    <span class="insight-title">Sabedoria da Guilda (Boa Prática)</span>
                                </div>
                                <p class="insight-body">${topic.tips}</p>
                            </div>
                        ` : ''}

                        ${topic.pitfalls ? `
                            <div class="insight-box danger">
                                <div class="insight-header">
                                    <span class="insight-icon">⚠️</span>
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
            const topic = window.C_GLOSSARY_DATA.find(t => t.id === topicId);
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
