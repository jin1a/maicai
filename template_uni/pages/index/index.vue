<template>
    <view class="main">
        <customHeaderIndex @change="change" :scrollTop="scrollTop" :list="warehouseList"></customHeaderIndex>
        <view class="banner">
            <swiper :autoplay="true" interval="5000" duration="500" :circular="true">
                <swiper-item v-for="(item, index) in banner" :key="index">
                    <image :src="item" mode="widthFix" />
                </swiper-item>
            </swiper>
        </view>
        <view class="box1">
            <view class="content">
                <categoryListRow pageSign="index" :lists="typeList"></categoryListRow>
            </view>
        </view>
        <!-- <view class="box2">
    <view class="content">
      <view class="icon">
      <image src="http://img.jxcyj.cn/images/info-icon.png" mode="widthFix"/>
    </view>
    <view class="text">活动头条</view>
    <view class="swiper">
      <swiper   vertical ="true" autoplay='true' interval='5000' duration='300'>
        <swiper-item  wx:for="{{hotActivity}}" wx:key="id">
          <navigator class="text-title" url="" hover-class="none">{{item}}</navigator>
        </swiper-item>
      </swiper>
    </view>
    </view>
  </view>
  <view class="box3">
    <view class="content">
      <div class="item">
        <recommendGoods url="" imageSrc="http://img.jxcyj.cn/images/index-box2-1.png"></recommendGoods>
      </div>
    </view>
  </view> -->
        <!-- <view class="box4">
    <view class="content">
      <view class="list">
        <view class="item">
          <navigator url="/pages/cookVideo/cookVideo"  hover-class="none">
            <image src="http://img.jxcyj.cn/images/index-box3-1.png" mode="widthFix"/>
            <view class="text-box">
              <view class="text-title">走进菜亿家</view>
              <view class="text-des">
                <view>菜亿家最近</view>
                <view>发展动向</view>
              </view>
            </view>
          </navigator>
        </view>
        <view class="item">
          <navigator url="/pages/protocol/protocol"  hover-class="none">
            <image src="http://img.jxcyj.cn/images/index-box3-2.png" mode="widthFix"/>
            <view class="text-box">
              <view class="text-title">廉洁协议 </view>
              <view class="text-des">
                <view>价格透明</view>
                <view>拒绝回扣</view>
              </view>
            </view>
          </navigator>
        </view>
        <view class="item">
          <navigator url="/pages/nearbyBusiness/nearbyBusiness"  hover-class="none">
            <image src="http://img.jxcyj.cn/images/index-box3-3.png" mode="widthFix"/>
            <view class="text-box">
              <view class="text-title">谁在用菜亿家</view>
              <view class="text-des">
                <view>查看附近企业</view>
              </view>
            </view>
          </navigator>
        </view>
        <view class="item">
          <navigator url="/pages/recruit/recruit"  hover-class="none">
            <image src="http://img.jxcyj.cn/images/index-box3-4.png" mode="widthFix"/>
            <view class="text-box">
              <view class="text-title">招聘求职</view>
              <view class="text-des">
                <view>工厂招聘求职</view>
              </view>
            </view>
          </navigator>
        </view>
      </view>
    </view>
  </view> -->
        <view class="box5">
            <indexColumnTitle title="特价专区" des="（与正价同品质）" url="/pages/category/category"></indexColumnTitle>
            <view class="box-c">
                <view class="item" v-for="(item, index) in goodsList" :key="index">
                    <bargainGoods
                        :goodsId="item.id"
                        :amount="item.stock"
                        url=""
                        :newPriceInteger="item.priceInt"
                        :newPriceDecimals="item.priceDec"
                        :oldPrice="item.cost"
                        :imageSrc="item.image"
                        :label="item.is_fresh"
                        :title="item.name"
                        :unit="item.unit"
                        :skuType="item.sku_type"
                        :skuList="item.skuList"
                    ></bargainGoods>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import customHeaderIndex from '../../component/custom-header-index/custom-header-index';
import indexColumnTitle from '../../component/indexColumnTitle/indexColumnTitle';
import bargainGoods from '../../component/bargainGoods/bargainGoods';
import categoryListRow from '../../component/categoryListRow/categoryListRow';
// index.js
const { homeApi, warehouseListApi } = require('../../api/index');
const app = getApp();
export default {
    components: {
        customHeaderIndex,
        indexColumnTitle,
        bargainGoods,
        categoryListRow
    },
    data() {
        return {
            scrollTop: 0,
            hasUserInfo: false,
            typeList: [],
            banner: [],
            hotActivity: [],
            goodsList: [],
            warehouseList: [],
            selected: 0
        };
    },
    onLoad() {},
    onShow() {
        if (this.getTabBar && typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 0
            });
            this.home();
            this.warehouseListFun();
        }
    },
    onPageScroll(e) {
        this.setData({
            scrollTop: e.scrollTop
        });
    },
    onShareAppMessage() {},
    onShareTimeline: function () {},
    methods: {
        warehouseListFun() {
            let that = this;
            warehouseListApi.apiName().then((res) => {
                that.setData({
                    warehouseList: res.data
                });
            });
        },

        home() {
            let that = this;
            homeApi
                .apiName()
                .then((res) => {
                    res = res.data;
                    that.setData({
                        banner: res.banner,
                        hotActivity: res.hot_activity,
                        typeList: res.category,
                        goodsList: res.goods_list
                    });
                })
                .catch((err) => {});
        },

        change() {
            this.home();
        }
    }
};
</script>
<style>
@import './index.css';
</style>
