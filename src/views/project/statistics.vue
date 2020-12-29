<style lang="less">
    .pg-stat {
        padding: 0 30px;
    }
    .box-card {
        border-radius: 12px;
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
            }
        }
    }
    .echarts-box {
        padding: 20px;
        margin-top: 45px;
        background: #f9f9f9;
        border-radius: 12px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    }
</style>

<template>
    <div class="pg-stat">
        <el-card :header="summaryData.belong_project" class="box-card fs20 text-center">
            <ul class="flex">
                <li class="overview-wrap flex1 flex" v-for="item in tabData" :key="item.key">
                    <div class="title fs14">{{item.name}}</div>
                    <div class="num">{{summaryData[item.key]}}</div>
                </li>
            </ul>
        </el-card>
        <div class="echarts-box">
            <el-card class="margin12" header="访问量趋势">
                <co-visit-num :moduleName="summaryData.belong_project"></co-visit-num>
            </el-card>
            <el-card class="margin12" header="爬虫引擎Top5">
                <co-crawler :moduleName="summaryData.belong_project"></co-crawler>
            </el-card>
            <el-card class="margin12" header="被访问页面Top10">
                <co-page :moduleName="summaryData.belong_project"></co-page>
            </el-card>
        </div>
    </div>
</template>

<script>

/**
 * @param {Object} summaryData
 * @param {String} summaryData.yesterdayVisitSum 昨日访问量
 * @param {String} summaryData.belong_project 项目名称
 * @param {String} summaryData.todayVisitNum 当日实时访问量
 * @param {String} summaryData.monthVisitSum 月访问量
 */

import echarts from 'echarts';
import Api from 'api';
import CacheUtils from '@souche-f2e/souche-util/lib/cache';
import CoVisitNum from 'components/project/VisitNum';
import CoCrawler from 'components/project/CrawlerEngine';
import CoPage from 'components/project/PageTopTen';

export default {
    data () {
        const {
            yesterdayVisitSum, belong_project, todayVisitNum, monthVisitSum
        } = CacheUtils.getLocalJson('projectInfo');
        return {
            summaryData: {
                belong_project,
                yesterdayVisitSum,
                todayVisitNum,
                monthVisitSum
            },
            tabData: [
                {key: 'todayVisitNum', name: '当日实时访问量'},
                {key: 'yesterdayVisitSum', name: '昨日访问量'},
                {key: 'monthVisitSum', name: '月访问量'}
            ]
        };
    },
    methods: {

    },
    mounted() {

    },
    components: {
        CoVisitNum,
        CoCrawler,
        CoPage
    }
};
</script>
