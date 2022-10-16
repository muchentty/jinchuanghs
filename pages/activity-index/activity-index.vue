<template>
	<view>
		<view v-show="value4 == 0">
			<view class="activity-img">
				<image :src="activity.cover"></image>
			</view>
			<view class="activity-item">
				<view class="item">
					<view class="num">5</view>
					<view>选手数</view>
				</view>
				<view class="item">
					<view class="num">29</view>
					<view>总投票</view>
				</view>
				<view class="item">
					<view class="num">93</view>
					<view>浏览量</view>
				</view>
			</view>
			<view class="count-down">距离活动结束: 00天18时35分26秒</view>
			<view class="time">
				<view class="start-times">
					<image src="../../static/time1.png"></image>
					<view class="s-time">开始时间：{{activity.start_time}}</view>
				</view>
				<view class="start-time">
					<image src="../../static/time2.png"></image>
					<view class="s-time">结束时间：{{activity.end_time}}</view>
				</view>
				<view class="start-time">
					<image src="../../static/tz.png"></image>
					<view class="s-time">一个投票者每天能投 1 票</view>
				</view>
			</view>
			<view class="canyu">我要参与</view>
			<view class="seach">
				<view class="seach-img">
					<image src="../../static/ic_search.png"></image>
					<view>
						<input placeholder="姓名/编号" />
					</view>
				</view>
				<view class="seach-btn">搜索</view>
			</view>
			<view class="voting">
				<view class="voting-item">
					<view class="voting-img">
						<image src="../../static/banner.png"></image>
					</view>
					<view class="voting-cont">
						<view class="name">张三</view>
						<view class="piao">68票</view>
						<view class="btn">投票</view>
					</view>
				</view>
			</view>
		</view>
		<view v-show="value4 == 1">
			<view class="ranking">
				<view class="rank1">2022-07-22 12:00:00</view>
				<view class="rank2">剩余: 00天18时35分26秒</view>
				<view class="top">
					<view class="top-item">
						<view class="top-img"></view>
						<view class="top-name">墨刀小莫</view>
						<view class="top-num">183</view>
					</view>
					<view class="top-items">
						<view class="top-imgs"></view>
						<view class="top-name">墨刀小莫</view>
						<view class="top-num">223</view>
					</view>
					<view class="top-item">
						<view class="top-img"></view>
						<view class="top-name">墨刀小莫</view>
						<view class="top-num">123</view>
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
					<view class="list-num"><text class="num">111</text>票</view>
				</view>
				<view class="list-item">
					<view class="list-left">
						<view>5</view>
						<view class="list-img"></view>
						<view class="list-name">王五</view>
					</view>
					<view class="list-num"><text class="num">111</text>票</view>
				</view>
			</view>
		</view>
		<view v-show="value4 == 2">
			<view class="huod">
				<u-parse :content="activity.content"></u-parse>
			</view>
		</view>
		<view v-show="value4 == 3">
			<view>
				<view class="seach">
					<view class="seach-img">
						<image src="../../static/ic_search.png"></image>
						<view>
							<input placeholder="姓名/编号" />
						</view>
					</view>
					<view class="seach-btn">搜索</view>
				</view>
			</view>
		</view>
		<view class="bottom-navigation">
			<u-tabbar :value="value4" @change="change1" :fixed="false" :placeholder="false"
				activeColor="#333333" :safeAreaInsetBottom="false">
				<u-tabbar-item text="首页" @click="click1">
					<image class="u-page__item__slot-icon" slot="active-icon" src="../../static/shouyes.png"></image>
					<image class="u-page__item__slot-icon" slot="inactive-icon" src="../../static/shouye.png"></image>
				</u-tabbar-item>
				<u-tabbar-item text="排行榜" @click="click1">
					<image class="u-page__item__slot-icon" slot="active-icon" src="../../static/paih.png"></image>
					<image class="u-page__item__slot-icon" slot="inactive-icon" src="../../static/paiha.png"></image>
				</u-tabbar-item>
				<u-tabbar-item text="活动说" @click="click1">
					<image class="u-page__item__slot-icon" slot="active-icon" src="../../static/youhuis.png">
					</image>
					<image class="u-page__item__slot-icon" slot="inactive-icon" src="../../static/youhui.png">
					</image>
				</u-tabbar-item>
				<u-tabbar-item text="搜索" @click="click1">
					<image class="u-page__item__slot-icon" slot="active-icon" src="../../static/seachs.png"></image>
					<image class="u-page__item__slot-icon" slot="inactive-icon" src="../../static/seach.png"></image>
				</u-tabbar-item>
			</u-tabbar>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value4: 0,
				id:'',
				activity:'',
				lists:[]
			}
		},
		methods: {
			click1(e) {
				console.log('click1', e);
				this.value4 = e
			},
			change1() {

			}
		},
		onLoad(e){
			this.id = e.id
			this.$request('/api/activity/view', {
				id: e.id,
			}, 'post', {}).then(res => {
				if (res.code === 1) {
					this.activity = res.data.activity;
					uni.setNavigationBarTitle({
						title: this.activity.title
					})
					this.lists = res.data.lists;
				}
			})
		}
	}
