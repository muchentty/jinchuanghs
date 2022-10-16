<template>
	<view>
		<view class="food-top">
		<!-- 	<view class="feature"> -->
				<swiper class="swiper" :previous-margin="previous" :next-margin='next' :circular="true"
					@change="swiperChange">
					<swiper-item v-for="(item,index) in swiper.list" :key="index">
				<!-- 		<image class='le-img' :src='item' :class="{'le-active':swiper.index == index}"></image> -->
						<view :class="swiper.index == index ? 'food-top-item' : 'food-top-items'" @click="introduce">
							<view :class="swiper.index == index ? 'food-top-img' : 'food-top-imgs'">
								<image :src="item"></image>
							</view>
							<view class="food-top-introduce" v-show="swiper.index == index">xxxxxxxxxxxxxxxxxxxxxxxxx</view>
							<view class="food-top-name" v-show="swiper.index == index">手工炮仗</view>
						</view>
					</swiper-item>
				</swiper>
				<!-- <view class="food-top-item" @click="introduce">
					<view class="food-top-imgs">
						<image src=""></image>
					</view>
					<view class="food-top-introduce">xxxxxxxxxxxxxxxxxxxxxxxxx</view>
					<view class="food-top-name">手工炮仗</view>
				</view>
				<view class="food-top-items">
					<view class="food-top-imgs">
						<image src=""></image>
					</view>
					<view class="food-top-introduces">xxxxxxxxxxxxxxxxxxxxxxxxx</view>
				</view> -->
	<!-- 		</view> -->
		</view>
		<view class="shop-sign">
			<view class="signboard-warp">
				<view class="signboard-name">招牌美食TOP5</view>
				<view class="signboard">
					<view class="signboard-item">
						<image src="../../static/are.png"></image>
						<view>美食名称</view>
					</view>
					<view class="signboard-item">
						<image src="../../static/are.png"></image>
						<view>美食名称</view>
					</view>
					<view class="signboard-item">
						<image src="../../static/are.png"></image>
						<view>美食名称</view>
					</view>
					<view class="signboard-item">
						<image src="../../static/are.png"></image>
						<view>美食名称</view>
					</view>
					<view class="signboard-item">
						<image src="../../static/are.png"></image>
						<view>美食名称</view>
					</view>
				</view>
			</view>
			<view class="delicious">
				<view class="delicious-item" v-for="(item,index) in venue" :key="index" @click="detail(item)">
					<view class="delicious-img">
						<image :src="item.cover"></image>
					</view>
					<view class="delicious-content">
						<view class="delicious-name">{{item.name}}</view>
						<view>{{item.tel}}</view>
						<view class="adress">{{item.address}}</view>
					</view>
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
				c_id: '9',
				venue: [],
				previous: '0',
				next: '290rpx',
				swiper: {
					margin: "100rpx",
					index: 0,
					list: [
						"../../static/banner.png",
						"../../static/bj.jpg",
						"../../static/bjs.png",
					]
				}
			}
		},
		methods: {
			detail(item) {
				uni.navigateTo({
					url: '../food-detail/food-detail?id=' + item.id
				})
			},
			//swiper滑动事件
			swiperChange: function(e) {
				this.swiper.index = e.detail.current;
			},
			introduce() {
				uni.navigateTo({
					url: '../food-introduce/food-introduce'
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
			}
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
	.swiper {
		width: 100%;
		height: 730rpx;
		/* padding-left: 58rpx; */
		padding-top: 34rpx;
		margin-left: 20rpx;
	}

	.food-top {
		width: 750rpx;
		height: 452rpx;
		background-color: #E6E6E7;
	}

	.feature {
		/* padding: 34rpx 58rpx; */
		/* display: flex;
		overflow-x: scroll; */
	}

	.food-top-item {
		width: 378rpx;
		height: 554rpx;
		border-radius: 20rpx;
		box-shadow: 0px 4rpx 12rpx 0px rgba(0, 0, 0, 0.4);
		position: relative;
		/* margin-right: 30rpx; */
		background-color: #E6E6E7;
		margin-left: 28rpx;
	}

	.food-top-item image {
		width: 378rpx;
		height: 554rpx;
		border-radius: 20rpx;
	}

	.food-top-introduce {
		position: absolute;
		bottom: 22rpx;
		left: 20rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 32rpx;
		font-family: PingFangSC-regular;
		width: 328rpx;
		text-overflow: ellipisis;
		white-space: nowrap;
		overflow: hidden;
	}

	.food-top-name {
		position: absolute;
		top: 50rpx;
		left: -28rpx;
		writing-mode: vertical-lr;
		width: 36rpx;
		background-color: rgba(255, 255, 255, 100);
		border: 2rpx solid rgba(187, 187, 187, 100);
		border-radius: 16rpx;
		padding: 20rpx 16rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 32rpx;
	}

	.food-top-items {
		width: 348rpx;
		height: 510rpx;
		border-radius: 20rpx;
		box-shadow: 0px 4rpx 12rpx 0px rgba(0, 0, 0, 0.4);
		position: relative;
		/* margin-right: 30rpx; */
		margin-top: 22rpx;
		background-color: #E6E6E7;
	}

	.food-top-items image {
		width: 348rpx;
		height: 510rpx;
		border-radius: 20rpx;
	}

	.food-top-introduces {
		position: absolute;
		bottom: 22rpx;
		left: 20rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 32rpx;
		font-family: PingFangSC-regular;
		width: 300rpx;
		text-overflow: ellipisis;
		white-space: nowrap;
		overflow: hidden;
	}

	.food-top-names {
		position: absolute;
		top: 50rpx;
		left: -28rpx;
		writing-mode: vertical-lr;
		width: 36rpx;
		background-color: rgba(255, 255, 255, 100);
		border: 2rpx solid rgba(187, 187, 187, 100);
		border-radius: 16rpx;
		padding: 20rpx 16rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 32rpx;
	}

	.shop-sign {
		width: 690rpx;
		background-color: rgba(255, 255, 255, 100);
		box-shadow: 0px 4rpx 12rpx 0px rgba(0, 0, 0, 0.4);
		margin: 180rpx 30rpx;
	}

	.signboard-name {
		color: rgba(16, 16, 16, 100);
		font-size: 36rpx;
		font-family: PingFangSC-regular;
		padding: 36rpx 30rpx;
	}

	.signboard-item image {
		width: 114rpx;
		height: 114rpx;
		border-radius: 50%;
	}

	.signboard {
		display: flex;
		margin: 0 16rpx;
		justify-content: space-between;
		text-align: center;
	}

	.signboard-item view {
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
	}

	.delicious {
		padding: 32rpx 0;
	}

	.delicious-item {
		display: flex;
		border-radius: 20rpx;
		background-color: rgba(255, 255, 255, 100);
		height: 218rpx;
		box-shadow: 0px 2rpx 8rpx 0px rgba(0, 0, 0, 0.4);
		margin-bottom: 20rpx;
	}

	.delicious-img image {
		width: 330rpx;
		height: 218rpx;
		border-radius: 20rpx 0px 0px 20rpx;
	}

	.delicious-content {
		margin-left: 20rpx;
		color: rgba(153, 153, 153, 100);
		font-size: 24rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.delicious-name {
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		margin-top: 24rpx;
		margin-bottom: 26rpx;
	}
	.adress {
		margin-top: 20rpx;
	}
</style>
