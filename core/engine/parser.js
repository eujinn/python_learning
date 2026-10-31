import { PyErr } from "./pyerr.js";

export function parse(tokens, { names, commands, gates }) {
  gates = gates || [];
  const p = new Parser(tokens, names || [], commands || [], gates);
  return p.parse();
}

class Parser {
  constructor(tokens, names, commands, gates) {
    this.tokens = tokens;
    this.pos = 0;
    this.names = names.slice();
    this.commands = commands;
    this.gates = gates;
  }

  peek() { return this.tokens[this.pos]; }
  next() { return this.tokens[this.pos++]; }
  check(type, value) { const t = this.peek(); return t && t.type === type && (value === undefined || t.value === value); }
  expect(type, value) {
    const t = this.next();
    if (!t || t.type !== type || (value !== undefined && t.value !== value))
      throw new PyErr("Line " + (t ? t.line : "?") + ": Expected " + (value || type));
    return t;
  }
  skipNewlines() { while (this.check("NEWLINE")) this.next(); }

  gate(g) {
    if (!this.gates.includes(g))
      throw new PyErr("Line " + this.peek().line + ": Hold on! '" + g + "' unlocks in a later lesson.");
  }

  parse() {
    this.skipNewlines();
    const stmts = [];
    while (this.peek() && this.peek().type !== "EOF") {
      this.skipNewlines();
      if (this.peek().type === "EOF") break;
      const s = this.parseStatement();
      if (s) stmts.push(s);
      this.skipNewlines();
    }
    if (!stmts.length) throw new PyErr("Type some code first!");
    return { t: "program", stmts };
  }

  parseBlock(requireColon) {
    const stmts = [];
    if (requireColon) {
      const col = this.peek();
      if (!col || col.type !== "OPERATOR" || col.value !== ":")
        throw new PyErr("Line " + (col ? col.line : "?") + ": Don't forget the colon :");
      this.next();
    }
    this.skipNewlines();
    if (this.check("INDENT")) { this.next(); }
    else return stmts;
    while (this.peek() && this.peek().type !== "EOF") {
      if (this.check("DEDENT")) { this.next(); break; }
      if (this.check("NEWLINE")) { this.next(); continue; }
      const s = this.parseStatement();
      if (s) stmts.push(s);
      this.skipNewlines();
    }
    while (this.check("DEDENT")) this.next();
    return stmts;
  }

  parseStatement() {
    const t = this.peek();
    if (!t) return null;

    if (t.type === "KEYWORD") {
      switch (t.value) {
        case "if": return this.parseIf();
        case "for": return this.parseFor();
        case "while": return this.parseWhile();
        case "def": return this.parseDef();
        case "return": return this.parseReturn();
        case "break": this.next(); return { t: "break", n: t.line };
        case "continue": this.next(); return { t: "continue", n: t.line };
      }
    }

    if (t.type === "IDENT") {
      const idTok = this.next();
      if (this.check("OPERATOR", "=")) return this.parseAssign(idTok);
      if (this.check("OPERATOR", "+=") || this.check("OPERATOR", "-=")) return this.parseAugAssign(idTok);
      if (this.check("BRACKET", "(")) { this.back(); return this.parseCallStmt(); }
      if (this.check("BRACKET", "[")) { this.back(); return this.parseIndexAssign(idTok); }
      if (this.check("OPERATOR", ".")) { this.back(); return this.parseCallStmt(); }
      this.back();
    }

    const expr = this.parseExpr();
    if (expr) return { t: "expr", expr, n: expr.n };
    return null;
  }

