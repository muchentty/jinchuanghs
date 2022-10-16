<template>
	<view class="aboutus">
		<view class="aboutustop">
			<view class="aboutustop-img">
				<image src="../../static/banner.png" mode=""></image>
			</view>
			<view class="aboutustop-txt">
				文化v {{ver}}
			</view>
		</view>
		<view class="aboutus-item">
			<view class="item-left">
				技术支持
			</view>
			<view class="item-right">
				进创（深圳）文化科技有限公司
			</view>
		</view>
		<view class="aboutus-item">
			<view class="item-left">
				联系电话
			</view>
			<view class="item-right">
				17688534238
			</view>
		</view>
		<view class="aboutus-item">
			<view class="item-left">
				地址
			</view>
			<view class="item-right">
				深圳市南山区南山街道跃华园大厦
			</view>
		</view>
		<view class="aboutus-item">
			<view class="item-left">
				ICP备案号
			</view>
			<view class="item-right">
				粤ICP备2022019221号
			</view>
		</view>
	</view>
</template>

<script>
	import config from 'utils/config.js'
	export default {
		data() {
			return {
				//版本详情
				editionList:[],
				ver:''
			}
		},
		methods: {
			
		},
		onLoad() {
			let that=this
			//#ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, function(inf) {
				that.ver = inf.version
			})
			//#endif
			//#ifndef APP-PLUS
			uni.request({
				//请求地址，设置为自己的服务器链接
				url: config.baseUrl + '/api/common/getAppVersion',
				//method: 'GET',  
				data: {},
				success: resMz => {
					that.ver = resMz.data.data.version
				}
			})
			//#endif
		},
	}
</script>

<style>
.aboutus{
	height: 100%;
	background-color: #F7F7F7;
}
.aboutustop{
	text-align: center;
	width: 749rpx;
	height: 490rpx;
	background: #FFFFFF;
	padding-bottom: 80rpx;
}
.aboutustop-img image{
	width: 300rpx;
	height: 300rpx;
	margin-top: 75rpx;
}
.aboutustop-txt{
	font-size: 28rpx;
	font-family: Adobe Heiti Std;
	font-weight: normal;
	color: #333333;
	margin-top: 20rpx;
}
.solid{
	height: 20rpx;
	width: 100%;
	background-color: #F7F7F7;
}
.aboutus-item{
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	background: #FFFFFF;
	border-bottom: 1rpx solid rgba(200,200,200,0.75);
}
.item-left{
	margin-left: 30rpx;
}
.item-right{
	margin-right: 30rpx;
}
</style>
