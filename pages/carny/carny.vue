<template>
	<view>
		<view class="consult-top">
			<view class="area" @click="carea">
				<view>区域</view>
				<view class="area-img">
					<image src="../../static/ic_drop-down.png"></image>
				</view>
			</view>
			<!-- <view class="all">
				<view>全部类型</view>
				<view class="all-img">
					<image src="../../static/ic_drop-down.png"></image>
				</view>
			</view> -->
		</view>
		<view class="content">
			<view class="content-item" v-for="(item,index) in artgroup" :key="index" @click="detail(item)">
				<view class="content-img">
					<image :src="item.cover"></image>
				</view>
				<view class="cont-right">
					<view>{{item.name}}</view>
					<view class="cont-bottom">
						<view class="dd" v-for="items in item.tags">当代</view>
						<!-- <view>浏览量2020</view> -->
					</view>
				</view>
			</view>
		</view>
		<!-- <view @click="weather">天气</view>
		<view>{{log}}</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				area: '1',
				artgroup: [],
				total: 0,
				log:'',
				lat:''
			}
		},
		methods: {
			carea() {
				uni.navigateTo({
					url: '../hierarchy/hierarchy'
				})
			},
			weather() {  //https://geoapi.qweather.com/v2/city/lookup
			uni.request({
				url: 'https://geoapi.qweather.com/v2/city/lookup',
				method: 'GET',
				data:{
					location:'113.88308,22.55329',     //经度,纬度坐标
					key:'674065f562b548be92f21764baa7a893',
				},
				success: res => {
					console.log(res)
				},
				fail: () => {
				},
				complete: () => {}
			});
				// uni.request({
				// 	url: 'https://devapi.qweather.com/v7/weather/3d',
				// 	method: 'GET',
				// 	data:{
				// 		location:101010100,
				// 		key:'674065f562b548be92f21764baa7a893',
						
				// 	},
				// 	success: res => {
				// 		console.log(res)
				// 	},
				// 	fail: () => {
				// 	},
				// 	complete: () => {}
				// });
				let that = this
				uni.getLocation({
					type: 'wgs84',
					success: function (res) {
						console.log(res)
						that.log = res
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					},
					fail:function (error) {
						console.log(error)
					},
				});
			},
			detail(item) {
				uni.navigateTo({
					url: '../carny-detail/carny-detail?id=' + item.id
				})
			},
			getList() {
				this.$request('/api/artgroup/list', {
					area: this.area
				}, 'post', {}).then(res => {
					if (res.code == 200) {
						this.artgroup = res.data.data;
						console.log(this.artgroup)
						this.total = res.data.total
					}
				})
			}
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
			let that = this
			if (e.area == 'undefined' || e.area == undefined || e.area == '' || e.area == null) {
				if (uni.getStorageSync('area')) {
					this.area = uni.getStorageSync('area')
				}
			} else {
				this.area = e.area
				uni.setStorageSync('area', this.area)
			}
			this.getList()
			uni.getLocation({
				type: 'wgs84',
				success: function (res) {
					console.log(res)
					that.log = res.longitude;
					that.lat = res.latitude;
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
				},
				fail:function (error) {
					console.log(error)
				},
			});
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

	.content {
		margin: 30rpx;
	}

	.content-item {
		position: relative;
		margin-bottom: 20rpx;
	}

	.content-img image {
		width: 690rpx;
		height: 380rpx;
		border-radius: 10rpx;
	}

	.cont-right {
		width: 94%;
		position: absolute;
		bottom: 20rpx;
		left: 20rpx;
		right: 20rpx;
		color: rgba(255, 255, 255, 100);
		/* 	color: #000000; */
		font-size: 28rpx;
		font-family: PingFangSC-regular;
	}

	.cont-bottom {
		margin-top: 10rpx;
		display: flex;
		justify-content: space-between;
	}

	.dd {
		font-size: 12rpx;
		background-color: rgba(255, 255, 255, 0.33);
		padding: 2rpx 12rpx;
		border-radius: 12rpx;
	}
</style>
