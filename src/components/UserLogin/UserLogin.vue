<template>
  <a-modal
    centered
    :closable="false"
    :keyboard="false"
    :width="456"
    :footer="null"
  >
    <h3>User Login</h3>
    <a-form
      class="user-login-form"
      :model="formState"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="email">
        <a-input v-model:value="formState.email" />
      </a-form-item>
      <a-form-item label="password">
        <a-input-password v-model:value="formState.passwd" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 20, offset: 0 }">
        <a-button style="margin-left: 10px" type="text" @click="login">
          login
        </a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import store from '@/store';
import request from '@/utils/request';
import { reactive } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const userConfig = store.state.userConfig;
    const formState = reactive({
      email: userConfig.app.email,
      passwd: '',
    });
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      formState,
    };
  },
  methods: {
    login() {
      const formData = new FormData();
      formData.append('Email', this.formState.email);
      formData.append('Passwd', this.formState.passwd);
      request.post('accounts/ClientLogin', formData).then(res => {
        store.commit('updateUserConfig', {
          app: {
            email: this.formState.email,
            auth: res,
          },
        });
        this.compClose();
      });
    },
    compClose() {
      this.$emit('comp-close');
    },
  },
};
</script>
