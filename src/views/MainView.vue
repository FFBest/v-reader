<template>
  <a-layout>
    <a-layout-header>
      <div class="main-header-sider">
        <template v-if="collapsed">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined
            v-else
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
        </template>
      </div>
      <div class="main-header-content">
        <a-button
          type="text"
          @click="() => (userLoginVisible = !userLoginVisible)"
          ><user-outlined
        /></a-button>
        <a-button
          type="text"
          @click="() => (userConfigVisible = !userConfigVisible)"
          ><setting-outlined
        /></a-button>
      </div>
    </a-layout-header>
    <a-layout v-if="userAuth">
      <a-layout-sider v-model:collapsed="collapsed">
        <comp-sider />
      </a-layout-sider>
      <a-layout>
        <a-layout-content>{{ userConfig }}</a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
  <comp-user-config :visible="userConfigVisible" @compClose="userConfigClose" />
  <comp-user-login
    :visible="userLoginVisible"
    @compClose="() => (userLoginVisible = !userLoginVisible)"
  />
</template>

<script>
import { ref } from 'vue';
import CompUserConfig from '@/components/UserConfig';
import CompUserLogin from '@/components/UserLogin';
import CompSider from '@/components/CompSider';
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';

export default {
  components: {
    CompUserConfig,
    CompUserLogin,
    CompSider,
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SettingOutlined,
  },
  setup() {
    return {
      collapsed: ref(false),
      userConfigVisible: ref(false),
      userLoginVisible: ref(false),
    };
  },
  computed: {
    userConfig() {
      return this.$store.state.userConfig;
    },
    userAuth() {
      return (
        this.$store.state.userConfig &&
        this.$store.state.userConfig.app &&
        this.$store.state.userConfig.app.auth
      );
    },
  },
  methods: {
    userConfigClose() {
      this.userConfigVisible = false;
    },
    userLoginClose() {
      this.userLoginVisible = false;
    },
  },
};
</script>
