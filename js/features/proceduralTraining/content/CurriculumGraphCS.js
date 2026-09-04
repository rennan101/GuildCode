/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — PROCEDURAL TRAINING SYSTEM (PTS)
   CurriculumGraphCS: Grafo Curricular dos 9 Módulos em C# e Unity 6.5
   Mapeado a partir de c#/subjects.md
   ═══════════════════════════════════════════════════════════════ */

const CSHARP_CURRICULUM_FLOORS = {
    0: {
        id: 'cs_fundamentos_variaveis',
        floor: 0,
        name: 'Fundamentos de C# & Tipos Primitivos',
        concepts: [
            'int',
            'float',
            'string',
            'bool',
            'char',
            'debug_log',
            'declaracao',
            'inicializacao',
            'operadores_aritmeticos',
            'soma',
            'subtracao',
            'multiplicacao',
            'divisao'
        ],
        prerequisites: [],
        difficultyRange: ['easy', 'medium']
    },
    1: {
        id: 'cs_controle_loops_poo',
        floor: 1,
        name: 'Controle de Fluxo, Loops & POO Básica',
        concepts: [
            'if',
            'else',
            'switch',
            'for',
            'while',
            'foreach',
            'funcoes_metodos',
            'classes_csharp',
            'construtores',
            'propriedades',
            'list_generics'
        ],
        prerequisites: ['cs_fundamentos_variaveis'],
        difficultyRange: ['easy', 'medium', 'hard']
    },
    2: {
        id: 'cs_unity_gameobjects_lifecycle',
        floor: 2,
        name: 'GameObjects, Transform & Ciclo de Vida',
        concepts: [
            'monobehaviour',
            'awake',
            'start',
            'update',
            'fixed_update',
            'late_update',
            'transform_position',
            'transform_translate',
            'time_deltatime',
            'get_component'
        ],
        prerequisites: ['cs_controle_loops_poo'],
        difficultyRange: ['easy', 'medium', 'hard']
    },
    3: {
        id: 'cs_input_system_moderno',
        floor: 3,
        name: 'Input System Moderno & Actions',
        concepts: [
            'keyboard_current',
            'mouse_current',
            'was_pressed_this_frame',
            'is_pressed',
            'input_action',
            'read_value_vector2'
        ],
        prerequisites: ['cs_unity_gameobjects_lifecycle'],
        difficultyRange: ['easy', 'medium', 'hard']
    },
    4: {
        id: 'cs_matematica_3d_vetores',
        floor: 4,
        name: 'Matemática 3D, Vetores & Raycast',
        concepts: [
            'vector3',
            'vector3_distance',
            'vector3_normalized',
            'vector3_dot',
            'vector3_cross',
            'physics_raycast',
            'raycast_hit',
            'layer_mask'
        ],
        prerequisites: ['cs_unity_gameobjects_lifecycle'],
        difficultyRange: ['medium', 'hard']
    },
    5: {
        id: 'cs_fisica_rigidbody_colisoes',
        floor: 5,
        name: 'Física 3D, Rigidbody & Colisões',
        concepts: [
            'rigidbody',
            'add_force',
            'force_mode_impulse',
            'linear_velocity',
            'on_collision_enter',
            'on_trigger_enter',
            'compare_tag',
            'destroy_gameobject'
        ],
        prerequisites: ['cs_matematica_3d_vetores'],
        difficultyRange: ['medium', 'hard']
    },
    6: {
        id: 'cs_cameras_cinemachine_mundo3d',
        floor: 6,
        name: 'Cinemachine, Iluminação & Câmeras',
        concepts: [
            'cinemachine_virtual_camera',
            'camera_follow',
            'camera_look_at',
            'late_update_camera',
            'mesh_renderer',
            'lightmapping'
        ],
        prerequisites: ['cs_fisica_rigidbody_colisoes'],
        difficultyRange: ['medium', 'hard']
    },
    7: {
        id: 'cs_ui_audio_navmesh',
        floor: 7,
        name: 'UI Canvas, TextMeshPro, Audio & NavMesh',
        concepts: [
            'canvas',
            'text_mesh_pro',
            'particle_system',
            'audio_source',
            'audio_listener',
            'navmesh_agent',
            'set_destination'
        ],
        prerequisites: ['cs_cameras_cinemachine_mundo3d'],
        difficultyRange: ['medium', 'hard']
    },
    8: {
        id: 'cs_avancado_coroutines_pooling',
        floor: 8,
        name: 'Coroutines, ScriptableObjects & Object Pooling',
        concepts: [
            'ienumerator',
            'wait_for_seconds',
            'start_coroutine',
            'scriptable_object',
            'create_asset_menu',
            'object_pooling_queue',
            'system_action_events',
            'try_catch'
        ],
        prerequisites: ['cs_ui_audio_navmesh'],
        difficultyRange: ['hard', 'expert']
    }
};

class CurriculumGraphCS {
    constructor(floors = CSHARP_CURRICULUM_FLOORS) {
        this.floors = floors;
    }

    getFloor(floorNumber) {
        return this.floors[floorNumber] || null;
    }

    getFloorByTopicId(topicId) {
        for (const key in this.floors) {
            if (this.floors[key].id === topicId) return this.floors[key];
        }
        return null;
    }

    isUnlocked(topicOrFloor, completedTopics = []) {
        let topicData = typeof topicOrFloor === 'number' 
            ? this.getFloor(topicOrFloor) 
            : (this.getFloorByTopicId(topicOrFloor) || this.getFloor(topicOrFloor));
        
        if (!topicData) return false;
        if (!topicData.prerequisites || topicData.prerequisites.length === 0) return true;

        const set = new Set(completedTopics);
        return topicData.prerequisites.every(pre => set.has(pre));
    }

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
        CSHARP_CURRICULUM_FLOORS,
        CurriculumGraphCS
    };
}
if (typeof window !== 'undefined') {
    window.CSHARP_CURRICULUM_FLOORS = CSHARP_CURRICULUM_FLOORS;
    window.CurriculumGraphCS = CurriculumGraphCS;
}
