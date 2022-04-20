const path = require('path');

const ROOT_PATH = process.cwd();
const BASE_PATH = path.join(ROOT_PATH, 'user/');
const USER_CONFIG_DIR = path.join(BASE_PATH, 'config');
const USER_CONFIG_FILE = path.join(BASE_PATH, 'config/config.json');

module.exports = {
  ROOT_PATH,
  BASE_PATH,
  USER_CONFIG_DIR,
  USER_CONFIG_FILE,
};
