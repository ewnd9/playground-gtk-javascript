'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const jscodeshift = require('jscodeshift');
const lebab = require('lebab');
const prettier = require('prettier');

const rootPath = path.resolve(`${__dirname}/..`);

(() => {
  const srcDir = `${rootPath}/vendor/optimisme-examples`;
  const destDir = `${rootPath}/src/universal-gtk-examples/optimisme-examples`;
  const license = 'unspecified';

  run('rm', ['-rf', destDir]);
  run('mkdir', [destDir]);
  run('cp', ['-R', `${srcDir}/assets`, `${destDir}/assets`]);

  transformDirectory({ srcDir, destDir, license });
})();

(() => {
  const srcDir = `${rootPath}/vendor/programmica-examples`;
  const destDir = `${rootPath}/src/universal-gtk-examples/programmica-examples`;
  const license = 'CC0-1.0';

  run('rm', ['-rf', destDir]);
  run('mkdir', [destDir]);
  run('cp', ['-R', `${srcDir}/_resources`, `${destDir}/_resources`]);

  transformDirectory({ srcDir, destDir, license });
})();

function transformDirectory({ srcDir, destDir, license }) {
  fs.readdirSync(srcDir)
    .filter(name => name.endsWith('.js'))
    .forEach(name => {
      transform({
        srcPath: `${srcDir}/${name}`,
        destPath: `${destDir}/${name}`,
        license,
        transforms: [
          `${rootPath}/src/gtk-codemod/transforms/gtk-optimisme-examples.js`,
          `${rootPath}/src/gtk-codemod/transforms/gtk-gjs-imports.js`
        ],
        lebabTransforms: [
          'let',
          'template',
          'class'
        ]
      });
    });
}

function transform({ srcPath, destPath, license, transforms, lebabTransforms }) {
  const content = fs.readFileSync(srcPath, 'utf-8');

  let result = content.replace('#!/usr/bin/gjs', '');

  for (const t of transforms) {
    const mod = require(t);
    result = mod({ source: result }, { jscodeshift }, {});
  }

  const { code, warnings } = lebab.transform(result, lebabTransforms);
  result = code;
  result = prettier.format(result, {
    singleQuote: true
  });

  const srcPathRelative = srcPath.replace(rootPath, '');
  const currentPathRelative = __filename.replace(rootPath, '');

  fs.writeFileSync(destPath, `'use strict'\n\n// transformed from ${srcPathRelative} by ${currentPathRelative}\n// (license ${license})\n\n${result}`);
}

function run(cmd, args, opts = {}) {
  console.log(`$ ${cmd} ${args.join(' ')}`);
  execFileSync(cmd, args, Object.assign({ stdio: 'inherit' }, opts));
}
