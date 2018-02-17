## Notes

```js
// node_modules/.bin/cgjs
imports.gi;
gi.versions.Gtk = '3.0';
GTK_MODULES: {value: gi.GIRepository.Repository
                                          .get_default()
                                          .get_loaded_namespaces()},
```

```js
// node_modules/cgjs/cgjs/require.js
print(GTK_MODULES);
// Pango,GObject,xlib,Gio,GIRepository,GLib,GModule,GjsPrivate,Gdk,GdkPixbuf,Gtk,cairo,Atk
```

