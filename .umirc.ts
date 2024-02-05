import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'F Admin',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      name: ' Cesium',
      path: '/Cesium',
      routes: [
        {
          name: ' Cesium demo1',
          path: '/Cesium/demo1',
          component: './Cesium/demo1',
        },
      ],
    },
    {
      name: 'Interview',
      patj: 'interview',
      routes: [
        {
          name: ' custom promise',
          path: '/interview/promise',
          component: './Interview/promise',
        },
      ],
    },
  ],
  npmClient: 'pnpm',
});
