<template>
    <view class="orderDetails" style="padding-top: 35px;">
        <!-- <block v-if="currentId == 2 || currentId == 0">
            <custom-header-back bgColor="RGBA(246, 247, 251, 1)" backTitle="商品已送达" backDes="包裹已送至前台"></custom-header-back>
        </block>
        <block v-else-if="currentId == 5">
            <!-- <custom-header-back bgColor="RGBA(246, 247, 251, 1)" backTitle="等待付款" backTime="请在{{date}}内支付"></custom-header-back> -->
            <!-- <custom-header-back bgColor="RGBA(246, 247, 251, 1)" backTitle="等待付款"></custom-header-back>
        </block>
        <block v-else-if="currentId == 1">
            <custom-header-back bgColor="RGBA(246, 247, 251, 1)" backTitle="商品正在打包中" backDes="商品正在仓库打包中，请耐心等待"></custom-header-back>
        </block> -->
        <view class="orderDetailsContainer">			
            <view class="box1">
                <orderAddressMsg
                    :address="orderInfo.user_address"
                    :realName="orderInfo.real_name"
                    :addressId="orderInfo.address_id"
                    :phone="orderInfo.user_phone"
                    :currentId="currentId"
                    :orderId="orderInfo.id"
                ></orderAddressMsg>
            </view>
            <view class="box2">
                <orderGoodItem :goodsList="detailInfo"></orderGoodItem>
                <view class="box-c">
                    <block v-if="currentId == 0 || currentId == 1">
                        <view class="item">
                            <view class="item-l">商品总额</view>
                            <view class="item-r">
                                <text>实付总额：</text>
                                ￥{{ orderInfo.pay_price }}
                            </view>
                        </view>
                        <view class="item">
                            <view class="item-l">配送费</view>
                            <view class="item-r">￥{{ orderInfo.freight_price }}</view>
                        </view>
                    </block>
                    <block v-if="currentId == 5">
                        <view class="item">
                            <view class="item-l">商品数量</view>
                            <view class="item-r">{{ orderInfo.total }}件</view>
                        </view>
                        <view class="item">
                            <view class="item-l">商品总价</view>
                            <view class="item-r">￥{{ orderInfo.total_price }}</view>
                        </view>
                        <view class="item">
                            <view class="item-l">配送费</view>
                            <view class="item-r">￥{{ orderInfo.freight_price }}</view>
                        </view>
                        <view class="item">
                            <view class="item-l">服务费</view>
                            <view class="item-r">￥{{ orderInfo.services_price }}</view>
                        </view>
                        <view class="item">
                            <view class="item-l">需付款</view>
                            <view class="item-r">
                                <view class="price">
                                    <text>￥</text>
                                    {{ orderInfo.total_price }}
                                </view>
                            </view>
                        </view>
                    </block>
                    <block v-if="currentId == 0">
                        <view class="item">
                            <view class="item-l">商品数量</view>
                            <view class="item-r">{{ orderInfo.total }}件</view>
                        </view>
                        <view class="item">
                            <view class="item-l">商品总价</view>
                            <view class="item-r">￥{{ orderInfo.total_price }}</view>
                        </view>
                        <view class="item">
                            <view class="item-l">配送费</view>
                            <view class="item-r">￥{{ orderInfo.freight_price }}</view>
                        </view>
                    </block>
                </view>
                <block v-if="currentId == 2 || currentId == 0 || currentId == 1">
                    <view class="box-b">
                        实付总额
                        <text>￥{{ orderInfo.pay_price }}</text>
                    </view>
                </block>
            </view>
            <view class="box3">
                <view class="title">订单信息</view>
                <view class="box-c">
                    <view class="item">
                        <view class="item-l">订单编号</view>
                        <view class="item-r">
                            {{ orderInfo.order_id }} |
                            <text @tap="copyText" :data-text="orderInfo.order_id">复制</text>
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-l">下单时间</view>
                        <view class="item-r">{{ orderInfo.created_at }}</view>
                    </view>
                    <block v-if="currentId != 5">
                        <view class="item">
                            <view class="item-l">支付方式</view>
                            <view class="item-r">线上支付</view>
                        </view>
                    </block>
                    <block v-if="currentId == 5">
                        <view class="item">
                            <view class="item-l">支付方式</view>
                            <!-- <view class="item-r">在线支付</view>
                            <radio-group @change="radioChange">
                                <radio value="1" :checked="check == 1" />
                            </radio-group> -->
                        </view>
                        <view class="item">
                            <view class="item-l"></view>
                            <view class="item-r">余额支付</view>
                            <radio-group @change="radioChange">
                                <radio value="2" :checked="check == 2" :disabled="type.wallet" />
                            </radio-group>
                        </view>
                        <view class="item">
                            <view class="item-l"></view>
                            <view class="item-r">月结用户</view>
                            <radio-group @change="radioChange">
                                <radio value="3" :checked="check == 3" :disabled="type.monthlyBalance" />
                            </radio-group>
                        </view>
                    </block>
                </view>
            </view>
        </view>
        <view class="orderDetailsBottom">
            <orderBtnBar :price="orderInfo.total_price" :currentId="currentId" flagPage="orderDetails" @myevent="handleChildClick" @cancelOrder="cancelOrder"></orderBtnBar>
        </view>
    </view>
