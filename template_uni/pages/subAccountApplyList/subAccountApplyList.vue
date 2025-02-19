<template>
    <view class="subAccountApplyList" :style="'padding-top: ' + (menuHeight + 20) + 'px'">
        <custom-header-back title="申请管理"></custom-header-back>
        <view class="box1">
            <view class="tips">请及时处理申请，点击「同意」，确认成为“江西菜亿家商城”的子账号;若为骚扰，点击「忽略」将此项删除。</view>
            <view class="box-c">
                <view class="item" v-for="(item, index) in list" :key="index">
                    <view class="item-l">{{ item.phone }}</view>

                    <view class="item-r">
                        <view class="btn agree" @tap="agree" :id="item.id">同意</view>
                        <view class="btn ignore" @tap="ignore" :id="item.id">忽略</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
import deleteModal from '../../component/deleteModal/deleteModal';
// pages/subAccountApplyList/subAccountApplyList.js
const app = getApp();
const { auditFirmUserListApi, auditFirmUserApi } = require('../../api/index');
export default {
    components: {
        customHeaderBack,
        deleteModal
    },
    data() {
        return {
            menuHeight: app.globalData.menuHeight,
            list: []
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getAll();
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
        agree(e) {
            let id = e.currentTarget.id;
            let that = this;
            uni.showModal({
                title: '提示',
                content: '是否同意！',
                success(res) {
                    if (res.confirm) {
                        auditFirmUserApi
                            .apiName({
                                id,
                                type: 1
                            })
                            .then((res) => {
                                uni.showToast({
                                    title: '操作成功！',
                                    icon: 'success',
                                    duration: 2000
                                });
                                that.getAll();
                            })
                            .catch((err) => {});
                    }
                }
            });
        },

        ignore(e) {
            let id = e.currentTarget.id;
            let that = this;
            uni.showModal({
                title: '提示',
                content: '是否忽略！',
                success(res) {
                    if (res.confirm) {
                        auditFirmUserApi
                            .apiName({
                                id,
                                type: 0
                            })
                            .then((res) => {
                                uni.showToast({
                                    title: '操作成功！',
                                    icon: 'success',
                                    duration: 2000
                                });
                                that.getAll();
                            })
                            .catch((err) => {});
                    }
                }
            });
        },

        getAll() {
            let that = this;
            auditFirmUserListApi
                .apiName()
                .then((res) => {
                    that.setData({
                        list: res.data
                    });
                })
                .catch((err) => {});
        }
    }
};
</script>
<style>
@import './subAccountApplyList.css';
</style>
