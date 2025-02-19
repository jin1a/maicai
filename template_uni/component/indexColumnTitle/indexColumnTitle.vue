<template>
    <view class="indexColumnTitle">
        <view class="indexColumnTitle-l">
            <view class="line"></view>
            <view class="title">
                {{ title }}
                <text>{{ des }}</text>
            </view>
        </view>
        <navigator @tap="tap" open-type="switchTab" class="indexColumnTitle-r" :url="false" hover-class="none">
            <text>更多</text>
            <text class="iconfont icon-right-1-copy"></text>
        </navigator>
    </view>
</template>

<script>
// component/indexColumnTitle/indexColumnTitle.js
export default {
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        title: {
            type: String,
            default: ''
        },
        des: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: ''
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        tap() {
            uni.setStorage({
                key: 'currentId',
                data: {
                    currentId: 53,
                    type: 1
                },
                success: () => {
                    uni.switchTab({
                        url: this.url
                    });
                }
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './indexColumnTitle.css';
</style>
