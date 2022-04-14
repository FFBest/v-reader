<template>
  <a-layout
    v-if="userConfig && userConfig.token && userConfig.token.access_token"
  >
    <a-layout-sider>Sider</a-layout-sider>
    <a-layout>
      <a-layout-content>{{ userConfig }}</a-layout-content>
    </a-layout>
  </a-layout>
  <template
    v-else-if="
      userConfig &&
      userConfig.app &&
      !(userConfig.app.client_id || userConfig.app.client_secret)
    "
  >
    <comp-user-config />
  </template>
</template>

<script>
import CompUserConfig from '@/components/UserConfig';

export default {
  components: {
    CompUserConfig,
  },
  setup() {},
  computed: {
    userConfig() {
      return this.$store.state.userConfig;
    },
  },
};
</script>
