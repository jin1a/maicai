<template>
    <view class="queryReportBottom">
        <block v-if="url == 'tofuBoard'">
            <view class="tofuBoardText">
                总欠板
                <text class="number">{{ total }}</text>
            </view>
        </block>
        <block v-else-if="url == 'turnoverBasket'">
            <view class="tofuBoardText">
                总欠筐
                <text class="number">{{ total }}</text>
            </view>
        </block>
        <block v-else-if="url == 'billingApplication'">
            <view class="item">
                <view class="freight">运费 ￥{{ freightPrice }}</view>
                <view class="invoicing" @tap="invoicingInfo">开票信息</view>
            </view>
            <view class="queryReportBottomBar">
                <view class="sum">
                    合计：
                    <text class="price">
                        ￥
                        <text>{{ price }}</text>
                    </text>
                </view>
                <view class="btns">
                    <view class="btn" @tap="clear">清空</view>
                    <view class="btn" @tap="invoicing">申请开票</view>
                </view>
            </view>
        </block>
        <block v-else>
            <block v-if="url != 'billingRecord'">
                <view class="freight">运费 ￥{{ freightPrice }}</view>
            </block>

            <view class="queryReportBottomBar">
                <view class="sum">
                    <block v-if="url != 'billingRecord'">
                        合计：
                        <text class="price">
                            ￥
                            <text>{{ price }}</text>
                        </text>
                    </block>
                </view>
                <view class="btns">
                    <view class="btn" @tap="clear">清空</view>
                    <view class="btn" @tap="sendEmail">导出邮箱</view>
                </view>
            </view>
        </block>
    </view>
</template>

<script>
// component/queryReportBottom/queryReportBottom.js
export default {
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        url: {
            type: String,
            default: ''
        },
        price: {
            type: String,
            default: 0
        },
        freightPrice: {
            type: String,
            default: 0
        },
        total: {
            type: Number,
            default: 0
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        sendEmail() {
            this.$emit('sendEmail');
        },
        clear() {
            this.$emit('clear');
        },
        invoicing() {
            this.$emit('invoicing');
        },
        invoicingInfo() {
            this.$emit('invoicingInfo');
        }
    },
    created: function () {}
};
</script>
<style>
@import './queryReportBottom.css';
</style>
