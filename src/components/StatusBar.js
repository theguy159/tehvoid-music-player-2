import React, { useEffect, useState } from "react";
import { Icon, SelectPicker } from "rsuite";

import { useStore } from "../store-provider";
import {
  next,
  prev,
  formatTimecode,
  toggleShuffle,
  scrollToCurrentSong,
  setPositionScrubbedTo,
  setShowSettingsModal,
} from "../utils";
import { Scrubber } from "react-scrubber";

function playPause(state, dispatch) {
  const { playing } = state.status;
  dispatch({
    type: "SET_STATUS",
    payload: { ...state.status, playing: !playing },
  });
}

function handleScrubStart(pos, setIsScrubbing, setScrubPosition) {
  setScrubPosition(pos);
  setIsScrubbing(true);
}

function handleScrubChange(scrubPosition, setScrubPosition) {
  setScrubPosition(scrubPosition);
}

// Sorry for the long signature :|
function handleScrubEnd(scrubPosition, duration, setIsScrubbing, dispatch) {
  const positionScrubbedTo = (scrubPosition * duration) / 100;
  setPositionScrubbedTo(dispatch, positionScrubbedTo);
  setIsScrubbing(false);
}

function StatusBar(props) {
  const { state, dispatch } = useStore();
  const { playing } = state.status;
  const { artist, title } = state.currentSong;
  const {
    playbackPosition,
    duration,
    bufferedPercent,
    showSongTitleInStatusBar,
  } = state;

  const [scrubPosition, setScrubPosition] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);

  const humanReadablePlaybackPosition = isScrubbing
    ? formatTimecode((scrubPosition * duration) / 100)
    : formatTimecode(playbackPosition);
  const humanReadableDuration = formatTimecode(duration);

  const playbackPercent = isScrubbing
    ? scrubPosition
    : (playbackPosition / duration) * 100 || 0;

  useEffect(() => {
    document.title = `${
      playing ? `${artist} - ${title}` : "Tehvoid Music Player"
    }`;
  });

  return (
    <div className="StatusBar">
      <div className="controlButtons">
        <Icon icon="fast-backward" onClick={() => prev(state, dispatch)} />
        <Icon
          icon={playing ? "pause" : "play"}
          onClick={() => playPause(state, dispatch)}
        />
        <Icon icon="fast-forward" onClick={() => next(state, dispatch)} />
        <Icon icon="random" onClick={() => toggleShuffle(state, dispatch)} />
      </div>
      <div className="songMeta">
        {showSongTitleInStatusBar && (
          <div className="title" onClick={() => scrollToCurrentSong(dispatch)}>
            {artist} - {title}
          </div>
        )}
        <Scrubber
          min={0}
          max={100}
          value={playbackPercent}
          bufferPosition={bufferedPercent}
          onScrubStart={(pos) =>
            handleScrubStart(pos, setIsScrubbing, setScrubPosition)
          }
          onScrubChange={(pos) => handleScrubChange(pos, setScrubPosition)}
          onScrubEnd={(pos) =>
            handleScrubEnd(pos, duration, setIsScrubbing, dispatch)
          }
        />
        <div className="position">
          {humanReadablePlaybackPosition} / {humanReadableDuration}
        </div>
        <div className="playlistSelector">
          <Icon icon="list-ul" />
          <SelectPicker
            data={[
              { label: "main", value: "main", type: "upstream" },
              { label: "favorites", value: "favorites", type: "local" },
              { label: "spap", value: "spap", type: "local" },
            ]}
            groupBy="type"
            value="main"
            appearance="subtle"
            cleanable={false}
            style={{ width: 224 }}
            renderMenuItem={(label, item) => (
              <div className="playlistMenuItem">
                {label}{" "}
                {item.value !== "favorites" && item.type !== "upstream" && (
                  <Icon icon="trash" />
                )}
              </div>
            )}
            renderExtraFooter={() => (
              <div className="playlistActions">
                <Icon icon="plus" />
              </div>
            )}
          />
        </div>
        <Icon icon="cog" onClick={() => setShowSettingsModal(dispatch, true)} />
      </div>
    </div>
  );
}

export default StatusBar;
