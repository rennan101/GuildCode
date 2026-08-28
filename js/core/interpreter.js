/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — C Interpreter v2
   ═══════════════════════════════════════════════════════════════ */

class CInterpreter {
    constructor() { this.reset(); }

    reset(stdin = '') {
        this.output = [];
        this.errors = [];
        this.globals = {};
        this.functions = {};
        this.structDefs = {};
        this.callStack = [];
        this.simFiles = {};
        this.stepCount = 0;
        this.maxSteps = 10000;
        this.maxRecursion = 200;
        this.stdinTokens = typeof stdin === 'string' 
            ? stdin.trim().split(/\s+/).filter(Boolean)
            : (Array.isArray(stdin) ? [...stdin] : []);
        this.stdinIndex = 0;
    }

    execute(code, stdin = '') {
        this.reset(stdin);
        try {
            const src = this.stripComments(code);
            this.parseTopLevel(src);
            this.callMain();
            return { success: true, output: this.output.join(''), errors: [] };
        } catch (e) {
            const msg = e instanceof CError ? e.message : `Erro interno: ${e.message}`;
            this.errors.push(msg);
            return { success: false, output: this.output.join(''), errors: this.errors };
        }
    }

    stripComments(code) {
        return code.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/#include\s*[<"][^>"]+[>"]/g, '');
    }

    // ── Top-level parsing ──
    parseTopLevel(src) {
        const tok = new Tokenizer(src);
        while (tok.hasMore() && tok.peek().type !== 'EOF') {
            this.parseTopLevelItem(tok);
        }
    }

    parseTopLevelItem(tok) {
        const first = tok.peek();
        if (first.type === 'EOF') return;

        // Collect all tokens for this item
        let tokens = this.collectStatement(tok);
        if (tokens.length === 0) return;

        // struct definition?
        if (tokens[0].value === 'struct' && this.findBrace(tokens) >= 0) {
            this.parseStructDef(tokens);
            return;
        }

        // function?
        if (this.isType(tokens[0].value) && this.findParen(tokens) >= 0) {
            this.parseFunctionDef(tokens);
            return;
        }

        // global variable
        this.parseGlobalVar(tokens);
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
        return ['int', 'char', 'void', 'float', 'double', 'long', 'short', 'unsigned', 'struct'].includes(v);
    }

    // ── Struct definition ──
    parseStructDef(tokens) {
        let name = '';
        let i = 0;
        if (tokens[i].value === 'struct') i++;
        if (i < tokens.length && tokens[i].type === 'IDENT') name = tokens[i++].value;
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
            if (t.value === '[') { fArr = true; continue; }
            if (t.value === ']') continue;
            if (t.value === '{') continue;
            if (this.isType(t.value)) fType += (fType ? ' ' : '') + t.value;
            else if (t.value === '*') fType += '*';
            else if (t.type === 'IDENT' && !fName) fName = t.value;
            else if (t.type === 'NUMBER' && fArr) fArrSz = parseInt(t.value);
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
                    if (depth === 0) { i++; break; } // skip ) too
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

    // ── Global variable ──
    parseGlobalVar(tokens) {
        let i = 0;
        let type = '';
        while (i < tokens.length && this.isType(tokens[i].value)) {
            type += (type ? ' ' : '') + tokens[i].value;
            i++;
        }
        while (i < tokens.length && tokens[i].value === '*') i++;
        let name = '';
        if (i < tokens.length && tokens[i].type === 'IDENT') name = tokens[i++].value;
        if (!name) return;

        if (i < tokens.length && tokens[i].value === '[') {
            i++;
            let szTokens = [];
            while (i < tokens.length && tokens[i].value !== ']') szTokens.push(tokens[i++]);
            i++; // skip ]
            const size = szTokens.length > 0 ? this.constExpr(szTokens) : 10;
            let init = [];
            if (i < tokens.length && tokens[i].value === '=') {
                i++;
                init = this.parseInitList(tokens, i);
            }
            const vals = new Array(size).fill(0);
            if (init.length > 0 && typeof init[0] === 'string') {
                const s = init[0];
                for (let j = 0; j < size && j < s.length; j++) vals[j] = s.charCodeAt(j);
                vals[size - 1] = 0;
            } else {
                for (let j = 0; j < size && j < init.length; j++) vals[j] = init[j];
            }
            this.globals[name] = { type: 'array', elemType: type, size, values: vals };
        } else if (i < tokens.length && tokens[i].value === '=') {
            i++;
            const val = this.evalTokens(tokens.slice(i));
            this.globals[name] = { type: 'var', varType: type, value: val };
        } else {
            this.globals[name] = { type: 'var', varType: type, value: 0 };
        }
    }

    parseInitList(tokens, start) {
        let vals = [];
        let i = start;
        if (i >= tokens.length) return vals;
        if (tokens[i].type === 'STRING') { vals.push(tokens[i].value); return vals; }
        if (tokens[i].value === '{') {
            i++; // skip opening {
            let depth = 1;
            let current = [];
            while (i < tokens.length && depth > 0) {
                const tk = tokens[i];
                if (tk.value === '{') {
                    // If at depth 1, this starts a sub-array — parse it recursively
                    if (depth === 1) {
                        if (current.length > 0) { vals.push(this.evalTokens(current)); current = []; }
                        const sub = this.parseInitList(tokens, i);
                        vals.push(sub);
                        // Advance i past the sub-array
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
                        vals.push(this.evalTokens(current));
                        current = [];
                    }
                    i++;
                    continue;
                }
                current.push(tk);
                i++;
            }
            if (current.length > 0) vals.push(this.evalTokens(current));
        } else {
            while (i < tokens.length && tokens[i].value !== ';') {
                if (tokens[i].value === ',') { i++; continue; }
                vals.push(this.evalTokens([tokens[i]]));
                i++;
            }
        }
        return vals;
    }

    constExpr(tokens) {
        try { return parseInt(tokens.map(t => t.value).join('')) || 0; } catch { return 0; }
    }

    // ── Main ──
    callMain() {
        if (!this.functions['main']) throw new CError('Função main() não encontrada');
        this.execBlock(this.functions['main'].body, {});
    }

    // ── Block execution ──
    // Helper: extract a block-or-single-statement from body[start]
    // Returns { tokens, end } where tokens is the body to execute
    extractStmtBody(body, start) {
        if (start >= body.length) return { tokens: [], end: start };
        if (body[start].value === '{') {
            return this.extractGroup(body, start, '{', '}');
        }
        // Single statement — collect up to ';' at depth 0
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

            // break
            if (t.value === 'break') {
                i++;
                if (i < body.length && body[i].value === ';') i++;
                env.__brk = true;
                break;
            }

            // continue
            if (t.value === 'continue') {
                i++;
                if (i < body.length && body[i].value === ';') i++;
                env.__cont = true;
                break;
            }

            // return
            if (t.value === 'return') {
                i++;
                let expr = [];
                while (i < body.length && body[i].value !== ';') expr.push(body[i++]);
                if (i < body.length) i++; // skip ;
                env.__ret = true;
                env.__retval = this.evalTokens(expr, env);
                return env.__retval;
            }

            // if
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
                    // Skip else/else-if branch
                    i = this.skipElseChain(body, i);
                } else {
                    i = this.skipElseBranch(body, i, env);
                }
                continue;
            }

