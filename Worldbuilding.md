# 🌍 WORLDBUILDING & ATLAS CARTOGRÁFICO DE AETHELGARD

> **Documento Oficial de Engenharia de Mundo e Cartografia Visual de CODE LEVELER**  
> Este documento integra a narrativa, arquitetura de sistemas em Linguagem C, coordenadas espaciais, biomas, marcos geográficos e o mapeamento de assets visuais para construção de cenários 2D/3D baseados no acervo `assets/Dungeon Crawl Stone Soup Full/`.

---

## 🌌 1. A Cosmologia e a Estrutura dos Três Planos

O mundo de **Aethelgard** opera sob a física do **Compilador Divino**. A realidade é composta por três camadas de existência interconectadas por canais de execução:

```
                          ▲  PLANO ASTRAL / CELESTE
                          │  (Altar do Livro Eterno, Torre Astral, Orbe Primordial)
                          │
══════════════════════════╪════════════════════════════════════════════════════════
  TERRESTRE / CIDADELA    │  (Os 16 Distritos da Guilda, Forjas, Coliseu, Scriptorium)
══════════════════════════╪════════════════════════════════════════════════════════
                          │
                          ▼  PLANO SUBTERRÂNEO / ABISMO
                             (Masmorra Fractal, Abismo de Algoritmos, Falhas de Memória)
```

* **Plano Astral (Camada de Persistência & Memória Superior)**: Onde a essência imutável do código repousa.
* **Plano Terrestre (Camada de Execução & Compilação)**: A grande cidadela de GuildCode onde os aventureiros treinam e refinam seus códigos.
* **Plano Subterrâneo (O Abismo de Algoritmos & Heaps)**: Zonas desordenadas, corrupções de ponteiro e vazamentos de memória habitados por anomalias que buscam colapsar a cidadela.

---

## 🧭 2. Mapa Geral de Coordenadas e Eixos de Aethelgard

```
                     [NORTE ASTRAL]
                (Montanhas do Vácuo / Zenith)
                             ▲
                             │
     [OESTE ARCANO]          │          [LESTE DAS FORJAS]
   (Bibliotecas & Runas)     │        (Arsenal & Minérios de Lava)
           ◄─────────────────┼─────────────────►
                             │
                             │
                             ▼
                       [SUL PRIMORDIAL]
                   (Vales dos Recrutas / Portais)
```

### 📊 Visão Geral dos 16 Distritos, Eixos e Biomas

