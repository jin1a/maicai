<template>
    <view :class="'leftNav ' + (elderMode ? 'elder-mode' : '')">
        <scroll-view :scroll-y="true">
            <block v-for="(item, index) in goodsTypeList" :key="index">
                <view @tap="switchGoodsType" :class="'item ' + (goodsTypeListId == item.id ? 'active' : '')" :data-id="item.id">{{ item.cate_name }}</view>
            </block>
        </scroll-view>
    </view>
</template>

<script>
// component/leftNav/leftNav.js
export default {
    data() {
        return {
            elderMode: uni.getStorageSync('elderMode') || false
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        goodsTypeList: {
            type: Array,
            default: () => []
        },
        goodsTypeListId: {
            type: Number,
            default: 0
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        switchGoodsType(e) {
            let id = e.currentTarget.dataset.id;
            this.$emit('switchGoodsType', {
                detail: id
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './leftNav.css';
</style>
