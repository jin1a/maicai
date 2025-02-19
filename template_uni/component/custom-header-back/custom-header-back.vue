<template>
    <view class="custom-header-back" :style="'padding: ' + menu.top + 'px ' + menuLeft + 'px 0;height: ' + menuHeight + 'px; background-color:' + bgColor">
        <view class="custom-header-container">
            <view class="backBtn" @tap="back">
                <text class="iconfont icon-right-1-copy"></text>
                <view class="text-box">
                    <view class="backTitle" v-if="backTitle">{{ backTitle }}</view>
                    <view class="backDes" v-if="backDes">{{ backDes }}</view>
                    <view class="backTime" v-if="backTime">{{ backTime }}</view>
                </view>
            </view>
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
        },
        backTitle: {
            type: String,
            default: ''
        },
        backDes: {
            type: String,
            default: ''
        },
        backTime: {
            type: String,
            default: ''
        },
        bgColor: {
            type: String,
            default: '#fff'
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        back() {
            uni.navigateBack({
                delta: 1
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './custom-header-back.css';
</style>
