<template>
    <view :class="elderMode ? 'elder-mode' : ''">
        <block v-if="pageSign == 'index'">
            <view class="list">
                <block v-for="(item, index) in lists" :key="index">
                    <navigator :url="false" @tap="switchPage" hover-class="none" class="item" :data-id="item.id">
                        <view class="pic">
                            <image :src="item.pic" mode="widthFix" />
                        </view>
                        <view class="text">{{ item.cate_name }}</view>
                    </navigator>
                </block>
            </view>
        </block>

        <block v-else>
            <view class="list list1">
                <block v-for="(item, index) in lists" :key="index">
                    <view @tap="switchFun" :class="'item ' + (currentIdClone == item.key ? 'active' : '')" :data-id="item.key">
                        <view class="pic">
                            <image :src="item.pic" mode="widthFix" />
                        </view>
                        <view class="text">{{ item.cate_name }}</view>
                    </view>
                </block>
            </view>
        </block>
    </view>
</template>

<script>
// component/categoryListRow/categoryListRow.js
export default {
    data() {
        return {
            elderMode: uni.getStorageSync('elderMode') || false,
            currentIdClone: ''
        };
    },
    options: {
        styleIsolation: '隔离选项'
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
        pageSign: {
            type: String,
            default: ''
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        switchPage(e) {
            let currentId = e.currentTarget.dataset.id;
            uni.setStorage({
                key: 'currentId',
                data: {
                    currentId: currentId,
                    type: 1
                },
                success: () => {
                    uni.switchTab({
                        url: '/pages/category/category'
                    });
                }
            });
        },
        switchFun(e) {
            var id = e.currentTarget.dataset.id;
            this.setData({
                currentIdClone: id
            });
            // console.log(e.currentTarget.dataset.id)
            this.$emit('switch', {
                detail: id
            });
        }
    },
    created: function () {},
    watch: {
        currentId: {
            handler: function (newVal, oldVal) {
                this.currentIdClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './categoryListRow.css';
</style>
