<style lang="less">
    .co-page-data-box {
        .el-switch__label--right.is-active {
            color: #c76a50;
        }
        .el-switch__label.is-active {
            color: #4c8b93;
        }
        .tooltip-p {
            max-width: 330px;
            white-space: normal;
            word-break: break-all;
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
    <div class="co-page-data-box relative">
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
        <div id="page-chart" style="width: 100%; height: 400px;"></div>
        <div class="no-result" v-if="nodata">
            <img class="result-img" src="@/assets/no-data.png" alt="">
            <p class="text-center">暂无数据</p>
        </div>
    </div>
</template>

<script>

/**
 * @param {Array} xdata x轴的数据
 * @param {Array} ydata y轴的数据
 * @param {Number} rang 按周 || 月
 * @param {Object} methods
 * @param {Function} methods.drawCategoryChart 画出echarts
 * @param {Function} methods.getTopTenPage 获取访数据
 */

import echarts from 'echarts';
import Api from 'api';

export default {
    props: {
        moduleName: ''
    },
    data() {
        return {
            xdata: [],
            ydata: [],
            rang: 7,
            color: '#c76a50 #c76a5087 #c76a503b',
            nodata: false
        };
    },
    methods: {
        drawCategoryChart() {
            const this_ = this;
            const pageChart = echarts.init(document.getElementById('page-chart'));
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        return `<p class="tooltip-p">${params.name}<p>${params.value}`;
                    }
                },
                xAxis: {
                    data: this_.xdata,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    z: 10
                },
                yAxis: {
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#999'
                        }
                    }
                },
                series: [
                    {
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    this_.colorNormal
                                )
                            },
                            emphasis: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    this_.colorEmp
                                )
                            }
                        },
                        data: this_.ydata,
                        barWidth: '30px'
                    }
                ]
            };
            pageChart.setOption(option);
        },
        getTopTenPage() {
            return Api.pc.getTopTenPage({
                moduleName: this.moduleName,
                rang: this.rang
            }).then((res) => {
                Object.values(res).forEach((item) => {
                    this.xdata.push(item.son_router);
                    this.ydata.push(item.num);
                });
                if (Object.values(res).length) {
                    this.nodata = false;
                } else {
                    this.nodata = true;
                }
            });
        },
        async init() {
            await this.getTopTenPage();
            this.drawCategoryChart();
        }
    },
    mounted() {
        this.init();
    },
    computed: {
        colorNormal() {
            if (this.rang === 30) {
                return [
                    {offset: 0, color: '#c76a50'},
                    {offset: 0.5, color: '#c76a5087'},
                    {offset: 1, color: '#c76a503b'}
                ];
            } else {
                return [
                    {offset: 0, color: '#4c8b93'},
                    {offset: 0.5, color: '#4c8b92'},
                    {offset: 1, color: '#4c8b91'}
                ];
            }
        },
        colorEmp() {
            if (this.rang === 30) {
                return [
                    {offset: 0, color: '#c76a50'},
                    {offset: 0.7, color: '#c76a50c2'},
                    {offset: 1, color: '#c76a503b'}
                ];
            } else {
                return [
                    {offset: 0, color: '#4c8b91'},
                    {offset: 0.7, color: '#4c8b92'},
                    {offset: 1, color: '#f0f0f0'}
                ];
            }
        }

    },
    watch: {
        rang(oldV, newV) {
            if (oldV !== newV) {
                this.xdata = [];
                this.ydata = [];
                this.init();
            }
        }
    }
};
</script>
