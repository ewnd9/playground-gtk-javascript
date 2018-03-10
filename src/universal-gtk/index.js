'use strict';

let loadFn;

if (process.versions.cgjs) {
  loadFn = function(name) {
    try {
      return require(name);
    } catch (e) {
      // @TODO do better
      const res = imports.gi[name];

      if (res) {
        return res;
      } else {
        throw new Error(`Can't find ${name}`);
      }
    }
  };
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
