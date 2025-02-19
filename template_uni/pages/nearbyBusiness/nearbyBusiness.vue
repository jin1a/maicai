<template>
    <view class="nearbyBusiness" :style="'padding-top: ' + (menuHeight + 20) + 'px'">
        <custom-header-back title="亿家菜"></custom-header-back>
        <view class="box1">
            <view class="list">
                <view class="item" v-for="(item, index) in data" :key="index">
                    <view class="item-l">{{ item.name }}</view>

                    <view class="item-r">{{ item.phone }}</view>
                </view>
            </view>
            <!-- <view class="empty">附近暂无企业</view> -->
        </view>
    </view>
</template>

<script>
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/nearbyBusiness/nearbyBusiness.js
const { getAllFirmApi } = require('../../api/index');
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
        getAllFirmApi
            .apiName()
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
@import './nearbyBusiness.css';
</style>
