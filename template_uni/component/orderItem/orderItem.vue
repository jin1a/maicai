<template>
    <view class="orderItem">
        <!-- <navigator url="/pages/userPages/orderDetails/orderDetails?currentId={{currentId}}&orderId={{orderInfo.id}}" hover-class="none"> -->
        <view class="item-t">
            <block v-if="currentId == 2">
                <view class="item-t-l">
                    {{ orderInfo.created_at }}
                    <view class="des">{{ orderInfo.order_id }}</view>
                </view>
                <view class="item-t-r">
                    <view class="title">商品已送达</view>
                    <view class="des" v-if="orderInfo.delivery_mark !== null">{{ orderInfo.delivery_mark }}</view>
                </view>
            </block>
            <block v-if="currentId == 3">
                <view class="item-t-l">
                    {{ orderInfo.created_at }}
                    <view class="des">{{ orderInfo.order_id }}</view>
                </view>

                <view class="item-t-r">
                    <view class="title">待付款</view>
                    <view class="des">等待买家付款</view>
                </view>
            </block>
            <block v-if="currentId == 0">
                <view class="item-t-l">
                    {{ orderInfo.created_at }}
                    <view class="des">{{ orderInfo.order_id }}</view>
                </view>
                <view class="item-t-r">
                    <view class="title">待发货</view>
                    <view class="des">商品正在打包中</view>
                </view>
            </block>
            <block v-if="currentId == 1">
                <view class="item-t-l">
                    {{ orderInfo.created_at }}
                    <view class="des">{{ orderInfo.order_id }}</view>
                </view>
                <view class="item-t-r">
                    <view class="title">待收货</view>
                    <view class="des">商品派送中</view>
                </view>
            </block>
        </view>
        <orderGoodItem :goodsList="orderInfo.detail"></orderGoodItem>
        <view class="item-b">			
            <view class="total">共{{ orderInfo.total }}件 实付：￥{{ orderInfo.total_price }}</view>
            <orderBtnBar
                :currId="currId"
                @orderTake="orderTake"
                @delOrder="delOrder"
                @cancelOrder2="cancelOrder2"
                :time="orderInfo.time"
                :orderId="orderInfo.order_id"
                :orderKey="orderInfo.order_id"
                :addressId="orderInfo.address_id"
                :price="orderInfo.total_price"
                :currentId="orderInfo.status"
            ></orderBtnBar>
        </view>
        <!-- </navigator> -->
    </view>
</template>

<script>
import orderBtnBar from '../../component/orderBtnBar/orderBtnBar';
import orderGoodItem from '../../component/orderGoodItem/orderGoodItem';
// component/orderItem/orderItem.js
export default {
    components: {
        orderBtnBar,
        orderGoodItem
    },
    data() {
        return {
            showMore: false
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        currentId: {
            type: Number,
            default: 0
        },
        currId: {
            type: String,
            default: 0
        },
        orderInfo: {
            type: Object,
            default: () => ({})
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        toggleMore(e) {
            this.setData({
                showMore: !this.showMore
            });
        },
        cancelOrder2(e) {
            this.$emit('cancelOrder2', {
                detail: {
                    type: e.detail.type,
                    orderId: e.detail.orderId
                }
            });
        },
        orderTake(e) {
            this.$emit('orderTake', {
                detail: {
                    type: e.detail.type,
                    orderId: e.detail.orderId,
                    orderKey: e.detail.orderKey
                }
            });
        },
        delOrder(e) {
            this.$emit('delOrder', {
                detail: {
                    type: e.detail.type,
                    orderId: e.detail.orderId
                }
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './orderItem.css';
</style>
