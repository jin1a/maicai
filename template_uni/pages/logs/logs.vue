<template>
    <view>
        <!-- logs.wxml -->
        <scroll-view class="scrollarea" scroll-y type="list">
            <block v-for="(log, index) in logs" :key="index">
                <view class="log-item">{{ index + 1 }}. {{ log.date }}</view>
            </block>
        </scroll-view>
    </view>
</template>

<script>
// logs.js
const util = require('../../utils/util.js');
export default {
    data() {
        return {
            logs: [],

            log: {
                date: ''
            }
        };
    },
    onLoad() {
        this.setData({
            logs: (uni.getStorageSync('logs') || []).map((log) => {
                return {
                    date: util.formatTime(new Date(log)),
                    timeStamp: log
                };
            })
        });
    },
    methods: {}
};
</script>
<style>
@import './logs.css';
</style>
