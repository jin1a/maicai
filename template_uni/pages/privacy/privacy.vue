<template>
   <div class="privacy">
		<div class="mask">
			<div class="privacy2">
				<div class="title">用户协议和隐私政策</div>
				<div class="contt">请你务必审慎阅读、充分理解<span class="link" @tap="linkFn1" >“用户协议"</span>和<span class="link"  @tap="linkFn2">“隐私政策"</span>各条款，包括但不限于:为了更好的向你提供服务，我们需要收集你的设备标识、操作日志等信息用于分析、优化应用性能。你可阅读《用户协议》和《隐私政策》了解详细信息。如果你同意，请点击下面按钮开始接受我们的服务。</div>
				<div class="bt">
					<button class="btn first" @tap="acceptFn">同意并接受</button>
					<button class="btn" @tap="noAcceptFn">暂不同意</button>
				</div>
			</div>
		</div>
   </div>
</template>

<script>

// pages/billingInstructions/billingInstructions.js
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
    onLoad(options) {},
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
		acceptFn(){
			app.globalData.saveStorage('isFirst', 1);
			uni.switchTab({
			    url: '/pages/index/index'
			});			
		},
		noAcceptFn(){
			if(plus){
				plus.runtime.quit()
			}			
		},
		linkFn1(){
				
			uni.navigateTo({
			    url: '/pages/agreement/agreement?type=user'
			});	
		},
		linkFn2(){			
			uni.navigateTo({
			    url: '/pages/agreement/agreement?type=privacy'
			});	
		},
	}
};
</script>
<style>
@import './privacy.css';
</style>
