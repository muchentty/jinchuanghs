<template>
	<view class="hierarchy">
		<view class="left">
			<scroll-view scroll-y="true">
				<view v-for="(ins,index) in land">
					<view v-if="ins.data.prev_level != ''">
						<view v-show="ins.data.prev_level == land[0].city">
							<view class="land">{{dijishi}}</view>
							<view class="hh" v-for="(itm, index) in ins.data.prev_data">
								<view @click="choices(itm,itm.id)">{{itm.name}}</view>
							</view>
						</view>
						<view v-show="ins.data.prev_level == land[1].city">
							<view class="xian">{{quxianji}}</view>
							<view class="hh" v-for="(itm, index) in ins.data.prev_data">
								<view @click="choices(itm,itm.id)">{{itm.name}}</view>
							</view>
						</view>
						<view v-show="ins.data.prev_level == land[2].city">
							<view class="xiang">{{xiangzhenji}}</view>
							<view class="hh" v-for="(itm, index) in ins.data.prev_data">
								<view @click="choices(itm,itm.id)">{{itm.name}}</view>
							</view>
						</view>
						<view v-show="ins.data.prev_level == land[3].city">
							<view class="cun">{{cunji}}</view>
							<view v-if="ins.data.prev_data">
								<view class="hh" v-for="(itm, index) in ins.data.prev_data">
									<view @click="choices(itm,itm.id)">{{itm.name}}</view>
								</view>
							</view>
						</view>
						<view v-show="ins.data.prev_level == land[4].city">
							<view class="custom">{{zidingyi}}</view>
							<view class="hh" v-for="(itm, index) in ins.data.prev_data">
								<view @click="choices(itm,itm.id)">{{itm.name}}</view>
							</view>
						</view>
					</view>
				</view>
				<view v-show="city.level == land[0].city">
					<view class="land">{{dijishi}}</view>
					<view class="hh" v-for="(item, index) in city.data">
						<view :class="actives == item.id ? 'active' : ''" @click="choices(item,item.id)">{{item.name}}
						</view>
					</view>
				</view>
				<view v-show="city.level==land[1].city">
					<view class="xian">{{quxianji}}</view>
					<view class="hh" v-for="(item, index) in city.data">
						<view :class="actives == item.id ? 'active' : ''" @click="choices(item,item.id)">{{item.name}}
						</view>
					</view>
				</view>
				<view v-show="city.level==land[2].city">
					<view class="xiang">{{xiangzhenji}}</view>
					<view class="hh" v-for="(item, index) in city.data">
						<view :class="actives == item.id ? 'active' : ''" @click="choices(item,item.id)">{{item.name}}
						</view>
					</view>
				</view>
				<view v-show="city.level==land[3].city">
					<view class="cun">{{cunji}}</view>
					<view class="hh" v-for="(item, index) in city.data">
						<view :class="actives == item.id ? 'active' : ''" @click="choices(item,item.id)">{{item.name}}
						</view>
					</view>
				</view>
				<view v-show="city.level==land[4].city">
					<view class="custom">{{zidingyi}}</view>
					<view class="hh" v-for="(item, index) in city.data">
						<view :class="actives == item.id ? 'active' : ''" @click="choices(item,item.id)">{{item.name}}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="right">
			<view class="pavilion" v-if="cloud_data">
				<view class="step">
					<view class="ones" @click="kulturhuset(items.id)" v-for="items in cloud_data">{{items.title}}</view>
				</view>
			</view>
			<view class="pavilion" v-else></view>
			<view class="step" v-if="city.next_data">
				<view class="ones" v-for="items in city.next_data">
					<view @click="choice(items)">{{items.name}}</view>
				</view>
			</view>
			<view class="step" v-else></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dijishi: '',
				quxianji: '',
				xiangzhenji: '',
				zidingyi: '',
				dijishi: '',
				quxianji: '',
				xiangzhenji: '',
				zidingyi: '',
				dijishi: '',
				quxianji: '',
				xiangzhenji: '',
				zidingyi: '',
				cunji: '',
				cunji: '',
				cunji: '',
				city: [],
				land: [{
					index: 0,
					city: 'city',
					data: [],
					name: '-{{dijishi}}-'
				}, {
					index: 1,
					city: "county",
					data: [],
					name: '-{{quxianji}}-'
				}, {
					index: 2,
					city: "town",
					data: [],
					name: '-{{xiangzhenji}}-'
				}, {
					index: 3,
					city: "village",
					data: [],
					name: '-{{cunji}}-'
				}, {
					index: 4,
					city: "diy",
					data: [],
					name: '-{{zidingyi}}-'
				}],
				cloud_data: [],
				actives: 0,
			}
		},
		methods: {
			choices(item, index) {
				this.actives = index;

				let id = item.id;
				this.$request('/api/area', {
					id: id
				}, 'post', {}).then(res => {
					if (res.code == 1) {
						this.city = res.data;
						this.cloud_data = res.data.cloud_data;
						for (let i = 0; i < this.land.length; i++) {
							if (this.land[i].data.prev_level == item.level) {
								this.land[i].data = [];

								for (let a = 0; a < this.land.length; a++) {
									if (this.land[i].index < this.land[a].index) {

										this.land[a].data = []

									}
								}

							}
						}
					}
				})
			},
			//点击文化馆
			kulturhuset(area) {
				uni.setStorageSync('area', area);
				let pages = getCurrentPages();
				let beforePage = pages[pages.length - 2];
				if(beforePage=='undefined' || beforePage==undefined || beforePage=='' || beforePage==null){
					uni.switchTab({
						url: '../index/index'
					})
				}else{
					uni.$emit('area', area)
					uni.navigateBack({
						delta: 1
					})
				}
			},
			//点击下面
			choice(item, index) {
				this.actives = item.id
				let id = item.id;
				this.$request('/api/area', {
					id: id
				}, 'post', {}).then(res => {
					if (res.code == 1) {
						this.city = res.data;
						this.cloud_data = res.data.cloud_data;
						console.log(this.cloud_data)
						console.log(this.land)
						for (let i = 0; i < this.land.length; i++) {
							if (this.land[i].city == this.city.level) {
								this.land[i].data = this.city
							}
						}
						console.log(this.land)
					}
				})
			}
		},
		onShow(e) {
			this.dijishi = this.$lang.dijishi[uni.getStorageSync('lang')];
			this.quxianji = this.$lang.quxianji[uni.getStorageSync('lang')];
			this.xiangzhenji = this.$lang.xiangzhenji[uni.getStorageSync('lang')];
			this.zidingyi = this.$lang.zidingyi[uni.getStorageSync('lang')];
			this.dijishi = this.$lang.dijishi[uni.getStorageSync('lang')];
			this.quxianji = this.$lang.quxianji[uni.getStorageSync('lang')];
			this.xiangzhenji = this.$lang.xiangzhenji[uni.getStorageSync('lang')];
			this.zidingyi = this.$lang.zidingyi[uni.getStorageSync('lang')];
			this.dijishi = this.$lang.dijishi[uni.getStorageSync('lang')];
			this.quxianji = this.$lang.quxianji[uni.getStorageSync('lang')];
			this.xiangzhenji = this.$lang.xiangzhenji[uni.getStorageSync('lang')];
			this.zidingyi = this.$lang.zidingyi[uni.getStorageSync('lang')];
			this.cunji = this.$lang.cunji[uni.getStorageSync('lang')];
			this.cunji = this.$lang.cunji[uni.getStorageSync('lang')];
			this.cunji = this.$lang.cunji[uni.getStorageSync('lang')];

			let area = uni.getStorageSync('area');
			this.$request('/api/area', {
				id: area
			}, 'post', {}).then(res => {


				if (res.code == 1) {
					this.city = res.data
					this.cloud_data = res.data.cloud_data
					this.land[0].data = res.data;
				}
			})
			
			// this.$request('/api/area/list', {
			// 	// id: area
			// }, 'post', {}).then(res => {
			
			
			// 	if (res.code == 1) {
			// 		this.city = res.data
			// 		this.cloud_data = res.data.cloud_data
			// 		this.land[0].data = res.data;
			// 	}
			// })
		},
		onLoad(e) {

		}
	}
