<template>
    <view class="selectOrderInvoicing" style="padding-top:50px;">
        <!-- <custom-header-back title="选择订单开票"></custom-header-back> -->
        <view class="box1">
            <reportForms url="selectOrderInvoicing" title="菜亿家西乡店"></reportForms>
        </view>
        <view class="selectOrderInvoicingBottom">
            <view class="selectOrderInvoicingBottom-l">
                已选1个订单，共
                <text class="price">
                    ￥
                    <text></text>
                    22.8
                </text>
                元
            </view>
            <view class="selectOrderInvoicingBottom-r">去开票</view>
        </view>
    </view>
</template>

<script>
import reportForms from '../../component/reportForms/reportForms';
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/selectOrderInvoicing/selectOrderInvoicing.js
const app = getApp();
export default {
    components: {
        reportForms,
        customHeaderBack
    },
    data() {
        return {
            menuHeight: app.globalData.menuHeight
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {},
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
@import './selectOrderInvoicing.css';
</style>
