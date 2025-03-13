<template>
    <view class="addPersonalInformation" style="padding-top:25px;">
        <custom-header-back title="基本信息"></custom-header-back>
        <view class="box1">
            <view class="box-c">
                <form @submit="formSubmit">
                    <view class="item">
                        <view class="item-l">姓名</view>
                        <view class="item-r">
                            <input type="text" name="name" :value="info.name" placeholder="请填写真实姓名" placeholder-class="input-placeholder" />
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">性别</view>
                        <view class="item-r">
                            <view class="labels">
                                <radio-group @change="radioChange" data-obj="sex">
                                    <label v-for="(item, index) in radios" :key="index">
                                        <view class="label">
                                            <radio name="sex" :value="item.value" :checked="item.value == info.sex ? 'true' : ''" />
                                            <text>{{ item.name }}</text>
                                        </view>
                                    </label>
                                </radio-group>
                            </view>
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">出生日期</view>
                        <view class="item-r">
                            <picker mode="date" header-text="选择时间" :value="info.date_of_birth" @change="bindDateChange" data-obj="date_of_birth">
                                <view class="font30">
                                    <text>{{ info.date_of_birth }}</text>
                                </view>
                            </picker>
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">手机号码</view>
                        <view class="item-r">
                            <input type="number" name="phone" :value="info.phone" placeholder="请填写联系电话" placeholder-class="input-placeholder" />
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">邮箱</view>
                        <view class="item-r">
                            <input type="text" name="email" :value="info.email" placeholder="请填写邮箱账号" placeholder-class="input-placeholder" />
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">你的身份</view>
                        <view class="item-r">
                            <view class="labels">
                                <radio-group @change="radioChange" data-obj="standing">
                                    <label v-for="(item, index) in radios1" :key="index">
                                        <view class="label">
                                            <radio name="standing" :value="item.value" :checked="item.value == info.standing ? 'true' : ''" />
                                            <text>{{ item.name }}</text>
                                        </view>
                                    </label>
                                </radio-group>
                            </view>
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">毕业日期</view>
                        <view class="item-r">
                            <picker mode="date" header-text="选择时间" :value="info.graduation_date" @change="bindDateChange" data-obj="graduation_date">
                                <view class="font30">
                                    <text>{{ info.graduation_date }}</text>
                                </view>
                            </picker>
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">最高学历</view>
                        <view class="item-r">
                            <input type="text" name="education" :value="info.education" placeholder="请填写" placeholder-class="input-placeholder" />
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">工作年限</view>
                        <view class="item-r">
                            <input type="text" name="working_years" :value="info.working_years" placeholder="请填写" placeholder-class="input-placeholder" />
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">期望职位</view>
                        <view class="item-r">
                            <input type="text" name="expected_position" :value="info.expected_position" placeholder="请填写" placeholder-class="input-placeholder" />
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">期望薪资</view>
                        <view class="item-r">
                            <input type="text" name="expected_salary" :value="info.expected_salary" placeholder="请填写" placeholder-class="input-placeholder" />
                            元/月
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">求职状态</view>
                        <view class="item-r">
                            <view class="labels">
                                <radio-group @change="radioChange" data-obj="working_condition">
                                    <label v-for="(item, index) in radios2" :key="index">
                                        <view class="label">
                                            <radio name="working_condition" :value="item.value" :checked="item.value == info.working_condition ? 'true' : ''" />
                                            <text>{{ item.name }}</text>
                                        </view>
                                    </label>
                                </radio-group>
                            </view>
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">自我评价</view>
                        <textarea value="" name="self_evaluation" :value="info.self_evaluation" placeholder="请填写" placeholder-class="input-placeholder" />
                    </view>
                    <view class="addPersonalInformation-bottom">
                        <button class="submit" formType="submit">提交</button>
                    </view>
                </form>
            </view>
        </view>
    </view>
</template>

<script>
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/addPersonalInformation/addPersonalInformation.js
const app = getApp();
const { getJobsInfoApi, saveJobsInfoApi } = require('../../api/index');
export default {
    components: {
        customHeaderBack
    },
    data() {
        return {
            menuHeight: app.globalData.menuHeight,
            radios: [
                {
                    value: '男',
                    name: '男'
                },
                {
                    value: '女',
                    name: '女'
                }
            ],
            radios1: [
                {
                    value: '1',
                    name: '职场人士'
                },
                {
                    value: '2',
                    name: '在校学生'
                }
            ],
            radios2: [
                {
                    value: '1',
                    name: '待业'
                },
                {
                    value: '2',
                    name: '在职'
                }
            ],
            info: {
                standing: 1,
                sex: '男',
                working_condition: 1,
                graduation_date: '请选择',
                date_of_birth: '请选择',
                name: '',
                phone: '',
                email: '',
                education: '',
                working_years: '',
                expected_position: '',
                expected_salary: '',
                self_evaluation: ''
            }
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this;
        getJobsInfoApi
            .apiName()
            .then((res) => {
                if (Object.keys(res.data).length > 0) {
                    that.setData({
                        info: res.data
                    });
                }
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
        radioChange: function (e) {
            var that = this;
            that.setData({
                ['info.' + e.currentTarget.dataset.obj]: e.detail.value
            });
        },

        bindDateChange: function (e) {
            this.setData({
                ['info.' + e.currentTarget.dataset.obj]: e.detail.value
            });
        },

        formSubmit(e) {
            let data = Object.assign({}, this.info, e.detail.value);
            let value = Object.values(data);
            if (value.some((value) => value === '')) {
                uni.showToast({
                    title: '请填写完整',
                    icon: 'none',
                    duration: 1000
                });
                return false;
            }
            let reg = /^1[3-9]\d{9}$/;
            if (!reg.test(data.phone)) {
                uni.showToast({
                    title: '请输入有效的电话号码',
                    icon: 'none',
                    duration: 1000
                });
                return false;
            }
            let reg2 = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if (!reg2.test(data.email)) {
                uni.showToast({
                    title: '请输入有效的邮箱地址',
                    icon: 'none',
                    duration: 1000
                });
                return false;
            }
            saveJobsInfoApi
                .apiName(data)
                .then((res) => {
                    uni.showToast({
                        title: '保存成功！',
                        icon: 'success'
                    });
                })
                .catch((err) => {});
        }
    }
};
</script>
<style>
@import './addPersonalInformation.css';
</style>
