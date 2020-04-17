import React, { Component } from "react";
import { GlobalHotKeys } from "react-hotkeys";

import { prev, next, playPause, toggleShuffle } from "./utils";
import { keyMap } from "./constants";
import withStore from "./withStore";

class HotKeysProvider extends Component {
  handlePrev = () => {
    const { state, dispatch } = this.props;
    prev(state, dispatch);
  };
  handlePlayPause = () => {
    const { state, dispatch } = this.props;
    playPause(state, dispatch);
  };

  handleNext = () => {
    const { state, dispatch } = this.props;
    next(state, dispatch);
  };
  handleToggleShuffle = () => {
    const { state, dispatch } = this.props;
    toggleShuffle(state, dispatch);
  };

  handlers = {
    PREV: this.handlePrev,
    PLAY_PAUSE: this.handlePlayPause,
    NEXT: this.handleNext,
    SHUFFLE: this.handleToggleShuffle,
  };
  render() {
    return <GlobalHotKeys keyMap={keyMap} handlers={this.handlers} />;
  }
}

export default withStore(HotKeysProvider);
