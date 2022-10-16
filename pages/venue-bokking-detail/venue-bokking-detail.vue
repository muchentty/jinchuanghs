<template>
	<view>
		<view class="tip">请像预约单位展示该码,以便入场</view>
		<view class="erweim"></view>
		<view class="refresh">
			<image src="../../static/shuaxin.png"></image>
			<view>刷新</view>
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
.tip {
	margin-top: 184rpx;
	font-size: 32rpx;
	color: #666;
	text-align: center;
}
.erweim {
	width: 400rpx;
	height: 400rpx;
	border: solid 1rpx #eee;
	margin-left: 175rpx;
	margin-top: 100rpx;
}
.refresh {
	display: flex;
	color: #FFA527;
	margin: 80rpx 320rpx;
}
.refresh image {
	width: 40rpx;
	height: 40rpx;
}
</style>