</script>

<style>
	.hierarchy {
		display: flex;
		height: 100%;
	}

	.left {
		width: 320rpx;
		height: 100%;
		overflow-y: scroll;
		box-sizing: border-box;
		font-size: 32rpx;
		line-height: 80rpx;
		background-color: #F3F3F3;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: center;
		font-family: PingFangSC-regular;
		padding-bottom: 20rpx;
	}

	.hh {
		background-color: #FFFFFF;
		margin-bottom: 6rpx;
		margin-right: 10rpx;
	}

	.active {
		background: #FFFFFF;
		color: #00aaff;
	}

	.land {
		background-color: #2953BB;
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		text-align: center;
		margin-right: 10rpx;
	}

	.custom {
		background-color: #009891;
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		text-align: center;
		margin-right: 10rpx;
	}

	.cun {
		background-color: #E772C4;
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		text-align: center;
		margin-right: 10rpx;
	}

	.xiang {
		background-color: #AF72E7;
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		text-align: center;
		margin-right: 10rpx;
	}

	.xian {
		background-color: #6C72E7;
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		text-align: center;
		margin-right: 10rpx;
	}

	.right {
		width: 430rpx;
		height: 100%;
		overflow-y: scroll;
	}

	.pavilion {
		/* width: 572rpx; */
		min-height: 260rpx;
		border-bottom: solid 1px rgba(51, 51, 51, 0.24);
		display: flex;
		justify-content: center;
		padding-top: 30rpx;
	}

	.pavilion .ones {
		padding: 12rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 12rpx;
		color: #2953BB;
		font-size: 24rpx;
		text-align: center;
		font-family: Arial;
		border: 1px solid #2953BB;
		margin-bottom: 20rpx;
	}

	.step {
		margin-top: 24rpx;
		display: flex;

		flex-wrap: wrap;
	}

	.step .ones {
		padding: 12rpx;
		border-radius: 12rpx;
		color: #2953BB;
		font-size: 24rpx;
		text-align: center;
		font-family: Arial;
		border: 1px solid #2953BB;
		margin-bottom: 20rpx;
		margin-left: 30rpx;
	}
</style>
