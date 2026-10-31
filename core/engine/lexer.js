import { PyErr } from "./pyerr.js";

export class PyLexer {
  constructor(src) {
    this.src = src.replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/\t/g, "    ");
    this.pos = 0;
    this.line = 1;
    this.col = 1;
    this.indentStack = [0];
    this.tokens = [];
    this.atStart = true;
  }

  tokenize() {
    while (this.pos < this.src.length) {
      if (this.atStart) {
        this.atStart = false;
        if (this.pos < this.src.length) this.handleIndent();
        if (this.pos >= this.src.length) break;
      }
      const ch = this.src[this.pos];
      if (ch === "\n") { this.newline(); continue; }
      if (ch === " " || ch === "\r") { this.pos++; this.col++; continue; }
      if (ch === "#") { this.skipComment(); continue; }
      const ch2 = this.src[this.pos];
      if (ch2 === '"' || ch2 === "'") { this.string(); continue; }
      if (/[0-9]/.test(ch2)) { this.number(); continue; }
      if (/[A-Za-z_]/.test(ch2)) { this.ident(); continue; }
      if (",.:".includes(ch2)) { this.emit("OPERATOR", ch2); this.pos++; this.col++; continue; }
      if ("()[]".includes(ch2)) { this.emit("BRACKET", ch2); this.pos++; this.col++; continue; }
      if (this.multiCharOp()) continue;
      if ("=!<>+-*/%".includes(ch2)) { this.emit("OPERATOR", ch2); this.pos++; this.col++; continue; }
      throw this.err("Unexpected character \"" + ch2 + "\"");
    }
    this.popIndents();
    this.emit("EOF", null);
    return this.tokens;
  }

  newline() {
    this.pos++; this.col = 1; this.line++;
    if (!this.atStart) this.emit("NEWLINE", null);
    this.atStart = true;
  }

  skipComment() {
    while (this.pos < this.src.length && this.src[this.pos] !== "\n") { this.pos++; this.col++; }
  }

  handleIndent() {
    let spaces = 0;
    while (this.pos < this.src.length && this.src[this.pos] === " ") { spaces++; this.pos++; this.col++; }
    if (this.pos >= this.src.length) return;
    if (this.src[this.pos] === "\n" || this.src[this.pos] === "#") return;
    const top = this.indentStack[this.indentStack.length - 1];
    if (spaces > top) { this.indentStack.push(spaces); this.emit("INDENT", spaces); }
    else if (spaces < top) {
      while (this.indentStack.length > 1 && spaces < this.indentStack[this.indentStack.length - 1]) {
        this.indentStack.pop();
        this.emit("DEDENT", this.indentStack[this.indentStack.length - 1]);
      }
      if (spaces !== this.indentStack[this.indentStack.length - 1]) throw this.err("Indentation doesn't match any block level.");
    }
  }

  popIndents() {
    while (this.indentStack.length > 1) { this.indentStack.pop(); this.emit("DEDENT", 0); }
  }

  number() {
    const start = this.pos;
    let isFloat = false;
    while (this.pos < this.src.length && /[0-9.]/.test(this.src[this.pos])) {
      if (this.src[this.pos] === ".") isFloat = true;
      this.pos++; this.col++;
    }
    const raw = this.src.slice(start, this.pos);
    this.emit("NUMBER", isFloat ? parseFloat(raw) : parseInt(raw, 10));
  }

  string() {
    const quote = this.src[this.pos];
    this.pos++; this.col++;
    let val = "";
    while (this.pos < this.src.length) {
      const ch = this.src[this.pos];
      if (ch === "\\") { this.pos++; this.col++; if (this.pos < this.src.length) { val += this.src[this.pos]; this.pos++; this.col++; } continue; }
      if (ch === quote) { this.pos++; this.col++; this.emit("STRING", val); return; }
      val += ch; this.pos++; this.col++;
    }
    throw this.err("Unterminated string literal");
  }

  ident() {
    const start = this.pos;
    while (this.pos < this.src.length && /[A-Za-z0-9_]/.test(this.src[this.pos])) { this.pos++; this.col++; }
    const word = this.src.slice(start, this.pos);
    const keywords = ["if","elif","else","for","while","def","return","break","continue",
      "True","False","None","and","or","not","in","is"];
    this.emit(keywords.includes(word) ? "KEYWORD" : "IDENT", word);
  }

  multiCharOp() {
    const s = this.src.slice(this.pos, this.pos + 2);
    const ops = ["//","==","!=",">=","<=","+=","-="];
    if (ops.includes(s)) { this.emit("OPERATOR", s); this.pos += 2; this.col += 2; return true; }
    return false;
  }

  emit(type, value) { this.tokens.push({ type, value, line: this.line, col: this.col }); }

  err(msg) { return new PyErr("Line " + this.line + ": " + msg); }
}