<template>
	<view>
		<view class="active">
			<image src="../../static/lv.png"></image>
		</view>
		<view class="staru">预订成功,如需查看订单请到个人中心查看</view>
		<view class="accomplish" @click="accomplish">完成</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			accomplish(){
				uni.navigateTo({
					url:'../carny-detail/carny-detail'
				})
			}
		}
	}
</script>

<style>
.active {
	width: 270rpx;
	height: 270rpx;
	border: 10rpx solid rgba(26, 211, 114, 1);
	border-radius: 50%;
	text-align: center;
	margin: 100rpx auto 26rpx auto;
}
.active image {
	width: 100rpx;
	height: 100rpx;
	margin-top: 76rpx;
}
.staru {
	text-align: center;
	color: rgba(16, 16, 16, 100);
	font-size: 28rpx;
	font-family: PingFangSC-regular;
}
.accomplish {
	width: 640rpx;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 90rpx;
	background-color: rgba(82, 167, 255, 100);
	color: rgba(255, 255, 255, 100);
	font-size: 28rpx;
	text-align: center;
	font-family: Arial;
	margin-top: 334rpx;
	margin-left: 56rpx;
}
</style>