            // while
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

            // for
            if (t.value === 'for') {
                i++;
                const paren = this.extractGroup(body, i, '(', ')');
                i = paren.end;
                const fTokens = paren.tokens;
                // Split by ;
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
                // Update i to after the for body
                const forBody = this.extractStmtBody(body, i);
                i = forBody.end;
                continue;
            }

            // { block
            if (t.value === '{') {
                const block = this.extractGroup(body, i, '{', '}');
                i = block.end;
                this.execBlock(block.tokens, env);
                if (env.__ret) return env.__retval;
                continue;
            }

            // printf
            if (t.value === 'printf') {
                i++;
                const paren = this.extractGroup(body, i, '(', ')');
                i = paren.end;
                if (i < body.length && body[i].value === ';') i++;
                this.output.push(this.formatPrintf(paren.tokens, env));
                continue;
            }

            // scanf
            if (t.value === 'scanf') {
                i++;
                const paren = this.extractGroup(body, i, '(', ')');
                i = paren.end;
                if (i < body.length && body[i].value === ';') i++;
                this.execScanf(paren.tokens, env);
                continue;
            }

            // puts
            if (t.value === 'puts') {
                i++;
                const paren = this.extractGroup(body, i, '(', ')');
                i = paren.end;
                if (i < body.length && body[i].value === ';') i++;
                const val = this.evalTokens(paren.tokens, env);
                this.output.push(this.valToStr(val));
                continue;
            }

            // strlen, strcmp, strcpy, abs
            if (['strlen', 'strcmp', 'strcpy', 'strcat', 'abs', 'malloc', 'free'].includes(t.value)) {
                i++;
                const paren = this.extractGroup(body, i, '(', ')');
                i = paren.end;
                if (i < body.length && body[i].value === ';') i++;
                continue;
            }

            // struct or type declaration
            if (this.isType(t.value)) {
                let stmt = this.readFullStatement(body, i);
                i = stmt.end;
                this.execStmt(stmt.tokens, env);
                continue;
            }

