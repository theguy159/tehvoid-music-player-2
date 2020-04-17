import React from "react";
import PropTypes from "prop-types";
import { formatTimecode } from "../utils";
import { pure } from "recompose";

function SongItem({
  artist,
  title,
  album,
  albumArtSrc,
  length,
  className,
  onClick,
  compact,
}) {
  return (
    <div className={`SongItem ${className}`} onClick={onClick}>
      {!compact && (
        <img src={albumArtSrc} alt="Album Art" className="albumArt" />
      )}
      <div className={`meta ${compact ? "compact" : ""}`}>
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
