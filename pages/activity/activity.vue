<template>
	<view>
		<view class="consult-top">
			<view class="area" @click="carea">
				<view>区域</view>
				<view class="area-img">
					<image src="../../static/ic_drop-down.png"></image>
				</view>
			</view>
			<view class="all">
				<view>全部类型</view>
				<view class="all-img">
					<image src="../../static/ic_drop-down.png"></image>
				</view>
			</view>
		</view>
		<view class="activity">
			<view class="activity-item" v-for="(item,index) in activity" :key="index" @click="activitys(item)">
				<view class="activity-img">
					<image :src="item.cover"></image>
				</view>
				<view class="sign">唱歌</view>
				<view class="activity-introduce">
					<view class="activity-name">{{item.title}}</view>
					<view>开始时间:{{item.start_time}}</view>
					<view>结束时间:{{item.end_time}}</view>
					<view>{{item.address}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				area: '1',
				activity: [],
				
			}
		},
		methods: {
			activitys(item) {
				uni.navigateTo({
					url: '../activity-index/activity-index?id=' + item.id
				})
			},
			getList() {
				this.$request('/api/activity/get_list', {
					area: this.area
				}, 'post', {}).then(res => {
					if (res.code === 1) {
						this.activity = res.data.lists;
					}
				})
			},
			carea() {
				uni.navigateTo({
					url: '../hierarchy/hierarchy'
				})
			},
		},
		onShow() {
			let that = this
			uni.$on('area', function(data) {
				that.area = data
				console.log(that.area)
				that.getList()
			})
		},
		onLoad(e) {
			if (e.area == 'undefined' || e.area == undefined || e.area == '' || e.area == null) {
				if (uni.getStorageSync('area')) {
					this.area = uni.getStorageSync('area')
				}
			} else {
				this.area = e.area
				uni.setStorageSync('area', this.area)
			}
			this.getList()
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

	.area-img image {
		width: 26rpx;
		height: 16rpx;
		margin-left: 14rpx;
	}

	.all {
		display: flex;
		align-items: center;
	}

	.all-img image {
		width: 26rpx;
		height: 16rpx;
		margin-left: 14rpx;
	}

	.activity {
		margin: 22rpx 28rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.activity-item {
		width: 690rpx;
		position: relative;
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0px 4rpx 12rpx 0px rgba(0, 0, 0, 0.4);
		border: 2rpx solid rgba(187, 187, 187, 100);
		padding-bottom: 12rpx;
		margin-bottom: 22rpx;
	}

	.activity-img image {
		width: 690rpx;
		height: 350rpx;
		border-radius: 20rpx 20rpx 0px 0px;
	}

	.sign {
		position: absolute;
		top: 294rpx;
		left: 16rpx;
		width: 72rpx;
		height: 44rpx;
		line-height: 44rpx;
		border-radius: 10rpx;
		background-color: rgba(255, 255, 255, 100);
		color: rgba(16, 16, 16, 100);
		font-size: 24rpx;
		text-align: center;
		font-family: Arial;
		border: 2rpx solid rgba(187, 187, 187, 100);
	}

	.activity-introduce {
		color: rgba(153, 153, 153, 100);
		font-size: 24rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		padding: 20rpx 20rpx 0 20rpx;
	}

	.activity-name {
		color: rgba(16, 16, 16, 100);
		font-size: 32rpx;
		margin-bottom: 6rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
</style>
