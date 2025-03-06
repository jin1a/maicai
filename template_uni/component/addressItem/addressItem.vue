<template>
    <view class="addressItem">
        <view class="item">
            <view class="item-t">
                <view class="name">{{ name }}</view>
                <view class="tel">{{ tel }}</view>
            </view>
            <view class="item-c">{{ addressText }}（{{ warehouse }}）</view>
            <view class="item-b">
                <radio-group @change="radioChange">
                    <label>
                        <view class="label">
                            <radio value="" :checked="isDefaultId" />
                            <block v-if="isEditStatus">
                                <text :style="'color: ' + (isDefaultId ? 'rgba(1, 197, 61, 1)' : '')">设为新地址</text>
                            </block>
                            <block v-else>
                                <text :style="'color: ' + (isDefaultId ? 'rgba(1, 197, 61, 1)' : '')">设为默认</text>
                            </block>
                        </view>
                    </label>
                </radio-group>
                <view class="item-b-r">
                    <view class="edit btn" @tap="editAddress">
                        <text class="iconfont icon-liuyan"></text>
                        <text>编辑</text>
                    </view>
                    <view class="remove btn" @tap="removeAddress">
                        <text class="iconfont icon-shanchu2"></text>
                        <text>删除</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// component/addressList/addressList.js
export default {
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        name: {
            type: String,
            default: ''
        },
        tel: {
            type: String,
            default: ''
        },
        addressText: {
            type: String,
            default: ''
        },
        isDefaultId: {
            type: Boolean,
            default: false
        },
        addressId: {
            type: Number
        },
        province: {
            type: String,
            default: ''
        },
        district: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        isEditStatus: {
            type: Boolean,
            default: false
        },
        warehouse: {
            type: String | null,
            default: ''
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        radioChange: function (e) {
            this.$emit('radioChange', {
                detail: this.addressId
            });
        },
        removeAddress: function (e) {
            this.$emit('removeAddress', {
                detail: this.addressId
            });
        },
        editAddress: function (e) {
            let data = this;
            uni.navigateTo({
                url:
                    '/pages/addAddress/addAddress?name=' +
                    data.name +
                    '&tel=' +
                    data.tel +
                    '&textareaValue=' +
                    data.addressText +
                    '&submitText=保存&headText=编辑收货地址&province=' +
                    data.province +
                    '&city=' +
                    data.city +
                    '&district=' +
                    data.district +
                    '&id=' +
                    data.addressId +
                    '&is_default=' +
                    data.isDefaultId
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './addressItem.css';
</style>
