<template>
	<view>
		<view class="lolo">
			<view class="detail-img" v-show="index==0">
				<image :src="travel.cover"></image>
			</view>
			<view class="detail-img" v-show="index==1">
				<video :src="travel.cover_video"></video>
			</view>
			<view v-if="travel.cover!=''"></view>
			<view class="select" v-else>
				<view :class="index == 1?'videos':'video'" @click="select(1)">视</view>
				<view :class="index == 0 ?'img':'imgs'" @click="select(0)">图</view>
			</view>
		</view>
		<view class="content">
			<view class="content-tips">本次行程共需2天,总里程695km</view>
			<view class="weather">
				<view class="weather-name">当地天气</view>
				<view class="weather-cont"></view>
			</view>
			<view class="getBy">
				<view class="attraction">经过景点:</view>
				<view class="attraction-warp">
					<view class="attraction-item" v-for="(item,index) in list" :key="index" @click="viewspot(item)">
						<view class="attraction-img">
							<image :src="item.cover"></image>
						</view>
						<view class="attraction-introduce">{{item.name}}</view>
					</view>
				</view>
				<view class="fingerpost">
					<view class="fingerpost-name">旅游指南</view>
					<u-parse class="guide" :content="travel.content"></u-parse>
				</view>
			</view>
		</view>
		<view class="recommend">
			<view class="recommend-name">热门评论</view>
			<!-- <view>
				<view class="estimate-item" v-for="(item,index) in comments" :key="index">
					<view class="estimate-top">
						<view class="estimate-left">
							<view class="portrait">
								<image :src="item.avatar"></image>
							</view>
							<view class="estimate-person">
								<view class="estimate-name">{{item.nickname}}</view>
								<view>{{item.content}}</view>
							</view>
						</view>
						<view class="estimate-more">
							<image src="../../static/ic-more.png"></image>
						</view>
					</view>
					<view class="estimate-bottom">
						<view class="date">{{item.create_time}}</view>
						<view class="rights">
							<view class="getlike">
								<text>{{item.digg}}</text>
								<image @click="zan(item)" class="getlike-img" v-show="item.is_digg ==0" src="../../static/ic-like.png">
								</image>
								<image @click="zan(item)" class="getlike-img" v-show="item.is_digg ==1" src="../../static/ic-likes.png">
								</image>
							</view>
							<view class="msgs" @click="showPopup(item)">
								<image src="../../static/ic-msg.png"></image>
							</view>
						</view>
					</view>
				</view>
			</view> -->
		</view>
		<view class="bottom">
			<view class="bottom-input">
				<input v-model="comment" placeholder="写评论..." />
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
				index: 0,
				comment: '',
				id:'',
				travel:'',
				list:''
			}
		},
		methods: {
			select(e) {
				this.index = e
			},
			viewspot(item) {
				uni.navigateTo({
					url: '../view-spot/view-spot?id=' + item.id,
				})
			}
		},
		onLoad(e){
			this.id = e.id
			this.$request('/api/venue/view_travel', {
				id: this.id
			}, 'post', {}).then(res => {
				if (res.code == 1) {
					this.travel = res.data.travel
					this.list = res.data.lists
					uni.setNavigationBarTitle({
						title: this.travel.title
					})
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
	
	.detail-img video {
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
		/* padding-bottom: 100rpx; */
	}

	.content-tips {
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin: 30rpx;
	}

	.weather {}

	.weather-name {
		margin-left: 30rpx;
		font-size: 30rpx;
	}

	.weather-cont {
		height: 600rpx;
	}

	.getBy {
		margin: 0 30rpx;
	}

	.attraction {
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
	}

	.attraction-warp {
		display: flex;
		overflow-x: scroll;
	}

	.attraction-item {
		margin-top: 16rpx;
		margin-right: 34rpx;
	}

	.attraction-img image {
		width: 236rpx;
		height: 154rpx;
	}

	.attraction-introduce {
		margin-top: 18rpx;
		width: 240rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 24rpx;
		text-align: center;
	}

	.fingerpost {
		margin-top: 38rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 32rpx;
		font-family: PingFangSC-regular;
	}

	.fingerpost-name {}

	.guide {
		margin-top: 28rpx;
		font-size: 28rpx;
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

	.bottom .bottom-input {
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

	.bottom .bottom-right {
		display: flex;
	}

	.bottom .mssg {
		width: 40rpx;
		height: 40rpx;
		margin-right: 66rpx;
	}

	.bottom .like {
		width: 40rpx;
		height: 40rpx;
		margin-right: 68rpx;
	}

	.bottom .share {
		width: 40rpx;
		height: 40rpx;
	}
	
	/* 评论 */
	.recommend {
		margin: 0rpx 30rpx;
		padding-bottom: 130rpx;
		font-size: 32rpx;
	}
</style>