</template>

<script>
import orderBtnBar from '../../../component/orderBtnBar/orderBtnBar';
import orderGoodItem from '../../../component/orderGoodItem/orderGoodItem';
import orderAddressMsg from '../../../component/orderAddressMsg/orderAddressMsg';
// import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/userPages/orderDetails/orderDetails.js
const { payOrderApi, getOrderInfoApi, cancelOrderApi } = require('../../../api/index');
const app = getApp();
export default {
    components: {
        orderBtnBar,
        orderGoodItem,
        orderAddressMsg
		// customHeaderBack
    },
    data() {
        return {            
            currentId: 0,
            orderId: 0,
            orderInfo: [],
            detailInfo: [],
            date: '',
            type: {
                wallet: '',
                monthlyBalance: ''
            },
            check: 2,
			sweixin:null,
			kk:0,
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
		
        let currentId = options.currentId ? options.currentId : 0;
        let orderId = options.orderId ? options.orderId : 0;
        if (parseInt(currentId) == 3) {
            currentId = 5;
        }
        if (orderId === 0) {
            uni.showToast({
                title: '订单信息不存在',
                icon: 'success',
                complete: function () {
                    setTimeout(function () {
                        uni.switchTab({
                            url: '/pages/shoppingCart/shoppingCart'
                        });
                    }, 1000);
                }
            });
        }
        this.setData({
            currentId,
            orderId
        });
        this.getOrderInfo();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getOrderInfo();
		
		this.kk++
		console.log(this.kk,9999)
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
        copyText: function (e) {
            uni.setClipboardData({
                data: e.currentTarget.dataset.text,
                success: function (res) {
                    uni.getClipboardData({
                        success: function (res) {
                            uni.showToast({
                                title: '复制成功'
                            });
                        }
                    });
                }
            });
        },

        handleChildClick(event) {
            var type = event.detail.value;
            if (parseInt(type) == 1) {
                this.payOrder();
            }
        },

        radioChange(e) {
            let ind = e.detail.value;
            if (this.check != parseInt(ind)) {
                this.setData({
                    check: ind
                });
            }
        },

        payOrder() {
			let that = this;
			
			if (that.check == 1) {	
				let getServices = () => {
					if(!plus){
						return
					}
					plus.share.getServices(
						res => {
							var sweixin = null;
							for (var i = 0; i < res.length; i++) {
								var t = res[i];
								if (t.id == 'weixin') {
									sweixin = t;
								}
							}
							that.sweixin = sweixin;
						},
						err => {
							console.log(JSON.stringify(err));
						}
					);
				}
				
				getServices()
				console.log(that.check ,'that.check333 ')				
				this.sweixin.launchMiniProgram({
				    id: 'gh_90eb4b1456f4',
				    path: `pages/userPages/payOrder/payOrder?orderId=${this.orderId}&token=${app.globalData.getStorage('token')}`,
				    type: 0
				},
				(res)=>{
					console.log(res,'res')
				},
				(err)=>{
					console.log(err,'errr')
				}
				);			
				
				
				
				
				//  0-正式版； 1-测试版； 2-体验版。 默认值为0。
				// location.href = "weixin://dl/business/?appid=wxcd93b3d1cbb801d9&path=pages/userPages/payOrder/payOrder"
				// uni.navigateToMiniProgram({
				// 	appId: '目标小程序的AppID',
				// 	path: 'pages/index/index?id=123', // 跳转的页面路径，可以带参数
				// 	extraData: {
				// 	foo: 'bar' // 需要传递给小程序的数据
				// 	},
				// 	envVersion: 'release', // 跳转的小程序版本，可以是develop、trial或release
				// 	success(res) {
				// 	// 跳转成功
				// 	},
				// 	fail(res) {
				// 	// 跳转失败
				// 	}
				// 	// appId: 'wxcd93b3d1cbb801d9', // 替换为目标小程序的appId
				// 	// path: `pages/index/index`, // 替换为目标小程序中的页面路径
				// 	// envVersion: 'trial', // 可选，指定要打开的小程序版本，'release'表示正式版，'trial'表示体验版，'develop'表示开发版
				// 	// success(res) {
				// 	// 	console.log('成功跳转到小程序', res);
				// 	// },
				// 	// fail(err) {
				// 	// 	console.error('跳转到小程序失败', err);
				// 	// }
				// });
				console.log(that.check ,'that.check666 ')
				// this.sweixin.launchMiniProgram({
				//     id: 'wxcd93b3d1cbb801d9',
				//     path: `pages/userPages/payOrder/payOrder?orderId=${this.orderId}`,
				//     type: 2
				// });
				return
			}
			console.log(that.check ,'that.check222 ')
			
            payOrderApi
                .apiName({
                    orderId: this.orderId,
                    type: this.check,
					trade_type:'T_APP'
                })
                .then((res) => {
                    if (that.check == 1) {
						
                        // 获取到后端返回的支付参数
                        // const payParams = res.data;
                        // 调用微信支付接口发起支付请求
                        uni.requestPayment({
							// appid:,
       //                      timeStamp: payParams.timestamp,
       //                      nonceStr: payParams.nonceStr,
       //                      package: payParams.package,
       //                      signType: payParams.signType,
       //                      paySign: payParams.paySign,
							
							"provider": "wxpay",
							"orderInfo": {
								"appid": payParams.appId,  // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
								"noncestr": payParams.nonceStr, // 随机字符串
								"package": "Sign=WXPay",        // 固定值
								"partnerid": payParams.appid,      // 微信支付商户号
								"prepayid": payParams.appid, // 统一下单订单号
								"timestamp": payParams.timesTamp,        // 时间戳（单位：秒）
								"sign": payParams.paySign // 签名，这里用的 MD5/RSA 签名
							},
							
                            success: function (res) {
                                that.currentId = 1;
                                uni.showToast({
                                    title: '支付成功！',
                                    icon: 'success',
                                    complete: function () {
                                        setTimeout(function () {
                                            uni.redirectTo({
                                                url: '/pages/userPages/allOrder/allOrder?currentId=2'
                                            });
                                        }, 1000);
                                    }
                                });
                            },
                            fail: function (res) {
                                // 支付失败处理逻辑
                                console.log('支付失败', res);
                            }
                        });
                    } else {
                        that.currentId = 1;
                        uni.showToast({
                            title: '支付成功！',
                            icon: 'success',
                            complete: function () {
                                setTimeout(function () {
                                    uni.redirectTo({
                                        url: '/pages/userPages/allOrder/allOrder?currentId=2'
                                    });
                                }, 1000);
                            }
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        getOrderInfo() {
            let that = this;
            getOrderInfoApi
                .apiName({
                    orderId: that.orderId
                })
                .then((res) => {
					if(res.data.orderInfo.status!==3){
						setTimeout(function () {
						    uni.redirectTo({
						        url: '/pages/userPages/allOrder/allOrder?currentId=2'
						    });
						}, 1000);
						return
					};
                    let date = that.toDate(res.data.orderInfo.created_at);
                    console.log(date);
                    that.setData({
                        orderInfo: res.data.orderInfo,
                        detailInfo: res.data.detailInfo,
                        date: date,
                        type: res.data.cashier
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        cancelOrder() {
            let orderId = this.orderInfo.order_id;
            uni.showModal({
                title: '温馨提示',
                content: '是否取消订单！',
                success(res) {
                    if (res.confirm) {
                        cancelOrderApi
                            .apiName({
                                orderId: orderId
                            })
                            .then((res) => {
                                uni.showToast({
                                    title: '订单已取消！',
                                    icon: 'success',
                                    duration: 2000,
                                    complete: function () {
                                        setTimeout(function () {
                                            uni.switchTab({
                                                url: '/pages/shoppingCart/shoppingCart'
                                            });
                                        }, 2000);
                                    }
                                });
                            })
                            .catch((err) => {});
                    }
                }
            });
        },

        toDate(str) {
            let dateTime = new Date(str);
            dateTime.setMinutes(dateTime.getMinutes() + 43200);
            // 获取增加30分钟后的时间，并进行格式化
            let hour = dateTime.getHours().toString().padStart(2, '0');
            let minute = dateTime.getMinutes().toString().padStart(2, '0');
            let second = dateTime.getSeconds().toString().padStart(2, '0');
            // 拼接最终的时间字符串
            let resultTime = hour + ':' + minute + ':' + second;
            return resultTime;
        }
    }
};
</script>
<style>
@import './orderDetails.css';
</style>
