import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";

const Playlist = ({ playlist, setPlaylist }) => {
  useEffect(() => {
    console.log("playlist1", playlist);
  }, [playlist]);
  return (
    <div className="sidebar bg-gray-800 text-white h-full p-4">
      <h2 className="text-xl font-bold mb-4">
        <FaPlus className="inline mr-2" /> Playlist
      </h2>

      <ul className="space-y-4">
        {playlist !== undefined &&
          playlist !== null &&
          playlist.map((music, index) => (
            <li key={index} className="hover:bg-gray-600 p-2 rounded">
              {music.title}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Playlist;
