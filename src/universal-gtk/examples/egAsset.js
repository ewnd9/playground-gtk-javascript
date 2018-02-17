#!/usr/bin/gjs

// forked from https://github.com/optimisme/gjs-examples/blob/a5593d49101dfe12a90903294ec8786843c86f8d/egAsset.js

const { Gtk, GLib, Gio } = require('../');

class App {
  constructor() {
    this.title = 'Example Asset';
    GLib.setPrgname(this.title);
  }

  run(ARGV) {
    this.application = new Gtk.Application();
    this.application.connect('activate', () => this.onActivate());
    this.application.connect('startup', () => this.onStartup());
    this.application.run([]);
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
      default_height: 400,
      default_width: 400,
      window_position: Gtk.WindowPosition.CENTER
    });

    try {
      this.window.setIconFromFile(`${__dirname}/assets/appIcon.png`);
    } catch (err) {
      this.window.setIconName('application-x-executable');
    }

    this.image = new Gtk.Image({ file: `${__dirname}/assets/egAsset.png` });
    this.window.add(this.image);
  }
}

const app = new App();
app.run(ARGV);
