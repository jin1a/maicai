<template>
    <view class="deleteModal active">
        <view class="shadow"></view>
        <view class="deleteModalContainer">
            <view class="title">
                {{ title }}
            </view>
            <view class="btns">
                <view class="btn cancelBtn" @tap="close">
                    {{ cancelTetx }}
                </view>
                <view class="btn submitBtn" @tap="deleteFun">
                    {{ deleteText }}
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// components/coupon/coupon.js
export default {
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        title: {
            type: String,
            default: '确定要删除该商品吗?'
        },
        cancelTetx: {
            type: String,
            default: ' 再想想'
        },
        deleteText: {
            type: String,
            default: ' 删除'
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        deleteFun() {
            this.$emit('delete');
        },
        close() {
            this.$emit('cancelClose');
        }
    },
    created: function () {}
};
</script>
<style>
@import './deleteModal.css';
</style>
