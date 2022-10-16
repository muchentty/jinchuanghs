<template>
	<view>
		<view class="scent-top">
			<view class="scent-img">
				<image :src="venue.cover" mode=""></image>
			</view>
			<view class="scent-cont">
				<view class="attention">
					<view class="scent-name">{{venue.name}}</view>
					<view class="attention-img">
						<image src="../../static/ic-heart1.png" ></image>
					</view>
				</view>
				<view class="scent-status">开园中</view>
				<view class="comfort">景点舒适度:舒适</view>
				<view>空气质量：优</view>
				<view class="scent-type">国家非A级景区</view>
			</view>
		</view>
		<view class="choiceness">
			<view>精选视频</view>
			<view>精选图片</view>
		</view>
		<view class="introduce">
			<view class="introduce-name">介绍</view>
			<u-parse class="introduce-cont" :content="venue.content"></u-parse>
		</view>
		<view class="introduce">
			<view class="introduce-name">服务设施</view>
			<view class="facilities">
				<view class="facility" v-for="(item,index) in venue.facilities">
					<image class="fac-img" :src="item.icon"></image>
					<view>{{item.name}}</view>
				</view>
			</view>
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
		<view class="introduce">
			<view class="introduce-name">实用信息</view>
			<view class="msg">
				<view>
					开放时间 {{venue.start_time}} - {{venue.end_time}}
				</view>
				<view>
					开放景点 xxxxxxxxxxxx
				</view>
				<view>
					预约方式 {{venue.book}}
				</view>
				<view @click="getpone(venue.tel)">
					联系方式 {{venue.tel}}
				</view>
				<view>
					优惠政策 xxxxxxxxxxxx
				</view>
			</view>
		</view>
		<view class="introduce">
			<view class="introduce-name">当地天气</view>
			<view class="lolo"></view>
		</view>
		<view class="bottom">
			<view class="bottom-input">
				<input v-model="comment" placeholder="写评论..."/>
			</view>
			<view class="bottom-right">
				<image class="mssg" src="../../static/ic-msg.png"></image>
				<image class="like" src="../../static/ic-like.png"></image>
				<image class="share" src="../../static/ic-share.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				list:[],
				venue:[],
				comment:''
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
		onLoad(e){
			this.id = e.id
			this.$request('/api/venue/get_scenic_details', {
				id: this.id
			}, 'post', {}).then(res => {
				if (res.code === 1) {
					this.venue = res.data.venue;
					this.list = res.data.lists;
					uni.setNavigationBarTitle({
						title: this.venue.name
					})
				}
			})
		}
	}
</script>

<style>
	.scent-top {
		display: flex;
		margin: 30rpx;
	}

	.scent-img image {
		width: 318rpx;
		height: 260rpx;
		border-radius: 20rpx;
		margin-right: 38rpx;
		margin-top: 30rpx;
	}

	.scent-cont {
		color: rgba(16, 16, 16, 100);
		font-size: 24rpx;
		font-family: PingFangSC-regular;
	}

	.attention {
		margin-top: 28rpx;
		display: flex;
		align-items: center;
	}

	.attention-img image {
		width: 40rpx;
		height: 40rpx;
		margin-left: 70rpx;
	}

	.scent-name {
		color: rgba(16, 16, 16, 100);
		font-size: 36rpx;
		font-family: PingFangSC-regular;
	}

	.scent-status {
		margin-top: 18rpx;
		color: rgba(238, 164, 94, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
	}

	.comfort {
		margin-top: 24rpx;
		margin-bottom: 10rpx;
	}

	.scent-type {
		margin-top: 26rpx;
	}

	.choiceness {
		display: flex;
		margin-left: 38rpx;
		margin-top: 28rpx;
	}

	.choiceness view {
		width: 298rpx;
		height: 118rpx;
		border-radius: 20rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
		background-color: #E8E8E8;
		margin-right: 22rpx;
		padding: 28rpx 16rpx;
	}

	.introduce-name {
		margin: 58rpx 0 0 30rpx;
		border-left: solid 12rpx #52A7FF;
		padding-left: 26rpx;
	}

	.introduce-cont {
		margin: 32rpx 16rpx;
	}

	.facility {
		display: flex;
		flex-wrap: wrap;
		margin: 30rpx;
	}

	.fac-img {
		width: 48rpx;
		height: 48rpx;
		margin-right: 22rpx;
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
	.msg {
		margin: 26rpx;
		width: 630rpx;
		/* height: 280rpx; */
		border-radius: 20rpx;
		background-color: rgba(247, 247, 247, 100);
		box-shadow: 0px 4rpx 12rpx 0px rgba(0, 0, 0, 0.4);
		padding: 30rpx;
	}
	.msg view {
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
		margin-bottom: 12rpx;
	}
	.lolo {
		height: 300rpx;
	}
	.bottom {
		display: flex;
		width: 690rpx;
		padding: 20rpx 30rpx;
		justify-content: space-between;
		border-top: solid 1rpx #cecece;
		position: fixed;
		bottom: 0;
		background: #fff;
	}
	.bottom  .bottom-input {
		width: 386rpx;
		height: 56rpx;
		border-radius: 104rpx;
		background-color: rgba(244, 244, 244, 100);
		color: rgba(131, 131, 131, 100);
		font-size: 24rpx;
		font-family: PingFangSC-regular;
	}
	.bottom-input input {
		color: rgba(131, 131, 131, 100);
		font-size: 24rpx;
		font-family: PingFangSC-regular;
		padding-top: 10rpx;
		padding-left: 16rpx;
	}
	.bottom  .bottom-right {
		display: flex;
	}
	.bottom  .mssg {
		width: 40rpx;
		height: 40rpx;
		margin-right: 66rpx;
	}
	.bottom  .like {
		width: 40rpx;
		height: 40rpx;
		margin-right: 68rpx;
	}
	.bottom  .share {
		width: 40rpx;
		height: 40rpx;
	}
	.facilities {
		display: flex;
		flex-wrap: wrap;
	}
</style>
