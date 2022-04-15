<template>
  <a-modal
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
      <a-form-item label="app_id">
        <a-input v-model:value="formState.app_id" />
      </a-form-item>
      <a-form-item label="app_key">
        <a-input v-model:value="formState.app_key" />
      </a-form-item>
      <a-form-item label="use_proxy">
        <a-switch v-model:checked="formState.use_proxy" />
      </a-form-item>
      <a-form-item :label="`${formState.proxy_protocol}`">
        <div class="user-config-proxy-input">
          <a-input
            v-model:value="formState.proxy_ip"
            :disabled="!formState.use_proxy"
            placeholder="ip"
          />
          <div>&nbsp;:&nbsp;</div>
          <a-input
            v-model:value="formState.proxy_port"
            :disabled="!formState.use_proxy"
            placeholder="port"
          />
        </div>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 20, offset: 0 }">
        <a-button type="text" @click="compClose">Cancel</a-button>
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
  setup(props, context) {
    const store = useStore();
    const userConfig = store.state.userConfig;
    const formState = reactive({
      app_id: userConfig.app.app_id,
      app_key: userConfig.app.app_key,
      use_proxy: userConfig.app.use_proxy,
      proxy_protocol: userConfig.app.proxy_protocol,
      proxy_ip: userConfig.app.proxy_ip,
      proxy_port: userConfig.app.proxy_port,
    });

    const compClose = () => {
      context.emit('comp-close');
    };
    const saveConfig = () => {
      store.commit('updateUserConfig', { app: { ...formState } });
      compClose();
    };
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      formState,
      saveConfig,
      compClose,
    };
  },
};
</script>
