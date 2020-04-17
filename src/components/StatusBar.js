import React, { useEffect } from "react";
import { Icon } from "rsuite";

import { useStore } from "../store-provider";
import { next, prev, formatTimecode, toggleShuffle, toggleCompact, scrollToCurrentSong } from "../utils";
import { Scrubber } from 'react-scrubber';

function playPause(state, dispatch) {
  const { playing } = state.status;
  dispatch({
    type: "SET_STATUS",
    payload: { ...state.status, playing: !playing }
  });
}

function StatusBar(props) {
  const { state, dispatch } = useStore();
  const { playing, shuffle, compact } = state.status;
  const { artist, title } = state.currentSong;
  const { playbackPosition, duration } = state;

  const humanReadablePlaybackPosition = formatTimecode(playbackPosition);
  const humanReadableDuration = formatTimecode(duration);

  const playbackPercent = playbackPosition / duration * 100 || 0;

  useEffect(() => {
    document.title = `${
      playing ? `${artist} - ${title}` : "Tehvoid Music Player"
    }`;
  });

  return (
    <div className="StatusBar">
      <div className='controlButtons'>
        <Icon icon='fast-backward' onClick={() => prev(state, dispatch)} />
        <Icon icon={playing ? 'pause' : 'play'} onClick={() => playPause(state, dispatch)} />
        <Icon icon='fast-forward' onClick={() => next(state, dispatch)} />
        <Icon icon='random' onClick={() => toggleShuffle(state, dispatch)} />
        <Icon icon={compact ? 'expand' : 'compress'} onClick={() => toggleCompact(state, dispatch)} />
      </div>
      <div className="songMeta">
        <div className="title" onClick={() => scrollToCurrentSong(dispatch)}>
          {artist} - {title}
        </div>
        <Scrubber
          min={0}
          max={100}
          value={playbackPercent}
        />
        <div className='position'>
          {humanReadablePlaybackPosition} /{" "}
          {humanReadableDuration}
        </div>
      </div>
    </div>
  );
}

export default StatusBar;
