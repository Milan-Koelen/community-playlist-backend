const scdl = require("soundcloud-downloader").default;
const fs = require('fs')

const constants = {url: "https://soundcloud.com/globuldub/sweet-storm"}

scdl.download(constants.url)
  .then(stream => stream.pipe(fs.createWriteStream('data/mp3/'+ Math.random()+".mp3").on("open", function(){
    console.log("Downloading")
  }))
  .on('finish',function(){
    console.log("Download finished")}))
  .catch(err => console.log(err))