import animateScrollTo from "animated-scroll-to";

export function formatTimecode(seconds) {
  seconds = Math.floor(seconds);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;
  minutes = "" + minutes;
  seconds = "" + seconds;

  if (minutes.length === 1) minutes = "0" + minutes;
  if (seconds.length === 1) seconds = "0" + seconds;

  return minutes + ":" + seconds;
}

function getNextPossibleRandomSong(songs, played, currentSong) {
  let possibleSongs = [];
  if (played.length >= songs.length) {
    possibleSongs = [...songs];
  } else {
    possibleSongs = songs.filter(
      (song) => !played.includes(song) && song !== currentSong
    );
  }
  const nextSong =
    possibleSongs[Math.floor(Math.random() * possibleSongs.length)];
  return nextSong;
}
export function scrollToCurrentSong(dispatch) {
  setTimeout(() => {
    const element = document.querySelector(".song.playing");
    const verticalOffset = -document.querySelector(".StatusBar").offsetHeight;
    if (element !== null) {
      animateScrollTo(element, {
        verticalOffset,
        minDuration: 1000,
        easing: (t) => {
          return t < 0.5
            ? 4 * t * t * t
            : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        },
      });
    }
  }, 200);
}

export function next(state, dispatch, atStartup = false) {
  const { songs, currentSong } = state;
  const { shuffle, playing } = state.status;
  const { pos: queuePos, played, unplayed } = state.queue;
  // Always add the previously played song to played
  if (currentSong.location !== null) {
    dispatch({ type: "ADD_PLAYED_SONG", payload: currentSong });
    dispatch({ type: "SET_QUEUE_POS", payload: queuePos + 1 });
  }

  // play through the playlist first before returning to the global songs list
  if (unplayed.length > 0) {
    const nextSong = unplayed[unplayed.length - 1];
    const newUnplayed = unplayed.slice(0, unplayed.length - 1);
    dispatch({ type: "SET_CURRENT_SONG", payload: nextSong });
    dispatch({ type: "SET_UNPLAYED_SONGS", payload: newUnplayed });
  } else if (shuffle) {
    const nextSong = getNextPossibleRandomSong(songs, played, currentSong);
    dispatch({ type: "SET_CURRENT_SONG", payload: nextSong });
  } else {
    // TODO: not repeatAll?
    const nextSongIndex = (currentSong.trackIndex + 1) % songs.length;
    const nextSong = songs[nextSongIndex];
    dispatch({ type: "SET_CURRENT_SONG", payload: nextSong });
  }
  if (!playing && !atStartup) {
    dispatch({
      type: "SET_STATUS",
      payload: { ...state.status, playing: true },
    });
  }
  dispatch({
    type: "SET_BUFFERED_PERCENT",
    payload: 0,
  });
  scrollToCurrentSong(dispatch);
}

export function prev(state, dispatch) {
  const { pos: queuePos, played } = state.queue;
  const { songs, currentSong } = state;
  const { shuffle, playing } = state.status;
  if (queuePos > 0 && played.length > 0) {
    const prevSong = played[queuePos - 1];
    const newPlayed = played.slice(0, queuePos - 1);
    dispatch({ type: "SET_CURRENT_SONG", payload: prevSong });
    dispatch({ type: "ADD_UNPLAYED_SONG", payload: currentSong });
    dispatch({ type: "SET_PLAYED_SONGS", payload: newPlayed });
    dispatch({ type: "SET_QUEUE_POS", payload: queuePos - 1 });
  } else if (!shuffle) {
    const nextSongIndex = currentSong.trackIndex - 1;
    const nextSong =
      songs[nextSongIndex >= 0 ? nextSongIndex : songs.length - 1];
    dispatch({ type: "SET_CURRENT_SONG", payload: nextSong });
  } else {
    const nextSong = getNextPossibleRandomSong(songs, played, currentSong);
    dispatch({ type: "SET_CURRENT_SONG", payload: nextSong });
  }
  if (!playing) {
    dispatch({
      type: "SET_STATUS",
      payload: { ...state.status, playing: true },
    });
  }
  dispatch({
    type: "SET_BUFFERED_PERCENT",
    payload: 0,
  });
  scrollToCurrentSong(dispatch);
}

export function playPause(state, dispatch) {
  dispatch({
    type: "SET_STATUS",
    payload: { ...state.status, playing: !state.status.playing },
  });
}

export function toggleShuffle(state, dispatch) {
  const { shuffle } = state.status;
  dispatch({
    type: "SET_STATUS",
    payload: { ...state.status, shuffle: !shuffle },
  });
}

export function toggleCompact(state, dispatch) {
  const { compact } = state.status;
  dispatch({
    type: "SET_STATUS",
    payload: { ...state.status, compact: !compact },
  });
}

export function setPositionScrubbedTo(dispatch, positionScrubbedTo) {
  dispatch({
    type: "SET_POSITION_SCRUBBED_TO",
    payload: positionScrubbedTo,
  });
}

export function setBufferedPercent(dispatch, bufferedPercent) {
  dispatch({
    type: "SET_BUFFERED_PERCENT",
    payload: bufferedPercent,
  });
}

export function setShowSettingsModal(dispatch, showSettingsModal) {
  dispatch({
    type: "SET_SHOW_SETTINGS_MODAL",
    payload: showSettingsModal,
  });
}

export function setShowSongTitleInStatusBar(
  dispatch,
  showSongTitleInStatusBar
) {
  dispatch({
    type: "SET_SHOW_SONG_TITLE_IN_STATUSBAR",
    payload: showSongTitleInStatusBar,
  });
}

export function setAutoplayAtStartup(dispatch, autoplayAtStartup) {
  dispatch({
    type: "SET_AUTOPLAY_AT_STARTUP",
    payload: autoplayAtStartup,
  });
}