            // *ptr = expr (dereference assignment)
            if (t.value === '*' && i + 1 < body.length && body[i+1].type === 'IDENT') {
                let ptrName = body[i+1].value;
                let j = i + 2;
                if (j < body.length && body[j].value === '=') {
                    j++;
                    let expr = [];
                    while (j < body.length && body[j].value !== ';') expr.push(body[j++]);
                    i = j + 1;
                    let val = this.evalTokens(expr, env);
                    let ptr = this.getVar(ptrName, env);
                    // ptr could be {__ptr, target} or {type:'var', value:{__ptr, target}}
                    let ptrInfo = null;
                    if (ptr && typeof ptr === 'object' && ptr.__ptr) ptrInfo = ptr;
                    else if (ptr && ptr.value && typeof ptr.value === 'object' && ptr.value.__ptr) ptrInfo = ptr.value;
                    if (ptrInfo) {
                        this.setVar(ptrInfo.target, val, env);
                    }
                    continue;
                }
            }

            // assignment: name = expr  or name[idx] = expr  or name.field = expr
            if (t.type === 'IDENT') {
                let j = i + 1;
                if (j < body.length && body[j].value === '=') {
                    // assignment
                    let name = t.value;
                    let expr = [];
                    j = j + 1;
                    while (j < body.length && body[j].value !== ';') expr.push(body[j++]);
                    i = j + 1; // skip ;
                    this.setVar(name, this.evalTokens(expr, env), env);
                    continue;
                }
                // i++ or i-- (post-increment/decrement)
                if (j < body.length && (body[j].value === '++' || body[j].value === '--')) {
                    let name = t.value;
                    let op = body[j].value;
                    let oldVal = this.getVarVal(name, env);
                    this.setVar(name, op === '++' ? oldVal + 1 : oldVal - 1, env);
                    i = j + 1;
                    if (i < body.length && body[i].value === ';') i++;
                    continue;
                }
                if (j < body.length && body[j].value === '[') {
                    // array access
                    let name = t.value;
                    let arrIdx = this.extractGroup(body, j, '[', ']');
                    j = arrIdx.end;
                    let idx1 = this.evalTokens(arrIdx.tokens, env);
                    let idx2 = null;
                    if (j < body.length && body[j].value === '[') {
                        let arrIdx2 = this.extractGroup(body, j, '[', ']');
                        j = arrIdx2.end;
                        idx2 = this.evalTokens(arrIdx2.tokens, env);
                    }
                    if (j < body.length && body[j].value === '=') {
                        j++;
                        let expr = [];
                        while (j < body.length && body[j].value !== ';') expr.push(body[j++]);
                        i = j + 1;
                        let val = this.evalTokens(expr, env);
                        let arr = this.getVar(name, env);
                        if (arr && arr.values) {
                            if (idx2 !== null) {
                                let cols = arr.size2 || Math.ceil(Math.sqrt(arr.values.length));
                                arr.values[idx1 * cols + idx2] = val;
                            } else {
                                arr.values[idx1] = val;
                            }
                        }
                        continue;
                    }
                    if (j < body.length && body[j].value === ';') j++;
                    i = j;
                    continue;
                }
                if (j < body.length && body[j].value === '(') {
                    // function call
                    let paren = this.extractGroup(body, j, '(', ')');
                    let funcName = t.value;
                    this.callFunc(funcName, paren.tokens, env);
                    i = paren.end;
                    if (i < body.length && body[i].value === ';') i++;
                    continue;
                }
                if (j < body.length && body[j].value === '.') {
                    // struct member access
                    j++;
                    let field = '';
                    if (j < body.length && body[j].type === 'IDENT') field = body[j++].value;
                    if (j < body.length && body[j].value === '[') {
                        let bracket = this.extractGroup(body, j, '[', ']');
                        j = bracket.end + 1;
                    }
                    if (j < body.length && body[j].value === '=') {
                        j++;
                        let expr = [];
                        while (j < body.length && body[j].value !== ';') expr.push(body[j++]);
                        i = j + 1;
                        continue;
                    }
                    if (j < body.length && body[j].value === ';') j++;
                    i = j;
                    continue;
                }
                i++;
                continue;
            }

