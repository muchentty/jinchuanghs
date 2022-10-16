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
		<view class="content">
			<view class="content-item" v-for="(item,index) in list" :key="index" @click="detail(item)">
				<view class="content-img">
					<image :src="item.cover"></image>
				</view>
				<view class="content-right">
					<view class="content-name">{{item.title}}</view>
					<!-- <view class="content-tps">
						<view v-if="item.source != ''">来源:{{item.source}}</view>
						<view>{{item.create_time.substring(0,10)}}</view>
					</view> -->
					<view class="origin">
						<view v-if="item.source != ''">来源：{{item.source}}</view>
					</view>
					<view class="read">
						<view class="time">{{item.create_time}}</view>
						<view>阅读:{{item.views}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="arrivalNavigation" v-if="ShowHidden">
			<view class="sideNavigation">
				<nav>
					<ul>
						<li @click="select(id,'全部类型')">全部</li>
					</ul>
					<ul v-for="(item,index) in classify">
						<li @click="select(item.id,item.title)">{{item.title}}</li>
					</ul>
				</nav>
			</view>
		</view>
		<u-back-top :scroll-top="scrollTop" :mode="mode"></u-back-top>
		<view class="pacolt" v-if="postCount > 12">
			<uni-pagination :total="postCount" :current="pageNum" :pageSize="pageSize" @change="handlePage"
				prev-text="前一页" next-text="后一页" />
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
				ShowHidden: false,
				area: '9784',
				list: [],
				classify: [],
				title: '全部类型',
				cid: 10,
				id: 10,
				scrollTop: 0,
				mode: 'square',
				postCount: 0,
				pageSize: 12,
				pageNum: 1,
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			handlePage(params) {
				this.pageNum = params.current;
				this.getList()

				uni.pageScrollTo({
					scrollTop: 0, // 滚动到页面的目标位置  这个是滚动到顶部, 0 
					duration: 100 // 滚动动画的时长
				})

			},
			carea() {
				uni.navigateTo({
					url: '../hierarchy/hierarchy'
				})
			},
			detail(item) {
				uni.navigateTo({
					url: '../consult-details/consult-details?id=' + item.id + '&cate=' + this.cid
				})
			},
			select(id, title) {
				this.title = title;
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
			// getClassify() {
			// 	this.$request('/api/article/get_all_cates', {
			// 		lang_type: "cn"
			// 	}, 'post', {}).then(res => {
			// 		if (res.code == 1) {
			// 			let list = res.data.lists
			// 			console.log(list)
			// 			let cid = list[2].id
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
			}
		},
		onShow() {
			let that = this
			uni.$on('area', function(data) {
				that.area = data
				console.log(that.area)
				that.getClassify()
				// that.getList()
			})
			that.getList()
		},
		onLoad(e) {
			if (e.area == 'undefined' || e.area == undefined || e.area == '' || e.area == null) {
				if (uni.getStorageSync('area')) {
					this.area = uni.getStorageSync('area')
				}
			} else {
				this.area = e.area
				uni.setStorageSync('area', this.area)
			}
			// this.getClassify()
			// this.getList()
			
			this.$request('/api/article/list', {
				cate: this.cid,
				area: this.area,
				limit: this.pageSize,
				page: this.pageNum
			}, 'post', {}).then(res => {
				if (res.code == 1) {
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

	.content {
		margin: 30rpx;
	}

	.content-item {
		display: flex;
		border-bottom: solid 1rpx rgba(153, 153, 153, 0.25);
		padding-bottom: 24rpx;
		margin-bottom: 30rpx;
	}

	.content-img image {
		width: 266rpx;
		height: 154rpx;
		border-radius: 10rpx;
	}

	.content-right {
		width: 100%;
		margin-top: 10rpx;
		margin-left: 20rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
		position: relative;
	}

	.content-name {
		/* height: 78rpx; */
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.content-tps {
		display: flex;
		color: rgba(153, 153, 153, 100);
		font-size: 24rpx;
		justify-content: space-between;
		margin-top: 40rpx;
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
	
	.read {
		color: rgba(153, 153, 153, 100);
		font-size: 24rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		position: absolute;
		bottom: 8rpx;
	}
	
	.origin {
		margin-top: 6rpx;
		height: 30rpx;
		color: rgba(153, 153, 153, 100);
		font-size: 24rpx;
	}

	.source {
		height: 36rpx;
	}
</style>
