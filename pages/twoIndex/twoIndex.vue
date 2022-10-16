<template>
	<view>
		<view class="bannner">
			<view class="banimg">
				<image src="../../static/banner2.png"></image>
			</view>
			<view class="language">
				<view>汉语</view>
				<view class="line"></view>
				<view class="cut">藏语</view>
			</view>
			<view class="seach">
				<image src="../../static/seach2.png"></image>
				<view>搜索你感兴趣的内容</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.bannner {
	position: relative;
}
.banimg image{
	width: 750rpx;
	height: 485rpx;
}
.language {
	position: absolute;
	right: 64rpx;
	top: 20rpx;
	display: flex;
	width: 186rpx;
	height: 64rpx;
	background: #FFFFFF;
	border: 1rpx solid #EAEAEA;
	border-radius: 32rpx;
	font-size: 28rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	align-items: center;
	justify-content: space-around;
}
.line {
	width: 2rpx;
	height: 35rpx;
	background: #B0B0B0;
	border-radius: 1rpx;
}
.cut {
	color: #999999;
}
.seach {
	position: absolute;
	bottom: 31rpx;
	left: 30rpx;
	display: flex;
	align-items: center;
	width: 690rpx;
	height: 64rpx;
	background: rgba(255, 255, 255, 0.35);
	/* border: 1rpx solid #EAEAEA; */
	font-size: 28rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #FFFFFF;
	border-radius: 10rpx;
}
.seach image {
	width: 44rpx;
	height: 42rpx;
	margin: 0 11rpx 0 24rpx;
}
</style>
