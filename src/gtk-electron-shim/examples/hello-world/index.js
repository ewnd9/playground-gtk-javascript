'use strict';

// forked from https://github.com/pojala/electrino/blob/3b9f0d54fad3f6b35e6a0e5cd69a18dad9da37b6/test-app/main.js
const { app, BrowserWindow } = require('../..');

let win;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });

  win.loadURL(`file://${__dirname}/index.html`);
  win.webContents.openDevTools();
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

