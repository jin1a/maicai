<template>
    <view>
        <view class="shoppingCart" :style="'padding-top: ' + menuHeight + 'px;'">
            <custom-header title="购物车"></custom-header>
            <view class="box1">
                <navigator :url="url" class="content">
                    <view class="icon">
                        <view class="iconfont icon-dingwei"></view>
                    </view>
                    <view class="text">{{ address.detail }}（{{ address.warehouse }}）</view>
                    <view class="iconfont icon-right-1-copy"></view>
                </navigator>
            </view>
            <view class="box2">
                <block v-if="shoppingCartList.length > 0">
                    <scroll-view :scroll-y="true">
                        <view class="list">
                            <block v-for="(item, index) in shoppingCartList" :key="index">
                                <view class="item" :data-id="item.id">
                                    <shoppingCartListItem
                                        @editNum="editNum"
                                        @checked="checked"
                                        @deleteItem="deleteItem"
                                        :currentId="currentId"
                                        :skuId="item.sku_id"
                                        :itemId="item.id"
                                        @updateCurrentId="updateCurrentId"
                                        :number="item.quantity"
                                        :imageUrl="item.image"
                                        :title="item.name"
                                        :unit="item.unit"
                                        :price="item.price"
                                        :checked="item.isCheck"
                                    ></shoppingCartListItem>
                                </view>
                            </block>
                        </view>
                    </scroll-view>
                </block>
                <block v-else>
                    <view class="empty">
                        <image src="http://img.jxcyj.cn/images/empty.png" mode="widthFix" />
                        <view class="title">购物车是空的，赶快添加吧！</view>
                        <navigator url="/pages/index/index" open-type="switchTab" hover-class="none" class="btn">回首页逛逛</navigator>
                    </view>
                </block>
            </view>
        </view>
        <deleteModal v-if="isShowDeleteModal" :deleteId="deleteId" @delete="deleteColse" @cancelClose="cancelClose"></deleteModal>
        <view class="shoppingTotalBar">
            <label class="radio">
                <radio value="r1" :checked="isCheckAll" @tap="checkAll" />
                <text @tap="checkAll">全选</text>
            </label>
            <view class="shoppingTotalBar-r">
                <view class="amount">
                    数量:
                    <text></text>
                    <text class="price">{{ cartCount }}</text>
                </view>
                <view class="amount">
                    合计:
                    <text></text>
                    <text class="price">￥{{ price }}</text>
                </view>
                <navigator hover-class="none" :url="false" @tap="createOrder">去结算</navigator>
            </view>
        </view>
    </view>
</template>

