<template>
    <view class="deliveryNote" style="padding-top:50px;">
        <!-- <custom-header-back title="送货单"></custom-header-back> -->
        <view class="box1">
            <queryForm id="child" @submit="submit($event, { tagId: 'child' })" url="deliveryNote" @emailInput="emailInput($event, { tagId: 'child' })"></queryForm>
            <view class="box-c" v-for="(item, index) in data" :key="index">
                <reportForms @checked="checked" @checkAll="checkAll" :lists="item.data" :title="item.title"></reportForms>
            </view>
        </view>
        <queryReportBottom @sendEmail="sendEmail" @clear="clear" :price="price" :freightPrice="freightPrice"></queryReportBottom>
    </view>
</template>

<script>
import queryReportBottom from '../../component/queryReportBottom/queryReportBottom';
import reportForms from '../../component/reportForms/reportForms';
import queryForm from '../../component/queryForm/queryForm';
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/deliveryNote/deliveryNote.js
const { orderReportApi, sendOrderEmailApi } = require('../../api/index');
const app = getApp();
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
            orderIds: [],
            price: 0,
            freightPrice: 0,
            email: '',
            addressId: 0
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
            e.detail.flag = 'sonhuodan';
            this.setData({
                email: e.detail.email,
                addressId: e.detail.addressId
            });
            this.orderReport(e.detail);
        },

        emailInput(e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            this.setData({
                email: e.detail
            });
        },

        clear() {
            let child = this.zpSelectComponent('#child');
            child.clear();
            this.setData({
                data: [],
                orderIds: [],
                price: 0,
                freightPrice: 0,
                email: '',
                addressId: 0
            });
        },

        sendEmail() {
            let orderId = this.orderIds.join();
            let addressId = this.addressId;
            if (orderId == '') {
                uni.showToast({
                    title: '请先选择数据',
                    icon: 'none',
                    duration: 2000
                });
                return false;
            }
            let email = this.email;
            var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if (!reg.test(email)) {
                // 邮箱地址格式不正确
                uni.showToast({
                    title: '请输入有效的邮箱地址',
                    icon: 'none',
                    duration: 2000
                });
                return false;
            }
            uni.showLoading({
                title: '导出中...',
                mask: true
            });
            // let that = this
            sendOrderEmailApi
                .apiName({
                    orderId,
                    email,
                    addressId
                })
                .then((res) => {
                    uni.hideLoading();
                    uni.showToast({
                        title: '导出成功',
                        icon: 'success',
                        duration: 2000
                    });
                })
                .catch((err) => {});
        },

        orderReport(data) {
            let that = this;
            orderReportApi
                .apiName(data)
                .then((res) => {
                    let data = [];
                    for (const key in res.data) {
                        data.push({
                            title: key,
                            data: res.data[key]
                        });
                    }
                    that.setData({
                        data: data
                    });
                })
                .catch((err) => {});
        },

        checked(e) {
            let orderIds = this.orderIds;
            if (e.detail.type == true) {
                orderIds = [...orderIds, ...e.detail.id];
            } else {
                if (orderIds.length > 0) {
                    let index = orderIds.indexOf(e.detail.id);
                    if (index !== -1) {
                        orderIds.splice(index, 1);
                    }
                }
            }
            this.setData({
                orderIds: orderIds
            });
            this.totalPrice();
        },

        checkAll(e) {
            let orderIds = this.orderIds;
            if (e.detail.type == true) {
                orderIds = [...orderIds, ...e.detail.id];
            } else {
                e.detail.id.forEach((item) => {
                    if (orderIds.includes(item)) {
                        let index = orderIds.indexOf(item);
                        orderIds.splice(index, 1);
                    }
                });
            }
            this.setData({
                orderIds: orderIds
            });
            this.totalPrice();
        },

        totalPrice() {
            let orderIds = this.orderIds;
            let totalPrice = 0;
            let freightPrice = 0;
            this.data.forEach((e) => {
                e.data.forEach((item) => {
                    if (orderIds.indexOf(item.id) !== -1) {
                        totalPrice = totalPrice + parseFloat(item.price);
                        freightPrice = freightPrice + parseFloat(item.freight_price);
                    }
                });
            });
            this.setData({
                price: totalPrice.toFixed(2),
                freightPrice: freightPrice.toFixed(2)
            });
        }
    }
};
</script>
<style>
@import './deliveryNote.css';
</style>
