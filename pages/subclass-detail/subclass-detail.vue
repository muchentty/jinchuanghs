<template>
	<view class="venue-details">
		<view class="venue-details-top">
			<image :src="venue.cover"></image>
		</view>
		<view class="venue-details-area">
			<view class="venue-details-area-item">
				<view class="venue-details-area-item2">
					<text>{{venue.name}}</text>
				</view>
				<view class="venue-details-area-item3">
					<text>{{venue.start_time}}-{{venue.end_time}}</text>
				</view>
			</view>
			<view class="solid">

			</view>
			<view class="venue-details-area-item1" @click="to_map">
				<view class="venue-details-area-item1-display">
					<view class="venue-details-map">
						<image src="../../static/map.png" mode=""></image>
					</view>
					<view class="venue-details-address">
						<text>{{venue.address}}</text>
					</view>
					<view class="venue-details-tomap">
						<image src="../../static/ic_Navigation.png" mode=""></image>
					</view>
				</view>
				<view class="venue-details-phone">
				</view>
			</view>
			<view class="solid">

			</view>
			<view class="venue-details-area-item1">
				<view class="venue-details-area-item1-display" @click="getpone(venue.tel)">
					<view class="venue-details-map">
						<image src="../../static/phone.png" mode=""></image>
					</view>
					<view class="venue-details-address">
						<text>{{venue.tel}}</text>
					</view>
				</view>
				<view class="venue-details-phone">

				</view>
			</view>
			<view class="venue-booking" style="margin-top: 30rpx;" v-if="title == '酒店民宿' || title == '酒店'">
				<view class="venue-details-area-item1-display" @click="getpone(venue.tel)">
					<view class="venue-details-map">
						{{yudingfangshi}}
					</view>
					<view class="venue-details-address">
						<text> {{venue.book}}</text>
					</view>
				</view>
			</view>
			<view class="venue-details-area-item1" v-else>

			</view>
			<view class="solidB"></view>
			<view class="venue-details-facilities">
				<text class="venue-details-facilities-text">{{peitaosheshi}}</text>
			</view>
			<view class="venue-details-Parking" v-for="its in venue.facilities">
				<view class="venue-details-Parking-img">
					<image :src="its.icon" mode=""></image>
				</view>
				<view class="venue-details-Parking-txt">
					<text>{{its.name}}</text>
				</view>
			</view>
			<view class="solidC">

			</view>
			<view class="venue-details-show">
				<view class="venue-details-show-txt1" v-if="title=='酒店民宿' || title == '酒店'">
					{{jiudianjieshao}}
				</view>
				<view class="venue-details-show-txt1" v-else>
					{{changguanjieshao}}
				</view>
				<view class="venue-details-show-txt2">
					<view class="wen" style="width: 100%;overflow: hidden;" v-html="context" v-if="is_h5==1"></view>
					<u-parse :content="context" v-if="is_h5==0"></u-parse>
				</view>
			</view>
			<view class="solidD">

			</view>
			<view class="venue-booking" v-if="title == '酒店民宿' || title == '酒店'">

			</view>
			<view class="venue-booking" v-else>
				<view class="venue-booking-txt1">
					{{changdiyuding}}
				</view>
				<view class="venue-booking-item" @click="introductionrehearsal(items)" v-for="items in yard">
					<view class="venue-booking-item-img1">
						<image :src="items.cover" mode=""></image>
					</view>
					<view class="venue-booking-item-txt">
						<text class="venue-booking-item-txt1">{{items.name}}</text>
						<br />
						<!-- <text class="venue-booking-item-txt2">{{items.content}}</text> -->
					</view>
					<view class="venue-booking-item-img2">
						<image src="../../static/ic_ri.png" mode=""></image>
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
				peitaosheshi: '',
				changguanjieshao: '',
				changdiyuding: '',
				venue_id: '',
				venue: [],
				yard: [],
				is_h5: 1,
				context: '',
				title: '',
				jiudianjieshao: '',
				yudingfangshi: ''
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
			to_map() {
				let latitude = Number(this.venue.latitude)
				let longitude = Number(this.venue.longitude)
				console.log(this.venue)
				console.log(latitude, longitude)
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
				let url = 'pages/venue-details/venue-details?id=' + this.venue_id + '&title=' + this.title
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
			introductionrehearsal(items) {

				let id = items.id
				uni.navigateTo({
					url: '../place/place?id=' + id
				})

			},
			formatRichText(html) {
				let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
					match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
					match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
					match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
					return match;
				});
				newContent = html.replace(/<video[^>]*>/gi, function(match, capture) {
					match = match.replace(/width="[^"]+"/gi, 'style="width:100%"').replace(/width='[^']+'/gi, '');
					match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
					return match;
				});
				newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
					match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi,
						'max-width:100%;');
					return match;
				});
				newContent = newContent.replace(/<br[^>]*\/>/gi, '');
				newContent = newContent.replace(/\<img/gi,
					'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
				return newContent;
			}
		},
		onShow(e) {
			this.yudingfangshi = this.$lang.yudingfangshi[uni.getStorageSync('lang')];
			this.qingshengjidaozuixindeweixinbanben = this.$lang.qingshengjidaozuixindeweixinbanben[uni.getStorageSync(
				'lang')];
			this.nideweixinbanbentaidi = this.$lang.nideweixinbanbentaidi[uni.getStorageSync('lang')];
			this.peitaosheshi = this.$lang.peitaosheshi[uni.getStorageSync('lang')];
			this.changguanjieshao = this.$lang.changguanjieshao[uni.getStorageSync('lang')];
			this.changdiyuding = this.$lang.changdiyuding[uni.getStorageSync('lang')];
			this.jiudianjieshao = this.$lang.jiudianjieshao[uni.getStorageSync('lang')];
		},
		onLoad(e) {
			this.yudingfangshi = this.$lang.yudingfangshi[uni.getStorageSync('lang')];
			this.qingshengjidaozuixindeweixinbanben = this.$lang.qingshengjidaozuixindeweixinbanben[uni.getStorageSync(
				'lang')];
			this.nideweixinbanbentaidi = this.$lang.nideweixinbanbentaidi[uni.getStorageSync('lang')];
			this.peitaosheshi = this.$lang.peitaosheshi[uni.getStorageSync('lang')];
			this.changguanjieshao = this.$lang.changguanjieshao[uni.getStorageSync('lang')];
			this.changdiyuding = this.$lang.changdiyuding[uni.getStorageSync('lang')];
			this.jiudianjieshao = this.$lang.jiudianjieshao[uni.getStorageSync('lang')];
			this.title = e.title;
			//#ifdef MP-WEIXIN
			this.is_h5 = 0;
			//#endif
			this.venue_id = e.id
			this.$request('/api/venue/view', {
				id: this.venue_id
			}, 'post', {}).then(res => {
				if (res.code === 1) {
					let arr = res.data.venue.position.split(",");
					res.data.venue.latitude = arr[1]
					res.data.venue.longitude = arr[0]
					this.venue = res.data.venue;
					uni.setNavigationBarTitle({
						title: this.venue.name
					})
					this.yard = res.data.lists
					this.context = this.formatRichText(res.data.venue.content);

				}

			})
		}
	}
