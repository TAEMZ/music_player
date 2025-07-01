import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Player from './pages/Player';
import UploadMusic from './components/UploadMusic';
import Favorites from './components/Favorites'; // Import Favorites component
import Playlist from './components/Playlist'; // Import Playlist component

const App = () => {
  const [playlist, setPlaylist] = useState([]);
  useEffect(() => {
    // Initialize AOS or any other necessary initialization
  }, []);
  

  return (
    <BrowserRouter>
      <div className='fixed top-0 w-screen'>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player" element={<Player playlist={playlist} setPlaylist={setPlaylist} />} />
        <Route path="/upload" element={<UploadMusic />} />
        <Route path="/favorites" element={<Favorites favorites={Favorites} />} />
        <Route path="/playlist" element={<Playlist playlist={playlist} setPlaylist={setPlaylist} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
