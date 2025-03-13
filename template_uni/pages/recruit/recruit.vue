<template>
    <view class="recruit" style="padding-top:25px;">
        <custom-header-back title="招聘求职"></custom-header-back>
        <view class="recruitNav">
            <view class="list">
                <block v-for="(item, index) in list" :key="index">
                    <view :class="'item ' + (index == currentId ? 'active' : '')" @tap="switchRecruitNav" :data-id="index">{{ item }}</view>
                </block>
            </view>
            <block v-if="currentId == 1">
                <navigator class="addMsg" hover-class="none" url="/pages/addPersonalInformation/addPersonalInformation">添加</navigator>
            </block>
        </view>
        <view class="box1">
            <inputSearch :isOrder="true" :currId="currentId" @search="search" placeholder="请输入关键字"></inputSearch>
            <view class="box-c">
                <view class="list">
                    <block v-if="currentId == 0">
                        <view class="item" v-for="(item, index) in recruitList" :key="index">
                            <navigator :url="'/pages/recruitDetails/recruitDetails?id=' + item.id" hover-class="none">
                                <!-- recruit-avatar.png -->
                                <view class="item-t">
                                    <image class="avatar" :src="item.image == null ? 'http://img.jxcyj.cn/images/recruit-avatar.png.jpg' : item.image" mode="widthFix" />
                                    <view class="item-t-r">
                                        <view class="title">
                                            <view class="">{{ item.name }}</view>
                                            <view class="salary">{{ item.salary_range }}</view>
                                        </view>
                                        <view class="des">{{ item.firm_name }}</view>
                                    </view>
                                </view>
                            </navigator>

                            <view class="item-c">
                                {{ item.required_qualifications }}
                            </view>

                            <view class="item-b">
                                <button open-type="share" class="btn">
                                    <text class="iconfont icon-fenxiang2"></text>
                                    <text>分享</text>
                                </button>
                                <navigator :url="'/pages/recruitDetails/recruitDetails?id=' + item.id" hover-class="none" class="btn">
                                    <text class="iconfont icon-liulan"></text>
                                    <text>浏览</text>
                                </navigator>
                                <view class="btn" @tap="applyJob" :id="item.id">
                                    <text class="iconfont icon-yingpinzhiwei"></text>
                                    <text>应聘</text>
                                </view>
                            </view>
                        </view>
                    </block>
                    <block v-else-if="currentId == 1">
                        <view class="item1" v-for="(item, index) in jobsList" :key="index">
                            <view class="item-t">
                                <image class="avatar" :src="item.image == null ? 'http://img.jxcyj.cn/images/recruit-avatar.png.jpg' : item.image" mode="widthFix" />
                                <view class="item-t-r">
                                    <view class="title">
                                        <text>{{ item.name }}</text>
                                        <view class="labels">
                                            <view class="label">{{ item.sex }}</view>
                                            <view class="label">{{ item.age }}岁</view>
                                            <view class="label">{{ item.education }}</view>
                                            <view class="label">{{ item.expected_position }}</view>
                                        </view>
                                    </view>
                                    <view class="tel">
                                        <text>{{ item.phone }}</text>
                                        <text class="iconfont icon-24gf-phoneBubble"></text>
                                    </view>
                                </view>
                            </view>

                            <view class="text">
                                <view>工作年限：{{ item.working_years }}</view>
                                <view>期望薪资: {{ item.expected_salary }}元/月</view>
                            </view>
                        </view>
                    </block>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import inputSearch from '../../component/inputSearch/inputSearch';
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/recruit/recruit.js
const app = getApp();
const { recruitListApi, jobsListApi, applyJobApi } = require('../../api/index');
export default {
    components: {
        inputSearch,
        customHeaderBack
    },
    data() {
        return {
           
            currentId: 1,
            list: ['招聘', '求职'],
            recruitList: [],
            jobsList: []
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getJobsList();
        this.getRecruitList();
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
        switchRecruitNav(e) {
            this.setData({
                currentId: e.currentTarget.dataset.id
            });
        },

        getJobsList(search = '') {
            let that = this;
            jobsListApi
                .apiName({
                    search
                })
                .then((res) => {
                    that.setData({
                        jobsList: res.data
                    });
                })
                .catch((err) => {});
        },

        getRecruitList(search = '') {
            let that = this;
            recruitListApi
                .apiName({
                    type: 0,
                    search
                })
                .then((res) => {
                    that.setData({
                        recruitList: res.data
                    });
                })
                .catch((err) => {});
        },

        search(e) {
            let title = e.detail.title;
            switch (e.detail.type) {
                case 0:
                    this.getRecruitList(title);
                    break;
                case 1:
                    this.getJobsList(title);
                    break;
            }
        },

        applyJob(e) {
            let id = e.currentTarget.id;
            applyJobApi
                .apiName({
                    id
                })
                .then((res) => {
                    uni.showToast({
                        title: '投递成功！',
                        icon: 'success'
                    });
                })
                .catch((err) => {});
        }
    }
};
</script>
<style>
@import './recruit.css';
</style>
