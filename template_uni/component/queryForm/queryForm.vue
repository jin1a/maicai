<template>
    <view class="queryForm">
        <form @submit="">
            <block v-if="url == 'queryReport'">
                <view class="list">
                    <view class="item">
                        <view class="item-l">时间</view>
                        <view class="item-r">
                            <view class="date-picker">
                                <picker mode="date" :value="curDate" start="2021年01月01日" end="2021年01月01日" @change="onDateChangeLeft">
                                    <view class="date">
                                        {{ curLeftDate }}
                                        <image class="date-down" :src="dateDownImg" mode="widthFix" :lazy-load="true" />
                                    </view>
                                </picker>

                                <text class="line"></text>

                                <picker mode="date" :value="curDate" start="2021年01月01日" end="2021年01月01日" @change="onDateChangeRight">
                                    <view class="date">
                                        {{ curRightDate }}
                                        <image class="date-down" :src="dateDownImg" mode="widthFix" :lazy-load="true" />
                                    </view>
                                </picker>
                            </view>
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">地址</view>
                        <view class="item-r">
                            <view class="selectAddress">
                                <view class="addressText" @tap="showSelect" data-flag="isShowAddressSelect">
                                    {{ defaultAddress }}
                                    <view class="icon">
                                        <view class="iconfont icon-xia" :style="'transform: rotate(' + (isShowAddressSelect ? -180 : 0) + 'deg);'"></view>
                                    </view>
                                </view>
                                <view class="sureBtn" @tap="submit">确认</view>
                            </view>
                        </view>

                        <view class="selectBox" v-if="isShowAddressSelect">
                            <selectList @selected="selected" :list="array" changeObj="defaultAddress" flag="isShowAddressSelect"></selectList>
                        </view>
                    </view>
                </view>
            </block>

            <block v-else-if="url == 'deliveryNote'">
                <view class="list">
                    <view class="item">
                        <view class="item-l">时间</view>
                        <view class="item-r">
                            <view class="date-picker">
                                <picker mode="date" :value="curDate" start="2021年01月01日" end="2021年01月01日" @change="onDateChangeLeft">
                                    <view class="date">
                                        {{ curLeftDate }}
                                        <image class="date-down" :src="dateDownImg" mode="widthFix" :lazy-load="true" />
                                    </view>
                                </picker>
                                <text class="line"></text>
                                <picker mode="date" :value="curDate" start="2021年01月01日" end="2021年01月01日" @change="onDateChangeRight">
                                    <view class="date">
                                        {{ curRightDate }}
                                        <image class="date-down" :src="dateDownImg" mode="widthFix" :lazy-load="true" />
                                    </view>
                                </picker>
                            </view>
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">地址</view>
                        <view class="item-r">
                            <view class="selectAddress">
                                <view class="addressText" @tap="showSelect" data-flag="isShowAddressSelect">
                                    {{ defaultAddress }}
                                    <view class="icon">
                                        <view class="iconfont icon-xia" :style="'transform: rotate(' + (isShowAddressSelect ? -180 : 0) + 'deg);'"></view>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view class="selectBox" v-if="isShowAddressSelect">
                            <selectList @selected="selected" :list="array" changeObj="defaultAddress" flag="isShowAddressSelect"></selectList>
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">商品类型</view>
                        <view class="item-r">
                            <view class="selectAddress">
                                <view class="addressText" @tap="showSelect" data-flag="isShowGoodsType">
                                    {{ goodsType }}
                                    <view class="icon">
                                        <view class="iconfont icon-xia" :style="'transform: rotate(' + (isShowGoodsType ? -180 : 0) + 'deg);'"></view>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view class="selectBox" v-if="isShowGoodsType">
                            <selectList @selected="selected" :list="goodsTypeList" changeObj="goodsType" flag="isShowGoodsType"></selectList>
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">邮箱</view>
                        <view class="item-r">
                            <input type="text" @input="emailInput" placeholder="请输入邮箱号" placeholder-class="input-placeholder" />
                        </view>
                    </view>
                </view>
                <view class="submit" @tap="submit">确认</view>
            </block>
            <block v-else-if="url == 'statement'">
                <view class="list">
                    <view class="item">
                        <view class="item-l">时间</view>
                        <view class="item-r">
                            <view class="date-picker month">
                                <picker mode="date" :value="curDate" :end="endDate" fields="month" @change="onDateChange">
                                    <view class="date">{{ curDate }}</view>
                                </picker>
                            </view>
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">地址</view>
                        <view class="item-r">
                            <view class="selectAddress">
                                <view class="addressText" @tap="showSelect" data-flag="isShowAddressSelect">
                                    {{ defaultAddress }}
                                    <view class="icon">
                                        <view class="iconfont icon-xia" :style="'transform: rotate(' + (isShowAddressSelect ? -180 : 0) + 'deg);'"></view>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view class="selectBox" v-if="isShowAddressSelect">
                            <selectList @selected="selected" :list="array" changeObj="defaultAddress" flag="isShowAddressSelect"></selectList>
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">商品类型</view>
                        <view class="item-r">
                            <view class="selectAddress">
                                <view class="addressText" @tap="showSelect" data-flag="isShowGoodsType">
                                    {{ goodsType }}
                                    <view class="icon">
                                        <view class="iconfont icon-xia" :style="'transform: rotate(' + (isShowGoodsType ? -180 : 0) + 'deg);'"></view>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view class="selectBox" v-if="isShowGoodsType">
                            <selectList @selected="selected" :list="goodsTypeList" changeObj="goodsType" flag="isShowGoodsType"></selectList>
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">邮箱</view>
                        <view class="item-r">
                            <input type="text" placeholder="请输入邮箱号" @input="emailInput" placeholder-class="input-placeholder" />
                        </view>
                    </view>
                </view>
                <view class="submit" @tap="submit">确认</view>
            </block>
            <block v-else-if="url == 'billingApplication'">
                <view class="list">
                    <view class="item">
                        <view class="item-l">时间</view>
                        <view class="item-r">
                            <view class="date-picker month">
                                <picker mode="date" :disabled="true" :value="curDate" :end="endDate" fields="month" @change="onDateChange">
                                    <view class="date">{{ curDate }}</view>
                                </picker>
                            </view>
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">地址</view>
                        <view class="item-r">
                            <view class="selectAddress">
                                <view class="addressText" @tap="showSelect" data-flag="isShowAddressSelect">
                                    {{ defaultAddress }}
                                    <view class="icon">
                                        <view class="iconfont icon-xia" :style="'transform: rotate(' + (isShowAddressSelect ? -180 : 0) + 'deg);'"></view>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view class="selectBox" v-if="isShowAddressSelect">
                            <selectList @selected="selected" :list="array" changeObj="defaultAddress" flag="isShowAddressSelect"></selectList>
                        </view>
                    </view>
                </view>
                <view class="submit" @tap="submit">确认</view>
            </block>
            <block v-else-if="url == 'billingRecord'">
                <view class="list">
                    <view class="item">
                        <view class="item-l">时间</view>
                        <view class="item-r">
                            <view class="date-picker">
                                <picker mode="date" :value="curDate" start="2021年01月01日" end="2021年01月01日" @change="onDateChangeLeft">
                                    <view class="date">
                                        {{ curLeftDate }}
                                        <image class="date-down" :src="dateDownImg" mode="widthFix" :lazy-load="true" />
                                    </view>
                                </picker>

                                <text class="line"></text>

                                <picker mode="date" :value="curDate" start="2021年01月01日" end="2021年01月01日" @change="onDateChangeRight">
                                    <view class="date">
                                        {{ curRightDate }}
                                        <image class="date-down" :src="dateDownImg" mode="widthFix" :lazy-load="true" />
                                    </view>
                                </picker>
                            </view>
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">发票类型</view>
                        <view class="item-r">
                            <view class="selectAddress">
                                <view class="addressText" @tap="showSelect" data-flag="isShowInvoiceType">
                                    {{ invoiceType }}
                                    <view class="icon">
                                        <view class="iconfont icon-xia" :style="'transform: rotate(' + (isShowInvoiceType ? -180 : 0) + 'deg);'"></view>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view class="selectBox" v-if="isShowInvoiceType">
                            <selectList @selected="selected" :list="InvoiceTypeArray" changeObj="invoiceType" flag="isShowInvoiceType"></selectList>
                        </view>
                    </view>
                </view>
                <view class="submit" @tap="controlMOdal">确认</view>
            </block>
            <block v-else-if="url == 'tofuBoard'">
                <view class="list">
                    <view class="item">
                        <view class="item-l">地址</view>
                        <view class="item-r">
                            <view class="selectAddress">
                                <view class="addressText" @tap="showSelect" data-flag="isShowAddressSelect">
                                    {{ defaultAddress }}
                                    <view class="icon">
                                        <view class="iconfont icon-xia" :style="'transform: rotate(' + (isShowAddressSelect ? -180 : 0) + 'deg);'"></view>
                                    </view>
                                </view>
                            </view>
                            <view class="sureBtn" @tap="submit">确认</view>
                        </view>
                        <view class="selectBox" v-if="isShowAddressSelect">
                            <selectList @selected="selected" :list="array" changeObj="defaultAddress" flag="isShowAddressSelect"></selectList>
                        </view>
                    </view>
                </view>
            </block>
            <block v-else-if="url == 'turnoverBasket'">
                <view class="list">
                    <view class="item">
                        <view class="item-l">地址</view>
                        <view class="item-r">
                            <view class="selectAddress">
                                <view class="addressText" @tap="showSelect" data-flag="isShowAddressSelect">
                                    {{ defaultAddress }}
                                    <view class="icon">
                                        <view class="iconfont icon-xia" :style="'transform: rotate(' + (isShowAddressSelect ? -180 : 0) + 'deg);'"></view>
                                    </view>
                                </view>
                            </view>
                            <view class="sureBtn" @tap="submit">确认</view>
                        </view>
                        <view class="selectBox" v-if="isShowAddressSelect">
                            <selectList @selected="selected" :list="array" changeObj="defaultAddress" flag="isShowAddressSelect"></selectList>
                        </view>
                    </view>
                </view>
            </block>
        </form>
    </view>