  parseIf() {
    this.gate("if");
    const ifTok = this.next();
    const condExpr = this.parseExpr();
    const body = this.parseBlock(true);
    const branches = [{ c: condExpr, b: body, n: ifTok.line }];
    this.skipNewlines();
    while (this.check("KEYWORD", "elif")) {
      this.gate("if");
      this.next();
      const elifCond = this.parseExpr();
      branches.push({ c: elifCond, b: this.parseBlock(true), n: elifCond.n });
      this.skipNewlines();
    }
    let elseBody = null, elseN = 0;
    if (this.check("KEYWORD", "else")) {
      this.next();
      elseBody = this.parseBlock(true);
      elseN = elseBody.length ? elseBody[0].n : 1;
    }
    return { t: "if", br: branches, els: elseBody, elsN: elseN };
  }

  parseFor() {
    this.gate("for_range");
    const forTok = this.next();
    const varTok = this.expect("IDENT");
    this.expect("KEYWORD", "in");
    const iterExpr = this.parseExpr();
    return { t: "for", var: varTok.value, iter: iterExpr, b: this.parseBlock(true), n: forTok.line };
  }

  parseWhile() {
    this.gate("while");
    const whileTok = this.next();
    const condExpr = this.parseExpr();
    return { t: "while", c: condExpr, b: this.parseBlock(true), n: whileTok.line };
  }

  parseDef() {
    this.gate("def");
    const defTok = this.next();
    const nameTok = this.expect("IDENT");
    this.expect("BRACKET", "(");
    const params = [];
    if (!this.check("BRACKET", ")")) {
      params.push(this.expect("IDENT").value);
      while (this.check("OPERATOR", ",")) { this.next(); params.push(this.expect("IDENT").value); }
    }
    this.expect("BRACKET", ")");
    return { t: "def", name: nameTok.value, params, b: this.parseBlock(true), n: defTok.line };
  }

  parseReturn() {
    this.gate("def");
    const retTok = this.next();
    if (this.check("NEWLINE") || this.check("DEDENT") || this.check("EOF") || this.check("EOF"))
      return { t: "return", v: null, n: retTok.line };
    return { t: "return", v: this.parseExpr(), n: retTok.line };
  }

  parseAssign(idTok) {
    this.next();
    const val = this.parseExpr();
    if (!this.names.includes(idTok.value)) this.names.push(idTok.value);
    return { t: "set", k: idTok.value, v: val, n: idTok.line };
  }

  parseAugAssign(idTok) {
    const op = this.next().value;
    const val = this.parseExpr();
    if (!this.names.includes(idTok.value)) this.names.push(idTok.value);
    return { t: "augset", k: idTok.value, op, v: val, n: idTok.line };
  }

  parseIndexAssign(idTok) {
    this.expect("BRACKET", "[");
    const idx = this.parseExpr();
    this.expect("BRACKET", "]");
    this.expect("OPERATOR", "=");
    return { t: "idxset", k: idTok.value, idx, v: this.parseExpr(), n: idTok.line };
  }

  parseCallStmt() {
    const callExpr = this.parseCallOrIdent();
    if (!callExpr || (callExpr.t !== "call" && callExpr.t !== "method_call"))
      throw new PyErr("Line " + (this.peek() ? this.peek().line : "?") + ": Expected a function call.");
    return callExpr;
  }

  parseCallOrIdent() {
    const t = this.peek();
    if (!t || t.type !== "IDENT") return null;
    const idTok = this.next();
    if (this.check("OPERATOR", ".")) {
      this.next();
      const attrTok = this.expect("IDENT");
      if (this.check("BRACKET", "(")) return this.parseMethodCall(idTok.value, attrTok.value);
      return { t: "ident", v: idTok.value + "." + attrTok.value, n: idTok.line };
    }
    if (this.check("BRACKET", "(")) return this.parseCall(idTok.value);
    return { t: "ident", v: idTok.value, n: idTok.line };
  }

  parseExpr() { return this.parseOr(); }

  parseOr() {
    let left = this.parseAnd();
    while (this.check("KEYWORD", "or")) { this.next(); left = { t: "binop", op: "or", left, right: this.parseAnd(), n: left.n }; }
    return left;
  }

  parseAnd() {
    let left = this.parseNot();
    while (this.check("KEYWORD", "and")) { this.next(); left = { t: "binop", op: "and", left, right: this.parseNot(), n: left.n }; }
    return left;
  }

