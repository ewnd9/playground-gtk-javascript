'use strict';

let loadFn;

if (process.versions.cgjs) {
  loadFn = require;
} else {
  const { load } = require('node-gir');
  loadFn = load;

  const patchedFirstArg = process.argv[1].replace(new RegExp(`^${process.cwd()}/`), '');
  global.ARGV = [patchedFirstArg].concat(process.argv.slice(2));
}

const gir = new Proxy({}, {
  get(oTarget, sKey) {
    if (!oTarget[sKey]) {
      oTarget[sKey] = loadFn(sKey);
    }

    return oTarget[sKey];
  }
});

module.exports = gir;
