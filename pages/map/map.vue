<template>
	<view>
		<view class="map-img">
			<view class="seach">
				<view class="shuru">
					<input placeholder="请输入" />
				</view>
				<view class="sea-img">
					<image src="../../static/ic_search.png"></image>
				</view>
			</view>
			<view class="page-section page-section-gap">
				<map class="maps" :style="{ 'height': height + 'px'}" :latitude="latitude" :longitude="longitude"
					:markers="covers" enable-3D="false" show-compass="false" enable-overlooking="false" @markertap="anchuors">
				</map>
			</view>
		</view>
		<view class="content-item">
			<swiper class="resource" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item v-for="(item, index) in first" :key="index" class="displayfirst">
					<view class="displaysecond" v-for="(its,index) in item">
						<view class="map_img" :style="{backgroundImage:`url(${its.cover})`}" @click="venue_go(its)">
						</view>
						<view>{{its.title}}</view>
					</view>
				</swiper-item>
			</swiper>
			<!-- <view class="information" @click="map">
				<view class="information-img">
					<image src="../../static/ic_Hierarchicalcloud.png"></image>
				</view>
				<view style="text-align: center;">文化馆</view>
			</view>
			<view class="information" @click="art">
				<view class="information-img">
					<image src="../../static/ic_Hierarchicalcloud.png"></image>
				</view>
				<view style="text-align: center;">图书馆</view>
			</view>
			<view class="information" @click="intangible">
				<view class="information-img">
					<image src="../../static/ic_Hierarchicalcloud.png"></image>
				</view>
				<view style="text-align: center;">文化站</view>
			</view>
			<view class="informations" @click="carny">
				<view class="information-img">
					<image src="../../static/ic_Hierarchicalcloud.png"></image>
				</view>
				<view style="text-align: center;">景点</view>
			</view>
			<view class="information" @click="venue">
				<view class="information-img">
					<image src="../../static/ic_Hierarchicalcloud.png"></image>
				</view>
				<view style="text-align: center;">KTV</view>
			</view>
			<view class="information" @click="activity">
				<view class="information-img">
					<image src="../../static/ic_Hierarchicalcloud.png"></image>
				</view>
				<view style="text-align: center;">酒店</view>
			</view>
			<view class="information" @click="match">
				<view class="information-img">
					<image src="../../static/ic_Hierarchicalcloud.png"></image>
				</view>
				<view style="text-align: center;">美食</view>
			</view>
			<view class="informations" @click="broadcast">
				<view class="information-img">
					<image src="../../static/ic_Hierarchicalcloud.png"></image>
				</view>
				<view style="text-align: center;">电影院</view>
			</view> -->
		</view>
		<view class="mapDetail" v-show="showModel">
			<view class="detail">
				<view class="detail-img">
					<image src="../../static/bj.jpg"></image>
				</view>
				<view class="detail-close" @click="detail">
					<image src="../../static/close.png"></image>
				</view>
				<view class="adress">
					<view class="adress-name">改地址名称</view>
					<view class="adress-site">
						<view>地址：广东省深圳市宝安区宝安大道</view>
						<image class="site-img" src="../../static/navigation.png"></image>
					</view>
					<view class="detail-time">开馆时间：08:30</view>
					<view class="adress-site">
						<view>联系方式：18888888888</view>
						<image class="site-img" src="../../static/ic_phone.png"></image>
					</view>
					<view class="introduce">
						<view>介绍：</view>
						<view> 
							该地址介绍该地址介绍该地址介绍该地址介绍该
							地址介绍该地址介绍该地址介绍该地址介绍该地址
							介绍该地址介绍该地址介绍该地址介绍
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	//#ifdef H5
	import jweixin from 'jweixin-module';
	//#endif
	export default {
		data() {
			return {
				qingshengjidaozuixindeweixinbanben: '',
				nideweixinbanbentaidi: '',
				height: '560',
				longitude: 101.610916, //经度101.610916
				latitude: 37.386066, //纬度37.386066
				venue: [],
				hh: '',
				hhs: '',
				// 轮播图
				indicatorDots: true,
				autoplay: true,
				interval: 2000, //切换的间隔时间 
				duration: 600, //滑动动画时长
				// 存储第一次轮播
				first: [],
				// 存储第二次轮播
				second: [],
				//公共的数组
				all: [],
				area: '1',
				hr: '',
				showModel:false,
				covers: [{
					id:'1',
					latitude: 37.386066,
					longitude: 101.610916,
					iconPath: '../../static/address.png'
				}, {
					id:'2',
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '../../static/address.png'
				},{
					id:'3',
					latitude: 39.386066,
					longitude: 104.610916,
					iconPath: '../../static/address.png'
				},]
			}
		},
		methods: {
			venue_go(item) {
				uni.navigateTo({
					url: '../subclass/subclass?id=' + item.id + '&title=' + item.title
				})
			},
			detail(){
				this.showModel = !this.showModel
			},
			anchuors(e){
				console.log('点击定位标时触发',e)
				this.showModel = !this.showModel
			},
			initJssdkShare: function(callback) {
				// alert(location.href.split('#')[0])
				let that = this
				let url = 'pages/map/map'
				console.log(url)
				// that.hr = url
				this.$request('/api/common/getJssdkTicket', {
					'url': url
				}, 'post', {}).then(res => {
					// that.hr = res
					if (res.data) {
						jweixin.config({
							debug: false,
							appId: res.data.appId,
							timestamp: res.data.timestamp,
							nonceStr: res.data.nonceStr,
							signature: res.data.signature,
							jsApiList: [
								'checkJsApi',
								'getLocation'
							]
						});

						if (callback) {
							callback(res.data);
						}
					}
				});
			},
		},
		onShow(e) {
			this.qingshengjidaozuixindeweixinbanben = this.$lang.qingshengjidaozuixindeweixinbanben[uni.getStorageSync(
				'lang')];
			this.nideweixinbanbentaidi = this.$lang.nideweixinbanbentaidi[uni.getStorageSync('lang')];
		},
		onLoad(e) {
			this.qingshengjidaozuixindeweixinbanben = this.$lang.qingshengjidaozuixindeweixinbanben[uni.getStorageSync(
				'lang')];
			this.nideweixinbanbentaidi = this.$lang.nideweixinbanbentaidi[uni.getStorageSync('lang')];
			let that = this

			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight
					this.height = height - 240;
				}
			});

			if (e.area == 'undefined' || e.area == undefined || e.area == '' || e.area == null) {
				if (uni.getStorageSync('area')) {
					this.area = uni.getStorageSync('area')
				}
			} else {
				this.area = e.area
				uni.setStorageSync('area', this.area)
			}


			//#ifdef H5
			let ua = window.navigator.userAgent.toLowerCase()
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				this.initJssdkShare(function(res) {
					// that.hr = '进入微信'
					jweixin.ready(function() {
						// that.hr = '进入微信'
						jweixin.checkJsApi({
							jsApiList: [
								'getLocation'
							],
							success: function(res) {
								// that.hr = res.checkResult
								if (res.checkResult.getLocation == false) {
									uni.showToast({
										title: that.nideweixinbanbentaidi + '，' + that
											.qingshengjidaozuixindeweixinbanben + '！',
										duration: 2000,
										icon: 'none'
									})
									return;
								}
							}
						});
						jweixin.getLocation({
							type: 'gcj02',
							success: function(res) {
								console.log(res)
								that.longitude = res.longitude
								that.latitude = res.latitude
							},
							fail: function(ress) {
								// uni.showModal({
								// 	cancelText:ress
								// })
								// that.hr = ress
								if (typeof fail === 'function') {

									fail(res);

								}

							}

						})
					})
				})
			}
			//#endif
			//#ifndef H5
			uni.getLocation({
				type: 'gcj02',
				altitude: true,
				success: function(res) {
					console.log(res)
					that.longitude = res.longitude
					that.latitude = res.latitude
				}
			})
			//#endif
			console.log(that.longitude, that.latitude)
			let covers = []
			this.$request('/api/venue/get_all_list', {
				area: this.area,
			}, 'post', {}).then(res => {
				// if (res.code === 1) {
				// 	res.data.lists.forEach((item, index) => {
				// 		let arr = item.position.split(",");
				// 		let latitude = arr[1]
				// 		let longitude = arr[0]
				// 		covers[index] = {
				// 			id: item.id,
				// 			latitude: arr[1],
				// 			longitude: arr[0],
				// 			iconPath: '../../static/location-red.png',
				// 			title: item.address
				// 		}
				// 	})
				// 	that.covers = covers
				// }
			})

			this.$request('/api/venue/get_category', {}, 'post', {}).then(res => {
				that.venue = res.data.lists
				// let index = 8
				let second = []
				let first = []
				second = that.venue.splice(0, 8) //删除0-8
				// console.log(second)
				// console.log(that.venue)
				first.push(second)
				first.push(that.venue)
				that.first = first
				// console.log(that.first)
				// hhs=that.venue
				// console.log(first)

			})
		}
	}
