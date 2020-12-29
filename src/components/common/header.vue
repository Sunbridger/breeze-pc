<style lang="less">
.co-header-wrap {
    padding-left: 200px;
    position: relative;
    background: #fff;
    .logo {
        position: absolute;
        width: 200px;
        height: 100%;
        left: 0;
        top: 0;
        .logo-text {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
    }
    .gitlab-warp {
        position: absolute;
        width: 200px;
        height: 100%;
        right: 0;
        top: 0;
        cursor: pointer;
    }
    .git-img {
        height: 26px;
    }
}
</style>

<template>
    <div class="co-header-wrap">
        <div class="logo flex flex-justify-center flex-align-center fs20 link">
            <i class="el-icon-watermelon fs24 mr5"></i>
            <span class="logo-text">Breeze</span>
            <span class="fs12 ml6"> for seo</span>
        </div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item v-for="item in list" :key="item.key" v-show="item.visible"  :index="item.key">{{item.name}}</el-menu-item>
        </el-menu>
        <div @click="handleGitClick" class="flex gitlab-warp flex-justify-center flex-align-center">
            <img class="git-img" src="http://img.souche.com/f2e/b0f227d088b3a670adf9f619c06f88c8.jpg" alt="gitlab">
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            projectRoute: '/project'
        };
    },
    methods: {
        handleGitClick () {
            window.open('https://git.souche-inc.com/middle-end/breeze');
        },
        handleSelect (e) {
            if (e.includes('http')) {
                window.open(e);
            } else if (e !== this.projectRoute) {
                this.$router.push({
                    path: e
                });
            }
        }
    },
    computed: {
        list () {
            return [{
                key: '/overview',
                name: '主页',
                visible: true
            }, {
                key: '/project',
                name: '项目报告',
                visible: this.activeIndex === this.projectRoute
            }, {
                key: 'http://fedoc.sqaproxy.souche.com/#/f2e/seo/index',
                name: '文档',
                visible: true
            }];
        },
        activeIndex () {
            return `/${this.$route.path.split('/')[1]}`;
        }
    }
};
</script>
