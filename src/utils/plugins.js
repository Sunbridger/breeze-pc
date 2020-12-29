import Utils from '@souche-f2e/souche-util';

export default {
    install(Vue) {
        // 跳转页面
        Vue.prototype.$goPage = function(name = '404', params = {}, query = {}, flag = false) {
            if (/^http*/.test(name)) {
                if (params) {
                    name = Utils.convertParamsToUrl(params, `${name}?`);
                }
                flag ? window.location.replace(name) : (window.location.href = name);
                return;
            }
            flag = flag ? 'replace' : 'push';
            this.$router[flag]({
                name: name,
                params,
                query
            });
        };
        // 强制转换成数组
        Vue.prototype.$parseArray = function(arr) {
            let data = [];
            if (typeof arr === 'string') {
                try {
                    data = JSON.parse(arr || '[]') || [];
                } catch (e) {
                    /* handle error */
                }
            } else {
                data = arr || [];
            }
            return data;
        };
        // 日期范围解析
        Vue.prototype.$parseDateRange = function (dateStr) {
            let separator = '-';
            let val = '';
            if (dateStr && dateStr.indexOf(separator) !== -1) {
                let arr = dateStr.split(separator);
                val = [new Date(arr[0]), new Date(arr[1])];
            }
            return val;
        };
        // https处理
        Vue.prototype.$toHttps = function (value = '') {
            if (window.location.protocol === 'https:' && /^http:\/\/*/.test(value)) {
                return value.substr(5);
            }
            return value;
        };

        // 处理时间
        Vue.prototype.$formatTime = function (value) {
            function addZeron(num) {
                return num < 10 ? `0${num}` : num;
            }
            let date = '';
            if (typeof value === 'string') {
                date = new Date(+new Date(value));
            } else {
                date = new Date(+value);
            }
            const y = date.getFullYear();
            const m = addZeron(date.getMonth() + 1);
            const d = addZeron(date.getDate());
            const h = addZeron(date.getHours());
            const s = addZeron(date.getMinutes());
            return `${y}/${m}/${d}/${h}:${s}`;
        };

        // 处理数量级别
        Vue.prototype.$formatNum = function (num) {
            if (num >= 10000) {
                const base = (+num / 10000).toFixed(2);
                return `${base}万`;
            }
            return num;
        };
    }
};
