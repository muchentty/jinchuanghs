<template>
	<view class="old-pwd">
		<view class="old">
			<view class="old-name">旧手机号</view>
			<view class="old-input">
				189****9999
			</view>
		</view>
		<view class="olds">
			<view class="old-name">新手机号</view>
			<view class="old-input">
				<input placeholder="请输入新手机号码" />
			</view>
		</view>
		<view class="old">
			<view class="old-name">手机验证</view>
			<view class="old-input">
				<input placeholder="再次输入新密码" />
			</view>
			<view class="fas">发送验证码</view>
		</view>
		<view class="submit">确认</view>
		<view class="cancel">
			<button type="default">取消</button>
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

		}
	}
</script>

<style>
	.old-pwd {
		height: 100%;
		background-color: #f7f7f7;
	}

	.old {
		/* 	width: 100%; */
		background-color: #ffffff;
		display: flex;
		padding: 30rpx;
		justify-content: space-between;
		border-bottom: solid 1rpx #f7f7f7;
		align-items: center;
	}

	.old-name {}

	.old-input {
		color: #888888;
	}

	.old-input input {
		text-align: right;
	}

	.olds {
		/* 	width: 100%; */
		background-color: #ffffff;
		display: flex;
		padding: 30rpx;
		justify-content: space-between;
		margin-top: 20rpx;
	}

	.fas {
		padding: 16rpx 20rpx;
		background-color: #FF9800;
		font-size: 26rpx;
		color: #ffffff;
		border-radius: 10rpx;
	}
	.submit {
		width: 690rpx;
		height: 92rpx;
		line-height: 92rpx;
		border-radius: 66rpx;
		background-color: #52A7FF;
		color: #ffffff;
		font-size: 36rpx;
		text-align: center;
		font-family: Arial;
		margin-left: 30rpx;
		margin-top: 400rpx;
	}
	
	.cancel button {
		width: 690rpx;
		height: 92rpx;
		line-height: 92rpx;
		border-radius: 66rpx;
		background-color: #b3b5b1;
		color: #ffffff;
		font-size: 36rpx;
		text-align: center;
		font-family: Arial;
		margin-left: 30rpx;
		margin-top: 100rpx;
	}
</style>