<script>
import customHeader from '../../component/custom-header/custom-header';
import deleteModal from '../../component/deleteModal/deleteModal';
import shoppingCartListItem from '../../component/shoppingCartListItem/shoppingCartListItem';
// pages/shoppingCart/shoppingCart.js
const { getCartApi, delCartApi, getDefaultAddressApi, createOrderApi } = require('../../api/index');
const app = getApp();
export default {
    components: {
        customHeader,
        deleteModal,
        shoppingCartListItem
    },
    data() {
        return {
            menuHeight: app.globalData.menuHeight,
            currentId: -1,
            deleteId: '-1',
            shoppingCartList: [],
            isShowDeleteModal: false,
            isCheckAll: false,

            address: {
                detail: '',
                warehouse: ''
            },

            price: 0,
            cartIds: [],
            url: 'false',
            cartCount: 0,
            selected: 0,
            priceClone: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 3
            });
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getCartList();
        let that = this;
        getDefaultAddressApi
            .apiName()
            .then((res) => {
                that.setData({
                    address: res.data.data,
                    price: 0,
                    isCheckAll: false,
                    url: res.data.is_admin == 1 ? '/pages/address/address' : 'false'
                });
            })
            .catch((err) => {});
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 3
            });
        }
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
        checkAll(e) {
            console.log(e, 11);
            let shoppingCartList = this.shoppingCartList;
            let isCheckAll = !this.isCheckAll;
            shoppingCartList = shoppingCartList.map((item) => {
                item.isCheck = isCheckAll;
                // console.log(item);
                return item;
            });
            let total = 0;
            let cartIds = [];
            if (isCheckAll == true) {
                total = shoppingCartList
                    .reduce(function (sum, product) {
                        return sum + product.price * product.quantity;
                    }, 0)
                    .toFixed(2);
                shoppingCartList.forEach((element) => {
                    cartIds.push(element.id);
                });
            } else {
                total = 0;
            }
            this.setData({
                isCheckAll,
                shoppingCartList,
                price: total,
                cartIds: cartIds
            });
        },

        checked(e) {
            let id = e.detail.id;
            let check = e.detail.check;
            let shoppingCartList = this.shoppingCartList;
            let cartIds = this.cartIds;
            let total = this.price;
            for (var i = 0; i < shoppingCartList.length; i++) {
                if (shoppingCartList[i].id == id) {
                    shoppingCartList[i].isCheck = check;
                    let price = (shoppingCartList[i].price * shoppingCartList[i].quantity).toFixed(2);
                    if (check == true) {
                        let a = parseFloat(total) + parseFloat(price);
                        a = parseFloat(a).toFixed(2);
                        cartIds.push(id);
                        this.setData({
                            price: a
                        });
                    } else {
                        let b = this.price - price;
                        b = parseFloat(b).toFixed(2);
                        this.setData({
                            price: b
                        });
                        let ind = cartIds.indexOf(id);
                        if (ind !== -1) {
                            cartIds.splice(ind, 1);
                        }
                    }
                }
            }
            this.setData({
                shoppingCartList,
                // price:total,
                cartIds: cartIds
            });
            if (shoppingCartList.every((obj) => obj['isCheck'] === true)) {
                this.setData({
                    isCheckAll: true
                });
            } else {
                this.setData({
                    isCheckAll: false
                });
            }
        },

        hasMoreThanThreeDecimal(number) {
            var strNumber = number.toString();
            var decimalPattern = /\.\d{4,}$/;
            return decimalPattern.test(strNumber);
        },

        updateCurrentId(e) {
            this.setData({
                currentId: e.detail
            });
        },

        deleteItem(e) {
            delCartApi
                .apiName({
                    cartId: e.detail
                })
                .then((res) => {
                    let shoppingCartList = this.shoppingCartList;
                    let deleteId = e.detail;
                    for (var i = 0; i < shoppingCartList.length; i++) {
                        if (shoppingCartList[i].id == deleteId) {
                            shoppingCartList.splice(i, 1);
                        }
                    }
                    this.setData({
                        isShowDeleteModal: false,
                        deleteId: e.detail,
                        shoppingCartList,
                        cartCount: shoppingCartList.length
                    });
                })
                .catch((err) => {});
        },

        cancelClose() {
            this.setData({
                isShowDeleteModal: false
            });
        },

        deleteColse() {
            this.cancelClose();
            let shoppingCartList = this.shoppingCartList;
            let deleteId = this.deleteId;
            for (var i = 0; i < shoppingCartList.length; i++) {
                if (shoppingCartList[i].id == deleteId) {
                    shoppingCartList.splice(i, 1);
                }
            }
            this.setData({
                shoppingCartList
            });
        },

        createOrder() {
            let cartIds = this.cartIds;
            let address = this.address;
            if (cartIds.length < 1) {
                uni.showToast({
                    title: '下单商品不能为空！',
                    icon: 'none'
                });
                return false;
            }
            if (address.length < 1) {
                uni.showToast({
                    title: '请先添加收货地址！',
                    icon: 'none'
                });
                return false;
            }
            cartIds = cartIds.join(',');
            createOrderApi
                .apiName({
                    cartIds: cartIds,
                    addressId: address.id
                })
                .then((res) => {
                    uni.navigateTo({
                        url: '/pages/userPages/orderDetails/orderDetails?currentId=3&orderId=' + res.data.id
                    });
                })
                .catch((err) => {});
        },

        editNum(e) {
            let shoppingCartList = this.shoppingCartList;
            let total = 0;
            shoppingCartList.forEach((item) => {
                if (parseInt(item.sku_id) == parseInt(e.detail.id)) {
                    item.quantity = e.detail.num;
                }
                if (item.isCheck == true) {
                    if (parseInt(item.sku_id) == parseInt(e.detail.id)) {
                        total = total + item.price * e.detail.num;
                    } else {
                        total = total + item.price * item.quantity;
                    }
                }
            });
            this.setData({
                shoppingCartList: shoppingCartList
            });
            if (total > 0) {
                total = total.toFixed(2);
                this.setData({
                    price: total
                });
            }
            if (e.detail.num < 1) {
                this.getCartList();
            }
        },

        getCartList() {
            let that = this;
            getCartApi
                .apiName()
                .then((res) => {
                    if (!that.isCheckAll) {
                        that.setData({
                            shoppingCartList: res.data,
                            cartCount: res.data.length
                        });
                    } else {
                        if (res.data.length < 1) {
                            that.setData({
                                price: 0,
                                isCheckAll: false,
                                shoppingCartList: []
                            });
                            return false;
                        }
                        let total = 0;
                        let shoppingCartList = [];
                        res.data.forEach((item) => {
                            total = total + item.price * item.quantity;
                            item.isCheck = true;
                            shoppingCartList.push(item);
                        });
                        that.setData({
                            shoppingCartList: shoppingCartList
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
};
</script>
<style>
@import './shoppingCart.css';
</style>