| Distrito | Nome do Local | Coordenadas / Eixo | Bioma & Clima | Guardião | Tema em C | Asset Tileset Principal |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **00** | **Círculo do Despertar** | `Sul Central (0, -10)` | Santuário de Obsidiana & Éter | **Arkan / GM** | I/O (`printf`/`scanf`) | `dungeon/floor/black_cobalt`, `dungeon/altars/altar_ashenzari` |
| **01** | **Portal de Entrada** | `Sul (0, -8)` | Bastilhas de Mithril & Grama Mística | **Arkan / Lyra** | Variáveis & Aritmética | `dungeon/doors/gate_closed`, `dungeon/floor/white_marble` |
| **02** | **Posto Sentinela** | `Sul-Sudoeste (-3, -6)` | Penhasco Nebuloso & Pedra Bruta | **Lyra Nex** | Decisões (`if`/`else`) & Loops | `dungeon/wall/stone_gray`, `dungeon/floor/rect_gray` |
| **03** | **Scriptorium dos Escribas** | `Sudoeste (-6, -4)` | Cripta Cristalina Silenciosa | **Elion Dusk** | Funções & Modularização | `dungeon/wall/church`, `dungeon/floor/crypt` |
| **04** | **Cofre das Bolsas Dimensionais**| `Oeste Baixo (-8, -2)` | Abóbada com Pedestais Rúnicos | **Lyra Nex** | Vetores Unidimensionais | `dungeon/floor/pedestal_full`, `dungeon/chest` |
| **05** | **Masmorra Fractal dos Espelhos**| `Subterrâneo 1 (-8, 0, Z=-1)`| Labirinto Cúbico de Espelhos | **Mira Solis** | Recursividade & Caso Base | `dungeon/wall/mirrored_wall`, `dungeon/gateways/enter_labyrinth` |
| **06** | **Depósito Perdido de Relíquias**| `Oeste Central (-8, 2)` | Galpões de Arenito e Areia Dourada | **Lyra / Kael** | Busca Linear em Vetores | `dungeon/floor/sandstone_floor`, `dungeon/wall/sandstone_wall` |
| **07** | **Forjas Elementais do Arsenal** | `Leste Baixo (6, -2)` | Caverna de Magma e Forjas | **Kael Thorn** | Inserção Ordenada & Deslocamento | `dungeon/floor/lava`, `dungeon/wall/volcanic_wall` |
| **08** | **Torre Astral dos Grimórios** | `Noroeste (-6, 6)` | Espirais de Cristal Flutuantes | **Lyra / Elion** | Busca Binária (`O(log N)`) | `dungeon/floor/crystal_floor`, `dungeon/wall/crystal_wall_cyan` |
| **09** | **Domínio Cartográfico** | `Norte Central (0, 6)` | Meseta de Mosaicos e Mirante | **Mira Solis** | Matrizes Bidimensionais | `dungeon/floor/mosaic`, `dungeon/wall/relief` |
| **10** | **Santuário das Palavras** | `Norte-Noroeste (-3, 8)` | Salão de Mármore Polido & Runas | **Elion Dusk** | Strings (`char[]`, `\0`, `strcmp`)| `dungeon/floor/sigil_circle`, `dungeon/wall/marble_wall` |
| **11** | **Câmara Secreta de Mana** | `Leste Central (8, 2)` | Núcleo Arcano de Alta Tensão | **Kael / Arkan**| Ponteiros (`*`, `&`, Memória) | `dungeon/wall/zot_blue`, `dungeon/zot_pillar` |
| **12** | **Pavilhão dos Contratos** | `Nordeste (6, 6)` | Pátio de Monumentos e Heróis | **Elion Dusk** | Heterogêneos (`struct`) | `dungeon/statues/statue_ancient_hero`, `dungeon/floor/etched` |
| **13** | **Salão dos Mestres** | `Nordeste Alto (4, 8)` | Cúpula Majestosa e Banco Central | **Elion / Lyra** | Vetores de Struct | `dungeon/wall/catacombs`, `dungeon/floor/pedestal_north` |
| **14** | **Grande Coliseu Arcano** | `Leste Alto (8, 6)` | Arena Circular com Fossos de Fogo | **Kael / Arkan**| Algoritmos de Ordenação | `dungeon/floor/infernal`, `dungeon/wall/bars_red` |
| **15** | **Altar do Livro Eterno** | `Zenith Celestial (0, 10, Z=+1)`| Platô Celestial de Éter Eterno | **Todos / GM** | Persistência (`FILE*`, `fopen`)| `dungeon/gateways/starry_portal`, `dungeon/altars/altar_sif_muna` |

---

## 🏛️ 3. Guia Detalhado dos Cenários & Composição de Assets DCSS

Cada local possui uma paleta de assets específicos prontos para compor o mapa visual e as telas do jogo:

---

### 📍 Distrito 00: Círculo do Despertar
* **Coordenada Cartográfica**: `(0, -10)` — Ponto de Início (Vale Sul).
* **Atmosfera & Cores**: Preto obsidiana profundo, runas douradas cintilantes e anéis de invocação.
* **Composição de Assets (`assets/Dungeon Crawl Stone Soup Full/`)**:
  - **Piso**: `dungeon/floor/black_cobalt_1.png` a `black_cobalt_12.png`.
  - **Altar Central**: `dungeon/altars/altar_ashenzari.png` ou `altar_base.png`.
  - **Pilares e Runas**: `dungeon/floor/sigil_circle.png` e `dungeon/floor/sigil_cross.png`.
  - **Portais Dimensionais**: `dungeon/gateways/portal.png` e `dungeon/gateways/starry_portal.png`.
* **Descrição do Cenário**: Um platô circular cercado por um abismo estrelado onde novos Codemancers materializam suas almas.

---

### 📍 Distrito 01: Portal de Entrada da Guilda
* **Coordenada Cartográfica**: `(0, -8)` — A Barreira Protetora da Fortaleza.
* **Atmosfera & Cores**: Mármore branco puro, portões reforçados de aço azul e estandartes dourados.
* **Composição de Assets**:
  - **Piso**: `dungeon/floor/white_marble_0.png` a `white_marble_9.png`.
  - **Paredes**: `dungeon/wall/marble_wall_1.png` a `marble_wall_12.png`.
  - **Portões Principais**: `dungeon/doors/gate_closed_left.png`, `gate_closed_middle.png`, `gate_closed_right.png`.
  - **Estatutos de Boas-Vindas**: `dungeon/statues/statue_ancient_hero.png`.
* **Descrição do Cenário**: A entrada triunfal da cidadela de GuildCode, com guardas rúnicos conferindo a integridade dos tipos primitivos dos recém-chegados.

