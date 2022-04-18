<template>
  <div class="comp-sider"></div>
</template>

<script>
import request from '@/utils/request';

export default {
  setup() {
    return {};
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      request.post('reader/api/0/subscription/list', {}).then(res => {
        console.error(res);
      });
    },
  },
};
</script>
