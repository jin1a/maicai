<template>
    <view class="addSubaccount" style="padding-top:50px;">
        
        <view class="box1">
            <view class="info" v-if="isShowChileModal">
                <view class="info-title">
                    <text class="iconfont icon-gantanhao1"></text>
                    <text>您有新的子账号申请</text>
                </view>
                <navigator url="/pages/subAccountApplyList/subAccountApplyList" class="detail" hover-class="none">点击处理</navigator>
            </view>
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
                        </view>
                    </view>

                    <view class="btns">
                        <navigator :url="'/pages/subAccountAddressPermission/subAccountAddressPermission?userid=' + item.id" class="btn" hover-class="none">地址权限</navigator>
                        <view class="edit" @tap="editAccount">编辑</view>
                    </view>

                    <block>
                        <view :class="'editModal ' + (isShowEditModal ? 'active' : '')">
                            <view class="shadow" @tap="closeEditModal"></view>
                            <view class="editModalContent">
                                <view class="item" @tap="setAdmin" :id="item.id">设为管理员</view>
                                <view class="item" @tap="deleteAccount" :id="item.id">删除</view>
                                <view class="item" @tap="closeEditModal">取消</view>
                            </view>
                        </view>
                    </block>
                </view>
            </view>
        </view>
        <view class="addSubaccountBottom">
            <view class="submit" @tap="showModal">添加</view>
        </view>
        <block v-if="isShowDeleteModal">
            <deleteModal title="确定要删除该子账号吗" cancelTetx="取消" @cancelClose="cancelClose" @delete="deleteAddress"></deleteModal>
        </block>
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
    </view>
</template>

<script>
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
import deleteModal from '../../component/deleteModal/deleteModal';
// pages/addSubaccount/addSubaccount.js
const app = getApp();
const { delFirmChildUserApi, firmUserManageApi, addFirmUserApi, setFirmAdminApi } = require('../../api/index');
export default {
    components: {
        customHeaderBack,
        deleteModal
    },
    data() {
        return {
            menuHeight: app.globalData.menuHeight,
            isShowEditModal: false,
            isShowModal: false,
            isShowDeleteModal: false,
            isShowChileModal: false,
            data: [],
            phone: 0,
            id: 0,
            avatar: ''
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
    onShow() {
        this.getAll();
    },
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
        editAccount() {
            this.setData({
                isShowEditModal: true
            });
        },

        closeEditModal() {
            this.setData({
                isShowEditModal: false
            });
        },

        deleteAccount(e) {
            this.setData({
                id: e.currentTarget.id,
                isShowDeleteModal: true,
                isShowEditModal: false
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

        setAdmin(e) {
            let id = e.currentTarget.id;
            this.setData({
                isShowEditModal: false
            });
            uni.showModal({
                title: '警告',
                content: '是否确认转让管理员！',
                success(res) {
                    if (res.confirm) {
                        setFirmAdminApi
                            .apiName({
                                id
                            })
                            .then((res) => {
                                uni.showToast({
                                    title: '转让成功！',
                                    icon: 'success',
                                    duration: 2000,
                                    complete: function () {
                                        setTimeout(function () {
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
            });
        },

        getAll() {
            let that = this;
            firmUserManageApi
                .apiName()
                .then((res) => {
                    let isShowChileModal = false;
                    if (res.data.audit > 0) {
                        isShowChileModal = true;
                    }
                    that.setData({
                        data: res.data,
                        isShowChileModal
                    });
                })
                .catch((err) => {});
        }
    }
};
</script>
<style>
@import './subAccountAdminister.css';
</style>
