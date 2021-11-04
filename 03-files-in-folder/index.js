const path = require('path');
const fs = require('fs');
const secretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolder, 'utf-8', (err, files) => {
  if (err) {
    throw err;
  }
  files.forEach(file => {
    fs.stat(path.join(secretFolder, file), (err, stats) => {
      if (err) {
        throw err;
      }
      if (stats.isFile()) {
        console.log(`${path.parse(path.join(secretFolder, file)).name} - ${path.parse(path.join(secretFolder, file)).ext.slice(1)} - ${stats.size}b`
        );
      }
    });
  });
});