</script>

<style>
	.activity-img image {
		width: 750rpx;
		height: 436rpx;
	}

	.activity-item {
		display: flex;
		width: 680rpx;
		height: 156rpx;
		border-radius: 20rpx;
		background-color: rgba(255, 255, 255, 100);
		text-align: center;
		box-shadow: 0px 2rpx 10rpx 0px rgba(0, 0, 0, 0.4);
		margin: 26rpx 30rpx 44rpx 30rpx;
		align-items: center;
		justify-content: space-around;
	}

	.item {
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
	}

	.num {
		margin-bottom: 14rpx;
	}

	.count-down {
		width: 680rpx;
		height: 84rpx;
		border-radius: 20rpx;
		background-color: rgba(255, 255, 255, 100);
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: center;
		box-shadow: 0px 2rpx 10rpx 0px rgba(0, 0, 0, 0.4);
		font-family: Arial;
		line-height: 84rpx;
		margin-left: 30rpx;
	}

	.time {
		width: 680rpx;
		height: 242rpx;
		background-color: rgba(255, 255, 255, 100);
		box-shadow: 0px 2rpx 10rpx 0px rgba(0, 0, 0, 0.4);
		color: rgba(153, 153, 153, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
		border-radius: 20rpx;
		margin: 24rpx 30rpx 56rpx 30rpx;
	}

	.start-times {
		display: flex;
		color: rgba(153, 153, 153, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		padding-top: 26rpx;
		padding-left: 30rpx;
		padding-top: 28rpx;
	}

	.start-times image {
		width: 40rpx;
		height: 40rpx;
	}

	.start-time {
		display: flex;
		color: rgba(153, 153, 153, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		padding-top: 26rpx;
		padding-left: 30rpx;
	}

	.start-time image {
		width: 40rpx;
		height: 40rpx;
	}

	.s-time {
		margin-left: 12rpx;
	}

	.canyu {
		width: 548rpx;
		height: 96rpx;
		line-height: 96rpx;
		border-radius: 78rpx;
		background-color: rgba(82, 167, 255, 100);
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		text-align: center;
		font-family: Arial;
		margin-left: 102rpx;
	}

	.seach {
		display: flex;
		margin-left: 30rpx;
		margin-top: 56rpx;
	}

	.seach-img {
		width: 480rpx;
		height: 78rpx;
		border-radius: 14rpx;
		background-color: rgba(255, 255, 255, 100);
		border: 2rpx solid rgba(187, 187, 187, 100);
		display: flex;
		align-items: center;
	}

	.seach-img image {
		width: 40rpx;
		height: 40rpx;
		margin-left: 18rpx;
	}

	.seach-img input {
		margin-left: 16rpx;
		color: rgba(153, 153, 153, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.seach-btn {
		width: 162rpx;
		height: 78rpx;
		font-family: Arial;
		border-radius: 14rpx;
		background-color: rgba(82, 167, 255, 100);
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		line-height: 78rpx;
		text-align: center;
		margin-left: 38rpx;
	}

	.voting {
		margin: 44rpx 30rpx;
		padding-bottom: 110rpx;
	}

	.voting-item {
		width: 330rpx;
		/* height: 480rpx; */
		background-color: rgba(255, 255, 255, 100);
		box-shadow: 0px 4rpx 10rpx 0px rgba(0, 0, 0, 0.4);
		font-size: 28rpx;
		padding-bottom: 22rpx;
	}

	.voting-img image {
		width: 330rpx;
		height: 252rpx;
	}

	.btn {
		width: 240rpx;
		height: 72rpx;
		border-radius: 22rpx;
		background-color: rgba(82, 167, 255, 100);
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		text-align: center;
		font-family: Arial;
		line-height: 72rpx;
		margin-top: 24rpx;
		margin-left: 30rpx;
	}

	.name {
		font-size: 32rpx;
	}

	.voting-cont {
		margin: 10rpx 16rpx 0 16rpx;
	}

	.piao {}

	.bottom-navigation {
		position: fixed;
		bottom: 0;
		width: 100%;
		/* height: 60rpx; */
		/* background-color: rgba(247, 247, 247, 80); */
		/* padding: 30rpx 0; */
	}

	.u-page__item__slot-icon {
		width: 40rpx;
		height: 40rpx;
	}
	
	.ranking {
		width: 750rpx;
		height: 560rpx;
		background-color: rgba(19, 82, 195, 100);
		text-align: center;
		box-shadow: 0px 4rpx 8rpx 0px rgba(0, 0, 0, 0.05);
	}
	
	.top-item {
		width: 234rpx;
		height: 283rpx;
		border-radius: 10rpx;
		background-color: rgba(255, 255, 255, 100);
		text-align: center;
		margin-top: 56rpx;
	}
	.rank1 {
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
		padding-top: 44rpx;
	}
	.rank2 {
		color: rgba(255, 255, 255, 100);
		font-size: 36rpx;
		font-family: PingFangSC-regular;
		margin-top: 6rpx;
	}
	.top {
		display: flex;
		margin: 44rpx 24rpx 0 24rpx;
		/* background-color: #fff; */
	}
	.top-img {
		margin-top: 46rpx;
		width: 100rpx;
		height: 100rpx;
	}
	.top-items {
		width: 234rpx;
		height: 340rpx;
		border-radius: 10rpx;
		background-color: rgba(255, 255, 255, 100);
		text-align: center;
		box-shadow: 0px -3rpx 10rpx 0px rgba(0, 0, 0, 0.18);
	}
	.top-imgs {
		margin-top: 72rpx;
		width: 130rpx;
		height: 130rpx;
	}
	.top-name {
		color: rgba(153, 153, 153, 100);
		font-size: 24rpx;
		margin-top: 28rpx;
	}
	.top-num {
		color: rgba(246, 62, 61, 100);
		font-size: 32rpx;
		margin-top: 16rpx;
	}
	.list {
		margin-left: 52rpx;
		margin-right: 20rpx;
	}
	.list-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 0;
		border-bottom: solid 1rpx #f7f7f7;
	}
	.list-left {
		display: flex;
		align-items: center;
		color: #999;
		font-size: 32rpx;
		font-family: Arial-400;
	}
	.list-img {
		width: 80rpx;
		height: 80rpx;
		margin-left: 36rpx;
		border: solid 1rpx #999;
		border-radius: 50%;
		margin-right: 24rpx;
	}
	.list-name {
		color: rgba(51, 51, 51, 100);
		font-size: 28rpx;
	}
	.list-num {
		font-family: Arial-regular;
		color: #999;
	}
	.num {
		color: #F63E3D;
		font-size: 24rpx;
	}
	.huod {
		padding: 30rpx;
	}
</style>
