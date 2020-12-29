<style lang="less">
    .co-visit-data-box {
        position: relative;
        .el-switch__label--right.is-active {
            color: #c76a50;
        }
        .el-switch__label.is-active {
            color: #4c8b93;
        }
        .info-box {
            padding: 20px 10px;
            width: 200px;
            height: 225px;
            border: 1px solid #efefef;
            right: 2px;
            top: 46px;
            position: absolute;
            overflow-y: scroll;
            box-sizing: border-box;
        }
        .visit-chart {
            height: 400px;
            padding-right: 200px;
        }
        .no-data-box {
            width: 100%;
            height: 400px;
            .absolute(@top: 50px);
            z-index: 9;
            background: white;
            .no-result {
                .absolute(@top: 50%, @left: 50%);
                transform: translate(-50%, -50%);
                .result-img {
                    width: 150px;
                }
            }
        }
    }
</style>
<template>
    <div class="co-visit-data-box">
        <el-date-picker
            v-model="rang"
            :clearable="false"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
        <div class="relative">
            <div id="visit-chart" class="visit-chart"></div>
            <div class="info-box">
                <div v-for="item in data" :key="item.data_x" class="line-box mb12">
                    <p class="flex flex-justify-between mb8">
                        <span class="fs12">{{item.data_x}}</span>
                        <span class="fs12">访问量: {{item.data_y}}</span>
                    </p>
                    <el-progress :color="colorStyle" :show-text="false" :percentage="getPercent(+item.data_y)"></el-progress>
                </div>
            </div>
        </div>
        <div class="no-data-box" v-if="nodata">
            <div class="no-result">
                <img class="result-img" src="@/assets/no-data.png" alt="">
                <p class="text-center">暂无数据</p>
            </div>
        </div>
    </div>
</template>

<script>

/**
 * @param {Array} xAxisDataForVisit x轴的数据
 * @param {Array} yAxisDataForVisit y轴的数据
 * @param {Array | String} rang 时间区间
 * @param {Array} data 右侧数据排序
 * @param {Object} pickerOptions 时间选择配置对象
 * @param {Object} methods
 * @param {Function} methods.drawCategoryChart 画出echarts
 * @param {Function} methods.getVisitData 获取数据
 */

import echarts from 'echarts';
import Api from 'api';

export default {
    props: {
        moduleName: ''
    },
    data() {
        return {
            xAxisDataForVisit: [],
            yAxisDataForVisit: [],
            rang: '',
            data: [],
            nodata: false,
            pickerOptions: {
                disabledDate(time) {
                    return (time.getTime() > Date.now() - (3600 * 24 * 1000)) || (time.getTime() < Date.now() - (365 * 3600 * 24 * 1000));
                }
            }
        };
    },
    computed: {
        colorStyle() {
            if (this.rang) {
                return '#c76a50';
            }
            return '#4c8b93';
        }
    },
    methods: {
        drawCategoryChart() {
            const this_ = this;
            const visitChart = echarts.init(document.getElementById('visit-chart'));
            const option = {
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    data: this_.xAxisDataForVisit
                },
                yAxis: {
                    type: 'value',
                    axisTick: {
                        show: false
                    }
                },
                series: [{
                    data: this_.yAxisDataForVisit,
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            color: this_.colorStyle,
                            lineStyle: {
                                color: this_.colorStyle
                            }
                        }
                    }
                }]
            };
            visitChart.setOption(option);
        },
        getVisitData() {
            return Api.pc.getVisitNum({
                moduleName: this.moduleName,
                rang: this.rang
            }).then((res) => {
                this.data = Object.values(res);
                this.data.forEach((item) => {
                    this.xAxisDataForVisit.push(item.data_x);
                    this.yAxisDataForVisit.push(+item.data_y);
                });
                // 为右侧的数据展示排序
                this.data.sort((item, item2) => item2.data_y - item.data_y);
                this.nodata = !this.data.length;
            });
        },
        async init() {
            await this.getVisitData();
            this.drawCategoryChart();
        },
        getPercent(num) {
            const sum = this.yAxisDataForVisit.reduce((a, b) => a + b);
            return +((num / sum) * 100).toFixed();
        }
    },
    mounted() {
        this.init();
    },
    watch: {
        rang(oldV, newV) {
            if (oldV !== newV) {
                this.xAxisDataForVisit = [];
                this.yAxisDataForVisit = [];
                this.data = [];
                this.init();
            }
        }
    }
};
</script>
