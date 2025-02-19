<template>
    <view :class="'categoryListColumn ' + (elderMode ? 'elder-mode' : '')">
        <view class="categoryListColumn-l">
            <swiper
                :class="'list ' + (!showListRowBtn ? 'cookList' : '')"
                :style="'width: ' + slidesPerView * 20 + '%'"
                :display-multiple-items="slidesPerView"
                next-margin="0rpx"
                :current="currentNumber"
            >
                <block v-for="(item, index) in lists" :key="index">
                    <swiper-item @tap="switchFun" :class="'item ' + (currentIdClone == item.key ? 'active' : '')" :data-id="item.key">
                        <view class="pic">
                            <image :src="item.pic" mode="widthFix" />
                        </view>
                        <view class="text">{{ item.cate_name }}</view>
                    </swiper-item>
                </block>
            </swiper>
        </view>
        <block v-if="showListRowBtn">
            <view class="showListRowBtn" @tap="showListRow">
                <view>全</view>
                <view>部</view>
                <view class="iconfont icon-paixu2"></view>
            </view>
        </block>
    </view>
</template>

<script>
// component/categoryListColumn/categoryListColumn.js
export default {
    data() {
        return {
            currentNumber: 0,
            elderMode: uni.getStorageSync('elderMode') || false,
            slidesPerView: '',
            currentIdClone: 0
        };
    },

    /**
     * 组件的属性列表
     */
    props: {
        lists: {
            type: Array,
            default: () => []
        },
        currentId: {
            type: Number,
            default: 0
        },
        showListRowBtn: {
            type: Boolean,
            default: false
        }
    },

    watch: {
        lists: function (lists) {
            let length = lists.length;
            let slidesPerView = length <= 5 ? length : 5;
            this.setData({
                slidesPerView
            });
        },

        currentId: function (currentId) {
            let lists = this.lists;
            let slidesPerView = this.slidesPerView;
            let currentNumber = lists.length - currentId - slidesPerView >= 0 ? currentId : lists.length - slidesPerView;
            this.setData({
                currentNumber
            });
        },

        currentId: {
            handler: function (newVal, oldVal) {
                this.currentIdClone = newVal;
            },

            immediate: true
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        switchFun(e) {
            let id = e.currentTarget.dataset.id;
            let lists = this.lists;
            let slidesPerView = this.slidesPerView;
            let currentNumber = lists.length - id - slidesPerView >= 0 ? id : lists.length - slidesPerView;
            // let item = lists.find(obj  => obj.key == id)
            // wx.setStorage({
            //   key: 'currentId',
            //   data: {currentId:item.id, type:0},
            // });
            this.setData({
                currentIdClone: id,
                currentNumber
            });
            // console.log(e.currentTarget.dataset.id)
            this.$emit('switch', {
                detail: id
            });
        },
        showListRow(e) {
            this.$emit('showListRow', {
                detail: true
            });
        }
    },

    created: function () {}
};
</script>
<style>
@import './categoryListColumn.css';
</style>
