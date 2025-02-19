<template>
    <view class="orderAddressMsg">
        <block v-if="currentId == 0">
            <view class="item">
                <view class="item-l">收货地址</view>
                <view class="item-r">
                    {{ address }}
                    <br />
                    {{ phone }}
                </view>
            </view>
            <view class="item">
                <view class="item-l">配送时间</view>
                <view class="item-r">2023-12-25 09:42</view>
            </view>
            <view class="item">
                <view class="item-l">配送骑手</view>
                <view class="item-r">李*胜</view>
            </view>
        </block>
        <block v-else-if="">
            <navigator class="list" :url="is_admin == 1 ? '/pages/address/address?resetAddress=0&orderId=' + orderId + '&addressId=' + addressId : 'false'">
                <view>
                    <view class="item">
                        <view class="item-l">收货地址</view>
                        <view class="item-r">{{ address }}</view>
                    </view>
                    <view class="item">
                        <view class="item-l">收货人</view>
                        <view class="item-r">{{ realName }} {{ phone }}</view>
                    </view>
                </view>
                <view>
                    <view class="iconfont icon-right-1-copy"></view>
                </view>
            </navigator>
        </block>
    </view>
</template>

<script>
// component/orderAddressMsg/orderAddressMsg.js
export default {
    data() {
        return {
            is_admin: uni.getStorageSync('userInfo').is_admin ?? 0
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        currentId: {
            type: Number,
            default: 6
        },
        phone: {
            type: Number,
            default: 0
        },
        address: {
            type: String,
            default: ''
        },
        realName: {
            type: String,
            default: ''
        },
        orderId: {
            type: Number,
            default: 0
        },
        addressId: {
            type: Number,
            default: 0
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
@import './orderAddressMsg.css';
</style>
