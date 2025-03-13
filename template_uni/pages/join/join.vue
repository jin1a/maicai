<template>
    <view class="join" style="padding-top:25px;">
        <custom-header-back title="加入他人企业"></custom-header-back>
        <view class="box1">
            <view class="input-box">
                <text>企业名称:</text>
                <input type="text" :value="firmName" @input="handleInput" placeholder="请输入您要添加的企业" placeholder-class="input-placeholder" />
            </view>
            <view class="btns">
                <view class="btn" @tap="caertFirm">新用户创建企业</view>
                <view class="btn" @tap="joinFirm">加入他人企业</view>
            </view>
        </view>
        <block v-if="isShowModal">
            <view class="modal">
                <view class="modal-content">
                    <view class="close" @tap="showModal"><text class="iconfont icon-jia_sekuai"></text></view>
                    <view class="title">绑定手机号</view>
                    <form @submit="">
                        <view class="input">
                            <input type="text" placeholder-class="input-placeholder" placeholder="输入手机号" />
                        </view>
                        <view class="input">
                            <input type="text" placeholder-class="input-placeholder" placeholder="输入图形验证码" />
                            <view class="verifyCode">
                                <image src="http://img.jxcyj.cn/images/yzm.png" mode="widthFix" />
                                <view>看不清？换一张</view>
                            </view>
                        </view>
                        <view class="input">
                            <input type="text" placeholder-class="input-placeholder" placeholder="输入短信验证码" />
                            <view class="msgVerifyCode" @tap="showModal1">{{ sendTime }}</view>
                        </view>
                        <view class="submit">确定</view>
                    </form>
                </view>
            </view>
        </block>
    </view>
</template>

<script>
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/join/join.js
const { createFirmApi, joinFirmApi } = require('../../api/index');
const app = getApp();
export default {
    components: {
        customHeaderBack
    },
    data() {
        return {
            menuHeight: app.globalData.menuHeight,
            isShowModal: false,
            sendTime: '获取验证码',
            smsFlag: false,
            snsMsgWait: 60,
            firmName: ''
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
        showModal1() {
            var inter = setInterval(
                function () {
                    this.setData({
                        smsFlag: true,
                        sendTime: this.snsMsgWait + 's后重发',
                        snsMsgWait: this.snsMsgWait - 1
                    });
                    if (this.snsMsgWait < 0) {
                        clearInterval(inter);
                        //smsFlag: false
                        this.setData({
                            sendTime: '获取验证码',
                            snsMsgWait: 60,
                            smsFlag: false
                        });
                    }
                }.bind(this),
                1000
            );
        },

        showModal() {
            this.setData({
                isShowModal: !this.isShowModal
            });
        },

        caertFirm() {
            let firmName = this.firmName;
            if (firmName.length === 0) {
                uni.showToast({
                    title: '请输入企业名称！~',
                    icon: 'none'
                });
            }
            createFirmApi
                .apiName({
                    firmName: firmName
                })
                .then((res) => {
                    app.globalData.saveStorage('userInfo', res.data);
                    uni.switchTab({
                        url: '/pages/userPages/user/user'
                    });
                })
                .catch((err) => {});
        },

        joinFirm() {
            let firmName = this.firmName;
            if (firmName.length === 0) {
                uni.showToast({
                    title: '请输入企业名称！~',
                    icon: 'none'
                });
            }
            joinFirmApi
                .apiName({
                    firmName: firmName
                })
                .then((res) => {
                    app.globalData.saveStorage('userInfo', res.data);
                    uni.showToast({
                        title: res.msg,
                        icon: 'none'
                    });
                })
                .catch((err) => {});
        },

        handleInput(e) {
            this.setData({
                firmName: e.detail.value
            });
        },

        getMsgVerifyCode() {}
    }
};
</script>
<style>
@import './join.css';
</style>
