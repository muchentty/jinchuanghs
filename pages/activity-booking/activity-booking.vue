<template>
	<view>
		<view class="venue-detail" v-for="(item,index) in activity_list.lists">
			<view class="venue-img">
				<image :src="item.cover"></image>
			</view>
			<view class="venue-cont" @click="detsil(item)">
				<view class="venue-name">{{item.str}}</view>
				<view>预约日期:2022-08-05</view>
				<view>预约时段:{{item.time}}</view>
			</view>
			<view class="ticket-checking">验票码</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				qingxiangyuyuedanweizhanshigaima: '',
				yonghuyuyue: '',
				yibianruchang: '',
				yanpiaoma: '',
				yuyue: '',
				index: 0,
				member_id: 0,
				type: 'activity',
				activity_list: [],
				idx: 0
			}
		},
		methods: {
			lolo() {
				uni.navigateTo({
					url: '../venue-bokking-detail/venue-bokking-detail'
				})
			}
		},
		onLoad(e) {
			this.qingxiangyuyuedanweizhanshigaima = this.$lang.qingxiangyuyuedanweizhanshigaima[uni.getStorageSync(
			'lang')];
			this.yonghuyuyue = this.$lang.yonghuyuyue[uni.getStorageSync('lang')];
			this.yibianruchang = this.$lang.yibianruchang[uni.getStorageSync('lang')];
			this.yanpiaoma = this.$lang.yanpiaoma[uni.getStorageSync('lang')];
			this.yuyue = this.$lang.yuyue[uni.getStorageSync('lang')];
			if (e.member_id) {
				this.member_id = e.member_id
			}

			if (this.member_id) {
				this.index = 1
				let data = JSON.stringify({
					type: this.type,
					member_id: this.member_id
				})
				this.$request('/api/member/check_qr', {
					data: data
				}, 'post', {}, true).then(res => {
					if (res.code == 1) {
						this.activity_list = res.data
					}
				})
			} else {
				this.$request('/api/member/get_activity_list', {
					type: this.type
				}, 'post', {}, true).then(res => {
					if (res.code == 1) {
						this.activity_list = res.data

					}
				})
			}

		}
	}
</script>

<style>
	.venue-detail {
		display: flex;
		margin: 30rpx;
		padding-bottom: 30rpx;
		border-bottom: solid 1rpx #f7f7f7;
	}

	.venue-img image {
		width: 244rpx;
		height: 154rpx;
		border-radius: 10rpx;
		margin-right: 30rpx;
	}

	.venue-cont {
		color: rgba(153, 153, 153, 100);
		font-size: 26rpx;
		font-family: PingFangSC-regular;
	}

	.venue-name {
		color: rgba(16, 16, 16, 100);
		font-size: 32rpx;
		font-family: PingFangSC-regular;
		margin-bottom: 26rpx;
		margin-top: 6rpx;
	}

	.ticket-checking {
		width: 110rpx;
		height: 66rpx;
		line-height: 66rpx;
		border-radius: 20rpx;
		background-color: rgba(24, 144, 255, 100);
		color: rgba(255, 255, 255, 100);
		font-size: 26rpx;
		text-align: center;
		font-family: Arial;
		margin-top: 44rpx;
		margin-left: 38rpx;
	}
</style>
