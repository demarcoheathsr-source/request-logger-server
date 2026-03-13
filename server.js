const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// configure multer to save uploaded files
const upload = multer({ dest: "uploads/" });

// log all requests
app.use((req, res, next) => {
  console.log("---- Incoming Request ----");
  console.log("Time:", new Date().toISOString());
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Headers:", req.headers);
  if (req.body) console.log("Body:", req.body);
  console.log("--------------------------");
  next();
});

// serve secret.json
app.get("/secret", (req, res) => {
  res.sendFile(path.join(__dirname, "secret.json"));
});

// upload JSON file
app.post("/upload", upload.single("file"), (req, res) => {
  console.log("Uploaded file:", req.file);
  res.json({
    status: "uploaded",
    filename: req.file.originalname
  });
});

// list uploaded files (optional, useful for testing)
app.get("/uploads", (req, res) => {
  fs.readdir("uploads", (err, files) => {
    if (err) return res.status(500).send("Error reading uploads");
    res.json({ files });
  });
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
