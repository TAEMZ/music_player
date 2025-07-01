import React, { useState } from 'react';
import axios from 'axios';

const UploadMusic = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [musicFile, setMusicFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleMusicFileChange = (e) => {
    setMusicFile(e.target.files[0]);
  };

  const handleCoverFileChange = (e) => {
    setCoverFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!musicFile || !title || !artist || !coverFile) {
      setMessage('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('music', musicFile);
    formData.append('cover', coverFile);

    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      setTitle('');
      setArtist('');
      setMusicFile(null);
      setCoverFile(null);
    } catch (error) {
      setMessage('File upload failed. ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div className="upload-music max-w-md mx-auto mt-12 bg-white shadow-md p-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Upload Music</h2>
      {message && <p className="text-center text-green-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="artist" className="block text-sm font-medium text-gray-700">Artist:</label>
          <input
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="music" className="block text-sm font-medium text-gray-700">Music:</label>
          <input
            type="file"
            id="music"
            accept=".mp3,.wav"
            onChange={handleMusicFileChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="cover" className="block text-sm font-medium text-gray-700">Cover:</label>
          <input
            type="file"
            id="cover"
            accept=".jpg,.png"
            onChange={handleCoverFileChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadMusic;
