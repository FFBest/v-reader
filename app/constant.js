const path = require('path');

const ROOT_PATH = process.cwd();
const BASE_PATH = path.join(ROOT_PATH, 'user/');
const USER_CONFIG_DIR = path.join(BASE_PATH, 'config');
const USER_CONFIG_FILE = path.join(BASE_PATH, 'config/config.json');

const STEAM_DATA_DIR = path.join(BASE_PATH, 'steam');
const STEAM_DATA_STAR = path.join(BASE_PATH, 'steam/star.json');

module.exports = {
  ROOT_PATH,
  BASE_PATH,
  USER_CONFIG_DIR,
  USER_CONFIG_FILE,
  STEAM_DATA_DIR,
  STEAM_DATA_STAR,
};
