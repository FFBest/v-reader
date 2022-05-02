const { BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');
const { STEAM_DATA_DIR } = require('./constant');

const items = [];
let inLoad = false;

module.exports = {
  pushItems(data) {
    items.push(data);
  },
  loadItem() {
    if (!inLoad) {
      const item = items.shift();
      if (item) {
        this.load(item.title, item.url);
      } else {
        console.error('steam load finish');
      }
    }
  },
  load(title, url) {
    inLoad = true;
    const win = new BrowserWindow({ show: false });
    win.maximize();
    win.show();
    win.loadURL(url);

    win.webContents.on('did-finish-load', () => {
      // Use default printing options
      const pdfPath = path.join(STEAM_DATA_DIR, `${title}.pdf`);
      win.webContents
        .printToPDF({})
        .then(data => {
          fs.writeFile(pdfPath, data, error => {
            if (error) throw error;
            console.log(`Wrote PDF successfully to ${pdfPath}`);
            win.destroy();
            inLoad = false;
            this.loadItem();
          });
        })
        .catch(error => {
          console.log(`Failed to write PDF to ${pdfPath}: `, error);
          win.destroy();
          inLoad = false;
          this.loadItem();
        });
    });
  },
};
