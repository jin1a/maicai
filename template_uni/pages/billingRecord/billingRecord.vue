<template>
    <view class="billingRecord" style="padding-top:50px;">
        <!-- <custom-header-back title="开票记录"></custom-header-back> -->
        <view class="box1">
            <queryForm
                url="billingRecord"
                id="child"
                @selected="selected($event, { tagId: 'child' })"
                @onDateChangeRight="onDateChangeRight($event, { tagId: 'child' })"
                @onDateChangeLeft="onDateChangeLeft($event, { tagId: 'child' })"
                @controlMOdal="submit($event, { tagId: 'child' })"
            ></queryForm>
            <view class="box-c" v-for="(item, index) in data" :key="index">
                <reportForms :lists="item.data" :title="item.title" url="billingRecord"></reportForms>
            </view>
        </view>
        <!-- <queryReportBottom url="billingRecord" ></queryReportBottom> -->
    </view>
</template>

<script>
import queryReportBottom from '../../component/queryReportBottom/queryReportBottom';
import reportForms from '../../component/reportForms/reportForms';
import queryForm from '../../component/queryForm/queryForm';
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/billingRecord/billingRecord.js
const app = getApp();
const { getInvoiceListApi } = require('../../api/index');
export default {
    components: {
        queryReportBottom,
        reportForms,
        queryForm,
        customHeaderBack
    },
    data() {
        return {
            menuHeight: app.globalData.menuHeight,
            data: [],
            startTime: '',
            endTime: '',
            type: 0
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
        submit(e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            let that = this;
            getInvoiceListApi
                .apiName(e.detail)
                .then((res) => {
                    let data = [];
                    for (const key in res.data) {
                        data.push({
                            title: key,
                            data: res.data[key]
                        });
                    }
                    that.setData({
                        data
                    });
                })
                .catch((error) => {});
        },

        onDateChangeRight(e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            let date = e.detail.date;
            this.setData({
                endTime: date
            });
        },

        onDateChangeLeft(e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            let date = e.detail.date;
            this.setData({
                startTime: date
            });
        },

        selected(e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            let type = parseInt(e.detail.id);
            this.setData({
                type
            });
        }
    }
};
</script>
<style>
@import './billingRecord.css';
</style>
