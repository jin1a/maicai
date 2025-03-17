<template>
    <view class="login" >
        <!-- <custom-header-back title="菜亿家"></custom-header-back> -->
        <view class="box1">
            <view class="boxContainer">
                <image class="logo" src="http://img.jxcyj.cn/images/logo.png" mode="widthFix" />
                <view class="text-box">                   
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
								<div class="title">密码</div>
								<span class="retrievePW" @tap="toRetrievePW">忘记密码？</span>
								<input class="uni-input" password type="text" placeholder="请输入" v-model="password"   />								
							</div>
						</div>
                        <label class="checkbox-label">							
                            <view :class="'checkbox-box ' + checked" @tap="radioChange">
                                <view :class="'iconfont icon-gouxuan ' + checked"></view>
                            </view>
                            <text>已阅读并同意</text>
                            <text class="link" data-type="user" @tap="openAgreement">《用户协议》</text>
                            <text>与</text>
                            <text class="link" data-type="privacy" @tap="openAgreement">《隐私协议》</text>
                        </label>
                    </view>
                </view>
                <view class="btns">
                    <button class="btn" v-if="canIUseGetUserProfile && checked" open-type="getPhoneNumber" @tap="loginInit">
                        <!-- <text class="iconfont icon-weixin"></text> -->
                        <text>登录</text>
                        <text></text>
                    </button>
                    <button class="btn" v-else @tap="isChecked">
                        <!-- <text class="iconfont icon-weixin"></text> -->
                        <text>登录</text>
                        <text></text>
                    </button>
                    <!-- <button class="btn" wx:else open-type="getUserInfo" bindgetuserinfo="getUserInfo">
          <text class="iconfont icon-weixin"></text>
        <text>授权登录</text>
        <text></text>
        </button> -->
                    <view class="btn cancelLogin" @tap="chennelLogin" hover-class="none">取消登录</view>
					<view class="register" hover-class="none">还没有账号？<span  @tap="toRegister">去注册</span></view>
					<div class="register">（原小程序用户可以通过忘记密码设定新密码）</div>
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
        radioChange() {
            this.setData({
                checked: !this.checked
            });
        },
		toRetrievePW(){
			uni.navigateTo({
			    url: '/pages/retrievePassword/retrievePassword'
			});
		},
        isChecked() {
            // #ifdef MP-WEIXIN
            // this.$scope.animate(
            //     '.checkbox-box',
            //     [
            //         {
            //             translateX: -20,
            //             ease: 'ease-out'
            //         },
            //         {
            //             translateX: -5,
            //             ease: 'ease-out'
            //         },
            //         {
            //             translateX: -20,
            //             ease: 'ease-out'
            //         },
            //         {
            //             translateX: -5,
            //             ease: 'ease-out'
            //         },
            //         {
            //             translateX: -20,
            //             ease: 'ease-out'
            //         },
            //         {
            //             translateX: -0,
            //             ease: 'ease-out'
            //         }
            //     ],
            //     200,
            //     function () {
            //         this.clearAnimation('.checkbox-box', function () {
            //             console.log('清除了.block上的所有动画属性');
            //         });
            //     }.bind(this)
            // );
            // #endif
            // #ifndef MP-WEIXIN
            // this.animate(
            //     '.checkbox-box',
            //     [
            //         {
            //             translateX: -20,
            //             ease: 'ease-out'
            //         },
            //         {
            //             translateX: -5,
            //             ease: 'ease-out'
            //         },
            //         {
            //             translateX: -20,
            //             ease: 'ease-out'
            //         },
            //         {
            //             translateX: -5,
            //             ease: 'ease-out'
            //         },
            //         {
            //             translateX: -20,
            //             ease: 'ease-out'
            //         },
            //         {
            //             translateX: -0,
            //             ease: 'ease-out'
            //         }
            //     ],
            //     200,
            //     function () {
            //         this.clearAnimation('.checkbox-box', function () {
            //             console.log('清除了.block上的所有动画属性');
            //         });
            //     }.bind(this)
            // );
            // #endif
            uni.showToast({
                title: '请先阅读并同意协议！',
                icon: 'none'
            });
        },

        chennelLogin() {
            uni.switchTab({
                url: '/pages/index/index'
            });
        },
		toRegister(){
			uni.navigateTo({
			    url: '/pages/register/register'
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

        //点击登录按钮触发事件
        loginInit(e) {
			if(this.phoneNub.length===0){
				uni.showToast({
					title: '请输入手机号码',
					icon: 'none'
				});
				return
			}
			if(this.password.length===0){
				uni.showToast({
					title: '请输入密码',
					icon: 'none'
				});
				return
			}
			let that = this;
			that.setData({
			    loadModal: true
			});
			console.log(this.phoneNub,222)
			let param ={"password":this.password,"phone":this.phoneNub};
			loginApi
			    .apiLogin(param)
			    .then((res) => {
					console.log(res,'loginInit111')
			        //保存缓存
			        app.globalData.saveStorage('userInfo', res.data);
			        app.globalData.saveStorage('isLogin', true);
			        app.globalData.saveStorage('token', res.data.token.token);
			        app.globalData.saveStorage('elderMode', res.data.elderMode == 1 ? true : false);
			        that.setData({
			            loadModal: false
			        });
			        if (res.data.firm_id == 0) {
			            uni.navigateTo({
			                url: '/pages/join/join'
			            });
			        } else {
			            uni.switchTab({
			                url: '/pages/userPages/user/user',
			                fail: function (e) {
			                    console.log(e);
			                }
			            });
			        }
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
@import './login.css';
</style>