            i++;
        }
        return env.__retval;
    }

    // Skip else branch when condition was false
    skipElseBranch(body, i, env) {
        if (i >= body.length || body[i].value !== 'else') return i;
        i++; // skip 'else'
        if (i < body.length && body[i].value === 'if') {
            // else if — re-execute via continue pattern
            // We need to handle else-if by re-entering the if handler
            // Set i back so the main loop picks up 'if'
            return i;
        }
        const elseB = this.extractStmtBody(body, i);
        i = elseB.end;
        this.execBlock(elseB.tokens, env);
        return i;
    }

    // Skip else/else-if chain when if-condition was true
    skipElseChain(body, i) {
        while (i < body.length && body[i].value === 'else') {
            i++; // skip 'else'
            if (i < body.length && body[i].value === 'if') {
                i++;
                const eiCond = this.extractGroup(body, i, '(', ')');
                i = eiCond.end;
                const eiBody = this.extractStmtBody(body, i);
                i = eiBody.end;
            } else {
                const elseB = this.extractStmtBody(body, i);
                i = elseB.end;
                break;
            }
        }
        return i;
    }

    execForBody(init, cond, inc, fullBody, startIdx, env) {
        this.execStmt(init, env);
        let iter = 0;
        while (true) {
            if (cond.length > 0 && !this.truthy(this.evalTokens(cond, env))) break;
            if (++iter > this.maxSteps) throw new CError('Loop for infinito?');
            const body = this.extractStmtBody(fullBody, startIdx);
            this.execBlock(body.tokens, env);
            if (env.__ret) break;
            if (env.__brk) { env.__brk = false; break; }
            if (env.__cont) { env.__cont = false; this.execStmt(inc, env); continue; }
            this.execStmt(inc, env);
        }
    }

    readFullStatement(body, start) {
        let tokens = [];
        let i = start;
        let depth = 0;
        while (i < body.length) {
            const t = body[i];
            if (t.value === '{') {
                // Allow { if part of an initializer list (=, }, or , precedes it)
                if (depth === 0 && tokens.length > 0) {
                    const last = tokens[tokens.length-1].value;
                    if (last !== '=' && last !== '}' && last !== ',') break;
                }
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

    execStmt(tokens, env) {
        if (!tokens || tokens.length === 0) return;
        let i = 0;
        const first = tokens[0];

        if (first.value === 'return') {
            const val = this.evalTokens(tokens.slice(1), env);
            env.__ret = true;
            env.__retval = val;
            return;
        }

        // Type declaration
        if (this.isType(first.value)) {
            let type = '', ti = 0;
            while (ti < tokens.length && this.isType(tokens[ti].value)) {
                type += (type ? ' ' : '') + tokens[ti].value;
                ti++;
            }
            while (ti < tokens.length && tokens[ti].value === '*') ti++;
            let name = '';
            if (ti < tokens.length && tokens[ti].type === 'IDENT') name = tokens[ti++].value;

            if (name && ti < tokens.length && tokens[ti].value === '[') {
                ti++; // skip [
                let sz = [];
                while (ti < tokens.length && tokens[ti].value !== ']') sz.push(tokens[ti++]);
                if (ti < tokens.length) ti++; // skip ]
                const size1 = sz.length > 0 ? this.constExpr(sz) : 10;
                
                // Check for 2nd dimension
                let size2 = 0;
                let is2D = false;
                if (ti < tokens.length && tokens[ti].value === '[') {
                    is2D = true;
                    ti++;
                    let sz2 = [];
                    while (ti < tokens.length && tokens[ti].value !== ']') sz2.push(tokens[ti++]);
                    if (ti < tokens.length) ti++; // skip ]
                    size2 = sz2.length > 0 ? this.constExpr(sz2) : 10;
                }
                
                // Check for initialization
                let initVals = [];
                if (ti < tokens.length && tokens[ti].value === '=') {
                    ti++;
                    initVals = this.parseInitList(tokens, ti);
                }
                
                if (first.value === 'struct') {
                    const sName = type.replace('struct', '').trim();
                    const fields = this.structDefs[sName] || [];
                    const arr = [];
                    for (let j = 0; j < size1; j++) {
                        const obj = {};
                        for (const f of fields) {
                            obj[f.name] = f.isArray ? new Array(f.arraySize).fill(0) : 0;
                        }
                        arr.push(obj);
                    }
                    this.setVar(name, { type: 'structArray', values: arr, size: size1 }, env);
                } else if (is2D) {
                    const vals = new Array(size1 * size2).fill(0);
                    // initVals is array of arrays from {{1,2,3},{4,5,6}}
                    if (initVals.length > 0 && Array.isArray(initVals[0])) {
                        for (let r = 0; r < size1 && r < initVals.length; r++) {
                            const row = initVals[r];
                            if (Array.isArray(row)) {
                                for (let c = 0; c < size2 && c < row.length; c++) {
                                    vals[r * size2 + c] = row[c];
                                }
                            }
                        }
                    }
                    this.setVar(name, { type: 'array', elemType: type, size: size1, size2, values: vals }, env);
                } else {
                    const vals = new Array(size1).fill(0);
                    if (initVals.length > 0 && typeof initVals[0] === 'string') {
                        const s = initVals[0];
                        for (let j = 0; j < size1 && j < s.length; j++) vals[j] = s.charCodeAt(j);
                    } else {
                        for (let j = 0; j < size1 && j < initVals.length; j++) vals[j] = initVals[j];
                    }
                    this.setVar(name, { type: 'array', elemType: type, size: size1, values: vals }, env);
                }
                return;
            }

            if (first.value === 'struct' && name) {
                const sName = type.replace('struct', '').trim();
                const fields = this.structDefs[sName] || [];
                const obj = {};
                for (const f of fields) {
                    obj[f.name] = f.isArray ? new Array(f.arraySize).fill(0) : 0;
                }
                this.setVar(name, { type: 'struct', fields: obj }, env);
                return;
            }

            if (name) {
                let val = 0;
                if (ti < tokens.length && tokens[ti].value === '=') {
                    ti++;
                    val = this.evalTokens(tokens.slice(ti), env);
                }
                this.setVar(name, val, env);
                return;
            }
        }

        // Assignment
        if (first.type === 'IDENT' && i + 1 < tokens.length && tokens[i + 1].value === '=') {
            const name = first.value;
            const val = this.evalTokens(tokens.slice(2), env);
            this.setVar(name, val, env);
            return;
        }

        // Post-increment/decrement: i++ or i--
        if (first.type === 'IDENT' && i + 1 < tokens.length && (tokens[i + 1].value === '++' || tokens[i + 1].value === '--')) {
            const name = first.value;
            const op = tokens[i + 1].value;
            const oldVal = this.getVarVal(name, env);
            this.setVar(name, op === '++' ? oldVal + 1 : oldVal - 1, env);
            return;
        }

        // Function call
        if (first.type === 'IDENT' && i + 1 < tokens.length && tokens[i + 1].value === '(') {
            const paren = this.extractGroup(tokens, i + 1, '(', ')');
            this.callFunc(first.value, paren.tokens, env);
            return;
        }
    }

    // ── Variable access ──
    getVar(name, env) {
        if (env && env.hasOwnProperty(name) && env[name] && typeof env[name] === 'object' && env[name].type) return env[name];
        if (this.globals[name]) return this.globals[name];
        return null;
    }

    getVarVal(name, env) {
        const v = this.getVar(name, env);
        if (!v) return 0;
        if (v.type === 'var') return v.value;
        return v;
    }

    setVar(name, val, env) {
        if (env && env.hasOwnProperty(name) && env[name] && typeof env[name] === 'object' && env[name].type) {
            env[name].value = val;
        } else if (this.globals[name]) {
            if (val && typeof val === 'object' && val.type) {
                this.globals[name] = val;
            } else {
                this.globals[name].value = val;
            }
        } else {
            if (val && typeof val === 'object' && val.type) {
                this.globals[name] = val;
            } else {
                this.globals[name] = { type: 'var', varType: 'int', value: val };
            }
        }
    }

    // ── Function calls ──
    callFunc(name, argTokens, env) {
        if (name === 'printf') { this.output.push(this.formatPrintf(argTokens, env)); return 0; }
        if (name === 'puts') { const v = this.evalTokens(argTokens, env); this.output.push(this.valToStr(v)); return 0; }
        if (name === 'strlen') { const a = this.parseArgs(argTokens, env); return this.valToStr(a[0]).length; }
        if (name === 'strcmp') { const a = this.parseArgs(argTokens, env); const s1 = this.valToStr(a[0]), s2 = this.valToStr(a[1]); return s1 < s2 ? -1 : s1 > s2 ? 1 : 0; }
        if (name === 'strcpy' || name === 'strcat') return 0;
        if (name === 'abs') { const a = this.parseArgs(argTokens, env); return Math.abs(a[0] || 0); }
        if (name === 'malloc') return 1;
        if (name === 'free') return 0;

        const func = this.functions[name];
        if (!func) return 0;
        if (this.callStack.length >= this.maxRecursion) throw new CError(`Recursão máxima excedida em ${name}()`);

        const args = this.parseArgs(argTokens, env);
        const local = {};
        for (let p = 0; p < func.params.length; p++) {
            const pn = func.params[p].name;
            local[pn] = { type: 'var', varType: func.params[p].type, value: args[p] !== undefined ? args[p] : 0 };
        }
        this.callStack.push(name);
        const result = this.execBlock(func.body, local);
        this.callStack.pop();
        return result || 0;
    }

    parseArgs(argTokens, env) {
        let args = [];
        let current = [];
        let depth = 0;
        for (const t of argTokens) {
            if (t.value === '(') depth++;
            if (t.value === ')') depth--;
            if (t.value === ',' && depth === 0) {
                args.push(this.evalTokens(current, env));
                current = [];
            } else {
                current.push(t);
            }
        }
        if (current.length > 0) args.push(this.evalTokens(current, env));
        return args;
    }

    // ── printf ──
    formatPrintf(argTokens, env) {
        const args = this.parseArgs(argTokens, env);
        if (args.length === 0) return '';
        let fmt = this.valToStr(args[0]);
        let ai = 1;
        let result = '';
        for (let i = 0; i < fmt.length; i++) {
            if (fmt[i] === '%' && i + 1 < fmt.length) {
                i++;
                if (fmt[i] === '%') { result += '%'; continue; }

                // Check for precision like %.1f, %.2f, etc.
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
                if (c === 'd' || c === 'i' || c === 'x' || c === 'X' || c === 'o') {
                    result += String(args[ai++] !== undefined ? Math.trunc(Number(args[ai - 1])) : 0);
                } else if (c === 'f') {
                    const decimals = precision !== null ? precision : 2;
                    result += (args[ai++] !== undefined ? Number(args[ai - 1]).toFixed(decimals) : (0).toFixed(decimals));
                } else if (c === 'c') {
                    result += String.fromCharCode(args[ai++] || 0);
                } else if (c === 's') {
                    result += this.valToStr(args[ai++]);
                } else if (c === 'p') {
                    result += '0x' + ((args[ai++] || 0) >>> 0).toString(16);
                } else {
                    result += '%' + (precision !== null ? ('.' + precision) : '') + (c || '');
                }
            } else {
                result += fmt[i];
            }
        }
        return result;
    }

    // ── scanf ──
    execScanf(argTokens, env) {
        // Parse raw argument token groups separated by comma
        let groups = [];
        let cur = [];
        let depth = 0;
        for (const t of argTokens) {
            if (t.value === '(') depth++;
            if (t.value === ')') depth--;
            if (t.value === ',' && depth === 0) {
                groups.push(cur);
                cur = [];
            } else {
                cur.push(t);
            }
        }
        if (cur.length > 0) groups.push(cur);
        if (groups.length === 0) return 0;

        const fmtVal = this.evalTokens(groups[0], env);
        const fmt = this.valToStr(fmtVal);
        let matchIndex = 1;

        // Parse format specifiers: %d, %f, %c, %s
        const specifiers = fmt.match(/%[dfcs]/g) || [];
        for (const spec of specifiers) {
            if (matchIndex >= groups.length) break;
            const targetTokens = groups[matchIndex++];
            
            // Extract variable name from &var or var
            let varName = '';
            for (const t of targetTokens) {
                if (t.type === 'IDENT') {
                    varName = t.value;
                    break;
                }
            }
            if (!varName) continue;

            const inputVal = (this.stdinTokens && this.stdinIndex < this.stdinTokens.length)
                ? this.stdinTokens[this.stdinIndex++]
                : '0';

            let parsedVal = 0;
            if (spec === '%d') {
                parsedVal = parseInt(inputVal, 10) || 0;
            } else if (spec === '%f') {
                parsedVal = parseFloat(inputVal) || 0.0;
            } else if (spec === '%c') {
                parsedVal = inputVal.charCodeAt(0) || 0;
            } else if (spec === '%s') {
                parsedVal = inputVal;
            }

            this.assignVar(varName, parsedVal, env);
        }
        return specifiers.length;
    }

    // ── Value utilities ──
    valToStr(v) {
        if (v === null || v === undefined) return '';
        if (typeof v === 'number') return String(v);
        if (typeof v === 'string') return v;
        if (typeof v === 'object') {
            if (v.values && v.elemType === 'char') {
                let s = '';
                for (const c of v.values) { if (c === 0) break; s += String.fromCharCode(c); }
                return s;
            }
            if (v.values) return '[' + v.values.join(', ') + ']';
            if (v.fields) return JSON.stringify(v.fields);
        }
        return String(v);
    }

    truthy(v) {
        if (typeof v === 'number') return v !== 0;
        if (typeof v === 'string') return v.length > 0;
        return !!v;
    }

    // ── Group extraction ──
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

    // ── Expression evaluation ──
    evalTokens(tokens, env) {
        if (!tokens || tokens.length === 0) return 0;
        const clean = tokens.filter(t => t.type !== 'WHITESPACE');
        if (clean.length === 0) return 0;
        return this.evalExpr(clean, env, 0).value;
    }

    evalExpr(tokens, env, minPrec) {
        let left = this.evalAtom(tokens, env);

        while (left.idx < tokens.length) {
            const opToken = tokens[left.idx];
            if (!opToken || !this.isOp(opToken.value)) break;
            const prec = this.opPrec(opToken.value);
            if (prec < minPrec) break;

            const op = opToken.value;
            left.idx++;
            const right = this.evalExpr(tokens.slice(left.idx), env, prec + (this.isLeftAssoc(op) ? 1 : 0));
            left.idx = left.idx + right.idx;
            left.value = this.applyOp(op, left.value, right.value, env);
        }

        return left;
    }

    evalAtom(tokens, env) {
        if (tokens.length === 0) return { value: 0, idx: 0 };
        let idx = 0;
        let t = tokens[idx];

        // Unary operators
        if (t.value === '-') { idx++; const inner = this.evalAtom(tokens.slice(idx), env); return { value: -inner.value, idx: idx + inner.idx }; }
        if (t.value === '!') { idx++; const inner = this.evalAtom(tokens.slice(idx), env); return { value: inner.value ? 0 : 1, idx: idx + inner.idx }; }
        if (t.value === '++') { idx++; const inner = this.evalAtom(tokens.slice(idx), env); /* pre-increment */ return { value: inner.value + 1, idx: idx + inner.idx }; }
        if (t.value === '--') { idx++; const inner = this.evalAtom(tokens.slice(idx), env); return { value: inner.value - 1, idx: idx + inner.idx }; }
        if (t.value === '*') { idx++; const inner = this.evalAtom(tokens.slice(idx), env); let pv = inner.value; if (pv && typeof pv === 'object' && pv.__ptr) { return { value: this.getVarVal(pv.target, env), idx: idx + inner.idx }; } if (pv && typeof pv === 'object' && pv.value && pv.value.__ptr) { return { value: this.getVarVal(pv.value.target, env), idx: idx + inner.idx }; } return { value: inner.value || 0, idx: idx + inner.idx }; }
        if (t.value === '&') { idx++; if (idx < tokens.length && tokens[idx].type === 'IDENT') { const name = tokens[idx].value; idx++; return { value: { __ptr: true, target: name }, idx }; } return { value: 0, idx: idx }; }

        // Number
        if (t.type === 'NUMBER') { return { value: parseInt(t.value) || 0, idx: idx + 1 }; }

        // String
        if (t.type === 'STRING') { return { value: t.value, idx: idx + 1 }; }

        // Char
        if (t.type === 'CHAR') { return { value: t.value.charCodeAt(0), idx: idx + 1 }; }

        // Parenthesized expression
        if (t.value === '(') {
            idx++;
            const result = this.evalExpr(tokens.slice(idx), env, 0);
            idx += result.idx;
            if (idx < tokens.length && tokens[idx].value === ')') idx++;
            return { value: result.value, idx };
        }

        // Identifier
        if (t.type === 'IDENT') {
            idx++;
            // Function call
            if (idx < tokens.length && tokens[idx].value === '(') {
                const paren = this.extractGroup(tokens, idx, '(', ')');
                const val = this.callFunc(t.value, paren.tokens, env);
                return { value: val || 0, idx: paren.end };
            }
            // Array access
            if (idx < tokens.length && tokens[idx].value === '[') {
                const bracket = this.extractGroup(tokens, idx, '[', ']');
                idx = bracket.end;
                const arrVal = this.getVarVal(t.name || t.value, env);
                let arrIdx = this.evalTokens(bracket.tokens, env);

                // 2D array
                if (idx < tokens.length && tokens[idx].value === '[') {
                    const bracket2 = this.extractGroup(tokens, idx, '[', ']');
                    idx = bracket2.end;
                    const arrIdx2 = this.evalTokens(bracket2.tokens, env);
                    if (arrVal && arrVal.values) {
                        const cols = arrVal.size2 || Math.ceil(Math.sqrt(arrVal.values.length));
                        const flat = arrIdx * cols + arrIdx2;
                        return { value: flat >= 0 && flat < arrVal.values.length ? arrVal.values[flat] : 0, idx };
                    }
                    return { value: 0, idx };
                }

                if (arrVal && arrVal.values) {
                    const v = arrVal.values[arrIdx];
                    return { value: v !== undefined ? v : 0, idx };
                }
                return { value: 0, idx };
            }
            // Struct member
            if (idx < tokens.length && tokens[idx].value === '.') {
                idx++;
                let field = '';
                if (idx < tokens.length && tokens[idx].type === 'IDENT') { field = tokens[idx].value; idx++; }
                const obj = this.getVarVal(t.value, env);
                if (obj && obj.fields && obj.fields[field] !== undefined) {
                    return { value: obj.fields[field], idx };
                }
                // struct array
                if (idx < tokens.length && tokens[idx].value === '[') {
                    const bracket = this.extractGroup(tokens, idx, '[', ']');
                    idx = bracket.end;
                    const arrIdx = this.evalTokens(bracket.tokens, env);
                    const arr = this.getVarVal(t.value, env);
                    if (arr && arr.values && arr.values[arrIdx] && arr.values[arrIdx].fields) {
                        return { value: arr.values[arrIdx].fields[field] || 0, idx };
                    }
                }
                return { value: 0, idx };
            }
            // Variable
            return { value: this.getVarVal(t.value, env), idx };
        }

        return { value: 0, idx: 1 };
    }

    isOp(v) { return ['+', '-', '*', '/', '%', '<', '>', '<=', '>=', '==', '!=', '&&', '||', '&', '|', '^', '=', '!', '++', '--'].includes(v); }

    opPrec(op) {
        const p = { '=': 2, '||': 3, '&&': 4, '|': 5, '^': 6, '&': 7, '==': 8, '!=': 8, '<': 9, '<=': 9, '>': 9, '>=': 9, '+': 10, '-': 10, '*': 11, '/': 11, '%': 11 };
        return p[op] || 0;
    }

    isLeftAssoc(op) { return op !== '='; }

    applyOp(op, a, b, env) {
        if (op === '+') return a + b;
        if (op === '-') return a - b;
        if (op === '*') return a * b;
        if (op === '/') return b !== 0 ? Math.trunc(a / b) : 0;
        if (op === '%') return b !== 0 ? a % b : 0;
        if (op === '<') return a < b ? 1 : 0;
        if (op === '>') return a > b ? 1 : 0;
        if (op === '<=') return a <= b ? 1 : 0;
        if (op === '>=') return a >= b ? 1 : 0;
        if (op === '==') return a === b ? 1 : 0;
        if (op === '!=') return a !== b ? 1 : 0;
        if (op === '&&') return (a && b) ? 1 : 0;
        if (op === '||') return (a || b) ? 1 : 0;
        if (op === '&') return a & b;
        if (op === '|') return a | b;
        if (op === '^') return a ^ b;
        if (op === '=') return b;
        return 0;
    }
}

class CError extends Error {
    constructor(msg) { super(msg); this.name = 'CError'; }
}

// ── Tokenizer ──
class Tokenizer {
    constructor(code) {
        this.code = code;
        this.pos = 0;
        this.tokens = [];
        this.tokenize();
        this.idx = 0;
    }

    tokenize() {
        while (this.pos < this.code.length) {
            let ch = this.code[this.pos];
            if (/\s/.test(ch)) { this.pos++; continue; }
            if (ch === '/' && this.pos + 1 < this.code.length) {
                if (this.code[this.pos + 1] === '/') { while (this.pos < this.code.length && this.code[this.pos] !== '\n') this.pos++; continue; }
                if (this.code[this.pos + 1] === '*') { this.pos += 2; while (this.pos + 1 < this.code.length && !(this.code[this.pos] === '*' && this.code[this.pos + 1] === '/')) this.pos++; this.pos += 2; continue; }
            }
            if (ch === '"') {
                this.pos++;
                let s = '';
                while (this.pos < this.code.length && this.code[this.pos] !== '"') {
                    if (this.code[this.pos] === '\\') { this.pos++; s += this.code[this.pos] === 'n' ? '\n' : this.code[this.pos] === 't' ? '\t' : this.code[this.pos]; }
                    else s += this.code[this.pos];
                    this.pos++;
                }
                if (this.pos < this.code.length) this.pos++;
                this.tokens.push({ type: 'STRING', value: s });
                continue;
            }
            if (ch === "'") {
                this.pos++;
                let c = this.code[this.pos] === '\\' ? (this.pos++, this.code[this.pos]) : this.code[this.pos];
                this.pos++; if (this.pos < this.code.length) this.pos++;
                this.tokens.push({ type: 'CHAR', value: c });
                continue;
            }
            if (/[0-9]/.test(ch)) {
                let n = '';
                if (ch === '0' && this.pos + 1 < this.code.length && 'xX'.includes(this.code[this.pos + 1])) {
                    n = '0x'; this.pos += 2;
                    while (this.pos < this.code.length && /[0-9a-fA-F]/.test(this.code[this.pos])) { n += this.code[this.pos]; this.pos++; }
                } else {
                    while (this.pos < this.code.length && /[0-9.]/.test(this.code[this.pos])) { n += this.code[this.pos]; this.pos++; }
                }
                this.tokens.push({ type: 'NUMBER', value: n });
                continue;
            }
            if (/[a-zA-Z_]/.test(ch)) {
                let id = '';
                while (this.pos < this.code.length && /[a-zA-Z0-9_]/.test(this.code[this.pos])) { id += this.code[this.pos]; this.pos++; }
                this.tokens.push({ type: 'IDENT', value: id });
                continue;
            }
            if ('+-*/%=<>&|!~^'.includes(ch)) {
                let op = ch; this.pos++;
                if (this.pos < this.code.length && ch === this.code[this.pos] && '+-=&|<>'.includes(ch)) { op += ch; this.pos++; }
                else if (ch === '=' && this.pos < this.code.length && this.code[this.pos] === '=') { op += '='; this.pos++; }
                else if (ch === '!' && this.pos < this.code.length && this.code[this.pos] === '=') { op += '='; this.pos++; }
                else if (ch === '>' && this.pos < this.code.length && this.code[this.pos] === '=') { op += '='; this.pos++; }
                else if (ch === '<' && this.pos < this.code.length && this.code[this.pos] === '=') { op += '='; this.pos++; }
                this.tokens.push({ type: 'OP', value: op });
                continue;
            }
            if ('(){}[]'.includes(ch)) { this.tokens.push({ type: 'PUNCT', value: ch }); this.pos++; continue; }
            if (ch === '.' || ch === ',' || ch === ';') { this.tokens.push({ type: 'PUNCT', value: ch }); this.pos++; continue; }
            this.pos++;
        }
        this.tokens.push({ type: 'EOF', value: '' });
    }

    hasMore() { return this.idx < this.tokens.length; }
    peek() { return this.tokens[this.idx] || { type: 'EOF', value: '' }; }
    next() { return this.tokens[this.idx++] || { type: 'EOF', value: '' }; }
}
