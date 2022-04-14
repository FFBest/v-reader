<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { userConfigLoad } from './config/base.config';
export default {
  data() {
    return {};
  },
  created() {
    userConfigLoad(config => {
      this.$store.commit('updateUserConfig', config);
    });
  },
  setup() {},
  computed: {
    locale() {
      return zhCN;
    },
  },
};
</script>
