import animateScrollTo from "animated-scroll-to";

function getNextPossibleRandomSong(songs, played, currentSong) {
  let possibleSongs = [];
  if (played.length >= songs.length) {
    possibleSongs = [...songs];
  } else {
    possibleSongs = songs.filter(
      song => !played.includes(song) && song !== currentSong
    );
  }
  const nextSong =
    possibleSongs[Math.floor(Math.random() * possibleSongs.length)];
  return nextSong;
}
export function scrollToCurrentSong() {
  setTimeout(() => {
    const element = document.querySelector(".song.playing");
    const verticalOffset = -document.querySelector(".StatusBar").offsetHeight;
    if (element !== null)
      animateScrollTo(element, {
        verticalOffset,
        minDuration: 1000,
        easing: t => {
          return t < 0.5
            ? 4 * t * t * t
            : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        }
      });
  }, 200);
}

export function next(state, dispatch) {
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
  if (!playing) {
    dispatch({
      type: "SET_STATUS",
      payload: { ...state.status, playing: true }
    });
  }
  scrollToCurrentSong();
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
      payload: { ...state.status, playing: true }
    });
  }
  scrollToCurrentSong();
}
