<template>
	<view>
		<view class="hotel">
			<view class="hotel-img">
				<image :src="venue.cover"></image>
			</view>
			<view class="environment">
				<view class="environment1">环境质量:优良</view>
				<view class="name">{{venue.name}}</view>
				<view class="address">{{venue.address}}</view>
			</view>
		</view>
		<view class="content">
			<view class="phone" @click="getpone(venue.tel)">预订酒店：{{venue.tel}}</view>
			<view class="hotel-introduction">
				<view class="introduction-name">酒店介绍</view>
				<u-parse :content="venue.content"></u-parse>
			</view>
			<view class="hotel-introduction">
				<view class="introduction-name">入离时间</view>
				<view>入住时间:{{venue.start_time}}以后 离店时间：{{venue.end_time}}以前</view>
			</view>
			<view class="hotel-introduction">
				<view class="introduction-name">订房必读</view>
				<view>xxxxxxxxxx</view>
			</view>
			<view class="traffic">
				<view class="traffic-name">交通查询</view>
				<view class="scenery-spot">
					<view class="scenic-area">
						<view>{{venue.address}}</view>
						<view>
							<image class="daohang" src="../../static/daohang.png"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="serve">
				<view class="serve-name">服务设施</view>
				<view class="facilities">
					<view class="facility" v-for="(item,index) in venue.facilities">
						<image class="fac-img" :src="item.icon"></image>
						<view>{{item.name}}</view>
					</view>
				</view>
				<!-- <view class="serveice">
					<view class="serveice-item">
						<image src="../../static/ic-dui.png"></image>
						<text>客房</text>
					</view>
					<view class="serveice-item">
						<image src="../../static/ic-dui.png"></image>
						<text>餐饮</text>
					</view>
					<view class="serveice-items">
						<image src="../../static/ic-cuo.png"></image>
						<text>宴会</text>
					</view>
					<view class="serveice-item">
						<image src="../../static/ic-dui.png"></image>
						<text>会议</text>
					</view>
					<view class="serveice-items">
						<image src="../../static/ic-cuo.png"></image>
						<text>商务</text>
					</view>
					<view class="serveice-items">
						<image src="../../static/ic-cuo.png"></image>
						<text>健身</text>
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				venue:'',
				list:[]
			}
		},
		methods: {
			getpone(phone) {
				uni.makePhoneCall({
					// 手机号
					phoneNumber: phone,
					success: (res) => {
						console.log('调用成功!')
					},
					fail: (res) => {
						console.log('调用失败!')
					}
				});
			},
		},
		onLoad(e) {
			this.id = e.id
			this.$request('/api/venue/view', {
				id: this.id
			}, 'post', {}).then(res => {
				if(res.code == 1){
					this.venue = res.data.venue
					this.list = res.data.lists
				}else{
					
				}
			})
		}
	}
</script>

<style>
	.hotel {
		position: relative;
		background-color: #f7f7f7;
	}

	.hotel-img image {
		width: 690rpx;
		height: 452rpx;
		border-radius: 20rpx;
		margin: 30rpx;
	}

	.environment1 {
		position: absolute;
		top: 50rpx;
		right: 60rpx;
		color: #fff;
		font-size: 32rpx;
	}

	.name {
		position: absolute;
		bottom: 110rpx;
		left: 60rpx;
		color: #fff;
		font-size: 48rpx;
	}

	.address {
		position: absolute;
		bottom: 60rpx;
		left: 60rpx;
		color: #fff;
		font-size: 32rpx;
	}

	.content {}

	.phone {
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
		padding: 42rpx 36rpx 24rpx 36rpx;
		border-bottom: solid 1rpx #f7f7f7;
	}

	.hotel-introduction {
		margin: 36rpx;
		font-size: 28rpx;
	}

	.introduction-name {
		font-size: 32rpx;
		margin-bottom: 10rpx;
	}

	.traffic {
		margin: 46rpx 30rpx;
		/* display: flex; */
	}

	.traffic-name {
		color: rgba(16, 16, 16, 100);
		font-size: 32rpx;
		font-family: PingFangSC-regular;
		border-left: solid 12rpx #52A7FF;
		padding-left: 26rpx;
	}

	.scenic-area {
		width: 536rpx;
		height: 88rpx;
		line-height: 88rpx;
		border-radius: 16rpx;
		background-color: rgba(255, 255, 255, 100);
		text-align: center;
		box-shadow: 0px 4rpx 12rpx 0px rgba(0, 0, 0, 0.4);
		display: flex;
		margin-left: 40rpx;
		padding: 0 30rpx;
		align-items: center;
		justify-content: space-between;
		/* 	padding: 40rpx; */
	}

	.scenery-spot {
		width: 690rpx;
		height: 128rpx;
		border-radius: 20rpx;
		background-color: #E8E8E8;
		line-height: 168rpx;
		padding-top: 40rpx;
		margin-top: 20rpx;
	}

	.daohang {
		width: 48rpx;
		height: 48rpx;
		margin-top: 22rpx;
	}
	.serve{
		margin: 46rpx 30rpx;
		padding-bottom: 30rpx;
	}
	.serve-name {
		color: rgba(16, 16, 16, 100);
		font-size: 32rpx;
		font-family: PingFangSC-regular;
		border-left: solid 12rpx #52A7FF;
		padding-left: 26rpx;
	}
	.serveice {
		display: flex;
		flex-wrap: wrap;
		border: solid 1rpx #E8E8E8;
		border-radius: 20rpx;
		padding: 30rpx;
		margin-top: 30rpx;
	}
	.serveice-item {
		display: flex;
		align-items: center;
		margin-right: 50rpx;
		margin-bottom: 30rpx;
	}
	.serveice-item image {
		width: 36rpx;
		height: 36rpx;
		margin-right: 10rpx;
	}
	.serveice-items {
		display: flex;
		align-items: center;
		margin-right: 50rpx;
		margin-bottom: 30rpx;
		color: #999;
	}
	.serveice-items image {
		width: 36rpx;
		height: 36rpx;
		margin-right: 10rpx;
	}
	.facilities {
		display: flex;
		flex-wrap: wrap;
	}
	.facility {
		display: flex;
		margin: 30rpx;
	}
	
	.fac-img {
		width: 48rpx;
		height: 48rpx;
		margin-right: 22rpx;
	}
</style>
