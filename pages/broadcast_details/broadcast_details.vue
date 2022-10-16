<template>
	<view class="content">
		<view class="abpadd">
			<view class="video" v-if="h5_live_replay==1 && live_data.is_hand == 1">
				<video id="myVideo" autoplay :src="flvUrl" style="width: 100%;height: 100%;" controls></video>
			</view>
			<view class="video" v-if="h5_live_replay==1 && live_data.is_hand == 0">
				<view class="video-js" ref="video" style="width: 100%;height: 100%;"></view>
			</view>
			<view class="video" v-if="wx_live==1">
				<live-player :src="flvUrl" autoplay="true" mode="live" style="width: 100%; " />
			</view>
			<view class="video" v-if="app_live_replay_wx_replay==1">
				<video id="myVideo" autoplay :src="flvUrl" style="width: 100%;height: 100%;" controls></video>
			</view>
			<view class="list">
				<u-tabs :list="list1" lineWidth="30rpx" :current="current" @change="change"
					itemStyle="width: 155rpx;padding-left: 15rpx; padding-right: 15rpx; height: 102rpx;">
				</u-tabs>
			</view>
		</view>
		<view v-if="index == 0">
			<view class="pinlunlist">
				<view v-for="(item,index) in getchat" :key="index">
					<view class="create-time">{{item.create_time}}</view>
					<view class="pitem">
						<view class="pitem_left">
							<image :src="item.member_avatar" mode=""></image>
						</view>
						<view class="pitem_right">
							<view class="pitem_name">
								{{item.member_name}}
							</view>
							<view class="pitem_content">
								{{item.content}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bottom">
				<!-- <view class="btm_left">
					<image src="../../static/are.png" mode=""></image>
				</view> -->
				<view class="btm_fill">
					<input type="text" v-model="contents" @confirm="setclick" placeholder="请输入消息...">
				</view>
				<!-- <view class="btm_img1">
					<image src="../../static/are.png" mode=""></image>
				</view>
				<view class="btm_img2">
					<image src="../../static/are.png" mode=""></image>
				</view> -->
			</view>
		</view>
		<view v-if="index == 1">
			<view class="introduce">
				<view>{{live_data.title}}</view>
				<view>直播时间:{{live_data.start_time}} - {{live_data.end_time}}</view>
				<view class="danwei">直播介绍</view>
				<u-parse :content="live_data.content"></u-parse>
			</view>
		</view>
		<view v-if="index == 2">
			<view class="ranking">
				<view class="ranking-top">
					<view class="top">
						<view class="top-item">
							<view class="top-img"></view>
							<view class="top-name">墨刀小莫</view>
							<view class="top-num">183</view>
							<view class="top-names">已邀请</view>
						</view>
						<view class="top-items">
							<view class="top-imgs"></view>
							<view class="top-name">墨刀小莫</view>
							<view class="top-num">223</view>
							<view class="top-names">已邀请</view>
						</view>
						<view class="top-item">
							<view class="top-img"></view>
							<view class="top-name">墨刀小莫</view>
							<view class="top-num">123</view>
							<view class="top-names">已邀请</view>
						</view>
					</view>
				</view>
				<view class="list">
					<view class="list-item">
						<view class="list-left">
							<view>4</view>
							<view class="list-img"></view>
							<view class="list-name">李四</view>
						</view>
						<view class="list-num">邀请<text class="num">111</text>人</view>
					</view>
					<view class="list-item">
						<view class="list-left">
							<view>5</view>
							<view class="list-img"></view>
							<view class="list-name">王五</view>
						</view>
						<view class="list-num">邀请<text class="num">111</text>人</view>
					</view>
				</view>
			</view>
		</view>
		<view v-show="index == 3">
			<!-- <uni-popup ref="popup" type="center">
				<view class="content-pop">
					<image :src="erweima" mode=""></image>
				</view>
			</uni-popup> -->

			<u-overlay :show="show" @click="show = false">
				<view class="content-pop">
					<image :src="erweima" mode=""></image>
				</view>
			</u-overlay>
		</view>
	</view>
</template>

<script>
	//#ifdef H5
	import VideoJs from 'video.js'
	import 'video.js/dist/admin.css'
	//#endif
	export default {
		data() {
			return {
				current: 0,
				contents: '',
				list1: [{
					name: '互动',
					disabled: false
				}, {
					name: '介绍',
					disabled: false
				}, {
					name: '排行榜',
					disabled: false
				}, {
					name: '分享',
					disabled: false
				}],
				index: 0,
				id: '',
				live_data: [],
				live_status: '',
				sh: 0,
				flvUrl: '',
				h5_live_replay: 0,
				wx_live: 0,
				app_live_replay_wx_replay: 0,
				getchat: [],
				get_rank: [],
				token: '',
				erweima: '',
				show: false
			}
		},
		methods: {
			change(item) {
				console.log('item', item);
				this.index = item.index
				console.log(this.index)
				//分享的二维码
				// if(item.index == 3){
				// 	console.log(this.index)
				// 	this.token = uni.getStorageInfoSync('wtoken')
				// 	this.$request('/api/live/get_qr', {
				// 		live_id: this.id,
				// 		token: this.token
				// 	}, 'post', {}, true).then(res => {
				// 		if (res.code == 1) {
				// 			this.erweima = res.data
				// 			this.show = true
				// 		}
				// 	})
				// }
			},
			setclick() {
				this.$request('/api/live/send_chat', {
					content: this.contents,
					live_id: this.id,
				}, 'post', {}, true).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: '评论成功',
							icon: 'none'
						})
						this.contents = ''
						this.getchat = res.data.lists
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			detail() {
				let that = this
				this.$request('/api/live/view', {
					id: that.id,
				}, 'post', {}).then(res => {
					if (res.code == 1) {
						that.live_data = res.data.live;
						if (that.live_data.is_talk == 0) {
							that.list1[0].disabled = true
							that.index = 1
							that.current = 1
						}
						console.log(that.list1)
						if (!that.live_data.is_talk) {
							this.sh = 1;
						}
						//判断播放平台 及是否是回放
						if (that.live_data.status == 1) {

							//#ifdef H5
							that.flvUrl = that.live_data.hls_play
							that.h5_live_replay = 1
							//#endif
							//#ifdef MP-WEIXIN
							that.flvUrl = that.live_data.rtmp_play
							that.wx_live = 1
							//#endif
							//#ifdef APP-PLUS
							that.flvUrl = that.live_data.hls_play
							that.app_live_replay_wx_replay = 1
							//#endif

							that.live_status = that.zhibozhong

						} else if (that.live_data.status == 0 && that.live_data.replay) {
							//#ifdef H5 
							that.h5_live_replay = 1
							//#endif
							//#ifndef H5 
							that.app_live_replay_wx_replay = 1
							//#endif
							that.flvUrl = that.live_data.replay
							that.live_status = that.huifang
						}
						// #ifdef H5
						that.$nextTick(() => {
							let video = document.createElement('video');
							video.id = 'video';
							video.style = 'width: 100%; height: 100%;';
							video.controls = true;
							video.preload = "auto"
							video.autoplay = true
							video.setAttribute('playsinline', true) //IOS微信浏览器支持小窗内播放
							video.setAttribute('webkit-playsinline',
								true) //这个bai属性是ios 10中设置可以让视频在小du窗内播放，也就是不是全zhi屏播放的video标签的一个属性
							video.setAttribute('x5-video-player-type',
								'is_h5') //安卓 声明启用同层H5播放器 可以在video上面加东西

							video.setAttribute('class', 'video-js vjs-default-skin vjs-big-play-centered')
							let source = document.createElement('source');
							source.src = that.flvUrl;
							source.type = 'application/x-mpegURL';
							video.appendChild(source);
							that.$refs.video.$el.appendChild(video);
							let player = VideoJs('video', {
								poster: that.live_data.cover, // 视频封面图地址
								title: that.live_data.title,
								playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
								autoDisable: true,
								preload: 'auto', //auto - 当页面加载后载入整个视频 meta - 当页面加载后只载入元数据 none - 当页面加载后不载入视频
								language: 'zh-CN',
								fluid: true, // 自适应宽高
								muted: false, //  是否静音
								aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
								controls: true, //是否拥有控制条 【默认true】,如果设为false ,那么只能通过api进行控制了。也就是说界面上不会出现任何控制按钮
								autoplay: false, //如果true,浏览器准备好时开始回放。 autoplay: "muted", // //自动播放属性,muted:静音播放
								loop: true, // 导致视频一结束就重新开始。 视频播放结束后，是否循环播放
								screenshot: true,
								controlBar: {
									volumePanel: { //声音样式
										inline: false // 不使用水平方式
									},
									timeDivider: true, // 时间分割线
									durationDisplay: true, // 总时间
									progressControl: true, // 进度条
									remainingTimeDisplay: true, //当前以播放时间
									fullscreenToggle: true, //全屏按钮
									pictureInPictureToggle: true, //画中画
								}
							}, function() {
								this.on('error', function(err) { //请求数据时遇到错误
									console.log(err)
								});
								this.on('stalled', function(stalled) { //网速失速
									console.log(stalled)
								});
								// this.on('play', function() { //开始播放
								// 	
								// });
								// this.on('pause', function() { //暂停
								// 	
								// });
								// this.on('timeupdate', function(timeupdate) {
								// 	// 
								// })
							});
						})
						// #endif 
					}
				});
			},
			comment() {
				this.$request('/api/live/get_chat', {
					live_id: this.id
				}, 'post', {}).then(res => {
					if (res.code == 1) {
						this.getchat = res.data.lists
					}
				})
			},
			rank() {
				this.$request('/api/live/get_rank', {
					live_id: this.id
				}, 'post', {}).then(res => {
					if (res.code == 1) {
						this.get_rank = res.data.lists
					}
				})
			}
		},
		onLoad(e) {
			this.id = e.id
			this.detail()
			this.comment()
			this.rank()
		}
	}
