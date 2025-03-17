<template>
    <view class="newProductDemand" style="padding-top:50px;">
        <!-- <custom-header-back title="新品需求"></custom-header-back> -->
        <view class="box1">
            <form @submit="submit">
                <view class="box-t">
                    <view class="title">您填写的内容越全，越便于我们向您提供菜品</view>
                    <view class="list">
                        <view class="item">
                            <view class="item-l">商品名称</view>
                            <view class="item-r">
                                <input type="text" name="goods_name" placeholder-class="input-placeholder" placeholder="输入您想要的商品名称(必填)" />
                            </view>
                        </view>
                        <view class="item">
                            <view class="item-l">选择分类</view>
                            <view class="item-r">
                                <picker mode="selector" :range="data" :value="index" @change="bindPickerChange">
                                    <view class="picker">
                                        <input type="text" name="cate_name" :value="cate_name" placeholder-class="input-placeholder" placeholder="选择商品分类必选" />
                                        <!-- 当前选择：{{array[index]}} -->
                                    </view>
                                </picker>
                            </view>
                        </view>
                        <view class="item">
                            <view class="item-l">商品品牌</view>
                            <view class="item-r">
                                <input type="text" name="goods_brand" placeholder-class="input-placeholder" placeholder="输入商品品牌" />
                            </view>
                        </view>
                        <view class="item">
                            <view class="item-l">商品规则</view>
                            <view class="item-r">
                                <input type="text" name="unit" placeholder-class="input-placeholder" placeholder="商品的包装规格" />
                            </view>
                        </view>
                        <view class="item">
                            <view class="item-l">供货商</view>
                            <textarea value="" name="supplier" placeholder="如您一直在其他地方购买，请留给我们联系方式，便 于我们快速为您提供" />
                        </view>
                    </view>
                </view>
                <view class="box-c">
                    <view class="list">
                        <view class="item">
                            <view class="item-l">参考价格</view>
                            <view class="item-r">
                                <input type="text" name="supplier" placeholder-class="input-placeholder1" placeholder="￥8.6/斤" />
                            </view>
                        </view>
                        <view class="item">
                            <view class="item-l">备注</view>
                            <textarea value="" name="remark" placeholder="其他帮助准确描述商品信息" />
                        </view>
                    </view>
                </view>
                <view class="newProductDemandBottom">
                    <!-- <view class="submit" bind:tap="submit">提交</view> -->
                    <button size="default" type="primary" formType="submit">提交</button>
                </view>
            </form>
        </view>
    </view>
</template>

<script>
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/newProductDemand/newProductDemand.js
const { newGoodsApi, getCategoryGoodsApi } = require('../../api/index');
const app = getApp();
export default {
    components: {
        customHeaderBack
    },
    data() {
        return {
            menuHeight: app.globalData.menuHeight,
            data: [],
            cate_name: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this;
        getCategoryGoodsApi
            .apiName()
            .then((res) => {
                let data = [];
                res.data.forEach((item) => {
                    data.push(item.cate_name);
                });
                that.setData({
                    data: data
                });
            })
            .catch((err) => {});
    },
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
        bindPickerChange(e) {
            this.setData({
                cate_name: this.data[e.detail.value]
            });
        },

        submit(e) {
            let data = e.detail.value;
            if (data.cate_name == '' || data.goods_name == '') {
                uni.showToast({
                    title: '商品名称和分类不能为空！',
                    icon: 'none'
                });
                return false;
            }
            newGoodsApi
                .apiName(data)
                .then((res) => {
                    uni.showToast({
                        title: '操作成功',
                        icon: 'success',
                        duration: 2000,
                        complete: function () {
                            setTimeout(function () {
                                // 跳转到目标页面
                                uni.switchTab({
                                    url: '/pages/userPages/user/user'
                                });
                            }, 2000);
                        }
                    });
                })
                .catch((err) => {});
        }
    }
};
</script>
<style>
@import './newProductDemand.css';
</style>
