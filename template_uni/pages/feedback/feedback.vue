<template>
    <view class="feedback" :style="'padding-top: ' + (menuHeight + 20) + 'px'">
        <custom-header-back title="反馈"></custom-header-back>
        <view class="box1">
            <view class="box-c">
                <view class="item">
                    <view class="item-l">反馈主题</view>
                    <view class="item-r">
                        <input type="text" @input="title" placeholder="输入您要反馈的主题" placeholder-class="input-placeholder" />
                    </view>
                </view>
                <view class="item">
                    <view class="item-l">反馈内容</view>
                    <view class="item-r1">
                        <textarea value="" @input="content" placeholder="请输入文本" />
                    </view>
                </view>
            </view>
            <view class="contact">
                <view class="contact_title">联系客服：</view>
                <view class="phone" v-for="(item, index) in list.contact_wx" :key="index">
                    <text class="contact_name">{{ item }}（微信号）</text>

                    <text class="contact_btn" @tap="copyText" :data-text="item">点击复制</text>
                </view>
            </view>
        </view>
        <view class="feedbackBottom">
            <view class="submit" @tap="submit">提交反馈</view>
        </view>
    </view>
</template>

<script>
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/feedback/feedback.js
const { feedbackApi, systemApi } = require('../../api/index');
const app = getApp();
export default {
    components: {
        customHeaderBack
    },
    data() {
        return {
            menuHeight: app.globalData.menuHeight,
            formData: {
                title: '',
                content: ''
            },
            list: []
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this;
        systemApi
            .apiName()
            .then((res) => {
                that.setData({
                    list: res.data
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
        title(e) {
            var value = e.detail.value;
            this.setData({
                'formData.title': value
            });
        },

        content(e) {
            var value = e.detail.value;
            this.setData({
                'formData.content': value
            });
        },

        copyText: function (e) {
            uni.setClipboardData({
                data: e.currentTarget.dataset.text,
                success: function (res) {
                    uni.getClipboardData({
                        success: function (res) {
                            uni.showToast({
                                title: '复制成功'
                            });
                        }
                    });
                }
            });
        },

        submit() {
            let data = this.formData;
            if ((Object.keys(data)?.length ?? 0) <= 1) {
                uni.showToast({
                    title: '请填写完整！',
                    icon: 'none'
                });
                return false;
            }
            feedbackApi
                .apiName(data)
                .then((res) => {
                    uni.showToast({
                        title: '操作成功',
                        icon: 'success',
                        duration: 2000,
                        complete: function () {
                            setTimeout(function () {
                                // 跳转到目标页面
                                uni.switchTab({
                                    url: '/pages/userPages/user/user'
                                });
                            }, 2000);
                        }
                    });
                })
                .catch((err) => {});
        }
    }
};
</script>
<style>
@import './feedback.css';
</style>
