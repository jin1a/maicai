<template>
    <view :class="'categoryCartModal ' + (isShow ? 'active' : '')">
        <view class="shadow" @tap="close"></view>
        <view class="categoryCartBox">
            <view class="categoryCartBox-t">
                <view class="close" @tap="delAllCart">
                    <text class="iconfont icon-shanchu2"></text>
                    <text>清空购物车</text>
                </view>
            </view>
            <view class="categoryCartBox-c">
                <view class="list">
                    <block v-for="(item, index) in shoppingCartList" :key="index">
                        <view class="item" :data-id="item.id">
                            <view class="pic">
                                <image :src="item.image" mode="" />
                            </view>
                            <view class="text-box">
                                <view class="goodName">{{ item.name }}</view>
                                <view class="text-box-c">
                                    <view class="price">
                                        <text>￥{{ item.price }}</text>
                                        /{{ item.unit }}
                                    </view>
                                    <view class="cartBtn">
                                        <cartControl
                                            @editNum="editNum"
                                            :skuId="item.sku_id"
                                            :number="item.quantity"
                                            color="rgba(54, 54, 54, 1)"
                                            bordrColor="rgba(220, 220, 220, 1)"
                                        ></cartControl>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </block>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import shoppingCartListItem from '../../component/shoppingCartListItem/shoppingCartListItem';
import cartControl from '../../component/cartControl/cartControl';
// component/categoryCartModal/categoryCartModal.js
export default {
    components: {
        shoppingCartListItem,
        cartControl
    },
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        shoppingCartList: {
            type: Array,
            default: () => []
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        close() {
            this.$emit('close');
        },
        delAllCart() {
            this.$emit('delAllCart');
        },
        editNum() {
            this.$emit('editNum');
        }
    },
    created: function () {}
};
</script>
<style>
@import './categoryCartModal.css';
</style>
