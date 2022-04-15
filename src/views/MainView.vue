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
    <a-layout>
      <a-layout-sider v-model:collapsed="collapsed"> Sider </a-layout-sider>
      <a-layout>
        <a-layout-content>{{ userConfig }}</a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
  <comp-user-config :visible="userConfigVisible" @compClose="userConfigClose" />
  <comp-user-login :visible="userLoginVisible" />
</template>

<script>
import { ref } from 'vue';
import CompUserConfig from '@/components/UserConfig';
import CompUserLogin from '@/components/UserLogin';
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
