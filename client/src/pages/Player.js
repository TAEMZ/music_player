import React, { useEffect, useState } from "react";
import PlayerControls from "../components/PlayerControls";
import Sidebar from "../components/Sidebar";
import UploadMusic from "../components/UploadMusic";
import { fetchMusic } from "../services/musicService";

const Player = ({ playlist, setPlaylist }) => {
  const [musicList, setMusicList] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [currentMusic, setCurrentMusic] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getMusic = async () => {
      const data = await fetchMusic();
      setMusicList(data);
    };
    getMusic();
  }, []);

  const handleFavorite = (music) => {
    if (!favorites.some((fav) => fav.id === music.id)) {
      setFavorites([...favorites, music]);
    }
  };

  const handleAddToPlaylist = (music) => {
    if (!playlist.some((pl) => pl.id === music.id)) {
      setPlaylist([...playlist, music]);
    }
  };

  const handleCardClick = (music) => {
    setCurrentMusic(currentMusic === music ? null : music);
  };

  const filteredMusicList = musicList.filter((music) =>
    music.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black-100 p-4 grid grid-cols-4 gap-4">
      <Sidebar
        favorites={favorites}
        playlist={playlist}
        onSearchChange={setSearchQuery}
      />
      <div className="col-span-3">
        <h1 className="text-3xl font-bold text-center mb-8">Music Player</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMusicList.map((music) => (
            <div
              key={music.id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
              onClick={() => handleCardClick(music)}
            >
              <img
                src={music.cover}
                alt={music.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold">{music.title}</h2>
              <p className="text-gray-600">{music.artist}</p>
            </div>
          ))}
        </div>
        {currentMusic && (
          <div className="mt-8">
            <PlayerControls
              music={currentMusic}
              onFavorite={handleFavorite}
              onAddToPlaylist={handleAddToPlaylist}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Player;
