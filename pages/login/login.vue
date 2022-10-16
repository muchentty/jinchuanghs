<template>
	<view class="login">
		<view class="weloce">{{huanyingdengluzhihuishuziwenlvtong}}</view>
		<view class="user">
			<view class="name">
				<view>{{yonghuming}}</view>
				<view class="input">
					<input type="text" v-model="username" @input="userName" :placeholder="qingshuruyonghuming" />
				</view>
			</view>
			<view class="name">
				<view>{{mima}}</view>
				<view class="input">
					<input type="password" v-model="passWord" @input="password" :placeholder="qingshurumima" />
				</view>
			</view>
		</view>
		<view>
			<button class="btn" @click="login">{{denglu}}</button>
			<view class="no">{{huanmeizhuce}}，<text class="go" @click="reg">{{quzhuce}}</text></view>
			<!-- <button type="primary" @tap="getUserInfo">{{weixin}}{{denglu}}</button> -->
			<view class="no" v-if="is_wx">{{weixin}}<text class="go" @click="getUserInfo">{{denglu}}</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				huanyingdengluzhihuishuziwenlvtong: '',
				qingshuruyonghuming: '',
				qingshurumima: '',
				huanmeizhuce: '',
				dengluchenggong: '',
				yonghuming: '',
				quzhuce: '',
				mima: '',
				denglu: '',
				weixin: '',
				username: '',
				passWord: '',
				is_wx:'0',
			}
		},
		onLoad(e) {
			this.huanyingdengluzhihuishuziwenlvtong = this.$lang.huanyingdengluzhihuishuziwenlvtong[uni.getStorageSync(
				'lang')];
			this.qingshuruyonghuming = this.$lang.qingshuruyonghuming[uni.getStorageSync('lang')];
			this.qingshurumima = this.$lang.qingshurumima[uni.getStorageSync('lang')];
			this.huanmeizhuce = this.$lang.huanmeizhuce[uni.getStorageSync('lang')];
			this.dengluchenggong = this.$lang.dengluchenggong[uni.getStorageSync('lang')];
			this.yonghuming = this.$lang.yonghuming[uni.getStorageSync('lang')];
			this.quzhuce = this.$lang.quzhuce[uni.getStorageSync('lang')];
			this.mima = this.$lang.mima[uni.getStorageSync('lang')];
			this.denglu = this.$lang.denglu[uni.getStorageSync('lang')];
			this.weixin = this.$lang.weixin[uni.getStorageSync('lang')];
			let that = this
			//#ifdef H5
			let ua = window.navigator.userAgent.toLowerCase()
			if (ua.match(/MicroMessenger/i) != 'micromessenger' && window.location.host.indexOf("localhost") == -1) {
				this.is_wx = 1;
			}
			//#endif
			
			
			if(e.code){
				console.log(e.code)
				
				this.$request('/api/auth/wxUserInfo', {
					code:e.code
				}, 'post').then(res1 => {
					this.$request('/api/auth/wxLogin', {
						wxid: 1,
						code: 'the code is from h5',
						rawData:res1.data,
					}, 'post').then(res => {
						console.log(res)
						if (res.code == 1) {
							let token = res.data.token;
							let resToken = res.data.refresh_token;
							let expire = res.data.expire_in + res.time;
							uni.showToast({
								title: that.dengluchenggong,
								icon: 'none'
							})
						
							uni.setStorageSync('wtoken', token);
							uni.setStorageSync('retoken', resToken);
							uni.setStorageSync('expire', expire);
							var pages = getCurrentPages(); // 当前页面
							
							var beforePage = pages[pages.length - 2]; // 前一个页面
							console.log(beforePage)
							if(beforePage=='undefined' || beforePage==undefined || beforePage=='' || beforePage==null){
								uni.switchTab({
									url: '../index/index'
								})
							}else{
								uni.navigateBack({
								    // success: function() {
								    //     beforePage.onLoad(); // 执行前一个页面的onLoad方法
								    // }
								});
							}
							
							// uni.navigateBack()
							// uni.switchTab({
							// 	url: '../index/index'
							// })
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					})
				})
			}
		},
		methods: {
			getUserInfo(){
				// this.login()
				let url = encodeURIComponent("https://api.jcwenlvyun.com/wx.php")
				console.log(url)
				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe291ac50970adcb3&redirect_uri='+url+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
				// console.log(this.code);
				// if(this.code){
				// 	//将onLoad中的获取token方法放进来即可
				// } else {
				// 	//没有code就去获取code
				// }

			},
			reg() {
				uni.navigateTo({
					url: '../register/register'
				})
			},
			userName(e) {
				this.username = e.detail.value
			},
			password(e) {
				this.passWord = e.detail.value
			},
			login() {
				let that = this
				this.$request('/api/auth/login', {
					username: that.username,
					password: that.passWord
				}, 'post').then(res => {
					console.log(res)
					if (res.code == 1) {
						console.log(res)
						let token = res.data.token;
						let resToken = res.data.refresh_token;
						let expire = res.data.expire_in + res.time;
						uni.showToast({
							title: that.dengluchenggong,
							icon: 'none'
						})

						uni.setStorageSync('wtoken', token);
						uni.setStorageSync('retoken', resToken);
						uni.setStorageSync('expire', expire);
						var pages = getCurrentPages(); // 当前页面
						var beforePage = pages[pages.length - 2]; // 前一个页面
						console.log(beforePage)
						console.log(beforePage.route)
						if(beforePage=='undefined' || beforePage==undefined || beforePage=='' || beforePage==null){
							uni.switchTab({
								url: '../index/index'
							})
						}else if(beforePage.route == 'pages/register/register'){
							uni.switchTab({
								url: '../index/index'
							})
						}else{
							uni.navigateBack({
							    // success: function() {
							    //     beforePage.onLoad(); // 执行前一个页面的onLoad方法
							    // }
							});
						}
					} else {
						console.log(res.msg)
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style>
	.weloce {
		font-size: 42rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #0E0F18;
		padding-top: 181rpx;
		padding-left: 61rpx;
	}

	.user {
		width: 667rpx;
		height: 445rpx;
		background: #FFFFFF;
		box-shadow: 0px 14rpx 120rpx 0px rgba(182, 182, 182, 0.42);
		border-radius: 36rpx;
		margin-left: 40rpx;
		margin-top: 136rpx;
	}

	.name {
		font-size: 25rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #333333;
		padding: 45rpx 38rpx 0rpx 38rpx;
	}

	.input {
		font-size: 32rpx;
		margin-top: 30rpx;
		padding-bottom: 30rpx;
		border-bottom: solid 1rpx #D4D4D4;
	}

	.btn {
		width: 591rpx;
		height: 84rpx;
		background: #FF4E5A;
		box-shadow: 0px 25rpx 54rpx 0px rgba(255, 113, 123, 0.4);
		border-radius: 42rpx;
		font-size: 33rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #FFFFFF;
		line-height: 84rpx;
		text-align: center;
		margin-top: 96rpx;
	}

	.no {
		margin-top: 20rpx;
		text-align: center;
		font-size: 24rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #cacaca;
	}

	.go {
		color: #FF4E5A;
	}
</style>
