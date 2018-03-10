'use strict'

// transformed from /vendor/programmica-examples/menubutton.js by /scripts/transform-examples.js
// (license CC0-1.0)

const { Gtk } = require('universal-gtk');

Gtk.init(null);

const window = new Gtk.Window();
window.set_title('MenuButton');
window.connect('destroy', Gtk.main_quit);

const menubutton = new Gtk.MenuButton({ label: 'MenuButton' });
window.add(menubutton);

const menu = new Gtk.Menu();
menubutton.set_popup(menu);

for (let i = 1; i < 6; i++) {
  const menuitem = new Gtk.MenuItem({ label: `MenuItem ${i}` });
  menu.append(menuitem);
}

menu.show_all();
window.show_all();

Gtk.main();
