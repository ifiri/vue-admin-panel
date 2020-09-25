// We should import it in favor of polyfill for `setImmediate`
import '@babel/polyfill';

import Vue from 'vue';
import Router from 'vue-router';
import VueFragments from 'vue-fragment';

import App from './App.vue';
import { Router as RouterInstance } from './router';
import store from './store';

import VuetifyInstance from '@/plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(Router);
Vue.use(VueFragments.Plugin); // path to vuetify export

// We should add store in the Vue scope via prototype
// This is common practice for adding custom properties in Vue
Vue.prototype.$store = store;

// Build root and mount
new Vue({
  vuetify: VuetifyInstance,
  router: RouterInstance,
  render: createElement => createElement(App)
}).$mount('#app');
