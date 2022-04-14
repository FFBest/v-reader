const { ipcMain } = require('electron');

const fs = require('fs');

const handlerConfig = () => {
  ipcMain.on('user.config.load', (event, arg) => {
    if (arg.key && arg.path) {
      fs.readFile(arg.path, { encoding: 'utf8' }, (err, data) => {
        if (err) {
          console.log(err);
        }
        event.sender.send('user.config.load.reply', {
          key: arg.key,
          data: data,
        });
      });
    }
  });
  ipcMain.on('user.config.save', (event, arg) => {
    console.error(event, arg);
  });
};

module.exports = {
  init() {
    handlerConfig();
  },
};
