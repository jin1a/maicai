<template>
    <view class="recommendGoods">
        <navigator :url="url" hover-class="none">
            <view class="pic">
                <image :src="imageSrc" mode="widthFix" />
            </view>
            <view class="text-box">
                <!-- <view class="name">{{goodName}}</view> -->
                <view class="price">
                    <!-- <text class="new-price"><text>{{newPrice}}</text></text> -->
                    <!-- <text class="new-price">限时价:<text>￥{{newPrice}}</text>元</text><text class="old-price">{{oldPrice}}</text> -->
                </view>
            </view>
        </navigator>
    </view>
</template>

<script>
// component/recommendGoods/recommendGoods.js
export default {
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        url: {
            type: String,
            default: ''
        },
        imageSrc: {
            type: String,
            default: ''
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {},
    created: function () {}
};
</script>
<style>
@import './recommendGoods.css';
</style>
