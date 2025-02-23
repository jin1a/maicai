<template>

    <view :class="'user ' + (elderMode ? 'elder-mode' : '')" style="padding-top:25px;">
        <scroll-view scroll-y="true" class="userContainer" @scoll="scroll">
            <view class="userView">
                <view class="box1" v-if="isLogin">
                    <view class="avatar">
                        <image src="http://img.jxcyj.cn/images/avatar.png" mode="widthFix" />
                    </view>
                    <view class="text-box">
                        <view class="text-box-l">
                            <view class="name">{{ userinfo.firm_name }}</view>
                            <view class="des">{{ userinfo.username }}</view>
                        </view>
                        <navigator url="/pages/userPages/personalInformation/personalInformation" class="text-box-r" hover-class="none">
                            <text class="iconfont icon-shezhi-xianxing"></text>
                        </navigator>
                    </view>
                </view>
                <!-- 未登录 -->
                <view class="box1" v-else>
                    <view class="avatar">
                        <image src="http://img.jxcyj.cn/images/user.png" mode="widthFix" />
                    </view>
                    <view class="text-box">
                        <view class="text-box-l">
                            <navigator url="/pages/login/login">
                                <view class="name">加入他人企业 >></view>
                            </navigator>
                        </view>
                        <navigator url="" class="text-box-r" hover-class="none"><text class="iconfont icon-shezhi-xianxing"></text></navigator>
                    </view>
                </view>
                <view class="box2" v-if="!isLogin">
                    <view class="box-l">
                        <image src="http://img.jxcyj.cn/images/integrate.png" mode="widthFix" />
                        <text>新用户注册，第一周免运费</text>
                    </view>
                    <navigator class="box-r" url="/pages/login/login" hover-class="none">立即注册</navigator>
                </view>
                <view v-else></view>
                <view class="box3">
                    <view class="title">我的订单</view>
                    <view class="list">
                        <navigator url="/pages/userPages/allOrder/allOrder?currentId=1" class="item" hover-class="none">
                            <div class="icon icon1">
                                <text class="iconfont icon-daifukuan-2"></text>
                            </div>
                            <sup v-if="orderCount > 0">{{ orderCount }}</sup>
                            <view class="text">待付款</view>
                        </navigator>
                        <navigator url="/pages/userPages/allOrder/allOrder?currentId=2" class="item" hover-class="none">
                            <div class="icon icon1">
                                <text class="iconfont icon-31daifahuo"></text>
                            </div>
                            <view class="text">待发货</view>
                        </navigator>
                        <navigator url="/pages/userPages/allOrder/allOrder?currentId=3" class="item" hover-class="none">
                            <div class="icon icon1">
                                <text class="iconfont icon-icondaishouhuo"></text>
                            </div>
                            <view class="text">待收货</view>
                        </navigator>
                        <navigator url="/pages/userPages/allOrder/allOrder?currentId=0" class="item" hover-class="none">
                            <div class="icon icon1">
                                <text class="iconfont icon-quanbudingdan"></text>
                            </div>
                            <view class="text">全部订单</view>
                        </navigator>
                    </view>
                </view>
                <view class="box3">
                    <view class="title">常用工具</view>
                    <view class="list">
                        <navigator v-if="userinfo.is_admin == 1" url="/pages/subAccountAdminister/subAccountAdminister" class="item" hover-class="none">
                            <div class="icon">
                                <text class="iconfont icon-wode4-xianxing"></text>
                            </div>
                            <view class="text">添加子账号</view>
                        </navigator>
                        <navigator v-if="userinfo.firm.is_wallet == 1" url="/pages/rechargeCenter/rechargeCenter" class="item" hover-class="none">
                            <div class="icon">
                                <text class="iconfont icon-qianbao2-xianxing"></text>
                            </div>
                            <view class="text">钱包充值</view>
                        </navigator>
                        <navigator v-else-if="" url="/pages/recharge/recharge" class="item" hover-class="none">
                            <div class="icon">
                                <text class="iconfont icon-qianbao2-xianxing"></text>
                            </div>
                            <view class="text">钱包充值</view>
                        </navigator>
                        <navigator url="/pages/queryReport/queryReport" class="item" hover-class="none">
                            <div class="icon">
                                <text class="iconfont icon-dingdan3-xianxing"></text>
                            </div>
                            <view class="text">查询报表</view>
                        </navigator>
                        <navigator url="/pages/deliveryNote/deliveryNote" class="item" hover-class="none">
                            <div class="icon">
                                <text class="iconfont icon-shijianqingdan"></text>
                            </div>
                            <view class="text">送货单</view>
                        </navigator>
                        <navigator url="/pages/statement/statement" class="item" hover-class="none">
                            <div class="icon">
                                <text class="iconfont icon-mingxi4-xianxing"></text>
                            </div>
                            <view class="text">对账单</view>
                        </navigator>
                        <navigator url="/pages/newProductDemand/newProductDemand" class="item" hover-class="none">
                            <div class="icon">
                                <text class="iconfont icon-dingdan1-xianxing"></text>
                            </div>
                            <view class="text">新品需求</view>
                        </navigator>
                        <navigator url="/pages/billingInstructions/billingInstructions" class="item" hover-class="none">
                            <div class="icon">
                                <text class="iconfont icon-navicon-xtcp"></text>
                            </div>
                            <view class="text">开票须知</view>
                        </navigator>
                        <navigator url="/pages/billingApplication/billingApplication" class="item" hover-class="none">
                            <div class="icon">
                                <text class="iconfont icon-dingdan2-xianxing"></text>
                            </div>
                            <view class="text">开票申请</view>
                        </navigator>
                        <navigator url="/pages/billingRecord/billingRecord" class="item" hover-class="none">
                            <div class="icon">
                                <text class="iconfont icon-biaoqian1-xianxing"></text>
                            </div>
                            <view class="text">开票记录</view>
                        </navigator>
                        <navigator url="/pages/tofuBoard/tofuBoard" class="item" hover-class="none">
                            <div class="icon">
                                <text class="iconfont icon-mingxi8-xianxing"></text>
                            </div>
                            <view class="text">豆腐版</view>
                        </navigator>
                        <navigator url="/pages/turnoverBasket/turnoverBasket" class="item" hover-class="none">
                            <div class="icon">
                                <text class="iconfont icon-fahuochenggong-xianxing"></text>
                            </div>
                            <view class="text">周转筐</view>
                        </navigator>
                        <navigator url="/pages/userPages/allOrder/allOrder?currentId=3" class="item" hover-class="none">
                            <div class="icon">
                                <text class="iconfont icon-wuliu"></text>
                            </div>
                            <view class="text">送货信息</view>
                        </navigator>
                    </view>
                </view>
                <view class="box3">
                    <view class="list">
                        <navigator :url="userinfo.is_admin == 1 ? '/pages/address/address' : 'false'" class="item" hover-class="none">
                            <div class="icon">
                                <text class="iconfont icon-ditu2-xianxing"></text>
                            </div>
                            <view class="text">收货地址</view>
                        </navigator>
                        <navigator url="/pages/feedback/feedback" class="item" hover-class="none">
                            <div class="icon">
                                <text class="iconfont icon-bianji2"></text>
                            </div>
                            <view class="text">在线反馈</view>
                        </navigator>
                        <view :url="false" class="item" hover-class="none">
                            <button @tap="share">
                                <div class="icon">
                                    <text class="iconfont icon-fenxiang1"></text>
                                </div>
                                <view class="text">分享</view>
                            </button>
                        </view>
                        <navigator url="/pages/FAQ/FAQ" class="item" hover-class="none">
                            <div class="icon">
                                <text class="iconfont icon-jichu21-xianxing"></text>
                            </div>
                            <view class="text">常见问题</view>
                        </navigator>
                    </view>
                </view>
                <view class="box4">
                    <view class="title">客服中心</view>
                    <view class="box-c">
                        <view class="text">服务热线</view>
                        <view class="list">
                            <view class="tel" v-for="(item, index) in list.contact_list" :key="index">
                                <text class="iconfont icon-24gf-telephone"></text>

                                {{ item.title }} （{{ item.msg }}）
                            </view>
                        </view>
                    </view>
                </view>
                <view class="box5">
                    <view class="title">仓库位置</view>
					<view class="mapbox" id="mapbox" v-if="showMap" ref="mapbox">
						<map class="map" :longitude="longitude" :latitude="latitude" :markers="markers"></map>
						<!-- <web-view :webview-styles="webviewStyles" :fullscreen="false" src="/static/map.html"></web-view> -->
					</view>
                </view>
                <view class="box6">
                    <view class="title">公司信息</view>
                    <view class="pic">
                        <image src="http://img.jxcyj.cn/images/business-license.jpg" mode="widthFix" />
                        <image src="https://api.jxcyj.cn/static/home/c409e129aa841a8869fab1287283591.jpg" mode="widthFix" />
                    </view>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
