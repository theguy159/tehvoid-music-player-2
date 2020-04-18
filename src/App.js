import React from "react";
import { StoreProvider } from "./store-provider";

import StatusBar from "./components/StatusBar";
import SongList from "./components/SongList";
import Player from "./components/Player";
import HotKeysProvider from "./HotKeysProvider";
import SettingsModal from "./components/SettingsModal";

import "rsuite/dist/styles/rsuite-dark.css";
import "react-scrubber/lib/scrubber.css";

import "./css/App.scss";
import "./css/StatusBar.scss";
import "./css/SongList.css";
import "./css/SongItem.scss";

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
