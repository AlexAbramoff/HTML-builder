const path = require('path');
const fs = require('fs');
const distDir = path.join(__dirname, 'project-dist');
const stylesDir = path.join(__dirname, 'styles');
const componentsDir = path.join(__dirname, 'components');
const assetsPath = path.join(__dirname, 'assets');
const templateFile = path.join(__dirname, 'template.html');
let htmlString;
fs.mkdir(distDir, { recursive: true }, err => {
  if (err) {
    throw err;
  }
  createHTML();
  bundleStyles();
  copyAssets();
});

function createHTML() {
  const readStream = fs.createReadStream(templateFile);
  readStream.on('data', data => {
    htmlString = data.toString();
    fs.readdir(componentsDir, function (err, files) {
      if (err) {
        throw err;
      }
        files.forEach(file => {
          let readStream = fs.createReadStream(path.join(componentsDir, file));
          readStream.on('data', data => {
            htmlString = htmlString.replace(`{{${file.slice(0, file.indexOf('.'))}}}`, data);
            fs.writeFile(path.join(distDir, 'index.html'), htmlString, err => {
              if (err) {
                throw err;
              }
            });
          });
        });
    });
  });
}
function bundleStyles() {
  fs.readdir(stylesDir, 'utf-8', (err, files) => {
    if (err) {
      throw err;
    }
    fs.writeFile(path.join(distDir, 'style.css'), '', err => {
      if (err) {
        throw err;
      }
    });
    files.forEach(file => {
      if (path.parse(path.join(stylesDir, file)).ext === '.css') {
        let stream = fs.createReadStream(path.join(stylesDir, file));
        stream.on('data', data => {
          fs.appendFile(path.join(distDir, 'style.css'), `\n${data}`, err => {
            if (err) {
              throw err;
            }
          });
        });
      }
    });
  });
}
function copyAssets() {
  fs.mkdir(path.join(distDir, 'assets'), { recursive: true }, err => {
    if (err) {
      throw err;
    }
    clearDirectory(path.join(distDir, 'assets'));
    copy(assetsPath);
  });

  function copy(folder, subDir = '') {
  fs.readdir(folder, { withFileTypes: true }, (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach(file => {
      if (file.isDirectory()) {
        fs.mkdir(path.join(distDir, 'assets', file.name), { recursive: true }, err => {
          if (err) {
            throw err;
          }
          copy(path.join(folder, file.name), file.name);
        });
      } else {
        fs.copyFile(path.join(folder, file.name), path.join(distDir, 'assets', subDir, file.name), err => {
          if (err) {
            throw err;
          }
        });
      }
    });
  });
  }

  function clearDirectory(dir,subDir='') {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      throw err
    }
    files.forEach(file => {
      if (file.isDirectory()) {
        clearDirectory(path.join(dir,file.name),file.name)
      } else {
        fs.unlink(path.join(dir, file.name), err => {
          if (err) {
            throw err
          }
        })
      }
    })
  })
}
}