<template>
    <view class="orderGoodItem">
        <!-- <view class="item-c">
    <view class="view" wx:for="{{goodsList}}" wx:key="ind">
      <view class="pic">
        <image src="{{item.goods.image}}" mode="widthFix" />
      </view>
      <view class="text-box">
        <view class="text-title">{{item.goods.name}}</view>
        <view class="text-box-c">
          <view class="price">￥{{item.goods.price}}</view>
          <view class="amount">x{{item.quantity}}</view>
        </view>
      </view>
    </view>
  </view> -->
        <view class="item-c">
            <view class="show">
                <view class="view" v-if="ind <= 1" v-for="(item, ind) in goodsList" :key="ind">
                    <view class="pic">
                        <image :src="item.goods.image" mode="widthFix" />
                    </view>

                    <view class="text-box">
                        <view class="text-title">
                            {{ item.goods.name }}/
                            <text>{{ item.goods.unit }}</text>
                        </view>
                        <view class="text-box-c">
                            <view class="price">￥{{ item.goods.price }}</view>
                            <view class="amount">x{{ item.quantity }}</view>
                        </view>
                    </view>
                </view>
            </view>
            <view :class="'hide ' + (isShowAll ? 'active' : '')">
                <view class="view" v-if="ind > 1" v-for="(item, ind) in goodsList" :key="ind">
                    <view class="pic">
                        <image :src="item.goods.image" mode="widthFix" />
                    </view>

                    <view class="text-box">
                        <view class="text-title">{{ item.goods.name }}</view>
                        <view class="text-box-c">
                            <view class="price">￥{{ item.goods.price }}</view>
                            <view class="amount">x{{ item.quantity }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view :class="'showAll ' + (isShowAll ? 'active' : '')" @tap.stop.prevent="showAll">
            <block v-if="isShowAll">
                <view class="text">收起</view>
            </block>
            <block v-else>
                <view class="text">查看全部商品</view>
            </block>
            <text class="iconfont icon-xia"></text>
        </view>
    </view>
</template>

<script>
// component/orderGoodItem/orderGoodItem.js
export default {
    data() {
        return {
            isShowAll: false,
            ind: 0
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        goodsList: {
            type: Array,
            default: () => []
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        showAll() {
            this.setData({
                isShowAll: !this.isShowAll
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './orderGoodItem.css';
</style>
