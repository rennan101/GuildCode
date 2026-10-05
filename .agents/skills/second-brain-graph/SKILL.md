---
name: second-brain-graph
description: Pesquisa e navegacao em grafo de conhecimento no Segundo Cerebro (Obsidian, notas Markdown, MOCs, backlinks e vaults pessoais). Permite descobrir conexoes semanticas entre notas, inspecionar hubs/MOCs, localizar notas orfas e encontrar o caminho mais curto entre conceitos.
license: Apache-2.0
metadata:
  version: v1
  author: antigravity
---

# Second Brain Graph Search & Navigation

Esta skill permite ao agente interagir e pesquisar em estruturas de **Segundo Cérebro** (Obsidian, pastas Zettelkasten, MOCs - Maps of Content, e vaults em Markdown), indexando notas como nós e links (`[[Wikilinks]]`, `[links](markdown)` e tags `#tag`) como arestas direcionadas.

---

## Capacidades Principais

1. **Pesquisa Semântica e Textual por Conceitos**:
   - Localiza notas por título, tags ou conteúdo em múltiplos vaults e diretórios.
2. **Inspeção de Nós (Grafo Local)**:
   - Exibe conexões ativas (`outgoing links`), backlinks de outras notas (`in-degree`), tags e caminhos absolutos.
3. **Descoberta de Caminhos Semânticos (`Shortest Path`)**:
   - Descobre como dois conceitos aparentemente distantes se conectam através da cadeia de links e MOCs intermediários.
4. **Análise de Hubs e Centralidade**:
   - Identifica os maiores nós centrais (MOCs, Dashboards e conceitos estruturantes) por grau de conectividade.
5. **Detecção de Notas Órfãs**:
   - Encontra notas isoladas no cofre sem nenhuma conexão de entrada ou saída, permitindo reestruturar o Segundo Cérebro.

---

## Como Executar

A skill inclui um motor Python autônomo localizado em `scripts/brain_graph.py`.

### 1. Resumo Geral do Grafo
```bash
python3 ~/.gemini/config/skills/second-brain-graph/scripts/brain_graph.py
```

### 2. Pesquisar Conceitos ou Termos
```bash
python3 ~/.gemini/config/skills/second-brain-graph/scripts/brain_graph.py --search "Pasteurisation"
```

### 3. Inspecionar um Nó Específico (Grafo Local + Backlinks)
```bash
python3 ~/.gemini/config/skills/second-brain-graph/scripts/brain_graph.py --node "HTST_Pasteurisation"
```

### 4. Descobrir Caminho entre Dois Nós (Busca em Grafo)
```bash
python3 ~/.gemini/config/skills/second-brain-graph/scripts/brain_graph.py --path "What_is_HACCP" "Microbiological_KPIs_Dairy"
```

### 5. Listar MOCs e Hubs Centrais
```bash
python3 ~/.gemini/config/skills/second-brain-graph/scripts/brain_graph.py --hubs
```

### 6. Localizar Notas Órfãs
```bash
python3 ~/.gemini/config/skills/second-brain-graph/scripts/brain_graph.py --orphans
```

### 7. Especificar Diretórios / Cofres Personalizados
Por padrão, o script busca automaticamente nos diretórios de Segundo Cérebro do sistema (`/Volumes/SSD FN501 PRO/Projects/HACCP/Second_Brain`, `/Volumes/SSD FN501 PRO/KidsLearnCode/Brain`, etc.). Você pode passar caminhos customizados:
```bash
python3 ~/.gemini/config/skills/second-brain-graph/scripts/brain_graph.py --paths "/caminho/do/seu/vault" --hubs
```

---

## Integração em Respostas

Ao responder consultas sobre o Segundo Cérebro do usuário:
- Apresente as conexões em formato de diagramas de texto ou `mermaid` (`graph TD` ou `graph LR`).
- Destaque links criados versus notas ainda pendentes de criação.
- Forneça caminhos absolutos e backlinks para permitir navegação rápida.
