<template>
  <div class="comp-sider">
    <a-menu mode="inline" theme="dark">
      <a-menu-item key="star_list">
        <template #icon>
          <StarOutlined />
        </template>
        <span>稍后阅读</span>
      </a-menu-item>
      <a-menu-item key="all_list">
        <template #icon>
          <UnorderedListOutlined />
        </template>
        <span>全部文章</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import request from '@/utils/request';
import { StarOutlined, UnorderedListOutlined } from '@ant-design/icons-vue';

export default {
  components: {
    StarOutlined,
    UnorderedListOutlined,
  },
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
