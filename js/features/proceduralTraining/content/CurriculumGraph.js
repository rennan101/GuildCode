/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — PROCEDURAL TRAINING SYSTEM (PTS)
   CurriculumGraph: Grafo Curricular dos 16 Andares em C (00 a 15)
   ═══════════════════════════════════════════════════════════════ */

const CURRICULUM_FLOORS = {
    0: {
        id: 'estrutura_basica_io',
        floor: 0,
        name: 'Fundamentos de entrada, saída e operações',
        concepts: [
            'estrutura_minima',
            'include_stdio',
            'main',
            'return_zero',
            'printf',
            'scanf',
            'int',
            'float',
            'char',
            'conversao',
            'media',
            'operacoes_aritmeticas',
            'divisao_inteira',
            'divisao_decimal',
            'modulo',
            'formatacao_saida',
            'ascii'
        ],
        prerequisites: [],
        difficultyRange: ['easy', 'medium']
    },
    1: {
        id: 'variaveis_tipos',
        floor: 1,
        name: 'Variáveis, tipos e operadores',
        concepts: [
            'declaracao',
            'inicializacao',
            'int',
            'char',
            'float',
            'double',
            'atribuicao',
            'expressoes',
            'soma',
            'subtracao',
            'multiplicacao',
            'divisao',
            'modulo',
            'precedencia',
            'conversao_implicita',
            'divisao_inteira',
            'operador_ternario'
        ],
        prerequisites: ['estrutura_basica_io'],
        difficultyRange: ['easy', 'medium', 'hard']
    },
    2: {
        id: 'condicionais_repeticao',
        floor: 2,
        name: 'Condicionais e repetição',
        concepts: [
            'if',
            'else',
            'condicoes',
            'operadores_relacionais',
            'operadores_logicos',
            'multiplos',
            'for',
            'while',
            'contadores',
            'acumuladores',
            'tabuada',
            'repeticao_controlada',
            'simulacao_turnos',
            'calculo_loops'
        ],
        prerequisites: ['variaveis_tipos'],
        difficultyRange: ['easy', 'medium', 'hard']
    },
    3: {
        id: 'funcoes',
        floor: 3,
        name: 'Funções',
        concepts: [
            'declaracao_funcao',
            'definicao_funcao',
            'parametros',
            'retorno',
            'int_retorno',
            'void_retorno',
            'chamada_funcao',
            'reutilizacao',
            'composicao_funcoes',
            'funcoes_atributos'
        ],
        prerequisites: ['condicionais_repeticao'],
        difficultyRange: ['easy', 'medium', 'hard']
    },
    4: {
        id: 'vetores',
        floor: 4,
        name: 'Vetores',
        concepts: [
            'declaracao_vetor',
            'inicializacao_vetor',
            'indices',
            'leitura_vetor',
            'escrita_vetor',
            'for_vetor',
            'maior_valor',
            'menor_valor',
            'soma_vetor',
            'media_vetor',
            'transformacao_vetor',
            'filtro_vetor',
            'percurso_reverso'
        ],
        prerequisites: ['condicionais_repeticao'],
        difficultyRange: ['easy', 'medium', 'hard', 'expert']
    },
    5: {
        id: 'recursividade',
        floor: 5,
        name: 'Recursividade',
        concepts: [
            'funcao_recursiva',
            'caso_base',
            'caso_recursivo',
            'soma_recursiva',
            'fibonacci',
            'potencia',
            'contagem_digitos',
            'torre_hanoi',
            'profundidade_chamada'
        ],
        prerequisites: ['funcoes'],
        difficultyRange: ['medium', 'hard', 'expert']
    },
    6: {
        id: 'busca_ocorrencia',
        floor: 6,
        name: 'Busca e ocorrência',
        concepts: [
            'busca_linear',
            'contagem_ocorrencias',
            'posicoes',
            'elemento_frequente',
            'valores_unicos',
            'busca_matriz',
            'linha_coluna',
            'comparacao_elementos'
        ],
        prerequisites: ['vetores'],
        difficultyRange: ['easy', 'medium', 'hard', 'expert']
    },
    7: {
        id: 'manipulacao_vetores',
        floor: 7,
        name: 'Manipulação de vetores',
        concepts: [
            'insercao_vetor',
            'remocao_vetor',
            'deslocamento_elementos',
            'insercao_ordenada',
            'mesclagem_vetores',
            'rotacao_vetor',
            'manutencao_ordenacao'
        ],
        prerequisites: ['vetores'],
        difficultyRange: ['medium', 'hard', 'expert']
    },
    8: {
        id: 'busca_binaria',
        floor: 8,
        name: 'Busca binária',
        concepts: [
            'vetor_ordenado',
            'left_right_mid',
            'comparacao_binaria',
            'reducao_intervalo',
            'busca_binaria_iterativa',
            'contagem_comparacoes',
            'insercao_posicao',
            'remocao_apos_busca'
        ],
        prerequisites: ['busca_ocorrencia'],
        difficultyRange: ['medium', 'hard', 'expert']
    },
    9: {
        id: 'matrizes',
        floor: 9,
        name: 'Matrizes',
        concepts: [
            'arrays_bidimensionais',
            'linhas_colunas',
            'indices_i_j',
            'matriz_3x3',
            'soma_matriz',
            'diagonal_principal',
            'filtros_matriz',
            'soma_por_linha',
            'transposta',
            'operacoes_matrizes'
        ],
        prerequisites: ['vetores'],
        difficultyRange: ['medium', 'hard', 'expert']
    },
    10: {
        id: 'strings',
        floor: 10,
        name: 'Strings',
        concepts: [
            'char_array',
            'terminador_nulo',
            'leitura_string',
            'comprimento_string',
            'percurso_string',
            'inversao_string',
            'contagem_vogais',
            'comparacao_strings',
            'manipulacao_caracteres',
            'busca_substring'
        ],
        prerequisites: ['vetores'],
        difficultyRange: ['easy', 'medium', 'hard', 'expert']
    },
    11: {
        id: 'ponteiros',
        floor: 11,
        name: 'Ponteiros',
        concepts: [
            'endereco_memoria',
            'operador_endereco',
            'operador_desreferenciacao',
            'declaracao_ponteiro',
            'alteracao_referencia',
            'ponteiros_arrays',
            'parametros_ponteiro',
            'retorno_ponteiro'
        ],
        prerequisites: ['funcoes', 'variaveis_tipos'],
        difficultyRange: ['medium', 'hard', 'expert']
    },
    12: {
        id: 'structs',
        floor: 12,
        name: 'Struct',
        concepts: [
            'declaracao_struct',
            'campos_struct',
            'inicializacao_struct',
            'acesso_ponto',
            'passagem_valor',
            'funcao_com_struct',
            'ponteiro_struct',
            'atualizacao_dados'
        ],
        prerequisites: ['variaveis_tipos', 'funcoes'],
        difficultyRange: ['easy', 'medium', 'hard', 'expert']
    },
    13: {
        id: 'arrays_struct',
        floor: 13,
        name: 'Arrays de Struct',
        concepts: [
            'vetor_structs',
            'percurso_structs',
            'busca_por_campo',
            'soma_campos',
            'media_campos',
            'menor_campo',
            'maior_campo',
            'ordenacao_campo',
            'selecao_registro'
        ],
        prerequisites: ['structs', 'vetores'],
        difficultyRange: ['medium', 'hard', 'expert']
    },
    14: {
        id: 'ordenacao',
        floor: 14,
        name: 'Ordenação',
        concepts: [
            'bubble_sort',
            'selection_sort',
            'crescente',
            'decrescente',
            'comparacoes_sort',
            'trocas_sort',
            'contagem_trocas',
            'ordenacao_strings',
            'ordenacao_registros'
        ],
        prerequisites: ['vetores', 'busca_ocorrencia'],
        difficultyRange: ['medium', 'hard', 'expert']
    },
    15: {
        id: 'arquivos',
        floor: 15,
        name: 'Arquivos',
        concepts: [
            'file_pointer',
            'fopen',
            'fclose',
            'fprintf',
            'fscanf',
            'fgets',
            'fputs',
            'leitura_arquivo',
            'escrita_arquivo',
            'append_arquivo',
            'gravacao_dados',
            'copia_backup',
            'contagem_linhas'
        ],
        prerequisites: ['strings', 'ponteiros', 'structs'],
        difficultyRange: ['medium', 'hard', 'expert']
    }
};

