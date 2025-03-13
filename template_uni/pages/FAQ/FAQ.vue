<template>
    <view class="FAQ" style="padding-top:25px;">
        <custom-header-back title="常见问题"></custom-header-back>
        <view class="box1">
            <view class="box-c">
                <navigator :url="'/pages/answerDetails/answerDetails?id=' + item.id" hover-class="none" class="item" v-for="(item, ind) in data" :key="ind">
                    <view class="text">{{ ind + 1 }}、{{ item.title }}</view>

                    <view class="iconfont icon-right-1-copy"></view>
                </navigator>
            </view>
        </view>
    </view>
</template>

<script>
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/FAQ/FAQ.js
const { getFaqListApi } = require('../../api/index');
const app = getApp();
export default {
    components: {
        customHeaderBack
    },
    data() {
        return {
            menuHeight: app.globalData.menuHeight,
            data: [],
            ind: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this;
        getFaqListApi
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
@import './FAQ.css';
</style>
