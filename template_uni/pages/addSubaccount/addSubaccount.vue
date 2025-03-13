<template>
    <view class="addSubaccount" style="padding-top:25 px">
        
        <view class="box1">
            <view class="box-t">
                <view class="box-t-l">
                    <view class="avatar">
                        <image class="" :src="data.info.avatar" mode="widthFix" />
                        <label>管理员</label>
                    </view>
                    <view class="tel">{{ data.info.phone }}</view>
                </view>
                <view class="box-t-r">当前账号</view>
            </view>
            <view class="box-c">
                备注:“管理员”账号与“子账号”区别是，管理员能对企业下的子账号进行添加、删除等操作，而“子账号”只能看到企业下目前有哪些账号，并不能进行相应的操作。
            </view>
            <view class="lists">
                <view class="box-t" v-for="(item, index) in data.child" :key="index">
                    <view class="box-t-l">
                        <view class="avatar">
                            <image class="" :src="item.avatar" mode="widthFix" />
                            <label>子账号</label>
                        </view>
                        <view class="text-box">
                            <view class="tel">{{ item.phone }}</view>
                            <view class="name">{{ item.firm_name }}</view>
                        </view>
                    </view>

                    <view class="delete" @tap="deleteAccount" :id="item.id">
                        <text class="iconfont icon-shanchu2"></text>
                        删除
                    </view>
                </view>
            </view>
        </view>
        <view class="addSubaccountBottom">
            <view class="submit" @tap="showModal">添加</view>
        </view>

        <block v-if="isShowModal">
            <view class="modal">
                <view class="modal-content">
                    <view class="title">请输入需要添加的员工账号，此账 号必须已完成注册</view>
                    <input type="text" @input="inputChange" placeholder-class="input-placeholder" placeholder="请输入账号对应的手机号" />
                    <view class="btns">
                        <view class="btn" @tap="showModal">取消</view>
                        <view class="btn" @tap="sure">确定</view>
                    </view>
                </view>
            </view>
        </block>
        <block v-if="isShowDeleteModal">
            <deleteModal title="确定要删除该子账号吗" cancelTetx="取消" @cancelClose="cancelClose" @delete="deleteAddress"></deleteModal>
        </block>
    </view>
</template>

<script>
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
import deleteModal from '../../component/deleteModal/deleteModal';
// pages/addSubaccount/addSubaccount.js
const { delFirmChildUserApi, firmUserManageApi, addFirmUserApi } = require('../../api/index');
const app = getApp();
export default {
    components: {
        customHeaderBack,
        deleteModal
    },
    data() {
        return {
            // menuHeight: app.globalData.menuHeight,
            isShowModal: false,
            isShowDeleteModal: false,
            data: [],
            phone: 0,
            id: 0,
            avatar: ''
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
        deleteAccount(e) {
            this.setData({
                id: e.currentTarget.id,
                isShowDeleteModal: true
            });
        },

        inputChange(e) {
            this.setData({
                phone: e.detail.value
            });
        },

        showModal() {
            this.setData({
                isShowModal: !this.isShowModal
            });
        },

        sure() {
            let that = this;
            addFirmUserApi
                .apiName({
                    phone: that.phone
                })
                .then((res) => {
                    that.setData({
                        isShowModal: !this.isShowModal
                    });
                    that.getAll();
                })
                .catch((err) => {});
        },

        deleteAddress() {
            let id = this.id;
            let that = this;
            delFirmChildUserApi
                .apiName({
                    user_id: id
                })
                .then((res) => {
                    that.getAll();
                    that.cancelClose();
                })
                .catch((err) => {});
        },

        cancelClose() {
            this.setData({
                isShowDeleteModal: false
            });
        },

        getAll() {
            let that = this;
            firmUserManageApi
                .apiName()
                .then((res) => {
                    that.setData({
                        data: res.data
                    });
                })
                .catch((err) => {});
        }
    }
};
</script>
<style>
@import './addSubaccount.css';
</style>