</script>

<style>
	.content {
		height: 100%;
		background-color: #f7f7f7;
	}

	.abpadd {
		width: 100%;
		position: fixed;
		/* top: 78rpx; */
		z-index: 9;
	}

	.video {
		width: 748rpx;
		height: 436rpx;
	}

	.video image {
		width: 748rpx;
		height: 436rpx;
	}

	.list {
		background-color: #ffffff;
		top: 436rpx;
		/* border: 1rpx solid red; */
		height: 102rpx;
		line-height: 102rpx;
	}

	.pinlunlist {
		overflow-y: scroll;
		padding-top: 600rpx;
		padding-left: 24rpx;
		width: 750rpx;
		height: 100%;
		background-color: rgba(228, 236, 245, 100);
		padding-bottom: 50rpx;
	}

	.pitem {
		display: flex;
		/* border: 1rpx solid red; */
		margin-bottom: 64rpx;
	}

	.pitem_left image {
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
		margin-right: 16rpx;
	}

	.pitem_name {
		color: rgba(153, 153, 153, 100);
		font-size: 24rpx;
		text-align: left;
		font-family: SourceHanSansSC-regular;
	}

	.pitem_content {
		margin-top: 16rpx;
		padding: 20rpx;
		border-radius: 0px 16rpx 16rpx 16rpx;
		background-color: rgba(255, 255, 255, 100);
		color: rgba(16, 16, 16, 100);
		font-size: 32rpx;
		text-align: center;
		font-family: Arial;
	}

	.tips {
		/* border: 1rpx solid red; */
		margin-left: 28rpx;
		/* margin-top: 40rpx; */
		margin-bottom: 48rpx;
		width: 648rpx;
		height: 86rpx;
		color: rgba(153, 153, 153, 100);
		font-size: 24rpx;
		text-align: center;
		font-family: PingFangSC-regular;
	}

	.bottom {
		background-color: rgba(245, 246, 251, 100);
		position: fixed;
		bottom: 0rpx;
		width: 750rpx;
		height: 100rpx;
		/* border: 1rpx solid red; */
		display: flex;
	}

	.btm_left image {
		width: 48rpx;
		height: 48rpx;
		margin-left: 38rpx;
		margin-top: 26rpx;
		margin-right: 22rpx;
	}

	.btm_fill {
		background-color: #ffffff;
		margin-top: 14rpx;
		margin-right: 30rpx;
		width: 690rpx;
		height: 74rpx;
		margin-left: 30rpx;
		/* border: 1rpx solid red; */
	}

	.btm_fill input {

		text-indent: 20rpx;
		width: 448rpx;
		height: 74rpx;
		/* border: 1rpx solid red; */
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.btm_img1 image {
		width: 48rpx;
		height: 48rpx;
		margin-top: 26rpx;
		margin-right: 16rpx;
	}

	.btm_img2 image {
		width: 48rpx;
		height: 48rpx;
		margin-top: 26rpx;
	}

	.introduce {
		height: 100%;
		background-color: #f7f7f7;
		padding: 560rpx 24rpx 0 24rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 26rpx;
		text-align: left;
		font-family: SourceHanSansSC-regular;
	}

	.danwei {
		margin-top: 30rpx;
	}

	/* 排行榜 */
	.ranking {
		/* padding: 560rpx 24rpx 0 24rpx; */
		padding-top: 540rpx;
	}

	.ranking-top {
		/* width: 750rpx; */
		height: 410rpx;
		background-color: rgba(19, 82, 195, 100);
		text-align: center;
		box-shadow: 0px 4rpx 8rpx 0px rgba(0, 0, 0, 0.05);
	}

	.ranking .top-item {
		width: 234rpx;
		height: 283rpx;
		border-radius: 10rpx;
		background-color: rgba(255, 255, 255, 100);
		text-align: center;
		margin-top: 56rpx;
	}

	.ranking .rank1 {
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
		padding-top: 44rpx;
	}

	.ranking .rank2 {
		color: rgba(255, 255, 255, 100);
		font-size: 36rpx;
		font-family: PingFangSC-regular;
		margin-top: 6rpx;
	}

	.ranking .top {
		display: flex;
		padding: 34rpx 24rpx 0 24rpx;
		/* margin: 44rpx 24rpx 0 24rpx; */
		/* background-color: #fff; */
	}

	.ranking .top-img {
		margin-top: 26rpx;
		width: 100rpx;
		height: 100rpx;
	}

	.ranking .top-items {
		width: 234rpx;
		height: 340rpx;
		border-radius: 10rpx;
		background-color: rgba(255, 255, 255, 100);
		text-align: center;
		box-shadow: 0px -3rpx 10rpx 0px rgba(0, 0, 0, 0.18);
	}

	.ranking .top-imgs {
		margin-top: 52rpx;
		width: 130rpx;
		height: 130rpx;
	}

	.ranking .top-name {
		color: rgba(153, 153, 153, 100);
		font-size: 24rpx;
		margin-top: 28rpx;
	}

	.ranking .top-num {
		color: rgba(246, 62, 61, 100);
		font-size: 32rpx;
		margin-top: 16rpx;
	}

	.ranking .top-names {
		color: rgba(153, 153, 153, 100);
		font-size: 24rpx;
	}

	.ranking .list {
		height: 100%;
		background-color: #ffffff;
		padding: 0 52rpx 0 20rpx;
		/* margin-left: 52rpx;
		margin-right: 20rpx; */
	}

	.ranking .list-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 0;
		border-bottom: solid 1rpx #f7f7f7;
	}

	.ranking .list-left {
		display: flex;
		align-items: center;
		color: #999;
		font-size: 32rpx;
		font-family: Arial-400;
	}

	.ranking .list-img {
		width: 80rpx;
		height: 80rpx;
		margin-left: 36rpx;
		border: solid 1rpx #999;
		border-radius: 50%;
		margin-right: 24rpx;
	}

	.ranking .list-name {
		color: rgba(51, 51, 51, 100);
		font-size: 28rpx;
	}

	.ranking .list-num {
		font-family: Arial-regular;
		color: #999;
	}

	.ranking .num {
		color: #F63E3D;
		font-size: 24rpx;
	}

	.content-pop {
		/* padding-top: 540rpx; */
		width: 600rpx;
		height: 600rpx;
		background-color: #FFFFFF;
		border-radius: 50rpx;
		text-align: center;
		margin-top: 70%;
		margin-left: 76rpx;
	}

	.content-pop image {
		width: 400rpx;
		height: 400rpx;
		margin-top: 100rpx;
		background-color: #FFFFFF;
		border-radius: 50rpx;

	}

	.create-time {
		color: rgba(153, 153, 153, 100);
		font-size: 24rpx;
		text-align: center;
		margin-bottom: 20rpx;
		text-align: center;
	}
</style>
