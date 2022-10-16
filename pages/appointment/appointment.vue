<template>
	<view class="lolo">
		<view class="dates">
			<view class="yumo">请选择预约日期</view>
			<view class="datas-item">
				<view class="assigns">07-23</view>
				<view class="assigns">07-24</view>
				<view class="assign">07-25</view>
				<view class="assigns">07-26</view>
				<view class="assigns">07-27</view>
			</view>
		</view>
		<view>
			<view class="yumo">预约时间段</view>
			<view class="time-item">
				<view class="time-left">
					<view class="kk">09:00-10:00</view>
					<view class="time-num">
						<text>已预约</text>
						<text class="oo">0</text><text>/</text><text class="oo">200</text>
					</view>
				</view>
				<view class="btn">预约</view>
			</view>
			<view class="time-item">
				<view class="time-left">
					<view class="kk">10:00-11:00</view>
					<view class="time-num">
						<text>已预约</text>
						<text class="oo">0</text><text>/</text><text class="oo">200</text>
					</view>
				</view>
				<view class="btn">预约</view>
			</view>
			<view class="time-item">
				<view class="time-left">
					<view class="kk">11:00-12:00</view>
					<view class="time-num">
						<text>已预约</text>
						<text class="oo">0</text><text>/</text><text class="oo">200</text>
					</view>
				</view>
				<view class="btn" @click="msg">预约</view>
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
			msg(){
				uni.navigateTo({
					url:'../place-msg/place-msg'
				})
			}
		}
	}
</script>

<style>
.lolo {
	height: 100%;
	background-color: #f7f7f7;
}
.datas-item {
	width: 100%;
	display: flex;
	overflow-x: scroll;
	margin-left: 30rpx;
}
.yumo {
	color: rgba(16, 16, 16, 100);
	font-size: 28rpx;
	font-family: PingFangSC-regular;
	padding: 28rpx;
}
.assigns {
	border: 2rpx solid rgba(187, 187, 187, 100);
	color: rgba(16, 16, 16, 100);
	font-size: 28rpx;
	font-family: Arial;
	padding: 8rpx 20rpx;
	/* width: 500rpx; */
	border-radius: 16rpx;
	margin-right: 30rpx;
}
.assign {
	color: rgba(24, 144, 255, 1);
	font-size: 28rpx;
	text-align: center;
	font-family: Arial;
	border: 2rpx solid rgba(24, 144, 255, 1);
	padding: 8rpx 20rpx;
	border-radius: 16rpx;
	margin-right: 30rpx;
}
.time-item {
	display: flex;
	margin: 0 30rpx 20rpx 30rpx;
	justify-content: space-between;
	background-color: #fff;
	border-radius: 20rpx;
}
.time-left {
	padding: 20rpx;
}
.kk {
	font-weight: 600;
}
.time-num {
	font-size: 24rpx;
	color: #999;
	margin-top: 8rpx;
}
.oo {
	color: #eb0a0a;
	margin:0 4rpx;
}
.btn {
	width: 120rpx;
	color: #fff;
	background-color: #559BF1;
	border-radius: 0 20rpx 20rpx 0;
	text-align: center;
	line-height: 110rpx;
}
</style>
