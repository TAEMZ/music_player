import React from "react";
import { FaHeart } from "react-icons/fa";

const Favorites = ({ favorites }) => {
  return (
    <div className="sidebar bg-gray-800 text-white h-full p-4">
      <h2 className="text-xl font-bold mb-4">
        <FaHeart className="inline mr-2" /> Favorites
      </h2>
      <ul className="space-y-4">
        {favorites.map((music, index) => (
          <li key={index} className="hover:bg-gray-600 p-2 rounded">
            {music.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
