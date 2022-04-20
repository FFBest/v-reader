const { ipcMain } = require('electron');

const fs = require('fs');
const { USER_CONFIG_FILE, USER_CONFIG_DIR } = require('./constant');

const handlerConfig = () => {
  ipcMain.on('user.config.load', (event, arg) => {
    if (arg.key) {
      fs.readFile(USER_CONFIG_FILE, { encoding: 'utf8' }, (err, data) => {
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
    if (arg.key) {
      fs.mkdir(USER_CONFIG_DIR, { recursive: true }, direrr => {
        if (direrr) {
          console.log(direrr);
          event.sender.send('user.config.save.reply', {
            key: arg.key,
            err: JSON.stringify(direrr),
          });
        } else {
          fs.writeFile(
            USER_CONFIG_FILE,
            arg.data,
            { encoding: 'utf8' },
            err => {
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
            },
          );
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
