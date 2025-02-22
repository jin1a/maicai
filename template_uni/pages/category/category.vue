<template>
    <view class="category" :style="'padding-top: ' + menuHeight + 'px;'">
        <custom-header title="全部菜品"></custom-header>
        <view class="category-t">
            <inputSearch :title="searchTitle" @cancel="cancel" @search="search" :isSearch="isSearch" bgColor="rgba(249, 249, 251, 1)" placeholder="搜索商品"></inputSearch>
        </view>
        <view class="category-c">
            <block v-if="!isSearch">
                <view class="categoryListBox">
                    <view :class="'categoryListColumn ' + (isShowListRow ? 'active' : '')">
                        <categoryListColumn :showListRowBtn="true" @showListRow="showListRow" :currentId="typeListId" :lists="typeList" @switch="switchNav"></categoryListColumn>
                    </view>
                    <view :class="'categoryListRow ' + (isShowListRow ? 'active' : '')">
                        <view class="shadow" @tap="closeListRow"></view>
                        <view class="container">
                            <view class="title">全部分类</view>
                            <view class="list">
                                <categoryListRow :currentId="currentId" :lists="typeList" @switch="switchNav"></categoryListRow>
                            </view>
                            <view class="closeListRowBtn" @tap="closeListRow">
                                <text>点击收起</text>
                                <text class="iconfont icon-right-1-copy"></text>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="gooodList">
                    <view class="gooodList-l">
                        <leftNav @switchGoodsType="switchGoodsType" :goodsTypeList="goodsTypeList" :goodsTypeListId="goodsTypeListId"></leftNav>
                    </view>
                    <view class="gooodList-r">
                        <scroll-view :scroll-y="true">
                            <view class="item" v-for="(item, index) in goodsList" :key="index">
                                <goodItem
                                    @editNum="editNum"
                                    :image="item.image"
                                    :unit="item.unit"
                                    :title="item.name"
                                    :priceInteger="item.priceInt"
                                    :priceDecimals="item.priceDec"
                                    :amount="item.amount"
                                    :skuType="item.sku_type"
                                    :skuList="item.skuList"
                                ></goodItem>
                            </view>
                        </scroll-view>
                    </view>
                </view>
            </block>
            <block v-else>
                <view class="searchResult">
                    <view class="item" v-for="(item, index) in searchList" :key="index">
                        <goodItem
                            @editNum="editNum"
                            :image="item.image"
                            :unit="item.unit"
                            :title="item.cate_id === 55 ? item.name + '（特价）' : item.name"
                            :priceInteger="item.priceInt"
                            :priceDecimals="item.priceDec"
                            :amount="item.amount"
                            :skuType="item.sku_type"
                            :skuList="item.skuList"
                        ></goodItem>
                    </view>
                    <view id="observer" class="bottom">暂无商品</view>
                </view>
            </block>
        </view>

        <shoppingCartBar :cartList="cartList" :price="price"></shoppingCartBar>
    </view>
</template>

