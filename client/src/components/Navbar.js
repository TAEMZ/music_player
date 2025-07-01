import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-black p-4 ">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-white text-lg font-semibold hover:text-gray-200 transition duration-300">
        Home
      </Link>
      <Link to="/player" className="text-white text-lg font-semibold hover:text-gray-200 transition duration-300">
        Player
      </Link>
      <Link to="/upload" className="text-white text-lg font-semibold hover:text-gray-200 transition duration-300">
        Upload
      </Link>
   
    </div>
  </nav>
);

export default Navbar;
