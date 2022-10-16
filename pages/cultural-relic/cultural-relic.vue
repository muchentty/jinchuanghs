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
			<view class="format" @click="ShowHiddenright =!ShowHiddenright">
				<view>{{formatName}}</view>
				<view class="format-img">
					<image src="../../static/ic_drop-down.png"></image>
				</view>
			</view>
		</view>
		<view class="relic">
			<view class="relic-item" v-for="(item,index) in list" :key="index" @click="detail(item)">
				<view class="relic-img">
					<image :src='item.cover'></image>
				</view>
				<view class="relic-cont">
					<view class="relic-name">{{item.title}}</view>
					<view class="rel-origin">
						<view v-if="item.source != ''">来源：{{item.source}}</view>
					</view>
					<!-- <view class="rel-tips">
						<view class="relic-tip" v-for="items in item.tags">{{items}}</view>
					</view> -->
					<!-- <view class="ql">格尔芯无极龙宫殿</view> -->
				<!-- 	<view>距您16.83km</view> -->
				</view>
			</view>
		</view>
		<view class="arrivalNavigation" v-if="ShowHidden">
			<view class="sideNavigation">
				<nav>
					<ul>
						<li @click="select(id,'全部')">全部</li>
					</ul>
					<ul v-for="(item,index) in classify">
						<li @click="select(item.id,item.title)">{{item.title}}</li>
					</ul>
				</nav>
			</view>
		</view>
		
		<view class="arrivalNavigationright" v-if="ShowHiddenright">
			<view class="sideNavigation">
				<nav>
					<ul>
						<li @click="selectright('','全部')">全部</li>
					</ul>
					<ul v-for="(item,index) in format">
						<li @click="selectright(item.id,item.name)">{{item.name}}</li>
					</ul>
				</nav>
			</view>
		</view>
		
		<u-back-top :scroll-top="scrollTop" :mode="mode"></u-back-top>
		<view class="pacolt" v-if="postCount > 12">
			<uni-pagination :total="postCount" :current="pageNum" :pageSize="pageSize" @change="handlePage" prev-text="前一页"
				next-text="后一页" />
		</view>
	</view>
</template>

<script>
	import uniPagination from '../../components/uni-pagination/uni-pagination.vue'
	export default {
		components: {
			uniPagination
		},
		data() {
			return {
				area: "167",
				cid:'3',
				id:3,
				ShowHidden: false,
				ShowHiddenright:false,
				classify:[],
				list:[],
				title:'全部类型',
				formatName:'全部格式',
				scrollTop: 0,
				mode: 'square',
				postCount: 0,
				pageSize: 12,
				pageNum: 1,
				format:[{
					id:'1',
					name:'图文'
				},{
					id:'2',
					name:'视频'
				},{
					id:'3',
					name:'图片'
				},{
					id:'4',
					name:'文字'
				}]
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			//详情
			detail(item){
				uni.navigateTo({
					url:'../consult-details/consult-details?id=' + item.id + '&cate=' + this.cid
				})
			},
			select(id,index){
				this.title = index;
				this.cid = id
				this.ShowHidden = !this.ShowHidden;
				this.getList()
				// this.$request('/api/article/get_list', {
				// 	cate: id,
				// 	area: this.area,
				// 	pagesize: 12
				// }, 'post', {}).then(res => {
				// 	if (res.code == 1) {
				// 		this.list = res.data.lists
				// 	}
				// })
			},
			selectright(id, title) {
				this.formatName = title;
				this.forId = id
				this.ShowHiddenright = !this.ShowHiddenright;
				this.getList()
			},
			//分类
			// getClassify() {
			// 	this.$request('/api/article/get_all_cates', {
			// 		lang_type: "cn"
			// 	}, 'post', {}).then(res => {
			// 		if (res.code == 1) {
			// 			let list = res.data.lists
			// 			console.log(list)
			// 			let cid = list[3].id
			// 			console.log(cid)
			// 			this.$request('/api/article/get_cates', {
			// 				pid: cid
			// 			}, 'post', {}).then(res => {
			// 				if (res.code == 1) {
			// 					this.classify = res.data.lists
			// 					console.log(this.classify)
			// 				}
			// 			});
			// 		}
			// 	});
			// },
			//列表
			getList() {
				this.$request('/api/article/list', {
					cate: this.cid,
					area: this.area,
					format:this.forId,
					limit: this.pageSize,
					page: this.pageNum
				}, 'post', {}).then(res => {
					if (res.code == 1) {
						let list = res.data.lists
						this.list = list.data
						this.postCount = res.data.total
						console.log(this.list)
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
				that.getClassify()
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
			// this.getClassify()
			this.getList()
			
			this.$request('/api/article/list', {
				cate: this.cid,
				area: this.area,
				format:this.forId,
				limit: this.pageSize,
				page: this.pageNum
			}, 'post', {}).then(res => {
				if (res.code == 1) {
					// this.postCount = res.data.total
					this.classify = res.data.category
					console.log(this.list)
				}
			})
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

	.format {
		display: flex;
		align-items: center;
		margin-left: 112rpx;
	}

	.format-img image {
		width: 26rpx;
		height: 16rpx;
		margin-left: 14rpx;
	}

	.relic {
		margin: 24rpx 30rpx;
	}

	.relic-item {
		display: flex;
		margin-bottom: 30rpx;
		width: 690rpx;
		height: 218rpx;
		border-radius: 20rpx;
		background-color: rgba(255, 255, 255, 100);
		box-shadow: 0px 2rpx 8rpx 0px rgba(0, 0, 0, 0.4);
	}

	.relic-img image {
		width: 330rpx;
		height: 218rpx;
		border-radius: 20rpx 0px 0px 20rpx;
		margin-right: 24rpx;
	}

	.relic-cont {
		color: rgba(153, 153, 153, 100);
		font-size: 24rpx;
		font-family: PingFangSC-regular;
		margin-right: 30rpx;
	}

	.relic-name {
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		margin-top: 24rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.rel-tips {
		display: flex;
	}
	.relic-tip {
		width: 122rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 12rpx;
		background-color: rgba(255, 255, 255, 100);
		color: rgba(238, 164, 94, 100);
		font-size: 24rpx;
		text-align: center;
		font-family: Arial;
		border: 1px solid rgba(238, 164, 94, 100);
		margin: 20rpx 6rpx 12rpx 0;
	}

	.ql {
		margin-bottom: 8rpx;
	}

	.arrivalNavigation {
		width: 400rpx;
		position: absolute;
		right: 150rpx;
		top: 80rpx;
		z-index: 99;
	}
	
	.arrivalNavigationright {
		width: 320rpx;
		position: absolute;
		right: 0rpx;
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
	
	.rel-origin {
		margin-top: 20rpx;
	}
</style>
