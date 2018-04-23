'use strict';

const fs = require('fs');
const path = require('path');
const globby = require('globby');
const babylon = require('babylon');
const generate = require('babel-generator');
const { traverse } = require('babel-core');

const rootPath = path.resolve(`${__dirname}/..`);
const files = globby.sync('*.js', { cwd: `${rootPath}/vendor/gjs/modules/overrides`, absolute: true });

files.forEach(file => {
  const assignments = [];

  const code = fs.readFileSync(file, 'utf-8');
  const ast = babylon.parse(code, { allowReturnOutsideFunction: true });

  const fileName = path.basename(file);
  const mod = fileName.split('.')[0];

  console.log('\n' + mod + '\n');

  traverse(ast, {
    AssignmentExpression(node, parent) {
      const { loc } = node.node;
      const { code: path } = generate.default(node.node.left, {});

      if (path.startsWith(`${mod}.`)) {
        console.log(path, formatLoc(loc));
      }

      assignments.push({ loc, path });
    }
  });
});

function formatLoc(loc) {
  return `${loc.start.line}:${loc.start.column} ${loc.end.line}:${loc.end.column}`;
}
