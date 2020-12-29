import VueValidator from '@souche-vue/vue-validator';
import Statistics from '@souche-f2e/statistics';
import VueSentry from '@souche-vue/vue-sentry';
import Vue from 'vue';

const sentryInit = () => {
    let packageJson = require('../../../package.json');
    Vue.use(VueSentry, {
        dsn: 'https://eac02e0333b144c09a26443571aea1ef@sentry.souche.com/1071',
        env: process.env.VUE_APP_ENV,
        version: packageJson.version
    });
};

// 流量统计工具初始化
const statisticsInit = () => {
    Statistics.init({});
};

// 初始化表单验证插件
const validatorInit = () => {
    Vue.use(VueValidator, {
        validators: {},
        /* eslint-disable-next-line */
        controller: (msg) => {
            // todo
            // 根据项目自定义报错方法
        }
    });
};

export default () => {
    sentryInit();
    statisticsInit();
    validatorInit();
};
