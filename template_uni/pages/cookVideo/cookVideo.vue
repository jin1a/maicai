<template>
    <view class="cookVideo" style="padding-top:50px;">
        <!-- <custom-header-back title="走进菜亿家"></custom-header-back> -->
        <view class="box0"></view>
        <view class="box1">
            <view class="list">
                <navigator :url="'/pages/cookVideoDetails/cookVideoDetails?id=' + item.id" class="item" hover-class="none" v-for="(item, index) in data" :key="index">
                    <image :src="item.image" mode="widthFix" />

                    <view class="playerBtn"><text class="iconfont icon-bofang"></text></view>
                </navigator>
            </view>
        </view>
    </view>
</template>

<script>
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/cookVideo/cookVideo.js
const { videoListApi } = require('../../api/index');
const app = getApp();
export default {
    components: {
        customHeaderBack
    },
    data() {
        return {
            menuHeight: app.globalData.menuHeight,
            data: []
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this;
        videoListApi
            .apiName({
                type: 0
            })
            .then((res) => {
                that.setData({
                    data: res.data
                });
            })
            .catch((err) => {});
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},
    methods: {}
};
</script>
<style>
@import './cookVideo.css';
</style>
