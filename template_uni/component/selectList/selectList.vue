<template>
    <view class="selectList">
        <view class="list">
            <block v-for="(item, index) in list" :key="index">
                <view class="item" :data-flag="flag" :data-obj="changeObj" :data-id="item.id" :data-value="item.detail" @tap="selected">{{ item.detail }}</view>
            </block>
        </view>
    </view>
</template>

<script>
// component/selectList/selectList.js
export default {
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        list: {
            type: Array,
            default: () => []
        },
        changeObj: {
            type: String,
            default: ''
        },
        flag: {
            type: String,
            default: ''
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        selected(e) {
            // console.log(e.currentTarget.dataset.obj)
            // console.log(e.currentTarget.dataset.value)
            this.$emit('selected', {
                detail: {
                    id: e.currentTarget.dataset.id,
                    obj: e.currentTarget.dataset.obj,
                    value: e.currentTarget.dataset.value,
                    flag: e.currentTarget.dataset.flag
                }
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './selectList.css';
</style>
