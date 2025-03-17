<template>
    <view class="turnoverBasket" style="padding-top:50px;">
        <!-- <custom-header-back title="周转筐"></custom-header-back> -->
        <view class="box1">
            <queryForm @submit="submit" url="turnoverBasket"></queryForm>
            <view class="box-c">
                <view class="box-container">
                    <view class="reportFormsItem">
                        <block v-if="data.total > 0">
                            <reportForms url="turnoverBasket" :lists="data.data" :title="data.title"></reportForms>
                        </block>
                    </view>
                </view>
            </view>
        </view>
        <queryReportBottom :total="data.total" url="turnoverBasket"></queryReportBottom>
    </view>
</template>

<script>
import queryReportBottom from '../../component/queryReportBottom/queryReportBottom';
import queryForm from '../../component/queryForm/queryForm';
import reportForms from '../../component/reportForms/reportForms';
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/tofuBoard/tofuBoard.js
const { getToolkitApi } = require('../../api/index');
const app = getApp();
export default {
    components: {
        queryReportBottom,
        queryForm,
        reportForms,
        customHeaderBack
    },
    data() {
        return {            

            data: {
                total: 0,
                data: '',
                title: ''
            }
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
    methods: {
        submit(e) {
            let addressId = e.detail.addressId;
            let that = this;
            getToolkitApi
                .apiName({
                    addressId: addressId,
                    type: 2
                })
                .then((res) => {
                    that.setData({
                        data: res.data
                    });
                })
                .catch((err) => {});
        }
    }
};
</script>
<style>
@import './turnoverBasket.css';
</style>
