/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C Interpreter & Execution Engine (Advanced v3)
   Supports:
   - Full arithmetic, bitwise, logic, comparisons, compound assignments
   - Type casting: (float), (int), (double), (char), (long)
   - Ternary operator: cond ? expr1 : expr2
   - Multiple variable declarations with initializers in one line
   - 1D and 2D arrays, string arrays (char[N][M]), struct arrays
   - Pointers (*ptr, &var, ->, pointer arithmetic)
   - Structs (definition, nested fields, assignment, pointers)
   - Control flow: if/else if/else, while, do/while, for, switch/case/default, break, continue, return
   - Functions: recursion, parameters (by value, pointer, array, struct)
   - Standard Library: printf, scanf, puts, putchar, getchar, sprintf, sscanf
   - <string.h>: strlen, strcpy, strncpy, strcat, strncat, strcmp, strncmp, strchr, strstr, memset
   - <math.h>: sqrt, pow, abs, fabs, floor, ceil, round, fmod, sin, cos, tan
   - <stdlib.h>: malloc, free, rand, srand, atoi, atof, atol, exit
   - Simulated File I/O for Cap 15: fopen, fclose, fprintf, fscanf, fgets, fputs, fgetc, fputc, feof, rewind
   ═══════════════════════════════════════════════════════════════ */

class CError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'CError';
    }
}

class CInterpreter {
    constructor() {
        this.reset();
    }

    reset(stdin = '') {
        this.output = [];
        this.errors = [];
        this.globals = {};
        this.functions = {};
        this.structDefs = {};
        this.typedefs = {};
        this.defines = {};
        this.callStack = [];
        this.simFiles = {}; // Virtual filesystem: { [filename]: string[] lines }
        this.fileHandles = [];
        this.stepCount = 0;
        
        // Subclasse Hardcoder Perk: Estrutura Pura (hc_pure_struct) concede 50% mais passos de execução
        let limit = 20000;
        if (typeof app !== 'undefined' && app.engine && typeof authManager !== 'undefined') {
            if (app.engine.hasSkill('hc_pure_struct', authManager.currentUser)) {
                limit = 30000;
            }
        }
        this.maxSteps = limit;
        this.maxRecursion = 250;
        this.stdinTokens = typeof stdin === 'string'
            ? stdin.trim().split(/\s+/).filter(Boolean)
            : (Array.isArray(stdin) ? [...stdin] : []);
        this.stdinIndex = 0;
    }

