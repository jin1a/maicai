<template>
    <view class="tab-bar">
        <block v-for="(item, index) in list" :key="index">
            <view
                :class="'tab-item ' + (selected === index ? 'active' : '') + ' ' + (item.produstList ? 'tab-item-center' : '')"
                :data-index="index"
                @tap="switchTab"
                :data-path="item.pagePath"
            >
                <div class="icon">
                    <text :class="'iconfont ' + item.iconPath" :id="item.iconPath"></text>
                </div>
                <view class="text">{{ item.text }}</view>
            </view>
        </block>
    </view>
</template>

<script>
const app = getApp();
export default {
    data() {
        return {
            selected: 0,
            color: 'rgba(1, 197, 61, 1)',
            selectedColor: 'rgba(1, 197, 61, 1)',
            list: [
                {
                    pagePath: '/pages/index/index',
                    iconPath: 'icon-shouye',
                    selectedIconPath: 'icon-shouye',
                    text: '首页'
                },
                {
                    pagePath: '/pages/category/category',
                    iconPath: 'icon-fenlei',
                    selectedIconPath: 'icon-fenlei',
                    text: '分类'
                },
                {
                    pagePath: '/pages/cookbook/cookbook',
                    iconPath: 'icon-navicon-xtcp',
                    selectedIconPath: 'icon-navicon-xtcp',
                    text: '菜谱'
                },
                {
                    pagePath: '/pages/shoppingCart/shoppingCart',
                    iconPath: 'icon-31gouwuche',
                    selectedIconPath: 'icon-31gouwuche',
                    text: '购物车'
                },
                {
                    pagePath: '/pages/userPages/user/user',
                    iconPath: 'icon-iconfontaccount',
                    selectedIconPath: 'icon-iconfontaccount',
                    text: '我的'
                }
            ]
        };
    },
    mounted() {
        // 处理小程序 attached 生命周期
        this.attached();
        // 处理小程序 ready 生命周期
        this.$nextTick(() => this.ready());
    },
    methods: {
        ready: function () {
            let query = uni.createSelectorQuery().in(this);
            query
                .select('#icon-31gouwuche')
                .boundingClientRect(function (res) {
                    app.globalData.shoppCartX = res.left;
                    app.globalData.shoppCartY = res.top;
                })
                .exec();
        },

        attached() {},

        switchTab(e) {
            const data = e.currentTarget.dataset;
            const url = data.path;
            let $this = this;
            uni.switchTab({
                url,
                fail: function (res) {
                    // console.log(res)
                },
                success: function (res) {
                    $this.setData({
                        selected: data.index
                    });
                }
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
