import React from "react";
import { StoreProvider } from "./store-provider";

import StatusBar from "./components/StatusBar";
import SongList from "./components/SongList";
import Player from "./components/Player";
import HotKeysProvider from "./HotKeysProvider";


import 'rsuite/dist/styles/rsuite-default.css';
import 'react-scrubber/lib/scrubber.css';

import "./App.css";
import "./StatusBar.scss";
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
