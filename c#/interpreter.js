/**
 * ═══════════════════════════════════════════════════════
 *  C# Interpreter — Unity Challenge Engine
 *  Parses and executes simplified C# code, producing
 *  Unity-style Console output, warnings, and errors.
 * ═══════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  function CSharpInterpreter() {
    this.output = [];
    this.warnings = [];
    this.errors = [];
  }

  if (typeof window !== 'undefined') {
    window.CSharpInterpreter = CSharpInterpreter;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CSharpInterpreter;
  }

  // ── Main execute method ──
  CSharpInterpreter.prototype.execute = function (code) {
    this.output = [];
    this.warnings = [];
    this.errors = [];

    try {
      var preprocessed = this._preprocess(code);
      this._preAnalyze(preprocessed);
      var jsCode = this._transpile(preprocessed);
      this._run(jsCode);
    } catch (e) {
      if (e && e.__csError) {
        this.errors.push({ message: e.message, line: e.line || 0 });
      } else if (e && e.__csWarning) {
        this.warnings.push({ message: e.message, line: e.line || 0 });
      } else {
        this.errors.push({ message: 'Erro inesperado: ' + (e.message || e), line: 0 });
      }
    }

    return {
      output: this.output,
      warnings: this.warnings,
      errors: this.errors
    };
  };

  // ── Helpers ──
  function csError(msg, line) {
    var e = new Error(msg);
    e.__csError = true;
    e.line = line || 0;
    throw e;
  }
  function csWarning(msg, line) {
    var e = new Error(msg);
    e.__csWarning = true;
    e.line = line || 0;
    throw e;
  }

  // ── Preprocessing: strip class/namespace boilerplate ──
  CSharpInterpreter.prototype._preprocess = function (code) {
    var s = code;

    // Remove using statements
    s = s.replace(/using\s+[\w.]+\s*;/g, '');
    // Remove namespace blocks
    s = s.replace(/namespace\s+[\w.]+\s*\{?/g, '');
    // Remove class declarations (keep body)
    s = s.replace(/(?:public|private|protected|internal)?\s*(?:partial\s+)?class\s+\w+\s*(?::\s*\w+\s*)?\{?/g, '');
    // Remove attributes [SerializeField] [Header(...)] [RequireComponent(...)]
    s = s.replace(/^\s*\[[^\]]+\]\s*/gm, '');
    // Remove access modifiers on methods/fields
    s = s.replace(/(?:public|private|protected|internal)\s+/g, '');
    // Remove static, virtual, override, abstract, readonly on fields
    s = s.replace(/(?:static|virtual|override|abstract|readonly|async|volatile)\s+/g, '');
    // Remove MonoBehaviour inheritance pattern
    s = s.replace(/:\s*MonoBehaviour/g, '');
    // Move class-level fields to beginning (only before first function)
    var lines = s.split('\n');
    var classFields = [];
    var firstFuncIdx = -1;
    for (var fi = 0; fi < lines.length; fi++) {
      var fl = lines[fi].trim();
      if (/^\s*function\s+/.test(fl) && firstFuncIdx === -1) {
        firstFuncIdx = fi;
      }
    }
    // Only extract fields before the first function
    if (firstFuncIdx > 0) {
      for (var fi = 0; fi < firstFuncIdx; fi++) {
        var fl = lines[fi].trim();
        if (/^(?:public|private|protected)?\s*(?:int|float|double|string|bool|char|var|Rigidbody|Transform|PlayerInput)\s+/.test(fl) && fl.indexOf('(') === -1 && fl.indexOf('=') !== -1) {
          classFields.push(lines[fi]);
          lines[fi] = '';
        }
      }
    }
    if (classFields.length > 0) {
      lines.unshift(classFields.join('\n'));
    }
    s = lines.join('\n');
    // Remove class closing brace (last } in the file)
    s = s.replace(/\}\s*$/, '');

    // Keep Debug.Log, Mathf.Log, etc. as-is (we'll transpile them)
    // Handle void/int/float/string return types on methods
    s = s.replace(/(?:void|int|float|double|string|bool|char|IEnumerator|Coroutine|GameObject|Transform|Vector3|Rigidbody|Animator)\s+(\w+)\s*\(/g, 'function $1(');
    // Handle IEnumerator coroutines
    s = s.replace(/IEnumerator\s+/g, 'function ');

    return s;
  };

  // ── Pre-analysis: detect common errors before execution ──
  CSharpInterpreter.prototype._preAnalyze = function (code) {
    var lines = code.split('\n');

    for (var i = 0; i < lines.length; i++) {
      var rawLine = lines[i];
      var line = rawLine.trim();
      var lineNum = i + 1;

      // Skip empty and comment lines
      if (!line || line.startsWith('//') || line.startsWith('/*')) continue;

      // Check for = vs == in conditions
      if (/if\s*\([^)]*[^=!<>]=[^=]/.test(line)) {
        var conditionMatch = line.match(/if\s*\((.+)\)/);
        if (conditionMatch) {
          var inner = conditionMatch[1];
          if (/[^!<>=+\-*/&|^~]=[^=]/.test(inner.replace(/"[^"]*"/g, ''))) {
            var assignInIf = line.match(/\bif\s*\(\s*([a-zA-Z_]\w*)\s*=\s*([^=][^)]*)\)/);
            var badSnippet = assignInIf ? assignInIf[0] : line;
            var goodSnippet = assignInIf ? ('if (' + assignInIf[1] + ' == ' + assignInIf[2].trim() + ')') : line.replace(/=/, '==');
            this.warnings.push({
              type: 'warning',
              line: lineNum,
              title: 'Atribuição Involuntária em Condicional (C#)',
              msg: 'Você usou \'=\' (atribuição) dentro do if. Em C#, para testar igualdade use \'==\'.',
              fix: { bad: badSnippet, good: goodSnippet }
            });
          }
        }
      }

      // Check for missing semicolons on statements
      if (line.length > 0 && !line.endsWith('{') && !line.endsWith('}') && !line.endsWith(';') && !line.endsWith(':') &&
          !line.startsWith('//') && !line.startsWith('/*') && !line.startsWith('*') &&
          !line.startsWith('using') && !line.startsWith('namespace') && !line.startsWith('class') &&
          !line.startsWith('public class') && !line.startsWith('private class') &&
          !line.startsWith('if') && !line.startsWith('else') && !line.startsWith('for') &&
          !line.startsWith('while') && !line.startsWith('switch') && !line.startsWith('case') &&
          !line.startsWith('default') && !line.startsWith('[') && !/^\s*\[/.test(line)) {
        
        // Detect statement patterns that require semicolon
        if (/^\w+\s+\w+\s*=/.test(line) || /Debug\.Log/.test(line) || /Mathf\.\w+/.test(line) ||
            /transform\.\w+/.test(line) || /gameObject\.\w+/.test(line) ||
            /\+\+/.test(line) || /--/.test(line) || /^return\b/.test(line)) {
          this.errors.push({
            type: 'error',
            line: lineNum,
            title: 'CS1002: Ponto e vírgula ausente',
            msg: 'Instrução em C# deve terminar com ponto e vírgula (;).',
            fix: { bad: rawLine, good: rawLine + ';' }
          });
        }
      }

      // Check for int division that loses precision
      if (/\d+\s*\/\s*\d+[^f.]/.test(line) && !/float|double/.test(line)) {
        var divMatch = line.match(/(\d+)\s*\/\s*(\d+)/);
        if (divMatch && parseInt(divMatch[1], 10) % parseInt(divMatch[2], 10) !== 0) {
          this.warnings.push({
            type: 'warning',
            line: lineNum,
            title: 'Divisão Inteira com Perda Decimal',
            msg: 'Divisão entre inteiros (' + divMatch[1] + ' / ' + divMatch[2] + ') descarta a parte decimal. Use sufixo \'f\' (ex: ' + divMatch[1] + 'f / ' + divMatch[2] + 'f) para divisão de ponto flutuante.',
            fix: { bad: divMatch[0], good: divMatch[1] + 'f / ' + divMatch[2] + 'f' }
          });
        }
      }
    }
  };

  // ── Transpiler: convert simplified C# to JavaScript ──
  CSharpInterpreter.prototype._transpile = function (code) {
    var s = code;
    var lines = s.split('\n');
    var jsLines = [];
    var indent = 0;

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var trimmed = line.trim();

      // Skip empty lines
      if (!trimmed) { jsLines.push(''); continue; }

      // Skip comments
      if (trimmed.startsWith('//')) { jsLines.push('// ' + trimmed.slice(2)); continue; }

      // Function declarations: pass through as-is (JS functions work like C# methods)
      if (/^\s*function\s+/.test(trimmed)) {
        // Strip type keywords from parameters: (float x, int y) → (x, y)
        trimmed = trimmed.replace(/(function\s+\w+\s*\()([^)]*)(\))/g, function(m, open, params, close) {
          return open + params.replace(/\b(?:int|float|double|string|bool|char|var|void|public|private|protected|Vector3|Vector2|Transform|GameObject)\s+/g, '') + close;
        });
        jsLines.push('  '.repeat(indent) + trimmed);
        continue;
      }

      // Pass through braces that belong to function/class bodies
      if (trimmed === '{') {
        jsLines.push('  '.repeat(indent) + '{');
        indent++;
        continue;
      }
      if (trimmed === '}') {
        indent = Math.max(0, indent - 1);
        jsLines.push('  '.repeat(indent) + '}');
        continue;
      }

      // Pass through return statements inside functions
      if (/^return\b/.test(trimmed)) {
        jsLines.push('  '.repeat(indent) + trimmed);
        continue;
      }

      // Variable declarations: int x = 5; Vector3 p = ...; → var x = 5; (standalone line)
      trimmed = trimmed.replace(/^(?!function\b)(?:int|float|double|string|bool|char|var|long|byte|short|decimal|Vector3|Vector2|Quaternion|GameObject|Transform|Rigidbody|Collider)\s+(\w+)\s*(?:=\s*(.+?))?\s*;?\s*$/, function (m, name, val) {
        return 'var ' + name + (val ? ' = ' + val : '') + ';';
      });

      // Variable declarations inside for-loop headers: for (int i = 0; ...) → for (var i = 0; ...)
      trimmed = trimmed.replace(/(for\s*\([^;]*?)(?:int|float|double|string|bool|char)\s+(\w+)\s*=\s*/g, '$1var $2 = ');
      // Strip type keywords from function parameters: (float x, int y) → (x, y)
      trimmed = trimmed.replace(/(function\s+\w+\s*\()([^)]*)(\))/g, function(m, open, params, close) {
        params = params.replace(/\b(?:int|float|double|string|bool|char|var|Vector3|Vector2|Quaternion|GameObject|Transform|Rigidbody|Collider)\s+/g, '');
        return open + params + close;
      });

      // Integer division: a / b → __csDiv(a, b) when both look like identifiers
      trimmed = trimmed.replace(/(\b\w+)\s*\/\s*(\b\w+)/g, function(m, a, b, offset) {
        if (a === 'function' || b === 'function' || a === 'var' || b === 'var') return m;
        var before = trimmed.substring(0, offset);
        var q = 0; for (var qi = 0; qi < before.length; qi++) { if (before[qi] === '"' && (qi === 0 || before[qi-1] !== '\\')) q++; }
        if (q % 2 === 1) return m;
        if (/^[a-zA-Z_]\w*$/.test(a) && /^[a-zA-Z_]\w*$/.test(b)) {
          return '__csDiv(' + a + ', ' + b + ')';
        }
        return m;
      });

      // const declarations
      trimmed = trimmed.replace(/^const\s+(?:int|float|double|string|bool|char)\s+(\w+)\s*=\s*(.+?)\s*;?\s*$/, 'var $1 = $2;');

      // Debug.Log → __csLog
      trimmed = trimmed.replace(/Debug\.Log\s*\(/g, '__csLog(');
      trimmed = trimmed.replace(/Debug\.LogWarning\s*\(/g, '__csWarn(');
      trimmed = trimmed.replace(/Debug\.LogError\s*\(/g, '__csError(');

      // Console.WriteLine → __csLog
      trimmed = trimmed.replace(/Console\.WriteLine\s*\(/g, '__csLog(');
      trimmed = trimmed.replace(/Console\.Write\s*\(/g, '__csLog(');

      // Mathf functions
      trimmed = trimmed.replace(/Mathf\.Abs\s*\(/g, 'Math.abs(');
      trimmed = trimmed.replace(/Mathf\.Max\s*\(/g, 'Math.max(');
      trimmed = trimmed.replace(/Mathf\.Min\s*\(/g, 'Math.min(');
      trimmed = trimmed.replace(/Mathf\.Pow\s*\(/g, 'Math.pow(');
      trimmed = trimmed.replace(/Mathf\.Sqrt\s*\(/g, 'Math.sqrt(');
      trimmed = trimmed.replace(/Mathf\.RoundToInt\s*\(/g, 'Math.round(');
      trimmed = trimmed.replace(/Mathf\.Floor\s*\(/g, 'Math.floor(');
      trimmed = trimmed.replace(/Mathf\.Ceil\s*\(/g, 'Math.ceil(');
      trimmed = trimmed.replace(/Mathf\.Clamp\s*\(([^,]+),\s*([^,]+),\s*([^)]+)\)/g, 'Math.min(Math.max($1, $2), $3)');
      trimmed = trimmed.replace(/Mathf\.PI/g, 'Math.PI');
      trimmed = trimmed.replace(/Mathf\.Infinity/g, 'Infinity');
      trimmed = trimmed.replace(/Mathf\.NegativeInfinity/g, '-Infinity');
      trimmed = trimmed.replace(/Mathf\.Log\s*\(/g, 'Math.log(');

      // String methods
      trimmed = trimmed.replace(/\.Length\b/g, '.length');
      trimmed = trimmed.replace(/\.ToLower\s*\(\)/g, '.toLowerCase()');
      trimmed = trimmed.replace(/\.ToUpper\s*\(\)/g, '.toUpperCase()');
      trimmed = trimmed.replace(/\.Trim\s*\(\)/g, '.trim()');
      trimmed = trimmed.replace(/\.Contains\s*\(/g, '.includes(');
      trimmed = trimmed.replace(/\.IndexOf\s*\(/g, '.indexOf(');
      trimmed = trimmed.replace(/\.Substring\s*\((\d+)\)/g, '.slice($1)');
      trimmed = trimmed.replace(/\.Substring\s*\((\d+)\s*,\s*(\d+)\)/g, '.slice($1, $1+$2)');
      trimmed = trimmed.replace(/string\.IsNullOrEmpty\s*\(([^)]+)\)/g, '(!$1 || $1.length === 0)');
      trimmed = trimmed.replace(/string\.IsNullOrWhiteSpace\s*\(([^)]+)\)/g, '(!$1 || $1.trim().length === 0)');

      // int.Parse / float.Parse
      trimmed = trimmed.replace(/int\.Parse\s*\(([^)]+)\)/g, 'parseInt($1, 10)');
      trimmed = trimmed.replace(/float\.Parse\s*\(([^)]+)\)/g, 'parseFloat($1)');
      trimmed = trimmed.replace(/Convert\.ToInt32\s*\(([^)]+)\)/g, 'parseInt($1, 10)');
      trimmed = trimmed.replace(/Convert\.ToSingle\s*\(([^)]+)\)/g, 'parseFloat($1)');

      // Time.time, Time.deltaTime
      trimmed = trimmed.replace(/Time\.time\b/g, '(__csTime)');
      trimmed = trimmed.replace(/Time\.deltaTime\b/g, '0.016');

      // Boolean conversions
      trimmed = trimmed.replace(/\.ToString\s*\(\)/g, '.toString()');

      // List<T> operations
      trimmed = trimmed.replace(/new\s+List<\w+>\s*\(\)/g, '[]');
      trimmed = trimmed.replace(/\.Add\s*\(/g, '.push(');
      trimmed = trimmed.replace(/\.Remove\s*\(/g, '__csRemove(');
      trimmed = trimmed.replace(/\.Count\b/g, '.length');

      // Array initialization: string[] x = { ... } or new string[] { ... } → var x = [...]
      trimmed = trimmed.replace(/^(?:int|float|string|bool|double|char)\[\]\s+(\w+)\s*=\s*new\s+(?:int|float|string|bool|double|char)\[\]\s*\{([^}]*)\}\s*;?\s*$/, function(m, name, items) {
        return 'var ' + name + ' = [' + items.trim() + '];';
      });
      trimmed = trimmed.replace(/^(?:int|float|string|bool|double|char)\[\]\s+(\w+)\s*=\s*\{([^}]*)\}\s*;?\s*$/, function(m, name, items) {
        return 'var ' + name + ' = [' + items.trim() + '];';
      });
      // Array with new size: string[] x = new string[N]; → var x = new Array(N)
      trimmed = trimmed.replace(/^(?:int|float|string|bool|double|char)\[\]\s+(\w+)\s*=\s*new\s+(?:int|float|string|bool|double|char)\[(\d+)\]\s*;?\s*$/, function(m, name, size) {
        return 'var ' + name + ' = new Array(' + size + ');';
      });

      // Array
      trimmed = trimmed.replace(/new\s+(?:int|string|float|bool|double)\[(\d+)\]/g, 'new Array($1)');
      trimmed = trimmed.replace(/\.Length\b/g, '.length');

      // Vector3 basics & static methods
      trimmed = trimmed.replace(/Vector3\.Distance\s*\(([^,]+),\s*([^)]+)\)/g, '__csVector3Dist($1, $2)');
      trimmed = trimmed.replace(/Vector3\.Dot\s*\(([^,]+),\s*([^)]+)\)/g, '__csVector3Dot($1, $2)');
      trimmed = trimmed.replace(/Vector3\.Cross\s*\(([^,]+),\s*([^)]+)\)/g, '__csVector3Cross($1, $2)');
      trimmed = trimmed.replace(/Vector3\.Normalize\s*\(([^)]+)\)/g, '__csVector3Normalize($1)');
      trimmed = trimmed.replace(/Vector3\.zero/g, '{x:0,y:0,z:0}');
      trimmed = trimmed.replace(/Vector3\.one/g, '{x:1,y:1,z:1}');
      trimmed = trimmed.replace(/Vector3\.up/g, '{x:0,y:1,z:0}');
      trimmed = trimmed.replace(/Vector3\.forward/g, '{x:0,y:0,z:1}');
      trimmed = trimmed.replace(/Vector3\.right/g, '{x:1,y:0,z:0}');
      trimmed = trimmed.replace(/Vector3\.left/g, '{x:-1,y:0,z:0}');
      trimmed = trimmed.replace(/new\s+Vector3\s*\(\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^)]+)\s*\)/g, '{x:$1,y:$2,z:$3}');
      trimmed = trimmed.replace(/new\s+Vector3\s*\(\s*([^,]+)\s*,\s*([^)]+)\s*\)/g, '{x:$1,y:$2,z:0}');
      trimmed = trimmed.replace(/new\s+Vector3\s*\(\s*\)/g, '{x:0,y:0,z:0}');

      // Quaternion
      trimmed = trimmed.replace(/Quaternion\.identity/g, '{x:0,y:0,z:0,w:1}');

      // Color
      trimmed = trimmed.replace(/Color\.red/g, '{r:1,g:0,b:0,a:1}');
      trimmed = trimmed.replace(/Color\.white/g, '{r:1,g:1,b:1,a:1}');
      trimmed = trimmed.replace(/Color\.black/g, '{r:0,g:0,b:0,a:1}');

      // string interpolation: $"text {expr} text" → `text ${expr} text`
      trimmed = trimmed.replace(/\$\"([^\"]*)\"/g, function(m, inner) {
        return '`' + inner.replace(/\{([^}]+)\}/g, '${$1}') + '`';
      });

      // Remove 'f' suffix from floats (JS doesn't need it)
      trimmed = trimmed.replace(/(\d+\.\d+)f/g, '$1');  // 5.5f → 5.5
      trimmed = trimmed.replace(/(\d+)f\b/g, '$1.0');  // 10f → 10.0

      // Remove 'm' suffix from decimals
      trimmed = trimmed.replace(/(\d+\.?\d*)m\b/g, '$1');

      // int/float cast
      trimmed = trimmed.replace(/\(int\)\s*(\w+)/g, 'parseInt($1, 10)');
      trimmed = trimmed.replace(/\(float\)\s*(\w+)/g, 'parseFloat($1)');
      trimmed = trimmed.replace(/\(string\)\s*(\w+)/g, 'String($1)');
      trimmed = trimmed.replace(/\(bool\)\s*(\w+)/g, '!!($1)');
      trimmed = trimmed.replace(/\(double\)\s*(\w+)/g, 'parseFloat($1)');

      // Remove 'f' in expressions like 5.5f
      trimmed = trimmed.replace(/(\d+\.\d+)f/g, '$1');

      jsLines.push('  '.repeat(indent) + trimmed);
    }

    // Wrap with runtime support
    var preamble = [
      // Unity mock objects
      'var gameObject = { name: "Jogador", tag: "Untagged", GetComponent: function(t) { return {}; } };',
      'var transform = { position: {x:0,y:0,z:0,toString:function(){return "(0, 0, 0)"}}, eulerAngles: {x:0,y:0,z:0,toString:function(){return "(0, 0, 0)"},get y(){return 0}}, localScale: {x:1,y:1,z:1,toString:function(){return "(1, 1, 1)"}}, forward: {x:0,y:0,z:1}, Translate: function(v){}, Rotate: function(v){}, LookAt: function(t){} };',
      'var Cursor = { lockState: 0, LockMode: { Locked: 0 } };',
      'var __csOutput = [];',
      'var __csWarnings = [];',
      'var __csErrors = [];',
      'var __csTime = 0;',
      'function __csLog(msg) { var s = String(msg).replace(/\\btrue\\b/g, "True").replace(/\\bfalse\\b/g, "False"); __csOutput.push(s); }',
      'function __csWarn(msg) { __csWarnings.push(String(msg)); }',
      'function __csError(msg) { __csErrors.push(String(msg)); }',
      'function __csRemove(arr, val) { var idx = arr.indexOf(val); if (idx > -1) arr.splice(idx, 1); }',
      'function __csDiv(a, b) { if (b === 0) return "DivideByZero"; if (Number.isInteger(a) && Number.isInteger(b)) return Math.trunc(a / b); return a / b; }',
      'function __csVector3Length(v) { return Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z); }',
      'function __csVector3Dist(a, b) { var dx=a.x-b.x, dy=a.y-b.y, dz=a.z-b.z; return Math.sqrt(dx*dx+dy*dy+dz*dz); }',
      'function __csVector3Dot(a, b) { return a.x*b.x + a.y*b.y + a.z*b.z; }',
      'function __csVector3Cross(a, b) { return {x:a.y*b.z-a.z*b.y, y:a.z*b.x-a.x*b.z, z:a.x*b.y-a.y*b.x}; }',
      'function __csVector3Normalize(v) { var l=Math.sqrt(v.x*v.x+v.y*v.y+v.z*v.z); if(l===0)return{x:0,y:0,z:0}; return{x:v.x/l,y:v.y/l,z:v.z/l}; }',
      'function __csLerp(a, b, t) { return a + (b - a) * t; }',
    ];

    // Auto-call Unity lifecycle methods that were defined
    var lifecycleMethods = ['Awake', 'OnEnable', 'Start', 'FixedUpdate', 'Update', 'LateUpdate',
                           'OnCollisionEnter', 'OnTriggerEnter', 'OnCollisionExit', 'OnTriggerExit'];
    var calls = [];
    for (var li = 0; li < lifecycleMethods.length; li++) {
      var methodName = lifecycleMethods[li];
      if (jsLines.join('\n').indexOf('function ' + methodName + '(') !== -1) {
        calls.push('  ' + methodName + '();');
      }
    }

    var postamble = [
      calls.join('\n'),
      'return { output: __csOutput, warnings: __csWarnings, errors: __csErrors };'
    ];

    return preamble.join('\n') + '\n' + jsLines.join('\n') + '\n' + postamble.join('\n');
  };

  // ── Run transpiled JS in sandbox ──
  CSharpInterpreter.prototype._run = function (jsCode) {
    try {
      var fn = new Function(jsCode);
      var result = fn();

      if (result) {
        this.output = result.output || [];
        this.warnings = this.warnings.concat(result.warnings || []);
        this.errors = this.errors.concat(result.errors || []);
      }
    } catch (e) {
      var msg = e.message || String(e);

      // Convert JS errors to C#-style errors with Diagnostic Card formatting
      if (msg.indexOf('is not defined') !== -1) {
        var varName = msg.split(' ')[0];
        this.errors.push({
          type: 'error',
          line: 0,
          title: 'CS0103: Identificador não Encontrado',
          msg: 'O nome \'' + varName + '\' não existe no contexto atual. Você declarou e inicializou esta variável?',
          fix: null
        });
      } else if (msg.indexOf('Cannot read propert') !== -1) {
        this.errors.push({
          type: 'error',
          line: 0,
          title: 'NullReferenceException: Referência Nula',
          msg: 'A referência do objeto não está definida. Verifique se o GameObject ou Componente foi instanciado.',
          fix: null
        });
      } else if (msg.indexOf('Assignment to constant') !== -1) {
        this.errors.push({
          type: 'error',
          line: 0,
          title: 'CS0131: Atribuição Inválida',
          msg: 'A expressão à esquerda deve ser uma variável mutável. Não é possível alterar uma constante.',
          fix: null
        });
      } else if (msg.indexOf('Unexpected token') !== -1) {
        this.errors.push({
          type: 'error',
          line: 0,
          title: 'CS1002: Erro de Sintaxe em C#',
          msg: 'Sintaxe inesperada ou ponto e vírgula ausente no script Unity: ' + msg,
          fix: null
        });
      } else if (msg.indexOf('Unexpected end of input') !== -1) {
        this.errors.push({
          type: 'error',
          line: 0,
          title: 'CS1002: Fim Inesperado do Script',
          msg: 'Fechamento de chaves {} ou parênteses () ausente no final do arquivo.',
          fix: null
        });
      } else {
        this.errors.push({
          type: 'error',
          line: 0,
          title: 'Erro de Execução Unity C#',
          msg: msg,
          fix: null
        });
      }
    }
  };

  // ── Static method: validate code (returns errors/warnings without executing) ──
  CSharpInterpreter.validate = function (code) {
    var interp = new CSharpInterpreter();
    interp._preAnalyze(code);
    return {
      warnings: interp.warnings,
      errors: interp.errors
    };
  };

  // ── Static method: get test cases for a challenge ──
  CSharpInterpreter.runTests = function (code, testCases) {
    var results = [];

    for (var i = 0; i < testCases.length; i++) {
      var tc = testCases[i];
      var interp = new CSharpInterpreter();
      var fullCode = tc.prepend ? tc.prepend + '\n' + code : code;

      // Replace input values
      if (tc.vars) {
        for (var key in tc.vars) {
          var re = new RegExp('((?:var|int|float|double|string|bool|char)\\s+' + key + '\\s*=\\s*)([^;]+)');
          fullCode = fullCode.replace(re, '$1' + JSON.stringify(tc.vars[key]));
        }
      }

      var result = interp.execute(fullCode);
      var pass = true;

      if (tc.expectedOutput) {
        var expected = Array.isArray(tc.expectedOutput) ? tc.expectedOutput : [tc.expectedOutput];
        var actual = result.output;

        for (var j = 0; j < expected.length; j++) {
          if (actual[j] !== expected[j]) {
            pass = false;
            break;
          }
        }
        if (actual.length !== expected.length) pass = false;
      }

      if (tc.expectedErrors !== undefined) {
        var expectedErr = Array.isArray(tc.expectedErrors) ? tc.expectedErrors : [tc.expectedErrors];
        if (result.errors.length === 0 && expectedErr.length > 0) pass = false;
      }

      if (tc.expectedWarnings !== undefined) {
        if (result.warnings.length === 0 && tc.expectedWarnings > 0) pass = false;
      }

      results.push({
        name: tc.name || 'Teste ' + (i + 1),
        pass: pass,
        expected: tc.expectedOutput || null,
        actual: result.output,
        errors: result.errors,
        warnings: result.warnings
      });
    }

    return results;
  };

  CSharpInterpreter.prototype.executeFormatted = function (code) {
    var res = this.execute(code);
    var outputStr = (res.output || []).join('\n');
    var errorsList = (res.errors || []).map(function(e) {
      if (typeof e === 'object' && e !== null) {
        if (!e.msg && e.message) e.msg = e.message;
        return e;
      }
      return { type: 'error', title: 'Erro de Execução', msg: String(e), line: 0 };
    });
    var warningsList = (res.warnings || []).map(function(w) {
      if (typeof w === 'object' && w !== null) {
        if (!w.msg && w.message) w.msg = w.message;
        return w;
      }
      return { type: 'warning', title: 'Aviso Unity C#', msg: String(w), line: 0 };
    });
    return {
      output: outputStr,
      errors: errorsList,
      warnings: warningsList,
      success: errorsList.length === 0
    };
  };

})();
