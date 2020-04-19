import React, { createContext, useReducer, useContext, useEffect } from "react";

function fromLocalStorage(item, defaultValue = false) {
  return window.localStorage.getItem(item) !== null
    ? JSON.parse(window.localStorage.getItem(item))
    : defaultValue;
}

function toLocalStorage(item, object) {
  window.localStorage.setItem(item, JSON.stringify(object));
}

const defaultState = {
  songs: [],
  queue: {
    unplayed: [],
    played: [],
    pos: 0,
  },
  currentSong: {
    artist: "",
    title: "",
    album: "",
    location: null,
  },
  playbackPosition: 0,
  duration: 0,
  status: {
    playing: false,
    shuffle: true,
    repeat: false,
    compact: fromLocalStorage("compact", true),
  },
  runningAnimation: false,
  positionScrubbedTo: 0,
  bufferedPercent: 0,
  showSettingsModal: false,
  showSongTitleInStatusBar: fromLocalStorage("showSongTitleInStatusBar", true),
  autoplayAtStartup: fromLocalStorage("autoplayAtStartup", false),
};

function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case "SET_SONGS":
      return { ...state, songs: action.payload };
    case "SET_CURRENT_SONG":
      return { ...state, currentSong: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_PLAYBACK_POSITION":
      return { ...state, playbackPosition: action.payload };
    case "SET_DURATION":
      return { ...state, duration: action.payload };
    case "ADD_PLAYED_SONG":
      return {
        ...state,
        queue: {
          ...state.queue,
          played: [...state.queue.played, action.payload],
        },
      };
    case "ADD_UNPLAYED_SONG":
      return {
        ...state,
        queue: {
          ...state.queue,
          unplayed: [...state.queue.unplayed, action.payload],
        },
      };
    case "SET_PLAYED_SONGS":
      return { ...state, queue: { ...state.queue, played: action.payload } };
    case "SET_UNPLAYED_SONGS":
      return { ...state, queue: { ...state.queue, unplayed: action.payload } };
    case "SET_QUEUE_POS":
      return { ...state, queue: { ...state.queue, pos: action.payload } };
    case "SET_RUNNING_ANIMATION":
      return { ...state, runningAnimation: action.payload };
    case "SET_POSITION_SCRUBBED_TO":
      return { ...state, positionScrubbedTo: action.payload };
    case "SET_BUFFERED_PERCENT":
      return { ...state, bufferedPercent: action.payload };
    case "SET_SHOW_SETTINGS_MODAL":
      return { ...state, showSettingsModal: action.payload };
    case "SET_SHOW_SONG_TITLE_IN_STATUSBAR":
      return { ...state, showSongTitleInStatusBar: action.payload };
    case "SET_AUTOPLAY_AT_STARTUP":
      return { ...state, autoplayAtStartup: action.payload };
    default:
      return state;
  }
}

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const value = { state, dispatch };

  const { autoplayAtStartup, showSongTitleInStatusBar } = state;
  const { compact } = state.status;

  // Sync certain state objects to localStorage
  // TODO: make this cleaner
  const useEffectHelper = (object, cb) => useEffect(() => cb(), [object, cb]);

  useEffectHelper(autoplayAtStartup, () =>
    toLocalStorage("autoplayAtStartup", autoplayAtStartup)
  );
  useEffectHelper(compact, () => toLocalStorage("compact", compact));
  useEffectHelper(showSongTitleInStatusBar, () =>
    toLocalStorage("showSongTitleInStatusBar", showSongTitleInStatusBar)
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
