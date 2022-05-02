const { app, BrowserWindow, Menu } = require('electron');
const { ipcMain } = require('electron');
// disable menu
Menu.setApplicationMenu(null);

const path = require('path');
const { loadConfig } = require('./config');
const basePath = process.cwd();

let mainWindow;
const loadMain = () => {
  mainWindow.loadURL('http://localhost:8080/');
};
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 1024,
    minHeight: 768,
    frame: true,
    icon: path.join(basePath, `${'public'}/icon.png`),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      webSecurity: false,
    },
    backgroundColor: '#000',
  });
  loadConfig(config => {
    const appConfig = config.app;
    let proxyRules = '';
    if (appConfig) {
      if (appConfig.use_proxy) {
        proxyRules = `${appConfig.proxy_protocol}://${appConfig.proxy_ip}:${appConfig.proxy_port}`;
      }
    }
    mainWindow.webContents.session
      .setProxy({
        proxyRules: proxyRules,
        proxyBypassRules: '192.168.*.*',
      })
      .then(() => {
        loadMain();
      });
  });
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // 注册用户配置相关
  const userHandler = require('./user.handler');
  userHandler.init();
  // 注册数据配置相关
  const steamHandler = require('./steam.handler');
  // steamHandler.init();

  ipcMain.on('steam.load.page', (event, arg) => {
    if (arg.key) {
      steamHandler.pushItems(JSON.parse(arg.data));
      steamHandler.loadItem();
    }
  });

  ipcMain.on('app.reload', () => {
    // console.error('reload');
    const oldMain = mainWindow;
    oldMain.hide();
    createWindow();
    oldMain.close();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
