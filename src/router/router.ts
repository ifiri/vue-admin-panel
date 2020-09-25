import Vue from 'vue';
import Router from 'vue-router';
import useConfig from '@/effects/useConfig';
import useRoutes from '@/effects/useRoutes';

export default new Router({
  mode: useConfig('system.routing.mode'),
  base: process.env.BASE_URL,

  routes: useRoutes(),

  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { selector: to.hash }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});
