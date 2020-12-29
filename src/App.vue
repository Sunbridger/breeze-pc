<style lang="less">
* {
    -webkit-tap-highlight-color: transparent;
}
body {
    background-color: var(--background-page);
}
.main-page-content-wrap {
    padding: 10px;
    background: #fff;
    .sider-bar-wrap {
        flex-basis: 130px;
        flex-shrink: 0;
    }
    .main-content {
        padding: 30px 5px;
        border-radius: 8px;
    }
    .el-menu {
        border: none;
    }
}
.co-header-exper {
    background: #fff;
    padding: 40px 56px;
    position: relative;
    border-top: 1px #eee solid;
    position: relative;
    .dashboard {
        position: absolute;
        right: 100px;
        top: 50%;
        transform: translateY(-50%);
    }
    .main-left {
        .main-avatar {
            margin-right: 24px;
        }
    }
    .card {
        .title {
            color: #8c8c8c;
        }
        .content {
            font-size: 30px;
        }
    }
    .exper-divider {
        margin-top: 4px;
    }
}
</style>
<template>
    <div id="app">
        <co-header></co-header>
        <div class="co-header-exper">
            <main class="exper-main flex flex-justify-between">
                <div class="main-left flex">
                    <div class="exper-info">
                        <p class="fs24 text-title mb12 mt5">
                            Breeze
                        </p>
                        <p class="text-caption">
                            大搜车seo平台 - 为单页应用项目提供seo服务。
                        </p>
                    </div>
                </div>
                <div class="main-right flex text-center exper-divider">
                </div>
            </main>
            <img class="dashboard" src="~src/assets/dashboard.png" width="160" alt="">
        </div>
        <div class="padding24 bg-background-page">
            <div class="main-page-content-wrap flex">
                <div v-show="show" class="sider-bar-wrap">
                    <co-sider-bar></co-sider-bar>
                </div>
                <div class="main-content flex1">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CoHeader from 'components/common/header';
import CoSiderBar from 'components/common/siderbar';

export default {
    name: 'app',
    components: {
        CoHeader,
        CoSiderBar
    },
    data () {
        return {
            show: false
        };
    },
    watch: {
        '$route': function () {
            this.show = this.$route.name !== 'overview';
        }
    }
};
</script>
