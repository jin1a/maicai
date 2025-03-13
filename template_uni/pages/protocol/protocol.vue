<template>
    <view class="protocol" style="padding-top:25px;">
        <!-- <custom-header-back title="菜亿家"></custom-header-back> -->
        <view class="box1">
            <view class="boxContainer">
                <view class="name">
                    甲方：
                    <input type="text" />
                    (以下简称甲方)
                </view>
                <view class="name">
                    乙方：
                    <input type="text" value="江西菜亿家网络科技有限公司" disabled="disabled" />
                    (以下简称乙方)
                </view>
                <view>
                    甲乙双方为共同制止商业贿赂和不正当竞争行为、维护各自及双方共同的合法权益，充分体现公平、公正、廉洁、诚信合作的精神，保证甲乙双方商业合作关系的健康延续，根据相关法律、法规的规定，经双方友好协商，形成如下合意:
                </view>
                <view>一、双方应自觉遵守有关法律法规、规章制度及本协议项下关于公平交易、廉洁自律、反对不当利益输送的相关规定</view>
                <view>二、乙方核心经营理念: 价格透明，拒绝回扣。承诺不主动或被动有以下不当行为:</view>
                <view>(1)不以任何名义向甲方员工给予回扣和好处。</view>
                <view>(2)不以任何理由向甲方员工馈赠礼金、礼品有价证券和贵重物品。</view>
                <view>(3)不以任何理由安排甲方员工参加宴请、健身、娱乐、牌局等活动；不得给甲方员工报销任何费用。</view>
                <view>(4)不以任何理由为甲方员工及其家属、朋友同学等关联人员提供或给付不正当利益输送(包括提供相关业务往来)。</view>
                <view>如乙方员工违反上述规定，甲方可通过155******** 电话举报。</view>
            </view>
        </view>
    </view>
</template>

<script>
import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/protocol/protocol.js
const app = getApp();
export default {
    components: {
        customHeaderBack
    },
    data() {
        return {
            menuHeight: app.globalData.menuHeight
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
    methods: {}
};
</script>
<style>
@import './protocol.css';
</style>
