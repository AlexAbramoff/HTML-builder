const path = require('path');
const fs = require('fs');
const bundleFilePath = path.join(__dirname, 'project-dist', 'bundle.css');
const sourceDir = path.join(__dirname, 'styles');
fs.readdir(sourceDir, 'utf-8', (err, files) => {
  if (err) {
    throw err;
  }
  fs.writeFile(bundleFilePath, '', err => {
    if (err) {
      throw err;
    }
  });
  files.forEach(file => {
    if (path.parse(path.join(sourceDir, file)).ext === '.css') {
      let stream = fs.createReadStream(path.join(sourceDir, file));
      stream.on('data', data => {
        fs.appendFile(bundleFilePath, data, err => {
          if (err) {
            throw err;
          }
        });
      });
    }
  });
});
