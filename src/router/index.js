import Vue from 'vue';
import Router from '@souche-vue/souche-router';
import store from '@/store';
import routes from './modules';

Vue.use(Router);

const router = new Router({
    base: '/',
    routes
});

// export const routerChange = async function (to, from, next) {

// };

// router.beforeEach(routerChange);

export default router;
