<template>
	<view>
		<view class="content" v-show="value4 == 0">
			<view class="detail-img" v-show="index == 0">
				<image :src="race.cover"></image>
			</view>
			<view class="detail-img" v-show="index==1">
				<video :src="race.cover_video"></video>
			</view>
			<view v-if="race.cover_video == null || race.cover == null || race.cover_video == '' || race.cover == ''">
			</view>
			<view class="select" v-else>
				<view :class="index==1?'videos':'video'" @click="select(1)">视</view>
				<view :class="index == 0 ?'img':'imgs'" @click="select(0)">图</view>
			</view>
			<view class="numshow">
				<view class="num">
					<view class="numitem">
						<view class="numitem_num">
							{{race.works_count}}
						</view>
						<view class="numitem_txt">
							选手数
						</view>
					</view>
					<view class="numitem">
						<view class="numitem_num">
							{{race.sum_vote}}
						</view>
						<view class="numitem_txt">
							总投票
						</view>
					</view>
					<view class="numitem">
						<view class="numitem_num">
							{{race.views}}
						</view>
						<view class="numitem_txt">
							浏览量
						</view>
					</view>
				</view>
			</view>
			<view class="times" v-if="status == 1">
				<text>距离活动结束：</text>
				<text>{{time}}</text>
			</view>
			<view class="times" v-else>
				<text>已结束</text>
			</view>
			<view class="timeshow">
				<view class="time_item">
					<view class="titem_left">
						<image src="../../static/are.png" mode=""></image>
					</view>
					<view class="titem_right">
						<text>开始时间: </text>
						<text>{{race.start_time | formatDate('-')}}</text>
					</view>
				</view>
				<view class="time_item">
					<view class="titem_left">
						<image src="../../static/are.png" mode=""></image>
					</view>
					<view class="titem_right">
						<text>结束时间:</text>
						<text>{{race.end_time | formatDate('-')}}</text>
					</view>
				</view>
				<view class="time_item">
					<view class="titem_left">
						<image src="../../static/are.png" mode=""></image>
					</view>
					<view class="titem_right">
						<text>一个投票者每天能投{{race.quota}}票</text>
					</view>
				</view>
			</view>
			<view class="goto" @click="participation">
				我要参与
			</view>
			<view class="search">
				<view class="search_left">
					<image src="../../static/ic_search.png"></image>
					<view>
						<input v-model="names" placeholder="姓名/编号" />
					</view>
				</view>
				<view class="search_right" @click="seachwork">
					搜索
				</view>
			</view>
			<!-- 瀑布流布局 -->
			<view class="lists">
				<flowLayout :columnNum="2">
					<!-- 此处写循环布局就可以了，需要注意 :slot="index" 必须这么写，因为空间内，是通过它来展示的 -->
					<view v-for="(item,index) in workList" v-bind:key="index" :slot="index">
						<view class="item">
							<view class="item_img" @click="particulars(item)">
								<image :src="item.pics[0]" mode="widthFix"></image>
							</view>
							<view class="item_name" @click="particulars(item)">
								{{item.player_name}}
							</view>
							<view class="total">
								<text>{{item.vote_count}}</text>
								<text>票</text>
							</view>
							<view class="toupiao" @click="vote(item)">
								投票
							</view>
						</view>
					</view>
				</flowLayout>
			</view>
		</view>
		<view v-show="value4 == 1">
			<view class="ranking">
				<!-- <view class="rank1">2022-07-22 12:00:00</view> -->
				<view class="rank3" v-if="status == 1">剩余: {{time}}</view>
				<view class="rank3" v-else>已结束</view>
				<view class="top" v-if="rankList2">
					<view class="top-itemes">
						<view class="top-item" v-if="rankList2[1]">
							<view class="top-img">
								<image :src="rankList2[1].avatar"></image>
							</view>
							<view class="top-name">{{rankList2[1].player_name}}</view>
							<view class="top-num">{{rankList2[1].vote_count}}</view>
						</view>
					</view>
					<view class="top-items" v-if="rankList2[0]">
						<view class="top-imgs">
							<image :src="rankList2[0].avatar"></image>
						</view>
						<view class="top-name">{{rankList2[0].player_name}}</view>
						<view class="top-num">{{rankList2[0].vote_count}}</view>
					</view>
					<view class="top-itemes">
						<view class="top-item" v-if="rankList2[2]">
							<view class="top-img">
								<image :src="rankList2[2].avatar"></image>
							</view>
							<view class="top-name">{{rankList2[2].player_name}}</view>
							<view class="top-num">{{rankList2[2].vote_count}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="list-item" v-for="(item,index) in rankList" :key="index">
					<view class="list-left">
						<view>{{item.inx}}</view>
						<view class="list-imgs">
							<image :src="item.avatar"></image>
						</view>
						<view class="list-names">{{item.player_name}}</view>
					</view>
					<view class="list-nums"><text class="nums">{{item.vote_count}}</text>票</view>
				</view>
				<!-- <view class="list-item">
					<view class="list-left">
						<view>5</view>
						<view class="list-imgs"></view>
						<view class="list-names">王五</view>
					</view>
					<view class="list-nums"><text class="nums">111</text>票</view>
				</view> -->
			</view>
		</view>
		<view v-show="value4 == 2">
			<view class="huod">
				<view>{{race.description}}</view>
				<u-parse :content="race.content"></u-parse>
			</view>
		</view>
		<view v-show="value4 == 3">
			<view>
				<view class="searchs">
					<view class="search_left">
						<image src="../../static/ic_search.png"></image>
						<view>
							<input v-model="names" placeholder="姓名/编号" />
						</view>
					</view>
					<view class="search_right" @click="seachworks">
						搜索
					</view>
				</view>
				<view class="items" v-if="seadetail!=''" @click="parseach">
					<view class="item_img">
						<image :src="seadetail.pics[0]" mode="widthFix"></image>
					</view>
					<view class="item_name">
						{{seadetail.nickname}}
					</view>
					<view class="total">
						<text>{{seadetail.vote_count}}</text>
						<text>票</text>
					</view>
					<view class="toupiao">
						投票
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-navigation">
			<u-tabbar :value="value4" @change="change1" :fixed="false" :placeholder="false" activeColor="#333333"
				:safeAreaInsetBottom="false">
				<u-tabbar-item text="首页" @click="click1">
					<image class="u-page__item__slot-icon" slot="active-icon" src="../../static/shouyes.png"></image>
					<image class="u-page__item__slot-icon" slot="inactive-icon" src="../../static/shouye.png"></image>
				</u-tabbar-item>
				<u-tabbar-item text="排行榜" @click="click1">
					<image class="u-page__item__slot-icon" slot="active-icon" src="../../static/paih.png"></image>
					<image class="u-page__item__slot-icon" slot="inactive-icon" src="../../static/paiha.png"></image>
				</u-tabbar-item>
				<u-tabbar-item text="赛事说明" @click="click1">
					<image class="u-page__item__slot-icon" slot="active-icon" src="../../static/youhuis.png">
					</image>
					<image class="u-page__item__slot-icon" slot="inactive-icon" src="../../static/youhui.png">
					</image>
				</u-tabbar-item>
				<u-tabbar-item text="搜索" @click="click1">
					<image class="u-page__item__slot-icon" slot="active-icon" src="../../static/seachs.png"></image>
					<image class="u-page__item__slot-icon" slot="inactive-icon" src="../../static/seach.png"></image>
				</u-tabbar-item>
			</u-tabbar>
		</view>
		<u-overlay :show="show">
			<view class="warp">
				<view class="warp-item">
					<view class="seach">
						<view class="seach-left">搜索</view>
						<view class="seach-right" @click="show = false">×</view>
					</view>
					<view class="search_lefts">
						<image src="../../static/ic_search.png"></image>
						<view>
							<input v-model="names" placeholder="姓名/编号" />
						</view>
					</view>
					<view class="search_rights" @click="seachworks">
						搜索
					</view>
				</view>
			</view>
		</u-overlay>
	</view>
</template>

<script>
	import flowLayout from "@/components/eiml-flow/eiml-flow.vue"
	export default {
		components: {
			flowLayout
		},
		data() {
			return {
				value4: 0,
				index: 0,
				list: [{
					show: 0
				}, {
					show: 1
				}, {
					show: 2
				}, {
					show: 4
				}],
				id: '',
				race: [],
				worksList: [],
				worksRank: [],
				workList: [],
				timestamp: '',
				status: 0,
				time: '',
				names: '',
				seadetail: '',
				rankList: [],
				rankList2: [],
				timer: null,
				show: false
			}
		},
		methods: {
			seachworks() {
				this.$request('/api/race/works_read', {
					id: this.id,
					keyword: this.names
				}, 'post', {}).then(res => {
					console.log(res)
					if (res.code == 200) {
						if (res.data.id) {
							this.seadetail = res.data
						} else {
							this.seadetail = ''
						}
					}
				})
			},
			seachwork() {
				this.$request('/api/race/works_read', {
					id: this.id,
					keyword: this.names
				}, 'post', {}).then(res => {
					console.log(res)
					if (res.code == 200) {
						if (res.data.id) {
							console.log('有值')
							this.workList[0] = res.data
						} else {
							console.log('没有值')
							this.workList = []
						}
					}
				})
			},
			//投票
			vote(item) {
				this.$request('/api/race/vote', {
					works_id: item.id,
				}, 'post', {}, true).then(res => {
					console.log(res)
					if (res.code == 200) {
						uni.showToast({
							title: '投票成功'
						})
						this.detail()
						this.rankingList()
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			//排行榜
			rankingList() {
				this.$request('/api/race/rank', {
					race_id: this.id,
				}, 'get', {}, true).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.rankList = res.data
						if (this.rankList.length >= 3) {
							this.rankList2 = this.rankList.splice(0, 3)
							console.log(this.rankList2, '有三个')
						} else if (this.rankList.length >= 2) {
							this.rankList2 = this.rankList.splice(0, 2)
							console.log(this.rankList2, '有两个')
						} else if (this.rankList.length >= 1) {
							this.rankList2 = this.rankList.splice(0, 1)
							console.log(this.rankList2, '有一个')
						}
						if (this.rankList.length > 0) {
							this.rankList.forEach((item, index) => {
								item.inx = index + 4
								console.log(item.inx)
							})
						}

						console.log(this.rankList)
					}
				})
			},
			select(e) {
				this.index = e
			},
			click1(e) {
				console.log('click1', e);
				if (e == 3) {
					this.value4 = 0
					this.show = true
				} else {
					this.value4 = e
				}
			},
			change1() {

			},
			//参与
			participation() {
				uni.navigateTo({
					url: '../participation/participation?id=' + this.id
				})
			},
			particulars(item) {
				uni.navigateTo({
					url: '../ranking-list/ranking-list?item=' + JSON.stringify(item)
				})
			},
			parseach() {
				uni.navigateTo({
					url: '../ranking-list/ranking-list?item=' + JSON.stringify(seadetail)
				})
			},
			intervalTime(startTime, endTime) {
				var timestamp = (Date.parse(new Date())) / 1000; //计算当前时间戳 (毫秒级)
				var date1 = ""; //开始时间
				if (timestamp < startTime) {
					date1 = startTime;
				} else {
					date1 = timestamp; //开始时间
				}
				var date2 = endTime; //结束时间
				// var date3 = date2.getTime() - date1.getTime(); //时间差的毫秒数
				var date3 = (date2 - date1) * 1000; //时间差的毫秒数
				//计算出相差天数
				var days = Math.floor(date3 / (24 * 3600 * 1000));
				//计算出小时数

				var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
				var hours = Math.floor(leave1 / (3600 * 1000));
				//计算相差分钟数
				var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
				var minutes = Math.floor(leave2 / (60 * 1000));

				//计算相差秒数

				var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
				var seconds = Math.round(leave3 / 1000);
				console.log(days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
				// return   days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒"
				return days + "天 " + hours + "小时 " + minutes + " 分钟"
			},
			//详情
			detail() {
				// this.$request('/api/race/view',{
				// 	id:this.id,
				// },'post',{}).then(res=>{

				// 	if (res.code === 1) {
				// 		this.race = res.data.race;
				// 		uni.setNavigationBarTitle({
				// 		　　title:this.race.title
				// 		})
				// 	}else{
				// 		uni.showToast({
				// 			title:res.msg,
				// 			icon:'none'
				// 		})
				// 	}
				// })
				let that = this
				var timestamp = (Date.parse(new Date())) / 1000;
				console.log(timestamp)
				this.$request('/api/race/read', {
					id: this.id,
				}, 'post', {}).then(res => {
					if (res.code === 200) {
						this.race = res.data;
						this.workList = res.data.works
						uni.setNavigationBarTitle({
							title: this.race.title
						})
						if (that.race.end_time > timestamp) {
							that.time = that.intervalTime(that.race.start_time, that.race.end_time)
							that.status = 1
						} else if (that.race.end_time < timestamp) {
							that.status = 0
						} else if (that.race.end_time == timestamp) {
							that.status = 0
						}
						if (that.status == 1) {
							that.timer = setInterval(function() {
								if (that.race.end_time > timestamp) {
									that.time = that.intervalTime(that.race.start_time, that.race.end_time)
									that.status = 1
								} else if (that.race.end_time < timestamp) {
									that.status = 0
								} else if (that.race.end_time == timestamp) {
									that.status = 0
								}
							}, 20000)
						} else {
							console.log('已经结束')
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			list1() {
				this.$request('/api/race/get_works_list', {
					id: this.id
				}, 'post', {}).then(res => {
					if (res.code === 1) {
						this.worksList = res.data.lists;
					}
				})
			},
			list2() {
				this.$request('/api/race/get_works_rank', {}, 'post', {}).then(res => {
					if (res.code === 1) {
						this.worksRank = res.data.lists;
					}
				})
			}
		},
		filters: {
			formatDate: function(value, spe = '/') {
				value = value * 1000
				let data = new Date(value);
				let year = data.getFullYear();
				let month = data.getMonth() + 1;
				let day = data.getDate();
				let h = data.getHours();
				let mm = data.getMinutes();
				let s = data.getSeconds();
				month = month >= 10 ? month : "0" + month;
				day = day >= 10 ? day : "0" + day;
				h = h >= 10 ? h : "0" + h;
				mm = mm >= 10 ? mm : "0" + mm;
				s = s >= 10 ? s : "0" + s;
				return `${year}${spe}${month}${spe}${day} ${h}:${mm}:${s}`;
			}
		},
		onLoad(e) {
			this.id = e.id
			// this.detail()
			// this.list1()
			// this.list2()
			this.rankingList()
		},
		onShow() {
			this.detail()
			this.rankingList()
		},
		onHide() {
			clearInterval(this.timer)
		}
	}
</script>

<style lang="scss">
	.content {
		height: 100%;
		background-color: #e8e8e8;
	}

	.detail-img image {
		width: 750rpx;
		height: 438rpx;
		/* 	position: relative; */
	}

	.detail-img video {
		width: 750rpx;
		height: 438rpx;
		/* 	position: relative; */
	}

	.select {

		position: absolute;
		top: 368rpx;
		right: 26rpx;
		display: flex;
		width: 170rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 62rpx;
		font-size: 10rpx;
		background-color: #999999;
		color: #ffffff;
	}

	.img {
		width: 95rpx;
		text-align: center;
		border-radius: 62rpx;
		background-color: #1890FF;
	}

	.video {
		width: 78rpx;
		text-align: center;
	}

	.imgs {
		width: 78rpx;
		text-align: center;
	}

	.videos {
		width: 95rpx;
		text-align: center;
		border-radius: 62rpx;
		background-color: #1890FF;
	}

	.numshow {
		padding: 0rpx 40rpx 0rpx 30rpx;
	}

	.num {
		margin-top: 26rpx;
		padding: 0rpx 34rpx;
		display: flex;
		justify-content: space-around;
		/* width: 680rpx; */
		height: 156rpx;
		/* border: 1rpx solid red; */
		border-radius: 20rpx;
		background-color: rgba(255, 255, 255, 100);
		box-shadow: 0px 2rpx 10rpx 0px rgba(0, 0, 0, 0.4);
	}

	.numitem {
		/* width: 84rpx; */
		text-align: center;
		/* border: 1rpx solid red; */
	}

	.numitem_num {
		/* width: 84rpx; */
		text-align: center;
		margin-top: 30rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 36rpx;
		font-family: PingFangSC-regular;
	}

	.numitem_txt {
		margin-top: 14rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
	}

	.times {
		margin-top: 22rpx;
		margin-left: 30rpx;
		width: 680rpx;
		height: 84rpx;
		line-height: 84rpx;
		border-radius: 20rpx;
		background-color: rgba(255, 255, 255, 100);
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: center;
		box-shadow: 0px 2rpx 10rpx 0px rgba(0, 0, 0, 0.4);
		font-family: Arial;
	}

	.timeshow {
		margin-left: 30rpx;
		margin-top: 24rpx;
		padding-top: 38rpx;
		padding-bottom: 6rpx;
		width: 680rpx;
		/* height: 242rpx; */
		border-radius: 20rpx;
		background-color: rgba(255, 255, 255, 100);
		color: rgba(16, 16, 16, 100);
		font-size: 24rpx;
		text-align: center;
		box-shadow: 0px 2rpx 10rpx 0px rgba(0, 0, 0, 0.4);
		font-family: Arial;
	}

	.time_item {
		display: flex;
		margin-bottom: 26rpx;
	}

	.titem_left image {
		margin-left: 30rpx;
		margin-right: 12rpx;
		width: 40rpx;
		height: 40rpx;
	}

	.titem_right {}

	.goto {
		margin-top: 56rpx;
		margin-left: 102rpx;
		text-align: center;
		height: 96rpx;
		line-height: 96rpx;
		width: 548rpx;
		border-radius: 78rpx;
		background-color: rgba(82, 167, 255, 100);
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		text-align: center;
		font-family: Arial;
	}

	.gotos {
		margin-top: 56rpx;
		margin-left: 102rpx;
		text-align: center;
		height: 96rpx;
		line-height: 96rpx;
		width: 548rpx;
		border-radius: 78rpx;
		background-color: #c2c2c2;
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		text-align: center;
		font-family: Arial;
	}

	.search {
		display: flex;
		margin-top: 56rpx;
	}

	.searchs {
		display: flex;
		margin-top: 56rpx;
	}

	.search_left {
		width: 480rpx;
		background-color: #ffffff;
		border: 2rpx solid rgba(187, 187, 187, 100);
		border-radius: 14rpx;
		margin-left: 30rpx;
		margin-right: 38rpx;
		display: flex;
		align-items: center;
	}

	.search_left image {
		width: 40rpx;
		height: 40rpx;
		margin-left: 18rpx;
	}

	.search_left input {
		margin-left: 16rpx;
		color: rgba(153, 153, 153, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.search_right {
		text-align: center;
		width: 162rpx;
		height: 78rpx;
		line-height: 78rpx;
		border-radius: 14rpx;
		background-color: rgba(82, 167, 255, 100);
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		text-align: center;
		font-family: Arial;
	}

	.lists {
		margin-top: 44rpx;
		/* border: 1rpx solid red; */
		padding: 0rpx 30rpx 100rpx 30rpx;
		background-color: #e8e8e8;
	}

	.item {
		width: 330rpx;
		/* border: 1rpx solid red; */
		background-color: #ffffff;
		padding-bottom: 22rpx;
		margin-bottom: 22rpx;
	}

	.item_img image {
		width: 330rpx;
		/* height: 252rpx; */
	}

	.item_name {
		margin-top: 22rpx;
	}

	.item_name,
	.total {
		margin-left: 16rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 32rpx;
		text-align: left;
		font-family: PingFangSC-regular
	}

	.toupiao {
		margin-left: 46rpx;
		margin-top: 24rpx;
		text-align: center;
		width: 240rpx;
		height: 72rpx;
		line-height: 72rpx;
		border-radius: 22rpx;
		background-color: rgba(82, 167, 255, 100);
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		text-align: center;
		font-family: Arial;
	}

	.bottom-navigation {
		position: fixed;
		bottom: 0;
		width: 100%;
		/* height: 60rpx; */
		/* background-color: rgba(247, 247, 247, 80); */
		/* padding: 30rpx 0; */
	}

	.u-page__item__slot-icon {
		width: 40rpx;
		height: 40rpx;
	}

	.ranking {
		width: 750rpx;
		height: 560rpx;
		background-color: rgba(19, 82, 195, 100);
		text-align: center;
		box-shadow: 0px 4rpx 8rpx 0px rgba(0, 0, 0, 0.05);
	}

	.top-itemes {
		width: 234rpx;
		height: 283rpx;
	}

	.top-item {
		width: 234rpx;
		height: 283rpx;
		border-radius: 10rpx;
		background-color: rgba(255, 255, 255, 100);
		text-align: center;
		padding-top: 20rpx;
		margin-top: 36rpx;
	}

	.rank1 {
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
		padding-top: 44rpx;
	}

	.rank2 {
		color: rgba(255, 255, 255, 100);
		font-size: 36rpx;
		font-family: PingFangSC-regular;
		margin-top: 6rpx;
	}

	.rank3 {
		color: rgba(255, 255, 255, 100);
		font-size: 36rpx;
		font-family: PingFangSC-regular;
		padding-top: 64rpx;
	}

	.top {
		display: flex;
		margin: 44rpx 24rpx 0 24rpx;
		/* background-color: #fff; */
	}

	.top-img {
		// margin-top: 46rpx;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		border: solid 1rpx #999;
		margin-left: 70rpx;
	}
	.top-img image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.top-items {
		width: 234rpx;
		height: 340rpx;
		border-radius: 10rpx;
		background-color: rgba(255, 255, 255, 100);
		text-align: center;
		box-shadow: 0px -3rpx 10rpx 0px rgba(0, 0, 0, 0.18);
	}

	.top-imgs {
		margin-top: 72rpx;
		width: 130rpx;
		height: 130rpx;
		border-radius: 50%;
		border: solid 1rpx #999;
		margin-left: 52rpx;
	}
	
	.top-imgs image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.top-name {
		color: rgba(153, 153, 153, 100);
		font-size: 24rpx;
		margin-top: 28rpx;
	}

	.top-num {
		color: rgba(246, 62, 61, 100);
		font-size: 32rpx;
		margin-top: 16rpx;
	}

	.list {
		margin-left: 52rpx;
		margin-right: 20rpx;
		padding-bottom: 100rpx;
	}

	.list .list-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 0;
		border-bottom: solid 1rpx #f7f7f7;
	}

	.list .list-left {
		display: flex;
		align-items: center;
		color: #999;
		font-size: 32rpx;
		font-family: Arial-400;
	}

	.list .list-imgs {
		width: 80rpx;
		height: 80rpx;
		margin-left: 36rpx;
		border: solid 1rpx #999;
		border-radius: 50%;
		margin-right: 24rpx;
	}
	.list .list-imgs image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.list .list-names {
		color: rgba(51, 51, 51, 100);
		font-size: 28rpx;
	}

	.list .list-nums {
		font-family: Arial-regular;
		color: #999;
	}

	.list .nums {
		color: #F63E3D;
		font-size: 24rpx;
	}

	.huod {
		padding: 30rpx;
	}

	.huod view {
		margin-bottom: 20rpx;
	}

	.items {
		margin: 30rpx;
		width: 330rpx;
		border: 1rpx solid #eeeeee;
		background-color: #ffffff;
		padding-bottom: 22rpx;
		margin-bottom: 22rpx;
	}

	.warp {
		// width: 690rpx;
		// height: 380rpx;
		// background-color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
	.warp-item {
		width: 690rpx;
		height: 380rpx;
		background-color: #ffffff;
	}
	.search_lefts {
		width: 558rpx;
		height: 86rpx;
		background-color: #ffffff;
		border: 2rpx solid rgba(187, 187, 187, 100);
		border-radius: 14rpx;
		display: flex;
		align-items: center;
		margin: 46rpx 66rpx;
	}
	
	.search_lefts image {
		width: 40rpx;
		height: 40rpx;
		margin-left: 18rpx;
	}
	
	.search_lefts input {
		margin-left: 16rpx;
		color: rgba(153, 153, 153, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}
	.search_rights {
		text-align: center;
		width: 440rpx;
		height: 86rpx;
		line-height: 86rpx;
		border-radius: 30rpx;
		background-color: rgba(82, 167, 255, 100);
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		text-align: center;
		font-family: Arial;
		margin-left: 126rpx;
	}
	.seach {
		display: flex;
		// justify-content: center;
		padding-top:20rpx;
	}
	.seach-left {
		font-size: 36rpx;
		margin-left: 300rpx;
	}
	.seach-right {
		margin-left: 240rpx;
		font-size: 30rpx;
	}
</style>