    // ── Static Diagnostics for Student Guidance ──
    runStaticDiagnostics(code) {
        const diagnostics = [];
        if (!code || !code.trim()) {
            diagnostics.push({
                type: 'error',
                line: 1,
                title: 'Editor Vazio',
                msg: 'O editor está vazio. Escreva seu programa em C antes de compilar ou executar.',
                fix: null
            });
            return diagnostics;
        }

        const lines = code.split('\n');

        // 1. Checa se esqueceu o main
        if (!/int\s+main\s*\(/.test(code) && !/void\s+main\s*\(/.test(code) && !/main\s*\(/.test(code)) {
            diagnostics.push({
                type: 'error',
                line: 1,
                title: 'Função Principal Ausente',
                msg: 'Todo programa em C precisa da função principal de inicialização.',
                fix: {
                    bad: '// seu código',
                    good: '#include <stdio.h>\n\nint main() {\n    // seu código aqui\n    return 0;\n}'
                }
            });
        }

        // 2. Checa parênteses, chaves e colchetes desbalanceados
        let parenBalance = 0;
        let braceBalance = 0;
        let bracketBalance = 0;

        for (let l = 0; l < lines.length; l++) {
            const line = lines[l].replace(/\/\/.*$/, ''); // ignora comentários de linha
            for (let c = 0; c < line.length; c++) {
                const char = line[c];
                if (char === '(') parenBalance++;
                else if (char === ')') parenBalance--;
                else if (char === '{') braceBalance++;
                else if (char === '}') braceBalance--;
                else if (char === '[') bracketBalance++;
                else if (char === ']') bracketBalance--;
            }
        }

        if (parenBalance > 0) {
            diagnostics.push({
                type: 'error',
                title: 'Parênteses Desbalanceados',
                msg: "Você abriu mais parênteses '(' do que fechou ')'. Revise as chamadas de função e expressões matemáticas."
            });
        } else if (parenBalance < 0) {
            diagnostics.push({
                type: 'error',
                title: 'Parêntese a Mais',
                msg: "Há um parêntese de fechamento ')' a mais sem abertura correspondente."
            });
        }

        if (braceBalance > 0) {
            diagnostics.push({
                type: 'error',
                title: 'Chave Aberta',
                msg: "Você abriu um bloco de código com '{' e esqueceu de fechar com '}'."
            });
        } else if (braceBalance < 0) {
            diagnostics.push({
                type: 'error',
                title: 'Chave a Mais',
                msg: "Há uma chave de fechamento '}' a mais sem abertura correspondente."
            });
        }

        if (bracketBalance !== 0) {
            diagnostics.push({
                type: 'error',
                title: 'Colchetes Desbalanceados',
                msg: "Verifique os colchetes '[' e ']' de indexação dos seus vetores ou matrizes."
            });
        }

        // 3. Checa linhas individuais (ponto-e-vírgula, if com atribuição '=', scanf sem &, divisão inteira)
        for (let l = 0; l < lines.length; l++) {
            const rawLine = lines[l].trim();
            const lineNum = l + 1;

            if (!rawLine || rawLine.startsWith('//') || rawLine.startsWith('/*')) continue;

            // 3.1 Armadilha: if (x = 10) em vez de if (x == 10)
            const assignInIf = rawLine.match(/\bif\s*\(\s*([a-zA-Z_]\w*)\s*=\s*([^=][^)]*)\)/);
            if (assignInIf) {
                const v = assignInIf[1];
                const val = assignInIf[2].trim();
                diagnostics.push({
                    type: 'warning',
                    line: lineNum,
                    title: 'Atribuição Involuntária em Condicional',
                    msg: `Você usou '=' (atribuição) dentro do <code>if</code>. Em C, para testar igualdade use '=='.`,
                    fix: {
                        bad: `if (${v} = ${val})`,
                        good: `if (${v} == ${val})`
                    }
                });
            }

            // 3.2 scanf sem '&' para variáveis normais
            const scanfSingle = rawLine.match(/scanf\s*\(\s*["']%[d|f|c|lf]["']\s*,\s*([a-zA-Z_]\w*)\s*\)/);
            if (scanfSingle) {
                const varName = scanfSingle[1];
                if (!varName.startsWith('&')) {
                    diagnostics.push({
                        type: 'error',
                        line: lineNum,
                        title: 'Endereço Ausente no scanf',
                        msg: `O <code>scanf</code> precisa do operador de endereço <code>&</code> para gravar o valor na variável.`,
                        fix: {
                            bad: `scanf("%d", ${varName});`,
                            good: `scanf("%d", &${varName});`
                        }
                    });
                }
            }

            // 3.3 Falta de ponto-e-vírgula ';'
            if (!rawLine.startsWith('#') &&
                !rawLine.endsWith('{') && 
                !rawLine.endsWith('}') && 
                !rawLine.endsWith(':') &&
                !rawLine.startsWith('for') &&
                !rawLine.startsWith('if') &&
                !rawLine.startsWith('while') &&
                !rawLine.startsWith('switch') &&
                !rawLine.startsWith('else') &&
                !rawLine.endsWith('*/')) {
                
                if (/^(int|float|double|char|void|long|short|[a-zA-Z_]\w*(\s*\[[^\]]*\])*)\s+[a-zA-Z_]/.test(rawLine) ||
                    /^(printf|scanf|puts|gets)\s*\(/.test(rawLine) ||
                    /^[a-zA-Z_]\w*(\[[^\]]+\])*\s*(=|\+=|-=|\*=|\/=|%=|\+\+|--)/.test(rawLine) ||
                    /^return\b/.test(rawLine)) {
                    if (!rawLine.endsWith(';') && !rawLine.endsWith('{') && !rawLine.endsWith(',')) {
                        diagnostics.push({
                            type: 'error',
                            line: lineNum,
                            title: 'Falta Ponto-e-Vírgula (;)',
                            msg: `Toda instrução em C deve terminar com ponto-e-vírgula.`,
                            fix: {
                                bad: rawLine,
                                good: rawLine + ';'
                            }
                        });
                        break; // reporta primeiro erro de linha
                    }
                }
            }
        }

        return diagnostics;
    }

    execute(code, stdin = '') {
        this.reset(stdin);
        
        // Roda diagnósticos estáticos amigáveis
        const preErrors = this.runStaticDiagnostics(code);
        if (preErrors.length > 0) {
            this.errors.push(...preErrors);
            return { success: false, output: this.output.join(''), errors: this.errors };
        }

        try {
            const src = this.preprocess(code);
            this.parseTopLevel(src);
            this.callMain();
            return { success: true, output: this.output.join(''), errors: [] };
        } catch (e) {
            let msg = e instanceof CError ? e.message : `Erro de execução em C: ${e.message}`;
            // Formata termos comuns em mensagens claras
            if (msg.includes("Cannot read properties") || msg.includes("undefined")) {
                msg = "Erro de sintaxe: Verifique a declaração de variáveis, parâmetros de funções e ponto-e-vírgula (;).";
            }
            this.errors.push(msg);
            return { success: false, output: this.output.join(''), errors: this.errors };
        }
    }

    // ── Preprocessor ──
    preprocess(code) {
        if (!code) return '';
        // Extract #define NAME VAL
        const defineRegex = /#define\s+([a-zA-Z_]\w*)\s+([^\n\r]+)/g;
        let match;
        while ((match = defineRegex.exec(code)) !== null) {
            this.defines[match[1]] = match[2].trim();
        }

        // Strip comments and #include
        let clean = code
            .replace(/\/\/.*$/gm, '')
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/#include\s*[<"][^>"]+[>"]/g, '')
            .replace(/#define\s+[^\n\r]+/g, '');

        // Apply macros
        for (const [k, v] of Object.entries(this.defines)) {
            const reg = new RegExp(`\\b${k}\\b`, 'g');
            clean = clean.replace(reg, v);
        }

        return clean;
    }

    // ── Top-level parsing ──
    parseTopLevel(src) {
        // Pre-scan all function definitions anywhere in the code
        const allTok = new Tokenizer(src);
        const tokens = allTok.tokens;
        for (let k = 0; k < tokens.length; k++) {
            if (this.isType(tokens[k].value)) {
                let j = k;
                while (j < tokens.length && (this.isType(tokens[j].value) || tokens[j].value === '*')) j++;
                if (j < tokens.length && tokens[j].type === 'IDENT') {
                    j++;
                    if (j < tokens.length && tokens[j].value === '(') {
                        const pGroup = this.extractGroup(tokens, j, '(', ')');
                        let afterP = pGroup.end;
                        if (afterP < tokens.length && tokens[afterP].value === '{') {
                            const bGroup = this.extractGroup(tokens, afterP, '{', '}');
                            const fnTokens = tokens.slice(k, bGroup.end);
                            this.parseFunctionDef(fnTokens);
                        }
                    }
                }
            }
        }

        // Parse structs, typedefs, globals
        const tok = new Tokenizer(src);
        while (tok.hasMore() && tok.peek().type !== 'EOF') {
            this.parseTopLevelItem(tok);
        }
    }

    parseTopLevelItem(tok) {
        const first = tok.peek();
        if (first.type === 'EOF') return;

        // Skip standalone semicolons
        if (first.value === ';') { tok.next(); return; }

        // Collect all tokens for this top-level item
        let tokens = this.collectStatement(tok);
        if (tokens.length === 0) return;

        // Typedef
        if (tokens[0].value === 'typedef') {
            this.parseTypedef(tokens);
            return;
        }

        // Struct definition
        if (tokens[0].value === 'struct' && this.findBrace(tokens) >= 0) {
            this.parseStructDef(tokens);
            return;
        }

        // Function definition or prototype
        if (this.isType(tokens[0].value) && this.findParen(tokens) >= 0) {
            const braceIdx = this.findBrace(tokens);
            if (braceIdx >= 0) {
                this.parseFunctionDef(tokens);
            }
            return;
        }

        // Global variable declaration
        if (this.isType(tokens[0].value)) {
            this.parseGlobalVarList(tokens);
            return;
        }
    }

    collectStatement(tok) {
        let tokens = [];
        let depth = 0;
        while (tok.hasMore()) {
            const t = tok.peek();
            if (t.type === 'EOF') break;
            if (t.value === '{') { depth++; tokens.push(tok.next()); continue; }
            if (t.value === '}') {
                depth--;
                tokens.push(tok.next());
                if (depth === 0) break;
                continue;
            }
            if (t.value === ';' && depth === 0) { tok.next(); break; }
            tokens.push(tok.next());
        }
        return tokens;
    }

    findBrace(tokens) {
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].value === '{') return i;
        }
        return -1;
    }

    findParen(tokens) {
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].value === '(') return i;
        }
        return -1;
    }

    isType(v) {
        if (!v) return false;
        if (['int', 'char', 'void', 'float', 'double', 'long', 'short', 'unsigned', 'signed', 'struct', 'FILE', 'bool'].includes(v)) return true;
        if (this.typedefs && this.typedefs[v]) return true;
        if (this.structDefs && this.structDefs[v]) return true;
        return false;
    }

    // ── Typedef definition ──
    parseTypedef(tokens) {
        let i = 1;
        if (i < tokens.length && tokens[i].value === 'struct') {
            const braceIdx = this.findBrace(tokens);
            if (braceIdx >= 0) {
                let closeIdx = -1;
                let d = 0;
                for (let k = braceIdx; k < tokens.length; k++) {
                    if (tokens[k].value === '{') d++;
                    if (tokens[k].value === '}') { d--; if (d === 0) { closeIdx = k; break; } }
                }
                if (closeIdx >= 0 && closeIdx + 1 < tokens.length && tokens[closeIdx + 1].type === 'IDENT') {
                    const aliasName = tokens[closeIdx + 1].value;
                    this.parseStructDef(tokens.slice(1, closeIdx + 1), aliasName);
                    this.typedefs[aliasName] = `struct ${aliasName}`;
                }
                return;
            }
        }
        if (tokens.length >= 3) {
            const newName = tokens[tokens.length - 1].value;
            this.typedefs[newName] = tokens[1].value;
        }
    }

    // ── Struct definition ──
    parseStructDef(tokens, customName = '') {
        let name = customName;
        let i = 0;
        if (tokens[i].value === 'struct') i++;
        if (!name && i < tokens.length && tokens[i].type === 'IDENT') name = tokens[i++].value;
        const braceIdx = this.findBrace(tokens);
        if (braceIdx < 0) return;

        let fields = [];
        let fType = '', fName = '', fArr = false, fArrSz = 0;
        for (let j = braceIdx + 1; j < tokens.length; j++) {
            const t = tokens[j];
            if (t.value === '}') break;
            if (t.value === ';') {
                if (fType && fName) fields.push({ type: fType, name: fName, isArray: fArr, arraySize: fArrSz });
                fType = ''; fName = ''; fArr = false; fArrSz = 0;
                continue;
            }
            if (t.value === '[') {
                fArr = true;
                j++;
                let szTokens = [];
                while (j < tokens.length && tokens[j].value !== ']') { szTokens.push(tokens[j++]); }
                fArrSz = szTokens.length > 0 ? (parseInt(szTokens[0].value, 10) || 20) : 20;
                continue;
            }
            if (t.value === ']') continue;
            if (t.value === '{') continue;
            if (this.isType(t.value)) fType += (fType ? ' ' : '') + t.value;
            else if (t.value === '*') fType += '*';
            else if (t.type === 'IDENT' && !fName) fName = t.value;
        }
        if (name) this.structDefs[name] = fields;
    }

    // ── Function definition ──
    parseFunctionDef(tokens) {
        let i = 0;
        let retType = '';
        while (i < tokens.length && this.isType(tokens[i].value)) {
            retType += (retType ? ' ' : '') + tokens[i].value;
            i++;
        }
        while (i < tokens.length && tokens[i].value === '*') { retType += '*'; i++; }
        let name = '';
        if (i < tokens.length && tokens[i].type === 'IDENT') name = tokens[i++].value;
        if (!name) return;

        let params = [];
        if (i < tokens.length && tokens[i].value === '(') {
            i++; // skip (
            let depth = 1;
            let current = [];
            while (i < tokens.length && depth > 0) {
                const t = tokens[i];
                if (t.value === '(') { depth++; current.push(t); i++; continue; }
                if (t.value === ')') {
                    depth--;
                    if (depth === 0) { i++; break; }
                    current.push(t);
                    i++;
                    continue;
                }
                if (t.value === ',' && depth === 1) {
                    params.push(this.parseParam(current));
                    current = [];
                    i++;
                    continue;
                }
                current.push(t);
                i++;
            }
            if (current.length > 0) params.push(this.parseParam(current));
        }

        // Parse body
        let body = [];
        if (i < tokens.length && tokens[i].value === '{') {
            i++; // skip opening {
            let depth = 1;
            while (i < tokens.length && depth > 0) {
                const t = tokens[i];
                if (t.value === '{') { depth++; body.push(t); i++; continue; }
                if (t.value === '}') { depth--; if (depth > 0) body.push(t); i++; continue; }
                body.push(t);
                i++;
            }
        }

        this.functions[name] = { returnType: retType, name, params, body };
    }

    parseParam(tokens) {
        let type = '', name = '', isPtr = false, isArray = false;
        for (const t of tokens) {
            if (this.isType(t.value)) type += (type ? ' ' : '') + t.value;
            else if (t.value === '*') isPtr = true;
            else if (t.type === 'IDENT' && !name) name = t.value;
            else if (t.value === '[') isArray = true;
        }
        return { type, name, isPtr, isArray };
    }

    // ── Global variables (handles multiple: int a = 1, b = 2;) ──
    parseGlobalVarList(tokens) {
        this.execVarDeclList(tokens, this.globals, true);
    }

    // ── Main invocation ──
    callMain() {
        if (!this.functions['main']) throw new CError('Função main() não encontrada');
        this.execBlock(this.functions['main'].body, {});
    }

    // ── Statement group extractor ──
    extractStmtBody(body, start) {
        if (start >= body.length) return { tokens: [], end: start };
        if (body[start].value === '{') {
            return this.extractGroup(body, start, '{', '}');
        }
        let tokens = [];
        let depth = 0;
        let j = start;
        while (j < body.length) {
            const t = body[j];
            if (t.value === '(' || t.value === '[') depth++;
            if (t.value === ')' || t.value === ']') depth--;
            if (t.value === ';' && depth === 0) { j++; break; }
            tokens.push(t);
            j++;
        }
        return { tokens, end: j };
    }

    // ── Block execution ──
    execBlock(body, scope) {
        const env = scope;
        if (!env.hasOwnProperty('__ret')) { env.__ret = false; env.__retval = null; }
        if (!env.hasOwnProperty('__brk')) { env.__brk = false; }
        if (!env.hasOwnProperty('__cont')) { env.__cont = false; }
        let i = 0;
        while (i < body.length) {
            if (env.__ret || env.__brk) break;
            if (env.__cont) { env.__cont = false; break; }
            this.stepCount++;
            if (this.stepCount > this.maxSteps) throw new CError('Limite de execução excedido (loop infinito?)');

            const t = body[i];

            if (t.value === ';') { i++; continue; }

            if (t.value === 'break') {
                i++;
                if (i < body.length && body[i].value === ';') i++;
                env.__brk = true;
                break;
            }

            if (t.value === 'continue') {
                i++;
                if (i < body.length && body[i].value === ';') i++;
                env.__cont = true;
                break;
            }

            if (t.value === 'return') {
                i++;
                let expr = [];
                while (i < body.length && body[i].value !== ';') expr.push(body[i++]);
                if (i < body.length) i++;
                env.__ret = true;
                env.__retval = expr.length > 0 ? this.evalTokens(expr, env) : 0;
                return env.__retval;
            }

            if (t.value === 'if') {
                i++;
                const cond = this.extractGroup(body, i, '(', ')');
                i = cond.end;
                const condVal = this.evalTokens(cond.tokens, env);
                const thenB = this.extractStmtBody(body, i);
                i = thenB.end;
                if (this.truthy(condVal)) {
                    this.execBlock(thenB.tokens, env);
                    if (env.__ret) return env.__retval;
                    if (env.__brk || env.__cont) break;
                    i = this.skipElseChain(body, i);
                } else {
                    i = this.skipElseBranch(body, i, env);
                }
                continue;
            }

            if (t.value === 'while') {
                i++;
                const cond = this.extractGroup(body, i, '(', ')');
                i = cond.end;
                const wBody = this.extractStmtBody(body, i);
                i = wBody.end;
                let iter = 0;
                while (this.truthy(this.evalTokens(cond.tokens, env))) {
                    if (++iter > this.maxSteps) throw new CError('Loop while infinito?');
                    this.execBlock(wBody.tokens, env);
                    if (env.__ret) return env.__retval;
                    if (env.__brk) { env.__brk = false; break; }
                    if (env.__cont) { env.__cont = false; continue; }
                }
                continue;
            }

            if (t.value === 'do') {
                i++;
                const dBody = this.extractStmtBody(body, i);
                i = dBody.end;
                let condTokens = [];
                if (i < body.length && body[i].value === 'while') {
                    i++;
                    const cond = this.extractGroup(body, i, '(', ')');
                    i = cond.end;
                    condTokens = cond.tokens;
                    if (i < body.length && body[i].value === ';') i++;
                }
                let iter = 0;
                do {
                    if (++iter > this.maxSteps) throw new CError('Loop do-while infinito?');
                    this.execBlock(dBody.tokens, env);
                    if (env.__ret) return env.__retval;
                    if (env.__brk) { env.__brk = false; break; }
                    if (env.__cont) { env.__cont = false; }
                } while (condTokens.length > 0 && this.truthy(this.evalTokens(condTokens, env)));
                continue;
            }

            if (t.value === 'for') {
                i++;
                const paren = this.extractGroup(body, i, '(', ')');
                i = paren.end;
                const fTokens = paren.tokens;
                let parts = [[]]; let depth = 0;
                for (const ft of fTokens) {
                    if (ft.value === '(') depth++;
                    if (ft.value === ')') depth--;
                    if (ft.value === ';' && depth === 0) parts.push([]);
                    else parts[parts.length - 1].push(ft);
                }
                const init = parts[0] || [];
                const cond = parts[1] || [];
                const inc = parts[2] || [];
                this.execForBody(init, cond, inc, body, i, env);
                const forBody = this.extractStmtBody(body, i);
                i = forBody.end;
                continue;
            }

            if (t.value === 'switch') {
                i++;
                const paren = this.extractGroup(body, i, '(', ')');
                i = paren.end;
                const switchVal = this.evalTokens(paren.tokens, env);
                const sBlock = this.extractGroup(body, i, '{', '}');
                i = sBlock.end;
                this.execSwitchBlock(switchVal, sBlock.tokens, env);
                if (env.__ret) return env.__retval;
                continue;
            }

            if (t.value === '{') {
                const block = this.extractGroup(body, i, '{', '}');
                i = block.end;
                this.execBlock(block.tokens, env);
                if (env.__ret) return env.__retval;
                continue;
            }

            if (t.value === 'printf') {
                i++;
                const paren = this.extractGroup(body, i, '(', ')');
                i = paren.end;
                if (i < body.length && body[i].value === ';') i++;
                this.output.push(this.formatPrintf(paren.tokens, env));
                continue;
            }

            if (t.value === 'scanf') {
                i++;
                const paren = this.extractGroup(body, i, '(', ')');
                i = paren.end;
                if (i < body.length && body[i].value === ';') i++;
                this.execScanf(paren.tokens, env);
                continue;
            }

            if (t.value === 'puts') {
                i++;
                const paren = this.extractGroup(body, i, '(', ')');
                i = paren.end;
                if (i < body.length && body[i].value === ';') i++;
                const val = this.evalTokens(paren.tokens, env);
                this.output.push(this.valToStr(val) + '\n');
                continue;
            }

            if (this.isType(t.value)) {
                let j = i;
                while (j < body.length && (this.isType(body[j].value) || body[j].value === '*')) j++;
                if (j < body.length && body[j].type === 'IDENT' && j + 1 < body.length && body[j + 1].value === '(') {
                    const pGroup = this.extractGroup(body, j + 1, '(', ')');
                    let afterP = pGroup.end;
                    if (afterP < body.length && body[afterP].value === '{') {
                        const bGroup = this.extractGroup(body, afterP, '{', '}');
                        i = bGroup.end;
                        continue;
                    }
                }

                let stmt = this.readFullStatement(body, i);
                i = stmt.end;
                this.execVarDeclList(stmt.tokens, env, false);
                continue;
            }

            let stmt = this.readFullStatement(body, i);
            i = stmt.end;
            this.execStmt(stmt.tokens, env);
        }
        return env.__retval;
    }

    readFullStatement(body, start) {
        let tokens = [];
        let depth = 0;
        let i = start;
        while (i < body.length) {
            const t = body[i];
            if (t.value === '(' || t.value === '[') depth++;
            if (t.value === ')' || t.value === ']') depth--;
            if (t.value === '{') {
                depth++;
                tokens.push(t);
                i++;
                continue;
            }
            if (t.value === '}') {
                depth--;
                if (depth < 0) break;
                tokens.push(t);
                i++;
                continue;
            }
            if (t.value === ';' && depth === 0) { i++; break; }
            tokens.push(t);
            i++;
        }
        return { tokens, end: i };
    }

    // ── Variable Declaration List (int a = 1, b = 2, c;) ──
    execVarDeclList(tokens, env, isGlobal = false) {
        if (!tokens || tokens.length === 0) return;
        let i = 0;
        let baseType = '';
        while (i < tokens.length && this.isType(tokens[i].value)) {
            baseType += (baseType ? ' ' : '') + tokens[i].value;
            i++;
        }
        if (baseType.endsWith('struct') && i < tokens.length && tokens[i].type === 'IDENT') {
            baseType += ' ' + tokens[i++].value;
        }

        while (i < tokens.length) {
            let isPtr = false;
            while (i < tokens.length && tokens[i].value === '*') {
                isPtr = true;
                i++;
            }

            if (i >= tokens.length || tokens[i].type !== 'IDENT') break;
            const name = tokens[i++].value;

            let isArray = false;
            let size1 = 0;
            let size2 = 0;
            let is2D = false;

            if (i < tokens.length && tokens[i].value === '[') {
                isArray = true;
                i++; // skip [
                let szTokens1 = [];
                while (i < tokens.length && tokens[i].value !== ']') szTokens1.push(tokens[i++]);
                if (i < tokens.length) i++; // skip ]
                size1 = szTokens1.length > 0 ? this.constExpr(szTokens1, env) : 0;

                if (i < tokens.length && tokens[i].value === '[') {
                    is2D = true;
                    i++; // skip [
                    let szTokens2 = [];
                    while (i < tokens.length && tokens[i].value !== ']') szTokens2.push(tokens[i++]);
                    if (i < tokens.length) i++; // skip ]
                    size2 = szTokens2.length > 0 ? this.constExpr(szTokens2, env) : 0;
                }
            }

            let hasInit = false;
            let initTokens = [];
            if (i < tokens.length && tokens[i].value === '=') {
                hasInit = true;
                i++; // skip =
                let depth = 0;
                while (i < tokens.length) {
                    const tk = tokens[i];
                    if (tk.value === '(' || tk.value === '[' || tk.value === '{') depth++;
                    if (tk.value === ')' || tk.value === ']' || tk.value === '}') depth--;
                    if (tk.value === ',' && depth === 0) { i++; break; }
                    initTokens.push(tk);
                    i++;
                }
            } else if (i < tokens.length && tokens[i].value === ',') {
                i++;
            }

            if (baseType.startsWith('struct') && !isArray) {
                const sName = baseType.replace('struct', '').trim();
                const fields = this.structDefs[sName] || [];
                const obj = {};
                for (const f of fields) {
                    obj[f.name] = f.isArray ? (f.type === 'char' ? '' : new Array(f.arraySize).fill(0)) : 0;
                }
                if (hasInit && initTokens.length > 0) {
                    const initList = this.parseInitList(initTokens, 0, env);
                    if (initList.length === 1 && typeof initList[0] === 'object' && initList[0] !== null && initList[0].fields) {
                        Object.assign(obj, JSON.parse(JSON.stringify(initList[0].fields)));
                    } else {
                        let fIdx = 0;
                        for (const f of fields) {
                            if (fIdx < initList.length) {
                                obj[f.name] = initList[fIdx++];
                            }
                        }
                    }
                }
                this.setVar(name, { type: 'struct', structName: sName, fields: obj }, env);
            } else if (isArray) {
                let initList = hasInit ? this.parseInitList(initTokens, 0, env) : [];
                if (size1 === 0) {
                    size1 = initList.length > 0 ? (typeof initList[0] === 'string' ? initList[0].length + 1 : initList.length) : 10;
                }
                if (baseType.startsWith('struct')) {
                    const sName = baseType.replace('struct', '').trim();
                    const fields = this.structDefs[sName] || [];
                    const vals = [];
                    for (let j = 0; j < size1; j++) {
                        const obj = {};
                        for (const f of fields) {
                            obj[f.name] = f.isArray ? (f.type === 'char' ? '' : new Array(f.arraySize).fill(0)) : 0;
                        }
                        if (j < initList.length) {
                            const item = initList[j];
                            if (Array.isArray(item)) {
                                let fIdx = 0;
                                for (const f of fields) {
                                    if (fIdx < item.length) obj[f.name] = item[fIdx++];
                                }
                            } else if (typeof item === 'object' && item !== null && item.fields) {
                                Object.assign(obj, item.fields);
                            }
                        }
                        vals.push({ type: 'struct', structName: sName, fields: obj });
                    }
                    this.setVar(name, { type: 'structArray', elemType: baseType, size: size1, values: vals }, env);
                } else if (is2D) {
                    if (size2 === 0) size2 = (initList.length > 0 && Array.isArray(initList[0])) ? initList[0].length : 10;
                    const vals = new Array(size1 * size2).fill(0);
                    for (let r = 0; r < size1 && r < initList.length; r++) {
                        const row = initList[r];
                        if (typeof row === 'string') {
                            for (let c = 0; c < size2 && c < row.length; c++) vals[r * size2 + c] = row.charCodeAt(c);
                            vals[r * size2 + Math.min(row.length, size2 - 1)] = 0;
                        } else if (Array.isArray(row)) {
                            for (let c = 0; c < size2 && c < row.length; c++) vals[r * size2 + c] = row[c];
                        }
                    }
                    this.setVar(name, { type: 'array', elemType: baseType, size: size1, size2, values: vals }, env);
                } else {
                    const vals = new Array(size1).fill(0);
                    if (initList.length > 0 && typeof initList[0] === 'string') {
                        const s = initList[0];
                        for (let j = 0; j < size1 && j < s.length; j++) vals[j] = s.charCodeAt(j);
                        if (s.length < size1) vals[s.length] = 0;
                    } else {
                        for (let j = 0; j < size1 && j < initList.length; j++) vals[j] = initList[j];
                    }
                    this.setVar(name, { type: 'array', elemType: baseType, size: size1, values: vals }, env);
                }
            } else if (isPtr) {
                let ptrVal = hasInit ? this.evalTokens(initTokens, env) : null;
                this.setVar(name, ptrVal || { __ptr: true, target: null }, env);
            } else {
                let val = hasInit ? this.evalTokens(initTokens, env) : 0;
                this.setVar(name, val, env);
            }
        }
    }

    parseInitList(tokens, start, env) {
        let vals = [];
        let i = start;
        if (i >= tokens.length) return vals;
        if (tokens[i].type === 'STRING') { vals.push(tokens[i].value); return vals; }
        if (tokens[i].value === '{') {
            i++; // skip {
            let depth = 1;
            let current = [];
            while (i < tokens.length && depth > 0) {
                const tk = tokens[i];
                if (tk.value === '{') {
                    if (depth === 1) {
                        if (current.length > 0) { vals.push(this.evalTokens(current, env)); current = []; }
                        const sub = this.parseInitList(tokens, i, env);
                        vals.push(sub);
                        i++;
                        let d = 1;
                        while (i < tokens.length && d > 0) {
                            if (tokens[i].value === '{') d++;
                            if (tokens[i].value === '}') d--;
                            i++;
                        }
                        continue;
                    }
                    depth++;
                    i++;
                    continue;
                }
                if (tk.value === '}') {
                    depth--;
                    if (depth === 0) break;
                    i++;
                    continue;
                }
                if (tk.value === ',' && depth === 1) {
                    if (current.length > 0) {
                        vals.push(this.evalTokens(current, env));
                        current = [];
                    }
                    i++;
                    continue;
                }
                current.push(tk);
                i++;
            }
            if (current.length > 0) vals.push(this.evalTokens(current, env));
        } else {
            vals.push(this.evalTokens(tokens.slice(start), env));
        }
        return vals;
    }

    constExpr(tokens, env = {}) {
        try {
            return Number(this.evalTokens(tokens, env)) || 0;
        } catch {
            return parseInt(tokens.map(t => t.value).join(''), 10) || 0;
        }
    }

    // ── Exec Statement / Expression ──
    execStmt(tokens, env) {
        if (!tokens || tokens.length === 0) return;

        let subStmts = [];
        let cur = [];
        let d = 0;
        for (const tk of tokens) {
            if (tk.value === '(' || tk.value === '[' || tk.value === '{') d++;
            if (tk.value === ')' || tk.value === ']' || tk.value === '}') d--;
            if (tk.value === ',' && d === 0) {
                if (cur.length > 0) subStmts.push(cur);
                cur = [];
            } else {
                cur.push(tk);
            }
        }
        if (cur.length > 0) subStmts.push(cur);

        if (subStmts.length > 1) {
            for (const s of subStmts) this.execSingleStmt(s, env);
            return;
        }

        this.execSingleStmt(tokens, env);
    }

    execSingleStmt(tokens, env) {
        if (!tokens || tokens.length === 0) return;
        const first = tokens[0];

        const assignOps = ['=', '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '<<=', '>>='];

        let assignIdx = -1;
        let assignOp = '';
        let depth = 0;
        for (let j = 0; j < tokens.length; j++) {
            const tk = tokens[j];
            if (tk.value === '(' || tk.value === '[' || tk.value === '{') depth++;
            if (tk.value === ')' || tk.value === ']' || tk.value === '}') depth--;
            if (depth === 0 && assignOps.includes(tk.value)) {
                assignIdx = j;
                assignOp = tk.value;
                break;
            }
        }

        if (assignIdx > 0) {
            const leftTokens = tokens.slice(0, assignIdx);
            const rightTokens = tokens.slice(assignIdx + 1);
            const rVal = this.evalTokens(rightTokens, env);
            this.assignTarget(leftTokens, assignOp, rVal, env);
            return;
        }

        if (first.type === 'IDENT' && tokens.length === 2 && (tokens[1].value === '++' || tokens[1].value === '--')) {
            const old = this.getVarVal(first.value, env);
            this.setVar(first.value, tokens[1].value === '++' ? old + 1 : old - 1, env);
            return;
        }
        if ((first.value === '++' || first.value === '--') && tokens.length === 2 && tokens[1].type === 'IDENT') {
            const old = this.getVarVal(tokens[1].value, env);
            this.setVar(tokens[1].value, first.value === '++' ? old + 1 : old - 1, env);
            return;
        }

        this.evalTokens(tokens, env);
    }

    // ── Target assignment: LHS <assignOp> RHS ──
    assignTarget(leftTokens, op, rightVal, env) {
        const getNewVal = (oldVal) => {
            if (op === '=') return rightVal;
            const a = Number(oldVal) || 0;
            const b = Number(rightVal) || 0;
            if (op === '+=') return a + b;
            if (op === '-=') return a - b;
            if (op === '*=') return a * b;
            if (op === '/=') return b !== 0 ? ((!Number.isInteger(a) || !Number.isInteger(b)) ? a / b : Math.trunc(a / b)) : 0;
            if (op === '%=') return b !== 0 ? a % b : 0;
            if (op === '&=') return a & b;
            if (op === '|=') return a | b;
            if (op === '^=') return a ^ b;
            if (op === '<<=') return a << b;
            if (op === '>>=') return a >> b;
            return rightVal;
        };

        if (leftTokens[0].value === '*') {
            const innerExpr = leftTokens.slice(1);
            let ptrInfo = this.evalTokens(innerExpr, env);
            if (ptrInfo && typeof ptrInfo === 'object' && ptrInfo.__ptr) {
                const oldVal = this.getPointerVal(ptrInfo, env);
                const newVal = getNewVal(oldVal);
                this.setPointerVal(ptrInfo, newVal, env);
                return;
            }
            // If innerExpr is an identifier whose value is a pointer:
            if (innerExpr.length === 1 && innerExpr[0].type === 'IDENT') {
                const ptrVar = this.getVarVal(innerExpr[0].value, env);
                if (ptrVar && typeof ptrVar === 'object' && ptrVar.__ptr) {
                    const oldVal = this.getPointerVal(ptrVar, env);
                    const newVal = getNewVal(oldVal);
                    this.setPointerVal(ptrVar, newVal, env);
                    return;
                }
            }
        }

        let dotIdx = leftTokens.findIndex(t => t.value === '.' || t.value === '->');
        if (dotIdx > 0 && dotIdx + 1 < leftTokens.length) {
            const objTokens = leftTokens.slice(0, dotIdx);
            const field = leftTokens[dotIdx + 1].value;
            const obj = this.evalTokens(objTokens, env);
            if (obj && typeof obj === 'object') {
                if (obj.__ptr) {
                    const realObj = this.getVar(obj.target, obj.scope || env);
                    if (realObj && realObj.fields) {
                        const old = realObj.fields[field] || 0;
                        realObj.fields[field] = getNewVal(old);
                    }
                } else if (obj.fields) {
                    const old = obj.fields[field] || 0;
                    obj.fields[field] = getNewVal(old);
                }
            }
            return;
        }

        if (leftTokens.length >= 3 && leftTokens[0].type === 'IDENT' && leftTokens[1].value === '[') {
            const arrName = leftTokens[0].value;
            const b1 = this.extractGroup(leftTokens, 1, '[', ']');
            const idx1 = this.evalTokens(b1.tokens, env);
            let idx2 = null;
            if (b1.end < leftTokens.length && leftTokens[b1.end].value === '[') {
                const b2 = this.extractGroup(leftTokens, b1.end, '[', ']');
                idx2 = this.evalTokens(b2.tokens, env);
            }

            const arrObj = this.getVar(arrName, env);
            if (arrObj && arrObj.values) {
                if (idx2 !== null) {
                    const cols = arrObj.size2 || 10;
                    const flat = idx1 * cols + idx2;
                    const old = arrObj.values[flat] || 0;
                    arrObj.values[flat] = getNewVal(old);
                } else {
                    if (arrObj.size2 && typeof rightVal === 'string') {
                        const cols = arrObj.size2;
                        for (let c = 0; c < cols; c++) {
                            arrObj.values[idx1 * cols + c] = c < rightVal.length ? rightVal.charCodeAt(c) : 0;
                        }
                    } else if (typeof rightVal === 'object' && rightVal !== null && rightVal.fields) {
                        arrObj.values[idx1] = { type: 'struct', structName: rightVal.structName, fields: JSON.parse(JSON.stringify(rightVal.fields)) };
                    } else {
                        const old = arrObj.values[idx1] || 0;
                        arrObj.values[idx1] = getNewVal(old);
                    }
                }
            }
            return;
        }

        if (leftTokens.length === 1 && leftTokens[0].type === 'IDENT') {
            const varName = leftTokens[0].value;
            const old = this.getVarVal(varName, env);
            this.setVar(varName, getNewVal(old), env);
            return;
        }

        if (leftTokens.length > 0 && leftTokens[0].type === 'IDENT') {
            const varName = leftTokens[0].value;
            this.setVar(varName, rightVal, env);
        }
    }

    getPointerVal(ptr, env) {
        if (!ptr || !ptr.__ptr) return 0;
        const targetEnv = ptr.scope || env;
        const obj = this.getVar(ptr.target, targetEnv);
        if (!obj) return 0;
        if (obj.values) return obj.values[ptr.offset || 0] || 0;
        if (obj.fields && ptr.field) return obj.fields[ptr.field] || 0;
        if (obj.type === 'var') return obj.value;
        return typeof obj === 'number' ? obj : 0;
    }

    setPointerVal(ptr, val, env) {
        if (!ptr || !ptr.__ptr) return;
        const targetEnv = ptr.scope || env;
        const obj = this.getVar(ptr.target, targetEnv);
        if (!obj) {
            this.setVar(ptr.target, val, targetEnv);
            return;
        }
        if (obj.values) {
            obj.values[ptr.offset || 0] = val;
            return;
        }
        if (obj.fields && ptr.field) {
            obj.fields[ptr.field] = val;
            return;
        }
        this.setVar(ptr.target, val, targetEnv);
    }

    // ── Switch/Case Execution ──
    execSwitchBlock(switchVal, body, env) {
        let i = 0;
        let defaultIdx = -1;
        let caseIndices = [];

        while (i < body.length) {
            if (body[i].value === 'case') {
                i++;
                let cValTokens = [];
                while (i < body.length && body[i].value !== ':') cValTokens.push(body[i++]);
                if (i < body.length) i++;
                const cVal = this.evalTokens(cValTokens, env);
                caseIndices.push({ val: cVal, idx: i });
                continue;
            }
            if (body[i].value === 'default') {
                i++;
                if (i < body.length && body[i].value === ':') i++;
                defaultIdx = i;
                continue;
            }
            i++;
        }

        let startExecIdx = -1;
        for (const c of caseIndices) {
            if (c.val == switchVal) {
                startExecIdx = c.idx;
                break;
            }
        }
        if (startExecIdx === -1 && defaultIdx !== -1) {
            startExecIdx = defaultIdx;
        }

        if (startExecIdx === -1) return;

        let tokensToRun = [];
        for (let j = startExecIdx; j < body.length; j++) {
            if (body[j].value === 'case' || body[j].value === 'default') {
                while (j < body.length && body[j].value !== ':') j++;
                continue;
            }
            tokensToRun.push(body[j]);
        }

        this.execBlock(tokensToRun, env);
        if (env.__brk) env.__brk = false;
    }

    // ── For loop execution ──
    execForBody(init, cond, inc, body, startIdx, env) {
        if (init.length > 0) {
            if (this.isType(init[0].value)) {
                this.execVarDeclList(init, env, false);
            } else {
                this.execStmt(init, env);
            }
        }
        const forBody = this.extractStmtBody(body, startIdx);
        let iter = 0;
        while (true) {
            if (cond.length > 0 && !this.truthy(this.evalTokens(cond, env))) break;
            if (++iter > this.maxSteps) throw new CError('Loop for infinito?');

            this.execBlock(forBody.tokens, env);
            if (env.__ret) return;
            if (env.__brk) { env.__brk = false; break; }
            if (env.__cont) { env.__cont = false; }

            if (inc.length > 0) this.execStmt(inc, env);
        }
    }

    skipElseChain(body, start) {
        let i = start;
        while (i < body.length && body[i].value === 'else') {
            i++;
            if (i < body.length && body[i].value === 'if') {
                i++;
                const cond = this.extractGroup(body, i, '(', ')');
                i = cond.end;
                const b = this.extractStmtBody(body, i);
                i = b.end;
            } else {
                const b = this.extractStmtBody(body, i);
                i = b.end;
                break;
            }
        }
        return i;
    }

    skipElseBranch(body, start, env) {
        let i = start;
        if (i < body.length && body[i].value === 'else') {
            i++;
            if (i < body.length && body[i].value === 'if') {
                i++;
                const cond = this.extractGroup(body, i, '(', ')');
                i = cond.end;
                const condVal = this.evalTokens(cond.tokens, env);
                const thenB = this.extractStmtBody(body, i);
                i = thenB.end;
                if (this.truthy(condVal)) {
                    this.execBlock(thenB.tokens, env);
                    i = this.skipElseChain(body, i);
                } else {
                    i = this.skipElseBranch(body, i, env);
                }
            } else {
                const elseB = this.extractStmtBody(body, i);
                i = elseB.end;
                this.execBlock(elseB.tokens, env);
            }
        }
        return i;
    }

    // ── Variable Store & Retrieval ──
    getVar(name, env) {
        if (!name) return null;
        if (env && env.hasOwnProperty(name)) return env[name];
        if (this.globals.hasOwnProperty(name)) return this.globals[name];
        return null;
    }

    getVarVal(name, env) {
        const v = this.getVar(name, env);
        if (v === null || v === undefined) return 0;
        if (typeof v === 'object' && v.type === 'var') return v.value;
        if (typeof v === 'object' && (v.type === 'array' || v.type === 'structArray')) return { __ptr: true, target: name, offset: 0, scope: env };
        if (typeof v === 'object' && v.type === 'struct') return v;
        return v;
    }

    setVar(name, val, env) {
        if (!name) return;
        if (env && (env.hasOwnProperty(name) || !this.globals.hasOwnProperty(name))) {
            if (typeof env[name] === 'object' && env[name] !== null && env[name].type === 'var') {
                env[name].value = (val && val.type === 'var') ? val.value : val;
            } else {
                env[name] = (val && typeof val === 'object' && val.type) ? val : { type: 'var', varType: 'int', value: val };
            }
        } else {
            if (typeof this.globals[name] === 'object' && this.globals[name] !== null && this.globals[name].type === 'var') {
                this.globals[name].value = (val && val.type === 'var') ? val.value : val;
            } else {
                this.globals[name] = (val && typeof val === 'object' && val.type) ? val : { type: 'var', varType: 'int', value: val };
            }
        }
    }

    // ── Expression Evaluation (evalTokens & evalExpr) ──
    evalTokens(tokens, env = {}) {
        if (!tokens || tokens.length === 0) return 0;
        return this.evalExpr(tokens, env, 0).value;
    }

    evalExpr(tokens, env, minPrec) {
        let left = this.evalAtom(tokens, env);

        while (left.idx < tokens.length) {
            const opToken = tokens[left.idx];
            if (!opToken) break;

            if (opToken.value === '?') {
                if (minPrec > 1) break;
                left.idx++;
                let depth = 0;
                let colonIdx = -1;
                for (let k = left.idx; k < tokens.length; k++) {
                    if (tokens[k].value === '?' || tokens[k].value === '(') depth++;
                    if (tokens[k].value === ':' || tokens[k].value === ')') {
                        if (tokens[k].value === ':' && depth === 0) { colonIdx = k; break; }
                        depth--;
                    }
                }
                if (colonIdx >= 0) {
                    const thenTokens = tokens.slice(left.idx, colonIdx);
                    const elseTokens = tokens.slice(colonIdx + 1);
                    const condVal = this.truthy(left.value);
                    const chosen = condVal ? this.evalTokens(thenTokens, env) : this.evalTokens(elseTokens, env);
                    return { value: chosen, idx: tokens.length };
                }
                break;
            }

            if (!this.isOp(opToken.value)) break;
            const prec = this.opPrec(opToken.value);
            if (prec < minPrec) break;

            const op = opToken.value;
            left.idx++;

            if (op === '&&') {
                if (!this.truthy(left.value)) {
                    const right = this.evalExpr(tokens.slice(left.idx), env, prec + 1);
                    left.idx += right.idx;
                    left.value = 0;
                    continue;
                }
            } else if (op === '||') {
                if (this.truthy(left.value)) {
                    const right = this.evalExpr(tokens.slice(left.idx), env, prec + 1);
                    left.idx += right.idx;
                    left.value = 1;
                    continue;
                }
            }

            const right = this.evalExpr(tokens.slice(left.idx), env, prec + (this.isLeftAssoc(op) ? 1 : 0));
            left.idx += right.idx;
            left.value = this.applyOp(op, left.value, right.value, env);
        }

        return left;
    }

    evalAtom(tokens, env) {
        if (!tokens || tokens.length === 0) return { value: 0, idx: 0 };
        let idx = 0;
        let t = tokens[idx];

        // Type Casting: (float)x, (int)x, (double)x, (char)x, (long)x
        if (t.value === '(' && idx + 2 < tokens.length && this.isType(tokens[idx + 1].value) && tokens[idx + 2].value === ')') {
            const castType = tokens[idx + 1].value;
            idx += 3;
            const inner = this.evalAtom(tokens.slice(idx), env);
            let raw = inner.value;
            let val = (typeof raw === 'object' && raw !== null && raw.__isFloat) ? raw.value : raw;
            if (castType === 'float' || castType === 'double') {
                val = { __isFloat: true, value: parseFloat(val) || 0.0 };
            } else if (castType === 'int' || castType === 'long' || castType === 'short') {
                val = Math.trunc(Number(val)) || 0;
            } else if (castType === 'char') {
                val = typeof val === 'string' ? val.charCodeAt(0) : (Number(val) & 0xFF);
            }
            return { value: val, idx: idx + inner.idx };
        }

        // sizeof operator
        if (t.value === 'sizeof') {
            idx++;
            if (idx < tokens.length && tokens[idx].value === '(') {
                const paren = this.extractGroup(tokens, idx, '(', ')');
                idx = paren.end;
                const inner = paren.tokens;
                if (inner.length > 0 && this.isType(inner[0].value)) {
                    const tp = inner[0].value;
                    const sz = (tp === 'char') ? 1 : (tp === 'double' || tp === 'long') ? 8 : 4;
                    return { value: sz, idx };
                }
                const v = this.evalTokens(inner, env);
                if (v && v.values) return { value: v.values.length * 4, idx };
                return { value: 4, idx };
            }
            return { value: 4, idx: idx + 1 };
        }

        // Special keywords / literals
        if (t.value === 'NULL' || t.value === 'null') return { value: 0, idx: idx + 1 };
        if (t.value === 'true') return { value: 1, idx: idx + 1 };
        if (t.value === 'false') return { value: 0, idx: idx + 1 };

        // Unary operators
        if (t.value === '+') { idx++; const inner = this.evalAtom(tokens.slice(idx), env); return { value: +inner.value, idx: idx + inner.idx }; }
        if (t.value === '-') { idx++; const inner = this.evalAtom(tokens.slice(idx), env); return { value: -inner.value, idx: idx + inner.idx }; }
        if (t.value === '!') { idx++; const inner = this.evalAtom(tokens.slice(idx), env); return { value: this.truthy(inner.value) ? 0 : 1, idx: idx + inner.idx }; }
        if (t.value === '~') { idx++; const inner = this.evalAtom(tokens.slice(idx), env); return { value: ~inner.value, idx: idx + inner.idx }; }
        if (t.value === '++') {
            idx++;
            if (idx < tokens.length && tokens[idx].type === 'IDENT') {
                const name = tokens[idx].value;
                const nv = this.getVarVal(name, env) + 1;
                this.setVar(name, nv, env);
                return { value: nv, idx: idx + 1 };
            }
        }
        if (t.value === '--') {
            idx++;
            if (idx < tokens.length && tokens[idx].type === 'IDENT') {
                const name = tokens[idx].value;
                const nv = this.getVarVal(name, env) - 1;
                this.setVar(name, nv, env);
                return { value: nv, idx: idx + 1 };
            }
        }
        if (t.value === '*') {
            idx++;
            const inner = this.evalAtom(tokens.slice(idx), env);
            let pv = inner.value;
            if (pv && typeof pv === 'object' && pv.__ptr) {
                return { value: this.getPointerVal(pv, env), idx: idx + inner.idx };
            }
            if (typeof pv === 'string' && env[pv] && env[pv].__ptr) {
                return { value: this.getPointerVal(env[pv], env), idx: idx + inner.idx };
            }
            return { value: pv || 0, idx: idx + inner.idx };
        }
        if (t.value === '&') {
            idx++;
            if (idx < tokens.length && tokens[idx].type === 'IDENT') {
                const name = tokens[idx].value;
                idx++;
                if (idx < tokens.length && tokens[idx].value === '[') {
                    const bracket = this.extractGroup(tokens, idx, '[', ']');
                    const offset = this.evalTokens(bracket.tokens, env);
                    return { value: { __ptr: true, target: name, offset, scope: env }, idx: bracket.end };
                }
                return { value: { __ptr: true, target: name, offset: 0, scope: env }, idx };
            }
            return { value: 0, idx };
        }

        // Numeric Literals
        if (t.type === 'NUMBER') {
            let numStr = t.value;
            let val;
            if (numStr.startsWith('0x') || numStr.startsWith('0X')) {
                val = parseInt(numStr, 16);
            } else if (numStr.includes('.')) {
                val = { __isFloat: true, value: parseFloat(numStr) };
            } else {
                val = parseInt(numStr, 10);
            }
            return { value: (val !== null && typeof val === 'object') ? val : (isNaN(val) ? 0 : val), idx: idx + 1 };
        }

        // String Literal
        if (t.type === 'STRING') {
            return { value: t.value, idx: idx + 1 };
        }

        // Char Literal
        if (t.type === 'CHAR') {
            return { value: t.value.charCodeAt(0), idx: idx + 1 };
        }

        // Parentheses
        if (t.value === '(') {
            idx++;
            const result = this.evalExpr(tokens.slice(idx), env, 0);
            idx += result.idx;
            if (idx < tokens.length && tokens[idx].value === ')') idx++;
            return { value: result.value, idx };
        }

        // Identifiers
        if (t.type === 'IDENT') {
            idx++;
            let name = t.value;

            // Function call
            if (idx < tokens.length && tokens[idx].value === '(') {
                const paren = this.extractGroup(tokens, idx, '(', ')');
                const val = this.callFunc(name, paren.tokens, env);
                return { value: val !== undefined ? val : 0, idx: paren.end };
            }

            // Postfix ++ / --
            if (idx < tokens.length && (tokens[idx].value === '++' || tokens[idx].value === '--')) {
                const op = tokens[idx].value;
                idx++;
                const old = this.getVarVal(name, env);
                this.setVar(name, op === '++' ? old + 1 : old - 1, env);
                return { value: old, idx };
            }

            // Array access
            if (idx < tokens.length && tokens[idx].value === '[') {
                const b1 = this.extractGroup(tokens, idx, '[', ']');
                idx = b1.end;
                const idx1 = this.evalTokens(b1.tokens, env);
                let idx2 = null;
                if (idx < tokens.length && tokens[idx].value === '[') {
                    const b2 = this.extractGroup(tokens, idx, '[', ']');
                    idx = b2.end;
                    idx2 = this.evalTokens(b2.tokens, env);
                }

                const arrObj = this.getVar(name, env);
                if (arrObj && arrObj.values) {
                    let elem = null;
                    if (idx2 !== null) {
                        const cols = arrObj.size2 || 10;
                        const flat = idx1 * cols + idx2;
                        elem = arrObj.values[flat];
                    } else if (arrObj.size2) {
                        const cols = arrObj.size2;
                        let s = '';
                        for (let c = 0; c < cols; c++) {
                            const ch = arrObj.values[idx1 * cols + c];
                            if (!ch) break;
                            s += String.fromCharCode(ch);
                        }
                        elem = s;
                    } else {
                        elem = arrObj.values[idx1];
                    }

                    // Check if followed by member access: arr[i].field
                    if (idx < tokens.length && (tokens[idx].value === '.' || tokens[idx].value === '->')) {
                        idx++;
                        let field = '';
                        if (idx < tokens.length && tokens[idx].type === 'IDENT') {
                            field = tokens[idx++].value;
                        }
                        if (elem && typeof elem === 'object' && elem.fields && elem.fields[field] !== undefined) {
                            return { value: elem.fields[field], idx };
                        }
                    }

                    return { value: elem !== undefined ? elem : 0, idx };
                }
                return { value: 0, idx };
            }

            // Struct Member Access
            if (idx < tokens.length && (tokens[idx].value === '.' || tokens[idx].value === '->')) {
                const isArrow = tokens[idx].value === '->';
                idx++;
                let field = '';
                if (idx < tokens.length && tokens[idx].type === 'IDENT') {
                    field = tokens[idx].value;
                    idx++;
                }
                const v = this.getVar(name, env);
                if (v) {
                    if (isArrow || (v && v.__ptr)) {
                        const real = this.getVar(v.target, env);
                        if (real && real.fields && real.fields[field] !== undefined) {
                            return { value: real.fields[field], idx };
                        }
                    } else if (v.fields && v.fields[field] !== undefined) {
                        return { value: v.fields[field], idx };
                    }
                }
                return { value: 0, idx };
            }

            return { value: this.getVarVal(name, env), idx };
        }

        return { value: 0, idx: 1 };
    }

    isOp(v) {
        return ['+', '-', '*', '/', '%', '<', '>', '<=', '>=', '==', '!=', '&&', '||', '&', '|', '^', '<<', '>>'].includes(v);
    }

    opPrec(op) {
        const p = {
            '||': 3,
            '&&': 4,
            '|': 5,
            '^': 6,
            '&': 7,
            '==': 8, '!=': 8,
            '<': 9, '<=': 9, '>': 9, '>=': 9,
            '<<': 10, '>>': 10,
            '+': 11, '-': 11,
            '*': 12, '/': 12, '%': 12
        };
        return p[op] || 0;
    }

    isLeftAssoc(op) { return true; }

    applyOp(op, a, b, env) {
        if (a && typeof a === 'object' && a.__ptr) {
            const rawB = (typeof b === 'object' && b !== null && b.__isFloat) ? b.value : b;
            const numB = Number(rawB);
            if (op === '+' && !isNaN(numB)) return { ...a, offset: (a.offset || 0) + numB };
            if (op === '-' && !isNaN(numB)) return { ...a, offset: (a.offset || 0) - numB };
        }
        if (b && typeof b === 'object' && b.__ptr) {
            const rawA = (typeof a === 'object' && a !== null && a.__isFloat) ? a.value : a;
            const numA = Number(rawA);
            if (op === '+' && !isNaN(numA)) return { ...b, offset: (b.offset || 0) + numA };
        }

        const rawA = (typeof a === 'object' && a !== null && a.__isFloat) ? a.value : a;
        const rawB = (typeof b === 'object' && b !== null && b.__isFloat) ? b.value : b;
        const isFloatA = (typeof a === 'object' && a !== null && a.__isFloat) || (typeof rawA === 'number' && !Number.isInteger(rawA));
        const isFloatB = (typeof b === 'object' && b !== null && b.__isFloat) || (typeof rawB === 'number' && !Number.isInteger(rawB));
        let numA = Number(rawA);
        let numB = Number(rawB);
        if (isNaN(numA)) numA = 0;
        if (isNaN(numB)) numB = 0;

        if (op === '+') return (isFloatA || isFloatB) ? { __isFloat: true, value: numA + numB } : numA + numB;
        if (op === '-') return (isFloatA || isFloatB) ? { __isFloat: true, value: numA - numB } : numA - numB;
        if (op === '*') return (isFloatA || isFloatB) ? { __isFloat: true, value: numA * numB } : numA * numB;
        if (op === '/') {
            if (numB === 0) return 0;
            const res = (isFloatA || isFloatB) ? (numA / numB) : Math.trunc(numA / numB);
            return (isFloatA || isFloatB) ? { __isFloat: true, value: res } : res;
        }
        if (op === '%') return numB !== 0 ? Math.trunc(numA) % Math.trunc(numB) : 0;
        if (op === '<') return numA < numB ? 1 : 0;
        if (op === '>') return numA > numB ? 1 : 0;
        if (op === '<=') return numA <= numB ? 1 : 0;
        if (op === '>=') return numA >= numB ? 1 : 0;
        if (op === '==') {
            if (typeof rawA === 'string' || typeof rawB === 'string') {
                if (rawB === 0 || rawB === null || rawB === undefined) return this.truthy(rawA) ? 0 : 1;
                if (rawA === 0 || rawA === null || rawA === undefined) return this.truthy(rawB) ? 0 : 1;
                return String(rawA) === String(rawB) ? 1 : 0;
            }
            return numA == numB ? 1 : 0;
        }
        if (op === '!=') {
            if (typeof rawA === 'string' || typeof rawB === 'string') {
                if (rawB === 0 || rawB === null || rawB === undefined) return this.truthy(rawA) ? 1 : 0;
                if (rawA === 0 || rawA === null || rawA === undefined) return this.truthy(rawB) ? 1 : 0;
                return String(rawA) !== String(rawB) ? 1 : 0;
            }
            return numA != numB ? 1 : 0;
        }
        if (op === '&&') return (this.truthy(rawA) && this.truthy(rawB)) ? 1 : 0;
        if (op === '||') return (this.truthy(rawA) || this.truthy(rawB)) ? 1 : 0;
        if (op === '&') return Math.trunc(numA) & Math.trunc(numB);
        if (op === '|') return Math.trunc(numA) | Math.trunc(numB);
        if (op === '^') return Math.trunc(numA) ^ Math.trunc(numB);
        if (op === '<<') return Math.trunc(numA) << Math.trunc(numB);
        if (op === '>>') return Math.trunc(numA) >> Math.trunc(numB);
        return 0;
    }

    // ── Function Calls & Built-ins ──
    callFunc(name, argTokens, env) {
        if (name === 'printf') { this.output.push(this.formatPrintf(argTokens, env)); return 0; }
        if (name === 'puts') { const a = this.parseArgs(argTokens, env); this.output.push(this.valToStr(a[0]) + '\n'); return 0; }
        if (name === 'putchar') { const a = this.parseArgs(argTokens, env); const c = String.fromCharCode(Number(a[0]) || 0); this.output.push(c); return a[0]; }
        if (name === 'getchar') {
            const inputVal = (this.stdinTokens && this.stdinIndex < this.stdinTokens.length) ? this.stdinTokens[this.stdinIndex++] : '\n';
            return inputVal.charCodeAt(0) || 10;
        }

        if (name === 'strlen') {
            const a = this.parseArgs(argTokens, env);
            return this.valToStr(a[0]).length;
        }
        if (name === 'strcmp') {
            const a = this.parseArgs(argTokens, env);
            const s1 = this.valToStr(a[0]);
            const s2 = this.valToStr(a[1]);
            return s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
        }
        if (name === 'strncmp') {
            const a = this.parseArgs(argTokens, env);
            const s1 = this.valToStr(a[0]).substring(0, a[2] || 0);
            const s2 = this.valToStr(a[1]).substring(0, a[2] || 0);
            return s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
        }
        if (name === 'strcpy') {
            const groups = this.extractArgGroups(argTokens);
            if (groups.length >= 2) {
                const srcVal = this.valToStr(this.evalTokens(groups[1], env));
                this.assignTarget(groups[0], '=', srcVal, env);
            }
            return 0;
        }
        if (name === 'strncpy') {
            const groups = this.extractArgGroups(argTokens);
            if (groups.length >= 3) {
                const n = Number(this.evalTokens(groups[2], env)) || 0;
                const srcVal = this.valToStr(this.evalTokens(groups[1], env)).substring(0, n);
                this.assignTarget(groups[0], '=', srcVal, env);
            }
            return 0;
        }
        if (name === 'strcat') {
            const groups = this.extractArgGroups(argTokens);
            if (groups.length >= 2) {
                const destVal = this.valToStr(this.evalTokens(groups[0], env));
                const srcVal = this.valToStr(this.evalTokens(groups[1], env));
                this.assignTarget(groups[0], '=', destVal + srcVal, env);
            }
            return 0;
        }
        if (name === 'strstr') {
            const a = this.parseArgs(argTokens, env);
            const h = this.valToStr(a[0]), n = this.valToStr(a[1]);
            const pos = h.indexOf(n);
            return pos >= 0 ? pos + 1 : 0;
        }
        if (name === 'strchr') {
            const a = this.parseArgs(argTokens, env);
            const s = this.valToStr(a[0]), c = String.fromCharCode(Number(a[1]) || 0);
            const pos = s.indexOf(c);
            return pos >= 0 ? pos + 1 : 0;
        }

        if (name === 'abs' || name === 'fabs' || name === 'labs') {
            const a = this.parseArgs(argTokens, env);
            return Math.abs(Number(a[0]) || 0);
        }
        if (name === 'sqrt') { const a = this.parseArgs(argTokens, env); return Math.sqrt(Number(a[0]) || 0); }
        if (name === 'pow') { const a = this.parseArgs(argTokens, env); return Math.pow(Number(a[0]) || 0, Number(a[1]) || 0); }
        if (name === 'floor') { const a = this.parseArgs(argTokens, env); return Math.floor(Number(a[0]) || 0); }
        if (name === 'ceil') { const a = this.parseArgs(argTokens, env); return Math.ceil(Number(a[0]) || 0); }
        if (name === 'round') { const a = this.parseArgs(argTokens, env); return Math.round(Number(a[0]) || 0); }
        if (name === 'fmod') { const a = this.parseArgs(argTokens, env); return Number(a[0]) % Number(a[1]); }
        if (name === 'sin') { const a = this.parseArgs(argTokens, env); return Math.sin(Number(a[0]) || 0); }
        if (name === 'cos') { const a = this.parseArgs(argTokens, env); return Math.cos(Number(a[0]) || 0); }
        if (name === 'tan') { const a = this.parseArgs(argTokens, env); return Math.tan(Number(a[0]) || 0); }

        if (name === 'malloc' || name === 'calloc') return { __ptr: true, target: '__heap', offset: 1 };
        if (name === 'free') return 0;
        if (name === 'atoi') { const a = this.parseArgs(argTokens, env); return parseInt(this.valToStr(a[0]), 10) || 0; }
        if (name === 'atof') { const a = this.parseArgs(argTokens, env); return parseFloat(this.valToStr(a[0])) || 0.0; }
        if (name === 'rand') return Math.floor(Math.random() * 32767);
        if (name === 'srand') return 0;
        if (name === 'exit') return 0;

        // Simulated File System (<stdio.h> for Chapter 15 & Floor 15)
        if (name === 'fopen') {
            const a = this.parseArgs(argTokens, env);
            const filename = this.valToStr(a[0]) || 'default.dat';
            const mode = this.valToStr(a[1]) || 'r';
            if (mode.includes('w')) {
                this.simFiles[filename] = [];
            } else if (!this.simFiles[filename]) {
                this.simFiles[filename] = [];
            }
            const handle = {
                __file: true,
                filename,
                mode,
                readPos: 0,
                id: this.fileHandles.length + 1
            };
            this.fileHandles.push(handle);
            return handle;
        }
        if (name === 'fprintf') {
            const groups = this.extractArgGroups(argTokens);
            if (groups.length >= 2) {
                const fileHandle = this.evalTokens(groups[0], env);
                const formatted = this.formatPrintf(groups.slice(1).flat(), env);
                if (fileHandle && fileHandle.__file && this.simFiles[fileHandle.filename]) {
                    const parts = formatted.split('\n');
                    for (let i = 0; i < parts.length; i++) {
                        if (i === parts.length - 1 && parts[i] === '') continue;
                        this.simFiles[fileHandle.filename].push(parts[i] + '\n');
                    }
                }
            }
            return 0;
        }
        if (name === 'fgets') {
            const groups = this.extractArgGroups(argTokens);
            if (groups.length >= 3) {
                const fileHandle = this.evalTokens(groups[2], env);
                if (fileHandle && fileHandle.__file && this.simFiles[fileHandle.filename]) {
                    const lines = this.simFiles[fileHandle.filename];
                    if (fileHandle.readPos < lines.length) {
                        const line = lines[fileHandle.readPos++];
                        this.assignTarget(groups[0], '=', line, env);
                        return line;
                    }
                }
            }
            return 0;
        }
        if (name === 'fputs') {
            const a = this.parseArgs(argTokens, env);
            const str = this.valToStr(a[0]);
            const fileHandle = a[1];
            if (fileHandle && fileHandle.__file && this.simFiles[fileHandle.filename]) {
                this.simFiles[fileHandle.filename].push(str);
            }
            return 0;
        }
        if (name === 'fclose') {
            return 0;
        }
        if (name === 'feof') {
            const a = this.parseArgs(argTokens, env);
            const fileHandle = a[0];
            if (fileHandle && fileHandle.__file && this.simFiles[fileHandle.filename]) {
                return fileHandle.readPos >= this.simFiles[fileHandle.filename].length ? 1 : 0;
            }
            return 1;
        }
        if (name === 'rewind') {
            const a = this.parseArgs(argTokens, env);
            const fileHandle = a[0];
            if (fileHandle && fileHandle.__file) fileHandle.readPos = 0;
            return 0;
        }

        // User-defined Function
        const func = this.functions[name];
        if (!func) return 0;
        if (this.callStack.length >= this.maxRecursion) throw new CError(`Recursão máxima excedida em ${name}()`);

        const args = this.parseArgs(argTokens, env);
        const local = {};
        for (let p = 0; p < func.params.length; p++) {
            const param = func.params[p];
            const pn = param.name;
            const argVal = args[p];

            if (param.isPtr && argVal && argVal.__ptr) {
                local[pn] = argVal;
            } else if (param.isArray && argVal && argVal.type === 'array') {
                local[pn] = argVal;
            } else if (argVal && typeof argVal === 'object' && argVal.type === 'struct') {
                local[pn] = { type: 'struct', structName: argVal.structName, fields: JSON.parse(JSON.stringify(argVal.fields || {})) };
            } else {
                local[pn] = { type: 'var', varType: param.type, value: argVal !== undefined ? argVal : 0 };
            }
        }

        this.callStack.push(name);
        const result = this.execBlock(func.body, local);
        this.callStack.pop();
        return result !== undefined ? result : 0;
    }

    extractArgGroups(argTokens) {
        let groups = [];
        let cur = [];
        let depth = 0;
        for (const t of argTokens) {
            if (t.value === '(' || t.value === '[' || t.value === '{') depth++;
            if (t.value === ')' || t.value === ']' || t.value === '}') depth--;
            if (t.value === ',' && depth === 0) {
                groups.push(cur);
                cur = [];
            } else {
                cur.push(t);
            }
        }
        if (cur.length > 0) groups.push(cur);
        return groups;
    }

    parseArgs(argTokens, env) {
        const groups = this.extractArgGroups(argTokens);
        return groups.map(g => this.evalTokens(g, env));
    }

    // ── printf Formatting ──
    formatPrintf(argTokens, env) {
        const groups = this.extractArgGroups(argTokens);
        if (groups.length === 0) return '';
        const fmtVal = this.evalTokens(groups[0], env);
        let fmt = this.valToStr(fmtVal);

        let ai = 1;
        let result = '';
        for (let i = 0; i < fmt.length; i++) {
            if (fmt[i] === '%' && i + 1 < fmt.length) {
                i++;
                if (fmt[i] === '%') { result += '%'; continue; }

                let precision = null;
                if (fmt[i] === '.') {
                    i++;
                    let precStr = '';
                    while (i < fmt.length && /\d/.test(fmt[i])) {
                        precStr += fmt[i++];
                    }
                    precision = precStr.length > 0 ? parseInt(precStr, 10) : 0;
                }

                const c = fmt[i];
                let arg = (ai < groups.length) ? this.evalTokens(groups[ai++], env) : 0;
                if (typeof arg === 'object' && arg !== null && arg.__isFloat) {
                    arg = arg.value;
                }

                if (c === 'd' || c === 'i' || c === 'u' || c === 'ld' || c === 'lu') {
                    result += String(Math.trunc(Number(arg)) || 0);
                } else if (c === 'x' || c === 'X') {
                    const hex = ((Number(arg) || 0) >>> 0).toString(16);
                    result += c === 'X' ? hex.toUpperCase() : hex;
                } else if (c === 'f' || c === 'lf') {
                    const decimals = precision !== null ? precision : 2;
                    result += Number(arg).toFixed(decimals);
                } else if (c === 'c') {
                    result += typeof arg === 'string' ? (arg[0] || '') : String.fromCharCode(Number(arg) || 0);
                } else if (c === 's') {
                    result += this.valToStr(arg);
                } else if (c === 'p') {
                    result += '0x' + ((Number(arg) || 0) >>> 0).toString(16);
                } else {
                    result += '%' + (precision !== null ? ('.' + precision) : '') + (c || '');
                }
            } else {
                result += fmt[i];
            }
        }
        return result;
    }

    // ── scanf Execution ──
    execScanf(argTokens, env) {
        const groups = this.extractArgGroups(argTokens);
        if (groups.length === 0) return 0;

        const fmtVal = this.evalTokens(groups[0], env);
        const fmt = this.valToStr(fmtVal);
        let matchIndex = 1;

        const specifiers = fmt.match(/%[dfcsl]/g) || [];
        for (const spec of specifiers) {
            if (matchIndex >= groups.length) break;
            let targetTokens = groups[matchIndex++];

            // Strip leading & if present: &mana -> mana
            if (targetTokens.length > 0 && targetTokens[0].value === '&') {
                targetTokens = targetTokens.slice(1);
            }

            let inputVal;
            if (this.stdinTokens && this.stdinIndex < this.stdinTokens.length) {
                inputVal = this.stdinTokens[this.stdinIndex++];
            } else if (typeof this.inputCallback === 'function') {
                // Interactive prompt via UI callback (espera input interativo do usuário)
                const varName = targetTokens.map(t => t.value).join('');
                inputVal = this.inputCallback(varName, spec);
                if (inputVal === null || inputVal === undefined) inputVal = '0';
            } else {
                inputVal = '0';
            }

            let parsedVal;
            if (spec === '%d' || spec === '%i' || spec === '%ld') {
                parsedVal = parseInt(inputVal, 10);
                if (isNaN(parsedVal)) parsedVal = 0;
            } else if (spec === '%f' || spec === '%lf') {
                parsedVal = parseFloat(inputVal);
                if (isNaN(parsedVal)) parsedVal = 0.0;
            } else if (spec === '%c') {
                parsedVal = String(inputVal).charCodeAt(0) || 0;
            } else if (spec === '%s') {
                parsedVal = String(inputVal);
            } else {
                parsedVal = inputVal;
            }

            this.assignTarget(targetTokens, '=', parsedVal, env);
        }
        return specifiers.length;
    }

    // ── Utility Functions ──
    valToStr(v) {
        if (v === null || v === undefined) return '';
        if (typeof v === 'string') return v;
        if (typeof v === 'number') return String(v);
        if (typeof v === 'object') {
            if (v.__isFloat) return String(v.value);
            if (v.__ptr) {
                const targetEnv = v.scope || {};
                const obj = this.getVar(v.target, targetEnv);
                if (obj && obj.values && obj.elemType === 'char') {
                    let s = '';
                    const start = v.offset || 0;
                    for (let i = start; i < obj.values.length; i++) {
                        const ch = obj.values[i];
                        if (ch === 0) break;
                        s += String.fromCharCode(ch);
                    }
                    return s;
                }
                return this.valToStr(this.getPointerVal(v, {}));
            }
            if (v.values && v.elemType === 'char') {
                let s = '';
                for (const c of v.values) {
                    if (c === 0) break;
                    s += String.fromCharCode(c);
                }
                return s;
            }
            if (v.values) return v.values.join(' ');
            if (v.fields) return JSON.stringify(v.fields);
        }
        return String(v);
    }

    truthy(v) {
        if (v === null || v === undefined) return false;
        if (typeof v === 'boolean') return v;
        if (typeof v === 'number') return v !== 0;
        if (typeof v === 'string') return v.length > 0;
        if (typeof v === 'object') return true;
        return !!v;
    }

    extractGroup(tokens, start, open, close) {
        if (start >= tokens.length || tokens[start].value !== open) return { tokens: [], end: start };
        let depth = 1;
        let i = start + 1;
        let inner = [];
        while (i < tokens.length && depth > 0) {
            if (tokens[i].value === open) depth++;
            if (tokens[i].value === close) { depth--; if (depth === 0) { i++; break; } }
            inner.push(tokens[i]);
            i++;
        }
        return { tokens: inner, end: i };
    }
}

