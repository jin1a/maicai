<template>
    <view class="allOrder" style="padding-top: 35px;">
        <!-- <custom-header-back title="我的订单"></custom-header-back> -->
        <view class="allOrderContainer">
            <view class="orderNav">
                <view class="list">
                    <block v-for="(item, index) in list" :key="index">
                        <view :class="'item ' + (index == currentId ? 'active' : '')" @tap="switcOrderNav" :data-id="index">{{ item }}</view>
                    </block>
                </view>
            </view>
            <view class="orderContainer">
                <scroll-view scroll-with-animation scroll-y :scroll-top="offset" @scroll="viewScroll" id="scrollview" @scrolltolower="Reachbottom">
                    <view class="seachOrder">
                        <inputSearch @search="search" :isOrder="true" placeholder="搜索订单" :currId="currentId" title=""></inputSearch>
                    </view>
                    <view class="orderListBox">
                        <block v-if="currentId == 0">
                            <view class="list">
                                <view class="item" v-for="(item, index) in orderList" :key="index">
                                    <orderItem
                                        @cancelOrder2="cancelOrder2"
                                        @delOrder="delOrder"
                                        @orderTake="orderTake"
                                        currId="0"
                                        :orderInfo="item"
                                        :currentId="item.status"
                                    ></orderItem>
                                </view>
                            </view>
                        </block>
                        <block v-if="currentId == 1">
                            <view class="list">
                                <view class="item" v-for="(item, index) in orderList" :key="index">
                                    <orderItem @cancelOrder2="cancelOrder2" :orderInfo="item" :currentId="item.status"></orderItem>
                                </view>
                            </view>
                        </block>
                        <block v-if="currentId == 2">
                            <view class="list">
                                <view class="item" v-for="(item, index) in orderList" :key="index">
                                    <orderItem :orderInfo="item" :currentId="item.status"></orderItem>
                                </view>
                            </view>
                        </block>
                        <block v-if="currentId == 3">
                            <view class="list">
                                <view class="item" v-for="(item, index) in orderList" :key="index">
                                    <orderItem @orderTake="orderTake" currId="3" :orderInfo="item" :currentId="item.status"></orderItem>
                                </view>
                            </view>
                        </block>
                    </view>
                </scroll-view>
            </view>
        </view>
        <block v-if="showBackTop">
            <view class="backTop" @tap="backTop">
                <view class="iconfont icon-zhiding"></view>
                <!-- <view class="">回到顶部</view> -->
            </view>
        </block>
    </view>
</template>

<script>
import inputSearch from '../../../component/inputSearch/inputSearch';
import orderItem from '../../../component/orderItem/orderItem';
// import customHeaderBack from '../../../component/custom-header-back/custom-header-back';
// pages/userPages/allOrder/allOrder.js
const { getAllOrderApi, cancelOrderApi, orderTakeApi, delOrderApi } = require('../../../api/index');
const app = getApp();
export default {
    components: {
        inputSearch,
        orderItem        
    },
    data() {
        return {           
            currentId: 3,
            list: ['全部', '待付款', '待发货', '待收货'],
            orderList: [],
            showBackTop: false,
            offset: 0,
            mchid: 0,
            page: 1,
            seatchTitle: '',
            lazy: true
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // console.log(options)
        let currentId = options.currentId ? options.currentId : 0;
        this.getAllorder(currentId);
        this.setData({
            currentId
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
        viewScroll(e) {
            let showBackTop = e.detail.scrollTop > 10 ? true : false;
            this.setData({
                showBackTop
            });
        },

        backTop() {
            this.setData({
                offset: 0
            });
        },

        switcOrderNav(e) {
            this.setData({
                currentId: e.currentTarget.dataset.id
            });
        },

        switcOrderNav(e) {
            let type = e.currentTarget.dataset.id;
            this.getAllorder(type);
            this.setData({
                currentId: type
            });
        },

        getAllorder(type, search = '') {
            let that = this;
            getAllOrderApi
                .apiName({
                    type: type,
                    search: search,
                    page: 1
                })
                .then((res) => {
                    if (res.data.data) {
                        that.setData({
                            orderList: res.data.data,
                            mchid: res.data.mchid,
                            page: 1,
                            lazy: true
                        });
                    } else {
                        that.setData({
                            orderList: []
                        });
                    }
                })
                .catch((err) => {});
        },

        cancelOrder2(e) {
            let type = parseInt(e.detail.type);
            let orderId = e.detail.orderId;
            let that = this;
            uni.showModal({
                title: '温馨提示',
                content: '是否取消订单！',
                success(res) {
                    if (res.confirm) {
                        cancelOrderApi
                            .apiName({
                                orderId: orderId
                            })
                            .then((res) => {
                                uni.showToast({
                                    title: '订单已取消！',
                                    icon: 'success',
                                    duration: 2000,
                                    complete: function () {
                                        that.getAllorder(type);
                                    }
                                });
                            })
                            .catch((err) => {});
                    }
                }
            });
        },

        orderTake(e) {
            let type = parseInt(e.detail.type);
            let orderId = parseInt(e.detail.orderId);
            let orderKey = e.detail.orderKey;
            let that = this;
            uni.openBusinessView({
                businessType: 'weappOrderConfirm',
                extraData: {
                    merchant_id: that.mchid,
                    merchant_trade_no: orderKey
                    // transaction_id: '4200002211202404258995889148'
                },

                success() {
                    orderTakeApi
                        .apiName({
                            orderId: orderId
                        })
                        .then((res) => {
                            that.getAllorder(type);
                        })
                        .catch((err) => {});
                },
                fail(e) {
                    console.log(e);
                }
            });
        },

        delOrder(e) {
            let type = parseInt(e.detail.type);
            let orderId = parseInt(e.detail.orderId);
            let that = this;
            uni.showModal({
                title: '警告',
                content: '是否删除订单',
                success(res) {
                    if (res.confirm) {
                        delOrderApi
                            .apiName({
                                orderId: orderId
                            })
                            .then((res) => {
                                that.getAllorder(type);
                            })
                            .catch((err) => {});
                    }
                }
            });
        },

        search(e) {
            let type = parseInt(e.detail.type);
            let title = e.detail.title;
            this.setData({
                seatchTitle: title
            });
            this.getAllorder(type, title);
        },

        Reachbottom() {
            this.appendList();
        },

        appendList() {
            if (!this.lazy) {
                return false;
            }
            let that = this;
            let type = this.currentId;
            let page = this.page + 1;
            let seatchTitle = this.seatchTitle;
            getAllOrderApi
                .apiName({
                    type: type,
                    search: seatchTitle,
                    page: page
                })
                .then((res) => {
                    if (res.data.data.length > 0) {
                        that.setData({
                            orderList: that.orderList.concat(res.data.data),
                            page: page
                        });
                    } else {
                        that.setData({
                            lazy: false
                        });
                    }
                })
                .catch((err) => {});
        }
    }
};
</script>
<style>
@import './allOrder.css';
</style>
