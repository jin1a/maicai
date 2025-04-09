<template>
    <view class="login" >
       
        <view class="box1" style="padding: 100px  30px 0 30px;">
			当前无网络连接，请链接网络
        </view>   
    </view>
</template>

<script>


const app = getApp();
export default {
    components: {
        
    },
    data() {
        return {
           
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        
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
       
    }
};
</script>
<style>
@import './noNetwork.css';
</style>
