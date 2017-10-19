const fs = require("fs");
const builtinModules = require("builtin-modules").slice();
const requireRegexp = /require\(([^\)]+)\)/gi;
const execSync = require("child_process").execSync;

RegExp.prototype.execAll = function(string) {
  var match = null;
  var matches = new Array();
  while ((match = this.exec(string))) {
    var matchArray = [];
    for (i in match) {
      if (parseInt(i) == i) {
        matchArray.push(match[i]);
      }
    }
    matches.push(matchArray);
  }
  return matches;
};

let script = process.env.SCRIPT;

fs.writeFileSync("./script.js", script);

let modules = [];
const ignoreInstallationForModules = builtinModules;
const matches = requireRegexp.execAll(script);
matches.forEach(match => {
  // console.log("match", match[1].replace(/'/g, '"'));
  const moduleName = JSON.parse(match[1].replace(/'/g, '"'));

  if (ignoreInstallationForModules.indexOf(moduleName) != -1) return;

  modules.push(moduleName);
});

if (modules.length > 0) {
  console.log(`installing dependencies ${modules.join(", ")}`);
  const result = execSync(`npm install ${modules.join(" ")}`, {
    stdio: [null, null, "pipe"]
  });
  // console.log(`installed ${moduleName}\nlogs: ${result}`);
}

require("./script.js");
