<template>
	<view class="venue-reservation">
		<view class="top">
			<view class="district" @click="hierarchy">
				<view>{{quyu}}</view>
				<view class="top_img">
					<image src="../../static/ic_drop-down.png"></image>
				</view>
			</view>
			<view class="district" @click.stop="ShowHidden = !ShowHidden">
				<view>{{leixing}}</view>
				<view class="top_img">
					<image src="../../static/ic_drop-down.png"></image>
				</view>
			</view>
			<view class="district">
				<view></view>
				<view class="top_img">

				</view>
			</view>
		</view>
		<view class="content">
			<view class="reservation-content" v-for="item in venue.lists">
				<view class="reservation-content-item" @click="venuedetails(item)">
					<view class="reservation-image">
						<image mode="scaleToFill" :src="item.cover"></image>
					</view>
					<text class="reservation-content-text">{{item.name}}</text>
				</view>
			</view>
		</view>

		<view class="arrivalNavigation" v-if="ShowHidden">
			<view class="sideNavigation">
				<nav>
					<ul v-for="(item,index) in classify">
						<li @click="select(item)">{{item.title}}</li>
					</ul>
				</nav>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				quyu: '',
				leixing: '',
				classify: [],
				ShowHidden: false,
				leixing: '',
				c_id: 1,
				venue: [],
				area: '1'
			}
		},
		methods: {
			venuedetails(item) {
				console.log(item)
				uni.navigateTo({
					url: '../subclass-detail/subclass-detail?id=' + item.id + '&title=' + this.leixing
				})
			},
			select(item) {
				this.leixing = item.title;
				this.ShowHidden = !this.ShowHidden;
				this.c_id = item.id;
				this.$request('/api/venue/get_list', {
					area: this.area,
					cate: this.c_id,
					pagesize: '10',
					page: '1'
				}, 'post', {}).then(res => {


					this.venue = res.data

				})
			},
			hierarchy() {
				uni.navigateTo({
					url: '../hierarchy/hierarchy'
				})
			}
		},
		onLoad(e) {
			this.quyu = this.$lang.quyu[uni.getStorageSync('lang')];
			this.leixing = this.$lang.leixing[uni.getStorageSync('lang')];
			if (e.id && e.title) {
				this.c_id = e.id
				this.leixing = e.title;
				uni.setNavigationBarTitle({
					title: e.title
				});
			} else {
				uni.setNavigationBarTitle({
					title: '场馆'
				});
			}
			// if(uni.getStorageSync('area')){
			// 	this.area = uni.getStorageSync('area')
			// }
			if (e.area == 'undefined' || e.area == undefined || e.area == '' || e.area == null) {
				if (uni.getStorageSync('area')) {
					this.area = uni.getStorageSync('area')
				}
			} else {
				this.area = e.area
				uni.setStorageSync('area', this.area)
			}
			this.$request('/api/venue/get_category', {

			}, 'post', {}).then(res => {

				this.classify = res.data.lists

			})

			this.$request('/api/venue/get_list', {
				area: this.area,
				cate: this.c_id,
				pagesize: '10',
				page: '1'
			}, 'post', {}).then(res => {


				this.venue = res.data

			})
		}
	}
</script>

<style>
	.top {
		display: flex;
		justify-content: space-between;
		margin: 20rpx 26rpx 20rpx 30rpx;
		border-bottom: 1rpx solid rgba(200, 200, 200, 0.75);
		border-top: 1rpx solid rgba(200, 200, 200, 0.75);
		padding: 10px 5px;


	}

	.district {
		display: flex;
	}

	.top_img {
		width: 20rpx;
		height: 16rpx;
		margin-left: 10rpx;
	}

	.top_img image {
		width: 100%;
		height: 100%;
	}


	.reservation-content {
		padding: 10rpx 30rpx;
	}

	.reservation-content-item {
		width: 98%;
		height: 422rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 5rpx 7rpx 0rpx rgba(51, 51, 51, 0.21);
		border-radius: 10rpx;

	}

	.reservation-image image {
		width: 100%;
		height: 344rpx;
		background: #FFFFFF;
		border-radius: 10rpx 10rpx 0rpx 0rpx;
	}

	.reservation-content-text {
		width: 444rpx;

		font-size: 28rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #333333;

		margin-left: 22rpx;
	}


	.arrivalNavigation {
		width: 400rpx;
		position: absolute;
		right: 150rpx;
		top: 80rpx;
		z-index: 99;

	}

	.sideNavigation {
		width: 300rpx;
		background-color: #202020;
		color: #eee;
		border-radius: 10rpx;
	}

	.sideNavigation nav ul li {
		height: 85rpx;
		margin-left: 23rpx;
		line-height: 85rpx;
		font-size: 25rpx;
		list-style: none;
	}

	.liBottomBorder {
		border: 0.1rpx solid #373737;
	}
</style>
