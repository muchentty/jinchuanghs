<template>
	<view class="reserve">
		<view class="reserve-warp">
			<view class="reserve-item">
				<view class="rerse-name" v-model="pname">预约人</view>
				<view class="rerse-right">
					<input placeholder="请填写预约人" />
					<image class="rerse-img" src="../../static/ic_ri.png"></image>
				</view>
			</view>
			<view class="line"></view>
			<view class="reserve-item">
				<view class="rerse-name" v-model="idcard">身份证号</view>
				<view class="rerse-right">
					<input placeholder="请填写身份证号" />
					<image class="rerse-img" src="../../static/ic_ri.png"></image>
				</view>
			</view>
			<view class="line"></view>
			<view class="reserve-item">
				<view class="rerse-name" v-model="phone">联系电话</view>
				<view class="rerse-right">
					<input placeholder="请填写联系方式" />
					<image class="rerse-img" src="../../static/ic_ri.png"></image>
				</view>
			</view>
			<view class="line"></view>
			<view class="reserve-item">
				<view class="rerse-name">预约时间</view>
				<view class="rerse-right" @click="list">
					<input placeholder="预约时间段" />
					<image class="rerse-img" src="../../static/ic_ri.png"></image>
				</view>
			</view> 
		</view>
		<view class="warm">
			<view>温馨提示</view>
			<view class="hint">
				<view class="dian"></view>
				<view>请如实填写信息,以免无法进场</view>
			</view>
		</view>
		<view class="submit" @click="submit">
			<button>提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				pname:'',
				phone:'',
				idcard:''
			}
		},
		methods: {
			list(){
				uni.navigateTo({
					url:'../appointment/appointment'
				})
			},
			submit(){
				if(this.pname == ''){
					uni.showToast({
						title:'请输入预约人',
						icon:'none'
					})
				}else if(this.phone == ''){
					uni.showToast({
						title:'请输入联系方式',
						icon:'none'
					})
				}else if(this.idcard == ''){
					uni.showToast({
						title:'请输入身份证号',
						icon:'none'
					})
				}else{
					this.$request('/api/venue/activity',{
						id:this.id,
						name:this.pname,
						tel:this.phone,
						start_time:this.datetime,
						end_time:this.endTime
					},'post',{},true).then(res=>{
						
						if (res.code === 1) {
							uni.showToast({
								title:res.msg,
								icon:'none'
							})
							uni.redirectTo({
								url:'../reservation-status/reservation-status'
							})
						}else{
							uni.showToast({
								title:res.msg,
								icon:'none'
							})
						}
					})
				}
			}
		},
		onLoad(e){
			this.id = e.id
		}
	}
</script>

<style>
	.reserve {
		height: 100%;
		background-color: #f7f7f7;
	}
	.reserve-warp {
		background-color: #ffffff;
	}
	.reserve-item {
		display: flex;
		justify-content: space-between;
		background-color: #ffffff;
		padding: 28rpx 30rpx;
	}
	
	.rerse-name {
		font-size: 28rpx;
		color: #333;
	}

	.rerse-right {
		display: flex;
		align-items: center;
	}

	.rerse-right input {
		text-align: right;
		color: #999;
		font-size: 28rpx;
	}

	.rerse-img {
		width: 30rpx;
		height: 30rpx;
	}
	.line {
		width: 690rpx;
		height: 2rpx;
		background-color: #e7e7e7;
		margin-left: 30rpx;
	}
	.warm {
		margin: 20rpx;
		font-size: 32rpx;
		font-weight: 600;
		font-family: SourceHanSansSC-regular;
	}
	.hint {
		font-size: 26rpx;
		color: #999;
		font-weight: 400;
		margin-top: 16rpx;
		display: flex;
		align-items: center;
	}
	.dian {
		width: 10rpx;
		height: 10rpx;
		border-radius: 50%;
		background-color: #63B4D2;
		margin-right: 16rpx;
	}
	.submit button{
		width: 100%;
		background-color: #63B4D2;
		color: #ffffff;
		margin-top: 300rpx;
	}
</style>
