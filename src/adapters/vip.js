import axios from "axios";
import { parseStringPromise } from "xml2js";
function escapeBadChars(str) {
  return str.replace(/(?!&amp;)&/g, "&amp;");
}
export function getSongs() {
  return new Promise((resolve, reject) => {
    axios.get("http://vip.aersia.net/roster.xml").then(res => {
      parseStringPromise(escapeBadChars(res.data), {
        explicitArray: false
      }).then(res => {
        const tracks = res.playlist.trackList.track;
        const newTracks = tracks.map((track, index) => ({
          artist: track.creator,
          title: track.title,
          album: "",
          location: track.location,
          trackIndex: index
        }));
        resolve(newTracks);
      });
    });
  });
}
