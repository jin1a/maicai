<template>
    <view class="main">
        <swiper :autoplay="true" interval="5000" duration="500" :circular="true">
            <swiper-item v-for="(item, index) in banner" :key="index">
                <image :src="item" mode="widthFix" />
            </swiper-item>
        </swiper>
    </view>
</template>

<script>

// index.js
const { homeApi, warehouseListApi } = require('../../api/index');
const app = getApp();
export default {
    components: {
       
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
        this.home();
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
@import './carousel.css';
</style>
