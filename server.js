const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));

const playlist = ["track 1", "track 2", "track 3", "track 4", "track 5", "track 6", "track 7", "track 8", "track 9", "track 10",
  "track 11", "track 12", "track 13", "track 14", "track 15", "track 16", "track 17", "track 18", "track 19", "track 20"]

// Root
app.get('/', (req, res) => {
  let num = Math.random();
  let trackIndex = Math.round(num * playlist.length)
  console.log(playlist[trackIndex])
  res.send("num");
});
// Add Track
app.get('/addtrack', (req, res) => {


  res.send('This is the second endpoint');
});

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});