/**
 * @file 路由配置文件入口
 */
import project from './project';

export default {
    '/': {
        redirect: '/overview'
    },
    '/overview': {
        path: 'views/index',
        name: 'overview'
    },
    'project': {
        path: 'views/project',
        name: 'project',
        modules: project
    }
};
