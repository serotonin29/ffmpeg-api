const express = require("express");
const multer = require("multer");
const { execFile } = require("child_process");
const fs = require("fs");

const upload = multer({ dest: "/tmp" });
const app = express();

app.post("/convert", upload.single("file"), (req, res) => {
  const input = req.file.path;
  const output = `${input}.ogg`;

  execFile("ffmpeg", [
    "-i", input,
    "-c:a", "libopus",
    "-b:a", "24k",
    "-ar", "48000",
    "-ac", "1",
    output
  ], err => {
    if (err) return res.status(500).send(err.toString());
    res.type("audio/ogg");
    fs.createReadStream(output).pipe(res);
  });
});

app.listen(3000, () => {
  console.log("ffmpeg API listening on 3000");
});
