<template>
    <view class="orderBtn btns">
        <block v-if="currentId == 2">
            <view class="btns-l">
                <view class="more" @tap.stop.prevent="toggleMore">更多</view>
                <view class="tips" v-if="showMore">
                    <view @tap="delOrder">删除订单</view>
                </view>
            </view>
            <view class="btns-r">
                <view class="btn">开发票</view>
                <view class="btn green" @tap="recur">再来一单</view>
            </view>
        </block>
        <block v-else-if="currentId == 3">
            <view class="btns-l">
                <block v-if="flagPage == 'orderDetails'">
                    <view class="unpaid">
                        待支付:
                        <text class="price">
                            ￥
                            <text>{{ price }}</text>
                        </text>
                    </view>
                </block>
                <block v-else>
                    <view class="time">
                        剩余时间：
                        <text>{{ formattedTime }}</text>
                    </view>
                </block>
            </view>
            <view class="btns-r">
                <view class="btn" @tap="cancelOrder2">取消订单</view>
                <view class="btn green" @tap="payOrder2">立即支付</view>
            </view>
        </block>
        <block v-else-if="currentId == 5">
            <view class="btns-l">
                <block v-if="flagPage == 'orderDetails'">
                    <view class="unpaid">
                        待支付:
                        <text class="price">
                            ￥
                            <text>{{ price }}</text>
                        </text>
                    </view>
                </block>
                <block v-else>
                    <view class="time">
                        剩余时间：
                        <text>{{ formattedTime }}</text>
                    </view>
                </block>
            </view>
            <view class="btns-r">
                <view class="btn" @tap="cancelOrder">取消订单</view>
                <view class="btn green" @tap="payOrder">立即支付</view>
            </view>
        </block>
        <block v-else-if="currentId == 0">
            <view class="btns-l"></view>
            <view class="btns-r">
                <!-- <navigator class="btn" url="/pages/address/address?resetAddress=0&orderId={{orderId}}&addressId={{addressId}}">修改地址</navigator> -->
                <view class="btn" @tap="continueShoppin">继续购物</view>
                <view class="btn green" @tap="recur" url="">再来一单</view>
            </view>
        </block>
        <block v-else-if="currentId == 1">
            <block v-if="flagPage == 'orderDetails'">
                <view class="btns-l" @tap.stop.prevent="toggleMore">
                    <view class="more">更多</view>
                    <view class="tips" v-if="showMore">
                        <view>删除订单</view>
                    </view>
                </view>
            </block>
            <block v-else-if="currentId == 1">
                <view class="btns-l"></view>
            </block>
            <view class="btns-r">
                <view class="btn" @tap="recur">再来一单</view>
                <view class="btn green" url="" @tap="orderTake">确认收货</view>
            </view>
        </block>
    </view>
</template>

<script>
// component/orderBtn/orderBtn.js
const { againOrderApi } = require('../../api/index');
export default {
    data() {
        return {
            showMore: false,
            // 倒计时剩余时间（单位：秒）
            countdownTime: 0,
            // 格式化后的倒计时时间字符串
            formattedTime: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        currentId: {
            type: String,
            default: 0
        },
        currId: {
            type: String,
            default: 0
        },
        flagPage: {
            type: String,
            default: ''
        },
        price: {
            type: String,
            default: 0
        },
        time: {
            type: String,
            default: 0
        },
        orderId: {
            type: Number,
            default: 0
        },
        addressId: {
            type: Number,
            default: 0
        },
        orderKey: {
            type: String,
            default: ''
        }
    },
    mounted() {
        // 处理小程序 attached 生命周期
        this.attached();
    },
    /**
     * 组件生命周期函数-在组件实例被从页面节点树移除时执行
     */
    destroyed: function () {
        // 清除倒计时定时器
        clearInterval(this.countdownTimer);
    },
    /**
     * 组件的方法列表
     */
    methods: {
        /**
         * 组件生命周期函数-在组件实例进入页面节点树时执行
         */
        attached: function () {},

        toggleMore(e) {
            this.setData({
                showMore: !this.showMore
            });
        },

        payOrder() {
            this.$emit('myevent', {
                detail: {
                    value: '1'
                }
            });
        },

        cancelOrder() {
            this.$emit('cancelOrder');
        },

        cancelOrder2() {
            this.$emit('cancelOrder2', {
                detail: {
                    type: this.currId,
                    orderId: this.orderId
                }
            });
        },

        continueShoppin() {
            uni.switchTab({
                url: '/pages/category/category'
            });
        },

        recur() {
            let orderId = this.orderId;
            againOrderApi
                .apiName({
                    orderId: orderId
                })
                .then((res) => {
                    uni.switchTab({
                        url: '/pages/shoppingCart/shoppingCart'
                    });
                })
                .catch((err) => {});
        },

        orderTake() {
            this.$emit('orderTake', {
                detail: {
                    type: this.currId,
                    orderId: this.orderId,
                    orderKey: this.orderKey
                }
            });
        },

        delOrder() {
            this.$emit('delOrder', {
                detail: {
                    type: this.currId,
                    orderId: this.orderId
                }
            });
        },

        payOrder2() {
            uni.navigateTo({
                url: '/pages/userPages/orderDetails/orderDetails?currentId=3&orderId=' + this.orderId
            });
        },

        // 启动倒计时定时器
        startCountdown: function () {
            this.setData({
                countdownTime: this.time
            });

            // 每隔一秒更新一次倒计时时间
            this.countdownTimer = setInterval(() => {
                // 更新倒计时时间
                this.setData({
                    countdownTime: this.countdownTime - 1
                });
                // 格式化倒计时时间并更新到页面数据中
                this.formatCountdownTime();
                // 判断倒计时是否结束
                if (this.countdownTime <= 0) {
                    // 倒计时结束，清除定时器
                    clearInterval(this.countdownTimer);
                }
            }, 1000);
        },

        // 格式化倒计时时间
        formatCountdownTime: function () {
            const hours = Math.floor(this.countdownTime / 3600);
            const minutes = Math.floor((this.countdownTime % 3600) / 60);
            const seconds = this.countdownTime % 60;

            // 将格式化后的倒计时时间更新到页面数据中
            this.setData({
                formattedTime: `${this.formatNumber(hours)}:${this.formatNumber(minutes)}:${this.formatNumber(seconds)}`
            });
        },

        // 格式化数字，补零
        formatNumber: function (num) {
            return num < 10 ? '0' + num : num;
        }
    },
    created: function () {},
    watch: {
        time: {
            handler: function (newVal, oldVal) {
                if (newVal > 0 && this.countdownTime < 1) {
                    this.startCountdown();
                }
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './orderBtnBar.css';
</style>
