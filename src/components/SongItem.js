import React from "react";
import PropTypes from "prop-types";
import { formatTimecode, getSourceIcon } from "../utils";
import { pure } from "recompose";

function SongItem({
  artist,
  title,
  album,
  location,
  albumArtSrc,
  length,
  className,
  onClick,
  compact,
}) {
  return (
    <div className={`SongItem ${className} ${compact ? "compact" : ""}`} onClick={onClick}>
      {!compact && (
        <div className='albumArtContainer'><img src={albumArtSrc || (location.includes('vipvgm') ? "img/aersiaIcon.png" : "/img/yt_icon_rgb.png")} alt="Album Art" className="albumArt" /></div>
      )}
      <div className={`meta ${compact ? "compact" : ""}`}>
        {compact && getSourceIcon(location)}
        {album.length > 0 && <div className="album">{album}</div>}
        <div className="artist">{`${compact ? artist + " -" : artist}`}</div>
        <div className="title">{title}</div>
        <div className="length">{formatTimecode(length)}</div>
      </div>
    </div>
  );
}
SongItem.propTypes = {
  artist: PropTypes.string,
  title: PropTypes.string,
  album: PropTypes.string,
  albumArtSrc: PropTypes.string,
  length: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  compact: PropTypes.bool,
};
SongItem.defaultProps = {
  album: "",
  artist: "Unkown artist",
  title: "Unknown title",
  albumArtSrc: "/img/aersiaIcon.png",
  className: "",
  length: 0,
  compact: false,
};
export default pure(SongItem);
