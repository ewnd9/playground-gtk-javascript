'use strict'

// transformed from /vendor/programmica-examples/entry.js by /scripts/transform-examples.js
// (license CC0-1.0)

const { Gtk } = require('universal-gtk');

Gtk.init(null);

function on_entry_activated() {
  print(`Entry text: ${entry.get_text()}`);
}

const window = new Gtk.Window();
window.set_title('Entry');
window.connect('destroy', Gtk.main_quit);

var entry = new Gtk.Entry();
entry.connect('activate', on_entry_activated);
window.add(entry);

window.show_all();

Gtk.main();
