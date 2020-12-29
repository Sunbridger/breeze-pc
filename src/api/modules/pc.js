import Util from '../util';

let baseUrl = process.env.VUE_APP_BREEZE;
let instance = Util.finance(baseUrl);

// 主页概览查询
export async function getOverviewData(opts = {}) {
    return instance({
        method: 'get',
        url: 'pc/getOverviewData',
        opts
    });
}

// 主页概览查询
export async function projectDetail(opts = {}) {
    return instance({
        method: 'get',
        url: 'pc/projectDetail',
        opts
    });
}

// 项目访问量接口
export async function getVisitNum(opts = {}) {
    return instance({
        method: 'get',
        url: 'pc/getVisitNum',
        opts
    });
}

// 项目爬虫引擎top5接口
export async function getTopFiveSpider(opts = {}) {
    return instance({
        method: 'get',
        url: 'pc/getTopFiveSpider',
        opts
    });
}

// 项目页面top10接口
export async function getTopTenPage(opts = {}) {
    return instance({
        method: 'get',
        url: 'pc/getTopTenPage',
        opts
    });
}

