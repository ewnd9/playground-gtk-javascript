#!/usr/bin/gjs

const { Gtk, GLib, Gio } = require('universal-gtk');

const { gi } = imports;
gi.versions.WebKit2 = '4.0';

const { WebKit2 } = gi;

const app = {
  on(event, callback) {
    if (event === 'ready') {
      callback();
    }
  }
};

class GtkApp {
  constructor({ width, height, url }) {
    this.title = 'gtk-electron-shim';

    this.width = width;
    this.height = height;
    this.url = url;

    GLib.setPrgname(this.title);
  }

  run(ARGV) {
    this.application = new Gtk.Application();
    this.application.connect('activate', () => this.onActivate());
    this.application.connect('startup', () => this.onStartup());

    setImmediate(() => {
      this.application.run(ARGV);
    });
  }

  onActivate() {
    this.window.showAll();
  }

  onStartup() {
    this.buildUI();
  }

  buildUI() {
    this.window = new Gtk.ApplicationWindow({
      application: this.application,
      title: this.title,
      default_height: this.height,
      default_width: this.width,
      window_position: Gtk.WindowPosition.CENTER
    });

    this.webview = new WebKit2.WebView();
    this.webview.get_settings().enable_developer_extras = true;
    this.webview.load_uri(this.url);

    this.window.add(this.webview);
  }

  loadUri(url) {
    this.url = url;
    this.webview.load_uri(this.url);
  }

  openDevTools() {
    this.webview.get_inspector().show();
  }
}

class BrowserWindow {
  constructor({ width, height }) {
    this.width = width;
    this.height = height;

    this.webContents = new WebContents({ browserWindow: this });
    this.app = null;
  }

  loadURL(url) {
    if (!this.app) {
      this.app = new GtkApp({
        width: this.width,
        height: this.height,
        url
      });

      this.app.run(ARGV);
    } else {
      this.app.loadUri(url);
    }
  }

  on(event, callback) {}
}

class WebContents {
  constructor({ browserWindow }) {
    this.browserWindow = browserWindow; // @TODO: bad, for compatibility only
  }

  openDevTools() {
    setImmediate(() => {
      this.browserWindow.app.openDevTools();
    });
  }
}

module.exports = {
  app,
  BrowserWindow
};

