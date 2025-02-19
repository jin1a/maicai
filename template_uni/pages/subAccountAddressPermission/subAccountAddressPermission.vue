<template>
    <view class="subAccountAddressPermission" :style="'padding-top: ' + (menuHeight + 20) + 'px'">
        <custom-header-back title="地址权限"></custom-header-back>
        <view class="box1">
            <radio-group @change="radioChange">
                <view class="item" v-for="(item, index) in data" :key="index">
                    <view class="item-t">
                        <view class="item-t-l">{{ item.name }}</view>
                        <view class="item-t-r">{{ item.phone }}</view>
                    </view>

                    <view class="item-c">{{ item.detail }}（{{ item.warehouse }}）</view>

                    <view class="item-b">
                        <view class="radio">
                            <radio :checked="item.isChecked" @tap="authorize" :id="item.id"></radio>
                            <text>授予</text>
                        </view>
                    </view>
                </view>
            </radio-group>
        </view>
    </view>
</template>

<script>
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
import deleteModal from '../../component/deleteModal/deleteModal';
// pages/subAccountAddressPermission/subAccountAddressPermission.js
const app = getApp();
const { getAddressListApi, authorizeAddressApi } = require('../../api/index');
export default {
    components: {
        customHeaderBack,
        deleteModal
    },
    data() {
        return {
            menuHeight: app.globalData.menuHeight,
            data: [],
            userid: 0
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this;
        let userid = options.userid;
        that.setData({
            userid: userid
        });
        getAddressListApi
            .apiName({
                userid
            })
            .then((res) => {
                that.setData({
                    data: res.data
                });
            });
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
        radioChange(e) {
            // console.log(e, 111);
        },

        authorize(e) {
            let id = e.currentTarget.id;
            let userid = this.userid;
            if (userid == 0) {
                uni.showToast({
                    title: '用户id错误',
                    icon: 'none',
                    duration: 2000
                });
                return false;
            }
            authorizeAddressApi
                .apiName({
                    userid,
                    id
                })
                .then((res) => {
                    uni.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 2000,
                        complete: function () {
                            setTimeout(function () {
                                // 跳转到目标页面
                                uni.navigateBack({
                                    delta: 1
                                    // url: '/pages/subAccountAdminister/subAccountAdminister'
                                });
                            }, 2000);
                        }
                    });
                });
        }
    }
};
</script>
<style>
@import './subAccountAddressPermission.css';
</style>
