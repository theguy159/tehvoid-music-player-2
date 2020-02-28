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
  source,
  sourceType,
  className,
  onClick
}) {
  return (
    <div className={`SongItem ${className}`} onClick={onClick}>
      <img src={albumArtSrc} alt="Album Art" className="albumArt" />
      <div className="meta">
        {album.length > 0 && <div className="album">{album}</div>}
        <div className="artist">{artist}</div>
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
  source: PropTypes.string.isRequired,
  sourceType: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string
};
SongItem.defaultProps = {
  album: "",
  artist: "Unkown artist",
  title: "Unknown title",
  albumArtSrc: "/img/aersiaIcon.png",
  className: "",
  length: 0
};
export default pure(SongItem);