// ── Tokenizer ──
class Tokenizer {
    constructor(code) {
        this.code = code || '';
        this.pos = 0;
        this.tokens = [];
        this.tokenize();
        this.idx = 0;
    }

    tokenize() {
        while (this.pos < this.code.length) {
            let ch = this.code[this.pos];
            if (/\s/.test(ch)) { this.pos++; continue; }

            // Comments
            if (ch === '/' && this.pos + 1 < this.code.length) {
                if (this.code[this.pos + 1] === '/') {
                    while (this.pos < this.code.length && this.code[this.pos] !== '\n') this.pos++;
                    continue;
                }
                if (this.code[this.pos + 1] === '*') {
                    this.pos += 2;
                    while (this.pos + 1 < this.code.length && !(this.code[this.pos] === '*' && this.code[this.pos + 1] === '/')) this.pos++;
                    this.pos += 2;
                    continue;
                }
            }

            // Strings: "..."
            if (ch === '"') {
                this.pos++;
                let s = '';
                while (this.pos < this.code.length && this.code[this.pos] !== '"') {
                    if (this.code[this.pos] === '\\') {
                        this.pos++;
                        const esc = this.code[this.pos];
                        s += esc === 'n' ? '\n' : esc === 't' ? '\t' : esc === 'r' ? '\r' : esc === '0' ? '\0' : esc;
                    } else {
                        s += this.code[this.pos];
                    }
                    this.pos++;
                }
                if (this.pos < this.code.length) this.pos++;
                this.tokens.push({ type: 'STRING', value: s });
                continue;
            }

            // Characters: '...'
            if (ch === "'") {
                this.pos++;
                let c = '';
                if (this.code[this.pos] === '\\') {
                    this.pos++;
                    const esc = this.code[this.pos];
                    c = esc === 'n' ? '\n' : esc === 't' ? '\t' : esc === '0' ? '\0' : esc;
                } else {
                    c = this.code[this.pos];
                }
                this.pos++;
                if (this.pos < this.code.length && this.code[this.pos] === "'") this.pos++;
                this.tokens.push({ type: 'CHAR', value: c });
                continue;
            }

            // Numbers: hex, decimals, integers with suffixes
            if (/[0-9]/.test(ch)) {
                let n = '';
                if (ch === '0' && this.pos + 1 < this.code.length && 'xX'.includes(this.code[this.pos + 1])) {
                    n = '0x'; this.pos += 2;
                    while (this.pos < this.code.length && /[0-9a-fA-F]/.test(this.code[this.pos])) { n += this.code[this.pos]; this.pos++; }
                } else {
                    while (this.pos < this.code.length && /[0-9.]/.test(this.code[this.pos])) { n += this.code[this.pos]; this.pos++; }
                }
                while (this.pos < this.code.length && /[fFlLuU]/.test(this.code[this.pos])) { this.pos++; }
                this.tokens.push({ type: 'NUMBER', value: n });
                continue;
            }

            // Identifiers / Keywords
            if (/[a-zA-Z_]/.test(ch)) {
                let id = '';
                while (this.pos < this.code.length && /[a-zA-Z0-9_]/.test(this.code[this.pos])) { id += this.code[this.pos]; this.pos++; }
                this.tokens.push({ type: 'IDENT', value: id });
                continue;
            }

            // Multi-char operators
            const two = this.code.substring(this.pos, this.pos + 2);
            const three = this.code.substring(this.pos, this.pos + 3);

            if (three === '<<=' || three === '>>=') {
                this.tokens.push({ type: 'OP', value: three });
                this.pos += 3;
                continue;
            }

            if (['->', '==', '!=', '<=', '>=', '&&', '||', '++', '--', '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '<<', '>>'].includes(two)) {
                this.tokens.push({ type: 'OP', value: two });
                this.pos += 2;
                continue;
            }

            // Single-char operators
            if ('+-*/%=<>&|!~^?:'.includes(ch)) {
                this.tokens.push({ type: 'OP', value: ch });
                this.pos++;
                continue;
            }

            // Punctuation
            if ('(){}[].,;'.includes(ch)) {
                this.tokens.push({ type: 'PUNCT', value: ch });
                this.pos++;
                continue;
            }

            this.pos++;
        }
        this.tokens.push({ type: 'EOF', value: '' });
    }

    hasMore() { return this.idx < this.tokens.length; }
    peek() { return this.tokens[this.idx] || { type: 'EOF', value: '' }; }
    next() { return this.tokens[this.idx++] || { type: 'EOF', value: '' }; }
}
