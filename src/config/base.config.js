import { v4 as uuid } from 'uuid';

import constant from './base.constant';

const { ipcRenderer } = window.require('electron');

const path = window.require('path');

export const ROOT_PATH = process.cwd();
export const BASE_PATH = path.join(ROOT_PATH, 'user/');
export const USER_CONFIG_DIR = path.join(BASE_PATH, 'config');
export const USER_CONFIG_FILE = path.join(BASE_PATH, 'config/config.json');

const UserHandlers = {};
ipcRenderer.on(constant.user.USER_CONFIG_LOAD_REPLY, (event, args) => {
  if (args.key && UserHandlers[args.key]) {
    const cb = UserHandlers[args.key];
    delete UserHandlers[args.key];
    cb((args.data && JSON.parse(args.data)) || constant.userDefaultConfig);
  }
});

export const userConfigLoad = cb => {
  const key = uuid();
  UserHandlers[key] = cb;
  ipcRenderer.send(constant.user.USER_CONFIG_LOAD, {
    key,
    path: USER_CONFIG_FILE,
  });
};

export const userConfigSave = (data, cb) => {
  const key = uuid();
  UserHandlers[key] = cb;
  ipcRenderer.send(constant.user.USER_CONFIG_SAVE, {
    key,
    dir: USER_CONFIG_DIR,
    path: USER_CONFIG_FILE,
    data: JSON.stringify(data, null, 2),
  });
};
