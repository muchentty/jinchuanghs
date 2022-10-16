<template>
	<view>
		<view class="consult-top">
			<view class="area" @click="carea">
				<view>区域</view>
				<view class="area-img">
					<image src="../../static/ic_drop-down.png"></image>
				</view>
			</view>
			<view class="all" @click="ShowHidden = !ShowHidden">
				<view>{{title}}</view>
				<view class="all-img">
					<image src="../../static/ic_drop-down.png"></image>
				</view>
			</view>
		</view>
		<view class="scent-top">
			<swiper class="swiper" :previous-margin="previous" :next-margin='next' :circular="true" @change="swiperChange">
				<swiper-item v-for="(item,index) in swiper.list" :key="index">
					<!-- <image class='le-img' :src='item' :class="{'le-active':swiper.index == index}"></image> -->
					<view :class="swiper.index == index ? 'scent-left' : 'scent-lefts'">
						<view class="attractions-img" :class="swiper.index == index ? 'attractions-img' : 'attractions-imgs'">
							<image src="../../static/banner.png"></image>
						</view>
						<view :class="swiper.index == index ? 'attractions-bot' : 'attractions-bots'">
							<view class="attractions-name">无极龙宫殿</view>
							<view class="headline">
								<view>精选</view>
								<view>自然风光</view>
							</view>
							<view>距你16.83km</view>
							<view>xxxxxxxx景区</view>
						</view>
					</view>
				</swiper-item>
			</swiper> 
			<!-- <view class="scent-cont">
				<view class="scent-left">
					<view class="attractions-img">
						<image src="../../static/banner.png"></image>
					</view>
					<view class="attractions-bot">
						<view class="attractions-name">无极龙宫殿</view>
						<view class="headline">
							<view>精选</view>
							<view>自然风光</view>
						</view>
						<view>距你16.83km</view>
						<view>xxxxxxxx景区</view>
					</view>
				</view>
				<view class="scent-lefts">
					<view class="attractions-imgs">
						<image src="../../static/banner.png"></image>
					</view>
					<view class="attractions-bots">
						<view class="attractions-names">无极龙宫殿</view>
						<view class="headlines">
							<view>精选</view>
							<view>自然风光</view>
						</view>
						<view>距你16.83km</view>
						<view>xxxxxxxx景区</view>
					</view>
				</view>
			</view> -->
		</view>
		<view class="classification" >
			<view class="classif-top">
				<view :class="c_id == '6' ? 'active':''" @click="selects(cid,'全部类型')">全部</view>
				<view @click="selects(item.id,item.title)" v-for="(item,index) in classify">
					<view :class="c_id == item.id ?'active':''">{{item.title}}</view>
				</view>
				<!-- <view v-for="(item,index) in classify">
					<view>{{item.title}}</view>
				</view>
				<view v-for="(item,index) in classify">
					<view>{{item.title}}</view>
				</view> -->
			</view>
			<view class="travel">
				<view class="travel-item" v-for="(item,index) in venue" :key="index" @click="travel(item)">
					<view class="travel-img">
						<image :src="item.cover"></image>
					</view>
					<view class="travel-right">
						<view class="travel-name">{{item.name}}</view>
						<!-- <view class="tap">
							<view class="choiceness">精选</view>
							<view class="nature">自然风光</view>
						</view> -->
						<view>{{item.address}}</view>
						<view class="gl">开放时间 {{item.start_time}} - {{item.end_time}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="arrivalNavigation" v-if="ShowHidden">
			<view class="sideNavigation">
				<nav>
					<ul>
						<li @click="select(cid,'全部类型')">全部类型</li>
					</ul>
					<ul v-for="(item,index) in classify">
						<li @click="select(item.id,item.title)">{{item.title}}</li>
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
				area:'1',
				c_id:'6',
				cid:'6',
				venue:[],
				previous:'0',
				next:'200rpx',
				swiper: {
					margin: "100rpx",
					index: 0,
					list: [
						"../../static/banner.png",
						"../../static/bj.jpg",
						"../../static/bjs.png",
					]
				},
				ShowHidden:false,
				title:'全部类型',
				classify:[]
			}
		},
		methods: {
			//swiper滑动事件
			swiperChange: function(e) {
				this.swiper.index = e.detail.current;
			},
			carea(){
				uni.navigateTo({
					url:'../hierarchy/hierarchy'
				})
			},
			select(id, title) {
				this.title = title;
				this.ShowHidden = !this.ShowHidden;
				this.c_id = id
				this.getList()
			},
			selects(id, title) {
				this.title = title;
				this.c_id = id
				this.getList()
			},
			getClassify() {
				this.$request('/api/venue/get_scenic_category', {}, 'get', {}).then(res => {
					if (res.code == 1) {
						this.classify = res.data.lists
					}
				});
			},
			travel(item){
				uni.navigateTo({
					url:'../scenic-spot-detail/scenic-spot-detail?id=' + item.id
				})
			},
			getList(){
				this.$request('/api/venue/get_scenic_list', {
					area: this.area,
					cate: this.c_id,
					pagesize: '10',
					page: '1'
				}, 'post', {}).then(res => {
					this.venue = res.data.lists
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
		onLoad(e) {
			if (e.area == 'undefined' || e.area == undefined || e.area == '' || e.area == null) {
				if (uni.getStorageSync('area')) {
					this.area = uni.getStorageSync('area')
				}
			} else {
				this.area = e.area
				uni.setStorageSync('area',this.area)
			}
			this.getList()
			this.getClassify()
		}
	}
</script>

<style lang="scss">
	.swiper {
		height: 730rpx;
		margin-left: 30rpx;
		padding-top: 34rpx;
	}
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

	.scent-top {
		width: 100%;
		height: 452rpx;
		background-color: #E8E8E8;
	}

	.scent-cont {
		display: flex;
		padding: 34rpx 30rpx 0 30rpx;
		overflow-x: scroll;
	}

	.scent-left {
		width: 480rpx;
		height: 702rpx;
		border-radius: 20rpx;
		box-shadow: 0px 4rpx 12rpx 0px rgba(0, 0, 0, 0.4);
		background-color: #ABABAB;
		margin-right: 38rpx;
	}

	.attractions-img image {
		width: 480rpx;
		height: 478rpx;
		border-radius: 10rpx 10rpx 0 0;
	}

	.attractions-bot {
		height: 224rpx;
		border-radius: 0px 0px 20rpx 20rpx;
		color: #ffffff;
		margin: 18rpx 28rpx 0 28rpx;
		font-size: 26rpx;
		font-family: PingFangSC-regular;
	}

	.attractions-name {
		font-size: 30rpx;
	}

	.headline {
		display: flex;
		margin-top: 20rpx;
		margin-bottom: 12rpx;
	}

	.headline view {
		font-size: 24rpx;
		font-family: Arial;
		border: 2rpx solid rgba(255, 255, 255, 100);
		border-radius: 12rpx;
		padding: 2rpx 20rpx 6rpx 20rpx;
		margin-right: 20rpx;
	}

	.scent-lefts {
		width: 440rpx;
		height: 656rpx;
		border-radius: 20rpx;
		box-shadow: 0px 4rpx 12rpx 0px rgba(0, 0, 0, 0.4);
		background-color: #ABABAB;
		margin-right: 38rpx;
		margin-top: 30rpx;
	}

	.attractions-imgs image {
		width: 440rpx;
		height: 440rpx;
		border-radius: 10rpx 10rpx 0 0;
	}

	.attractions-bots {
		height: 224rpx;
		border-radius: 0px 0px 20rpx 20rpx;
		color: #ffffff;
		margin: 18rpx 28rpx 0 28rpx;
		font-size: 26rpx;
		font-family: PingFangSC-regular;
	}

	.attractions-names {
		font-size: 28rpx;
	}

	.headlines {
		display: flex;
		margin-top: 20rpx;
		margin-bottom: 12rpx;
	}

	.headlines view {
		font-size: 24rpx;
		font-family: Arial;
		border: 2rpx solid rgba(255, 255, 255, 100);
		border-radius: 12rpx;
		padding: 2rpx 20rpx 6rpx 20rpx;
		margin-right: 20rpx;
	}

	.classification {
		margin-top: 348rpx;
	}

	.classif-top {
		display: flex;
		// border-left: solid 12rpx #52A7FF;
		margin: 0 30rpx;
		// padding-left: 26rpx;
		// justify-content: space-between;
		color: rgba(16, 16, 16, 100);
		font-size: 32rpx;
		font-family: PingFangSC-regular;
		overflow-x: scroll;
		// padding: 32rpx 0rpx 20rpx 0rpx;
	}
	
	.classif-top view {
		// border-left: solid 12rpx #52A7FF;
		padding: 0 10rpx;
		text-align: center;
	}
	.active {
		border-left: solid 8rpx #52A7FF;
	}

	.travel {
		margin: 44rpx 30rpx;
	}

	.travel-item {
		width: 690rpx;
		height: 218rpx;
		border-radius: 20rpx;
		background-color: rgba(255, 255, 255, 100);
		box-shadow: 0px 2rpx 8rpx 0px rgba(0, 0, 0, 0.4);
		display: flex;
		margin-bottom: 20rpx;
	}

	.travel-img image {
		width: 330rpx;
		height: 218rpx;
		border-radius: 20rpx 0px 0px 20rpx;
	}

	.travel-right {
		margin-left: 20rpx;
		color: rgba(153, 153, 153, 100);
		font-size: 24rpx;
		font-family: PingFangSC-regular;
	}

	.travel-name {
		margin-top: 24rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		margin-bottom: 30rpx;
	}

	.tap {
		display: flex;
		margin-bottom: 12rpx;
	}

	.choiceness {
		width: 76rpx;
		height: 40rpx;
		line-height: 40rpx;
		color: rgba(238, 164, 94, 100);
		font-size: 24rpx;
		text-align: center;
		font-family: Arial;
		border: 2rpx solid rgba(238, 164, 94, 100);
		border-radius: 12rpx;
	}

	.nature {
		width: 116rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 12rpx;
		background-color: rgba(255, 255, 255, 100);
		color: rgba(82, 167, 255, 100);
		font-size: 24rpx;
		text-align: center;
		font-family: Arial;
		border: 2rpx solid rgba(82, 167, 255, 100);
		margin-left: 12rpx;
	}

	.gl {
		margin-top: 20rpx;
	}

	.cumulostratu {
		position: fixed;
		right: 34rpx;
		bottom: 128rpx;
		width: 84rpx;
		height: 84rpx;
		line-height: 84rpx;
		background-color: rgba(82, 167, 255, 100);
		color: rgba(255, 255, 255, 100);
		font-size: 20rpx;
		text-align: center;
		font-family: Arial;
		border-radius: 50%;
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
		max-height: 500rpx;
		overflow-y: scroll;
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
	.pacolt {
		padding: 30rpx;
	}
</style>
