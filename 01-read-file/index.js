const path=require('path');
const fs = require('fs');

const sourceFile = path.join(__dirname, 'text.txt');
fs.readFile(sourceFile, 'utf-8', (err,data) => {
  if (err) {
    throw err
  }
  console.log(data);
})