---

### 📍 Distrito 02: Posto Sentinela das Encruzilhadas
* **Coordenada Cartográfica**: `(-3, -6)` — Rota Sudoeste.
* **Atmosfera & Cores**: Pedra cinzenta rústica, tochas tremeluzentes e terreno rochoso.
* **Composição de Assets**:
  - **Piso**: `dungeon/floor/rect_gray_0_new.png` a `rect_gray_3_new.png`.
  - **Paredes**: `dungeon/wall/stone_gray_0.png` a `stone_gray_3.png`.
  - **Iluminação & Alertas**: `dungeon/wall/torches/` e `dungeon/traps/trap_alarm.png`.
  - **Portas Reforçadas**: `dungeon/doors/runed_door.png`.
* **Descrição do Cenário**: Posto militar onde as bifurcações de fluxo (`if/else`) decidem o destino das patrulhas contra as hordas inimigas.

---

### 📍 Distrito 03: Scriptorium dos Escribas
* **Coordenada Cartográfica**: `(-6, -4)` — Bosque dos Registros.
* **Atmosfera & Cores**: Azul meia-noite, vitrais góticos e estantes de pergaminhos.
* **Composição de Assets**:
  - **Piso**: `dungeon/floor/crypt_domino_1a.png` a `crypt_domino_8a.png`.
  - **Paredes**: `dungeon/wall/church_0.png` a `church_4.png`.
  - **Recipientes de Fórmulas**: `dungeon/large_box.png` e `dungeon/floor/tutorial_pad.png`.
* **Descrição do Cenário**: O templo do conhecimento onde feitiços modulares são cunhados e arquivados por **Elion Dusk**.

---

### 📍 Distrito 04: Cofre das Bolsas Dimensionais
* **Coordenada Cartográfica**: `(-8, -2)` — Setor Ocidental de Suprimentos.
* **Atmosfera & Cores**: Marrom nobre, madeira arcana e baús cintilantes.
* **Composição de Assets**:
  - **Piso**: `dungeon/floor/pebble_brown_0_new.png` a `pebble_brown_8_new.png`.
  - **Paredes**: `dungeon/wall/brick_brown_0.png` a `brick_brown_7.png`.
  - **Armazenamento**: `dungeon/chest.png`, `dungeon/chest_2_closed.png`, `dungeon/chest_2_open.png`.
  - **Pedestais de Índices**: `dungeon/floor/pedestal_full.png`, `pedestal_east.png`, `pedestal_west.png`.
* **Descrição do Cenário**: A grande tesouraria onde os compartimentos de vetores de 5 a 100 posições guardam os itens de inventário.

---

### 📍 Distrito 05: A Masmorra Fractal dos Espelhos
* **Coordenada Cartográfica**: `(-8, 0, Subterrâneo Z=-1)` — A Fenda da Auto-Invocação.
* **Atmosfera & Cores**: Vidro espelhado, reflexos esmeralda e salas infinitamente recursivas.
* **Composição de Assets**:
  - **Piso**: `dungeon/floor/crystal_floor_0.png` a `crystal_floor_5.png`.
  - **Paredes**: `dungeon/wall/mirrored_wall_new.png` e `dungeon/wall/emerald_1.png` a `emerald_8.png`.
  - **Portais de Retorno**: `dungeon/gateways/enter_labyrinth.png`, `dungeon/gateways/lab_portal.png`.
  - **Armadilhas de Loop**: `dungeon/traps/trap_teleport.png`.
* **Descrição do Cenário**: Um abismo cristalino onde cada câmara invoca outra menor até encontrar o caso base de parada.

---

### 📍 Distrito 06: O Depósito Perdido das Relíquias
* **Coordenada Cartográfica**: `(-8, 2)` — As Ruínas do Deserto Oculto.
* **Atmosfera & Cores**: Arenito dourado, poeira de relíquias e ânforas antigas.
* **Composição de Assets**:
  - **Piso**: `dungeon/floor/sandstone_floor_0.png` a `sandstone_floor_9.png` e `dungeon/floor/sand_1.png`.
  - **Paredes**: `dungeon/wall/sandstone_wall_0.png` a `sandstone_wall_9.png`.
  - **Entradas e Portais**: `dungeon/gateways/ossuary_portal.png`, `dungeon/gateways/enter_tomb.png`.
* **Descrição do Cenário**: Depósito milenar soterrado onde a busca linear é a única forma de vasculhar cada baú sem ativar maldições.

---

