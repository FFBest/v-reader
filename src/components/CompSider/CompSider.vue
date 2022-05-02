<template>
  <div class="comp-sider">
    <a-menu v-model:selectedKeys="selectedKeys" mode="inline" theme="dark">
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
import { reactive } from 'vue';
import request from '@/utils/request';
import { StarOutlined, UnorderedListOutlined } from '@ant-design/icons-vue';

import { loadSteamPage } from '@/config/steam.config';

export default {
  components: {
    StarOutlined,
    UnorderedListOutlined,
  },
  setup() {
    const state = reactive({
      selectedKeys: ['all_list'],
      items: [],
    });
    return state;
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.loadSubscriptionList();
    },
    loadSubscriptionList(c) {
      const data = new FormData();
      data.append('it', 'user/-/state/com.google/starred');
      data.append('n', 10);
      data.append('r', 'o');
      if (c) data.append('c', c);
      request.post('reader/api/0/stream/contents', data).then(res => {
        this.items.push(...res.items);
        // if (res.continuation) {
        //   setTimeout(() => {
        //     this.loadSubscriptionList(res.continuation);
        //   }, 200);
        // } else {
        this.doLoadPage();
        // }
      });
    },
    doLoadPage() {
      console.error(this.items);
      this.items.forEach(item => {
        (data => {
          loadSteamPage(
            {
              title: data.title,
              url: data.canonical[0].href,
            },
            res => {
              console.log(data.title, res);
            },
          );
        })(item);
      });
    },
  },
};
</script>
