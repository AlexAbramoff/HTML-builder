const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const process = require('process');
const readConsole = readline.createInterface({ input, output });
const filePath = path.join(__dirname, 'text.txt');

//Clear file
fs.writeFile(filePath, '', error => {
  if (error) {
    throw error;
  }
});
writeToFile();
process.on('exit', () => {
  console.log('\nGoodbye!');
});
function writeToFile() {
  readConsole.question('Enter text: ', answer => {
    if (answer === 'exit') {
      process.exit();
    } else {
      fs.appendFile(filePath, `${answer}\n`, err => {
        if (err) {
          throw err;
        }
      });
      writeToFile();
    }
  });
}