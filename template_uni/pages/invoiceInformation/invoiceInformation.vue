<template>
    <view class="selectOrderInvoicing" :style="'padding-top: ' + (menuHeight + 20) + 'px'">
        <custom-header-back title="填写发票信息"></custom-header-back>
        <view class="box1">
            <view class="box-container">
                <view class="item">
                    <view class="item-l">发票类型</view>
                    <view class="item-r">电子发票</view>
                </view>
                <view class="item">
                    <view class="item-l">抬头类型</view>
                    <view class="item-r">
                        <radio-group @change="radioChange" data-obj="Processing">
                            <label v-for="(item, index) in radios" :key="item.value">
                                <view class="label">
                                    <radio :value="item.value" :checked="item.value == Processing ? 'true' : ''" />
                                    <text>{{ item.name }}</text>
                                </view>
                            </label>
                        </radio-group>
                    </view>
                </view>
                <block v-if="Processing == 0">
                    <view class="item">
                        <view class="item-l">发票抬头</view>
                        <view class="item-r">
                            <input type="text" placeholder="填写需要开具发票的企业名称" placeholder-class="input-placeholder" />
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">税号</view>
                        <view class="item-r">
                            <input type="text" placeholder="纳税人识别号" placeholder-class="input-placeholder" />
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">开户银行</view>
                        <view class="item-r">
                            <input type="text" placeholder="选填" placeholder-class="input-placeholder" />
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">银行账号</view>
                        <view class="item-r">
                            <input type="text" placeholder="选填" placeholder-class="input-placeholder" />
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">企业地址</view>
                        <view class="item-r">
                            <input type="text" placeholder="选填" placeholder-class="input-placeholder" />
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">企业电话</view>
                        <view class="item-r">
                            <input type="text" placeholder="选填" placeholder-class="input-placeholder" />
                        </view>
                    </view>
                </block>
                <block v-else-if="">
                    <view class="item">
                        <view class="item-l">发票抬头</view>
                        <view class="item-r">
                            <input type="text" placeholder="个人" placeholder-class="input-placeholder" />
                        </view>
                    </view>
                </block>
            </view>
            <view class="box-container">
                <view class="item">
                    <view class="item-l">发票内容</view>
                    <view class="item-r">
                        <radio-group @change="radioChange" data-obj="Processing">
                            <label>
                                <view class="label">
                                    <radio value="" checked="checked" />
                                    <text>商品明细</text>
                                </view>
                            </label>
                        </radio-group>
                    </view>
                </view>
            </view>
            <view class="box-container">
                <view class="item">
                    <view class="item-l">开票金额</view>
                    <view class="item-r">
                        <view class="price">
                            ￥
                            <text>22.8</text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="tips">发票将发送至您的邮箱</view>
        </view>
        <view class="selectOrderInvoicingBottom">
            <view class="submit">提交</view>
        </view>
    </view>
</template>

<script>
import reportForms from '../../component/reportForms/reportForms';
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/invoiceInformation/invoiceInformation.js
const app = getApp();
export default {
    components: {
        reportForms,
        customHeaderBack
    },
    data() {
        return {
            menuHeight: app.globalData.menuHeight,
            Processing: 0,
            radios: [
                {
                    value: '0',
                    name: '企业'
                },
                {
                    value: '1',
                    name: '个人或事业单位'
                }
            ]
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},
    methods: {
        radioChange: function (e) {
            var that = this;
            that.setData({
                [e.currentTarget.dataset.obj]: e.detail.value
            });
        }
    }
};
</script>
<style>
@import './invoiceInformation.css';
</style>
