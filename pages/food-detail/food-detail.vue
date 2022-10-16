<template>
	<view>
		<view class="detail-top">
			<image :src="venue.cover"></image>
		</view>
		<view class="detail-cont">
			<view class="detail-name">
				<view>{{venue.name}}</view>
				<view class="xiaofei">人均消费约￥xx元</view>
			</view>
			<view class="contact-way">
				<view class="contact-left">
					<image src="../../static/ic-time.png"></image>
					<view>营业时间:{{venue.start_time}}-{{venue.end_time}}</view>
				</view>
			</view>
			<view class="contact-way">
				<view class="contact-left">
					<image src="../../static/address.png"></image>
					<view>{{venue.address}}</view>
				</view>
				<view>
					<image class="right" src="../../static/ic_ri.png"></image>
				</view>
			</view>
			<view class="contact-way" @click="getpone(venue.tel)">
				<view class="contact-left">
					<image src="../../static/ic-phone.png"></image>
					<view>联系方式: {{venue.tel}}</view>
				</view>
				<view>
					<image class="right" src="../../static/ic_ri.png"></image>
				</view>
			</view>
			<view class="food-introduction">
				<view class="introduction-name">美食简介</view>
				<u-parse class="introduction" :content="venue.content"></u-parse>
			</view>
		</view>
		<view class="recommend">
			<view class="recommend-title">相关推荐</view>
			<view class="recommend-warp">
				<view class="recommend-item">
					<view class="recommend-img">
						<image src="../../static/banner.png"></image>
					</view>
					<view class="recommend-right">
						<view class="hon-name">宏盾宾馆</view>
						<view class="adress">战前二路26号</view>
					</view>
				</view>
				<view class="recommend-item">
					<view class="recommend-img">
						<image src="../../static/banner.png"></image>
					</view>
					<view class="recommend-right">
						<view class="hon-name">宏盾宾馆</view>
						<view class="adress">战前二路26号</view>
					</view>
				</view>
			</view>
		</view>
		<view class="recommend-h">
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
				id:'',
				list:[],
				venue:''
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
			this.$request('/api/venue/view', {
				id:this.id
			}, 'post', {}).then(res => {
				this.venue = res.data.venue
				this.list = res.data.list
			})
		}
	}
</script>

<style>
	.detail-top image {
		width: 750rpx;
		height: 436rpx;
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
	.detail-name {
		margin: 32rpx 30rpx 0 30rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 32rpx;
		font-family: PingFangSC-regular;
	}
	.xiaofei {
		margin-top: 20rpx;
		font-size: 28rpx;
	}
	.food-introduction {
		margin: 30rpx;
	}
	.introduction-name {
		font-size: 32rpx;
	}
	.introduction {
		margin-top: 20rpx;
		color: #777777;
		font-size: 28rpx;
	}
	.recommend {
		padding: 30rpx;
		background-color: #F9F9F9;
	}
	.recommend-title {
		border-left: solid 8rpx #FDB613;
		font-size: 34rpx;
		font-weight: 600;
		padding-left: 20rpx;
	}
	.recommend-item {
		display: flex;
		background: #fff;
		border-radius: 10rpx;
		margin: 30rpx 0;
	}
	.recommend-img image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx 0 10rpx 0;
	}
	.recommend-right {
		margin-left: 30rpx;
	}
	.hon-name {
		font-size: 32rpx;
		font-weight: 600;
		margin-top: 20rpx;
	}
	.adress {
		font-size: 28rpx;
		margin-top: 20rpx;
		color: #646464;
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
	.recommend-h {
		padding: 0rpx 30rpx 130rpx 30rpx;
		background-color: #F9F9F9;
		font-size: 32rpx;
	}
</style>
