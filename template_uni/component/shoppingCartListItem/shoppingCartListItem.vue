<template>
    <view
        :class="'shoppingCartListItem  ' + (currentIdClone == itemId ? 'touch-move-active' : '')"
        :data-id="itemId"
        direction="horizontal"
        :inertia="true"
        :out-of-bounds="true"
        damping="100"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @longpress="deleteFun"
    >
        <view class="shoppingCartListItemContainer">
            <label class="radio">
                <radio value="r1" @tap="checkedFun" :data-id="itemId" :checked="checked" />
            </label>
            <view class="pic">
                <image :src="imageUrl" mode="" />
            </view>
            <view class="text-box">
                <view class="goodName">{{ title }}</view>
                <view class="text-box-c">
                    <view class="price">
                        <text>￥{{ price }}</text>
                        /{{ unit }}
                    </view>
                    <view class="cartBtn">
                        <cartControl @editNum="editNum" :skuId="skuId" :number="number" color="rgba(54, 54, 54, 1)" bordrColor="rgba(220, 220, 220, 1)"></cartControl>
                    </view>
                </view>
            </view>
        </view>
        <view class="delete" @tap="deleteFun" :data-id="itemId">
            <text class="iconfont icon-shanchu"></text>
            <text>删除</text>
        </view>
    </view>
</template>

<script>
import cartControl from '../cartControl/cartControl';
// component/shoppingCartListItem/shoppingCartListItem.js
export default {
    components: {
        cartControl
    },
    data() {
        return {
            startX: '',
            priceClone: '',
            currentIdClone: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        number: {
            type: Number,
            default: 0
        },
        imageUrl: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        price: {
            type: Number,
            default: 0
        },
        itemId: {
            type: Number,
            default: 0
        },
        skuId: {
            type: Number,
            default: 0
        },
        currentId: {
            type: Number,
            default: '-1'
        },
        checked: {
            type: Boolean,
            default: false
        },
        unit: {
            type: String,
            default: ''
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        checkedFun(e) {
            let id = e.currentTarget.dataset.id;
            this.$emit('checked', {
                detail: {
                    id,
                    check: !this.checked
                }
            });
        },
        touchstart(e) {
            this.setData({
                startX: e.changedTouches[0].clientX,
                currentIdClone: -1
            });
        },
        //滑动事件处理
        touchmove: function (e) {
            var currentId = '';
            var index = e.currentTarget.dataset.id; //当前索引
            var startX = this.startX; //开始X坐标
            var touchMoveX = e.changedTouches[0].clientX; //滑动变化坐标
            var delIndex = this.delIndex;
            if (touchMoveX > startX) {
                //右滑
                currentId = -1;
            } else {
                //左滑
                currentId = index;
            }
            this.$emit('updateCurrentId', {
                detail: currentId
            });
            // this.setData({
            //   currentId
            // })
        },

        deleteFun(e) {
            this.$emit('deleteItem', {
                detail: e.currentTarget.dataset.id
            });
        },
        editNum(e) {
            this.$emit('editNum', {
                detail: {
                    num: e.detail.num,
                    t: e.detail.t,
                    id: e.detail.id
                }
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
@import './shoppingCartListItem.css';
</style>
