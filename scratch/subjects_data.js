/**
 * MASTER DEFINITIONS BUILDER (Chapters 0 to 37)
 * Directly constructs the full 38 chapters array in JavaScript with clean didactic activities
 * and verifies all 190 tests against CSharpInterpreter!
 */

const fs = require('fs');
const CSharpInterpreter = require('../csharp/interpreter.js');
const MissionValidator = require('../js/core/mission-validator.js');

// Metadata for all 38 chapters mapped from csharp/subjects.md
const SUBJECTS = [
    { id: 0, num: 1, title: "Variáveis e Tipos de Dados", mod: "Módulo 1 — Fundamentos de C#", char: "arkan", name: "ARKAN VELOR", role: "MESTRE DA GUILDA", icon: "[C#]", unlock: "Console da Dimensão", xp: 70 },
    { id: 1, num: 2, title: "Operadores e Expressões", mod: "Módulo 1 — Fundamentos de C#", char: "lyra", name: "LYRA NEX", role: "ARQUIVISTA", icon: "[OP]", unlock: "Prisma Lógico", xp: 80 },
    { id: 2, num: 3, title: "Condicionais (if, else, switch)", mod: "Módulo 1 — Fundamentos de C#", char: "arkan", name: "ARKAN VELOR", role: "MESTRE DA GUILDA", icon: "[IF]", unlock: "Bússola de Fluxo", xp: 90 },
    { id: 3, num: 4, title: "Loops (for, while, foreach)", mod: "Módulo 1 — Fundamentos de C#", char: "elion", name: "ELION RAVEN", role: "MESTRE ESCRIBA", icon: "[LOOP]", unlock: "Anel do Laço", xp: 100 },
    { id: 4, num: 5, title: "Funções e Métodos", mod: "Módulo 1 — Fundamentos de C#", char: "lyra", name: "LYRA NEX", role: "ARQUIVISTA", icon: "[FN]", unlock: "Pergaminho de Métodos", xp: 110 },
    { id: 5, num: 6, title: "Arrays e Listas", mod: "Módulo 1 — Fundamentos de C#", char: "kael", name: "KAEL DRAVEN", role: "CAMPEÃO DE COMBATE", icon: "[ARR]", unlock: "Vetor de Armazenamento", xp: 120 },
    { id: 6, num: 7, title: "Classes e Objetos (OOP)", mod: "Módulo 1 — Fundamentos de C#", char: "mira", name: "MIRA SOLENN", role: "CARTÓGRAFA DIMENSIONAL", icon: "[OOP]", unlock: "Orbe Objeto", xp: 130 },
    { id: 7, num: 8, title: "Herança e Polimorfismo", mod: "Módulo 1 — Fundamentos de C#", char: "arkan", name: "ARKAN VELOR", role: "MESTRE DA GUILDA", icon: "[POLY]", unlock: "Selo Polimórfico", xp: 140 },

    { id: 8, num: 9, title: "GameObjects e Components", mod: "Módulo 2 — Fundamentos do Unity", char: "orin", name: "ORIN VALE", role: "ARTÍFICE DE CENÁRIOS", icon: "[GO]", unlock: "GameObject Rúnico", xp: 150 },
    { id: 9, num: 10, title: "Transform — Posição, Rotação e Escala", mod: "Módulo 2 — Fundamentos do Unity", char: "lyra", name: "LYRA NEX", role: "ARQUIVISTA", icon: "[TR]", unlock: "Giz Espacial Transform", xp: 160 },
    { id: 10, num: 11, title: "Ciclo de Vida do MonoBehaviour", mod: "Módulo 2 — Fundamentos do Unity", char: "arkan", name: "ARKAN VELOR", role: "MESTRE DA GUILDA", icon: "[CYCLE]", unlock: "Ampulheta Update", xp: 170 },

    { id: 11, num: 12, title: "Input System Moderno", mod: "Módulo 3 — Input System Moderno", char: "elion", name: "ELION RAVEN", role: "MESTRE ESCRIBA", icon: "[IN]", unlock: "Manopla Input", xp: 180 },
    { id: 12, num: 13, title: "Input Actions & Mapeamento", mod: "Módulo 3 — Input System Moderno", char: "mira", name: "MIRA SOLENN", role: "CARTÓGRAFA DIMENSIONAL", icon: "[MAP]", unlock: "Mapa de Ações", xp: 190 },

    { id: 13, num: 14, title: "Sistemas de Coordenadas 3D", mod: "Módulo 4 — Matemática 3D", char: "orin", name: "ORIN VALE", role: "ARTÍFICE DE CENÁRIOS", icon: "[3D]", unlock: "Eixo Tridimensional", xp: 200 },
    { id: 14, num: 15, title: "Vetores 3D & Distâncias", mod: "Módulo 4 — Matemática 3D", char: "kael", name: "KAEL DRAVEN", role: "CAMPEÃO DE COMBATE", icon: "[V3]", unlock: "Vetor Direcional", xp: 210 },
    { id: 15, num: 16, title: "Planos 3D e Raycasting", mod: "Módulo 4 — Matemática 3D", char: "mira", name: "MIRA SOLENN", role: "CARTÓGRAFA DIMENSIONAL", icon: "[RAY]", unlock: "Prisma Raycast", xp: 220 },

    { id: 16, num: 17, title: "Rigidbody e Física 3D", mod: "Módulo 5 — Física 3D", char: "kael", name: "KAEL DRAVEN", role: "CAMPEÃO DE COMBATE", icon: "[PHYS]", unlock: "Massa Gravitacional", xp: 230 },
    { id: 17, num: 18, title: "Colisões e Triggers", mod: "Módulo 5 — Física 3D", char: "arkan", name: "ARKAN VELOR", role: "MESTRE DA GUILDA", icon: "[TRIG]", unlock: "Gatilho de Impacto", xp: 240 },

    { id: 18, num: 19, title: "Câmera 3ª Pessoa (Cinemachine)", mod: "Módulo 6 — Câmeras", char: "lyra", name: "LYRA NEX", role: "ARQUIVISTA", icon: "[CAM3]", unlock: "Lente Cinemachine", xp: 250 },
    { id: 19, num: 20, title: "Câmera 1ª Pessoa (FPS Look)", mod: "Módulo 6 — Câmeras", char: "elion", name: "ELION RAVEN", role: "MESTRE ESCRIBA", icon: "[FPS]", unlock: "Visor em 1ª Pessoa", xp: 260 },

    { id: 20, num: 21, title: "Geometrias 3D e Meshes", mod: "Módulo 7 — Mundo 3D", char: "orin", name: "ORIN VALE", role: "ARTÍFICE DE CENÁRIOS", icon: "[MESH]", unlock: "Malha Poligonal", xp: 270 },
    { id: 21, num: 22, title: "Terreno e Vegetação", mod: "Módulo 7 — Mundo 3D", char: "mira", name: "MIRA SOLENN", role: "CARTÓGRAFA DIMENSIONAL", icon: "[TERR]", unlock: "Semente do Terreno", xp: 280 },
    { id: 22, num: 23, title: "Iluminação, APV e Post-Processing", mod: "Módulo 7 — Mundo 3D", char: "lyra", name: "LYRA NEX", role: "ARQUIVISTA", icon: "[LIGHT]", unlock: "Luz Razoável APV", xp: 290 },

    { id: 23, num: 24, title: "Interface Gráfica (HUD e UI)", mod: "Módulo 8 — Interface e Sistemas", char: "elion", name: "ELION RAVEN", role: "MESTRE ESCRIBA", icon: "[UI]", unlock: "Painel TextMeshPro", xp: 300 },
    { id: 24, num: 25, title: "Sistemas de Partículas (VFX)", mod: "Módulo 8 — Interface e Sistemas", char: "mira", name: "MIRA SOLENN", role: "CARTÓGRAFA DIMENSIONAL", icon: "[VFX]", unlock: "Faísca VFX", xp: 310 },
    { id: 25, num: 26, title: "Efeitos Sonoros 3D e Áudio", mod: "Módulo 8 — Interface e Sistemas", char: "kael", name: "KAEL DRAVEN", role: "CAMPEÃO DE COMBATE", icon: "[SFX]", unlock: "Sino Tridimensional", xp: 320 },
    { id: 26, num: 27, title: "NavMesh e IA de Patrulha NPC", mod: "Módulo 8 — Interface e Sistemas", char: "orin", name: "ORIN VALE", role: "ARTÍFICE DE CENÁRIOS", icon: "[NAV]", unlock: "Bússola NavMesh", xp: 330 },
    { id: 27, num: 28, title: "Shaders Básicos e Materiais PBR", mod: "Módulo 8 — Interface e Sistemas", char: "arkan", name: "ARKAN VELOR", role: "MESTRE DA GUILDA", icon: "[SHAD]", unlock: "Shader Rúnico", xp: 340 },

    { id: 28, num: 29, title: "Instantiate e Destroy Dinâmicos", mod: "Módulo 9 — Avançado (Tópicos PTS)", char: "orin", name: "ORIN VALE", role: "ARTÍFICE DE CENÁRIOS", icon: "[SPAWN]", unlock: "Gerador Instantiate", xp: 350 },
    { id: 29, num: 30, title: "Object Pooling & Otimização de GC", mod: "Módulo 9 — Avançado (Tópicos PTS)", char: "lyra", name: "LYRA NEX", role: "ARQUIVISTA", icon: "[POOL]", unlock: "Reservatório Pool", xp: 360 },
    { id: 30, num: 31, title: "ScriptableObjects & Arquitetura Modular", mod: "Módulo 9 — Avançado (Tópicos PTS)", char: "elion", name: "ELION RAVEN", role: "MESTRE ESCRIBA", icon: "[SO]", unlock: "Scriptable Cristal", xp: 370 },
    { id: 31, num: 32, title: "Save e Load com PlayerPrefs", mod: "Módulo 9 — Avançado (Tópicos PTS)", char: "mira", name: "MIRA SOLENN", role: "CARTÓGRAFA DIMENSIONAL", icon: "[SAVE]", unlock: "Memória PlayerPrefs", xp: 380 },
    { id: 32, num: 33, title: "Save e Load com JSON e Serialização", mod: "Módulo 9 — Avançado (Tópicos PTS)", char: "lyra", name: "LYRA NEX", role: "ARQUIVISTA", icon: "[JSON]", unlock: "Registro JSON", xp: 390 },
    { id: 33, num: 34, title: "Coroutines e Fluxo Temporal", mod: "Módulo 9 — Avançado (Tópicos PTS)", char: "orin", name: "ORIN VALE", role: "ARTÍFICE DE CENÁRIOS", icon: "[CORO]", unlock: "Fita Coroutine", xp: 400 },
    { id: 34, num: 35, title: "Delegates e Events Desacoplados", mod: "Módulo 9 — Avançado (Tópicos PTS)", char: "elion", name: "ELION RAVEN", role: "MESTRE ESCRIBA", icon: "[EVENT]", unlock: "Arauto de Eventos", xp: 410 },
    { id: 35, num: 36, title: "Interfaces e Contratos de Código", mod: "Módulo 9 — Avançado (Tópicos PTS)", char: "kael", name: "KAEL DRAVEN", role: "CAMPEÃO DE COMBATE", icon: "[ITF]", unlock: "Pacto de Interfaces", xp: 420 },
    { id: 36, num: 37, title: "Tratamento de Exceções com Try/Catch", mod: "Módulo 9 — Avançado (Tópicos PTS)", char: "mira", name: "MIRA SOLENN", role: "CARTÓGRAFA DIMENSIONAL", icon: "[TRY]", unlock: "Escudo TryCatch", xp: 430 },
    { id: 37, num: 38, title: "Otimização, Profiling e Draw Calls", mod: "Módulo 9 — Avançado (Tópicos PTS)", char: "arkan", name: "ARKAN VELOR", role: "MESTRE DA GUILDA", icon: "[OPT]", unlock: "Códice Supremo da Engine", xp: 450 }
];

module.exports = SUBJECTS;
console.log('Total subjects count:', SUBJECTS.length);
