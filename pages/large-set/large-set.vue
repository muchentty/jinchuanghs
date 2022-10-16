<template>
	<view>
		<view class="home">
			<swiper indicator-dots circular autoplay interval=3000 style="height:430rpx;width:100%">
				<swiper-item class="home">
					<image src="../../static/banner.png"></image>
				</swiper-item>
				<swiper-item class="home">
					<image src="../../static/banner.png"></image>
				</swiper-item>
			</swiper>
		</view>
		<view>
			<view class="creative">
				<image src="../../static/index-title2.png"></image>
			</view>
			<view class="creative-warp">
				<view class="creative-item" v-for="(item,index) in lists" @click="detail(item)">
					<view class="creative-img">
						<image :src="item.cover"></image>
					</view>
					<view class="txt-name">{{item.name}}</view>
					<view class="money">￥{{item.price}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				area:'9784',
				lists:[],
				total:0
			}
		},
		methods: {
			detail(item){
				uni.navigateTo({
					url:'../large-set-detail/large-set-detail?id=' + item.id
				})
			}
		},
		onLoad(e){
			if (e.area == 'undefined' || e.area == undefined || e.area == '' || e.area == null) {
				if (uni.getStorageSync('area')) {
					this.area = uni.getStorageSync('area')
				}
			} else {
				this.area = e.area
				uni.setStorageSync('area',this.area)
			}
			this.$request('/api/goods/index', {
				area:this.area
			}, 'get',{}).then(res => {
				console.log(res)
				if(res.code == 1){
					this.lists = res.data.lists.data
					this.total = res.data.lists.total
				}
			})
		}
	}
</script>

<style>
	.home {
		width: 750rpx;
		height: 436rpx;
	}

	.home image {
		width: 100%;
		height: 100%;
	}

	.creative {
		width: 100%;
		text-align: center;
		margin-top: 24rpx;
	}

	.creative image {
		width: 390rpx;
		height: 86rpx;
		/* margin: auto; */
	}

	.creative-warp {
		display: flex;
		flex-wrap: wrap;
		margin: 30rpx 24rpx 0 24rpx;
		justify-content: space-between;
	}

	.creative-item {
		width: 340rpx;
		background: #f6f6f6;
		margin-bottom: 20rpx;
	}

	.creative-img image {
		width: 340rpx;
		height: 210rpx;
	}

	.txt-name {
		text-align: center;
		margin: 10rpx 8rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
		overflow: hidden;
		font-size: 28rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
	}

	.money {
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: normal;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		font-size: 28rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #B3382D;
		text-align: center;
		padding-bottom: 20rpx;
	}
</style>
