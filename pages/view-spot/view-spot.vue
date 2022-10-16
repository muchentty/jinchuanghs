<template>
	<view>
		<view class="view-spot">
			<view class="spot-img">
				<image :src="travel.cover"></image>
			</view>
			<view class="spot-cont">
				<view class="spot-name">
					<text>{{travel.name}}</text>
					<text class="three">AAAA级景区</text>
				</view>
				<view class="price">￥89.9</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="content">
			<view class="contact-way">
				<view class="contact-left">
					<image src="../../static/ic-phone.png"></image>
					<view>{{travel.address}}</view>
				</view>
				<view>
					<image class="right" src="../../static/ic_ri.png"></image>
				</view>
			</view>
			<view class="contact-way">
				<view class="contact-left">
					<image src="../../static/ic-phone.png"></image>
					<view>联系方式: {{travel.tel}}</view>
				</view>
				<view>
					<image class="right" src="../../static/ic_ri.png"></image>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view>
			<view class="venue-details-facilities">
				<text class="venue-details-facilities-text">配套设施</text>
			</view>
			<!-- <view class="venue-details-Parking">
				<view class="venue-details-Parking-img">
					<image src="" mode=""></image>
				</view>
				<view class="venue-details-Parking-txt">
					<text>免费停车</text>
				</view>
			</view> -->
		</view>
		<view class="jiesao">
			<view>简介</view>
			<u-parse class="jiesao-txt" :content="travel.content"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				travel:'',
				list:[]
			}
		},
		methods: {

		},
		onLoad(e){
			this.id = e.id
			this.$request('/api/venue/view', {
				id: this.id
			}, 'post', {}).then(res => {
				if (res.code == 1) {
					this.travel = res.data.venue
					this.list = res.data.list
					uni.setNavigationBarTitle({
						title: this.travel.name
					})
				}
			})
		}
	}
</script>

<style>
	.spot-img image {
		width: 750rpx;
		height: 436rpx;
	}

	.spot-cont {
		margin: 30rpx;
	}

	.spot-name {
		color: rgba(16, 16, 16, 100);
		font-size: 32rpx;
		font-family: PingFangSC-regular;
	}

	.three {
		margin-left: 10rpx;
	}

	.price {
		color: rgba(255, 52, 25, 100);
		font-size: 32rpx;
	}

	.line {
		width: 100%;
		height: 20rpx;
		background-color: rgba(247, 247, 247, 100);
	}

	.contact-way {
		display: flex;
		justify-content: space-between;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		padding: 28rpx 0 24rpx 0;
		border-bottom: solid 1rpx #eeeeee;
		margin: 0 30rpx;
	}

	.contact-left {
		display: flex;

	}

	.contact-left image {
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
	}

	.right {
		width: 30rpx;
		height: 30rpx;
	}
	.venue-details-area-item,
	.venue-details-area-item1,
	.venue-details-facilities,
	.venue-details-show,
	.venue-booking {
		padding: 30rpx 30rpx 0 30rpx;
	}
	.venue-details-facilities-text {
		width: 126rpx;
		height: 31rpx;
		font-size: 32rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #333333;
		line-height: 36rpx;
	}
	
	.venue-details-Parking {
		margin-top: 40rpx;
		height: 100rpx;
	}
	
	.venue-details-Parking image {
		width: 44rpx;
		height: 44rpx;
		margin-left: 88rpx;
	}
	
	.venue-details-Parking-txt text {
		width: 81rpx;
		height: 27rpx;
		font-size: 28rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #666666;
		line-height: 36rpx;
		margin-left: 69rpx;
		margin-top: 19rpx;
	}
	.jiesao {
		margin: 30rpx;
	}
	.jiesao-txt {
		margin-top: 20rpx;
		font-size: 28rpx;
		padding-bottom: 30rpx;
	}
</style>
