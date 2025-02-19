<template>
    <view :class="'cartControl ' + (defaultActiveClone ? 'default' : '')">
        <view :class="'cart-decrease ' + (numberClone >= 2 ? '' : 'disable')" @tap.stop.prevent="decreaseCart">
            <text class="iconfont icon-jian_sekuai"></text>
        </view>
        <view class="cart-count">{{ numberClone }}</view>
        <view class="cart-add" @tap.stop.prevent="addCart">
            <text class="iconfont icon-jia_sekuai"></text>
        </view>
    </view>
</template>

<script>
// components/cartControl/cartControl.js
export default {
    data() {
        return {
            defaultActiveClone: false,
            numberClone: ''
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
            default: 1
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        addCart: function () {
            if (this.defaultActive) {
                this.setData({
                    defaultActiveClone: false
                });
            } else {
                let num = this.number + 1;
                this.setData({
                    numberClone: num
                });
                this.$emit('editNum', {
                    detail: {
                        num: num,
                        t: 1
                    }
                });
            }
        },
        decreaseCart: function () {
            if (this.number > 1) {
                let num = this.number - 1;
                this.setData({
                    numberClone: num
                });
                this.$emit('editNum', {
                    detail: {
                        num: num,
                        t: 0
                    }
                });
            } else {
                this.setData({
                    defaultActiveClone: true
                });
            }
        }
    },
    created: function () {},
    watch: {
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
    }
};
</script>
<style>
@import './cartControl1.css';
</style>
