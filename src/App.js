import React from "react";
import { StoreProvider } from "./store-provider";
import { initDB } from "react-indexed-db";

import { DBConfig } from "./DBConfig";

import StatusBar from "./components/StatusBar";
import SongList from "./components/SongList";
import Player from "./components/Player";
import HotKeysProvider from "./HotKeysProvider";
import SettingsModal from "./components/SettingsModal";

import "./theme/index.less";
import "react-scrubber/lib/scrubber.css";

import "./css/App.scss";
import "./css/StatusBar.scss";
import "./css/SongList.css";
import "./css/SongItem.scss";

initDB(DBConfig);

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <HotKeysProvider />
        <SettingsModal />
        <StatusBar />
        <SongList />
        <Player />
      </StoreProvider>
    </div>
  );
}

export default App;
