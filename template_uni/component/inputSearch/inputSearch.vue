<template>
    <!-- <view class="searchBox">
  <navigator url="" class="searchBox-l" hover-class="none">
    <text class="iconfont icon-sousuo"></text>
  <view class="swiper">
    <swiper  vertical ="true" autoplay='true' interval='5000' duration='300'>
      <swiper-item>零食年货真5折</swiper-item>
      <swiper-item>半价日真5折</swiper-item>
    </swiper>
  </view>
  </navigator>
  </navigator>
  <navigator class="searchBox-r" url="" hover-class="none">搜索</navigator>
</view> -->

    <view class="searchBox" :style="'background-color: ' + bgColor + ';'">
        <view class="searchBox-l">
            <text class="iconfont icon-sousuo"></text>
            <input type="text" :value="titleClone" @input="titleInput" class="search-input" :placeholder="placeholder" />
        </view>
        <view class="searchBox-r" @tap="search">搜索</view>
        <view class="searchBox-r-2" v-if="!(isOrder || isHome)" @tap="cancel">取消</view>
    </view>
</template>

<script>
// component/InputSearch/InputSearch.js
const debounce = require('../../utils/debounce.js'); // 引入防抖函数
export default {
    data() {
        return {
            isSearchClone: false,
            titleClone: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        bgColor: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        currId: {
            type: Number,
            default: 0
        },
        isSearch: {
            type: Boolean,
            default: false
        },
        isOrder: {
            type: Boolean,
            default: false
        },
        isHome: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: ''
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        titleInput: debounce(function (event) {
            let value = event.detail.value;
            this.setData({
                titleClone: value
            });
            this.search();
        }, 500),
        search: function () {
            let inputValue = this.title;
            if (!this.isOrder) {
                this.setData({
                    isSearchClone: true
                });
            }
            this.$emit('search', {
                detail: {
                    type: this.currId,
                    title: this.titleClone
                }
            });
        },
        cancel: function () {
            this.setData({
                isSearchClone: false,
                titleClone: ''
            });
            this.$emit('cancel');
        }
    },
    created: function () {},
    watch: {
        title: {
            handler: function (newVal, oldVal) {
                this.titleClone = newVal;
            },

            immediate: true
        },

        isSearch: {
            handler: function (newVal, oldVal) {
                this.isSearchClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './inputSearch.css';
</style>
