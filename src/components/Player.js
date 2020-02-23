import React, { Component } from "react";
import withStore from "../withStore";
import { next } from "../utils";
import { getSongs } from "../adapters/vip";
class Player extends Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
  }
  onTimeUpdate() {
    const { dispatch } = this.props;
    dispatch({
      type: "SET_PLAYBACK_POSITION",
      payload: this.player.current.currentTime
    });
  }
  onDurationChange() {
    const { dispatch } = this.props;
    const duration = this.player.current.duration;
    dispatch({
      type: "SET_DURATION",
      payload: duration
    });
  }
  playPause() {
    const { playing } = this.props.state.status;
    if (playing) {
      this.player.current.play();
    } else {
      this.player.current.pause();
    }
  }
  componentDidMount() {
    const { dispatch } = this.props;
    getSongs().then(songs => {
      dispatch({ type: "SET_SONGS", payload: songs });
    });

    this.player.current.addEventListener("ended", () => {
      const { state, dispatch } = this.props;
      next(state, dispatch);
    });
    this.player.current.addEventListener("timeupdate", e =>
      this.onTimeUpdate(e)
    );
    this.player.current.addEventListener("durationchange", e =>
      this.onDurationChange(e)
    );
  }
  componentDidUpdate(prevProps) {
    if (prevProps.state.status.playing !== this.props.state.status.playing) {
      this.playPause();
    }
    if (prevProps.state.currentSong !== this.props.state.currentSong) {
      this.playPause();
    }
    if (prevProps.state.songs.length !== this.props.state.songs.length) {
      const { state, dispatch } = this.props;
      const { playing } = state.status;
      if (state.currentSong.location === null) {
        next(state, dispatch);
        // TODO: make autoplay a user choice
        if (!playing) {
          dispatch({
            type: "SET_STATUS",
            payload: { ...state.status, playing: !playing }
          });
        }
      }
    }
  }

  render() {
    const { location } = this.props.state.currentSong;
    return <audio ref={this.player} src={location}></audio>;
  }
}

export default withStore(Player);
