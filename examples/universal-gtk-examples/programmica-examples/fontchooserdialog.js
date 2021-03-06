'use strict'

// transformed from /vendor/programmica-examples/fontchooserdialog.js by /scripts/transform-examples.js
// (license CC0-1.0)

const { Gtk } = require('universal-gtk');

Gtk.init(null);

const fontchooserdialog = new Gtk.FontChooserDialog();
fontchooserdialog.set_title('FontChooserDialog');

if (fontchooserdialog.run() == Gtk.ResponseType.OK) {
  print(`Font set to ${fontchooserdialog.get_font()}`);
}

fontchooserdialog.destroy();
