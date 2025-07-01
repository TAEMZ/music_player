import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStop, FaHeart, FaPlus, FaForward, FaBackward } from 'react-icons/fa';

const PlayerControls = ({ music, onFavorite, onAddToPlaylist }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      }
    };

    audioRef.current?.addEventListener('timeupdate', updateProgress);
    return () => {
      audioRef.current?.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const handleSeek = (event) => {
    const width = event.currentTarget.clientWidth;
    const clickX = event.nativeEvent.offsetX;
    const duration = audioRef.current.duration;
    audioRef.current.currentTime = (clickX / width) * duration;
  };

  const handleFavorite = () => {
    onFavorite(music);
  };

  const handleAddToPlaylist = () => {
    onAddToPlaylist(music);
  };

  return (
    <div className="flex flex-col items-center">
      <audio ref={audioRef} src={music.url} />
      <div className="relative w-full bg-gray-300 h-1 my-2 cursor-pointer" onClick={handleSeek}>
        <div className="absolute top-0 left-0 h-1 bg-blue-600" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={handlePlayPause}
          className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button
          onClick={handleStop}
          className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          <FaStop />
        </button>
        <button
          onClick={() => (audioRef.current.currentTime -= 10)}
          className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          <FaBackward />
        </button>
        <button
          onClick={() => (audioRef.current.currentTime += 10)}
          className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          <FaForward />
        </button>
        <button
          onClick={handleFavorite}
          className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          <FaHeart />
        </button>
        <button
          onClick={handleAddToPlaylist}
          className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default PlayerControls;
