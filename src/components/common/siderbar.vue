<style lang="less">
</style>

<template>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      :router="true"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="/project/home">
        <i class="el-icon-menu"></i>
        <span slot="title">项目概况</span>
      </el-menu-item>
      <el-menu-item index="/project/statistics">
        <i class="el-icon-document"></i>
        <span slot="title">访问量统计</span>
      </el-menu-item>
      <!-- <el-menu-item index="/project/reporter">
        <i class="el-icon-setting"></i>
        <span slot="title">优化报告</span>
      </el-menu-item> -->
    </el-menu>
</template>

<script>
export default {
    data () {
        return {
        };
    },
    methods: {
        handleOpen () {

        },
        handleClose () {

        }
    },
    computed: {
        activeIndex () {
            return this.$route.path;
        }
    }
};
</script>
