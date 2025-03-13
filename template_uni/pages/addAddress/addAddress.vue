<template>
    <view class="addaddress" style="padding-top:25px;" >
        <custom-header-back :title="headText"></custom-header-back>
        <view class="box1">
            <view class="item">
                <view class="item-l">收货人</view>
                <view class="item-r">
                    <input type="text" @input="inputName" placeholder="请输入收货人姓名" placeholder-class="input-placeholder" :value="formData.name" />
                </view>
            </view>
            <view class="item">
                <view class="item-l">手机号码</view>
                <view class="item-r">
                    <input type="text" @input="inputPhone" placeholder="请输入手机号码" placeholder-class="input-placeholder" :value="formData.phone" />
                </view>
            </view>
            <view class="item">
                <view class="item-l">所在地区</view>
                <view class="item-r">
                    <picker mode="multiSelector" :range="multiArray" :value="multiIndex" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange">
                        <view class="picker">{{ selectedValues[0] }}，{{ selectedValues[1] }}，{{ selectedValues[2] }}</view>
                    </picker>
                    <view class="icon"><text class="iconfont icon-right-1-copy"></text></view>
                </view>
            </view>
            <view class="item">
                <view class="item-l">详细地址</view>
                <view class="item-r1">
                    <textarea :value="formData.detail" @input="inputDeatail" placeholder="街道、楼牌号等详细地址" />
                    <view class="icon" @tap="chooseAddress">
                        <text class="iconfont icon-dingwei1"></text>
                    </view>
                </view>
            </view>
            <view class="setDefault">
                <text>设为默认</text>
                <switch :checked="isChecked" @change="switchChange" />
            </view>
        </view>
        <view class="addaddressBottom">
            <view class="submit" @tap="onSubmit">{{ submitText }}</view>
        </view>
    </view>
</template>

<script>
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/addAddress/addAddress.js
const { addAddressApi, getServiceAreaApi } = require('../../api/index');
const app = getApp();
export default {
    components: {
        customHeaderBack
    },
    data() {
        return {
            menuHeight: app.globalData.menuHeight,
            submitText: '确认添加',
            headText: '添加收货地址',
            formData: {
                is_default: '',
                name: '',
                phone: '',
                detail: '',
                province: '',
                city: '',
                district: '',
                id: '',
                latitude: '',
                longitude: ''
            },
            isChecked: true,
            provinces: [
                {
                    name: '江西省',
                    cities: [
                        {
                            name: '赣州市',
                            districts: [
                                '章贡区',
                                '南康区',
                                '赣县区',
                                '信丰县',
                                '大余县',
                                '上犹县',
                                '崇义县',
                                '安远县',
                                '定南县',
                                '全南县',
                                '于都县',
                                '兴国县',
                                '会昌县',
                                '寻乌县',
                                '宁都县',
                                '石城县',
                                '瑞金市',
                                '龙南市'
                            ]
                        }
                    ]
                }
            ],
            cities: [],
            // 城市列表
            districts: [],
            // 区县列表
            multiIndex: [0, 0, 0],
            // multiPicker选择的索引
            multiArray: [[], [], []],
            // multiPicker显示的内容
            selectedValues: ['选择所在省份', '城市', '区县'] // 保存选择的值
            // customItem: '全部',
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.initAddress();
        if (Object.keys(options).length > 0) {
            this.setData({
                selectedValues: [options.province, options.city, options.district]
            });
            let isChecked = true;
            if (options.is_default == 'false') {
                isChecked = false;
            }
            this.setData({
                submitText: options.submitText,
                headText: options.headText,
                isChecked: isChecked,
                'formData.is_default': isChecked == true ? 1 : 0,
                'formData.name': options.name,
                'formData.phone': options.tel,
                'formData.detail': options.textareaValue,
                'formData.province': options.province,
                'formData.city': options.city,
                'formData.district': options.district,
                'formData.id': options.id
            });
            return false;
        }
        this.setData({
            'formData.is_default': 1
        });
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
        bindMultiPickerChange: function (e) {
            const multiIndex = e.detail.value;
            const selectedValues = [this.multiArray[0][multiIndex[0]], this.multiArray[1][multiIndex[1]], this.multiArray[2][multiIndex[2]]];
            this.setData({
                multiIndex,
                selectedValues,
                'formData.province': selectedValues[0],
                'formData.city': selectedValues[1],
                'formData.district': selectedValues[2]
            });
        },

        bindMultiPickerColumnChange: function (e) {
            const { column, value } = e.detail;
            const { multiIndex, provinces } = this;
            multiIndex[column] = value;
            switch (column) {
                case 0:
                    const cities = provinces[value].cities;
                    this.setData({
                        'multiArray[1]': cities.map((item) => item.name),
                        'multiArray[2]': cities[0].districts,
                        'multiIndex[1]': 0,
                        'multiIndex[2]': 0
                    });
                    break;
                case 1:
                    const districts = provinces[multiIndex[0]].cities[value].districts;
                    this.setData({
                        'multiArray[2]': districts,
                        'multiIndex[2]': 0
                    });
                    break;
            }
            this.setData({
                multiIndex
            });
        },

        switchChange: function (e) {
            if (e.detail.value == true) {
                this.setData({
                    'formData.is_default': 1
                });
            } else {
                this.setData({
                    'formData.is_default': 0
                });
            }
        },

        inputName: function (e) {
            var value = e.detail.value;
            this.setData({
                'formData.name': value
            });
        },

        inputPhone: function (e) {
            var value = e.detail.value;
            this.setData({
                'formData.phone': value
            });
        },

        inputDeatail: function (e) {
            var value = e.detail.value;
            this.setData({
                'formData.detail': value
            });
        },

        onSubmit: function () {
            var formData = this.formData;
            addAddressApi
                .apiName(formData)
                .then((res) => {
                    uni.showToast({
                        title: '操作成功',
                        icon: 'success',
                        duration: 2000,
                        complete: function () {
                            setTimeout(function () {
                                // 跳转到目标页面
                                uni.switchTab({
                                    url: '/pages/shoppingCart/shoppingCart'
                                });
                            }, 2000);
                        }
                    });
                })
                .then((err) => {});
        },

        chooseAddress: function () {
            let that = this;
            uni.getLocation({
                type: 'gcj02',
                // altitude: true,
                success(res) {
                    uni.chooseLocation({
                        latitude: res.latitude,
                        longitude: res.longitude,
                        success: function (data) {
                            that.setData({
                                'formData.detail': data.address,
                                'formData.latitude': res.latitude,
                                'formData.longitude': res.longitude
                            });
                        },
                        fail(e) {
                            console.log(e);
                        }
                    });
                },
                fail(e) {
                    console.log(e);
                }
            });
        },

        initAddress() {
            let that = this;
            getServiceAreaApi.apiName().then((res) => {
                if (res.data !== null) {
                    that.setData({
                        provinces: res.data
                    });
                }
                this.setData({
                    'multiArray[0]': this.provinces.map((item) => item.name),
                    'multiArray[1]': this.provinces[0].cities.map((item) => item.name),
                    'multiArray[2]': this.provinces[0].cities[0].districts
                });
            });
        }
    }
};
</script>
<style>
@import './addAddress.css';
</style>
