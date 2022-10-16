<template>
	<view class="appointment">
		<view class="appointment-item" v-for="(item,index) in lsit" :key="index">
			<view class="appointment-img">
				<image :src="item.cover"></image>
			</view>
			<view class="appointment-content">
				<view class="appointment-name">{{item.name}}</view>
				<view>演出时间:{{item.start_time}} - {{item.end_time}}</view>
				<view class="btn" @click="reserve(item)">立即预约</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lsit:[],
				id:''
			}
		},
		methods: {
			reserve(item){
				uni.navigateTo({
					url:'../reserve-msg/reserve-msg?id=' +item.id +'&did='+ this.id +'&name='+ item.name
				})
			}
		},
		onLoad(e){
			this.id = e.id
			this.$request('/api/artgroup/view',{
				id: this.id,
			},'post',{}).then(res=>{
				if (res.code === 1) {
					this.lsit = res.data.lists
				}
			})
		}
	}
</script>

<style>
	.appointment {
		margin: 26rpx 30rpx;
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
</style>
