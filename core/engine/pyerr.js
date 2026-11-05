export class PyErr extends Error {
  constructor(msg) { super(msg); this.name = "PyErr"; }
}