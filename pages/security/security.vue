<template>
	<view class="content">
		<view class="list">
			<view class="item" @click="editPwd">
				<view class="item_left">
					修改密码
				</view>
				<view class="item_right">
					
					<view class="right_img">
						<image src="../../static/ic_ri.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="item" @click="editphone">
				<view class="item_left">
					更换手机号
				</view>
				<view class="item_right">
					
					<view class="right_img">
						<image src="../../static/ic_ri.png" mode=""></image>
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
				
			}
		},
		methods: {
			editPwd(){
				uni.navigateTo({
					url:'../edit-password/edit-password'
				})
			},
			editphone(){
				uni.navigateTo({
					url:'../edit-phone/edit-phone'
				})
			}
		}
	}
</script>

<style>
.content{
	height: 100%;
}
.item_left{
	margin-left: 22rpx;
	color: rgba(16, 16, 16, 100);
	font-size: 32rpx;
	text-align: left;
	font-family: PingFangSC-regular;
}
.headimg image{
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	margin-top: 20rpx;
}
.right_img image{
	width: 28rpx;
	height: 28rpx;
	
	margin-left: 20rpx;
}
.item_right{
	display: flex;
	margin-right: 18rpx;
}
.item{
	display: flex;
	justify-content: space-between;
	height: 100rpx ;
	line-height: 100rpx;
	border-bottom: 1rpx solid #f7f7f7;
}
.right_txt{
	color: rgba(151, 151, 151, 100);
	font-size: 28rpx;
	text-align: right;
	font-family: PingFangSC-regular;
}
</style>
