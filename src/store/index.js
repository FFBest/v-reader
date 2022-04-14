import { createStore } from 'vuex';

import { assignIn } from 'lodash';

export default createStore({
  state: {
    userConfig: null,
  },
  getters: {},
  mutations: {
    updateUserConfig(state, config) {
      state.userConfig = assignIn({}, state.userConfig, config);
      console.error(config);
      console.error(state.userConfig);
    },
  },
  actions: {},
  modules: {},
});