### 📍 Distrito 07: As Forjas Elementais do Arsenal
* **Coordenada Cartográfica**: `(6, -2)` — As Gargantas Vulcânicas Orientais.
* **Atmosfera & Cores**: Laranja incandescente, rios de lava e metal reluzente.
* **Composição de Assets**:
  - **Piso**: `dungeon/floor/lava_0.png` a `lava_3.png` e `volcanic_floor_0.png`.
  - **Paredes**: `dungeon/wall/volcanic_wall_0.png` a `volcanic_wall_6.png`.
  - **Forjas & Bigornas**: `dungeon/altars/altar_makhleb_flame_1.png` a `altar_makhleb_flame_8.png`.
  - **Portões de Fogo**: `dungeon/gateways/enter_gehenna.png`, `dungeon/gateways/volcano_exit.png`.
* **Descrição do Cenário**: As forjas vulcânicas de **Kael Thorn**, onde o metal rúnico é deslocado em blocos para inserção ordenada de armamentos.

---

### 📍 Distrito 08: A Torre Astral dos Grimórios
* **Coordenada Cartográfica**: `(-6, 6)` — O Pico Sagrado do Noroeste.
* **Atmosfera & Cores**: Ciano luminescente, azul cobalto, prateleiras suspensas no éter.
* **Composição de Assets**:
  - **Piso**: `dungeon/floor/crystal_floor_2.png` e `dungeon/floor/black_cobalt_5.png`.
  - **Paredes**: `dungeon/wall/crystal_wall_cyan.png`, `crystal_wall_blue.png`.
  - **Altares de Advinhação**: `dungeon/altars/altar_sif_muna.png`, `dungeon/altars/altar_vehumet.png`.
  - **Monólitos de Partição**: `dungeon/statues/statue_orb.png`.
* **Descrição do Cenário**: Uma torre infinita onde feitiços ordenados são divididos pela metade em tempo recorde (`O(log N)`).

---

### 📍 Distrito 09: O Domínio Cartográfico de Aethelgard
* **Coordenada Cartográfica**: `(0, 6)` — O Mirante Central do Norte.
* **Atmosfera & Cores**: Mosaicos multicoloridos, relevos topográficos e águas calmas.
* **Composição de Assets**:
  - **Piso**: `dungeon/floor/mosaic_0.png` a `mosaic_15.png`.
  - **Paredes**: `dungeon/wall/relief_0.png` a `relief_3.png`.
  - **Espelhos D'água**: `dungeon/water/shallow_water.png`, `dungeon/water/deep_water.png`.
* **Descrição do Cenário**: A câmara de estratégia de **Mira Solis**, onde a projeção da matriz bidimensional mapeia toda a topografia do reino.

---

### 📍 Distrito 10: O Santuário das Palavras de Poder
* **Coordenada Cartográfica**: `(-3, 8)` — A Floresta dos Ecos Rúnicos.
* **Atmosfera & Cores**: Mármore branco esculpido, runas luminosas no piso e silêncio absoluto.
* **Composição de Assets**:
  - **Piso**: `dungeon/floor/sigil_algiz_left.png`, `sigil_circle.png`, `sigil_cross.png`.
  - **Paredes**: `dungeon/wall/marble_wall_8.png` a `marble_wall_12.png`.
  - **Portais Rúnicos**: `dungeon/doors/gate_runed_left.png`, `gate_runed_middle.png`, `gate_runed_right.png`.
* **Descrição do Cenário**: Uma abóbada selada onde frases e encantamentos rúnicos (`char[]`) terminados com o glifo nulo `\0` ecoam pela eternidade.

---

### 📍 Distrito 11: A Câmara Secreta das Chamas de Mana
* **Coordenada Cartográfica**: `(8, 2)` — O Coração Arcano da Cidadela.
* **Atmosfera & Cores**: Roxo neon, azul zot elétrico e condutores de energia pura.
* **Composição de Assets**:
  - **Piso**: `dungeon/floor/floor_nerves_0.png` a `floor_nerves_6.png`.
  - **Paredes**: `dungeon/wall/zot_blue_0_new.png` a `zot_blue_3_new.png`.
  - **Pilares de Condução**: `dungeon/zot_pillar.png`, `dungeon/traps/trap_zot.png`.
  - **Portões Selados**: `dungeon/doors/gate_sealed_middle.png`.
* **Descrição do Cenário**: A sala proibida onde os manipuladores de ponteiros tocam os canais brutos da memória e alteram o estado das variáveis à distância.

---

