// src/components/SearchSidebar.js
import React, { useState, useEffect } from "react";

const SearchSidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [mostSearched, setMostSearched] = useState([]);

  useEffect(() => {
    // Fetch recent and most searched data from an API or local storage
    const recent = ["Song One", "Song Two", "Song Three"]; // Example data
    const most = ["Song Four", "Song Five", "Song Six"]; // Example data
    setRecentSearches(recent);
    setMostSearched(most);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="search-sidebar bg-gray-800 text-white h-full p-4">
      <h2 className="text-xl font-bold mb-4">Search</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          placeholder="Search for music..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="w-full p-2 bg-blue-500 rounded">
          Search
        </button>
      </form>
      <h3 className="text-lg font-bold mt-4">Recent Searches</h3>
      <ul className="space-y-2 mt-2">
        {recentSearches.map((item, index) => (
          <li key={index} className="hover:bg-gray-700 p-2 rounded">
            {item}
          </li>
        ))}
      </ul>
      <h3 className="text-lg font-bold mt-4">Most Searched</h3>
      <ul className="space-y-2 mt-2">
        {mostSearched.map((item, index) => (
          <li key={index} className="hover:bg-gray-700 p-2 rounded">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchSidebar;
