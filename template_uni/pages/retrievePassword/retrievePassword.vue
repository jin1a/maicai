<template>
    <view class="login" >
        <!-- <custom-header-back title="找回密码"></custom-header-back> -->
        <view class="box1">
            <view class="boxContainer">
                <image class="logo" src="http://img.jxcyj.cn/images/logo.png" mode="widthFix" />
                <view class="text-box">
                    <!-- <view class="title">申请获取以下权限</view>
                    <view class="des">获得你的公开信息(昵称，头像等)</view> -->
                    <view class="container">
						<!-- <uni-forms ref="form" :modelValue="formData" :rules="rules">
							<uni-forms-item label="姓名" name="name">
								<uni-easyinput type="text" v-model="formData.name" placeholder="请输入姓名" />
							</uni-forms-item>
							<uni-forms-item label="邮箱" name="email">
								<input class="input" v-model="formData.email" type="text" placeholder="请输入邮箱" @input="binddata('email',$event.detail.value)" />
							</uni-forms-item>
						</uni-forms> -->
						<div >
							<div class="formItem">
								<div class="title">手机号</div>															
								<input placeholder="请输入" v-model="phoneNub" />
							</div>
							<div class="formItem">
								<div class="title">新密码</div>														
								<input class="uni-input" password type="text" placeholder="请输入" v-model="password"   />								
							</div>
							<div class="formItem">
								<div class="title">确认密码</div>														
								<input class="uni-input" password type="text" placeholder="请输入" v-model="rePassword"   />								
							</div>
							<div class="formItem2">
								<div class="title">短信验证码</div>	
								<div class="inputItem">
									<input class="uni-input"  type="text" placeholder="请输入" v-model="code"   />									
									<button class="btn2"  open-type="getPhoneNumber" @tap="getVerificationCode">
										<!-- <text class="iconfont icon-weixin"></text> -->
										<text>{{verificationText}}</text>
										<text></text>
									</button>									
								</div>																
							</div>
						</div>                        
                    </view>
                </view>
                <view class="btns">
                    <button class="btn" open-type="getPhoneNumber" @tap="retrievePasswordFn">
                        <!-- <text class="iconfont icon-weixin"></text> -->
                        <text>确认修改</text>
                        <text></text>
                    </button>
                  
                    <view class="btn cancelLogin" @tap="chennelLogin" hover-class="none">返回</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// import customHeaderBack from '../../component/custom-header-back/custom-header-back';
// pages/login/login.js
const { loginApi } = require('../../api/index');
const app = getApp();
export default {
    components: {
        // customHeaderBack
    },
    data() {
        return {
            
            userInfo: {},
            hasUserInfo: false,
            canIUseGetUserProfile: false,
            checked: false,
            loadModal: false,			
			phoneNub:'',
			password:'',
			rePassword:'',
			code:'',
			verificationText:'获取验证码',
			isCountdown:false,
        };
    },
	
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if (uni.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            });
        }
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

        

        chennelLogin() {
            uni.switchTab({
                url: '/pages/index/index'
            });
        },

        openAgreement(e) {
            let type = e.currentTarget.dataset.type;
            if (type === 'user') {
                // 打开用户协议
                uni.navigateTo({
                    url: '/pages/agreement/agreement?type=' + type // 替换成你的用户协议页面
                });
            } else if (type === 'privacy') {
                // 打开隐私协议
                uni.navigateTo({
                    url: '/pages/agreement/agreement?type=' + type // 替换成你的隐私协议页面
                });
            }
        },
		// 获取验证码
		getVerificationCode(){
			if(this.isCountdown){
				return
			}
			let that = this;
			that.setData({
			    loadModal: true
			});
			console.log(this.phoneNub,222)
			let param ={"phone":this.phoneNub,"type":"4"};
			loginApi
			    .apiGetVerificationCode(param)
			    .then((res) => {
					this.isCountdown = true;
					this.countdown();
					console.log(res,'getVerificationCode');
					that.setData({
						loadModal: false
					});
			    })
			    .catch((err) => {
			        console.log(err);
			        that.setData({
			            loadModal: false
			        });
			    });
		},
		// 倒计时
		countdown(){
			let i=30
			var time = setInterval(()=>{
				i--;
				this.verificationText=i
				if(i<=0){
					this.verificationText=`获取验证码`
					this.isCountdown = false
					clearInterval(time)
					
				}
			},1000)
		},
        //点击登录按钮触发事件
        retrievePasswordFn(e) {
			let that = this;
			that.setData({
			    loadModal: true
			});
			console.log(this.phoneNub,222)
			let param =  {"phone":this.phoneNub,"password":this.password,"rePassword":this.rePassword,"code":this.code};
			loginApi
			    .apiRetrievePassword(param)
			    .then((res) => {
					console.log(res,'retrievePasswordFn')
			        //保存缓存
			       
			        that.setData({
			            loadModal: false
			        });
			        uni.switchTab({
			            url: '/pages/userPages/user/user',
			            fail: function (e) {
			                console.log(e);
			            }
			        });
			    })
			    .catch((err) => {
			        console.log(err);
			        that.setData({
			            loadModal: false
			        });
			    });
			return
            // let phone_code = e.detail.code;
            // let that = this;
            // if (e.detail.errMsg != 'getPhoneNumber:ok') {
            //     return false;
            // }
            // uni.login({
            //     success: function (res) {
            //         if (res.code) {
            //             uni.getUserInfo({
            //                 withCredentials: true,
            //                 success: function (userInfo) {
            //                     let encryptedData = userInfo.encryptedData;
            //                     let iv = userInfo.iv;
            //                     // 将登录凭证和加密数据发送到后端服务器
            //                     let param = {
            //                         code: res.code,
            //                         encryptedData: encryptedData,
            //                         iv: iv,
            //                         phoneCode: phone_code
            //                     };
            //                     that.setData({
            //                         loadModal: true
            //                     });
            //                     loginApi
            //                         .apiName(param)
            //                         .then((res) => {
            //                             //保存缓存
            //                             app.globalData.saveStorage('userInfo', res.data);
            //                             app.globalData.saveStorage('isLogin', true);
            //                             app.globalData.saveStorage('token', res.data.token.token);
            //                             app.globalData.saveStorage('elderMode', res.data.elderMode == 1 ? true : false);
            //                             that.setData({
            //                                 loadModal: false
            //                             });
            //                             if (res.data.firm_id == 0) {
            //                                 uni.navigateTo({
            //                                     url: '/pages/join/join'
            //                                 });
            //                             } else {
            //                                 uni.switchTab({
            //                                     url: '/pages/userPages/user/user',
            //                                     fail: function (e) {
            //                                         console.log(e);
            //                                     }
            //                                 });
            //                             }
            //                         })
            //                         .catch((err) => {
            //                             console.log(err);
            //                             that.setData({
            //                                 loadModal: false
            //                             });
            //                         });
            //                 }
            //             });
            //         } else {
            //             console.log('error');
            //         }
            //     }
            // });
        },

        getUserProfile(e) {
            // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
            // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
            uni.getUserProfile({
                desc: '用于完善会员资料',
                // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                success: (res) => {
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    });
                }
            });
        },

        getUserInfo(e) {
            // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
            this.setData({
                userInfo: e.detail.userInfo,
                hasUserInfo: true
            });
        }
    }
};
</script>
<style>
@import './retrievePassword.css';
</style>
