import React from "react";
import { formatTimecode, getSourceIcon } from "../utils";
import { pure } from "recompose";
import { Song } from "../interfaces/Song/SongDefinitions";

interface SongItemProps {
  song: Song;
  compact: boolean;
  onClick: () => void;
  className?: string;
}

function SongItem({ song, className, onClick, compact }: SongItemProps) {
  const {
    albumArtSrc,
    location,
    artist = "",
    title = "Unknown title",
    album = "",
    length = 0,
  } = song;
  return (
    <div
      className={`SongItem ${className} ${compact ? "compact" : ""}`}
      onClick={onClick}
    >
      {!compact && (
        <div className="albumArtContainer">
          <img
            src={
              albumArtSrc ||
              (location.includes("vipvgm")
                ? "img/aersiaIcon.png"
                : "/img/yt_icon_rgb.png")
            }
            alt="Album Art"
            className="albumArt"
          />
        </div>
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
export default pure(SongItem);
