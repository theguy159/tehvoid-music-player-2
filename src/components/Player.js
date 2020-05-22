import React, { Component } from "react";
import withStore from "../withStore";
import { next, setBufferedPercent } from "../utils";
import { getSongs } from "../adapters/testAdapter";
import ReactPlayer from "react-player";
class Player extends Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
  }
  onTimeUpdate() {
    const { state, dispatch } = this.props;
    const { runningAnimation } = state;
    if (!runningAnimation)
      dispatch({
        type: "SET_PLAYBACK_POSITION",
        payload: this.player.current.currentTime,
      });
  }
  onDurationChange(duration) {
    const { dispatch } = this.props;
    dispatch({
      type: "SET_DURATION",
      payload: typeof duration === 'number' ? duration : this.player.current.duration,
    });
  }
  onProgress(e) {
    const { dispatch } = this.props;
    if (this.player && this.player.current) {
      const player = this.player.current;
      const duration = player.duration;
      if (duration > 0) {
        // This works perfectly fine in Chrome... But not in Firefox :S
        const buffered = player.buffered.end(player.buffered.length - 1);
        const bufferedPercent = (buffered / duration) * 100;
        setBufferedPercent(dispatch, bufferedPercent);
      }
    } else {
      setBufferedPercent(dispatch, e.loaded * 100)
      dispatch({
        type: "SET_PLAYBACK_POSITION",
        payload: e.playedSeconds
      })
    }

  }
  onEnded() {
    const { state, dispatch } = this.props;
    next(state, dispatch);
  }
  playPause() {
    const { playing } = this.props.state.status;
    if (this.player && this.player.current) {
      if (playing) {
        this.player.current.play();
      } else {
        this.player.current.pause();
      }
    }
  }
  seekTo(pos) {
    if (this.player.current !== undefined)
      this.player.current.currentTime = pos;
  }
  componentDidMount() {
    const { dispatch } = this.props;
    getSongs().then((songs) => {
      dispatch({ type: "SET_SONGS", payload: songs });
    });

    this.player.current.addEventListener("ended", () => this.onEnded());
    this.player.current.addEventListener("timeupdate", (e) =>
      this.onTimeUpdate(e)
    );
    this.player.current.addEventListener("durationchange", (e) =>
      this.onDurationChange(e)
    );
    this.player.current.addEventListener("progress", (e) => this.onProgress(e));
  }
  componentDidUpdate(prevProps) {
    if (prevProps.state.status.playing !== this.props.state.status.playing) {
      this.playPause();
    }
    if (prevProps.state.currentSong !== this.props.state.currentSong) {
      this.playPause();
    }
    if (
      prevProps.state.positionScrubbedTo !== this.props.state.positionScrubbedTo
    ) {
      this.seekTo(this.props.state.positionScrubbedTo);
    }
    if (prevProps.state.songs.length !== this.props.state.songs.length) {
      const { state, dispatch } = this.props;
      const { playing } = state.status;
      const { autoplayAtStartup } = state;
      if (state.currentSong.location === null) {
        next(state, dispatch, true);
        if (!playing && autoplayAtStartup) {
          dispatch({
            type: "SET_STATUS",
            payload: { ...state.status, playing: !playing },
          });
        }
      }
    }
  }

  render() {
    const { location } = this.props.state.currentSong;
    const { playing } = this.props.state.status;
    if (location && location.includes('vipvgm') || location === null)
      return <audio ref={this.player} src={location}></audio>
    else
      return <div className='hidden'><ReactPlayer url={location} playing={playing} onProgress={(e) => this.onProgress(e)} onDuration={(duration) => this.onDurationChange(duration)} onEnded={() => this.onEnded()} /></div>
  }
}

export default withStore(Player);
