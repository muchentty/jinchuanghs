<template>
	<view>
		<view class='seach-top'>
			<view class="seach-left">
				<view class="seach-img">
					<image src="../../static/ic_search.png"></image>
				</view>
				<input placeholder="搜索"/>
			</view>
			<view>取消</view>
		</view>
		<view class="past">
			<view class="past-records">
				<view>搜索历史</view>
				<view class="del">
					<image src="../../static/del.png"></image>
				</view>
			</view>
			<view class="seach-item">
				<view>大蒜</view>
				<view>新冠疫情</view>
				<view>肺炎</view>
				<view>口罩</view>
				<view>疫情实时监控</view>
			</view>
			<view class="hot-records">
				<view>热门搜索</view>
			</view>
			<view class="seach-item">
				<view>大蒜</view>
				<view>新冠</view>
				<view>疫情</view>
				<view>肺炎</view>
				<view>口罩</view>
				<view>疫情实时监控</view>
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
.seach-top{
	display:flex;
	padding:0 24rpx 36rpx 40rpx;
	color: rgba(0, 0, 0, 100);
	font-size: 28rpx;
	font-family: PingFangSC-regular;
	align-items:center;
}
.seach-left {
	display:flex;
	align-items:center;
	width: 578rpx;
	height: 66rpx;
	border-radius: 40rpx;
	background-color: rgba(235, 235, 235, 100);
	color: rgba(170, 170, 170, 100);
	font-size: 26rpx;
	font-family: Arial;
	padding-left:26rpx;
	margin-right:20rpx;
}
.seach-img image{
	width: 40rpx;
	height: 40rpx;
	margin-right:30rpx;
}
.past {
	margin: 0rpx 30rpx 28rpx 42rpx;
}
.past-records {
	display: flex;
	font-size: 26rpx;
	font-family: PingFangSC-regular;
	justify-content: space-between;
}
.hot-records {
	font-size: 26rpx;
	font-family: PingFangSC-regular;
	justify-content: space-between;
	margin-top: 56rpx;
	margin-bottom: 8rpx;
}
.del image{
	width: 42rpx;
	height: 42rpx;
}
.seach-item {
	display: flex;
	flex-wrap: wrap;
}
.seach-item view{
	font-family: Arial;
	border: 2rpx solid rgba(235, 235, 235, 100);
	font-size: 26rpx;
	padding: 8rpx 40rpx;
	border-radius: 40rpx;
	margin-right: 24rpx;
	margin-top: 28rpx;
}
</style>
