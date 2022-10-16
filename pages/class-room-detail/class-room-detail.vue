<template>
	<view>
		<view class="lolo">
			<view class="detail-img" v-show="indexs==0">
				<image :src="activity.cover"></image>
			</view>
			<view class="detail-img" v-show="indexs==1">
				<video :src="activity.cover_video"></video>
			</view>
			<view v-if="activity.cover!=''"></view>
			<view class="select" v-else>
				<view :class="indexs == 1?'videos':'video'" @click="select(1)">视</view>
				<view :class="indexs == 0 ?'img':'imgs'" @click="select(0)">图</view>
			</view>
		</view>
		<view class="detail">
			<view class="detail-name">{{activity.name}}</view>
			<view class="detail-cont">
				<view class="zhuj">主讲:</view>
				<view class="detail-section">
					<view>22章节</view>
					<view class="line"></view>
					<view>更新至22章节</view>
				</view>
			</view>
			<view class="min">名额:不限</view>
			<view class="min">课程时间:不限</view>
		</view>
		<view class="list">
			<u-tabs :list="list1" lineWidth="30rpx" @click="click"
			:activeStyle="{color: '#52A7FF'}"
				itemStyle="width: 155rpx;padding-left: 15rpx; padding-right: 15rpx; height: 102rpx;">
			</u-tabs>
		</view>
		<view v-show="index == 0">
			<view class="lists">
				<view class="course-description" v-if="activity.content!=''">
					<view class="course-name">课程介绍</view>
					<u-parse class="course-cont" :content="activity.content"></u-parse>
				</view>
				<view class="course-description" v-if="activity.teacher_info!=''">
					<view class="course-name">讲师介绍</view>
					<u-parse class="course-cont" :content="activity.teacher_info"></u-parse>
				</view>
			</view>
		</view>
		<view v-show="index == 1">
			<view class="lists">
				<view class="chapter">
					<!-- <view class="chapter-item">
						<view>你不可不知的中国音乐经典故事</view>
						<view class="chapter-img">
							<image src="../../static/ic-top.png"></image>
						</view>
					</view> -->
					<view class="chapters">
						<view class="chapters-item" v-for="(item,index) in activity.culture" :key="index" @click="lookVideo(item)">
							<view class="chapters-left">
								<image src="../../static/ic-play.png"></image>
								<view>{{item.name}}</view>
							</view>
							<view class="chapters-right">15分30秒99次播放</view>
						</view>
					</view>
					<!-- <view class="chapter-item">
						<view>你不可不知的中国音乐经典故事</view>
						<view class="chapter-img">
							<image src="../../static/ic-bottom.png"></image>
						</view>
					</view> -->
				</view>
			</view>
			<view class="look-video">
				<view v-if="showControl">
					<view class="group-content-item1">
						<video id="myVideo" :src="videoUrl"></video>
						<view class="video-name"></view>
					</view>
				</view>
			</view>
		</view>
		<view v-show="index == 2">
			<u-empty
			        text="敬请期待~"
			        icon="http://cdn.uviewui.com/uview/empty/car.png"
			>
			</u-empty>
		</view>
		<view class="bottoms">
			<view class="bottoms-left">
				<image src="../../static/ic-shouc.png"></image>
				<image src="../../static/ic-like.png"></image>
				<image src="../../static/ic-share.png"></image>
			</view>
			<view class="bottoms-right" @click="Programmebookingds">报名学习</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indexs:0,
				list1: [{
					name: '介绍',
				}, {
					name: '章节',
				}, {
					name: '课件'
				}, {
					name: '讨论'
				}],
				index:0,
				c_id:'',
				activity:'',
				lists:[],
				subscribe_id:"",
				videoUrl:'',
				showControl:false,
			}
		},
		methods: {
			//观看视频
			lookVideo(item){
				console.log(item)
				this.subscribe_id = ''
				this.videoUrl = ''
				this.showControl = false
				this.$request('/api/culture/view', {
					id: item.id,
				}, 'post', {}).then(res => {
					if (res.code === 1) {
						console.log(res)
						let nideo = res.data.artgroup
						console.log(nideo)
						if(nideo.video){
							let video = nideo.video
							// console.log(video)
							this.videoUrl = video[0].url
							this.showControl = true
						}
					}else{
						if(res.msg == '请先预约'){
							this.subscribe_id = item.id
						}
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			Programmebookingds() {
				if (this.subscribe_id != '') {
					uni.navigateTo({
						url: '../class-room-place/class-room-place?id=' + this.subscribe_id
					})
				} else {
					let token = uni.getStorageSync('wtoken');
					if (!token.length) {
						uni.showModal({
							title: '请先登录',
							content: '',
							showCancel: true,
							success: function(res) {
								if (res.confirm) {
									//#ifndef  MP-WEIXIN
									//获取失败 跳转登录页
									uni.navigateTo({
										url: '../login/login'
									})
									//#endif
									//#ifdef MP-WEIXIN
									uni.navigateTo({
										url: '../wx_login/wx_login'
									})
									//#endif
								}
							}
						});
					}else{
						uni.showToast({
							title: '请先选择需要预约的视频',
							icon: 'none'
						})
					}
				}
			},
			select(e){
				this.indexs = e
			},
			click(item) {
				console.log('item', item);
				this.index = item.index
				console.log(this.index)
			},
			baoming(){
				uni.navigateTo({
					url:'../class-room-place/class-room-place'
				})
			},
			detail(){
				this.$request('/api/culture/culture_category_view', {
					id: this.c_id,
				}, 'post', {}).then(res => {
				
					if (res.code === 1) {
						this.activity = res.data.artgroup;
						this.lists = res.data.lists;
					}
				})
			}
		},
		onLoad(e){
			this.c_id = e.id
			this.detail()
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
	.detail {
		border-bottom: solid 2rpx #eeeeee;
		padding: 26rpx 30rpx;
	}
	.detail-name {
		color: rgba(16, 16, 16, 100);
		font-size: 32rpx;
		font-family: PingFangSC-regular;
	}
	.detail-cont {
		display: flex;
		color: rgba(16, 16, 16, 100);
		font-size: 24rpx;
		font-family: PingFangSC-regular;
		margin-top: 22rpx;
	}
	.detail-section {
		display: flex;
		align-items: center;
	}
	.zhuj {
		margin-right: 52rpx;
	}
	.line {
		width: 2rpx;
		height: 22rpx;
		background-color: #101010;
		margin: 0 16rpx;
	}
	.min {
		color: rgba(16, 16, 16, 100);
		font-size: 24rpx;
		font-family: PingFangSC-regular;
		margin-top: 8rpx;
	}
	.lists {
		margin: 30rpx;
	}
	.course-description {
		margin-bottom: 32rpx;
	}
	.course-name {
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
	}
	.course-cont {
		margin-top: 12rpx;
		font-size: 24rpx;
	}
	.chapter {
		
	}
	.chapter-item {
		display: flex;
		justify-content: space-between;
		margin-bottom: 34rpx;
	}
	.chapter-img image{
		width: 40rpx;
		height: 40rpx;
	}
	.chapters-item {
		/* display: flex; */
		margin-bottom: 20rpx;
	}
	.chapters-left {
		display: flex;
		color: rgba(16, 16, 16, 100);
		font-size: 24rpx;
		font-family: PingFangSC-regular;
	}
	.chapters-left image {
		width: 40rpx;
		height: 40rpx;
		margin-right: 18rpx;
	}
	.chapters-right {
		margin-top: 4rpx;
		color: #999999;
		font-size: 18rpx;
		font-family: PingFangSC-regular;
		margin-left: 74rpx;
	}
	.bottoms {
		width: 100%;
		height: 90rpx;
		background-color: rgba(255, 255, 255, 100);
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: center;
		box-shadow: 0px -2rpx 0px 0px rgba(170, 170, 170, 40);
		font-family: Arial;
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.bottoms-left image {
		width: 40rpx;
		height: 40rpx;
		margin-left: 36rpx;
	}
	.bottoms-right {
		width: 254rpx;
		height: 68rpx;
		line-height: 68rpx;
		border-radius: 84rpx;
		background-color: rgba(82, 167, 255, 100);
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		text-align: center;
		font-family: Arial;
		margin-right: 30rpx;
	}
	.look-video {
		padding-top: 30rpx;
		margin-left: 30rpx;
	}
	#myVideo {
		width: 690rpx;
		height: 402rpx;
	}
</style>
