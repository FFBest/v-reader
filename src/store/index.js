import { createStore } from 'vuex';

import { assignIn } from 'lodash';
import { userConfigSave } from '@/config/base.config';

export default createStore({
  state: {
    userConfig: null,
  },
  getters: {},
  mutations: {
    updateUserConfig(state, config) {
      state.userConfig = assignIn({}, state.userConfig, config);
      // console.error(config);
      // console.error(state.userConfig);
      userConfigSave(state.userConfig, data => {
        console.error(data);
      });
    },
  },
  actions: {},
  modules: {},
});
