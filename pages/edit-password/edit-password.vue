<template>
	<view class="user-paddword">
		<view class="user-paddword-top">
			<view class="paddword-top-item">
				<view class="top-item-left">
					{{jiumima}}
				</view>
				<view class="top-item-right">
					<input type="text" v-model="password" @input="Pwd" :placeholder="qingshurunindejiumima" />
				</view>
			</view>
			<view class="solid">

			</view>
			<view class="paddword-top-item">
				<view class="top-item-left">
					{{xinmima}}
				</view>
				<view class="top-item-right">
					<input type="text" v-model="newpassword" @input="Npwd" :placeholder="qingshurunindexinmima" />
				</view>
			</view>
			<view class="solidsmall">

			</view>
			<view class="paddword-top-item">
				<view class="top-item-left">
					{{querenmima}}
				</view>
				<view class="top-item-right">
					<input type="text" v-model="newpassword1" @input="Npwd1" :placeholder="zaicishuruxinmima" />
				</view>
			</view>
		</view>
		<view class="user-paddword-bottom">
			<button type="default" @click="sure">{{queren}}</button>
		</view>
		<view class="cancel">
			<button type="default">取消</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jiumimabunengyuxinmimaxiangtong: '',
				qingshurunindejiumima: '',
				qingshurunindexinmima: '',
				zaicishuruxinmima: '',
				liangcimimabuxiangtong: '',
				mimabunengweikong: '',
				querenmima: '',
				jiumima: '',
				xinmima: '',
				queren: '',
				password: '',
				newpassword1: '',
				newpassword: ''
			}
		},
		methods: {
			Pwd(e) {

				this.passWord = e.detail.value
			},
			Npwd(e) {

				this.newpassword = e.detail.value
			},
			Npwd1(e) {

				this.newpassword1 = e.detail.value
			},
			sure() {
				if (this.newpassword == '' || this.newpassword1 == '' || this.password == '') {
					uni.showToast({
						title: this.mimabunengweikong
					})
				} else if (this.password != this.newpassword) {
					if (this.newpassword == this.newpassword1) {
						this.$request('/api/member/change_password', {
							newpassword: this.newpassword,
							password: this.password
						}, 'post', {}, true).then(res => {
							if (res.code == 1) {
								uni.showToast({
									title: res.msg
								})
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
							}
						})
					} else {
						uni.showToast({
							title: this.liangcimimabuxiangtong,
							icon: 'none'
						})
					}

				} else if (this.password == this.newpassword) {
					uni.showToast({
						title: this.jiumimabunengyuxinmimaxiangtong,
						icon: 'none'
					})
				}
			},
			onShow(e) {
				this.jiumimabunengyuxinmimaxiangtong = this.$lang.jiumimabunengyuxinmimaxiangtong[uni.getStorageSync(
					'lang')];
				this.qingshurunindejiumima = this.$lang.qingshurunindejiumima[uni.getStorageSync('lang')];
				this.qingshurunindexinmima = this.$lang.qingshurunindexinmima[uni.getStorageSync('lang')];
				this.zaicishuruxinmima = this.$lang.zaicishuruxinmima[uni.getStorageSync('lang')];
				this.liangcimimabuxiangtong = this.$lang.liangcimimabuxiangtong[uni.getStorageSync('lang')];
				this.mimabunengweikong = this.$lang.mimabunengweikong[uni.getStorageSync('lang')];
				this.querenmima = this.$lang.querenmima[uni.getStorageSync('lang')];
				this.jiumima = this.$lang.jiumima[uni.getStorageSync('lang')];
				this.xinmima = this.$lang.xinmima[uni.getStorageSync('lang')];
				this.queren = this.$lang.queren[uni.getStorageSync('lang')];
			},
			onLoad(e) {
				this.jiumimabunengyuxinmimaxiangtong = this.$lang.jiumimabunengyuxinmimaxiangtong[uni.getStorageSync(
					'lang')];
				this.qingshurunindejiumima = this.$lang.qingshurunindejiumima[uni.getStorageSync('lang')];
				this.qingshurunindexinmima = this.$lang.qingshurunindexinmima[uni.getStorageSync('lang')];
				this.zaicishuruxinmima = this.$lang.zaicishuruxinmima[uni.getStorageSync('lang')];
				this.liangcimimabuxiangtong = this.$lang.liangcimimabuxiangtong[uni.getStorageSync('lang')];
				this.mimabunengweikong = this.$lang.mimabunengweikong[uni.getStorageSync('lang')];
				this.querenmima = this.$lang.querenmima[uni.getStorageSync('lang')];
				this.jiumima = this.$lang.jiumima[uni.getStorageSync('lang')];
				this.xinmima = this.$lang.xinmima[uni.getStorageSync('lang')];
				this.queren = this.$lang.queren[uni.getStorageSync('lang')];

			}
		}
	}
</script>

<style>
	.solid {
		height: 20rpx;
		width: 100%;
		background-color: #F9F9F9;
	}

	.solidsmall {
		height: 1rpx;
		width: 100%;
		background-color: rgba(200, 200, 200, 0.75);
	}

	.user-paddword {
		background-color: #F5F5F5;
		height: 100%;
	}

	.paddword-top-item {
		display: flex;
		justify-content: space-between;
		height: 112rpx;
		line-height: 112rpx;
		padding: 0rpx 30rpx;
		background-color: #FFFFFF;
	}

	.top-item-left {
		color: rgba(28, 34, 42, 100);
		font-size: 32rpx;
		font-family: PingFangSC-regular;
	}

	.top-item-right input {
		color: rgba(153, 153, 153, 100);
		height: 112rpx;
		line-height: 112rpx;
		width: 412rpx;

		text-align: right;
		font-family: PingFangSC-regular;
	}

	.user-paddword-bottom button {
		width: 690rpx;
		height: 92rpx;
		line-height: 92rpx;
		border-radius: 66rpx;
		background-color: #52A7FF;
		color: #ffffff;
		font-size: 36rpx;
		text-align: center;
		font-family: Arial;
		margin-left: 30rpx;
		margin-top: 400rpx;
	}
	.cancel button {
		width: 690rpx;
		height: 92rpx;
		line-height: 92rpx;
		border-radius: 66rpx;
		background-color: #b3b5b1;
		color: #ffffff;
		font-size: 36rpx;
		text-align: center;
		font-family: Arial;
		margin-left: 30rpx;
		margin-top: 100rpx;
	}
</style>
