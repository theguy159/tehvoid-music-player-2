import React from "react";

import { useStore } from "../store-provider";
import { next, prev } from "../utils";

function playPause(state, dispatch) {
  const { playing } = state.status;
  dispatch({
    type: "SET_STATUS",
    payload: { ...state.status, playing: !playing }
  });
}
function toggleShuffle(state, dispatch) {
  const { shuffle } = state.status;
  dispatch({
    type: "SET_STATUS",
    payload: { ...state.status, shuffle: !shuffle }
  });
}
function fav(state, dispatch) {}

function StatusBar(props) {
  const { state, dispatch } = useStore();
  const { playing, shuffle } = state.status;
  const { artist, album, title } = state.currentSong;
  const { playbackPosition, duration } = state;

  return (
    <div className="StatusBar">
      <button onClick={() => prev(state, dispatch)}>PREV</button>
      <button onClick={() => playPause(state, dispatch)}>
        {playing ? "PAUSE" : "PLAY"}
      </button>
      <button onClick={() => next(state, dispatch)}>NEXT</button>
      <button onClick={() => toggleShuffle(state, dispatch)}>
        {shuffle ? "sequential playback" : "shuffle playback"}
      </button>
      <span className="songMeta">
        {artist} - {title} {playbackPosition} / {duration}
      </span>
    </div>
  );
}

export default StatusBar;
