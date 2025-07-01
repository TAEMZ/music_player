require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8000;

// Function to ensure directories exist
const ensureDirExistence = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "";
    if (file.fieldname === "music") {
      uploadPath = "./public/resources/musics";
    } else if (file.fieldname === "cover") {
      uploadPath = "./public/resources/covers";
    }

    ensureDirExistence(uploadPath); // Ensure directory exists
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // limit file size to 10MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).fields([
  { name: "music", maxCount: 1 },
  { name: "cover", maxCount: 1 },
]);

// Check file type
function checkFileType(file, cb) {
  const musicFileTypes = /mp3|wav/;
  const coverFileTypes = /jpg|jpeg|png/;
  const extname =
    file.fieldname === "music"
      ? musicFileTypes.test(path.extname(file.originalname).toLowerCase())
      : coverFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype =
    file.fieldname === "music"
      ? /audio\/(mpeg|wav)/.test(file.mimetype)
      : /image\/(jpeg|png)/.test(file.mimetype);

  console.log("File original name:", file.originalname);
  console.log("File mimetype:", file.mimetype);
  console.log("File extension check:", extname);
  console.log("File mimetype check:", mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Invalid file type!");
  }
}

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to database");
  }
});

app.use(cors());
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hello, Music Player!");
});

app.get("/api/music", (req, res) => {
  console.log("1eklf ");
  const sql = "SELECT * FROM music";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching music:", err);
      res.status(500).json({ error: "Failed to fetch music" });
    } else {
      res.json(result);
    }
  });
});

app.post("/upload", (req, res) => {
  console.log("2eklf blerjh ");
  upload(req, res, (err) => {
    console.log("3eklf blerjh ");
    if (err) {
      console.log("error", err);
      return res.status(400).json({ success: false, message: err });
    } else {
      if (!req.files["music"] || !req.files["cover"]) {
        console.log("4eklf blerjh ");
        return res
          .status(400)
          .json({ success: false, message: "All files are required!" });
      } else {
        console.log("5eklf blerjh ");
        const musicUrl = `http://localhost:8000/public/resources/musics/${req.files["music"][0].filename}`;
        const coverUrl = `http://localhost:8000/public/resources/covers/${req.files["cover"][0].filename}`;
        const { title, artist } = req.body;

        const sql =
          "INSERT INTO music (title, artist, url, cover) VALUES (?, ?, ?, ?)";
        db.query(sql, [title, artist, musicUrl, coverUrl], (err, result) => {
          if (err) {
            console.error("Database insert failed:", err); // Log the error
            return res.status(500).json({
              success: false,
              message: "Database insert failed",
              error: err,
            });
          }
          console.log("Database insert succeeded:", result); // Log the result
          res.status(200).json({
            success: true,
            message: "File uploaded!",
            musicUrl,
            coverUrl,
          });
        });
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