  parseNot() {
    if (this.check("KEYWORD", "not")) { this.next(); return { t: "not", expr: this.parseNot(), n: this.peek() ? this.peek().line : 0 }; }
    return this.parseCompare();
  }

  parseCompare() {
    let left = this.parseAdd();
    while (true) {
      const t = this.peek();
      if (!t) break;
      let op = null;
      if (t.type === "OPERATOR" && ["==","!=","<",">","<=",">="].includes(t.value)) { op = t.value; }
      else if (t.type === "KEYWORD" && t.value === "in") { op = "in"; }
      else break;
      this.next();
      if (op === "in" && this.check("KEYWORD", "not")) { this.next(); op = "not in"; }
      const right = this.parseAdd();
      left = { t: "binop", op, left, right, n: left.n };
    }
    return left;
  }

  parseAdd() {
    let left = this.parseMul();
    while (true) {
      const t = this.peek();
      if (!t || t.type !== "OPERATOR" || (t.value !== "+" && t.value !== "-")) break;
      this.next();
      left = { t: "binop", op: t.value, left, right: this.parseMul(), n: left.n };
    }
    return left;
  }

  parseMul() {
    let left = this.parseUnary();
    while (true) {
      const t = this.peek();
      if (!t || t.type !== "OPERATOR" || !["*","/","//","%"].includes(t.value)) break;
      this.next();
      left = { t: "binop", op: t.value, left, right: this.parseUnary(), n: left.n };
    }
    return left;
  }

  parseUnary() {
    if (this.check("OPERATOR", "-")) { this.next(); const e = this.parseUnary(); return { t: "unary", op: "-", expr: e, n: e.n }; }
    return this.parsePrimary();
  }

  parsePrimary() {
    const t = this.peek();
    if (!t) return null;

    if (t.type === "NUMBER") { this.next(); return { t: "num", v: t.value, n: t.line }; }
    if (t.type === "STRING") { this.next(); return { t: "str", v: t.value, n: t.line }; }
    if (t.type === "KEYWORD") {
      if (t.value === "True") { this.next(); return { t: "bool", v: true, n: t.line }; }
      if (t.value === "False") { this.next(); return { t: "bool", v: false, n: t.line }; }
      if (t.value === "None") { this.next(); return { t: "none", n: t.line }; }
    }

    if (t.type === "IDENT") return this.parseCallOrIdent();

    if (t.type === "BRACKET" && t.value === "(") {
      this.next();
      const expr = this.parseExpr();
      this.expect("BRACKET", ")");
      return expr;
    }

    if (t.type === "BRACKET" && t.value === "[") {
      this.next();
      const items = [];
      if (!this.check("BRACKET", "]")) {
        items.push(this.parseExpr());
        while (this.check("OPERATOR", ",")) { this.next(); items.push(this.parseExpr()); }
      }
      this.expect("BRACKET", "]");
      return { t: "list", items, n: items.length ? items[0].n : 1 };
    }

    return null;
  }

  parseCall(name) {
    this.expect("BRACKET", "(");
    const args = [];
    if (!this.check("BRACKET", ")")) {
      args.push(this.parseExpr());
      while (this.check("OPERATOR", ",")) { this.next(); args.push(this.parseExpr()); }
    }
    this.expect("BRACKET", ")");
    return { t: "call", f: name, args, n: name === "range" ? (args.length ? args[0].n : this.peek().line) : this.peek().line };
  }

  parseMethodCall(obj, method) {
    this.expect("BRACKET", "(");
    const args = [];
    if (!this.check("BRACKET", ")")) {
      args.push(this.parseExpr());
      while (this.check("OPERATOR", ",")) { this.next(); args.push(this.parseExpr()); }
    }
    this.expect("BRACKET", ")");
    return { t: "method_call", obj, method, args, n: this.peek() ? this.peek().line : 0 };
  }

  back() { this.pos--; }
}