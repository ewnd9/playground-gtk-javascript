const Lang = imports.lang;
function getAppFileInfo() {
  let stack = (new Error()).stack;
}

const path = getAppFileInfo()[1];
imports.searchPath.push(path);

this.window.set_icon_from_file(path + '/assets/appIcon.png');
this.image = new Gtk.Image ({ file: path + '/assets/egAsset.png' });

const Select = imports.assets.select;
