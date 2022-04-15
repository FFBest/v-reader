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
    if (arg.key && arg.dir && arg.path) {
      fs.mkdir(arg.dir, { recursive: true }, direrr => {
        if (direrr) {
          console.log(direrr);
          event.sender.send('user.config.save.reply', {
            key: arg.key,
            err: JSON.stringify(direrr),
          });
        } else {
          fs.writeFile(arg.path, arg.data, { encoding: 'utf8' }, err => {
            if (err) {
              console.log(err);
              event.sender.send('user.config.save.reply', {
                key: arg.key,
                err: JSON.stringify(err),
              });
            } else {
              event.sender.send('user.config.save.reply', {
                key: arg.key,
              });
            }
          });
        }
      });
    }
  });
};

module.exports = {
  init() {
    handlerConfig();
  },
};
