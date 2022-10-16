<template>
	<view>
		<view class="lolo">
			<view class="detail-img">
				<image :src="venue.cover"></image>
			</view>
			<!-- <view class="select">
				<view :class="index==1?'videos':'video'" @click="select(1)">视</view>
				<view :class="index == 0 ?'img':'imgs'" @click="select(0)">图</view>
			</view> -->
		</view>
		<view class="content">
			<view class="name">{{venue.name}}</view>
			<view class="contact-way">
				<view class="contact-left" @click="getpone(venue.tel)">
					<image src="../../static/ic-phone.png"></image>
					<view>联系方式: {{venue.tel}}</view>
				</view>
				<view>
					<image class="right" src="../../static/ic_ri.png"></image>
				</view>
			</view>
			<view class="time">
				<view class="time-img">
					<image src="../../static/ic-time.png"></image>
				</view>
				<view>开馆时间:{{venue.start_time}}</view>
			</view>
			<view class="times">
				<view class="time-img">
					<image src="../../static/ic-time.png"></image>
				</view>
				<view>闭馆时间:{{venue.end_time}}</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="traffic">
			<view class="traffic-name">交通查询</view>
			<view class="scenery-spot">
				<view class="scenic-area">
					<view>无极龙宫殿景区</view>
					<view @click="to_map">
						<image class="daohang" src="../../static/daohang.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="weather">
			<view>当地天气</view>
		</view>
		<view class="line"></view>
		<view>
			<view class="venue-details-facilities">
				<text class="venue-details-facilities-text">配套设施</text>
			</view>
			<view class="venue-list">
				<view class="venue-details-Parking" v-for="(item,index) in venue.facilities" :key="index">
					<view class="venue-details-Parking-img">
						<image :src="item.icon" ></image>
					</view>
					<view class="venue-details-Parking-txt">
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="jiesao">
			<view>场馆介绍</view>
			<u-parse :content="venue.content" class="jiesao-txt"></u-parse>
			<!-- <view class="jiesao-txt">
				场馆介绍场馆介绍场馆介绍场馆介绍场馆介绍场馆介绍场馆介绍场馆介绍场馆介绍场馆介绍场馆介绍场馆介绍场馆介绍场馆介绍场馆介绍场馆介绍场馆介绍场馆介绍
			</view> -->
		</view>
		<view class="site">
			<view class="site-name">场地预订</view>
			<view class="venue-booking-item"  v-for="(items,indexs) in yard" @click="place(items)" :key="indexs">
				<view class="venue-left">
					<view class="venue-img">
						<image :src="items.cover"></image>
					</view>
					<view class="venue-txt">
						<view>{{items.name}}</view>
						<view class="sizes">大小: 80m²</view>
					</view>
				</view>
				<view class="venue-right">
					<image src="../../static/ic_ri.png"></image>
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
				index: 0,
				venue_id:'',
				venue:'',
				yard:[]
			}
		},
		methods: {
			select(e) {
				this.index = e
			},
			place(item){
				uni.navigateTo({
					url:'../place/place?id=' + item.id
				})
			},
			//拨打电话
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
			detail(){
				this.$request('/api/venue/view', {
					id: this.venue_id
				}, 'post', {}).then(res => {
					if (res.code === 1) {
						// let arr = res.data.venue.position.split(",");
						// res.data.venue.latitude = arr[1]
						// res.data.venue.longitude = arr[0]
						this.venue = res.data.venue;
						
						uni.setNavigationBarTitle({
						　　title:this.venue.name
						})
						this.yard = res.data.lists
					}
				
				})
			},
			to_map() {
				console.log(this.venue)
				let position = this.venue.position.split(",");
				let latitude = position[1]
				let longitude = position[0]
				console.log(latitude,longitude)
				let that = this
				//#ifdef H5
				let ua = window.navigator.userAgent.toLowerCase()
				if (ua.match(/MicroMessenger/i) == 'micromessenger') {
					this.initJssdkShare(function(res) {
						jweixin.ready(function() {
							jweixin.checkJsApi({
								jsApiList: [
									'openLocation'
								],
								success: function(res) {
									if (res.checkResult.getLocation == false) {
										uni.showToast({
											title: that.nideweixinbanbentaidi + '，' +
												that
												.qingshengjidaozuixindeweixinbanben +
												'！',
											duration: 2000,
											icon: 'none'
										})
										return;
									}
								}
							});
							jweixin.openLocation({
								latitude: latitude,
								longitude: longitude,
								name: that.venue.venue.name,
								address: that.venue.venue.name,
								scale: 20,
							})
						});
					})
				} //#endif
			
				//#ifdef MP-WEIXIN
			
				uni.openLocation({
					latitude: latitude,
					longitude: longitude,
					success: function() {}
				});
				//#endif
				//#ifdef APP-PLUS
				plus.nativeUI.actionSheet({ //选择菜单
					title: "打开本机APP",
					cancel: "取消",
					buttons: [{
						title: "腾讯地图"
					}]
				}, function(e) {
					let url = ''
					switch (e.index) {
						//下面是拼接url,不同系统以及不同地图都有不同的拼接字段
						case 1:
							//注意referer=xxx的xxx替换成你在腾讯地图开发平台申请的key
							url =
								`qqmap://map/geocoder?coord=${latitude},${longitude}&referer=B4NBZ-ZZ6CD-OJS4H-PQSAL-U6W6H-WPB2L`;
							break;
						default:
							break;
					}
					if (url != "") {
						url = encodeURI(url);
						//plus.runtime.openURL(url,function(e){})调起手机APP应用
						plus.runtime.openURL(url, function(e) {
							plus.nativeUI.alert("本机未安装指定的地图应用");
						});
					}
				})
				//#endif
			},
			initJssdkShare: function(callback) {
				let url = 'pages/venu-detail/venu-detail?id=' + this.venue_id
				this.$request('/api/common/getJssdkTicket', {
					'url': url,
				}, 'post', {}).then(res => {
					if (res.data) {
						jweixin.config({
							debug: false,
							appId: res.data.appId,
							timestamp: res.data.timestamp,
							nonceStr: res.data.nonceStr,
							signature: res.data.signature,
							jsApiList: [
								'checkJsApi',
								'openLocation'
							]
						});
						if (callback) {
							callback(res.data);
						}
					}
				});
			},
		},
		onLoad(e){
			this.venue_id = e.id
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
		/* align-items: center; */
		padding: 28rpx 0 24rpx 0;
		border-bottom: solid 1rpx #eeeeee;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.times {
		display: flex;
		/* align-items: center; */
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
	.venue-list {
		display: flex;
	}
	.venue-details-Parking {
		margin-top: 40rpx;
		height: 100rpx;
		text-align: center;
	}
	
	.venue-details-Parking image {
		width: 44rpx;
		height: 44rpx;
		margin-left: 88rpx;
	}
	.venue-details-Parking-txt text {
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
	}
	.site {
		margin: 0 30rpx;
		padding-bottom: 30rpx;
	}
	.site-name {
		font-size: 32rpx;
	}
	.venue-booking-item {
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.venue-img image{
		width: 280rpx;
		height: 160rpx;
		border-radius: 10rpx;
		margin-right: 30rpx;
	}
	.venue-txt {
		margin-top: 10rpx;
	}
	.sizes {
		color: #999999;
		font-size: 24rpx;
		margin-top: 10rpx;
	}
	.venue-left {
		display: flex;
	}
	.venue-right image {
		width: 36rpx;
		height: 36rpx;
	}
</style>
