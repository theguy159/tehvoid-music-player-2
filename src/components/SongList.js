import React from "react";
import { useStore } from "../store-provider";
import { scrollToCurrentSong } from "../utils";

function handleClick(dispatch, state, song) {
  const { currentSong } = state;
  const { pos: queuePos } = state.queue;
  const { playing } = state.status;
  // dispatch({ type: "ADD_PLAYED_SONG", payload: currentSong });
  dispatch({ type: "SET_PLAYED_SONGS", payload: [] });
  dispatch({ type: "SET_QUEUE_POS", payload: 0 });
  dispatch({ type: "SET_CURRENT_SONG", payload: song });
  dispatch({ type: "SET_UNPLAYED_SONGS", payload: [] });
  if (!playing)
    dispatch({
      type: "SET_STATUS",
      payload: { ...state.status, playing: true }
    });
  scrollToCurrentSong();
}

function SongList(props) {
  const { state, dispatch } = useStore();
  const { songs, currentSong } = state;
  return (
    <div className="SongList">
      {songs.map((song, index) => (
        <div
          className={`song ${
            currentSong.trackIndex === song.trackIndex ? "playing" : ""
          }`}
          key={`song_${index}`}
          onClick={() => handleClick(dispatch, state, song)}
        >
          {song.artist} - {song.title}
        </div>
      ))}
    </div>
  );
}

export default SongList;
