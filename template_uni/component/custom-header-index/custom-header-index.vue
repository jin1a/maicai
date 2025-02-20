<template>
    <!-- component/custom-header-index/custom-header-index.wxml -->
    <view :class="'custom-header ' + (scrollTop > 30 ? 'active' : '') + ' ' + (elderMode ? 'elder-mode' : '')" style="padding: 10px">
        <view class="custom-header-t" style="height: 30px;">
            <view class="address">
                <picker @change="bindPickerChange" :value="citiesIndex" :range="cities">
                    <view class="picker">
                        {{ cities[citiesIndex] }}
                        <text class="iconfont icon-xia"></text>
                    </view>
                </picker>
            </view>
            <view class="title">菜亿家</view>
        </view>
        <view class="custom-header-c">
            <inputSearch :title="title" :isHome="true" :isSearch="isSearch" @search="search" placeholder="搜索商品"></inputSearch>
        </view>
    </view>
</template>

<script>
import inputSearch from '../inputSearch/inputSearch';
// component/custom-header-index/custom-header-index.js
const { setDefaultAddressApi } = require('../../api/index');
const app = getApp();
// console.log(app)
export default {
    components: {
        inputSearch
    },
    data() {
        return {
            menu: app.globalData.menu,
            menuLeft: app.globalData.menuLeft,
            menuHeight: app.globalData.menuHeight,
            cities: ['赣州', '于都'],
            citiesIndex: 0,
            title: '',
            isSearch: false,
            elderMode: uni.getStorageSync('elderMode') || false
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        scrollTop: {
            type: Number,
            default: 0
        },
        list: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        list: function (list) {
            this.processList(list);
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        bindPickerChange(e) {
            let that = this;
            let ind = e.detail.value;
            setDefaultAddressApi
                .apiName({
                    addressId: this.list[ind].id
                })
                .then((res) => {
                    that.setData({
                        citiesIndex: ind
                    });
                    this.$emit('change');
                })
                .catch((err) => {});
        },
        search(e) {
            uni.setStorageSync('searchTitle', e.detail.title);
            this.setData({
                title: '',
                isSearch: false
            });
            uni.switchTab({
                url: '/pages/category/category'
            });
        },
        processList(list) {
            const warehouse = list.map((item) => item.warehouse);
            console.log(this.citiesIndex, 33);
            this.setData({
                cities: warehouse,
                citiesIndex: 0
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './custom-header-index.css';
</style>
