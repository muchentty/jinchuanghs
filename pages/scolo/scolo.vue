<template>
	<view class="consult">
		<view class="consult-top">
			<!-- <view class="area">
				<view>区域</view>
				<view class="area-img">
					<image src="../../static/ic_drop-down.png"></image>
				</view>
			</view>
			<view class="all">
				<view>咨讯</view>
				<view class="all-img">
					<image src="../../static/ic_drop-down.png"></image>
				</view>
			</view> -->
		</view>
		<view class="content">
			<view class="consult-item" v-for="(item,index) in lists"  @click="detail(item)">
				<view class="consult-img">
					<image :src="item.cover"></image>
				</view>
				<view class="consult-details">
					<view class="consult-name">{{item.title}}</view>
					<!-- <view>来源:xxx文化云</view>
					<view class="time">2022-07-19 11:22:18</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists:[]
			}
		},
		methods: {
			detail(item){
				uni.navigateTo({
					url:'../participation-details/participation-details?id='+item.id
				})
			}
		},
		onShow(){
			let type = 'race';
			this.$request('/api/member/collection_list', {type:type}, 'post', {}, true).then(res => {
			
				if (res.code == 1) {
					this.lists = res.data.lists;
			
				} 
			})
		}
	}
</script>

<style>
.consult-top {
	display: flex;
	padding-bottom: 20rpx;
	align-items: center;
	border-bottom: solid 1rpx #dedede;
	padding-left: 30rpx;
	padding-top: 20rpx;
}
.area {
	display: flex;
	margin-right: 166rpx;
	align-items: center;
}
.area-img image{
	width: 26rpx;
	height: 16rpx;
	margin-left: 14rpx;
}
.all {
	display: flex;
	align-items: center;
}
.all-img image{
	width: 26rpx;
	height: 16rpx;
	margin-left: 14rpx;
}
.content {
	margin: 40rpx 28rpx;
}
.consult-item {
	display: flex;
	padding-bottom: 26rpx;
	margin-bottom: 20rpx;
	border-bottom: solid 1rpx rgba(153, 153, 153, 0.17);
}
.consult-img image {
	width: 300rpx;
	height: 180rpx;
	border-radius: 10rpx;
}
.consult-details {
	margin-top: 4rpx;
	margin-left: 28rpx;
	color: rgba(153, 153, 153, 100);
	font-size: 24rpx;
	text-align: left;
	font-family: PingFangSC-regular;
}
.consult-name {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	margin-bottom: 20rpx;
	font-size: 28rpx;
	color: #101010;
}
.time {
	margin-top: 10rpx;
}
</style>
