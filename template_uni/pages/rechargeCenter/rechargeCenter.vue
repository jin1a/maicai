<template>
    <view class="rechargeCenter" style="padding-top:25px;">
        <custom-header-back title="钱包充值"></custom-header-back>
        <view class="box1">
            <view class="title">
                余额充值，当前余额: {{ balance }} 元
                <view class="btn" @tap="getUserInfo">同步余额</view>
            </view>
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
                <view>1、充值的余额，可在购买时使用:</view>
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
        <view class="invoicingModal" v-if="isShowModel">
            <view class="container">
                <form @submit="formSubmit">
                    <view class="tips">请复制以下账户信息，去您所在银行，向以下账户中转账一样的金额，有效期为7天！！</view>
                    <view class="input" v-for="(item, index) in accountInfo" :key="index">
                        <view>{{ item.title }}：</view>

                        {{ item.msg }}
                    </view>
                    <view class="input">
                        <view>充值金额：</view>
                        ￥{{ price }}
                    </view>
                    <view class="btns">
                        <button class="btn" @tap="cancelModel">取消</button>
                        <button class="btn" @tap="copyAccountInfo">复制账户</button>
                    </view>
                </form>
            </view>
        </view>
    </view>
</template>

<script>
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/rechargeCenter/rechargeCenter.js
const { getUserInfoApi, topUpApi, systemApi } = require('../../api/index');
const app = getApp();
export default {
    components: {
        customHeaderBack
    },
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
            isShowModel: false,
            accountInfo: {},
            priceClone: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getUserInfo();
        this.getTopUpAccountInfo();
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
            if (!this.radiocheck) {
                uni.showToast({
                    title: '请阅读充值说明！',
                    icon: 'none',
                    duration: 2000
                });
                return false;
            }
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
                        uni.showLoading({
                            title: '加载中...',
                            mask: true
                        });
                        topUpApi
                            .apiName({
                                price: price
                            })
                            .then((res) => {
                                that.cancelModel();
                                uni.hideLoading();
                            })
                            .catch((err) => {
                                uni.hideLoading();
                            });
                    } else if (res.cancel) {
                        //取消操作
                    }
                }
            });
        },

        radioChange() {
            this.setData({
                radiocheck: !this.radiocheck
            });
        },

        cancelModel() {
            this.setData({
                isShowModel: !this.isShowModel
            });
        },

        getTopUpAccountInfo() {
            let that = this;
            systemApi
                .apiName()
                .then((res) => {
                    that.setData({
                        accountInfo: res.data.topUpAccountInfo
                    });
                })
                .catch((err) => {});
        },

        getUserInfo() {
            let that = this;
            uni.showLoading({
                title: '加载中...',
                mask: true
            });
            getUserInfoApi
                .apiName()
                .then((res) => {
                    uni.hideLoading();
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

        copyAccountInfo() {
            let text = '';
            this.accountInfo.forEach((item) => {
                text += `${item.title}：${item.msg}\n`;
            });
            uni.setClipboardData({
                data: text,
                success: function (res) {
                    uni.getClipboardData({
                        success: function (res) {
							uni.showToast({
								title: '复制成功',
								duration: 2000
							});
                            // uni.showToast({
                            //     title: '复制成功'
                            // });
                        }
                    });
                }
            });
        },

        formSubmit() {
            console.log('占位：函数 formSubmit 未声明');
        }
    }
};
</script>

<style>
@import './rechargeCenter.css';
</style>
