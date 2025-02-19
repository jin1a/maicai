<template>
    <view :class="'goodItemComponent ' + (elderMode ? 'elder-mode' : '')">
        <view>
            <view class="item">
                <view class="pic">
                    <image :src="image" mode="widthFix" />
                </view>
                <view class="text-box">
                    <view class="good-name">{{ title }}</view>
                    <view class="text-box-b">
                        <view class="price">
                            <text class="currentPrice">
                                ￥
                                <text>{{ priceInteger }}</text>
                                .{{ priceDecimals }}
                            </text>
                            /{{ unit }}
                        </view>
                        <cartControl
                            @editNum="editNum"
                            @toggleContent="toggleContent"
                            :skuType="skuType"
                            :number="amount"
                            :skuId="skuList[0].id"
                            :showContent="showContent"
                        ></cartControl>
                    </view>
                </view>
            </view>
            <view class="addLists" v-if="skuType == 2 && showContent">
                <view class="list" v-for="(item, index) in skuList" :key="index">
                    <view class="price">
                        <text class="currentPrice">￥{{ item.sku_price }}</text>
                        /{{ item.sku_name }}
                    </view>

                    <cartControl
                        @editNum="editNum"
                        @toggleContent="toggleContent"
                        :goodsId="goodsId"
                        :skuId="item.id"
                        :number="item.amount"
                        :showContent="showContent"
                    ></cartControl>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import cartControl from '../cartControl/cartControl';
// component/goodItem/goodItem.js
export default {
    components: {
        cartControl
    },
    data() {
        return {
            showContent: false,
            elderMode: uni.getStorageSync('elderMode') || false,
            id: '',
            goodsId: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        options: {
            styleIsolation: '隔离选项'
        },
        title: {
            type: String,
            default: ''
        },
        priceInteger: {
            type: Number,
            default: 0
        },
        priceDecimals: {
            type: String,
            default: 0
        },
        amount: {
            type: Number,
            default: 0
        },
        image: {
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
    mounted() {
        // 处理小程序 attached 生命周期
        this.attached();
    },
    /**
     * 组件的方法列表
     */
    methods: {
        attached: function () {
            let filteredSkuList = this.skuList.filter((item) => item.amount > 0);
            if (filteredSkuList.length > 0) {
                this.setData({
                    showContent: true
                });
            }
        },

        editNum(e) {
            this.$emit('editNum');
        },

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
@import './goodItem.css';
</style>
