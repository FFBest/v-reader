import { v4 as uuid } from 'uuid';

import constant from './base.constant';

const { ipcRenderer } = window.require('electron');

const SteamHandlers = {};

ipcRenderer.on(constant.steam.STEAM_LOAD_PAGE_REPLY, (event, args) => {
  if (args.key && SteamHandlers[args.key]) {
    const cb = SteamHandlers[args.key];
    delete SteamHandlers[args.key];
    cb(args.data);
  }
});

export const loadSteamPage = (data, cb) => {
  const key = uuid();
  SteamHandlers[key] = cb;
  ipcRenderer.send(constant.steam.STEAM_LOAD_PAGE, {
    key,
    data: JSON.stringify(data, null, 2),
  });
};
