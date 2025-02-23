<template>
    <view style="height: 90rpx;">
        <view class="shoppingCartBar">
            <view class="shoppingCartBar-l" @tap="showCategoryCartModal">
                <view class="icon">
                    <text class="iconfont icon-002gouwuche-1"></text>
                </view>
                <view class="text-box">
                    <view class="price">
                        ￥
                        <text>{{ priceClone }}</text>
                    </view>
                    <view class="des">超时服务费{{ service_price }}元，服务费0元</view>
                </view>
            </view>
            <navigator url="/pages/shoppingCart/shoppingCart" hover-class="none" class="shoppingCartBar-r" @tap="confirmOrder">确认下单</navigator>
            <!-- 不可点击状态 -->
            <!-- <navigator url="" hover-class="none" class="shoppingCartBar-r disable">确认下单</navigator> -->
        </view>
        <categoryCartModal @editNum="editNum" :isShow="isShowShoppingCartBar" :shoppingCartList="cartListClone" @close="close" @delAllCart="delAllCart"></categoryCartModal>
    </view>
</template>

<script>
import categoryCartModal from '../../component/categoryCartModal/categoryCartModal';
// component/shoppingCartBar/shoppingCartBar.js
const { delCartApi, getCartApi } = require('../../api/index');
const app = getApp();
export default {
    components: {
        categoryCartModal
    },
    data() {
        return {
            isShowShoppingCartBar: false,
            service_price: 0,
            cartListClone: '',
            priceClone: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        price: {
            type: String,
            default: ''
        },
        cartList: {
            type: Array,
            default: () => []
        }
    },
    mounted() {
        // 处理小程序 attached 生命周期
        this.attached();
    },
    /**
     * 组件的方法列表
     */
    methods: {
        attached: function () {
            // 获取当前时间的小时数和分钟数，并转换成分钟数
            var now = new Date();
            var currentTime = now.getHours() * 60 + now.getMinutes();
            // 晚上8点30分的分钟数
            var targetTime = 1230;
            // 判断当前时间是否晚于晚上8点30分
            if (currentTime >= targetTime) {
                this.setData({
                    service_price: 30
                });
            }
        },

        showCategoryCartModal() {
            this.setData({
                isShowShoppingCartBar: !this.isShowShoppingCartBar
            });
        },

        close() {
            this.setData({
                isShowShoppingCartBar: false
            });
        },

        editNum(e) {
            this.getCartList();
        },

        confirmOrder() {
            uni.switchTab({
                url: '/pages/shoppingCart/shoppingCart'
            });
        },

        delAllCart() {
            let that = this;
            uni.showModal({
                title: '警告',
                content: '确定要清空购物车吗？',
                success(res) {
                    if (res.confirm) {
                        delCartApi
                            .apiName({
                                cartId: 0
                            })
                            .then((res) => {
                                that.setData({
                                    isShowShoppingCartBar: false
                                });
                                that.getCartList();
                            })
                            .catch((err) => {});
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                        // 用户点击取消后执行相应的操作
                    }
                }
            });
        },

        getCartList() {
            let that = this;
            getCartApi
                .apiName()
                .then((res) => {
                    var total = res.data
                        .reduce(function (sum, product) {
                            return sum + product.price * product.quantity;
                        }, 0)
                        .toFixed(2);
                    that.setData({
                        cartListClone: res.data,
                        priceClone: total
                    });
                })
                .catch((err) => {});
        }
    },
    created: function () {},
    watch: {
        cartList: {
            handler: function (newVal, oldVal) {
                this.cartListClone = newVal;
            },

            immediate: true,
            deep: true
        },

        price: {
            handler: function (newVal, oldVal) {
                this.priceClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './shoppingCartBar.css';
</style>
