<template>
	<view class="home">
		<view class="top-warp">
			<view class="home-top">
				<view class="search" @click="seach">
					<view class="search-img">
						<image src="../../static/ic_search.png"></image>
					</view>
					<view>搜索你感兴趣的内容</view>
				</view>
				<view class="language">
					<view class="chinese">汉语</view>
					<view class="tibetan">藏语</view>
				</view>
			</view>
			<view class="banner">
				<swiper class="swiper" autoplay circular>
					<swiper-item v-for="(item,index) in swipers" :key="index">
						<image :src='item'></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="content">
			<swiper class="swiper" circular :indicator-dots="true" indicator-active-color="#F96B0D">
				<swiper-item>
					<view class="content-item">
						<view class="information" @click="consults">
							<view class="information-img">
								<image src="../../static/whzx.png"></image>
							</view>
							<view>文化资讯</view>
						</view>
						<view class="information" @click="art">
							<view class="information-img">
								<image src="../../static/ysjs.png"></image>
							</view>
							<view>艺术鉴赏</view>
						</view>
						<view class="information" @click="intangible">
							<view class="information-img">
								<image src="../../static/fycc.png"></image>
							</view>
							<view>非遗传承</view>
						</view>
						<view class="informations" @click="carny">
							<view class="information-img">
								<image src="../../static/ytfc.png"></image>
							</view>
							<view>艺团风采</view>
						</view>
						<view class="information" @click="venue">
							<view class="information-img">
								<image src="../../static/cgyy.png"></image>
							</view>
							<view>场馆预约</view>
						</view>
						<view class="information" @click="activity">
							<view class="information-img">
								<image src="../../static/hdcy.png"></image>
							</view>
							<view>活动参与</view>
						</view>
						<view class="information" @click="match">
							<view class="information-img">
								<image src="../../static/sscy.png"></image>
							</view>
							<view>赛事参与</view>
						</view>
						<view class="informations" @click="broadcast">
							<view class="information-img">
								<image src="../../static/whzb.png"></image>
							</view>
							<view>文化直播</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="content-item">
						<view class="information" @click="map">
							<view class="information-img">
								<image src="../../static/whdy.png"></image>
							</view>
							<view>文化地图</view>
						</view>
						<view class="information" @click="scenic">
							<view class="information-img">
								<image src="../../static/lyjd.png"></image>
							</view>
							<view>旅游景点</view>
						</view>
						<view class="information" @click="guidelines">
							<view class="information-img">
								<image src="../../static/lx.png"></image>
							</view>
							<view>旅游路线</view>
						</view>
						<view class="informations" @click="food">
							<view class="information-img">
								<image src="../../static/tsms.png"></image>
							</view>
							<view>特色美食</view>
						</view>
						<view class="information" @click="homestay">
							<view class="information-img">
								<image src="../../static/jd.png"></image>
							</view>
							<view>民宿酒店</view>
						</view>
						<view class="content-item">
							<view class="information" @click="fair">
								<view class="information-img">
									<image src="../../static/gdj.png"></image>
								</view>
								<view style="text-align: center;">赶大集</view>
							</view>
						</view>
						<view class="information" @click="relics">
							<view class="information-img">
								<image src="../../static/wwbh.png"></image>
							</view>
							<view>文物保护</view>
						</view>
						<view class="informations" @click="classroom">
							<view class="information-img">
								<image src="../../static/whkt.png"></image>
							</view>
							<view>文化课堂</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="content-item">
						<view class="information" @click="resource">
							<view class="information-img">
								<image src="../../static/zy.png"></image>
							</view>
							<view style="text-align: center;">资源</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="imgs">
			<image src="../../static/bj3.png"></image>
		</view>
		<view class="culture">
			<view class="culture-top">
				<view class="culture-name">文化资讯</view>
				<view class="culture-more" @click="consults">
					<text>更多</text>
					<image src='../../static/ic_ri.png'></image>
				</view>
			</view>
			<view class="culture-bottom">
				<view class="culture-item" v-for="(iten,inde) in list" :key="inde" @click="zixun(iten)">
					<view class="culture-img">
						<image :src="iten.cover"></image>
					</view>
					<view class="introduce">
						<view class="introduce-explain">{{iten.title}}</view>
						<view class="time">{{iten.create_time}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="imgs">
			<image src="../../static/bj3.png"></image>
		</view>
		<view class="culture">
			<view class="culture-top">
				<view class="culture-name">艺术鉴赏</view>
				<view class="culture-more" @click="art">
					<text>更多</text>
					<image src='../../static/ic_ri.png'></image>
				</view>
			</view>
			<view class="art">
				<view class="art-item" v-for="(iten,inde) in artlist" :key="inde" @click="zixun(iten)">
					<view class="art-img">
						<image :src="iten.cover"></image>
					</view>
					<view v-if="iten.title.length>20">
						<view class="art-title">{{iten.title}}</view>
						<view class="art-era-warp">
							<view class="art-era" v-for="items in iten.tags">{{items}}</view>
						</view>
					</view>
					<view class="art-cont" v-else>
						<view class="art-title">{{iten.title}}</view>
						<view class="art-era-warp">
							<view class="art-eras" v-for="items in iten.tags">{{items}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="imgs">
			<image src="../../static/bj3.png"></image>
		</view>
		<view class="culture">
			<view class="culture-top">
				<view class="culture-name">非遗传承</view>
				<view class="culture-more" @click="intangible">
					<text>更多</text>
					<image src='../../static/ic_ri.png'></image>
				</view>
			</view>
			<view class="intangible-bottom">
				<view class="intangible-item" v-for="(item,index) in intangiblelist" :key="index" @click="zixun(item)">
					<view class="intangible-img">
						<image :src="item.cover"></image>
					</view>
					<view class="intangible-explain">
						<view class="intangible-name">{{item.title}}</view>
						<view class="source">
							<view v-if="item.source!=''">来源：{{item.source}}</view>
						</view>
						<view class="intangible-time">{{item.create_time.substring(0,10)}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="imgs">
			<image src="../../static/bj3.png"></image>
		</view>
		<view class="culture">
			<view class="culture-top">
				<view class="culture-name">文化直播</view>
				<view class="culture-more" @click="broadcast">
					<text>更多</text>
					<image src='../../static/ic_ri.png'></image>
				</view>
			</view>
			<view v-if="livelist.length>0">
				<view class="live" @click="liveDetail(livelist[0])">
					<view class="live-item">
						<!-- <view class="live-img">
							<image :src="livelist[0].cover"></image>
						</view> -->
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
						<view class="live-name">{{livelist[0].title}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="imgs">
			<image src="../../static/bj3.png"></image>
		</view>
		<view class="culture">
			<view class="culture-top">
				<view class="culture-name">旅游景点</view>
				<view class="culture-more" @click="scenic">
					<text>更多</text>
					<image src='../../static/ic_ri.png'></image>
				</view>
			</view>
			<view class="travel">
				<view class="travel-item" v-for="(item,index) in scenicSpotlist" :key="index" @click="spotDetail(item)">
					<view class="travel-img">
						<image :src="item.cover"></image>
					</view>
					<view class="travel-right">
						<view class="travel-name">{{item.name}}</view>
						<view class="tap">
							<view class="choiceness">精选</view>
							<view class="nature">自然风光</view>
						</view>
						<view>{{item.address}}</view>
						<!-- <view class="gl">距你16.83km</view> -->
					</view>
				</view>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
		<view class="cumulostratu" @click="cenji">层级云</view>
	</view>
</template>

<script>
	//#ifdef H5
	import VideoJs from 'video.js'
	import 'video.js/dist/admin.css'
	//#endif
	import config from 'utils/config.js'
	export default {
		data() {
			return {
				wenhuazixun: '', //文化资讯
				yishujianshang: '', //艺术鉴赏
				feiyichuancheng: '', //非遗传承
				yituanfengcai: '', //艺团风采
				changguanyuyue: '', //场馆预约
				huodongcanyu: '', //活动参与
				saishicanyu: '', //赛事参与
				wenhuazhibo: '', //文化直播
				wenhuaditu: '', //文化地图
				lvyoujingdian: '', //旅游景点
				lvyouluxian: '', //旅游路线 
				tesemeishi: '', //特色美食
				minsujiudian: '', //民宿酒店
				ziyuan: '', //资源
				area: '9784',
				swipers: [],
				icon_data: [],
				list: [], //文化资讯列表
				artlist: [], //艺术鉴赏列表
				intangiblelist: [], //非遗传承列表
				livelist: [],
				scenicSpotlist: [],
				zhsy:0,
				flvUrl: '',
				h5_live_replay: 0,
				wx_live: 0,
				app_live_replay_wx_replay: 0,
				live_data: [],
				live_status: '',
				liveId:'',  //直播id
				tier:0
			}
		},
		onLoad() {

		},
		methods: {
			//层级云
			cenji() {
				uni.navigateTo({
					url: '../hierarchy/hierarchy'
				})
			},
			//资源
			resource() {
				// #ifdef H5
				window.location.href = 'https://weread.qq.com/'
				// #endif
			},
			//搜索
			seach() {
				uni.navigateTo({
					url: '../seach/seach'
				})
			},
			//文化资讯
			consults() {
				uni.navigateTo({
					url: '../consult/consult'
				})
			},
			//艺术鉴赏
			art() {
				uni.navigateTo({
					url: '../virtuosity/virtuosity'
				})
			},
			//非遗传承
			intangible() {
				uni.navigateTo({
					url: '../intangible/intangible'
				})
			},
			//文化直播详情
			liveDetail(item) {
				uni.navigateTo({
					url: '../broadcast_details/broadcast_details?id=' + item.id
				})
			},
			//旅游景点详情
			spotDetail(item) {
				uni.navigateTo({
					url: '../scenic-spot-detail/scenic-spot-detail?id=' + item.id
				})
			},
			carny() {
				uni.navigateTo({
					url: '../carny/carny'
				})
			},
			//场馆预约
			venue() {
				uni.navigateTo({
					url: '../venue/venue'
				})
			},
			//活动参与
			activity() {
				uni.navigateTo({
					url: '../activity/activity'
				})
			},
			//文化直播
			broadcast() {
				uni.navigateTo({
					url: '../live_broadcast/live_broadcast'
				})
			},
			//赛事参与
			match() {
				uni.navigateTo({
					url: '../match/match'
				})
			},
			//地图
			map() {
				uni.navigateTo({
					url: '../map/map'
				})
			},
			//旅游景点
			scenic() {
				uni.navigateTo({
					url: '../scenic-spot/scenic-spot'
				})
			},
			//旅游路线
			guidelines() {
				uni.navigateTo({
					url: '../guidelines/guidelines'
				})
			},
			//特色美食
			food() {
				uni.navigateTo({
					url: '../food/food'
				})
			},
			//民宿酒店
			homestay() {
				uni.navigateTo({
					url: '../homestay/homestay'
				})
			},
			//文物保护
			relics() {
				uni.navigateTo({
					url: '../cultural-relic/cultural-relic'
				})
			},
			//文化课堂
			classroom() {
				uni.navigateTo({
					url: '../class-room/class-room'
				})
			},
			//赶大集
			fair() {
				uni.navigateTo({
					url: '../large-set/large-set'
				})
			},
			//文化资讯列表
			getList() {
				this.$request('/api/article/list', {
					cate: 1,
					area: this.area,
					limit: 2,
					page:1
				}, 'post', {}).then(res => {
					if (res.code == 1) {
						let list = res.data.lists
						this.list = list.data
					}
				})
			},
			//艺术鉴赏列表
			getArtList() {
				this.$request('/api/article/list', {
					cate: 2,
					area: this.area,
					limit: 2,
					page:1
				}, 'post', {}).then(res => {
					if (res.code == 1) {
						let list = res.data.lists
						this.artlist = list.data
					}
				})
			},
			//非遗传承列表
			intangibleList() {
				this.$request('/api/article/list', {
					cate: 10,
					area: this.area,
					limit: 2,
					page:1
				}, 'post', {}).then(res => {
					if (res.code == 1) {
						let list = res.data.lists
						this.intangiblelist = list.data
					}
				})
			},
			//文化直播
			live() {
				this.$request('/api/live/get_list', {
					area: this.area,
				}, 'post', {}).then(res => {
					if (res.code == 1) {
						this.livelist = res.data.lists
						
						if(this.livelist.length>0){
							this.liveId = this.livelist[0].id
							this.live_data = this.livelist[0];
							this.detail()
						}
					}
				})
			},
			//直播详情
			detail() {
				let that = this
				this.$request('/api/live/view', {
					id: that.liveId,
				}, 'post', {}).then(res => {
					if (res.code == 1) {
						that.live_data = res.data.live;
						
						//判断播放平台 及是否是回放
						if (that.live_data.status == 1) {
			
							//#ifdef H5
							that.flvUrl = that.live_data.hls_play
							console.log(that.flvUrl,'是否是回放')
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
			//旅游景点
			scenicSpot() {
				this.$request('/api/venue/get_list', {
					cate: "6",
					area: this.area,
					pagesize: 2
				}, 'post', {}).then(res => {
					if (res.code == 1) {
						this.scenicSpotlist = res.data.lists
					}
				})
			},
			//资讯跳转详情
			zixun(item) {
				uni.navigateTo({
					url: '../consult-details/consult-details?id=' + item.id
				})
			},
			banner() {
				this.$request('/api/common/banner', {
					area: this.area
				}, 'post', {

				}).then(res => {
					if (res.code == 1) {
						this.swipers = res.data.banner
						this.icon_data = res.data.icon_data
						let data = []
						this.icon_data[0].forEach((item, index) => {
							if (index == 0) {
								item.name = '文化资讯'
							} else if (index == 1) {
								item.name = '艺术鉴赏'
							} else if (index == 2) {
								item.name = '非遗传承'
							}
						})
						this.icon_data[1].forEach((item, index) => {
							if (index == 0) {
								item.name = '艺团风采'
							} else if (index == 1) {
								item.name = '场馆预约'
							} else if (index == 2) {
								item.name = '活动参与'
							} else if (index == 3) {
								item.name = '赛事参与'
							} else if (index == 4) {
								item.name = '文化课堂'
							}
						})
						
						
						this.icon_data[2].forEach((item, index) => {
							if (index == 0) {
								item.name = '文化地图'
							} else if (index == 1) {
								item.name = '文化直播'
							} else if (index == 2) {
								item.name = '旅游景点'
							} else if (index == 3) {
								item.name = '旅游路线'
							} else if (index == 4) {
								item.name = '特色美食'
							} else if (index == 5) {
								item.name = '民宿酒店'
							} else if (index == 6) {
								item.name = '资源'
							} else if (index == 7) {
								this.tier = item.status
								item.name = '层级'
							} else if (index == 8) {
								this.zhsy = item.status
								item.name = '藏汉双语'
							} else if (index == 9) {
								item.name = '文物保护'
							}
						})
						data = data.concat(this.icon_data[0])
						data = data.concat(this.icon_data[1])
						data = data.concat(this.icon_data[2])
						// console.log(data)
						let hh = []
						data.forEach(item => {
							if (item.status == 1) {
								hh.push(item)
							}
						})
						// console.log(hh) 

						let resultArr = [];
						for (var i = 0; i < hh.length; i += 8) {
							resultArr.push(hh.slice(i, i + 8));
						}
						// console.log(resultArr);
						//音乐
						// if (res.data.music) {
						// 	that.innerAudioContext.src = res.data.music;
						// }
					}
				});
			}
		},
		onLoad(e) {
			let that = this
			if (e.linkarea) {
				this.area = e.linkarea
				console.log(this.area)
				uni.setStorageSync('area', e.linkarea)
			}

			if (uni.getStorageSync('area')) {
				this.area = uni.getStorageSync('area')
			} else {
				this.area = 9784;
				uni.setStorageSync('area', 9784)
			}

			this.$request('/api/area', {
				id: this.area
			}, 'post', {}).then(res => {

				if (res.code == 1) {
					uni.setNavigationBarTitle({
						title: res.data.cloud_data[0].title
					});

				}
			});
		},
		onShow() {
			this.area = uni.getStorageSync('area')
			this.$request('/api/area', {
				id: this.area
			}, 'post', {}).then(res => {
				if (res.code == 1) {
					uni.setNavigationBarTitle({
						title: res.data.cloud_data[0].title
					});
				}
			});
			// this.flvUrl = ''
			this.h5_live_replay = 0,
			this.wx_live = 0,
			this.app_live_replay_wx_replay = 0,
			// this.live_data = [],
			// this.live_status = '',
			// this.liveId = ''  //直播id
			this.banner()
			this.getList()
			this.getArtList()
			this.intangibleList()
			this.live()
			this.scenicSpot()
		}
	}
</script>

<style>
	.top-warp {
		position: relative;
	}

	.home-top {
		padding: 30rpx;
		width: 750rpx;
		height: 378rpx;
		background-size: 100% 100%;
		/* background-color: rgba(238, 164, 94, 100); */
		background-image: url(../../static/bj2.png);
		display: flex;
	}

	.search {
		display: flex;
		width: 430rpx;
		height: 56rpx;
		border-radius: 66rpx;
		background-color: rgba(255, 255, 255, 100);
		border: 2rpx solid rgba(187, 187, 187, 100);
		padding-left: 30rpx;
		padding-top: 16rpx;
		color: rgba(153, 153, 153, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.search-img image {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}

	.language {
		display: flex;
		width: 210rpx;
		height: 72rpx;
		border-radius: 66rpx;
		background-color: rgba(255, 255, 255, 100);
		text-align: center;
		border: 2rpx solid rgba(187, 187, 187, 100);
		margin-left: 20rpx;
		color: rgba(153, 153, 153, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.chinese {
		width: 49%;
		height: 40rpx;
		text-align: center;
		border-right: solid 1rpx #999999;
		line-height: 40rpx;
		margin-top: 16rpx;
		color: #FF712C;
	}

	.tibetan {
		width: 49%;
		text-align: center;
		line-height: 72rpx;
	}

	.banner {
		position: absolute;
		top: 138rpx;
		width: 750rpx;
		height: 376rpx;
	}

	.banner image {
		width: 690rpx;
		height: 376rpx;
		border-radius: 20rpx;
		margin-left: 30rpx;
	}

	.content {
		padding: 106rpx 40rpx 0 40rpx;
	}

	.content-item {
		display: flex;
		/* 	justify-content: space-between; */
		flex-wrap: wrap;
	}

	.information {
		text-align: center;
		color: rgba(16, 16, 16, 100);
		font-size: 24rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-right: 94rpx;
		margin-bottom: 40rpx;
	}

	.informations {
		text-align: center;
		color: rgba(16, 16, 16, 100);
		font-size: 24rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-bottom: 40rpx;
	}

	.information-img image {
		width: 80rpx;
		height: 80rpx;
		margin-bottom: 20rpx;
		margin-left: 8rpx;
		text-align: center;
	}

	.culture-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0rpx 30rpx 20rpx 30rpx;
	}

	.culture-name {
		color: rgba(219, 144, 58, 100);
		font-size: 42rpx;
		text-align: left;
		font-family: PingFangSC-semiBold;
	}

	.culture-more {
		color: rgba(153, 153, 153, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.culture-more image {
		width: 24rpx;
		height: 24rpx;
		margin-left: 14rpx;
	}

	.culture-bottom {
		margin: 0 30rpx;
	}

	.culture-item {
		width: 690rpx;
		height: 218rpx;
		border-radius: 20rpx;
		background-color: rgba(255, 255, 255, 100);
		border: 2rpx solid rgba(187, 187, 187, 100);
		display: flex;
		margin-bottom: 20rpx;
	}

	.culture-img image {
		width: 330rpx;
		height: 180rpx;
		border-radius: 10rpx;
		margin: 20rpx;
	}

	.introduce {
		width: 100%;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
		margin-top: 32rpx;
		position: relative;
	}

	.time {
		width: 100%;
		position: absolute;
		bottom: 18rpx;
		color: rgba(153, 153, 153, 100);
		font-size: 24rpx;
		font-family: PingFangSC-regular;
		/* margin-top: 60rpx; */
	}

	.introduce-explain {
		/* height: 70rpx; */
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.art {
		margin: 0 30rpx;
	}

	.art-item {
		margin-bottom: 20rpx;
	}

	.art-img image {
		width: 690rpx;
		height: 380rpx;
		border-radius: 20rpx 20rpx 0px 0px;
	}
	.art-cont {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.art-title {
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
		margin-top: 18rpx;
	}
	.art-era-warp {
		display: flex;
	}
	.art-era {
		color: rgba(153, 153, 153, 100);
		font-size: 24rpx;
		font-family: PingFangSC-regular;
		margin-top: 10rpx;
		margin-right: 8rpx;
	}
	
	.art-eras {
		color: rgba(153, 153, 153, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
		margin-top: 10rpx;
		margin-right: 8rpx;
	}

	.intangible-bottom {
		margin: 0 30rpx;
	}

	.intangible-item {
		display: flex;
		border-bottom: solid 1rpx #e6e6e6;
		padding-bottom: 24rpx;
		margin-bottom: 30rpx;
	}

	.intangible-img image {
		width: 236rpx;
		height: 144rpx;
		border-radius: 10rpx;
	}

	.intangible-explain {
		margin-left: 20rpx;
		color: rgba(153, 153, 153, 100);
		font-size: 24rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.intangible-name {
		height: 40rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-bottom: 28rpx;
		margin-top: 4rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	
	.source {
		height: 32rpx;
	}

	.intangible-time {
		margin-top: 10rpx;
	}

	.live {
		margin: 0 30rpx;
	}

	.live-item {}
	
	.video {
		width: 690rpx;
		height: 380rpx;
		border-radius: 20rpx 20rpx 0px 0px;
	}

	.live-img image {
		width: 690rpx;
		height: 380rpx;
		border-radius: 20rpx 20rpx 0px 0px;
	}

	.live-name {
		margin-top: 18rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.travel {
		margin: 0 30rpx;
	}

	.travel-item {
		width: 690rpx;
		height: 218rpx;
		border-radius: 20rpx;
		background-color: rgba(255, 255, 255, 100);
		box-shadow: 0px 2rpx 8rpx 0px rgba(0, 0, 0, 0.4);
		display: flex;
		margin-bottom: 20rpx;
	}

	.travel-img image {
		width: 330rpx;
		height: 218rpx;
		border-radius: 20rpx 0px 0px 20rpx;
	}

	.travel-right {
		margin-left: 20rpx;
		color: rgba(153, 153, 153, 100);
		font-size: 24rpx;
		font-family: PingFangSC-regular;
	}

	.travel-name {
		margin-top: 24rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		margin-bottom: 20rpx;
	}

	.tap {
		display: flex;
		margin-bottom: 12rpx;
	}

	.choiceness {
		width: 76rpx;
		height: 40rpx;
		line-height: 40rpx;
		color: rgba(238, 164, 94, 100);
		font-size: 24rpx;
		text-align: center;
		font-family: Arial;
		border: 2rpx solid rgba(238, 164, 94, 100);
		border-radius: 12rpx;
	}

	.nature {
		width: 116rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 12rpx;
		background-color: rgba(255, 255, 255, 100);
		color: rgba(82, 167, 255, 100);
		font-size: 24rpx;
		text-align: center;
		font-family: Arial;
		border: 2rpx solid rgba(82, 167, 255, 100);
		margin-left: 12rpx;
	}

	.gl {
		margin-top: 8rpx;
	}

	.cumulostratu {
		position: fixed;
		right: 34rpx;
		bottom: 128rpx;
		width: 84rpx;
		height: 84rpx;
		line-height: 84rpx;
		background-color: rgba(82, 167, 255, 100);
		color: rgba(255, 255, 255, 100);
		font-size: 20rpx;
		text-align: center;
		font-family: Arial;
		border-radius: 50%;
	}

	.swiper {
		/* width: 750rpx; */
		height: 376rpx;
	}

	.imgs image {
		margin-top: 30rpx;
		width: 290rpx;
		height: 39rpx;
		margin-left: 455rpx;
	}
</style>
