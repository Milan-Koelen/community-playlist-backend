require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
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
// app.use(bodyParser.urlencoded({ extended: false }));

const playlist = ["track 1", "track 2", "track 3", "track 4", "track 5", "track 6", "track 7", "track 8", "track 9", "track 10",
  "track 11", "track 12", "track 13", "track 14", "track 15", "track 16", "track 17", "track 18", "track 19", "track 20"]

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

  // const Downloader = require("./downloaderYT");
  // const dl = new Downloader();
  // const i = 0;

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
  console.log(req.body)
  console.log("SoundCloud Track Added")

}

// Root
app.get('/', (req, res) => {
  let num = Math.random();
  let trackIndex = Math.round((num * playlist.length) - 1)
  console.log(playlist[trackIndex])
  res.send("num");
});
// Add Track
app.post('/addtrack', (req, res) => {
  let trackUrl = req.body.trackUrl.toLowerCase()
  console.log("request posted to /addtrack")
  if (trackUrl.includes("youtube") == true) {
    // Handle YouTube
    downloadYT(req)
  } else if (trackUrl.includes("soundcloud") == true) {
    // Handle SoundCloud
    downloadSC(req)
  }
  res.send("received: " + req.body.trackUrl);
});

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
})
