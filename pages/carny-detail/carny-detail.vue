<template>
	<view>
		<view class="lolo">
			<view class="detail-img" v-if="index == 0">
				<image :src="art.cover"></image>
			</view>
			<view class="detail-img" v-if="index == 1">
				<video :src="art.cover_video"></video>
			</view>
			<view v-if="art.cover == null || art.cover_video == null || art.cover == '' || art.cover_video == ''"></view>
			<view v-else class="select">
				<view :class="index == 1?'videos':'video'" @click="select(1)">视</view>
				<view :class="index == 0 ?'img':'imgs'" @click="select(0)">图</view>
			</view>
			<view class="start">
				<image src="../../static/start.png"></image>
				<image src="../../static/start.png"></image>
				<image src="../../static/start.png"></image>
				<image src="../../static/start.png"></image>
				<image src="../../static/start.png"></image>
			</view>
		</view>
		<view>
			<view class="carny-top">
				<view :class="show == 0 ?'active':''" @click="cut(0)">介绍</view>
				<view :class="show == 1 ?'actives':''" @click="cut(1)">精彩回顾</view>
				<view :class="show == 2 ?'active':''" @click="cut(2)">节目</view>
			</view>
			<view v-if="show == 0">
				<view class="introduce">
					<view class="introduce-name">介绍</view>
					<u-parse :content="art.content" class="introduce-content"></u-parse>
				</view>
				<view class="introduces">
					<view class="introduce-name">照片</view>
					<view class="photo">
						<image v-for="items in art.image_list" :src="items"></image>
					</view>
				</view>	
				<view class="line"></view>
				<view class="recommend">
					<view class="recommend-name">热门评论</view>
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
				<view class="bottom">
					<view class="bottom-input">
						<input v-model="comment" placeholder="写评论..."/>
					</view>
					<view class="bottom-right">
						<image class="msg" src="../../static/ic-msg.png"></image>
						<image class="like" src="../../static/ic-like.png"></image>
						<image class="share" src="../../static/ic-share.png"></image>
					</view>
				</view>
			</view>
			<view v-if="show == 1">
				<view class="review" v-if="art.video.length>0">
					<view class="review-item" v-for="(item,index) in art.video" :key="index">
						<view class="review-img">
							<video id="myVideo" :src="item.url"></video>
						</view>
						<view class="review-name">
							 <view>{{item.name}}</view>
							 <view class="review-top" >
								 <image src="../../static/ic-bottom.png"></image>
							 </view>
						</view>
						<!-- <view>
							<view class="review-name">
								 <view>{{item.name}}</view>
								 <view class="review-top">
									 <image src="../../static/ic-top.png"></image>
								 </view>
							</view>
							<view class="contetn">节目介绍节目介绍节目介绍节目介绍节目介绍节目介绍节目介绍节目介绍节目介绍节目介绍节目介绍节目介绍节目介绍节目介绍节目介绍</view>
						</view> -->
					</view>
				</view>
			</view>
			<view v-if="show == 2">
				<view class="program">
					<view class="introduce-name">节目预约</view>
					<view class="appointment">
						<view class="appointment-item" v-for="(item,index) in lsit" :key="index">
							<view class="appointment-img">
								<image :src="item.cover"></image>
							</view>
							<view class="appointment-content">
								<view class="appointment-name">{{item.name}}</view>
								<view>演出时间:{{item.start_time  | formatDate('-')}} - {{item.end_time | formatDate('-')}}</view>
								<view class="bton" v-if="item.status == 1" @click="reserve(item)">已结束</view>
								<view class="btn" v-if="item.status == 0" @click="reserve(item)">立即预约</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				show: 0,
				comment:'',
				id:'',
				art:'',
				lsit:[]
			}
		},
		methods: {
			select(e) {
				this.index = e
			},
			cut(e) {
				this.show = e
			},
			reserve(item){
				uni.navigateTo({
					url:'../reserve-msg/reserve-msg?id=' +item.id +'&did='+ this.id +'&name='+ item.name
				})
			},
			detail(){
				this.$request('/api/artgroup/read',{
					id: this.id,
				},'post',{}).then(res=>{
					
					if (res.code === 200) {
						this.art = res.data;
						this.lsit = res.data.program
						uni.setNavigationBarTitle({
						　　title:this.art.name
						})
						
						for (let i = 0; i < this.lsit.length; i++) {
							this.lsit[i].flag = false
						}
						
					}
				})
			}
		},
		filters: {
			formatDate: function(value, spe = '/') {
				value = value * 1000
				let data = new Date(value);
				let year = data.getFullYear();
				let month = data.getMonth() + 1;
				let day = data.getDate();
				let h = data.getHours();
				let mm = data.getMinutes();
				let s = data.getSeconds();
				month = month > 10 ? month : "0" + month;
				day = day > 10 ? day : "0" + day;
				h = h > 10 ? h : "0" + h;
				mm = mm > 10 ? mm : "0" + mm;
				s = s > 10 ? s : "0" + s;
				return `${year}${spe}${month}${spe}${day} ${h}:${mm}:${s}`;
			}
		},
		onLoad(e){
			this.id = e.id
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
		height: 436rpx;
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

	.start {
		position: absolute;
		top: 28rpx;
		right: 30rpx;
	}

	.start image {
		width: 32rpx;
		height: 32rpx;
	}

	.carny-top {
		display: flex;
		padding: 30rpx 60rpx;
		justify-content: space-between;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		border-bottom: solid 1rpx rgba(153, 153, 153, 0.32);
		/* 	padding-bottom: 32rpx; */
	}

	.active {
		color: rgba(82, 167, 255, 100);
		font-size: 32rpx;
		position: relative;
	}

	.active::after {
		content: '';
		position: absolute;
		top: 68rpx;
		left: 10rpx;
		right: 0rpx;
		bottom: 0rpx;
		width: 50rpx;
		height: 4rpx;
		background: #52A7FF;
	}

	.actives {
		color: rgba(82, 167, 255, 100);
		font-size: 32rpx;
		position: relative;
	}

	.actives::after {
		content: '';
		position: absolute;
		top: 68rpx;
		left: 38rpx;
		right: 0rpx;
		bottom: 0rpx;
		width: 50rpx;
		height: 4rpx;
		background: #52A7FF;
	}
	.introduce {
		margin-top: 30rpx;
		border-bottom: solid 1rpx rgba(153, 153, 153, 0.32);
	}
	.introduces {
		margin-top: 30rpx;
	}
	.introduce-name {
		color: rgba(51, 51, 51, 100);
		font-size: 32rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		border-left: solid 8rpx #52A7FF;
		padding-left: 20rpx;
	}
	.introduce-content {
		color: rgba(153, 153, 153, 100);
		font-size: 28rpx;
		margin: 20rpx 24rpx 34rpx 34rpx;
		text-indent:54rpx;
	}
	.photo {
		display: flex;
		justify-content: space-between;
		margin: 32rpx 30rpx;
		flex-wrap: wrap;
	}
	.photo image {
		width: 156rpx;
		height: 176rpx;
		margin-bottom: 20rpx;
	}
	.line {
		height: 20rpx;
		background-color: #f7f7f7;
	}
	
	.recommend {
		margin: 26rpx 30rpx;
		padding-bottom: 110rpx;
	}
	
	.recommend-name {
		margin-bottom: 16rpx;
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
	
	.estimate-more image {
		width: 40rpx;
		height: 40rpx;
	}
	
	.estimate-bottom {
		width: 96%;
		display: flex;
		margin-left: 98rpx;
		justify-content: space-between;
		padding-bottom: 38rpx;
		border-bottom: solid 1rpx #e7e7e7;
		margin-top: 30rpx;
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
	 
	.reply-img image {
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
	
	.unfold {
		color: rgba(40, 158, 255, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-left: 148rpx;
		margin-top: 20rpx;
	}
	
	.msg image {
		width: 32rpx;
		height: 32rpx;
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
	
	.write-back {
		width: 20rpx;
		height: 20rpx;
		margin: 0 4rpx;
	}
	.reply-bottom {
		width: 100%;
		display: flex;
		margin-left: 58rpx;
		justify-content: space-between;
		padding-bottom: 38rpx;
		border-bottom: solid 1rpx #e7e7e7;
		margin-top: 30rpx;
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
	.bottom-input {
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
	.bottom-right {
		display: flex;
	}
	.msg {
		width: 40rpx;
		height: 40rpx;
		margin-right: 66rpx;
	}
	.like {
		width: 40rpx;
		height: 40rpx;
		margin-right: 68rpx;
	}
	.share {
		width: 40rpx;
		height: 40rpx;
	}
	.review {
		margin: 30rpx;
	}
	.review-item {
		margin-bottom: 24rpx;
	}
	.review-img image {
		width: 690rpx;
		height: 380rpx;
		border-radius: 20rpx 20rpx 0px 0px;
	}
	.review-name {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 6rpx;
		border-bottom: solid 1rpx #e7e7e7;
	}
	.review-top image {
		width: 34rpx;
		height: 34rpx;
	}
	.contetn {
		margin-top: 22rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
	}
	.program {
		margin-top: 30rpx;
	}
	.appointment{
		margin: 18rpx 30rpx;
	}
	.appointment-item {
		display: flex;
		margin-bottom: 30rpx;
	}
	.appointment-img image {
		width: 262rpx;
		height: 170rpx;
		border-radius: 6rpx;
	}
	.appointment-content {
		margin-left: 18rpx;
		color: rgba(153, 153, 153, 100);
		font-size: 24rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}
	.appointment-name {
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		margin-bottom: 10rpx;
	}
	.btn {
		margin-top: 18rpx;
		width: 160rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 20rpx;
		background-color: rgba(82, 167, 255, 100);
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		text-align: center;
		font-family: Arial;
		margin-left: 248rpx;
	}
	.bton {
		margin-top: 18rpx;
		width: 160rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 20rpx;
		background-color: #999999;
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		text-align: center;
		font-family: Arial;
		margin-left: 248rpx;
	}
	
	#myVideo {
		width: 690rpx;
		height: 402rpx;
	}
</style>
