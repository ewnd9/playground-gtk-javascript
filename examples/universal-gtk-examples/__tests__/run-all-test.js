'use strict';

const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const rootPath = path.resolve(`${__dirname}/..`);
const cgjsBinary = path.resolve(`${__dirname}/../../../node_modules/.bin/cgjs`);

runEachFile(`${rootPath}/optimisme-examples`);
runEachFile(`${rootPath}/programmica-examples`);

function runEachFile(dir) {
  fs.readdirSync(dir)
    .filter(name => name.endsWith('.js'))
    .forEach(name => {
      const filePath = `${dir}/${name}`;
      const filePathRelative = filePath.replace(rootPath, '');

      test(`test ${filePathRelative}`, done => {
        const proc = execFile(cgjsBinary, [filePath], (error, stdout, stderr) => {
          if (error && !error.killed && error.signal !== 'SIGINT') {
            done(error);
          }
        });

        setTimeout(() => {
          proc.kill('SIGINT');
          done();
        }, 1000);
      });
    });
}
