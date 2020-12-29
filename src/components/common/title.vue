<style lang="less">
.co-header-title {
    padding-left: 20px;
    .title-component-wrap {
        color: var(--text-body);
        font-size: 16px;
        position: relative;
        &::before {
            content: '';
            background: #4c8b93;
            height: 14px;
            width: 4px;
            position: absolute;
            top: 50%;
            left: -20px;
            transform: translateY(-50%);
        }
    }
}
</style>

<template>
    <div class="co-header-title">
        <div class="title-component-wrap">{{this.title}}</div>
        <div class="mt20">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        };
    },
    props: {
        title: String
    }
};
</script>
