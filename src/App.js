import React from "react";
import { StoreProvider } from "./store-provider";

import StatusBar from "./components/StatusBar";
import SongList from "./components/SongList";
import Player from "./components/Player";
import HotKeysProvider from "./HotKeysProvider";

import "./App.css";
import "./StatusBar.css";
import "./SongList.css";
import "./SongItem.scss";

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <HotKeysProvider />
        <StatusBar />
        <SongList />
        <Player />
      </StoreProvider>
    </div>
  );
}

export default App;
