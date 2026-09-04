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
                        ${topic.tips ? `
                            <div class="insight-box tip">
                                <div class="insight-header">
                                    <span class="insight-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg></span>
                                    <span class="insight-title">Sabedoria da Guilda (Boa Prática)</span>
                                </div>
                                <p class="insight-body">${topic.tips}</p>
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
