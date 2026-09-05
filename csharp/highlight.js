/* ═══════════════════════════════════════════════════
   C# Syntax Highlighting — VS Code Dark+ Theme
   All HTML-producing steps use placeholders to avoid
   keyword regex corrupting span tags.
   ═══════════════════════════════════════════════════ */
(function() {
    'use strict';

    var KW = new Set([
        'abstract','as','base','bool','break','byte','case','catch','char',
        'checked','class','const','continue','decimal','default','delegate',
        'do','double','else','enum','event','explicit','extern','false',
        'finally','fixed','float','for','foreach','goto','if','implicit',
        'in','int','interface','internal','is','lock','long','namespace',
        'new','null','object','operator','out','override','params','private',
        'protected','public','readonly','ref','return','sbyte','sealed',
        'short','sizeof','stackalloc','static','string','struct','switch',
        'this','throw','true','try','typeof','uint','ulong','unchecked',
        'unsafe','ushort','using','var','virtual','void','volatile','while',
        'yield','async','await','when','where','select','from','group',
        'orderby','join','let','into','ascending','descending','on','equals',
        'get','set','add','remove','value','init','record','with'
    ]);

    var TYPES = new Set([
        'MonoBehaviour','GameObject','Transform','Vector2','Vector3','Quaternion',
        'Color','Ray','RaycastHit','Collider','Collision','Rigidbody','Camera',
        'Input','Time','Debug','Mathf','Physics','Application','Screen',
        'Renderer','Material','AudioSource','AudioClip','Light','Terrain',
        'Animator','Animation','Canvas','Image','Text','Button','Slider',
        'NavMeshAgent','CharacterController','CanvasGroup',
        'CinemachineCamera','CinemachineBrain','InputAction','InputActionMap',
        'InputActionCallbackContext','Keyboard','Mouse','Key','Touch',
        'SerializeField','Header','RequireComponent','HideInInspector',
        'List','Dictionary','Array','Queue','Stack','HashSet',
        'IEnumerator','Coroutine','WaitForSeconds','WaitForEndOfFrame',
        'ForceMode','RigidbodyConstraints','RigidbodyInterpolation',
        'LightType','LightShadows','AudioRolloffMode','CursorLockMode',
        'LayerMask','Plane','ContactPoint','Bounds','Rect','Matrix4x4',
        'System','Collections','Generic','TextMeshPro',
        'TMP_Text','TextMeshProUGUI','Mesh','MeshFilter','MeshRenderer',
        'BoxCollider','SphereCollider','CapsuleCollider',
        'Object','ScriptableObject','AssetDatabase',
        'UniversalRenderPipelineAsset','GraphicsSettings','TerrainData',
        'ParticleSystem','CinemachineImpulseSource',
        'Gizmos','Handles','KeyCode'
    ]);

    window.highlightCSharp = highlightCSharp;
    function highlightCSharp(code) {
        var ph = [];
        var PH = '\x00PH';

        function protect(text) {
            var i = ph.length;
            ph.push(text);
            return PH + i + '\x00';
        }

        // 1. Decode pre-escaped HTML entities back to real characters
        var s = code
            .replace(/&gt;/g, '>')
            .replace(/&lt;/g, '<')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"');

        // 2. Protect comments (raw text, safe to wrap)
        s = s.replace(/(\/\/.*$)/gm, function(m) {
            return protect('<span class="hljs-comment">' + m + '</span>');
        });
        s = s.replace(/(\/\*[\s\S]*?\*\/)/g, function(m) {
            return protect('<span class="hljs-comment">' + m + '</span>');
        });

        // 3. Protect strings
        s = s.replace(/(@"[^"]*"|"(?:[^"\\]|\\.)*")/g, function(m) {
            return protect('<span class="hljs-string">' + m + '</span>');
        });

        // 4. Escape remaining HTML
        s = s.replace(/&/g, '&amp;')
             .replace(/</g, '&lt;')
             .replace(/>/g, '&gt;');

        // 5. Protect attributes [...] — keywords inside must NOT be highlighted
        s = s.replace(/(\[)([^\]]*?)(\])/g, function(m, o, inner, c) {
            return protect(
                '<span class="hljs-punctuation">' + o + '</span>' +
                '<span class="hljs-attribute">' + inner + '</span>' +
                '<span class="hljs-punctuation">' + c + '</span>'
            );
        });

        // 6. Protect numbers
        s = s.replace(/\b(\d+\.?\d*[fFdDmM]?)\b/g, function(m) {
            return protect('<span class="hljs-number">' + m + '</span>');
        });

        // 7. Keywords, types, constants — only match plain identifiers
        s = s.replace(/\b([a-zA-Z_]\w*)\b/g, function(m, w) {
            if (KW.has(w))  return '<span class="hljs-keyword">' + w + '</span>';
            if (TYPES.has(w)) return '<span class="hljs-type">' + w + '</span>';
            if (w === 'true' || w === 'false' || w === 'null')
                return '<span class="hljs-constant">' + w + '</span>';
            return m;
        });

        // 8. Restore ALL protected content
        s = s.replace(/\x00PH(\d+)\x00/g, function(_, i) {
            return ph[parseInt(i)];
        });

        return s;
    }

    document.querySelectorAll('pre code').forEach(function(block) {
        if (block.querySelector('.hljs-keyword')) return;
        var raw = block.textContent;
        block.innerHTML = highlightCSharp(raw);
    });
})();
