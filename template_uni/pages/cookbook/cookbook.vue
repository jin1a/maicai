<template>
    <view class="cookbook" style="padding-top:25px">
        <custom-header title="全部菜品"></custom-header>
        <view class="box1">
            <inputSearch bgColor="rgba(249, 249, 251, 1)" placeholder="搜索菜品"></inputSearch>
        </view>
        <view class="box2">
            <categoryListColumn :currentId="typeListId" :lists="typeList" @switch="switchNav"></categoryListColumn>
        </view>
        <view class="box3">
            <view class="l">
                <leftNav @switchGoodsType="switchGoodsType" :goodsTypeList="goodsTypeList" :goodsTypeListId="goodsTypeListId"></leftNav>
            </view>
            <view class="r">
                <scroll-view :scroll-y="true">
                    <view class="item" v-for="(item, index) in CookbookList" :key="index">
                        <view class="title">{{ item.name }}</view>

                        <view class="item-c">
                            <view class="labels">
                                <view class="label" v-for="(goods, index1) in item.goods" :key="index1">{{ goods.name }}</view>
                            </view>
                            <view class="cartBtn">
                                <cartControl @editNum="editNum" :skuId="item.goods_ids"></cartControl>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </view>
        </view>
        <shoppingCartBar :cartList="cartList" :price="price"></shoppingCartBar>
    </view>
</template>

<script>

import inputSearch from '../../component/inputSearch/inputSearch';
import shoppingCartBar from '../../component/shoppingCartBar/shoppingCartBar';
import categoryListColumn from '../../component/categoryListColumn/categoryListColumn';
import leftNav from '../../component/leftNav/leftNav';
import cartControl from '../../component/cartControl/cartControl';
// pages/cookbook/cookbook.js
const { getCategoryCookbookApi, getCookbookListApi, getCartApi } = require('../../api/index');
const app = getApp();
export default {
    components: {
       
        inputSearch,
        shoppingCartBar,
        categoryListColumn,
        leftNav,
        cartControl
    },
    data() {
        return {
            // menuHeight: app.globalData.menuHeight,
            typeListId: 0,
            typeList: [],
            goodsTypeList: [],
            goodsTypeListId: 0,
            CookbookList: [],
            cartList: [],
            price: 0,
            selected: 0,
            isShowListRow: false,
            categoryist: '',

            goods: {
                name: ''
            }
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getCatrgoryList();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 2
            });
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getCartList();
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 2
            });
        }
    },
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
        switchNav(e) {
            this.categoryist.forEach((event) => {
                if (event.key == e.detail) {
                    let id = event.child[0].id;
                    this.getCookbookList(id);
                    this.setData({
                        goodsTypeListId: id,
                        goodsTypeList: event.child
                    });
                }
            });
            this.setData({
                typeListId: e.detail,
                isShowListRow: false
            });
        },

        switchGoodsType(e) {
            this.setData({
                goodsTypeListId: e.detail
            });
        },

        editNum(e) {
            this.getCartList();
        },

        getCatrgoryList() {
            let that = this;
            getCategoryCookbookApi
                .apiName()
                .then((res) => {
                    if (res.data.length > 0) {
                        let cateInfo = res.data[0];
                        that.setData({
                            typeListId: cateInfo.key,
                            categoryist: res.data
                        });
                        if (cateInfo.child.length > 0) {
                            that.getCookbookList(cateInfo.child[0].id);
                            that.setData({
                                goodsTypeListId: cateInfo.child[0].id,
                                goodsTypeList: cateInfo.child
                            });
                        }
                    }
                    that.setData({
                        typeList: res.data
                    });
                })
                .catch((err) => {});
        },

        getCookbookList(cateId) {
            let that = this;
            getCookbookListApi
                .apiName({
                    cateId: cateId
                })
                .then((res) => {
                    that.setData({
                        CookbookList: res.data
                    });
                })
                .catch((err) => {});
        },

        getCartList() {
            let that = this;
            getCartApi
                .apiName()
                .then((res) => {
                    var total = res.data
                        .reduce(function (sum, product) {
                            return sum + product.price * product.quantity;
                        }, 0)
                        .toFixed(2);
                    that.setData({
                        cartList: res.data,
                        price: total
                    });
                })
                .catch((err) => {});
        }
    }
};
</script>
<style>
@import './cookbook.css';
</style>
