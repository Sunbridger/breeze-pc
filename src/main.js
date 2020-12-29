import Vue from 'vue';
import SUV from '@souche-vue/souche-util-vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Lemon from '@souche-ui/lemon';
import '@souche-ui/lemon/less/reset.less';
import App from './App.vue';
import router from './router';
import store from './store';
import myPlugin from './utils/plugins';
import filters from './utils/filters';
import directives from './utils/directives';
import Common from './utils/helpers/common';

Vue.use(SUV, {
    router
});

Vue.use(Lemon);

Vue.use(ElementUI);

Common.init();
Vue.use(myPlugin);

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
Object.keys(directives).forEach(k => Vue.directive(k, directives[k]));

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
}).$mount('#app');
