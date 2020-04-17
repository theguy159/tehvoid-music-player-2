import React, { createContext, useReducer, useContext } from "react";

const defaultState = {
  songs: [],
  queue: {
    unplayed: [],
    played: [],
    pos: 0
  },
  currentSong: {
    artist: "",
    title: "",
    album: "",
    location: null
  },
  playbackPosition: 0,
  duration: 0,
  status: {
    playing: false,
    shuffle: true,
    repeat: false,
    compact: false
  },
  runningAnimation: false
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
          played: [...state.queue.played, action.payload]
        }
      };
    case "ADD_UNPLAYED_SONG":
      return {
        ...state,
        queue: {
          ...state.queue,
          unplayed: [...state.queue.unplayed, action.payload]
        }
      };
    case "SET_PLAYED_SONGS":
      return { ...state, queue: { ...state.queue, played: action.payload } };
    case "SET_UNPLAYED_SONGS":
      return { ...state, queue: { ...state.queue, unplayed: action.payload } };
    case "SET_QUEUE_POS":
      return { ...state, queue: { ...state.queue, pos: action.payload } };
    case "SET_RUNNING_ANIMATION":
      return { ...state, runningAnimation: action.payload };
    default:
      return state;
  }
}

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const value = { state, dispatch };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
