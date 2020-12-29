<style lang="less">
    .pg-home {
        .overview-wrap {
            position: relative;
            flex-direction: column;
            height: 100px;
            align-items: center;
            justify-content: space-around;
            &:not(:last-child) {
                &::after {
                    position: absolute;
                    right: 0;
                    top: 50%;
                    margin-top: -12px;
                    content: '';
                    background: var(--line-b);
                    height: 24px;
                    width: 1px;
                }
            }
            .num {
                font-size: 36px;
                .el-link--inner {
                    font-size: 36px;
                }
            }
        }
        .box-card {
            border-radius: 8px;
        }
        .search-wrap {
            margin-top: 52px;
        }
        .table-wrap {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        }
    }
</style>

<template>
    <div class="pg-home">
        <el-card header="seo概览" class="box-card fs20 text-center">
            <ul class="flex">
                <li class="overview-wrap flex1 flex" v-for="item in tabData" :key="item.key">
                    <div class="title fs14">{{item.name}}</div>
                    <div class="num">
                        <span>{{$formatNum(data[item.key])}}</span>
                    </div>
                </li>
            </ul>
        </el-card>

        <div class="search-wrap flex flex-justify-end">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <!-- <el-form-item>
                    <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-form-item> -->
            </el-form>
        </div>

        <div class="table-wrap">
            <el-table
                border
                :data="data.items">
                <el-table-column
                    align="center"
                    v-for="item in propsData"
                    :key="item.key"
                    :prop="item.key"
                    :label="item.name">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="创建时间">
                    <template slot-scope="scope">
                        {{$formatTime(scope.row.created_at)}}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看报告</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>

/**
 * @param {Object} data
 * @param {Array} data.items 主页table数据
 * @param {Number} data.projectNum 项目数
 * @param {Number} data.monthVisitNum 月访问量
 * @param {Number} data.yesterdayVisitNum 昨日访问量
 */

import Api from 'api';
import CacheUtils from '@souche-f2e/souche-util/lib/cache';

export default {
    data() {
        return {
            formInline: {},
            search: '',
            data: {
                items: [],
                projectNum: '',
                yesterdayVisitNum: '',
                monthVisitNum: ''
            },
            propsData: [{
                key: 'belong_project',
                name: '项目名'
            }, {
                key: 'entry',
                name: '主域名'
            }, {
                key: 'monthVisitSum',
                name: '月爬虫访问量'
            }, {
                key: 'projectCacheSum',
                name: '项目缓存页面数'
            }, {
                key: 'yesterdayVisitSum',
                name: '昨日爬虫访问量'
            }],
            tabData: [
                {key: 'projectNum', name: '项目数'},
                {key: 'monthVisitNum', name: '月访问总量'},
                {key: 'yesterdayVisitNum', name: '昨日访问总量'}
            ]
        };
    },
    components: {
    },
    methods: {
        handleClick(row) {
            row.created_at = this.$formatTime(row.created_at);
            row.ignoreParams = JSON.parse(row.ignoreParams || '[]');
            row.ignorePath = JSON.parse(row.ignorePath || '[]');
            row.notFoundPath = JSON.parse(row.notFoundPath || '[]');
            row.whitePath = JSON.parse(row.whitePath || '[]');
            CacheUtils.setLocalJson('projectInfo', row);
            this.$goPage('project-home');
        }
    },
    mounted() {
        Api.pc.getOverviewData().then((res) => {
            this.data = res || {};
        });
    }
};
</script>
