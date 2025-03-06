<template>
    <view class="reportForms">
        <view class="reportForms-t">
            <radio-group>
                <label>
                    <view class="label">
                        <radio :checked="isCheckAll" @tap="checkAll" />
                        <text>{{ title }}</text>
                    </view>
                </label>
            </radio-group>
            <view class="icon" @tap="showList">
                <view class="iconfont icon-xia" :style="'transform: rotate(' + (isShowList ? 180 : 0) + 'deg);'"></view>
            </view>
        </view>
        <view class="reportForms-c" v-if="isShowList">
            <view class="reportForms-c-container">
                <view class="list">
                    <block v-if="url == 'queryReport' || url == 'selectOrderInvoicing'">
                        <block v-for="(item, index) in listsClone" :key="index">
                            <view class="item">
                                <view class="item-t">
                                    <view class="item-t-l">
                                        <radio-group>
                                            <label>
                                                <view class="label">
                                                    <radio :checked="item.isCheck" @tap="checked" :data-id="item.id" />
                                                </view>
                                            </label>
                                        </radio-group>
                                        <view class="date">{{ item.date }}</view>
                                    </view>
                                    <view class="item-t-r">
                                        金额: ￥
                                        <text class="price">{{ item.price }}</text>
                                    </view>
                                </view>
                                <view class="item-c">
                                    <scroll-view :scroll-x="true">
                                        <block v-for="(items, index1) in item.images" :key="index1">
                                            <view class="good-item">
                                                <image :src="items" mode="widthFix" />
                                            </view>
                                        </block>
                                    </scroll-view>
                                </view>
                            </view>
                        </block>
                    </block>
                    <block v-else-if="url == 'billingRecord'">
                        <view class="item2" v-for="(item, index) in listsClone" :key="index">
                            <view class="item2-l">
                                <!-- <radio-group>
                  <label>
                    <view class="label">
                      <radio checked='' />
                    </view>
                  </label>
                </radio-group> -->
                                <view class="text-box">
                                    <view class="text-title">
                                        {{ item.type }}
                                        <span class="tag">发票已开具</span>
                                    </view>
                                    <view class="text-des">{{ item.date }}</view>
                                </view>
                            </view>

                            <view class="item2-r">
                                ￥
                                <text>{{ item.invoice_amount }}</text>
                            </view>
                        </view>
                    </block>
                    <block v-else-if="url == 'tofuBoard'">
                        <view class="item3">
                            <view class="item3-t">
                                <view class="item3-t1">豆腐板</view>
                                <view class="item3-t2">个数</view>
                                <view class="item3-t3">状态</view>
                            </view>
                            <view class="item3-c" v-for="(item, index) in listsClone" :key="index">
                                <view class="item3-t1 date">{{ item.date }}</view>

                                <view class="item3-t2 number">{{ item.quantity }}</view>

                                <view class="item3-t3 status" v-if="item.status == 0">未回收</view>

                                <view class="item3-t3 status1" v-else>已收回</view>
                            </view>
                        </view>
                    </block>
                    <block v-else-if="url == 'turnoverBasket'">
                        <view class="item3">
                            <view class="item3-t">
                                <view class="item3-t1">周转筐</view>
                                <view class="item3-t2">个数</view>
                                <view class="item3-t3">状态</view>
                            </view>
                            <view class="item3-c" v-for="(item, index) in listsClone" :key="index">
                                <view class="item3-t1 date">{{ item.date }}</view>

                                <view class="item3-t2 number">{{ item.quantity }}</view>

                                <view class="item3-t3 status" v-if="item.status == 0">未回收</view>

                                <view class="item3-t3 status1" v-else>已收回</view>
                            </view>
                        </view>
                    </block>
                    <block v-else>
                        <view class="item1" v-for="(item, index) in listsClone" :key="index">
                            <view class="item1-t">
                                <view class="item1-t-l">
                                    <radio-group>
                                        <label>
                                            <view class="label">
                                                <radio :checked="item.isCheck" @tap="checked" :data-id="item.id" />
                                                <!-- <text>菜品</text> -->
                                            </view>
                                        </label>
                                    </radio-group>
                                    <view class="date">{{ item.date }}</view>
                                </view>
                                <view class="item1-t-r">
                                    总额:
                                    <text class="price">
                                        ￥
                                        <text>{{ item.price }}</text>
                                    </text>
                                </view>
                            </view>

                            <view class="item1-c" v-for="(goods, index1) in item.goodsDetail" :key="index1">
                                <view class="good-item">
                                    <radio-group>
                                        <label>
                                            <view class="label">
                                                <radio checked="" :disabled="false" />
                                                <text>{{ goods.name }}</text>
                                            </view>
                                        </label>
                                    </radio-group>
                                    <view class="amount">x{{ goods.quantity }}/{{ goods.unit }}</view>
                                    <view class="money">￥{{ goods.price }}</view>
                                </view>
                            </view>
                        </view>
                    </block>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// component/reportForms/reportForms.js
export default {
    data() {
        return {
            isShowList: true,
            isCheckAll: false,
            orderIds: [],

            goods: {
                name: '',
                quantity: '',
                unit: '',
                price: ''
            },

            listsClone: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        title: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: ''
        },
        lists: {
            type: Array,
            default: () => []
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        checkAll(e) {
            let lists = this.lists;
            let isCheckAll = !this.isCheckAll;
            let orderIds = [];
            let type = false;
            lists = lists.map((item) => {
                item.isCheck = isCheckAll;
                if (isCheckAll) {
                    type = true;
                }
                orderIds.push(item.id);
                return item;
            });
            this.$emit('checkAll', {
                detail: {
                    id: orderIds,
                    type: type
                }
            });
            this.setData({
                isCheckAll,
                listsClone: lists,
                orderIds
            });
        },
        checked(e) {
            let id = e.currentTarget.dataset.id;
            let lists = this.lists;
            let orderIds = this.orderIds;
            let type = false;
            for (var i = 0; i < lists.length; i++) {
                if (lists[i].id == id) {
                    lists[i].isCheck = !lists[i].isCheck;
                    if (!lists[i].isCheck) {
                        if (orderIds.includes(id)) {
                            let index = orderIds.indexOf(id);
                            this.$emit('checked', {
                                detail: {
                                    id: id,
                                    type: type
                                }
                            });
                            orderIds.splice(index, 1);
                        }
                    } else {
                        type = true;
                        orderIds.push(id);
                    }
                }
            }
            this.$emit('checked', {
                detail: {
                    id: orderIds,
                    type: type
                }
            });
            this.setData({
                listsClone: lists,
                orderIds
            });
            if (lists.every((obj) => obj['isCheck'] === true)) {
                this.setData({
                    isCheckAll: true
                });
            } else {
                this.setData({
                    isCheckAll: false
                });
            }
        },
        showList() {
            this.setData({
                isShowList: !this.isShowList
            });
        }
    },
    created: function () {},
    watch: {
        lists: {
            handler: function (newVal, oldVal) {
                this.listsClone = newVal;
            },

            immediate: true,
            deep: true
        }
    }
};
</script>
<style>
@import './reportForms.css';
</style>
