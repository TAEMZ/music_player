import axios from 'axios';

const API_URL = 'http://localhost:8000/api/music';
//const API_URL = process.env.API_URL;
export const fetchMusic = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
