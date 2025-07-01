// populate-db.js

const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to database');
    insertMusicData();
  }
});

function insertMusicData() {
  const musicData = JSON.parse(fs.readFileSync('music-data.json', 'utf8'));

  const sql = 'INSERT INTO music (title, artist, url, cover) VALUES ?';
  const values = musicData.map((music) => [music.title, music.artist, music.url, music.cover]);

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Error inserting music data:', err);
    } else {
      console.log('Music data inserted successfully');
    }
    db.end();
  });
}
