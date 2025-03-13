<template>
    <view class="signContract" :style="'padding-top: ' + (menuHeight + 20) + 'px'">
        <!-- <custom-header-back title="用户签约"></custom-header-back> -->
        <view class="box1">
            <view class="title">中国工商银行工银e企付菜亿家平台交易方服务协议</view>
            <view class="box-c">
                <view class="">
                    经交易方（签订本协议的付款方或收款方，以下简称“贵司/您”）与江西菜亿家网络科技有限公司（以下简称“合作平台”）、中国工商银行股份有限公司（以下简称“本行”）三方本着平等互利、诚实信用的原则，经协商一致就本行向贵司/您提供的工银e企付平台客户服务达成如下协议:
                </view>
                <view class="title">[签约声明]</view>
                <view>
                    一、贵司/您确认在签署本协议之前，已充分阅读、理解并接受本协议的全部内容
                    (包括但不限于贵司/您的基本信息、联系信息、资料信息、本协议全部声明及条款，特别是其中有关本行的免责条款），如贵司/您不同意本协议条款内容的应立即终止工银e企付客户服务的下一步操作。一旦贵司/您通过合作平台勾选或点击确认同意本协议的，即表示贵司/您同意遵循本协议之所有约定，协议生效。
                </view>
                <view>
                    二、《中国工商银行工银e企付平台交易方业务规则》
                    (以下简称“业务规则”）为本协议附件，本行保留对条款、条件、附件和说明变更的权利,本行依据法律法规、监管规定及业务需要对本协议所做的任何变更或补充，将通过本行相关网页或合作平台等适当方式公告。
                </view>
            </view>
        </view>
        <view class="signContractBottom">
            <radio-group @change="radioChange">
                <label>
                    <view class="label">
                        <radio :checked="radiocheck" />
                        <text>我已阅读并同意</text>
                    </view>
                </label>
            </radio-group>
            <view class="btns">
                <navigator url="/pages/recharge/recharge" hover-class="none" class="btn">不同意</navigator>
                <view @tap="agree" :class="'btn ' + (time > 0 ? 'disable' : '')">
                    同意协议
                    <block v-if="time > 0">({{ time }}秒)</block>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/signContract/signContract.js
const { openBalanceApi } = require('../../api/index');
const app = getApp();
export default {
    components: {
        customHeaderBack
    },
    data() {
        return {
            menuHeight: app.globalData.menuHeight,
            time: 5,
            radiocheck: false
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let $this = this;
        setInterval(function () {
            let time = $this.time;
            if (time > 0) {
                $this.setData({
                    time: time - 1
                });
            }
        }, 1000);
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
        radioChange() {
            this.setData({
                radiocheck: true
            });
        },

        agree() {
            if (!this.time > 0) {
                if (this.radiocheck) {
                    openBalanceApi
                        .apiName()
                        .then((res) => {
                            uni.navigateTo({
                                url: '/pages/rechargeCenter/rechargeCenter'
                            });
                        })
                        .catch((err) => {});
                } else {
                    uni.showToast({
                        title: '请先阅读并勾选本页协议',
                        icon: 'none',
                        duration: 1500
                    });
                }
                // if()
            }
        }
    }
};
</script>
<style>
@import './signContract.css';
</style>