### 📍 Distrito 12: O Pavilhão dos Contratos Heroicos
* **Coordenada Cartográfica**: `(6, 6)` — A Esplanada dos Campeões.
* **Atmosfera & Cores**: Pedra gravada com louros dourados e estátuas de guerreiros lendários.
* **Composição de Assets**:
  - **Piso**: `dungeon/floor/etched_0.png` a `etched_5.png`.
  - **Paredes**: `dungeon/wall/stone_brick_1.png` a `stone_brick_12.png`.
  - **Estátuas de Classes**: `dungeon/statues/statue_ancient_hero.png`, `statue_sword.png`, `statue_archer.png`.
  - **Monumento de Honra**: `dungeon/sparkling_fountain.png`.
* **Descrição do Cenário**: Onde as fichas heróicas (`structs`) dos aventureiros são esculpidas em pedra, unindo vida, mana, classe e ouro.

---

### 📍 Distrito 13: O Salão dos Mestres e Contingentes
* **Coordenada Cartográfica**: `(4, 8)` — O Grande Tribunal da Guilda.
* **Atmosfera & Cores**: Pedra monumental nobre, fileiras de pedestais e altares de julgamento.
* **Composição de Assets**:
  - **Piso**: `dungeon/floor/pedestal_north.png`, `pedestal_south.png`, `pedestal_full.png`.
  - **Paredes**: `dungeon/wall/catacombs_10.png` a `catacombs_15.png`.
  - **Mesa do Conselho**: `dungeon/altars/altar_cheibriados.png`, `dungeon/altars/altar_elyvilon.png`.
* **Descrição do Cenário**: O quartel-general de comando onde o exército da guilda é catalogado em vetores de fichas, permitindo filtros em massa e cálculo de poder bélico médio.

---

### 📍 Distrito 14: O Grande Coliseu Arcano
* **Coordenada Cartográfica**: `(8, 6)` — O Anfiteatro do Leste.
* **Atmosfera & Cores**: Vermelho carmesim infernal, grades de ferro e chamas de combate.
* **Composição de Assets**:
  - **Piso**: `dungeon/floor/infernal_1.png` a `infernal_15.png`.
  - **Paredes**: `dungeon/wall/bars_red_1.png` a `bars_red_8.png`, `dungeon/wall/hell_1.png`.
  - **Jaulas dos Desafiantes**: `dungeon/floor/cage_0.png` a `cage_5.png`.
  - **Portais de Entrada do Coliseu**: `dungeon/gateways/enter_dis.png`, `dungeon/gateways/enter_hell.png`.
* **Descrição do Cenário**: O torneio máximo onde duelistas são ordenados por *Bubble Sort* e *Selection Sort* antes do combate final.

---

### 📍 Distrito 15: O Altar do Livro Eterno
* **Coordenada Cartográfica**: `(0, 10, Zenith Z=+1)` — O Ponto Mais Elevado do Cosmos.
* **Atmosfera & Cores**: Luz branca ofuscante, nebulosa estelar e névoa etérea imperecível.
* **Composição de Assets**:
  - **Piso**: `dungeon/floor/white_marble_6.png` a `white_marble_9.png`, `dungeon/floor/sigil_rhombus.png`.
  - **Paredes & Arcos**: `dungeon/gateways/stone_arch.png`, `dungeon/gateways/starry_portal.png`.
  - **O Altar Central do Tomo**: `dungeon/altars/altar_sif_muna.png`, `dungeon/altars/altar_zin.png`.
  - **O Livro Eterno**: `dungeon/item/books/` (se disponível) ou `dungeon/sparkling_fountain_2.png`.
* **Descrição do Cenário**: O topo celestial do mundo onde os canais `FILE*` gravam a lenda do Codemancer na história eterna do cosmos.

---

## 🕳️ 4. O Abismo de Algoritmos (Zona Subterrânea de PvP & Ranqueadas)

* **Localização Espacial**: Todo o quadrante subterrâneo abaixo da Cidadela (`Z = -2` até `Z = -10`).
* **Estrutura Visual**:
  - **Andares Superiores (Scriptling / Byte Knight)**: `dungeon/wall/abyss/`, `dungeon/floor/acidic_floor_0.png` a `3.png`.
  - **Andares Intermediários (Logic Sorcerer / Kernel Master)**: `dungeon/wall/slime_0_new.png`, `dungeon/floor/green_bones_1.png`.
  - **Câmara do Apex Codemancer**: `dungeon/gateways/enter_pandemonium_new.png`, `dungeon/floor/demonic_red_1.png`.
* **Conceito de Gameplay**: Andares gerados proceduralmente onde anomalias de sintaxe e vazamentos de memória precisam ser depurados contra o relógio para conquistar posições no ranking global.