class CurriculumGraph {
    constructor() {
        this.floors = CURRICULUM_FLOORS;
    }

    getFloor(floorNumber) {
        return this.floors[Number(floorNumber)] || null;
    }

    getFloorByTopicId(topicId) {
        for (const key in this.floors) {
            if (this.floors[key].id === topicId) {
                return this.floors[key];
            }
        }
        return null;
    }

    /**
     * Verifica se os pré-requisitos de um tópico estão desbloqueados
     * @param {string|number} topicOrFloor 
     * @param {Array<string>} completedTopics 
     */
    isUnlocked(topicOrFloor, completedTopics = []) {
        let topicData = typeof topicOrFloor === 'number' 
            ? this.getFloor(topicOrFloor) 
            : (this.getFloorByTopicId(topicOrFloor) || this.getFloor(topicOrFloor));
        
        if (!topicData) return false;
        if (!topicData.prerequisites || topicData.prerequisites.length === 0) return true;

        const set = new Set(completedTopics);
        return topicData.prerequisites.every(pre => set.has(pre));
    }

    /**
     * Retorna todos os conceitos permitidos até determinado andar/tópicos desbloqueados
     */
    getAllowedConcepts(completedTopics = []) {
        const set = new Set(completedTopics);
        const concepts = [];
        for (const floorKey in this.floors) {
            const f = this.floors[floorKey];
            if (f.prerequisites.length === 0 || f.prerequisites.every(p => set.has(p))) {
                concepts.push(...f.concepts);
            }
        }
        return Array.from(new Set(concepts));
    }
}

if (typeof module !== 'undefined') {
    module.exports = {
        CURRICULUM_FLOORS,
        CurriculumGraph
    };
}
if (typeof window !== 'undefined') {
    window.CURRICULUM_FLOORS = CURRICULUM_FLOORS;
    window.CurriculumGraph = CurriculumGraph;
}
