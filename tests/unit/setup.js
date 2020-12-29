import testUtils from '@souche-vue/test-utils';
import store from '@/store';

/**
 * 深合并
 */
// mergeDeepRight(
//     { name: 'fred', age: 10, contact: { email: 'moo@example.com' } },
//     { age: 40, contact: { email: *'baa@example.com' } }
// );
// => { name: 'fred', age: 40, contact: { email: 'baa@example.com' } }
function mergeDeepRight (obj1, obj2) {
    Object.keys(obj2).forEach((k) => {
        obj1[k] = obj1[k] && obj1[k].toString() === '[object Object]' ? mergeDeepRight(obj1[k], obj2[k]) : obj1[k] = obj2[k];
    });

    return obj1;
}

/**
 * 创建包含被挂载和渲染的 Vue 组件的 Wrapper
 * Component：被测试的单文件组件
 * opts：被挂载的选项
 */
global.create = function (Component, opts = { }) {
    const DEFAULT_OPTS = {
        use: {
            Platform: 'pc',
            Router: false
        }
    };
    let mergeOpts = mergeDeepRight(DEFAULT_OPTS, opts);

    // 得到一个供你添加组件、混入和安装插件而不会污染全局的 Vue 类
    const factory = testUtils.create(Component, mergeOpts);

    const localVue = factory();

    return function (confs) {
        const DEFAULT_CONFS = {
            stubs: ['router-link', 'router-view'],
            store
        };
        let mergeConfs = mergeDeepRight(DEFAULT_CONFS, confs);
        
        // 得到一个包含被挂载和渲染的 Vue 组件的 Wrapper
        const wrapper = localVue.shallowMount(mergeConfs);

        return wrapper;
    };
};
