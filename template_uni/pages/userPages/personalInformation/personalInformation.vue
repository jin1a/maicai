<template>
    <view class="personalInformation" :style="'padding-top: ' + (menuHeight + 10) + 'px;'">
        <custom-header-back title="个人信息"></custom-header-back>
        <view class="personalInformationContainer">
            <view class="content">
                <form @submit="">
                    <view class="item">
                        <view class="text">头像</view>
                        <view class="item-r">
                            <image class="avatar" :src="userinfo.avatar" v-if="userinfo.avatar" mode="" />
                            <image class="avatar" src="http://img.jxcyj.cn/images/user.png" v-else mode="" />
                        </view>
                    </view>
                    <view class="item">
                        <view class="text">昵称</view>
                        <view class="item-r">
                            <text>{{ userinfo.nickname }}</text>
                        </view>
                    </view>
                    <view class="item">
                        <view class="text">手机号码</view>
                        <view class="item-r">
                            <text>{{ userinfo.phone }}</text>
                        </view>
                    </view>
                    <view class="item">
                        <view class="text">邮箱</view>
                        <view class="item-r">
                            <input type="text" @input="email" placeholder="请填写" placeholder-class="input-placeholder" :value="userinfo.email" />
                        </view>
                    </view>
                    <view class="item">
                        <view class="text">性别</view>
                        <view class="item-r">
                            <view class="labels">
                                <radio-group @change="radioChange">
                                    <label v-for="(item, index) in radios" :key="index">
                                        <view class="label">
                                            <radio :value="item.value" :checked="item.value == userinfo.sex ? true : false" />
                                            <text>{{ item.name }}</text>
                                        </view>
                                    </label>
                                </radio-group>
                            </view>
                        </view>
                    </view>
                    <view class="item">
                        <view class="text">生日</view>
                        <view class="item-r">
                            <picker mode="date" header-text="选择时间" :value="date" @change="bindDateChange">
                                <view class="font30">
                                    <text>{{ date }}</text>
                                </view>
                            </picker>
                        </view>
                    </view>
                    <view class="item">
                        <view class="text">所属企业</view>
                        <view class="item-r">
                            <text>{{ userinfo.firm.name }}</text>
                        </view>
                    </view>
                    <view class="item">
                        <view class="text">企业管理者</view>
                        <view class="item-r">
                            <text>{{ userinfo.firm.originator_name }}</text>
                        </view>
                    </view>
                    <view class="item">
                        <view class="text">附近企业可见</view>
                        <view class="item-r">
                            <switch :checked="userinfo.firm.is_show == 1 ? 'true' : ''" @change="switchChange" />
                        </view>
                    </view>
                    <view class="item">
                        <view class="text">字体加粗</view>
                        <view class="item-r">
                            <switch :checked="userinfo.elder_mode == 1 ? 'true' : ''" @change="elderModeChange" />
                        </view>
                    </view>
                </form>
            </view>
            <view class="submitContainer">
                <view class="submit" @tap="saveUserinfo">保存</view>
            </view>
        </view>
    </view>
</template>

<script>
import customHeaderBack from '../../../component/custom-header-back/custom-header-back';
// pages/userPages/personalInformation/personalInformation.js
const { getUserInfoApi, saveUserinfoApi } = require('../../../api/index');
const app = getApp();
export default {
    components: {
        customHeaderBack
    },
    data() {
        return {
            menuHeight: app.globalData.menuHeight,
            date: '请完善',
            Processing: '0',
            radios: [
                {
                    value:'1',
                    name: '男'
                },
                {
                    value: '0',
                    name: '女'
                }
            ],
            userinfo: {
                birthday_time: '',
                email: '',
                sex: '',
                is_show: '',
                elder_mode: '',
                avatar: '',
                nickname: '',
                phone: '',

                firm: {
                    name: '',
                    originator_name: '',
                    is_show: 0
                }
            }
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
    onShow() {
        let that = this;
        getUserInfoApi
            .apiName()
            .then((res) => {
                let date = res.data.info.birthday_time;
                that.setData({
                    userinfo: res.data.info
                });
                if (date != null) {
                    that.setData({
                        date: date
                    });
                }
            })
            .catch((err) => {});
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
        bindDateChange: function (e) {
            this.setData({
                date: e.detail.value,
                'userinfo.birthday_time': e.detail.value
            });
        },

        email: function (e) {
            this.setData({
                'userinfo.email': e.detail.value
            });
        },

        radioChange: function (e) {
            var that = this;
            that.setData({
                'userinfo.sex': e.detail.value
            });
        },

        switchChange: function (e) {
            this.setData({
                'userinfo.is_show': e.detail.value
            });
        },

        elderModeChange: function (e) {
            uni.showModal({
                title: '提示',
                content: '保存之后请点击右上角重新进入小程序。',
                showCancel: false
            });
            app.globalData.saveStorage('elderMode', e.detail.value);
            this.setData({
                'userinfo.elder_mode': e.detail.value
            });
        },

        saveUserinfo() {
            let userinfo = this.userinfo;
            let data = {
                id: userinfo.id,
                firm_id: userinfo.firm_id,
                email: userinfo.email,
                sex: userinfo.sex,
                birthday_time: userinfo.birthday_time,
                is_show: userinfo.is_show == false ? 0 : 1,
                elder_mode: userinfo.elder_mode == false ? 0 : 1
            };
            if (data.sex === null) {
                uni.showToast({
                    title: '请填写完整！',
                    icon: 'none',
                    duration: 2000
                });
                return false;
            }
            var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if (data.email !== '' && !reg.test(data.email)) {
                // 邮箱地址格式不正确
                uni.showToast({
                    title: '请输入有效的邮箱地址',
                    icon: 'none',
                    duration: 2000
                });
                return false;
            }
            saveUserinfoApi
                .apiName(data)
                .then((res) => {
                    uni.showToast({
                        title: '保存成功',
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
@import './personalInformation.css';
</style>
