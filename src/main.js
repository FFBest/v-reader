import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import UseAntdv from './use.antdv';
import './global.less';

const app = createApp(App);
// use antdv v3
UseAntdv.use(app);

app.use(store).use(router).mount('#app');
