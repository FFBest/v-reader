<template>
  <a-modal
    :visible="true"
    centered
    :closable="false"
    :keyboard="false"
    :width="456"
    :footer="null"
  >
    <h3>Settings</h3>
    <a-form
      class="user-config-form"
      :model="formState"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="client_id">
        <a-input v-model:value="formState.client_id" />
      </a-form-item>
      <a-form-item label="client_secret">
        <a-input v-model:checked="formState.client_secret" />
      </a-form-item>
      <a-form-item label="use_proxy">
        <a-switch v-model:checked="formState.use_proxy" />
      </a-form-item>
      <a-form-item label="proxy">
        <a-input
          v-model:value="formState.proxy"
          :disabled="!formState.use_proxy"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 20, offset: 0 }">
        <a-button type="text">Cancel</a-button>
        <a-button style="margin-left: 10px" type="text" @click="saveConfig">
          Save
        </a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    const userConfig = store.state.userConfig;
    const formState = reactive({
      client_id: userConfig.app.client_id,
      client_secret: userConfig.app.client_secret,
      use_proxy: userConfig.app.use_proxy,
      proxy: userConfig.app.proxy,
    });
    const saveConfig = () => {
      store.commit('updateUserConfig', { app: { ...formState } });
    };
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      formState,
      saveConfig,
    };
  },
};
</script>
