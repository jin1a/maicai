<script>
const { loginApi } = require('./api/index');
// app.js
export default {
    data() {
        return {};
    },
    onLaunch() {
		uni.getNetworkType({
		  success: function (res) {
		    // 获取网络类型
		    const networkType = res.networkType
		    if (networkType === 'none') {
		      // 当前无网络连接，展示无网络页面
		      uni.redirectTo({
		        url: '/pages/noNetwork/noNetwork'
		      })
		    }
		  }
		})
		uni.onNetworkStatusChange(function (res) {
		  if (res.isConnected) {
		    // 网络连接恢复，重新加载应用程序
		    uni.reLaunch({
		      url: '/pages/index/index'
		    })
		  }
		})
		loginApi
		    .appUdata({})
		    .then((res) => {
				const latestVersion = res.data.version_name;
				if (this.compareVersion(currentVersion, latestVersion)) {
					// 如果有新版本，则提示用户进行更新
					uni.showModal({
						title: '发现新版本',
						content: res.data.release_notes,
						confirmText: '立即更新',
						cancelText: '暂不更新',
						success: (r) => {
							if (r.confirm) {
								this.downloadAndUpdateApp(res.data.download_url);
							}
						}
					});
				}			        
		    })
		    .catch((err) => {					
		        console.log(err);
		        
		    });	
		this.checkForUpdate();
        // 展示本地存储能力
        const logs = uni.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        uni.setStorageSync('logs', logs);

        // 登录
        // wx.login({
        //   success: res => {
        //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //   }
        // })
        uni.getSystemInfo({
            success: (res) => {
                this.system = res;
            }
        });
        this.menu = 0//uni.getMenuButtonBoundingClientRect();
        this.menuLeft = this.system.windowWidth - this.menu.right;
        this.menuHeight = this.menu.top + this.menu.height;
        this.globalData.screenSize();
    },
	methods:{
		checkForUpdate() {			
			// 获取当前应用版本
			plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
				const currentVersion = widgetInfo.version;
				this.requestNewVersionInfo(currentVersion);
			});
		},
		requestNewVersionInfo(currentVersion) {
			loginApi
			    .appUdata({})
			    .then((res) => {
					const latestVersion = res.data.version_name;
					if (this.compareVersion(currentVersion, latestVersion)) {
						// 如果有新版本，则提示用户进行更新
						uni.showModal({
							title: '发现新版本',
							content: res.data.release_notes,
							confirmText: '立即更新',
							cancelText: '暂不更新',
							success: (r) => {
								if (r.confirm) {
									this.downloadAndUpdateApp(res.data.download_url);
								}
							}
						});
					}			        
			    })
			    .catch((err) => {					
			        console.log(err);
			        
			    });			
		},
		compareVersion(currentVersion, latestVersion) {
			// 简单的版本比较，可以根据实际情况进行调整
			const current = currentVersion.split('.');
			const latest = latestVersion.split('.');
			for (let i = 0; i < latest.length; i++) {
				if (parseInt(latest[i]) > (parseInt(current[i]) || 0)) {
					return true;
				} else if (parseInt(latest[i]) < (parseInt(current[i]) || 0)) {
					return false;
				}
			}
			return false;
		},
		downloadAndUpdateApp(updateUrl) {
			// 下载并安装新版本APK (需在安卓平台运行)
			if (plus.os.name === 'Android') {
				plus.nativeUI.toast('正在下载更新...');
				const dtask = plus.downloader.createDownload(updateUrl, { filename: '_doc/update/' }, (download, status) => {
					if (status !== 200) {
						plus.nativeUI.toast('下载更新失败');
						return;
					}
					const path = download.filename;
					plus.nativeUI.toast('下载完成，准备安装...');
					plus.runtime.install(path, {}, () => {
						plus.nativeUI.toast('更新完成！');
						plus.runtime.restart();
					}, (error) => {
						plus.nativeUI.toast('安装失败');
						console.error('安装失败: ', error);
					});
				});
				dtask.start();
			} else {
				// iOS平台需要跳转到App Store进行更新
				uni.showModal({
					title: '提示',
					content: '请前往App Store更新应用',
					showCancel: false,
					confirmText: '知道了',
					success: () => {
						// 使用实际App的App Store链接
						plus.runtime.openURL('‎Connecting to App Store');
					}
				});
			}
		}
	},
    globalData: {
        userInfo: null,
        screenSize: function () {
            var that = this;
            uni.getSystemInfo({
                success: function (res) {
                    var ww = res.windowWidth;
                    var hh = res.windowHeight;
                    that.ww = ww;
                    that.hh = hh;
                }
            });
        },

        // 存储缓存
        saveStorage: function (key, value) {
            uni.setStorage({
                key: key,
                data: value
            });
        },

        // 获取缓存
        getStorage: function (key) {
            return uni.getStorageSync(key);
        },

        bezier: function (points, times) {
            // 0、以3个控制点为例，点A,B,C,AB上设置点D,BC上设置点E,DE连线上设置点F,则最终的贝塞尔曲线是点F的坐标轨迹。
            // 1、计算相邻控制点间距。
            // 2、根据完成时间,计算每次执行时D在AB方向上移动的距离，E在BC方向上移动的距离。
            // 3、时间每递增100ms，则D,E在指定方向上发生位移, F在DE上的位移则可通过AD/AB = DF/DE得出。
            // 4、根据DE的正余弦值和DE的值计算出F的坐标。
            // 邻控制AB点间距
            var bezier_points = [];
            var points_D = [];
            var points_E = [];
            const DIST_AB = Math.sqrt(Math.pow(points[1]['x'] - points[0]['x'], 2) + Math.pow(points[1]['y'] - points[0]['y'], 2));
            // 邻控制BC点间距
            const DIST_BC = Math.sqrt(Math.pow(points[2]['x'] - points[1]['x'], 2) + Math.pow(points[2]['y'] - points[1]['y'], 2));
            // D每次在AB方向上移动的距离
            const EACH_MOVE_AD = DIST_AB / times;
            // E每次在BC方向上移动的距离
            const EACH_MOVE_BE = DIST_BC / times;
            // 点AB的正切
            const TAN_AB = (points[1]['y'] - points[0]['y']) / (points[1]['x'] - points[0]['x']);
            // 点BC的正切
            const TAN_BC = (points[2]['y'] - points[1]['y']) / (points[2]['x'] - points[1]['x']);
            // 点AB的弧度值
            const RADIUS_AB = Math.atan(TAN_AB);
            // 点BC的弧度值
            const RADIUS_BC = Math.atan(TAN_BC);
            // 每次执行
            for (var i = 1; i <= times; i++) {
                // AD的距离
                var dist_AD = EACH_MOVE_AD * i;
                // BE的距离
                var dist_BE = EACH_MOVE_BE * i;
                // D点的坐标
                var point_D = {};
                point_D['x'] = dist_AD * Math.cos(RADIUS_AB) + points[0]['x'];
                point_D['y'] = dist_AD * Math.sin(RADIUS_AB) + points[0]['y'];
                points_D.push(point_D);
                // E点的坐标
                var point_E = {};
                point_E['x'] = dist_BE * Math.cos(RADIUS_BC) + points[1]['x'];
                point_E['y'] = dist_BE * Math.sin(RADIUS_BC) + points[1]['y'];
                points_E.push(point_E);
                // 此时线段DE的正切值
                var tan_DE = (point_E['y'] - point_D['y']) / (point_E['x'] - point_D['x']);
                // tan_DE的弧度值
                var radius_DE = Math.atan(tan_DE);
                // 地市DE的间距
                var dist_DE = Math.sqrt(Math.pow(point_E['x'] - point_D['x'], 2) + Math.pow(point_E['y'] - point_D['y'], 2));
                // 此时DF的距离
                var dist_DF = (dist_AD / DIST_AB) * dist_DE;
                // 此时DF点的坐标
                var point_F = {};
                point_F['x'] = dist_DF * Math.cos(radius_DE) + point_D['x'];
                point_F['y'] = dist_DF * Math.sin(radius_DE) + point_D['y'];
                bezier_points.push(point_F);
            }
            return {
                bezier_points: bezier_points
            };
        },

        ww: '',
        hh: ''
    }
};
</script>
<style>
@import './app.css';
</style>
