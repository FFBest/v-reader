import { createStore } from 'vuex';

import { merge } from 'lodash';
import { appReload, userConfigSave } from '@/config/base.config';

export default createStore({
  state: {
    userConfig: null,
  },
  getters: {},
  mutations: {
    updateUserConfig(state, config) {
      const oldConfig = state.userConfig;
      state.userConfig = merge({}, state.userConfig, config);
      // console.error(config);
      // console.error(state.userConfig);
      userConfigSave(state.userConfig, () => {
        // console.log(d);
        if (oldConfig) {
          if (
            oldConfig.app &&
            oldConfig.app.use_proxy == state.userConfig.app.use_proxy
          ) {
            return;
          }
          appReload();
        }
      });
    },
  },
  actions: {},
  modules: {},
});
