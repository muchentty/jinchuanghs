<template>
	<view>
		<view class="lolo">
			<view class="detail-img">
				<image :src="activity.cover"></image>
			</view>
			<view class="select">
				<view :class="index==1?'videos':'video'" @click="select(1)">视</view>
				<view :class="index == 0 ?'img':'imgs'" @click="select(0)">图</view>
			</view>
		</view>
		<view>
			<view>
				<view class="title">
					<view>{{activity.name}}</view>
					<!-- <view class="start" v-for="(item, index) in activity.rate" :key="index">
						<image class="start-img" src="../../static/start.png"></image>
					</view> -->
					<view class="start" v-show="activity.rate == 1">
						<image class="start-img" src="../../static/start.png"></image>
					</view>
					<view class="start" v-show="activity.rate == 2">
						<image class="start-img" src="../../static/start.png"></image>
						<image class="start-img" src="../../static/start.png"></image>
					</view>
					<view class="start" v-show="activity.rate == 3">
						<image class="start-img" src="../../static/start.png"></image>
						<image class="start-img" src="../../static/start.png"></image>
						<image class="start-img" src="../../static/start.png"></image>
					</view>
					<view class="start" v-show="activity.rate == 4">
						<image class="start-img" src="../../static/start.png"></image>
						<image class="start-img" src="../../static/start.png"></image>
						<image class="start-img" src="../../static/start.png"></image>
						<image class="start-img" src="../../static/start.png"></image>
					</view>
					<view class="start" v-show="activity.rate == 5">
						<image class="start-img" src="../../static/start.png"></image>
						<image class="start-img" src="../../static/start.png"></image>
						<image class="start-img" src="../../static/start.png"></image>
						<image class="start-img" src="../../static/start.png"></image>
						<image class="start-img" src="../../static/start.png"></image>
					</view>
				</view>
				<view class="money">￥198</view>
				<view class="xiao">
					<view>销量: {{activity.sort}}</view>
					<view class="like">
						<view class="like-img">
							<image src="../../static/ic_fabulous.png"></image>
						</view>
						<view>{{activity.like}}</view>
					</view>
					<view class="glance-over">
						<view class="glance-img">
							<image src="../../static/eys.png"></image>
						</view>
						<view>{{activity.see}}</view>
					</view>
				</view>
			</view>
			<view class="line"></view>
			<view class="introduce">
				<view class="introduce-title">产品介绍</view>
				<u-parse :content="activity.content"></u-parse>
			</view>
			<view class="line"></view>
			<view class="recommend">
				<view class="introduce-title">相关推荐</view>
				<!-- <view class="correlation">
					<view class="correlation-item">
						<view class="correlation-img">
							<image src="../../static/xiao.jpg"></image>
						</view>
						<view class="correlation-explain">
							<view class="correlation-name">
								关于申报第八批宝安区非物质文化遗产名录项目
							</view>
							<view class="correlation-money">￥198</view>
							<view class="start">
								<image class="start-img" src="../../static/start.png"></image>
								<image class="start-img" src="../../static/start.png"></image>
								<image class="start-img" src="../../static/start.png"></image>
								<image class="start-img" src="../../static/start.png"></image>
							</view>
						</view>
					</view>
					<view class="correlation-item">
						<view class="correlation-img">
							<image src="../../static/xiao.jpg"></image>
						</view>
						<view class="correlation-explain">
							<view class="correlation-name">
								关于申报第八批宝安区非物质文化遗产名录项目
							</view>
							<view class="correlation-money">￥198</view>
							<view class="start">
								<image class="start-img" src="../../static/start.png"></image>
								<image class="start-img" src="../../static/start.png"></image>
								<image class="start-img" src="../../static/start.png"></image>
								<image class="start-img" src="../../static/start.png"></image>
							</view>
						</view>
					</view>
				</view> -->
			</view>
			<view class="estimate">
				<view class="introduce-title">评价区</view>
				<view>
					<view class="estimate-item">
						<view class="estimate-top">
							<view class="estimate-left">
								<view class="portrait">
									<image src="../../static/xiao.jpg"></image>
								</view>
								<view class="estimate-person">
									<view class="estimate-name">可以叫我雨大人</view>
									<view>和好如初包含了哪三个词</view>
								</view>
							</view>
							<view class="estimate-more">
								<image src="../../static/ic-more.png"></image>
							</view>
						</view>
						<view class="estimate-bottom">
							<view class="date">10-09</view>
							<view class="rights">
								<view class="getlike">
									<text>574</text>
									<image class="getlike-img" src="../../static/get-like.png"></image>
								</view>
								<view class="msg">
									<image src="../../static/ic-message.png"></image>
								</view>
							</view>
						</view>
					</view>
					<view class="reply">
						<view class="reply-top">
							<view class="reply-left">
								<view class="reply-img">
									<image src="../../static/xiao.jpg"></image>
								</view>
								<view class="reply-person">
									<view class="reply-name">
										<text>源码</text>
										<image class="write-back" src="../../static/ic-sanjiao.png"></image>
										<view>可以叫我雨大人</view>
									</view>
									<view>不是有这个词吗</view>
								</view>
							</view>
							<view class="estimate-more">
								<image src="../../static/ic-more.png"></image>
							</view>
						</view>
						<view class="reply-bottom">
							<view class="date">10-09</view>
							<view class="rights">
								<view class="getlike">
									<text>574</text>
									<image class="getlike-img" src="../../static/get-like.png"></image>
								</view>
								<view class="msg">
									<image src="../../static/ic-message.png"></image>
								</view>
							</view>
						</view>
					</view>
					<view>
						<view class="unfold">展开其他2条回复</view>
					</view>
				</view>
			</view>
		</view>
		<view class="botline"></view>
		<view class="submit">
			<button>提交意向</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				id:"",
				activity:''
			}
		},
		methods: {
			select(e) {
				this.index = e
			}
		},
		onLoad(e){
			this.id = e.id;
			this.$request('/api/goods/read',{
				id:this.id
			},'get',{}).then(res=>{
				if (res.code == 200) {
					this.activity = res.data;
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
		height: 380rpx;
		/* position: relative; */
	}

	.detail-img image {
		width: 100%;
		height: 100%;
		/* 	position: relative; */
	}

	.select {
		position: absolute;
		bottom: 10rpx;
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

	.start {
		display: flex;
		align-items: center;
	}

	.start-img {
		width: 28rpx;
		height: 28rpx;
	}

	.title {
		display: flex;
		align-items: center;
		margin: 40rpx 30rpx 16rpx 30rpx;
		justify-content: space-between;
		color: rgba(16, 16, 16, 100);
		font-size: 32rpx;
		font-family: PingFangSC-regular;
	}

	.money {
		color: rgba(255, 52, 25, 100);
		font-size: 40rpx;
		font-family: PingFangSC-regular;
		margin-left: 24rpx;
	}

	.xiao {
		display: flex;
		color: rgba(16, 16, 16, 100);
		font-size: 24rpx;
		font-family: PingFangSC-regular;
		justify-content: center;
		align-items: center;
		margin-bottom: 18rpx;
		margin-top: 12rpx;
	}

	.like {
		display: flex;
		margin: 0 50rpx 0 64rpx;
		align-items: center;
	}

	.like-img image {
		width: 32rpx;
		height: 32rpx;
		margin-right: 6rpx;
	}

	.glance-over {
		display: flex;
		align-items: center;
	}

	.glance-img image {
		width: 40rpx;
		height: 40rpx;
		margin-right: 6rpx;
	}

	.line {
		width: 100%;
		height: 20rpx;
		background-color: rgba(247, 247, 247, 100);
	}

	.introduce {
		padding: 30rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
	}

	.introduce-title {
		font-size: 32rpx;
		margin-bottom: 22rpx;
	}

	.recommend {
		padding: 26rpx 30rpx;
	}

	.correlation {}

	.correlation-item {
		display: flex;
		padding: 26rpx 0;
		border-bottom: solid 1rpx #999999;
	}

	.correlation-img image {
		width: 298rpx;
		height: 180rpx;
		border-radius: 12rpx;
	}

	.correlation-explain {
		margin-left: 30rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.correlation-name {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.correlation-money{
		color: rgba(255, 52, 25, 100);
		font-size: 40rpx;
		margin-top: 10rpx;
	}
	.estimate {
		padding: 0 30rpx;
	}
	.estimate-top {
		display: flex;
		justify-content: space-between;
	}
	.estimate-left {
		display: flex;
	}
	.portrait image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}
	.estimate-person {
		color: rgb(19, 19, 19);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-left: 9rpx;
	}
	.estimate-name {
		color: #131313;
		font-size: 30rpx;
		text-align: left;
		font-family: PingFangSC-bold;
	}
	.estimate-more image{
		width: 40rpx;
		height: 40rpx;
	}
	.estimate-bottom {
		display: flex;
		margin-left: 98rpx;
		justify-content: space-between;
		padding-bottom: 38rpx;
	    border-bottom: solid 1rpx #e7e7e7;
		margin-top: 30rpx;
	}
	.date {
		color: rgba(89, 89, 89, 100);
		font-size: 26rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}
	.rights {
		display: flex;
	}
	.getlike {
		display: flex;
		color: #7B7B7B;
		color: rgba(123, 123, 123, 100);
		font-size: 24rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}
	.getlike-img {
		width: 32rpx;
		height: 32rpx;
		margin-right: 40rpx;
	}
	.msg image {
		width: 32rpx;
		height: 32rpx;
	}
	.reply {
		margin-left: 98rpx;
		margin-top: 60rpx;
	}
	.reply-top {
		display: flex;
		justify-content: space-between;
	}
	.reply-left {
		display: flex;
	}
	.reply-img image{
		width: 44rpx;
		height: 44rpx;
		border-radius: 50%;
	}
	.reply-person {
		color: rgba(68, 68, 68, 100);
		font-size: 30rpx;
		font-family: PingFangSC-regular;
		margin-left: 8rpx;
	}
	.reply-name {
		display: flex;
		align-items: center;
		color: rgba(138, 138, 138, 100);
		font-size: 26rpx;
		font-family: PingFangSC-regular;
	}
	.write-back {
		width: 20rpx;
		height: 20rpx;
		margin: 0 4rpx;
	}
	.unfold {
		color: rgba(40, 158, 255, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-left: 148rpx;
		margin-top: 20rpx;
	}
	.botline {
		background: #ffffff;
		height: 160rpx;
	}
	.submit {
		width: 100%;
		background-color: #ffffff;
		position: fixed;
		bottom: 0;
		padding-bottom: 30rpx;
		padding-top: 30rpx;
	}
	.submit button {
		width: 624rpx;
		height: 86rpx;
		line-height: 86rpx;
		border-radius: 80rpx;
		background-color: rgba(24, 144, 255, 100);
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		text-align: center;
		font-family: Arial;
	}
	.reply-bottom {
		display: flex;
		margin-left: 58rpx;
		justify-content: space-between;
		padding-bottom: 38rpx;
		border-bottom: solid 1rpx #e7e7e7;
		margin-top: 30rpx;
	}
</style>
