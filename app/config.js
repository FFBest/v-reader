const fs = require('fs');
const { USER_CONFIG_FILE } = require('./constant');

module.exports = {
  loadConfig(cb) {
    fs.readFile(USER_CONFIG_FILE, { encoding: 'utf8' }, (err, data) => {
      if (err) {
        console.log(err);
      }
      cb(JSON.parse(data || '{}'));
    });
  },
};
