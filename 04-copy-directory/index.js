const path = require('path');
const fs = require('fs');
// const { clear } = require('console');
const copyFolder = path.join(__dirname, 'files-copy');
const sourceDir = path.join(__dirname, 'files');
fs.mkdir(copyFolder, { recursive: true }, err => {
  if (err) {
    throw err;
  }
  clearDirectory();
  fs.readdir(sourceDir, 'utf-8', (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach(file => {
      fs.copyFile(path.join(sourceDir, file), path.join(copyFolder, file), err => {
        if (err) {
          throw err;
        }
      });
    });
  });
});

function clearDirectory() {
  fs.readdir(copyFolder, 'utf-8', (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach(file => {
      fs.unlink(path.join(copyFolder, file), err => {
        if (err) {
          throw err;
        }
      });
    });
  });
}