<script>
import customHeader from '../../component/custom-header/custom-header';
import inputSearch from '../../component/inputSearch/inputSearch';
import categoryListColumn from '../../component/categoryListColumn/categoryListColumn';
import categoryListRow from '../../component/categoryListRow/categoryListRow';
import goodItem from '../../component/goodItem/goodItem';
import leftNav from '../../component/leftNav/leftNav';
import shoppingCartBar from '../../component/shoppingCartBar/shoppingCartBar';
// pages/category/category.js
const { getCategoryGoodsApi, getGoodsListApi, getCartApi, searchGoodsApi } = require('../../api/index');
const app = getApp();
export default {
    components: {
        customHeader,
        inputSearch,
        categoryListColumn,
        categoryListRow,
        goodItem,
        leftNav,
        shoppingCartBar
    },
    data() {
        return {
            menu: app.globalData.menu,
            menuLeft: app.globalData.menuLeft,
            menuHeight: app.globalData.menuHeight,
            typeList: [],
            goodsList: [],
            typeListId: 0,
            isShowListRow: false,
            goodsTypeList: [],
            goodsTypeListId: 0,
            categoryList: [],
            cartList: [],
            price: 0,
            searchList: [],
            isSearch: false,
            searchTitle: '',
            observer_var: '',
            searchPage: 1,
            lazy: true,
            selected: 0,
            currentId: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getCatrgoryList(() => {
            let currentId = uni.getStorageSync('currentId');
            if (currentId.currentId != '' && currentId.type != 0) {
                currentId = currentId.currentId;
                uni.setStorage({
                    key: 'currentId',
                    data: {
                        currentId: currentId,
                        type: 0
                    }
                });
                this.check(currentId);
            } else {
                uni.removeStorage({
                    key: 'currentId'
                });
            }
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.setData({
            isSearch: false
        });
        let searchTitle = uni.getStorageSync('searchTitle');
        if (searchTitle != '') {
            this.search({
                detail: {
                    title: searchTitle
                }
            });
            this.setData({
                searchTitle: searchTitle
            });
        }
        this.getCartList();
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 1
            });
        }
        let $this = this;
        let currentId = uni.getStorageSync('currentId').currentId;
        if (currentId == undefined) {
            this.check(this.typeListId, 1);
        }
        if (this.categoryList.length > 0 && currentId != '' && currentId != undefined) {
            currentId = this.categoryList.findIndex((obj) => obj.id == currentId);
            this.setData({
                typeListId: currentId
            });
            this.check(currentId, 1);
        }
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
        this.removeStorage();
        // this.setData({searchTitle:'', isSearch:false})
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        if (this._observer) {
            this._observer.disconnect();
        }
    },
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
        search(e) {
            let that = this;
            let name = e.detail.title;
            searchGoodsApi
                .apiName({
                    name
                })
                .then((res) => {
                    that.setData({
                        searchList: res.data,
                        isSearch: true,
                        searchTitle: name,
                        searchPage: 1,
                        lazy: true
                    });
                    that._observer = uni.createIntersectionObserver(that);
                    that._observer.relativeToViewport().observe('#observer', (observer) => {
                        let { intersectionRatio } = observer;
                        if (intersectionRatio > 0 && res.data.length > 0 && that.lazy) {
                            that.setData({
                                searchPage: that.searchPage + 1
                            });
                            that.appendList();
                        }
                    });
                })
                .catch((err) => {});
        },

        appendList() {
            let that = this;
            let page = that.searchPage;
            let name = that.searchTitle;
            searchGoodsApi
                .apiName({
                    name,
                    page
                })
                .then((res) => {
                    that.setData({
                        searchList: that.searchList.concat(res.data),
                        lazy: res.data.length > 0 ? true : false
                    });
                })
                .catch((err) => {});
        },

        cancel() {
            this.removeStorage();
            this.setData({
                searchList: [],
                isSearch: false,
                searchTitle: ''
            });
            if (this._observer) {
                this._observer.disconnect();
            }
        },

        check(id, type = 0) {
            this.categoryList.forEach((event) => {
                let key = 0;
                if (type == 1) {
                    key = event.key;
                } else {
                    key = event.id;
                }
                if (parseInt(key) == parseInt(id)) {
                    let id = event.child[0].id;
                    this.getGoodsList(id);
                    if (type == 0) {
                        this.setData({
                            typeListId: event.key
                        });
                    }
                    this.setData({
                        goodsTypeListId: id,
                        goodsTypeList: event.child
                    });
                }
            });
            if (type == 1) {
                this.setData({
                    typeListId: id
                });
            }
            this.setData({
                isShowListRow: false
            });
        },

        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        switchNav(e) {
            this.categoryList.forEach((event) => {
                if (parseInt(event.key) == parseInt(e.detail)) {
                    let id = event.child[0].id;
                    uni.setStorage({
                        key: 'currentId',
                        data: {
                            currentId: event.id,
                            type: 0
                        }
                    });
                    this.getGoodsList(id);
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

        closeListRow() {},

        showListRow(e) {
            this.setData({
                isShowListRow: e.detail
            });
        },

        closeListRow() {
            this.setData({
                isShowListRow: false
            });
        },

        switchGoodsType(e) {
            let id = e.detail;
            this.getGoodsList(id);
            this.setData({
                goodsTypeListId: id
            });
        },

        editNum(e) {
            this.getCartList();
        },

        getCatrgoryList(callbake = null) {
            let that = this;
            getCategoryGoodsApi
                .apiName()
                .then((res) => {
                    if (res.data.length > 0) {
                        let cateInfo = res.data[0];
                        that.setData({
                            typeListId: cateInfo.key,
                            categoryList: res.data
                        });
                        if (cateInfo.child.length > 0) {
                            that.getGoodsList(cateInfo.child[0].id);
                            that.setData({
                                goodsTypeListId: cateInfo.child[0].id,
                                goodsTypeList: cateInfo.child
                            });
                        }
                    }
                    that.setData({
                        typeList: res.data
                    });
                    if (callbake != null) {
                        callbake();
                    }
                })
                .catch((err) => {});
        },

        getGoodsList(cateId) {
            let that = this;
            getGoodsListApi
                .apiName({
                    cateId: cateId
                })
                .then((res) => {
                    that.setData({
                        goodsList: res.data
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
        },

        removeStorage() {
            uni.removeStorageSync('searchTitle');
        }
    }
};
</script>
<style>
@import './category.css';
</style>
