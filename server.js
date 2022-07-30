require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs")
const app = express();
const port = process.env.PORT || 4000;

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dir = "./data/mp3"
playlist = []
fs.readdir(dir,
  (err, files) => {
    if (err) {
      throw err;
    }
    console.log(files)
    playlist = files
  }
)
// Handle YouToube
const downloadYT = (req) => {
  var Downloader = require("./downloaderYT");
  var dl = new Downloader();
  var i = 0;

  // Hardcoded video ID, still nog working correctly

  // dl.download(req.body.videoId, "./public/music/", function (err, filename) {
  //   if (err)
  //     throw err;
  //   else { console.log("Downloaded: " + filename); }
  // });

  dl.getMP3({ videoId: "Vhd6Kc4TZls", name: "Cold Funk - Funkorama.mp3" }, function (err, res) {
    i++;
    if (err)
      throw err;
    else {
      console.log("Song " + i + " was downloaded: " + res.file);
    }
  });

  let id = req.body.trackUrl.replace("https://www.youtube.com/watch?v=", "")
  console.log("Video ID: " + id)

  dl.getMP3({ videoId: id, name: id }, function (err, res) {
    i++;
    if (err)
      throw err;
    else {
      console.log("Song " + i + " was downloaded: " + res.file);
    }
  });
};

// Handle SoundCloud
const downloadSC = (req) => {
  const scdl = require("soundcloud-downloader").default;
  const fs = require('fs');
  scdl.download(req.body.trackUrl)
    .then(stream => stream.pipe(fs.createWriteStream('data/mp3/' + Math.random() + ".mp3").on("open", function () {
      console.log("Downloading")
    }))
      .on('finish', function () {
        console.log("Download finished")
      }))
    .catch(err => console.log(err))
}
// Root
app.get('/', (req, res) => {

  let num = Math.random();
  let trackIndex = Math.round((num * (playlist.length - 1)))
  track = playlist[trackIndex]
  console.log(track)
  let file = dir + "/" + track
  const rstream = fs.createReadStream(dir + "/" + track);
  rstream.pipe(res);

  // res.send(track);
});
// Add Track
app.post('/addtrack', (req, res) => {
  let trackUrl = req.body.trackUrl.toLowerCase()
  console.log("request posted to /addtrack")
  console.log(trackUrl)
  let platform = ""

  // Handle YouTube
  if (req.body.trackUrl.toLowerCase().includes("youtube") === true) {
    downloadYT(req)
    platform = "YouTube"
    // Handle SoundCloud
  } else if (req.body.trackUrl.toLowerCase().includes("soundcloud") === true) {
    downloadSC(req)
    platform = "SoundCloud"
  }
  res.send("received " + platform + " Track: " + req.body.trackUrl);
});
app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
})
