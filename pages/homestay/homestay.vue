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
		<view class="homestay">
			<view class="homestay-item" v-for="(item,index) in venue" :key="index" @click="detail(item)">
				<view class="homestay-img">
					<image :src="item.cover"></image>
				</view>
				<view class="homestay-cont">
					<view class="homestay-name">{{item.name}}</view>
					<view class="start">
						<image src="../../static/start.png"></image>
						<image src="../../static/start.png"></image>
						<image src="../../static/start.png"></image>
						<image src="../../static/start.png"></image>
					</view>
					<view class="phone">{{item.tel}}</view>
					<view class="address">{{item.address}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				venue:[],
				area:'1',
				c_id:'10'
			}
		},
		methods: {
			detail(item) {
				uni.navigateTo({
					url: '../homestay-detail/homestay-detail?id=' + item.id
				})
			},
			getList() {
				this.$request('/api/venue/get_list', {
					area: this.area,
					cate: this.c_id,
					pagesize: '10',
					page: '1'
				}, 'post', {}).then(res => {
					this.venue = res.data.lists
				})
			},
			carea(){
				uni.navigateTo({
					url:'../hierarchy/hierarchy'
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
				uni.setStorageSync('area',this.area)
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

	.homestay {
		margin: 26rpx 30rpx;
	}

	.homestay-item {
		display: flex;
		width: 690rpx;
		height: 218rpx;
		border-radius: 20rpx;
		background-color: rgba(255, 255, 255, 100);
		box-shadow: 0px 2rpx 8rpx 0px rgba(0, 0, 0, 0.4);
		margin-bottom: 20rpx;
	}

	.homestay-img image {
		width: 330rpx;
		height: 218rpx;
		border-radius: 20rpx 0px 0px 20rpx;
	}

	.start {
		display: flex;
		margin-top: 6rpx;
	}

	.start image {
		width: 26rpx;
		height: 26rpx;
	}

	.homestay-cont {
		margin-left: 20rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
		margin-top: 24rpx;
	}

	.phone,
	.address {
		color: rgba(153, 153, 153, 100);
		font-size: 24rpx;
		font-family: PingFangSC-regular;
	}

	.phone {
		margin-top: 18rpx;
		margin-bottom: 8rpx;
	}
</style>
