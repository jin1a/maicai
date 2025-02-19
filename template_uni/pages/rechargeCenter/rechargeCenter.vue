<template>
    <view class="rechargeCenter" :style="'padding-top: ' + (menuHeight + 20) + 'px'">
        <custom-header-back title="钱包充值"></custom-header-back>
        <view class="box1">
            <view class="title">余额充值，当前余额: {{ balance }} 元</view>
            <view class="page_list">
                <navigator url="/pages/changeFlows/changeFlows" open-type="navigate" delta="1" hover-class="none" class="page_item">
                    <text class="iconfont icon-qianbao2-xianxing"></text>
                    <view class="text_zi">零钱流水</view>
                </navigator>
            </view>
            <view class="list">
                <block v-for="(item, index) in lists" :key="index">
                    <view :class="'item ' + (item.id == listsIndex ? 'active' : '')" @tap="choose" :data-id="index">
                        <view class="text-title">{{ item.price }}元</view>
                        <!-- <view class="text-des">{{item.discount}}</view> -->
                    </view>
                </block>
            </view>
            <form @submit="">
                <view class="input">
                    <input type="text" placeholder="输入其他金额" :value="price" @input="inputChange" placeholder-class="input-placeholder" />
                    <text>元</text>
                </view>
            </form>
            <view class="text-box">
                <view class="text-title">会员充值说明:</view>
                <view>1、充值的余额，可在充电时使用:</view>
                <view>2、会员余额长期有效，充值后，不支持转赠和提现。</view>
            </view>
        </view>
        <view class="rechargeCenterBottom">
            <view class="rechargeCenterBottom-text">
                <view class="label">
                    <radio :checked="radiocheck" @tap="radioChange" />
                    <text>我已阅读，并同意会员充值说明</text>
                </view>
            </view>
            <view class="rechargeCenterBottom-bottom">
                <view class="price">
                    <text>{{ priceClone }}</text>
                    元
                </view>
                <view class="btn" @tap="topUp">立即充值</view>
            </view>
        </view>
    </view>
</template>

<script>
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/rechargeCenter/rechargeCenter.js
const { getUserInfoApi, topUpApi } = require('../../api/index');
const app = getApp();
export default {
    components: {
        customHeaderBack
    },
    // getUserInfo() {},
    data() {
        return {
            menuHeight: app.globalData.menuHeight,

            lists: [
                {
                    id: 0,
                    price: 20,
                    discount: '98折'
                },
                {
                    id: 1,
                    price: 50,
                    discount: '95折'
                },
                {
                    id: 2,
                    price: 100,
                    discount: '92折'
                },
                {
                    id: 3,
                    price: 200,
                    discount: '90折'
                },
                {
                    id: 4,
                    price: 300,
                    discount: '88折'
                }
            ],

            listsIndex: 0,
            radiocheck: true,
            price: 20,
            balance: 0,
            priceClone: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this;
        getUserInfoApi
            .apiName()
            .then((res) => {
                if (res.data.firm.is_wallet == 0) {
                    uni.navigateTo({
                        url: '/pages/recharge/recharge'
                    });
                }
                that.setData({
                    balance: res.data.firm.amount
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
    methods: {
        choose(e) {
            let index = e.currentTarget.dataset.id;
            let listsIndex = this.listsIndex;
            listsIndex = index == listsIndex ? '0' : index;
            let item = this.lists.find((obj) => obj.id == listsIndex);
            this.setData({
                listsIndex,
                price: item.price
            });
        },

        inputChange(e) {
            this.setData({
                listsIndex: -1,
                price: e.detail.value
            });
        },

        topUp() {
            let price = this.price;
            let that = this;
            if (price <= 0) {
                uni.showToast({
                    title: '充值金额不能少于0',
                    icon: 'none',
                    duration: 2000
                });
                return false;
            }
            uni.showModal({
                title: '温馨提示',
                content: '充值金额' + price + '元',
                success(res) {
                    if (res.confirm) {
                        topUpApi
                            .apiName({
                                price: price
                            })
                            .then((res) => {
                                // 获取到后端返回的支付参数
                                const payParams = res.data;
                                // 调用微信支付接口发起支付请求
                                uni.requestPayment({
                                    timeStamp: payParams.timestamp,
                                    nonceStr: payParams.nonceStr,
                                    package: payParams.package,
                                    signType: payParams.signType,
                                    paySign: payParams.paySign,
                                    success: function (res) {
                                        uni.showToast({
                                            title: '充值成功',
                                            icon: 'success',
                                            complete: function () {
                                                let balance = parseFloat(that.balance) + parseFloat(price);
                                                that.setData({
                                                    balance: balance.toFixed(2)
                                                });
                                            }
                                        });
                                    },
                                    fail: function (res) {
                                        // 支付失败处理逻辑
                                        console.log('支付失败', res);
                                    }
                                });
                            })
                            .catch((err) => {});
                    } else if (res.cancel) {
                    }
                }
            });
        },

        radioChange() {
            this.setData({
                radiocheck: !this.radiocheck
            });
        }
    }
};
</script>
<style>
@import './rechargeCenter.css';
</style>
