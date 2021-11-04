const path=require('path');
const fs = require('fs');
const { stdin,stdout } = require('process');
const sourceFile = path.join(__dirname, 'text.txt');
const readaStream = fs.createReadStream(sourceFile);
readaStream.on('data', (data) => {
  console.log(data.toString())
})