<style lang="less">
.pg-project-home {
    padding: 0 30px;
    .text-underline {
        margin-right: 20px;
        border-bottom: 1px solid var(--text-caption);
    }
    .item-wrap {
        margin-top: 46px;
        .success {
            color: #67c23a;
        }
        .failure {
            color: #f56c6c;
        }
        .aborted {
            color: #909399;
        }
    }
    .seo-box {
        .table-top {
            padding: 0 10px;
            height: 42px;
            line-height: 42px;
            font-size: 16px;
            background-color: #dfe4ee;
            border-bottom: 1px solid #c6cede;
            color: #56688a;
        }
    }

}
</style>

<template>
    <div class="pg-project-home">
        <el-card shadow="never" :header="summaryData.belong_project" class="box-card fs20 text-center">
            <div class="fs16 flex flex-justify-around">
                <div class="mr10" v-for="item in summaryTabs" :key="item.key">
                    <p v-if="item.key === 'entry'">{{item.name}}:
                        <el-link :href="summaryData[item.key]" type="primary" target="_blank">{{summaryData[item.key]}}</el-link>
                    </p>
                    <p v-else>{{item.name}}: {{summaryData[item.key]}}</p>
                </div>
            </div>
            <div class="mt20 text-left">
                <p class="fs14 text-caption mt10" v-for="arr in someArrColumn" :key="arr.key">{{arr.name}}
                    <span class="text-underline" v-for="(row, index) in summaryData[arr.key]" :key="index">{{decodeURIComponent(row)}}</span>
                    <span v-if="!summaryData[arr.key].length">无</span>
                </p>
            </div>
        </el-card>
        <!-- seo当前状况 -->
        <div class="item-wrap seo-box">
            <co-title :title="`${summaryData.belong_project}项目的收录/反链结果`">
                <el-card class="seo-table-wrap">
                    <el-table
                        :data="seoInfo">
                        <el-table-column
                            align="center"
                            prop="name"
                            label="搜索引擎">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="baidu"
                            label="百度">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="google"
                            label="谷歌">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="stz"
                            label="360">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="sougou"
                            label="搜狗">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="bing"
                            label="bing">
                        </el-table-column>
                    </el-table>
                </el-card>
            </co-title>
        </div>
        <!-- 每周任务执行情况 -->
        <div class="item-wrap">
            <co-title title="每周任务执行情况">
                <div class="task-table-wrap">
                   <el-table
                        class="mt20"
                        :data="taskData">
                        <el-table-column
                            align="center"
                            label="任务ID">
                            <template slot-scope="scope">
                                <el-button
                                    @click="goToJenkins(scope.row.jenkins_url)"
                                    type="text"
                                    size="small">
                                    {{scope.row.build_id}}
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="任务执行时长">
                            <template slot-scope="scope">
                                {{scope.row.duration_time | formatDuring}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="任务执行状态">
                            <template slot-scope="scope">
                                <span :class="scope.row.result.toLowerCase()">
                                    {{scope.row.result}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="success_pages"
                            label="成功页面数量">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="任务开始时间">
                            <template slot-scope="scope">
                                {{$formatTime(+scope.row.begin_time)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="error_list"
                            label="失败路由列表">
                            <template slot-scope="scope">
                                <el-button
                                @click.native.prevent="lookFailRoute(scope.row)"
                                type="text"
                                size="small">
                                查看列表
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </co-title>
        </div>
        <!-- 侧边栏打开 -->
        <el-drawer
            title="失败路由展示"
            size="40%"
            :visible.sync="drawer"
            direction="rtl">
            <el-table
                border
                class="mt20"
                :data="errorList">
                <el-table-column
                    v-for="item in errorColumn"
                    :key="item.key"
                    :prop="item.key"
                    :label="item.name">
                </el-table-column>
            </el-table>

        </el-drawer>
    </div>
</template>

<script>

/**
 * @param {Boolean} drawer 错误任务弹窗
 * @param {Array} taskData 每周任务执行情况
 * @param {Array} errorList 某个任务执行的错误情况
 * @param {Array} seoInfo 项目的收录/反链结果
 * @param {Object} methods
 * @param {Function} methods.formatDataToArr 将对象数组转换为数组对象
 */

import Api from 'api';
import CoTitle from 'components/common/title';
import CacheUtils from '@souche-f2e/souche-util/lib/cache';

export default {
    components: { CoTitle },
    data () {
        let projectInfo = CacheUtils.getLocalJson('projectInfo');
        return {
            drawer: false,
            summaryTabs: [
                {key: 'entry', name: '主域名'},
                {key: 'monthVisitSum', name: '月爬虫访问量'},
                {key: 'created_at', name: '创建时间'}
            ],
            summaryData: projectInfo,
            taskData: [],
            errorList: [],
            seoInfo: [],
            someArrColumn: [{
                key: 'whitePath',
                name: '白名单路由：'
            }, {
                key: 'ignorePath',
                name: '忽略路由：'
            }, {
                key: 'ignoreParams',
                name: '忽略参数：'
            }],
            seoStatusColumn: [{
                key: 'date',
                name: '日期'
            }, {
                key: 'shoulu',
                name: '百度收录'
            }, {
                key: 'suoyin',
                name: '百度索引'
            }],
            taskColumn: [{
                key: 'build_id',
                name: '任务ID'
            }, {
                key: 'duration_time',
                name: '任务执行时间'
            }, {
                key: 'result',
                name: '任务执行状态'
            }, {
                key: 'success_pages',
                name: '成功页面数量'
            }, {
                key: 'begin_time',
                name: '任务开始时间'
            }, {
                key: 'error_list',
                name: '失败路由列表'
            }],
            errorColumn: [{
                key: 'url',
                name: '路由'
            }, {
                key: 'name',
                name: '失败原因'
            }]
        };
    },
    methods: {
        goToJenkins(url) {
            window.open(url);
        },
        lookFailRoute(row) {
            this.drawer = true;
            try {
                this.errorList = JSON.parse(row.error_list);
                this.errorList = this.errorList.map(el => ({
                    url: el.url,
                    name: el.error.name
                }));
            } catch (error) {
                this.errorList = [];
            }
        },
        formatDataToArr(data) {
            if (!data) return [];
            const {
                bdi, goi, tsi, sgi, bgi,
                bda, goa, tsa, sga, bga
            } = data;
            return [
                {
                    name: '收录', baidu: bdi, google: goi, stz: tsi, sougou: sgi, bing: bgi
                },
                {
                    name: '反链', baidu: bda, google: goa, stz: tsa, sougou: sga, bing: bga
                }
            ];
        },
        decodeURIComponent(url) {
            return decodeURIComponent(url);
        }
    },
    filters: {
        formatDuring(timestate) {
            const h = parseInt((timestate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = parseInt((timestate % (1000 * 60 * 60)) / (1000 * 60));
            const s = ((timestate % (1000 * 60)) / 1000).toFixed();
            return `${h} 时 ${m} 分 ${s} 秒`;
        }
    },
    created() {
        Api.pc.projectDetail({
            moduleName: this.summaryData.belong_project,
            entry: this.summaryData.entry
        }).then((res) => {
            this.taskData = res.taskItems.filter(el => el.result);
            this.seoInfo = this.formatDataToArr(res.seoInfo);
            this.summaryData.todayVisitNum = res.todayVisitNum;
            CacheUtils.setLocalJson('projectInfo', this.summaryData);
        });
    }
};
</script>
