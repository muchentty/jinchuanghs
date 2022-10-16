<template>
	<view class="content">
		<view class="list">
			<view class="item1">
				<view class="item_left">
					{{touxiang}}
				</view>
				<view class="item_right">
					<view class="headimg" @click="upload">
						<image src="../../static/banner.png" mode=""></image>
					</view>
					<view class="right_img">
						<image src="../../static/ic_ri.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="item_left">
					{{nicheng}}
				</view>
				<view class="item_right">
					<view class="right_txt">
						<input v-model="profile.nickname" @confirm="editname"/>
					</view>
					<view class="right_img">
						<image src="../../static/ic_ri.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="item_left">
					{{shouji}}
				</view>
				<view class="item_right">
					<view class="right_txt">
						{{profile.mobile}}
					</view>
					<view class="right_img">
						<image src="../../static/ic_ri.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="solid">

			</view>
			<!-- <view class="item">
				<view class="item_left">
					生日
				</view>
				<view class="item_right">
					<view class="right_txt">
						1993-03-06
					</view>
					<view class="right_img">
						<image src="../../static/ic_ri.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="item_left">
					性别
				</view>
				<view class="item_right">
					<view class="right_txt">
						男
					</view>
					<view class="right_img">
						<image src="../../static/ic_ri.png" mode=""></image>
					</view>
				</view>
			</view> -->
		</view>
		<view class="information-content-bottom" @click="Logout">
			<button type="default">{{tuichudenglu}}</button>
		</view>
	</view>
</template>

<script>
	import config from 'utils/config.js'
	export default {
		data() {
			return {
				zhenshixingming: '',
				tuichudenglu: '',
				gengxinchenggong: '',
				shenfenzheng: '',
				weishezhi: '',
				touxiang: '',
				nicheng: '',
				xingbie: '',
				shouji: '',
				youxiang: '',
				nan: '',
				nv: '',
				profile: [],
				upload_avatar: '',
			}
		},
		methods: {
			Logout() {
				this.$request('/api/auth/quit', {}, 'post', {}).then(res => {
			
					if (res.code == 1) {
			
						uni.switchTab({
							url: '../user/user'
						})
						uni.setStorageSync('retoken', '')
						uni.setStorageSync('wtoken', '');
						uni.setStorageSync('expire', '');
					}
				})
			},
			editname(){
				this.$request('/api/member/update_profile', {
					nickname: this.profile.nickname
				}, 'post', {}, true).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title:'更改成功',
							icon:'none'
						})
					} else {
						uni.showToast({
							title: res.msg
						})
					}
				})
			},
			getprofile() {
				this.$request('/api/member/profile', {}, 'post', {}, true).then(res => {

					if (res.code === 1) {
						this.profile = res.data.profile;
						if (this.profile.gender == 0) {
							this.profile.gender = this.weishezhi
						} else if (this.profile.gender == 1) {
							this.profile.gender = this.nan
						} else {
							this.profile.gender = this.nv
						}
					}
				})
			},
			upload() {
				let token = uni.getStorageSync('wtoken');
				let that = this
				uni.chooseImage({
					count: 1,
					success: function(res) {
						const tempFilePaths = res.tempFilePaths;

						uni.uploadFile({
							url: config.baseUrl + '/api/member/avatar',
							filePath: tempFilePaths[0],
							name: 'upload_avatar',
							formData: {
								file: tempFilePaths[0],
								token: token
							},
							success: (res) => {
								let data = JSON.parse(res.data);
								if (data.code == 1) {
									that.getprofile()
									uni.showToast({
										title: this.gengxinchenggong
									})
								}
							}
						})
					}
				});
			},
		},
		onShow() {
			this.zhenshixingming = this.$lang.zhenshixingming[uni.getStorageSync('lang')];
			this.tuichudenglu = this.$lang.tuichudenglu[uni.getStorageSync('lang')];
			this.gengxinchenggong = this.$lang.gengxinchenggong[uni.getStorageSync('lang')];
			this.shenfenzheng = this.$lang.shenfenzheng[uni.getStorageSync('lang')];
			this.weishezhi = this.$lang.weishezhi[uni.getStorageSync('lang')];
			this.touxiang = this.$lang.touxiang[uni.getStorageSync('lang')];
			this.nicheng = this.$lang.nicheng[uni.getStorageSync('lang')];
			this.xingbie = this.$lang.xingbie[uni.getStorageSync('lang')];
			this.shouji = this.$lang.shouji[uni.getStorageSync('lang')];
			this.youxiang = this.$lang.youxiang[uni.getStorageSync('lang')];
			this.nan = this.$lang.nan[uni.getStorageSync('lang')];
			this.nv = this.$lang.nv[uni.getStorageSync('lang')];
			this.getprofile()
		}
	}
</script>

<style>
	.content {
		height: 100%;
	}

	.list {
		/* padding: 0rpx 30rpx; */
	}

	.item1 {
		display: flex;
		justify-content: space-between;
		height: 140rpx;
		line-height: 140rpx;
		border-bottom: 1rpx solid #f7f7f7;
	}

	.item_left {
		margin-left: 22rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 32rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.headimg {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background-color: #e3e3e3;
	}

	.headimg image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.right_img image {
		width: 28rpx;
		height: 28rpx;

		margin-left: 20rpx;
	}

	.item_right {
		display: flex;
		margin-right: 18rpx;
		align-items: center;
	}

	.item {
		display: flex;
		justify-content: space-between;
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: 1rpx solid #f7f7f7;
	}

	.right_txt {
		color: rgba(151, 151, 151, 100);
		font-size: 28rpx;
		text-align: right;
		font-family: PingFangSC-regular;
	}

	.solid {
		height: 20rpx;
		width: 750rpx;
		background-color: #f7f7f7;
	}
	.information-content-bottom button {
		background-color: #63B4D2;
		width: 690rpx;
		height: 84rpx;
		line-height: 84rpx;
		text-align: center;
		color: #EDEDED;
		margin-top: 200rpx;
		font-size: 30rpx;
	}
</style>
