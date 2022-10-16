<template>
	<view class="content">
		<view class="consult-top">
			<view class="area" @click="carea">
				<view>区域</view>
				<view class="area-img">
					<image src="../../static/ic_drop-down.png"></image>
				</view>
			</view>
			<view class="all">
				<view>全部类型</view>
				<view class="all-img">
					<image src="../../static/ic_drop-down.png"></image>
				</view>
			</view>
			<view class="format">
				<view>直播中</view>
				<view class="format-img">
					<image src="../../static/ic_drop-down.png"></image>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="item" v-for="(item,index) in liveList" :key="index" @click="details(item)">
				<view class="item_img">
					<image :src="item.cover" mode=""></image>
				</view>
				<view class="padd">
					<view class="padd_top">
						<view class="item_status">
							{{item.status}}
						</view>
						<view class="item_num">
							<view class="num_txt">
								在线人数:6958
							</view>
						</view>
					</view>
					<view class="padd_btm">
						<view class="item_title">
							{{item.title}}
						</view>
						<view class="item_time">
							<view>
								<text>直播时间</text>
								<text class="paddtxt">{{item.start_time}}</text>
								<text class="paddtxt">{{item.end_time}}</text>
							</view>
							<view>
								<text> 9537</text>
								<text>观看</text>
							</view>
							<!-- <text>直播时间</text>
							<text class="paddtxt">{{item.start_time}}</text>
							<text class="paddtxt">{{item.end_time}}</text>
							<text> 9537</text>
							<text>观看</text> -->
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
				area:'1',
				liveList:[]
			}
		},
		methods: {
			carea(){
				uni.navigateTo({
					url:'../hierarchy/hierarchy'
				})
			},
			//直播详情
			details(item){
				uni.navigateTo({
					url:'../broadcast_details/broadcast_details?id=' + item.id
				})
			},
			getList(){
				this.$request('/api/live/get_list',{
					area:this.area
				},'post',{}).then(res=>{
					if(res.code==1){
						this.liveList=res.data.lists
					}
				})
			}
		},
		onShow() {
			let that = this
			uni.$on('area', function(data) {
				that.area = data
				console.log(that.area)
				that.getList() 
			})
		},
		onLoad(e){
			if (e.area == 'undefined' || e.area == undefined || e.area == '' || e.area == null) {
				if (uni.getStorageSync('area')) {
					this.area = uni.getStorageSync('area')
				}
			} else {
				this.area = e.area
				uni.setStorageSync('area',this.area)
			}
			this.getList()
		}
	}
</script>

<style>
	.content {
		height: 100%;
	}

	.consult-top {
		/* z-index: 9999;
		position: fixed; */
		background-color: #ffffff;
		display: flex;
		padding-bottom: 20rpx;
		align-items: center;
		border-bottom: solid 1rpx #dedede;
		padding-left: 30rpx;
		padding-top: 20rpx;
	}

	.area {
		display: flex;
		margin-right: 166rpx;
		align-items: center;
		/* border: 1rpx solid red; */
	}

	.area-img image {
		width: 26rpx;
		height: 16rpx;
		margin-left: 14rpx;
	}

	.all {
		display: flex;
		/* border: 1rpx solid red; */
	}

	.all-img image {
		width: 26rpx;
		height: 16rpx;
		margin-left: 14rpx;
	}

	.format {
		display: flex;
		align-items: center;
		margin-left: 112rpx;
		/* border: 1rpx solid red; */
		margin-right: 30rpx;
	}

	.format-img image {
		width: 26rpx;
		height: 16rpx;
		margin-left: 14rpx;

	}

	.list {
		padding: 0rpx 30rpx;
	}

	.item {
		margin-top: 20rpx;
		height: 380rpx;
		/* border: 1rpx solid red; */
		border-radius: 20rpx 20rpx 0px 0px;
	}

	.item_img image {
		width: 690rpx;
		height: 380rpx;
		border-radius: 20rpx 20rpx 0px 0px;
	}

	.padd {
		position: relative;
		bottom: 360rpx;
	}

	.padd_top {
		display: flex;
		justify-content: space-between;
	}

	.item_status {
		margin-left: 20rpx;
		text-align: center;
		width: 90rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 12rpx;
		background-color: rgba(219, 144, 58, 100);
		color: rgba(255, 255, 255, 100);
		font-size: 24rpx;
		text-align: center;
		font-family: Arial;
	}

	.item_num {
		width: 206rpx;
		height: 46rpx;
		line-height: 46rpx;
		/* border: 1rpx solid red; */
		background-color: rgba(255, 255, 255,0.5);
		color: rgba(16, 16, 16, 100);
		font-size: 20rpx;
		text-align: center;
		font-family: Arial;
	}

	.padd_btm {
		margin-top: 228rpx;
	}

	.item_title {
		margin-left: 20rpx;
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.item_time {
		display: flex;
		justify-content: space-between;
		color: rgba(255, 255, 255, 100);
		font-size: 20rpx;
		text-align: left;
		font-family: PingFangSC-regula;
		margin-left: 20rpx;
	}

	.item_time text {
		margin-right: 10rpx;
	}
</style>
