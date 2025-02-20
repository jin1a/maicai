<template>
    <!-- <view class="cartControl {{defaultActive ? 'default':''}}">
  <view class="cart-decrease {{number>=2 ?'':'disable'}}" catchtap="decreaseCart">
    <text class="iconfont icon-jian_sekuai"></text>
  </view>
  <input  class="cart-count"  type="text" value="{{number}}"/>
  <view class="cart-add" catchtap="addCart">
    <text class="iconfont icon-jia_sekuai"></text>
  </view>
</view> -->
    <view class="cartControlContainer">		
        <view class="ani-icon" v-if="showBall" :style="'left:' + shoppCartX + 'px;top: ' + shoppCartY + 'px;'"></view>
        <!-- <view class="ani-icon"  hidden="{{ballDisplay}}"  style="top:{{ballTop}};left:{{ballLeft}}"></view> -->
        <!-- defaultActiveClone || numberClone < 1 -->
		<block v-if=" numberClone < 1">
            <block v-if="skuType == 2">
                <view class="addBtn2" @tap.stop.prevent="toggleContent">
                    <text v-if="!showContent">选规格</text>
                    <text v-else-if="">收起</text>
                </view>
            </block>
            <block v-else>
                <view class="addBtn" @tap.stop.prevent="addCart" :style="'color: ' + color + ';background-color: ' + bordrColor + ';'">
                    <text class="iconfont icon-jia_sekuai"></text>
                </view>
            </block>
        </block>
        <block v-else>
            <view class="cartControl" :style="'border-color: ' + bordrColor + ';'">
                <view :class="'cart-decrease ' + (numberClone >= 2 ? '' : 'disable')" @tap.stop.prevent="decreaseCart" :style="'color: ' + color + ';'">
                    <text class="iconfont icon-jian_sekuai"></text>
                </view>
                <input class="cart-count" @blur="inputBlur" type="number" v-model="numberClone" @input="inputChange" :style="'border-color: ' + bordrColor + ';'" />
                <view class="cart-add" @tap.stop.prevent="addCart" :style="'color: ' + color + ';'">
                    <text class="iconfont icon-jia_sekuai"></text>
                </view>
            </view>
        </block>
    </view>
</template>

<script>
// components/cartControl/cartControl.js
const { addCartApi } = require('../../api/index');
const app = getApp();
export default {
    data() {
        return {
            showBall: false,

            //控制球体显示
            animationEnd: true,

            shoppCartY: '',
            shoppCartX: '',
            defaultActiveClone: false,
            numberClone: 0
        };
    },

    /**
     * 组件的属性列表
     */
    props: {
        defaultActive: {
            type: Boolean,
            default: true
        },
        number: {
            type: Number,
            default: 0
        },
        color: {
            type: String,
            default: ''
        },
        bordrColor: {
            type: String,
            default: ''
        },
        skuType: {
            type: Number,
            default: 1
        },
        showContent: {
            type: Boolean,
            default: false
        },
        skuId: {
            type: null,
            default: ''
        }
    },

    watch: {
        number: function (number) {
            if (number > 0) {
                this.setData({
                    defaultActiveClone: false
                });
            }
        },

        defaultActive: {
            handler: function (newVal, oldVal) {
                this.defaultActiveClone = newVal;
            },

            immediate: true
        },

        number: {
            handler: function (newVal, oldVal) {
                this.numberClone = newVal;
            },

            immediate: true
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        addCart: function (e) {
            let that = this;
            let num = this.numberClone + 1;
            this.addCartApi('inc', num, function (res) {
                if (that.defaultActive) {
                    that.setData({
                        defaultActiveClone: false
                    });
                }
                that.setData({
                    numberClone: num
                });
                that.$emit('editNum', {
                    detail: {
                        num: num,
                        t: 1,
                        id: that.skuId
                    }
                });
                if (that.animationEnd) {
                    that.setData({
                        showBall: true,
                        animationEnd: false,
                        shoppCartY: e.touches[0].clientY,
                        shoppCartX: e.touches[0].clientX
                    });
                    setTimeout(function () {
                        that.setData({
                            shoppCartY: app.globalData.shoppCartY,
                            shoppCartX: app.globalData.shoppCartX
                        });
                    }, 27);
                    setTimeout(function () {
                        that.setData({
                            animationEnd: true,
                            showBall: 0,
                            shoppCartY: '',
                            shoppCartX: ''
                        });
                    }, 627);
                }
            });
        },
        toggleContent: function () {
            this.$emit('toggleContent');
        },
        decreaseCart: function () {
            if (this.numberClone >= 1) {
                let num = this.numberClone - 1;
                let that = this;
                that.addCartApi('dec', num, function (res) {
                    that.setData({
                        numberClone: num
                    });
                    that.$emit('editNum', {
                        detail: {
                            num: num,
                            t: 0,
                            id: that.skuId
                        }
                    });
                    if (num == 0) {
                        that.setData({
                            defaultActiveClone: true
                        });
                    }
                });
            }
        },
        addCartApi: function (type, number, callback) {
            addCartApi
                .apiName({
                    type: type,
                    number: number,
                    skuId: this.skuId
                })
                .then((res) => {
                    callback(res);
                })
                .catch((err) => {});
        },
        inputChange: function (event) {
            let number = event.detail.value;
            number = number == '' || number == null ? null : parseInt(number);
            if (this.number == number || number == null || number < 1) {
                return false;
            }
            if (number > 999) {
                uni.showToast({
                    title: '数量不能超999',
                    icon: 'none',
                    duration: 2000
                });
                return false;
            }
            let that = this;
            that.addCartApi('num', number, function (res) {
                that.setData({
                    numberClone: number
                });
                that.$emit('editNum', {
                    detail: {
                        num: number,
                        t: 3,
                        id: that.skuId
                    }
                });
            });
        },
        inputBlur(e) {
            if (e.detail.value == '' || e.detail.value < 1) {
                let that = this;
                that.addCartApi('num', 0, function (res) {
                    that.setData({
                        numberClone: 0
                    });
                    that.$emit('editNum', {
                        detail: {
                            num: 0,
                            t: 3,
                            id: that.skuId
                        }
                    });
                });
                this.setData({
                    defaultActiveClone: true
                });
            }
        }
    },

    created: function () {}
};
</script>
<style>
@import './cartControl.css';
</style>
