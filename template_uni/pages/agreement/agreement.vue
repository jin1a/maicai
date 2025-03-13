<template>
    <view class="protocol" style="padding-top:25px;">
        <custom-header-back :title="'菜亿家' + title"></custom-header-back>
        <view class="box1">
            <view class="boxContainer">
                <rich-text :nodes="content"></rich-text>
            </view>
        </view>
    </view>
</template>

<script>
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/protocol/protocol.js
const { agreementApi } = require('../../api/index');
const app = getApp();
export default {
    components: {
        customHeaderBack
    },
    data() {
        return {
            menuHeight: app.globalData.menuHeight,
            title: '',
            content: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this;
        agreementApi
            .apiName({
                type: options.type
            })
            .then((res) => {
                that.setData({
                    title: res.data.title,
                    content: res.data.content
                });
            });
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
@import './agreement.css';
</style>
