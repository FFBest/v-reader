import { createRouter, createWebHistory } from 'vue-router';
import BaseLayout from '../layouts/BaseLayout.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: BaseLayout,
    children: [
      {
        path: '',
        name: 'main',
        component: () =>
          import(/* webpackChunkName: "main" */ '../views/MainView.vue'),
      },
      {
        path: 'about',
        name: 'about',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
      },
    ],
  },
  {
    path: '/:callAll(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
