<template>
    <view :class="'bargainGoods ' + (elderMode ? 'elder-mode' : '')">
        <navigator :url="false" hover-class="none">
            <view class="pic">
                <image :src="imageSrc" mode="widthFix" />
            </view>
            <view class="text-box">
                <view class="text-title">
                    <text class="label">{{ label }}</text>
                    {{ title }}
                </view>
                <view class="amount">库存：{{ amount }}</view>
                <view class="text-box-b">
                    <view class="price">
                        <text class="new-price">
                            ￥
                            <text>{{ newPriceInteger }}</text>
                            .{{ newPriceDecimals }}
                        </text>
                        <text class="unit">/{{ unit }}</text>
                        <text class="old-price">￥{{ oldPrice }}</text>
                    </view>
                    <view class="cartControlBtn">
                        <cartControl @toggleContent="toggleContent" :skuType="skuType" :skuId="skuList[0].id" :showContent="showContent"></cartControl>
                    </view>
                </view>
            </view>
        </navigator>
        <view class="addLists" v-if="skuType == 2 && showContent">
            <view class="list" v-for="(item, index) in skuList" :key="index">
                <view class="price">
                    <text class="currentPrice">￥{{ item.sku_price }}</text>
                    /{{ item.sku_name }}
                </view>

                <cartControl @toggleContent="toggleContent" :skuId="item.id" :showContent="showContent"></cartControl>
            </view>
        </view>
    </view>
</template>

<script>
import cartControl from '../cartControl/cartControl';
// component/bargainGoods/bargainGoods.js
export default {
    components: {
        cartControl
    },
    data() {
        return {
            showContent: false,
            elderMode: uni.getStorageSync('elderMode') || false,
            id: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        amount: {
            type: Number,
            default: 0
        },
        newPriceInteger: {
            type: Number,
            default: 0
        },
        newPriceDecimals: {
            type: String,
            default: ''
        },
        oldPrice: {
            type: Number,
            default: 0
        },
        imageSrc: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: ''
        },
        goodsId: {
            type: String,
            default: ''
        },
        unit: {
            type: String,
            default: ''
        },
        skuType: {
            type: Number,
            default: 1
        },
        skuList: {
            type: Array,
            default: () => []
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        toggleContent(e) {
            this.setData({
                showContent: !this.showContent
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './bargainGoods.css';
</style>
