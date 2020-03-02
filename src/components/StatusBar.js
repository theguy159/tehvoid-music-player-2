import React, { useEffect } from "react";

import { useStore } from "../store-provider";
import { next, prev, formatTimecode, toggleShuffle } from "../utils";

function playPause(state, dispatch) {
  const { playing } = state.status;
  dispatch({
    type: "SET_STATUS",
    payload: { ...state.status, playing: !playing }
  });
}

function StatusBar(props) {
  const { state, dispatch } = useStore();
  const { playing, shuffle } = state.status;
  const { artist, title } = state.currentSong;
  const { playbackPosition, duration } = state;

  const humanReadablePlaybackPosition = formatTimecode(playbackPosition);
  const humanReadableDuration = formatTimecode(duration);

  useEffect(() => {
    document.title = `${
      playing ? `${artist} - ${title}` : "Tehvoid Music Player"
    }`;
  });

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
        {artist} - {title} {humanReadablePlaybackPosition} /{" "}
        {humanReadableDuration}
      </span>
    </div>
  );
}

export default StatusBar;
