import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaPlus, FaSearch, FaUpload } from "react-icons/fa";

const Sidebar = ({ favorites, playlist, onSearchChange }) => {
  return (
    <div className="sidebar bg-gray-800 text-white h-full p-4">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <ul className="space-y-4">
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link to="/favorites">
            <FaHeart className="inline mr-2" /> Favorites
          </Link>
          <ul className="ml-4 mt-2">
            {favorites.map((music, index) => (
              <li key={index} className="hover:bg-gray-600 p-2 rounded">
                {music.title}
              </li>
            ))}
          </ul>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link to="/search">
            <FaSearch className="inline mr-2" /> Search
          </Link>
          <input
            type="text"
            placeholder="Search by title"
            className="mt-2 p-2 w-full bg-gray-700 text-white rounded"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </li>
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link to="/playlist">
            <FaPlus className="inline mr-2" /> Playlist
          </Link>
          <ul className="ml-4 mt-2">
            {playlist.map((music, index) => (
              <li key={index} className="hover:bg-gray-600 p-2 rounded">
                {music.title}
              </li>
            ))}
          </ul>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link to="/upload">
            <FaUpload className="inline mr-2" /> Upload
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
