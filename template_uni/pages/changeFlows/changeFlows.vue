<template>
    <view>
        <!-- pages/changeFlows/changeFlows.wxml -->
        <view class="changeFlows" style="padding-top:25px;">
            <custom-header-back title="零钱流水"></custom-header-back>
            <view class="box1">
                <view class="title">零钱流水</view>
            </view>
            <view class="muev">
                <view class="l">
                    <view :class="'item ' + (ind == titleIndex ? 'active' : '')" :id="ind" @tap="tab" v-for="(item, ind) in titleList" :key="ind">{{ item.name }}</view>
                </view>
                <view class="r">
                    <view class="sift" @tap="controlMOdal">筛选</view>
                </view>
            </view>
            <view class="box2">
                <!-- 待支付 -->
                <view :class="'box2_item ' + item.status[1]" v-for="(item, index) in list" :key="index">
                    <view class="box2_top">
                        <text class="name">{{ item.title }}</text>
                        <view class="money">{{ item.price }}</view>
                    </view>

                    <view class="box2_bom">
                        <text class="time">{{ item.time }}</text>
                        <view class="state">交付状态：{{ item.status[0] }}</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="modal" v-if="isShowMOdal">
            <view class="container">
                <form @submit="formSubmit">
                    <view class="title">筛选</view>

                    <view class="input">
                        <view class="title-2">交易时间：</view>
                        <view class="date-picker">
                            <picker mode="date" @change="onDateChangeLeft">
                                <view class="date">
                                    {{ curLeftDate }}
                                    <input type="text" v-if="false" :value="startTime" name="curLeftDate" />
                                    <image class="date-down" :src="dateDownImg" mode="widthFix" :lazy-load="true" />
                                </view>
                            </picker>
                            <text class="line"></text>
                            <picker mode="date" @change="onDateChangeRight">
                                <view class="date">
                                    {{ curRightDate }}
                                    <input type="text" v-if="false" :value="endTime" name="curRightDate" />
                                    <image class="date-down" :src="dateDownImg" mode="widthFix" :lazy-load="true" />
                                </view>
                            </picker>
                        </view>
                    </view>
                    <view class="input">
                        <view class="title-2">交易类型：</view>
                        <radio-group name="type">
                            <radio value="0" :checked="true" />
                            全部
                            <radio value="1" />
                            充值
                            <radio value="2" />
                            支付
                            <!-- <radio value="3"/>退款 -->
                        </radio-group>
                    </view>
                    <view class="btns">
                        <view class="btn" @tap="controlMOdal">取消</view>
                        <button class="btn" formType="submit">确定</button>
                    </view>
                </form>
            </view>
        </view>
    </view>
</template>

<script>
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/changeFlows/changeFlows.js
const { walletFlowApi } = require('../../api/index');
const app = getApp();
export default {
    components: {
        customHeaderBack
    },
    data() {
        return {
            menuHeight: app.globalData.menuHeight,
            isShowMOdal: false,
            curLeftDate: '开始时间',
            curRightDate: '结束时间',
            startTime: '',
            endTime: '',
            type: 0,

            titleList: [
                {
                    id: 1,
                    name: '近一周',
                    value: ''
                },
                {
                    id: 2,
                    name: '近一月',
                    value: ''
                },
                {
                    id: 3,
                    name: '近三月',
                    value: ''
                },
                {
                    id: 4,
                    name: '近一年',
                    value: ''
                }
            ],

            titleIndex: 0,
            list: [],
            ind: '',
            dateDownImg: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 获取当前日期
        const currentDate = new Date();
        let titleList = this.titleList;
        let startTime = '';
        let endTime = '';
        for (let ind in titleList) {
            switch (titleList[ind]['id']) {
                case 1:
                    // 获取近一周的时间范围
                    let oneWeekAgo = new Date(currentDate);
                    oneWeekAgo.setDate(currentDate.getDate() - 7);
                    startTime = oneWeekAgo.toLocaleDateString();
                    endTime = currentDate.toLocaleDateString();
                    break;
                case 2:
                    // 获取近一月的时间范围
                    let oneMonthAgo = new Date(currentDate);
                    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
                    startTime = oneMonthAgo.toLocaleDateString();
                    endTime = currentDate.toLocaleDateString();
                    break;
                case 3:
                    // 获取近三月的时间范围
                    // let oneMonthAgo = new Date(currentDate);
                    oneMonthAgo.setMonth(currentDate.getMonth() - 3);
                    startTime = oneMonthAgo.toLocaleDateString();
                    endTime = currentDate.toLocaleDateString();
                    break;
                case 4:
                    // 获取近一年的时间范围
                    const oneYearAgo = new Date(currentDate);
                    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
                    startTime = oneYearAgo.toLocaleDateString();
                    endTime = currentDate.toLocaleDateString();
                    break;
            }
            titleList[ind]['value'] = startTime + ' - ' + endTime;
        }
        this.setData({
            titleList
        });
        this.dateStr();
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
        onDateChangeLeft(e) {
            let date = e.detail.value;
            let arr = date.split('-');
            let dateStr = `${arr[0]}年${arr[1]}月${arr[2]}日`;
            this.setData({
                curLeftDate: dateStr,
                startTime: `${arr[0]}/${arr[1]}/${arr[2]}`
            });
        },

        onDateChangeRight(e) {
            let date = e.detail.value;
            let arr = date.split('-');
            let dateStr = `${arr[0]}年${arr[1]}月${arr[2]}日`;
            this.setData({
                curRightDate: dateStr,
                endTime: `${arr[0]}/${arr[1]}/${arr[2]}`
            });
        },

        controlMOdal() {
            this.setData({
                isShowMOdal: !this.isShowMOdal
            });
        },

        formSubmit(e) {
            let curLeftDate = e.detail.value.curLeftDate;
            let curRightDate = e.detail.value.curRightDate;
            let type = e.detail.value.type;
            if (curLeftDate === '' || curRightDate === '') {
                uni.showToast({
                    title: '交易时间不能为空',
                    icon: 'none',
                    duration: 2000
                });
                return false;
            }
            let date = curLeftDate + ' - ' + curRightDate;
            this.initData(type, date);
            this.controlMOdal();
        },

        tab(e) {
            let titleIndex = e.currentTarget.id;
            this.setData({
                titleIndex
            });
            this.dateStr();
        },

        dateStr() {
            let date = this.titleList[this.titleIndex]['value'];
            this.initData(0, date);
            date = date.split(' - ');
            let leftDate = date[0].split('/');
            let rightDate = date[1].split('/');
            this.setData({
                curLeftDate: `${leftDate[0]}年${leftDate[1]}月${leftDate[2]}日`,
                startTime: date[0],
                curRightDate: `${rightDate[0]}年${rightDate[1]}月${rightDate[2]}日`,
                endTime: date[1]
            });
        },

        initData(type, date) {
            uni.showLoading({
                title: '加载中...',
                mask: true
            });
            let that = this;
            walletFlowApi
                .apiName({
                    type,
                    date
                })
                .then((res) => {
                    uni.hideLoading();
                    that.setData({
                        list: res.data
                    });
                });
        }
    }
};
</script>
<style>
@import './changeFlows.css';
</style>