</template>

<script>
import selectList from '../../component/selectList/selectList';
// component/queryForm/queryForm.js
const { getFirmAddressApi } = require('../../api/index');
export default {
    components: {
        selectList
    },
    data() {
        return {
            curLeftDate: '开始时间',
            curRightDate: '结束时间',
            array: [],
            defaultAddress: '请选择',
            goodsType: '请选择',
            warehouse: '请选择',
            isShowGoodsType: false,
            isShowAddressSelect: false,
            isShowWarehouseSelect: false,

            goodsTypeList: [
                {
                    id: 0,
                    detail: '全部'
                },
                {
                    id: 1,
                    detail: 'A类'
                },
                {
                    id: 2,
                    detail: 'B类'
                },
                {
                    id: 3,
                    detail: 'C类'
                }
            ],

            curDate: '请选择',
            aWarehouseArray: ['西乡仓'],
            endDate: '',
            invoiceType: '请选择',
            isShowInvoiceType: false,

            InvoiceTypeArray: [
                {
                    id: 1,
                    detail: '普通发票'
                },
                {
                    id: 2,
                    detail: '增值税发票'
                }
            ],

            email: '',
            startTime: '',
            endTime: '',
            addressId: 0,
            typeId: 0,
            date: '',
            dateDownImg: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        url: {
            type: String,
            default: ''
        }
    },
    mounted() {
        // 处理小程序 attached 生命周期
        this.attached();
        // 处理小程序 ready 生命周期
        this.$nextTick(() => this.ready());
    },
    /**
     * 组件的方法列表
     */
    methods: {
        ready: function () {
            let currentDate = new Date();
            let year = currentDate.getFullYear();
            let month = currentDate.getMonth() + 1;
            month = month > 9 ? month : '0' + month;
            this.setData({
                endDate: year + '年' + month + '月'
            });
        },

        attached: function () {
            if (this.url == 'billingApplication') {
                this.getDate();
            }
            let that = this;
            getFirmAddressApi
                .apiName()
                .then((res) => {
                    that.setData({
                        array: res.data
                    });
                })
                .catch((err) => {});
        },

        getDate() {
            // 获取当前日期的年份和月份
            let currentDate = new Date();
            let currentYear = currentDate.getFullYear();
            let currentMonth = currentDate.getMonth() + 1; // 月份从0开始，需要加1
            // 计算上月的年份和月份
            let lastMonthYear;
            let lastMonth;
            if (currentMonth === 1) {
                // 如果当前月份是1月，则上月是去年的12月
                lastMonthYear = currentYear - 1;
                lastMonth = 12;
            } else {
                lastMonthYear = currentYear;
                lastMonth = currentMonth - 1;
            }
            let date = lastMonthYear + '-' + lastMonth;
            let dateStr = `${lastMonthYear}年${lastMonth}月`;
            this.setData({
                curDate: dateStr,
                date
            });
        },

        showSelect(e) {
            this.setData({
                [e.currentTarget.dataset.flag]: !this[e.currentTarget.dataset.flag]
            });
        },

        bindPickerChange(e) {
            this.setData({
                defaultAddress: this.array[e.detail.value]
            });
        },

        onDateChange(e) {
            let date = e.detail.value;
            let arr = date.split('-');
            let dateStr = `${arr[0]}年${arr[1]}月`;
            this.setData({
                curDate: dateStr,
                date
            });
        },

        onDateChangeLeft(e) {
            let date = e.detail.value;
            let arr = date.split('-');
            let dateStr = `${arr[0]}年${arr[1]}月${arr[2]}日`;
            this.$emit('onDateChangeLeft', {
                detail: {
                    date: date
                }
            });
            this.setData({
                curLeftDate: dateStr,
                startTime: date
            });
        },

        onDateChangeRight(e) {
            let date = e.detail.value;
            let arr = date.split('-');
            let dateStr = `${arr[0]}年${arr[1]}月${arr[2]}日`;
            this.$emit('onDateChangeRight', {
                detail: {
                    date: date
                }
            });
            this.setData({
                curRightDate: dateStr,
                endTime: date
            });
        },

        selected(e) {
            this.setData({
                [e.detail.obj]: e.detail.value,
                [e.detail.flag]: false
            });
            switch (e.detail.flag) {
                case 'isShowGoodsType':
                case 'isShowInvoiceType':
                    this.setData({
                        typeId: e.detail.id
                    });
                    break;
                case 'isShowAddressSelect':
                    this.setData({
                        addressId: e.detail.id
                    });
                    break;
            }
            this.$emit('selected', {
                detail: {
                    id: e.detail.id,
                    value: e.detail.value
                }
            });
        },

        emailInput(e) {
            this.$emit('emailInput', {
                detail: e.detail.value
            });
            this.setData({
                email: e.detail.value
            });
        },

        clear() {
            this.setData({
                curLeftDate: '开始时间',
                curRightDate: '结束时间',
                defaultAddress: '请选择',
                goodsType: '请选择',
                warehouse: '请选择',
                isShowGoodsType: false,
                isShowAddressSelect: false,
                isShowWarehouseSelect: false,
                goodsTypeList: [
                    {
                        id: 0,
                        detail: '全部'
                    },
                    {
                        id: 1,
                        detail: 'A类'
                    },
                    {
                        id: 2,
                        detail: 'B类'
                    }
                ],
                curDate: '请选择',
                aWarehouseArray: ['西乡仓'],
                endDate: '',
                invoiceType: '请选择',
                isShowInvoiceType: false,
                InvoiceTypeArray: [
                    {
                        id: 1,
                        name: '普通发票'
                    },
                    {
                        id: 2,
                        detail: '增值税发票'
                    }
                ],
                email: '',
                startTime: '',
                endTime: '',
                addressId: 0,
                typeId: 0,
                date: ''
            });
        },

        // submit(){
        //   this.triggerEvent("submit")
        // },
        submit() {
            let startTime = '';
            let endTime = '';
            let date = this.date;
            let email = this.email;
            if ((this.url == 'statement' || this.url == 'billingApplication') && date != '') {
                startTime = date;
                endTime = date;
            } else {
                startTime = this.startTime;
                endTime = this.endTime;
            }
            if ((startTime != '' && endTime == '') || (endTime != '' && startTime == '')) {
                uni.showToast({
                    title: '开始时间和结束时间都不能为空',
                    icon: 'none',
                    duration: 2000
                });
                return false;
            }
            let addressId = this.addressId;
            if (addressId == 0) {
                uni.showToast({
                    title: '地址为必填项',
                    icon: 'none',
                    duration: 2000
                });
                return false;
            }
            let data = {};
            let typeId = this.typeId;
            data.addressId = addressId;
            data.type = typeId;
            if (startTime != '' && endTime != '') {
                data.startTime = startTime;
                data.endTime = endTime;
            }
            data.email = email;
            this.$emit('submit', {
                detail: data
            });
        },

        controlMOdal(e) {
            let startTime = '';
            let endTime = '';
            startTime = this.startTime;
            endTime = this.endTime;
            if ((startTime != '' && endTime == '') || (endTime != '' && startTime == '')) {
                uni.showToast({
                    title: '开始时间和结束时间都不能为空',
                    icon: 'none',
                    duration: 2000
                });
                return false;
            }
            let data = {};
            data.type = this.typeId;
            if (startTime != '' && endTime != '') {
                data.startTime = startTime;
                data.endTime = endTime;
            }
            this.$emit('controlMOdal', {
                detail: data
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './queryForm.css';
</style>