// pages/user/user/user.js
const { getUserInfoApi, systemApi } = require('../../../api/index');
const app = getApp();
export default {
    data() {
        return {
			showMap:false,
            menuHeight: app.globalData.menuHeight,
			webviewStyles: {
								progress: {
									color: '#FF3333'
								},
								height:'200'
							},
            userinfo: {
                firm_name: '',
                username: '',
                is_admin: 0,

                firm: {
                    is_wallet: 0
                }
            },

            isLogin: app.globalData.getStorage('isLogin'),
            list: [],
            orderCount: 0,
            elderMode: app.globalData.getStorage('elderMode') || false,
            selected: 0,
            longitude: 0,
            latitude: 0,
            markers: []
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad(options) {
        //判断登录
        if (this.isLogin !== true) {
            uni.navigateTo({
                url: '/pages/login/login'
            });
            return false;
        }
        let userinfo = this.userinfo;
        if (userinfo.firm_id == 0) {
            uni.navigateTo({
                url: '/pages/join/join'
            });
            return false;
        }
        let that = this;
        systemApi
            .apiName()
            .then((res) => {
                that.setData({
                    list: res.data
                });
            })
            .catch((err) => {});
    },
	onPageScroll(e) {
	    console.log('页面滚动距离:', e.scrollTop);
	    // 在这里编写滚动相关的逻辑
	  },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
		// var currentWebview = this.$scope.$getAppWebview() //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效
		// 		console.log(currentWebview.children(),'currentWebview')
		// 		setTimeout(function() {
		// 			let wv = currentWebview.children()[0]
		// 			console.log(wv,'wv')
		// 			wv.setStyle({position:'relative',top:10,height:300})
		// 		}, 1000); //如果是页面初始化调用时，需要延时一下
				
				// #ifdef APP-PLUS
					// 获取元素的top
					let ele = this.$refs.mapbox
					
					console.log(ele)
					const query = uni.createSelectorQuery();
					      query.select('#mapbox').boundingClientRect(function(rect) {
					        // rect是一个对象，包含了元素的详细信息，例如top, left, width, height等
					        console.log('元素的top位置:',JSON.stringify(rect));
							
					      }).exec();
					
						let wv = plus.webview.create("","custom-webview",{
							plusrequire:"none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
							'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
							height:'235px',
							top:760 //放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
						})
						wv.loadURL("/static/map.html")
						var currentWebview = this.$scope.$getAppWebview(); //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效
						currentWebview.append(wv);//一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
						setTimeout(function() {
							console.log(wv.getStyle())
						}, 1000);//如果是首页的onload调用时需要延时一下，二级页面无需延时，可直接获取
						// #endif
	},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        let that = this;
        getUserInfoApi
            .apiName()
            .then((res) => {
                app.globalData.saveStorage('userInfo', res.data);
                that.setData({
                    userinfo: res.data.info,
                    orderCount: res.data.orderCount,
                    isLogin: true
                });
            })
            .catch((err) => {});
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 4
            });
        }

        //通过wx.request发起HTTPS接口请求
        let $this = this;
        uni.request({
            //地图WebserviceAPI地点搜索接口请求路径及参数（具体使用方法请参考开发文档）
            url: 'https://apis.map.qq.com/ws/geocoder/v1/?address="江西省赣州市章贡区青峰大道199号"&key=77NBZ-AZL6D-HO54L-HELAR-BWLQK-7XB25',
            success(res) {
                let longitude = res.data.result.location.lng;
                let latitude = res.data.result.location.lat;
                // console.log(res.data.result.location)
                $this.setData({
                    longitude: 115.004229,
                    latitude: 25.832464,
                    markers: [
                        {
                            id: 1,
                            longitude: 115.004229,
                            latitude: 25.832464,
                            name: ''
                        }
                    ]
                });
				setTimeout(()=>{
					$this.setData({
						showMap:true
					})
				},3000)
            }
        });
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
    onShareAppMessage(res) {},
    onShareTimeline: function () {},
    methods: {
		scroll(){
				console.log('sscroll')
		},
		share() {
			console.log('share',uni.share) 
		    uni.share({
		        provider: 'weixin',
		        scene: 'WXSceneSession', // 分享到聊天界面
		        type: 5, // 小程序类型
		        title: '这是一个分享示例',
				miniProgram:{
					id:'wxcd93b3d1cbb801d9',
					path:'pages/index/index',
					type:0,
					webUrl:'https://ask.dcloud.net.cn/article/287'
				},
		        success(res) {
		          console.log('分享成功', res);
		        },
		        fail(err) {
		          console.log('分享失败', err);
		        }
			})
		}
	}
};
</script>
<style>
@import './user.css';
.mapbox{
	position: relative;
	z-index: 999;
	height: 235px;
}
.map{
	/* position: absolute;
	top:0;
	left:0;
	right:0;
	bottom:0; */
}

</style>
