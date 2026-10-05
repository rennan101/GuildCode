#!/usr/bin/env python3
"""
second-brain-graph CLI & Search Engine.
Parses Obsidian vaults, Markdown knowledge bases, and Antigravity Brain workspaces
into a directed graph to discover connections, backlinks, central hubs, and semantic paths.
"""

import sys
import os
import re
import json
import argparse
from pathlib import Path
from collections import defaultdict, deque

WIKILINK_RE = re.compile(r'\[\[([^\]\|#]+)(?:#[^\]\|]+)?(?:\|([^\]]+))?\]\]')
MD_LINK_RE = re.compile(r'\[([^\]]+)\]\(([^)]+\.md(?:#[^)]+)?)\)')
TAG_RE = re.compile(r'(?:^|\s)#[a-zA-Z0-9_\-\/]+')
YAML_FRONTMATTER_RE = re.compile(r'^---\s*\n(.*?)\n---\s*\n', re.DOTALL)

DEFAULT_SEARCH_PATHS = [
    "/Users/rennan/Documents/Websites_Work/GuildCode/docs/brain",
    "/Volumes/SSD FN501 PRO/Projects/HACCP/Second_Brain",
    "/Volumes/SSD FN501 PRO/KidsLearnCode/Brain",
    "/Volumes/SSD FN501 PRO/KidsLean/Brain",
    os.path.expanduser("~/.gemini/antigravity/brain")
]

class BrainGraph:
    def __init__(self, root_paths=None):
        self.root_paths = [Path(p) for p in (root_paths or []) if os.path.exists(p)]
        self.nodes = {}  # key: normalized_name -> { title, path, tags, aliases, mtime }
        self.forward_edges = defaultdict(set)  # u -> set(v)
        self.backlinks = defaultdict(set)      # v -> set(u)
        self.tags_index = defaultdict(set)     # tag -> set(u)
        self.path_to_id = {}                   # file_path -> normalized_name
        self._build_index()

    def _normalize_title(self, title_or_path):
        name = os.path.basename(str(title_or_path))
        if name.lower().endswith('.md'):
            name = name[:-3]
        return name.strip().lower()

    def _scan_files(self):
        markdown_files = []
        for root_path in self.root_paths:
            if root_path.is_file() and root_path.suffix.lower() == '.md':
                markdown_files.append(root_path)
            elif root_path.is_dir():
                for p in root_path.rglob('*.md'):
                    # Skip system logs and hidden internal folders
                    if '.system_generated' in p.parts or '.git' in p.parts:
                        continue
                    markdown_files.append(p)
        return markdown_files

    def _build_index(self):
        files = self._scan_files()

        # Pass 1: Register nodes and aliases
        for fpath in files:
            norm_id = self._normalize_title(fpath)
            try:
                content = fpath.read_text(encoding='utf-8', errors='ignore')
            except Exception:
                continue

            tags = set(TAG_RE.findall(content))
            tags = {t.strip() for t in tags}
            aliases = set()

            # Frontmatter parsing
            fm_match = YAML_FRONTMATTER_RE.match(content)
            if fm_match:
                fm_text = fm_match.group(1)
                for line in fm_text.splitlines():
                    if line.strip().startswith('-') and 'aliases:' not in line:
                        pass
                    if 'aliases:' in line:
                        pass
                    if 'tags:' in line:
                        pass

            self.nodes[norm_id] = {
                'id': norm_id,
                'title': fpath.stem,
                'path': str(fpath.resolve()),
                'tags': list(tags),
                'aliases': list(aliases),
                'mtime': fpath.stat().st_mtime
            }
            self.path_to_id[str(fpath.resolve())] = norm_id
            for tag in tags:
                self.tags_index[tag.lower()].add(norm_id)

        # Pass 2: Extract links & build edges
        for fpath in files:
            source_id = self.path_to_id.get(str(fpath.resolve()))
            if not source_id:
                continue
            try:
                content = fpath.read_text(encoding='utf-8', errors='ignore')
            except Exception:
                continue

            # Wikilinks [[Target]]
            for target_match in WIKILINK_RE.finditer(content):
                target_raw = target_match.group(1).strip()
                target_norm = self._normalize_title(target_raw)
                self.forward_edges[source_id].add(target_norm)
                self.backlinks[target_norm].add(source_id)

            # Markdown links [Text](target.md)
            for md_match in MD_LINK_RE.finditer(content):
                target_path_str = md_match.group(2).split('#')[0].strip()
                target_norm = self._normalize_title(target_path_str)
                self.forward_edges[source_id].add(target_norm)
                self.backlinks[target_norm].add(source_id)

    def search_nodes(self, query):
        q = query.lower().strip()
        results = []
        for nid, data in self.nodes.items():
            score = 0
            if q == nid:
                score += 100
            elif q in nid:
                score += 40
            if any(q in t.lower() for t in data['tags']):
                score += 25
            
            # Text matching inside file
            try:
                content = Path(data['path']).read_text(encoding='utf-8', errors='ignore')
                if q in content.lower():
                    score += 15
                    # Count occurrences
                    score += min(content.lower().count(q) * 2, 20)
            except Exception:
                pass

            if score > 0:
                results.append((score, data))

        results.sort(key=lambda x: x[0], reverse=True)
        return [r[1] for r in results]

    def get_node_details(self, node_id_or_title):
        nid = self._normalize_title(node_id_or_title)
        node = self.nodes.get(nid)
        if not node:
            # Try fuzzy match
            for k in self.nodes:
                if nid in k or k in nid:
                    node = self.nodes[k]
                    nid = k
                    break

        if not node:
            return None

        out_links = sorted(list(self.forward_edges[nid]))
        in_links = sorted(list(self.backlinks[nid]))

        return {
            'node': node,
            'outgoing_links': [{'id': l, 'exists': l in self.nodes, 'title': self.nodes[l]['title'] if l in self.nodes else l} for l in out_links],
            'backlinks': [{'id': l, 'exists': l in self.nodes, 'title': self.nodes[l]['title'] if l in self.nodes else l} for l in in_links],
            'degree': len(out_links) + len(in_links)
        }

    def shortest_path(self, start_id, end_id):
        start = self._normalize_title(start_id)
        end = self._normalize_title(end_id)

        if start not in self.nodes or end not in self.nodes:
            return None

        queue = deque([[start]])
        visited = {start}

        while queue:
            path = queue.popleft()
            curr = path[-1]

            if curr == end:
                return [self.nodes[n]['title'] if n in self.nodes else n for n in path]

            # Consider both forward and backward connections for semantic relationship
            neighbors = set(self.forward_edges[curr]) | set(self.backlinks[curr])
            for neighbor in neighbors:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(path + [neighbor])

        return None

    def find_hubs(self, top_n=10):
        # Nodes with highest in-degree / connectivity
        scored = []
        for nid, data in self.nodes.items():
            in_deg = len(self.backlinks[nid])
            out_deg = len(self.forward_edges[nid])
            total = in_deg + out_deg
            scored.append((total, in_deg, out_deg, data))

        scored.sort(key=lambda x: (x[0], x[1]), reverse=True)
        return scored[:top_n]

    def find_orphans(self):
        orphans = []
        for nid, data in self.nodes.items():
            if len(self.backlinks[nid]) == 0 and len(self.forward_edges[nid]) == 0:
                orphans.append(data)
        return orphans


