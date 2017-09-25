const { readFile, writeFile } = require('fs');
const { compare } = require('bcrypt');

const readJSON = async path => {
  return new Promise((resolve, reject) => {
    readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    })
  })
}

module.exports = {
  readJSON
}