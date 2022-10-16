<template>
	<view class="player">
		<view class="player-top">
			<view class="player-top-img">
				<image src="../../static/banner.png"></image>
			</view>
			<view class="player-top-name">{{seadetail.player_name}}  </view>
		</view>
		<view class="page-view">
			<view>
				<view>5</view>
				<view class="lll">排名</view>
			</view>
			<view>
				<view>{{seadetail.vote_count}}</view>
				<view class="lll">票数</view>
			</view>
			<view>
				<view>{{seadetail.ranking}}</view>
				<view class="lll">浏览量</view>
			</view>
		</view>
		<view class="player-photo">
			<view class="player-photo-name">选手照片</view>
			<view v-for="item in item.pics">
				<image :src="item" mode="widthFix"></image>
			</view>
		</view>
		<view class="player-vote">
			<view class="player-vote-name">投票记录</view>
			<view class="vote-record">
				<view class="record-item" v-for="(item,index) in seadetail.vote" :key="index">
					<view class="record-left">
						<view class="vote-record-name">{{item.nickname}}</view>
						<view class="vote-record-time">{{item.create_time | formatDate('-')}}</view>
					</view>
					<view class="record-right">+1</view>
				</view>
			</view>
		</view>
		<view class="vote" @click="vote">投票</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item:'',
				seadetail:''
			}
		},
		methods: {
			getList(){
				this.$request('/api/race/works_read', {
					id: this.item.race_id,
					keyword: this.item.player_name
				}, 'post', {}).then(res => {
					console.log(res)
					if (res.code == 200) {
						if(res.data.id){
							console.log('有值')
							this.seadetail = res.data
						}else{
							console.log('没有值')
							this.seadetail = ''
						}
					}
				})
			},
			vote() {
				this.$request('/api/race/vote', {
					works_id: this.item.id,
				}, 'post', {}, true).then(res => {
					console.log(res)
					if (res.code == 200) {
						uni.showToast({
							title: '投票成功'
						})
						this.getList()
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
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
				month = month >= 10 ? month : "0" + month;
				day = day >= 10 ? day : "0" + day;
				h = h >= 10 ? h : "0" + h;
				mm = mm >= 10 ? mm : "0" + mm;
				s = s >= 10 ? s : "0" + s;
				return `${year}${spe}${month}${spe}${day} ${h}:${mm}:${s}`;
			}
		},
		onLoad(e){
			this.item = JSON.parse(e.item)
			console.log(this.item)
			this.getList()
		}
	}
</script>

<style>
	.player {
		min-height: 100%;
		background-color: rgba(228, 236, 245, 100);
		padding-bottom: 80rpx;
	}
	.player-top {
		text-align: center;
		padding-top: 50rpx;
	}
	.player-top-img image {
		width: 170rpx;
		height: 170rpx;
		border-radius: 50%;
	}
	.player-top-name {
		margin-top: 22rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
	}
	.page-view {
		width: 680rpx;
		height: 156rpx;
		border-radius: 20rpx;
		background-color: rgba(255, 255, 255, 100);
		text-align: center;
		box-shadow: 0px 2rpx 10rpx 0px rgba(0, 0, 0, 0.4);
		display: flex;
		margin: 30rpx;
		align-items: center;
		justify-content: space-around;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
	}
	.lll {
		margin-top: 14rpx;
	}
	.player-photo {
		width: 690rpx;
		/* height: 694rpx; */
		background-color: rgba(255, 255, 255, 100);
		text-align: center;
		box-shadow: 0px 2rpx 6rpx 0px rgba(0, 0, 0, 0.4);
		margin: 0 30rpx;
		padding-bottom: 30rpx;
	}
	.player-photo-name {
		color: rgba(16, 16, 16, 100);
		font-size: 36rpx;
		font-family: PingFangSC-regular;
		padding: 32rpx 0 20rpx 0;
	}
	.player-vote {
		width: 690rpx;
		background-color: rgba(255, 255, 255, 100);
		box-shadow: 0px 2rpx 6rpx 0px rgba(0, 0, 0, 0.4);
		margin: 30rpx 30rpx;
	}
	.player-vote-name {
		color: rgba(16, 16, 16, 100);
		font-size: 36rpx;
		font-family: PingFangSC-regular;
		padding: 32rpx 0 20rpx 0;
		text-align: center;
	}
	.vote-record {
		padding: 0 34rpx;
	}
	.record-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top:26rpx;
		padding-bottom: 22rpx;
		border-bottom: solid 1rpx  rgba(153, 153, 153, 0.13);;
	}
	.record-left {
		color: rgba(153, 153, 153, 100);
		font-size: 24rpx;
		font-family: PingFangSC-regular;
	}
	.vote-record-name {
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		margin-bottom: 10rpx;
	}
	.record-right {
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
	}
	.vote{
		width: 500rpx;
		height: 80rpx;
		background-color: #52A7FF;
		color: #ffffff;
		text-align: center;
		line-height: 80rpx;
		border-radius: 40rpx;
		margin-left: 125rpx;
	}
</style>
