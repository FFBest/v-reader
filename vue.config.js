const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    },
  },
  chainWebpack: config => {
    config.target = 'electron-main';
  },
});
