<template>
    <view class="cookVideoDetails" :style="'padding-top: ' + (menuHeight + 20) + 'px'">
        <custom-header-back :title="info.title"></custom-header-back>
    </view>
</template>

<script>
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/cookVideoDetails/cookVideoDetails.js
const { videoListApi } = require('../../api/index');
const app = getApp();
export default {
    components: {
        customHeaderBack
    },
    data() {
        return {
            menuHeight: app.globalData.menuHeight,
            info: {
                title: ''
            }
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this;
        videoListApi
            .apiName({
                id: options.id,
                type: 1
            })
            .then((res) => {
                that.setData({
                    info: res.data
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
@import './cookVideoDetails.css';
</style>
