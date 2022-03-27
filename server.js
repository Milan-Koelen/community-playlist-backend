require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;


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
  console.log(req.body)
  // Handle youtube
  if (trackUrl.includes("youtube") == true) {

    console.log("YouTube Track Added")
  } else if (trackUrl.includes("soundcloud") == true) {
    console.log("SoundCloud Track Added")
  }
  console.log(req.body)


  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});