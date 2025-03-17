<template>
    <view class="billingApplication" style="padding-top:50px;">
        <!-- <custom-header-back title="开票申请"></custom-header-back> -->
        <view class="box1">
            <queryForm url="billingApplication" @submit="submit" @controlMOdal="controlMOdal"></queryForm>
            <view class="tips">*现金客户开票时间: 客户每月5号-10号申请上月发票，平台受理后，5日内开具完成。(遇发票开具额度限制、节假日等特殊情况另</view>
            <view class="box-c" v-for="(item, index) in data" :key="index">
                <reportForms @checked="checked" @checkAll="checkAll" :lists="item.data" :title="item.title"></reportForms>
            </view>
        </view>
        <queryReportBottom
            url="billingApplication"
            @clear="clear"
            :price="price"
            :freightPrice="freightPrice"
            @invoicing="invoicing"
            @invoicingInfo="invoicingInfo"
        ></queryReportBottom>
        <view class="modal" v-if="isShowMOdal">
            <view class="container">
                <view class="title">申请开票</view>
                <view class="input">
                    <input type="text" placeholder="请输入邮箱号" placeholder-class="input-placeholder" @input="inputChange" />
                </view>
                <view class="btns">
                    <view class="btn" @tap="controlMOdal">取消</view>
                    <view class="btn" @tap="hide">确定</view>
                </view>
            </view>
        </view>
        <view class="invoicingModal" v-if="isShowInvoicingMOdal">
            <view class="container">
                <form @submit="formSubmit">
                    <view class="title">开票信息</view>

                    <view class="input">
                        <view>开票名称：</view>
                        <input type="text" placeholder="请输入开票名称" placeholder-class="input-placeholder" :disabled="isInvoicing" name="name" :value="info.name" />
                    </view>
                    <view class="input">
                        <view>开票税号：</view>
                        <input type="text" placeholder="请输入开票税号" placeholder-class="input-placeholder" :disabled="isInvoicing" name="tax_number" :value="info.tax_number" />
                    </view>
                    <view class="input">
                        <view>开票地址：</view>
                        <input type="text" placeholder="请输入开票地址" placeholder-class="input-placeholder" :disabled="isInvoicing" name="address" :value="info.address" />
                    </view>
                    <view class="input">
                        <view>开票电话：</view>
                        <input type="text" placeholder="请输入开票电话" placeholder-class="input-placeholder" :disabled="isInvoicing" name="phone" :value="info.phone" />
                    </view>
                    <view class="input">
                        <view>开户银行：</view>
                        <input type="text" placeholder="请输入开户银行" placeholder-class="input-placeholder" :disabled="isInvoicing" name="bank" :value="info.bank" />
                    </view>
                    <view class="input">
                        <view>银行账号：</view>
                        <input
                            type="text"
                            placeholder="请输入银行账号"
                            placeholder-class="input-placeholder"
                            :disabled="isInvoicing"
                            name="bank_account"
                            :value="info.bank_account"
                        />
                    </view>
                    <view class="btns" v-if="!isInvoicing">
                        <view class="btn" @tap="cancel">取消</view>
                        <button class="btn" formType="submit">保存</button>
                    </view>
                    <view class="btns" v-else>
                        <view class="btn" @tap="cancel">取消</view>
                        <view class="btn" @tap="invoicingSubmit">确定申请</view>
                    </view>
                    <view class="tips" v-if="isInvoicing">*以上申请：为普通 发票（需开专票或其他特许要求请联系客服，不在此界面申请）</view>
                </form>
            </view>
        </view>
    </view>
</template>

<script>
import queryReportBottom from '../../component/queryReportBottom/queryReportBottom';
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
import reportForms from '../../component/reportForms/reportForms';
import queryForm from '../../component/queryForm/queryForm';
// pages/billingApplication/billingApplication.js
const app = getApp();
const { orderReportApi, invoiceInfoApi, saveInvoiceInfoApi, applyInvoiceApi } = require('../../api/index');
export default {
    components: {
        queryReportBottom,
        customHeaderBack,
        reportForms,
        queryForm
    },
    data() {
        return {
            menuHeight: app.globalData.menuHeight,
            isShowMOdal: false,
            isShowInvoicingMOdal: false,
            data: [],
            orderIds: [],
            price: 0,
            freightPrice: 0,
            email: '',
            addressId: 0,
            info: {
                name: '',
                tax_number: '',
                address: '',
                phone: '',
                bank: '',
                bank_account: ''
            },
            isInvoicing: false
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
        controlMOdal() {
            this.setData({
                email: '',
                isShowMOdal: !this.isShowMOdal
            });
        },

        hide() {
            this.setData({
                isShowMOdal: !this.isShowMOdal
            });
        },

        invoicing(e) {
            let orderId = this.orderIds.join();
            let info = this.info;
            if (Object.keys(info).length < 1) {
                this.invoicingInfo(2);
            }
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
                    duration: 1000
                });
                this.hide();
                return false;
            }
            this.cancel();
            this.setData({
                isInvoicing: true
            });
        },

        invoicingSubmit() {
            let orderId = this.orderIds.join();
            let email = this.email;
            let that = this;
            applyInvoiceApi
                .apiName({
                    orderId,
                    email
                })
                .then((res) => {
                    uni.showToast({
                        title: '申请成功',
                        icon: 'success',
                        duration: 2000
                    });
                    that.cancel();
                })
                .catch((err) => {
					console.log(err.msg)
					uni.showToast({
					    title: err.msg,
					    icon: 'none',
					    duration: 1000
					});
				});
        },

        invoicingInfo(type) {
            uni.showLoading({
                title: '加载中...',
                mask: true
            });
            let that = this;
            invoiceInfoApi
                .apiName()
                .then((res) => {
                    uni.hideLoading();
                    if (Object.keys(res.data).length > 0) {
                        that.setData({
                            info: res.data
                        });
                    } else {
                        console.log(res.data);
                        that.setData({
                            isInvoicing: false
                        });
                    }
                })
                .catch((err) => {});
            if (type != 2) {
                this.setData({
                    isInvoicing: false
                });
                this.cancel();
            }
        },

        inputChange(e) {
            this.setData({
                email: e.detail.value
            });
        },

        formSubmit(e) {
            let data = e.detail.value;
            let value = Object.values(data);
            if (value.some((value) => value === '')) {
                uni.showToast({
                    title: '请填写完整',
                    icon: 'none',
                    duration: 1000
                });
                return false;
            }
            let reg = /^1[3-9]\d{9}$/;
            if (!reg.test(data.phone)) {
                uni.showToast({
                    title: '请输入有效的电话号码',
                    icon: 'none',
                    duration: 1000
                });
                return false;
            }
            let reg2 = /^\d{12}|\d{19}$/;
            if (!reg2.test(data.bank_account)) {
                uni.showToast({
                    title: '请输入有效的银行账号',
                    icon: 'none',
                    duration: 1000
                });
                return false;
            }
            saveInvoiceInfoApi
                .apiName(data)
                .then((res) => {
                    uni.showToast({
                        title: '保存成功！',
                        icon: 'success',
                        duration: 1000
                    });
                })
                .catch((err) => {});
        },

        cancel() {
            this.setData({
                isShowInvoicingMOdal: !this.isShowInvoicingMOdal
            });
        },

        submit(e) {
            let email = this.email;
            var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if (!reg.test(email)) {
                this.setData({
                    isShowMOdal: !this.isShowMOdal
                });
            }
			console.log(this.isShowMOdal,'isShowMOdal')
            e.detail.flag = 'fapiao';
            this.setData({
                addressId: e.detail.addressId
            });
            this.orderReport(e.detail);
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
        },

        clear() {
            this.setData({
                data: [],
                orderIds: [],
                price: 0,
                freightPrice: 0
            });
        }
    }
};
</script>
<style>
@import './billingApplication.css';
</style>
