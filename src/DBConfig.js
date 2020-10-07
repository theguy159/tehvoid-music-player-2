export const DBConfig = {
  name: "mp2db",
  version: 1,
  objectStoresMeta: [
    {
      store: "songs",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "location", keypath: "location", options: { unique: true } },
        { name: "artist", keypath: "artist", options: { unique: false } },
        { name: "title", keypath: "title", options: { unique: false } },
        { name: "album", keypath: "album", options: { unique: false } },
        { name: "length", keypath: "length", options: { unique: false } },
      ],
    },
    {
      store: "playlists",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "title", keypath: "title", options: { unique: false } },
        { name: "index", keypath: "index", options: { unique: true } },
        { name: "songs", keypath: "songs", options: { unique: false } },
      ],
    },
  ],
};