</script>

<style>
	.venue-details-area-item,
	.venue-details-area-item1,
	.venue-details-facilities,
	.venue-details-show,
	.venue-booking {
		padding: 0rpx 30rpx;
	}

	.solid {
		width: 98%;
		height: 1px;
		background: #333333;
		opacity: 0.15;
		margin-left: 30rpx;
		margin-bottom: 41rpx;
		margin-top: 41rpx;
	}

	.solidB {
		width: 100%;
		height: 20rpx;
		background: #F7F7F7;

		margin: 41rpx 0rpx;
	}

	.solidC {
		width: 100%;
		height: 20Rpx;
		background: #F7F7F7;
		margin: 0rpx 0rpx 40rpx 0rpx;
	}

	.solidD {
		width: 100%;
		height: 20rpx;
		background: #F7F7F7;

		margin-bottom: 39rpx;
	}

	.venue-details-top image {
		width: 100%;
		height: 433rpx;
	}

	.venue-details-area {
		position: absolute;
		top: 410rpx;
		width: 100%;
		height: 355rpx;
		background: #FFFFFF;

		border-radius: 30rpx 30rpx 0px 0px;
	}

	.venue-details-area-item2 {
		margin-top: 30rpx;
	}

	.venue-details-area-item2 text {
		width: 220rpx;
		height: 31rpx;
		font-size: 32rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #333333;
		line-height: 36rpx;
		padding: 30rpx 0rpx 22rpx 0rpx;

	}

	.venue-details-area-item3 {
		margin-top: 22rpx;
		margin-bottom: 27rpx;
	}

	.venue-details-area-item3 text {
		width: 71rpx;
		height: 22rpx;
		font-size: 24rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #999999;
		line-height: 36rpx;
		margin-right: 26rpx;
	}

	.venue-details-address text {
		width: 325rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #333333;
		line-height: 36rpx;
	}

	.venue-details-area-item1 {
		display: flex;
		justify-content: space-between;
	}

	.venue-details-area-item1-display {
		display: flex;
		justify-content: space-between;
	}

	.venue-details-map image {
		width: 30rpx;
		height: 30rpx;
		margin-right: 12rpx;
	}

	.venue-details-tomap {
		left: 150px;
		position: relative;
	}

	.venue-details-tomap image {
		width: 30rpx;
		height: 30rpx;
		margin-right: 12rpx;
	}

	.venue-details-phone image {
		width: 30rpx;
		height: 28rpx;
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

	.venue-details-show-txt1 {

		height: 31rpx;
		font-size: 32rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #333333;
		line-height: 36rpx;
		margin-bottom: 29rpx;
	}

	.venue-details-show-txt2 {
		font-size: 28rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #333333;
		line-height: 43rpx;
		text-indent: 40rpx;

	}

	.venue-booking-txt1 {


		font-size: 32rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #333333;
		line-height: 36rpx;
		margin-bottom: 30rpx;
	}

	.venue-booking-item {
		display: flex;
		border-bottom: 1px solid rgba(200, 200, 200, 0.75);
		padding: 0rpx 0rpx 20rpx 0rpx;
		margin-top: 20rpx;
	}

	.venue-booking-item-txt {
		margin-left: 12rpx;
		width: 100%;

	}

	.venue-booking-item-txt1 {
		width: 111rpx;
		height: 27rpx;
		font-size: 28rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #333333;
		line-height: 36rpx;
	}

	.venue-booking-item-txt2 {
		width: 380rpx;
		height: 110rpx;
		font-size: 22rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #333333;
		line-height: 36rpx;
		display: block;

		white-space: wrap;

		overflow: hidden;

		text-overflow: ellipsis;

		-o-text-overflow: ellipsis;

		text-decoration: none;

	}

	.venue-booking-item-img1 image {
		width: 280rpx;
		height: 160rpx;
	}

	.venue-booking-item-img2 image {
		width: 24rpx;
		height: 24rpx;
		position: relative;
		top: 38rpx;

	}

	/* #ifdef MP-WEIXIN */
	/**
	 * author: Di (微信小程序开发工程师)
	 * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
	 *         垂直微信小程序开发交流社区
	 *
	 * github地址: https://github.com/icindy/wxParse
	 *
	 * for: 微信小程序富文本解析
	 * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
	 */
	.wxParse {
		width: 100%;
		font-family: Helvetica, sans-serif;
		font-size: 30upx;
		color: #666;
		line-height: 1.8;
	}

	.wxParse view {
		display: inline;
		word-break: hyphenate;
	}

	.wxParse .inline {
		display: inline;
		margin: 0;
		padding: 0;
	}

	.block {
		display: block !important;
		margin: 0;
		padding: 0;
	}

	.wxParse .div {
		margin: 0;
		padding: 0;
	}

	.wxParse .h1 .text {
		font-size: 2em;
		margin: 0.67em 0;
	}

	.wxParse .h2 .text {
		font-size: 1.5em;
		margin: 0.83em 0;
	}

	.wxParse .h3 .text {
		font-size: 1.17em;
		margin: 1em 0;
	}

	.wxParse .h4 .text {
		margin: 1.33em 0;
	}

	.wxParse .h5 .text {
		font-size: 0.83em;
		margin: 1.67em 0;
	}

	.wxParse .h6 .text {
		font-size: 0.67em;
		margin: 2.33em 0;
	}

	.wxParse .h1 .text,
	.wxParse .h2 .text,
	.wxParse .h3 .text,
	.wxParse .h4 .text,
	.wxParse .h5 .text,
	.wxParse .h6 .text,
	.wxParse .b,
	.wxParse .strong {
		font-weight: bolder;
	}


	.wxParse .p {
		margin: 1em 0;
	}

	.wxParse .i,
	.wxParse .cite,
	.wxParse .em,
	.wxParse .var,
	.wxParse .address {
		font-style: italic;
	}

	.wxParse .pre,
	.wxParse .tt,
	.wxParse .code,
	.wxParse .kbd,
	.wxParse .samp {
		font-family: monospace;
	}

	.wxParse .pre {
		overflow: auto;
		background: #f5f5f5;
		padding: 16upx;
		white-space: pre;
		margin: 1em 0upx;
	}

	.wxParse .code {
		display: inline;
		background: #f5f5f5;
	}

	.wxParse .big {
		font-size: 1.17em;
	}

	.wxParse .small,
	.wxParse .sub,
	.wxParse .sup {
		font-size: 0.83em;
	}

	.wxParse .sub {
		vertical-align: sub;
	}

	.wxParse .sup {
		vertical-align: super;
	}

	.wxParse .s,
	.wxParse .strike,
	.wxParse .del {
		text-decoration: line-through;
	}

	.wxParse .strong,
	.wxParse .s {
		display: inline;
	}

	.wxParse .a {
		color: deepskyblue;
	}

	.wxParse .video {
		text-align: center;
		margin: 22upx 0;
	}

	.wxParse .video-video {
		width: 100%;
	}

	.wxParse .img {
		display: inline-block;
		width: 0;
		height: 0;
		max-width: 100%;
		overflow: hidden;
	}

	.wxParse .blockquote {
		margin: 10upx 0;
		padding: 22upx 0 22upx 22upx;
		font-family: Courier, Calibri, "宋体";
		background: #f5f5f5;
		border-left: 6upx solid #dbdbdb;
	}

	.wxParse .blockquote .p {
		margin: 0;
	}

	.wxParse .ul,
	.wxParse .ol {
		display: block;
		margin: 1em 0;
		padding-left: 33upx;
	}

	.wxParse .ol {
		list-style-type: disc;
	}

	.wxParse .ol {
		list-style-type: decimal;
	}

	.wxParse .ol>weixin-parse-template,
	.wxParse .ul>weixin-parse-template {
		display: list-item;
		align-items: baseline;
		text-align: match-parent;
	}

	.wxParse .ol>.li,
	.wxParse .ul>.li {
		display: list-item;
		align-items: baseline;
		text-align: match-parent;
	}

	.wxParse .ul .ul,
	.wxParse .ol .ul {
		list-style-type: circle;
	}

	.wxParse .ol .ol .ul,
	.wxParse .ol .ul .ul,
	.wxParse .ul .ol .ul,
	.wxParse .ul .ul .ul {
		list-style-type: square;
	}

	.wxParse .u {
		text-decoration: underline;
	}

	.wxParse .hide {
		display: none;
	}

	.wxParse .del {
		display: inline;
	}

	.wxParse .figure {
		overflow: hidden;
	}

	.wxParse .table {
		width: 100%;
	}

	.wxParse .thead,
	.wxParse .tfoot,
	.wxParse .tr {
		display: flex;
		flex-direction: row;
	}

	.wxParse .tr {
		width: 100%;
		display: flex;
		border-right: 2upx solid #e0e0e0;
		border-bottom: 2upx solid #e0e0e0;
	}

	.wxParse .th,
	.wxParse .td {
		display: flex;
		width: 1276upx;
		overflow: auto;
		flex: 1;
		padding: 11upx;
		border-left: 2upx solid #e0e0e0;
	}

	.wxParse .td:last {
		border-top: 2upx solid #e0e0e0;
	}

	.wxParse .th {
		background: #f0f0f0;
		border-top: 2upx solid #e0e0e0;
	}

	/* #endif */
</style>
