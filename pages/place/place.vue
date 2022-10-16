<template>
	<view>
		<view class="lolo">
			<view class="detail-img">
				<image :src="yard.cover"></image>
			</view>
		</view>
		<view class="content">
			<view class="name">{{yard.name}}</view>
			<view class="contact-way">
				<view class="contact-left" @click="getpone(yard.tel)">
					<image src="../../static/ic-phone.png"></image>
					<view>联系方式: {{yard.tel}}</view>
				</view>
				<view>
					<image class="right" src="../../static/ic_ri.png"></image>
				</view>
			</view>
			<view class="time">
				<view class="time-img">
					<image src="../../static/ic-time.png"></image>
				</view>
				<view>开馆时间:{{yard.start_time}}</view>
			</view>
			<view class="times">
				<view class="time-img">
					<image src="../../static/ic-time.png"></image>
				</view>
				<view>闭馆时间:{{yard.end_time}}</view>
			</view>
		</view>
		<view class="line"></view>
		<view>
			<view class="venue-details-facilities">
				<text class="venue-details-facilities-text">配套设施</text>
			</view>
			<view>
				<view class="venue-details-Parking" v-for="(item,index) in yard.facilities">
					<view class="venue-details-Parking-img">
						<image :src="item.icon" mode=""></image>
					</view>
					<view class="venue-details-Parking-txt">
						<text>{{yard.name}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="jiesao">
			<view>场地介绍</view>
			<u-parse :content="yard.content" class="jiesao-txt"></u-parse>
		</view>
		<view class="bton" @click="appointment">
			<button>立即预订</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				yard:''
			}
		},
		methods: {
			appointment(){
				uni.navigateTo({
					url:'../appointment/appointment?id=' + this.id
				})
			},
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
		onLoad(e){
			this.id = e.id
			this.$request('/api/venue/view_yard', {
				id: this.id
			}, 'post', {}).then(res => {
				if (res.code == 1) {
					this.yard = res.data.yard
				}
			})
		}
	}
</script>

<style>
	.lolo {
		position: relative;
	}

	.detail-img {
		width: 750rpx;
		height: 454rpx;
		/* position: relative; */
	}

	.detail-img image {
		width: 100%;
		height: 100%;
		/* 	position: relative; */
	}

	.select {
		position: absolute;
		bottom: 16rpx;
		right: 26rpx;
		display: flex;
		width: 170rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 62rpx;
		font-size: 10rpx;
		background-color: #999999;
		color: #ffffff;
	}

	.img {
		width: 95rpx;
		text-align: center;
		border-radius: 62rpx;
		background-color: #1890FF;
	}

	.video {
		width: 78rpx;
		text-align: center;
	}

	.imgs {
		width: 78rpx;
		text-align: center;
	}

	.videos {
		width: 95rpx;
		text-align: center;
		border-radius: 62rpx;
		background-color: #1890FF;
	}

	.content {
		margin: 24rpx 30rpx;
	}

	.name {
		color: #101010;
		font-size: 36rpx;
		font-family: PingFangSC-regular;
		border-bottom: solid 1rpx #eeeeee;
		padding-bottom: 14rpx;
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

	.time {
		display: flex;
	/* 	align-items: center; */
		padding: 28rpx 0 24rpx 0;
		border-bottom: solid 1rpx #eeeeee;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.times {
		display: flex;
/* 		align-items: center; */
		padding: 28rpx 0 0rpx 0;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.time-img image {
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
		margin-top: 4rpx;
	}

	.line {
		height: 20rpx;
		background-color: #f7f7f7;
	}

	.traffic {
		margin: 30rpx;
		/* display: flex; */
	}

	.traffic-name {
		color: rgba(16, 16, 16, 100);
		font-size: 32rpx;
		font-family: PingFangSC-regular;
		border-left: solid 12rpx #52A7FF;
		padding-left: 26rpx;
	}
	
	.scenic-area{
		width: 536rpx;
		height: 88rpx;
		line-height: 88rpx;
		border-radius: 16rpx;
		background-color: rgba(255, 255, 255, 100);
		text-align: center;
		box-shadow: 0px 4rpx 12rpx 0px rgba(0, 0, 0, 0.4);
		display: flex;
		margin-left: 40rpx;
		padding:0 30rpx;
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
	.weather {
		height: 442rpx;
		margin: 0 30rpx;
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
		padding-bottom: 140rpx;
	}
	.jiesao-txt {
		margin-top: 20rpx;
		font-size: 28rpx;
	}
	.bton {
		width: 100%;
		height: 120rpx;
		background-color: #ffffff;
		position: fixed;
		bottom: 0;
	}
	.bton button {
		width: 100%;
		height: 90rpx;
		background-color: #52A7FF;
		color: #ffffff;
		font-size: 36rpx;
		text-align: center;
		font-family: Arial;
		line-height: 90rpx;
		border-radius: 0rpx;
		position: fixed;
		bottom: 30rpx;
	}
</style>
