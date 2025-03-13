<template>
    <view class="address" style="padding-top:25px;">
        <custom-header-back :title="isEditStatus ? '修改地址' : '收货地址'"></custom-header-back>
        <view class="box1">
            <block v-if="addressLists.length > 0">
                <view class="list">
                    <block v-for="(item, index) in addressLists" :key="index">
                        <view class="item">
                            <addressItem
                                @removeAddress="removeAddress"
                                :isEditStatus="isEditStatus"
                                @radioChange="radioChange"
                                :isDefaultId="defaultId == item.id"
                                :addressId="item.id"
                                :province="item.province"
                                :city="item.city"
                                :district="item.district"
                                :name="item.name"
                                :tel="item.phone"
                                :addressText="item.detail"
                                :warehouse="item.warehouse"
                            ></addressItem>
                        </view>
                    </block>
                </view>
            </block>
            <block v-else>
                <view class="empty">您还没有添加收货地址哦！</view>
            </block>
        </view>
        <block v-if="deleteId >= 0">
            <deleteModal title="确定要删除该地址吗" cancelTetx="取消" @cancelClose="cancelClose" @delete="deleteAddress"></deleteModal>
        </block>
        <view class="addressBottom">
            <block v-if="isEditStatus">
                <view class="submit" @tap="handoff">确定</view>
            </block>
            <block v-else>
                <view class="submit" @tap="addAddress">+ 添加收货地址</view>
            </block>
        </view>
    </view>
</template>

<script>
import deleteModal from '../../component/deleteModal/deleteModal';
import addressItem from '../../component/addressItem/addressItem';
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/address/address.js
const delAddress = require('../../api/address/delAddress');
const { getAddressListApi, setDefaultAddressApi, switchoverAddressApi } = require('../../api/index');
const app = getApp();
export default {
    components: {
        deleteModal,
        addressItem,
        customHeaderBack
    },
    data() {
        return {
           
            defaultId: 0,
            deleteId: -1,
            addressLists: [],
            isEditStatus: false,
            orderId: 0
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this;
        getAddressListApi.apiName().then((res) => {
            let defaultId = 0;
            if (options.addressId == 0 || !options.addressId) {
                res.data.forEach((e) => {
                    if (e.is_default == 1) {
                        defaultId = e.id;
                    }
                });
            } else {
                defaultId = options.addressId;
            }
            that.setData({
                addressLists: res.data,
                defaultId: defaultId
            });
        });
        if (options.resetAddress) {
            this.setData({
                isEditStatus: true,
                orderId: options.orderId
            });
        }
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
            let that = this;
            if (!that.isEditStatus) {
                setDefaultAddressApi
                    .apiName({
                        addressId: e.detail
                    })
                    .then((res) => {
                        uni.showToast({
                            title: '设置成功！',
                            icon: 'success',
                            duration: 1000
                        });
                        that.setData({
                            defaultId: e.detail
                        });
                    })
                    .catch((err) => {});
            } else {
                that.setData({
                    defaultId: e.detail
                });
            }
        },

        handoff() {
            let addressId = this.defaultId;
            let orderId = this.orderId;
            switchoverAddressApi
                .apiName({
                    addressId: addressId,
                    orderId: orderId
                })
                .then((res) => {
                    uni.showToast({
                        title: '修改成功',
                        icon: 'success',
                        duration: 2000,
                        complete: function () {
                            setTimeout(function () {
                                // 跳转到目标页面
                                uni.navigateBack({
                                    delta: 1
                                });
                            }, 2000);
                        }
                    });
                })
                .catch((err) => {});
        },

        removeAddress(e) {
            this.setData({
                deleteId: e.detail
            });
        },

        deleteAddress() {
            let addressLists = this.addressLists;
            let deleteId = this.deleteId;
            let that = this;
            delAddress
                .apiName({
                    id: deleteId
                })
                .then((res) => {
                    for (var i = 0; i < addressLists.length; i++) {
                        if (addressLists[i].id == deleteId) {
                            addressLists.splice(i, 1);
                        }
                    }
                    that.setData({
                        addressLists
                    });
                    that.cancelClose();
                })
                .catch((err) => {});
        },

        cancelClose() {
            this.setData({
                deleteId: -1
            });
        },

        addAddress() {
            uni.navigateTo({
                url: '/pages/addAddress/addAddress'
            });
        }
    }
};
</script>
<style>
@import './address.css';
</style>
