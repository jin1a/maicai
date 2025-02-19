<template>
    <view class="custom-header" :style="'padding: ' + menu.top + 'px ' + menuLeft + 'px 0;height: ' + menuHeight + 'px; '">
        <view class="custom-header-container">
            <view class="title">{{ title }}</view>
        </view>
    </view>
</template>

<script>
// component/custom-header/custom-header.js
const app = getApp();
export default {
    data() {
        return {
            menu: app.globalData.menu,
            menuLeft: app.globalData.menuLeft,
            menuHeight: app.globalData.menuHeight
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {},
    created: function () {}
};
</script>
<style>
@import './custom-header.css';
</style>
