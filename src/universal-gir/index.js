'use strict';

let loadFn;

if ((typeof process.versions === 'function' && process.versions().cgjs) || process.versions.cgjs) {
  loadFn = require;
} else {
  const { load } = require('node-gir');
  loadFn = load;

  global.ARGV = null;
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