def main():
    parser = argparse.ArgumentParser(description="Second Brain Knowledge Graph Engine")
    parser.add_argument("--paths", nargs="+", default=DEFAULT_SEARCH_PATHS, help="Roots of Markdown vault / Second Brain")
    parser.add_argument("--search", "-s", help="Search for concepts across graph")
    parser.add_argument("--node", "-n", help="Inspect a specific node (backlinks, forward links, degree)")
    parser.add_argument("--path", "-p", nargs=2, metavar=("FROM", "TO"), help="Find shortest connection path between two concepts")
    parser.add_argument("--hubs", action="store_true", help="List central MOCs / concept hubs by degree centrality")
    parser.add_argument("--orphans", action="store_true", help="List isolated notes with 0 connections")
    parser.add_argument("--json", action="store_true", help="Output results in JSON format")

    args = parser.parse_args()

    graph = BrainGraph(root_paths=args.paths)

    if args.search:
        results = graph.search_nodes(args.search)
        if args.json:
            print(json.dumps(results, indent=2))
        else:
            print(f"Encontrados {len(results)} nos para o termo '{args.search}':\n")
            for r in results[:15]:
                print(f"- {r['title']} ({r['path']})")

    elif args.node:
        details = graph.get_node_details(args.node)
        if not details:
            print(f"No '{args.node}' nao encontrado no grafo.")
            sys.exit(1)
        if args.json:
            print(json.dumps(details, indent=2))
        else:
            n = details['node']
            print(f"No: {n['title']}")
            print(f"Arquivo: {n['path']}")
            print(f"Conexoes Totais (Grau): {details['degree']}")
            print(f"\nLinks de Saida ({len(details['outgoing_links'])}):")
            for l in details['outgoing_links']:
                status = "[Existe]" if l['exists'] else "[Nao criado]"
                print(f"  -> {l['title']} {status}")
            print(f"\nBacklinks / Citacoes ({len(details['backlinks'])}):")
            for b in details['backlinks']:
                print(f"  <- {b['title']}")

    elif args.path:
        p = graph.shortest_path(args.path[0], args.path[1])
        if args.json:
            print(json.dumps({'path': p}))
        else:
            if p:
                print(f"Caminho semantico encontrado entre '{args.path[0]}' e '{args.path[1]}':")
                print(" -> ".join(p))
            else:
                print(f"Nenhum caminho encontrado entre '{args.path[0]}' e '{args.path[1]}'.")

    elif args.hubs:
        hubs = graph.find_hubs()
        if args.json:
            print(json.dumps([{'title': h[3]['title'], 'total': h[0], 'in': h[1], 'out': h[2], 'path': h[3]['path']} for h in hubs], indent=2))
        else:
            print("Principais Hubs / Centros de Conhecimento (Grau de Conectividade):\n")
            for total, in_deg, out_deg, data in hubs:
                print(f"- {data['title']} (Total: {total} | Citacoes: {in_deg} | Saidas: {out_deg})")
                print(f"  Caminho: {data['path']}")

    elif args.orphans:
        orphans = graph.find_orphans()
        if args.json:
            print(json.dumps(orphans, indent=2))
        else:
            print(f"Notas orfas sem conexoes ({len(orphans)}):\n")
            for o in orphans:
                print(f"- {o['title']} ({o['path']})")

    else:
        # Overview
        total_nodes = len(graph.nodes)
        total_edges = sum(len(v) for v in graph.forward_edges.values())
        print(f"Segundo Cerebro / Grafo de Conhecimento Indexado")
        print(f"Total de Conceitos (Nos): {total_nodes}")
        print(f"Total de Relacionamentos (Arestas): {total_edges}")
        print("\nUse --help para opcoes de pesquisa, inspecao de nos e caminhos.")

if __name__ == '__main__':
    main()
