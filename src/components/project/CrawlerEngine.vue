<style lang="less">
    .co-craw-data-box {
        .el-switch__label--right.is-active {
            color: #c76a50;
        }
        .el-switch__label.is-active {
            color: #4c8b93;
        }
        .no-result {
            .absolute(@top: 50%, @left: 50%);
            transform: translate(-50%, -50%);
            .result-img {
                width: 150px;
            }
        }
    }
</style>
<template>
    <div class="co-craw-data-box relative">
        <el-switch
            class="mb24"
            active-color="#c76a50"
            inactive-color="#4c8b93"
            v-model="rang"
            :active-value="30"
            :inactive-value="7"
            active-text="按月"
            inactive-text="按周">
        </el-switch>
        <div id="crawler-chart" style="width: 100%; height: 400px;"></div>
        <div class="no-result" v-if="nodata">
            <img class="result-img" src="@/assets/no-data.png" alt="">
            <p class="text-center">暂无数据</p>
        </div>
    </div>
</template>

<script>

/**
 * @param {Array} data 爬虫引擎数据
 * @param {Number} rang 按周 || 月
 * @param {Boolean} nodata 是否有无数据
 * @param {Object} methods
 * @param {Function} methods.drawCategoryChart 画出echarts
 * @param {Function} methods.getTopFiveData 获取数据
 */

import echarts from 'echarts';
import Api from 'api';

export default {
    props: {
        moduleName: ''
    },
    data() {
        return {
            data: [],
            rang: 7,
            nodata: false
        };
    },
    methods: {
        drawCategoryChart() {
            const this_ = this;
            const crawlerChart = echarts.init(document.getElementById('crawler-chart'));
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}引擎爬取次数:{c} <br/>占比:{d}%'
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: this_.data
                },
                series: [{
                    type: 'pie',
                    radius: '90%',
                    center: ['50%', '50%'],
                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    data: this_.data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            };
            crawlerChart.setOption(option);
        },
        getTopFiveData() {
            return Api.pc.getTopFiveSpider({
                moduleName: this.moduleName,
                rang: this.rang
            }).then((res) => {
                this.data = Object.values(res);
                if (this.data.length) {
                    this.nodata = false;
                } else {
                    this.nodata = true;
                }
            });
        },
        async init() {
            await this.getTopFiveData();
            this.drawCategoryChart();
        }
    },
    mounted() {
        this.init();
    },
    watch: {
        rang(oldV, newV) {
            if (oldV !== newV) {
                this.init();
            }
        }
    }
};
</script>
