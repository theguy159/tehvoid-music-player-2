import React, { useEffect } from "react";
import { useStore } from "../store-provider";
import { scrollToCurrentSong } from "../utils";

import SongItem from "./SongItem";

function handleClick(dispatch, state, song) {
  const { playing } = state.status;
  dispatch({ type: "SET_PLAYED_SONGS", payload: [] });
  dispatch({ type: "SET_QUEUE_POS", payload: 0 });
  dispatch({ type: "SET_CURRENT_SONG", payload: song });
  dispatch({ type: "SET_UNPLAYED_SONGS", payload: [] });
  if (!playing)
    dispatch({
      type: "SET_STATUS",
      payload: { ...state.status, playing: true }
    });
  scrollToCurrentSong(dispatch);
}

function SongList(props) {
  const { state, dispatch } = useStore();
  const { songs, currentSong } = state;

  // We don't want the page scrolling when pressing space
  useEffect(() => {
    const eventListener = document.addEventListener("keydown", e => {
      if (e.keyCode === 32) e.preventDefault();
    });
    return () => {
      document.removeEventListener("keydown", eventListener);
    };
  });

  return (
    <div className="SongList">
      {songs.map((song, index) => (
        <SongItem
          key={`song_${index}`}
          artist={song.artist}
          title={song.title}
          onClick={() => handleClick(dispatch, state, song)}
          className={`song ${
            currentSong.trackIndex === song.trackIndex ? "playing" : ""
          }`}
        />
      ))}
    </div>
  );
}

export default SongList;
