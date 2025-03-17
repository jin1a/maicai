<template>
    <view class="billingInstructions" style="padding-top:50px;">
        <!-- <custom-header-back title="开票须知"></custom-header-back> -->
        <view class="box1">
            <view class="title">重要提示：</view>
            <view class="box-c">
                <view class="red item">
                    1）应国家税务总局要求，自2017年7月1日起，若开具增值税普通发票，须同时提供企业抬头及税号，否则发票将无法用于企业报销。为了不影响发票的正常使用，开据普通发票及电子发票的客户，敬请尽快编辑完善“开票信息”，补充普通发票及电子发票信息，并重新提交审核。
                </view>
                <view class="item">2）提交虚假或错误信息，责任自负，本公司不予退换。</view>
                <view class="item">3）鸡鸭鹅牛羊猪肉、鸡鸭鹅蛋，根据国家相关规定，不能开局增值税专用发票。</view>
                <view class="item">4）本模块仅用于维护开票信息一日审核通过后系统将根据开票信息设置自动生成发票。</view>
                <view class="item">5）如果订单中包含第三方卖家商品，该商品发票将由卖家提供，预计将在发票需求日期后的12个工作日内送达。第三方卖家仅提供纸质发票。</view>
            </view>
        </view>
    </view>
</template>

<script>
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/billingInstructions/billingInstructions.js
const app = getApp();
export default {
    components: {
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
@import './billingInstructions.css';
</style>
