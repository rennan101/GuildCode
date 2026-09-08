# Diretrizes do Projeto GuildCode

## Second Brain (Obsidian)
- O projeto mantém um Second Brain local em `docs/brain/` (ignorado pelo git para manter privacidade total).
- Ponto de entrada: `docs/brain/_Index.md`.
- **Sempre que:**
  1. For iniciar uma investigação complexa ou feature nova: consulte `docs/brain/` para contexto prévio, decisões e armadilhas documentadas.
  2. Finalizar uma alteração arquitetural, resolver bugs complexos ou implementar novas features: atualize ou crie as notas correspondentes em `docs/brain/` com Wikilinks (`[[Nome-Da-Nota]]`).

## Identidade Visual & Ícones (Regra Estrita)
- **NUNCA use emojis** em botões, títulos, cards, modais, lojas ou componentes da interface (UI).
- Utilize **apenas SVGs profissionais e consistentes em todo o projeto**, reutilizando a iconografia oficial já estabelecida nas seções correspondentes (ex: Loja, Abismo, Torneios, Boss Raids, PVP, etc.).

## Segurança de Dados & Firebase (Regra Crítica / Risco de Perda de Dados)
- **CUIDADO MÁXIMO com Firebase / Firestore:** Toda vez que for alterar código relacionado ao Firebase (Auth, Firestore, sincronização de progresso ou estado de usuário), tenha rigor absoluto para **JAMAIS executar ações que causem perda ou regressão de dados/progresso** dos usuários da plataforma.
- **Princípio da Não-Regressão:** NUNCA sobrescreva `level`, `xp`, `chapters`, `chapterUnlocks` ou `gameProgress` com valores menores, padrões zerados ou objetos vazios.
- **Sempre preserve o progresso existente:** Toda gravação deve utilizar merges seguros (`{ merge: true }` no Firestore) e validar se o estado local/remoto possui nível ou capítulos superiores antes de sincronizar (`Math.max`, verificação de `completed`).
- **Respeito às Contas de Professor/Admin:** Assegure que contas de mestres e professores mantenham sempre seu progresso integral restaurado e intacto no login, na tela de guilda e no mapa.


