import { v4 as uuid } from 'uuid';

import constant from './base.constant';

const { ipcRenderer } = window.require('electron');

const UserHandlers = {};
ipcRenderer.on(constant.user.USER_CONFIG_LOAD_REPLY, (event, args) => {
  if (args.key && UserHandlers[args.key]) {
    const cb = UserHandlers[args.key];
    delete UserHandlers[args.key];
    cb((args.data && JSON.parse(args.data)) || constant.userDefaultConfig);
  }
});

ipcRenderer.on(constant.user.USER_CONFIG_SAVE_REPLY, (event, args) => {
  if (args.key && UserHandlers[args.key]) {
    const cb = UserHandlers[args.key];
    delete UserHandlers[args.key];
    cb();
  }
});

export const appReload = () => {
  ipcRenderer.send(constant.app.APP_RELOAD, {});
};

export const userConfigLoad = cb => {
  const key = uuid();
  UserHandlers[key] = cb;
  ipcRenderer.send(constant.user.USER_CONFIG_LOAD, {
    key,
  });
};

export const userConfigSave = (data, cb) => {
  const key = uuid();
  UserHandlers[key] = cb;
  ipcRenderer.send(constant.user.USER_CONFIG_SAVE, {
    key,
    data: JSON.stringify(data, null, 2),
  });
};