</script>

<style>
	.map-img {
		height: 986rpx;
		position: relative;
	}

	.maps {
		width: 100%
	}

	.seach {
		position: absolute;
		top: 0;
		width: 650rpx;
		margin: 0 50rpx;
		height: 80rpx;
		background-color: #fefefe;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border: solid 1rpx #f7f7f7;
		z-index: 1;
	}

	.shuru {
		margin-left: 40rpx;

	}

	.sea-img {
		height: 70rpx;
		border-left: solid 1rpx #a8a8a8;
		line-height: 90rpx;
	}

	.sea-img image {
		width: 40rpx;
		height: 40rpx;
		margin-right: 40rpx;
		padding-left: 20rpx;
	}

	.content {
		padding: 106rpx 68rpx 0 68rpx;
	}

	.content-item {
		display: flex;
		/* 	justify-content: space-between; */
		flex-wrap: wrap;
		position: fixed;
		width: 100%;
		bottom: 0;
		padding: 0 30rpx;
	}

	.information {
		text-align: center;
		color: rgba(16, 16, 16, 100);
		font-size: 24rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-right: 106rpx;
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

	.resource {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		margin-bottom: 20rpx;
		margin-top: 30rpx;
		width: 100%;
		height: 400rpx;
		/* border: 1rpx solid yellow; */
	}


	.displayfirst {
		display: flex;
		flex-wrap: wrap;
		/* justify-content: space-around; */
	}

	.displaysecond {
		width: 160rpx;
		/* border: 1rpx solid red; */
		text-align: center;
		color: rgba(16, 16, 16, 100);
		font-size: 24rpx;
		font-family: PingFangSC-regular;
		height: 160rpx;
		margin-left: 10rpx;
		margin-bottom: 10rpx;
	}

	.culture {
		margin-top: 22rpx;
		width: 248rpx;
		height: 156rpx;
		background: #E8E8E8;
		line-height: 50rpx;
		padding-left: 30rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
		background-size: 100% 100%;
		border-right: solid 1px #EEEEEE;
		border-top: solid 1px #EEEEEE;
		border-bottom: solid 1px #EEEEEE;
	}

	.map {
		width: 160rpx;
		border: 1rpx solid red;
		text-align: center;
		color: rgba(16, 16, 16, 100);
		font-size: 24rpx;
		font-family: PingFangSC-regular;
		height: 160rpx;
		margin-left: 10rpx;
		margin-bottom: 10rpx;
	}

	.map_img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		background-size: 100% 100%;
		line-height: 260rpx;
		margin-left: 20rpx;
	}
	
	.mapDetail {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.23);
		z-index: 2;
	}
	.detail {
		width: 690rpx;
		background-color: #ffffff;
		position: absolute;
		left: 30rpx;
		top: 22%;
	}
	.detail-img image{
		width: 690rpx;
		height: 380rpx;
	}
	.detail-close image{
		position: absolute;
		top: -22rpx;
		right: -22rpx;
		width: 50rpx;
		height: 50rpx;
	}
	.adress {
		margin: 30rpx;
	}
	.adress-name {
		color: rgba(16, 16, 16, 100);
		font-size: 36rpx;
		font-family: SourceHanSansSC-regular;
	}
	.adress-site {
		display: flex;
		justify-content: space-between;
		padding-bottom: 20rpx;
		border-bottom: solid 1rpx #eeeeee;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		margin-top: 24rpx;
	}
	.site-img {
		width: 36rpx;
		height: 36rpx;
	}
	.detail-time {
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		padding: 20rpx 0;
		border-bottom: solid 1rpx #eeeeee;
	}
	.introduce {
		margin-top: 22rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
	}
	.introduce view {
		margin-bottom: 22rpx;
	}
</style>
