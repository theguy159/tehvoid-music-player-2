import React from "react";
import { StoreProvider } from "./store-provider";

import StatusBar from "./components/StatusBar";
import SongList from "./components/SongList";
import Player from "./components/Player";

import "./App.css";
import "./StatusBar.css";
import "./SongList.css";

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <StatusBar />
        <SongList />
        <Player />
      </StoreProvider>
    </div>
  );
}

export default App;
