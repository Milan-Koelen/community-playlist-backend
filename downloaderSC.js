const scdl = require("soundcloud-downloader").default;
const fs = require('fs')

const constants = {url: "https://soundcloud.com/globuldub/sweet-storm"}

scdl.download(constants.url)
  .then(stream => stream.pipe(fs.createWriteStream('data/mp3/'+ Math.random()+".mp3")))
  .catch(err => console.log(err))