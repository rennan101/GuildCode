const fs = require("fs");
const path = require("path");
const CSharpInterpreter = require("../csharp/interpreter.js");

const interp = new CSharpInterpreter();

function testSolution(sol, tests) {
    const res = interp.execute(sol);
    if (res.errors && res.errors.length > 0) {
        return { pass: false, error: "Compilation error: " + JSON.stringify(res.errors) };
    }
    const fullOut = res.output.join("\n").trim();
    for (let t of tests) {
        const exp = String(t.expected).trim();
        if (!fullOut.includes(exp)) {
            return { pass: false, error: `Expected '${exp}' but got: '${fullOut}'` };
        }
    }
    return { pass: true };
}

console.log("Validator engine initialized.");
module.exports = { testSolution };
