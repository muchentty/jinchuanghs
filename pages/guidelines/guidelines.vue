<template>
	<view>
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
		</view>
		<view class="line">
			<view class="line-item" v-for="(item,index) in travel" :key="index" @click="detail(item)">
				<view class="line-img">
					<image :src="item.cover"></image>
				</view>
				<view class="line-cont">
					<view class="line-name">{{item.title}}</view>
				<!-- 	<view>景点1-景点2-景点3-景点4</view> -->
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
				travel:[]
			}
		},
		methods: {
			detail(item){
				uni.navigateTo({
					url:'../guidelines-detail/guidelines-detail?id=' + item.id
				})
			},
			getList(){
				this.$request('/api/venue/get_travel_list',{
					area:this.area,
					page:'1',
					pagesize:'10'
				},'post',{}).then(res=>{
					if (res.code ==1) {
						this.travel = res.data.lists
					}
				})
			},
			carea(){
				uni.navigateTo({
					url:'../hierarchy/hierarchy'
				})
			},
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
	.consult-top {
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
	}

	.area-img image {
		width: 26rpx;
		height: 16rpx;
		margin-left: 14rpx;
	}

	.all {
		display: flex;
		align-items: center;
	}

	.all-img image {
		width: 26rpx;
		height: 16rpx;
		margin-left: 14rpx;
	}
	.line {
		margin: 26rpx 30rpx;
	}
	.line-item{
		position: relative;
		width: 690rpx;
		height: 380rpx;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
	}
	.line-img image{
		width: 690rpx;
		height: 380rpx;
		border-radius: 20rpx;
	}
	.line-cont {
		position: absolute;
		bottom: 36rpx;
		left: 30rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}
	.line-name {
		font-size: 32rpx;
		margin-bottom: 6rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
</style>
