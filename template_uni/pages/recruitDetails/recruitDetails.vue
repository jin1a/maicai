<template>
    <view class="recruitDetails" :style="'padding-top: ' + (menuHeight + 20) + 'px'">
        <!-- <custom-header-back title="招聘详情"></custom-header-back> -->
        <view class="box1">
            <view class="box-c">
                <view class="title">{{ info.name }}</view>
                <view class="salary">{{ info.salary_range }}</view>
                <view class="msg">
                    <view class="label">
                        <text class="iconfont icon-xueli"></text>
                        <text>{{ info.degree }}</text>
                    </view>
                    <view class="label">
                        <text class="iconfont icon-shijian-o"></text>
                        <text>{{ info.working_years }}</text>
                    </view>
                </view>
                <view class="des">{{ info.firm_name }}</view>
            </view>
            <view class="box-b">
                <view class="title">职位描述</view>
                <view class="text-box">
                    <view class="text">
                        <view class="text-title">岗位职责:</view>
                        <view class="text-des">
                            <view>{{ info.des }}</view>
                        </view>
                    </view>
                    <view class="text">
                        <view class="text-title">岗位要求:</view>
                        <view class="text-des">
                            <view>{{ info.required_qualifications }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/recruitDetails/recruitDetails.js
const app = getApp();
const { recruitListApi } = require('../../api/index');
export default {
    components: {
        customHeaderBack
    },
    data() {
        return {
            menuHeight: app.globalData.menuHeight,
            info: {
                name: '',
                salary_range: '',
                degree: '',
                working_years: '',
                firm_name: '',
                des: '',
                required_qualifications: ''
            }
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let id = options.id;
        let that = this;
        recruitListApi
            .apiName({
                type: 1,
                id
            })
            .then((res) => {
                that.setData({
                    info: res.data
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
    methods: {}
};
</script>
<style>
@import './recruitDetails.css';
</style>
