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
		<view class="art">
			<view class="art-item" v-for="(item,index) in list" :key="index" @click="detail(item)">
				<view class="art-img">
					<image :src="item.cover"></image>
				</view>
				<view class="art-cont">
					<view class="art-name">{{item.title}}</view>
					<view class="lala">
						<view class="art-tips" v-for="items in item.tags">
							<view>{{items}}</view>
						</view>
					</view>
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
				ShowHidden: false,
				ShowHiddenright:false,
				area:'9784',
				list:[],
				classify:[],
				title:'全部类型',
				formatName:'全部格式',
				cid:2,
				id:2,
				scrollTop: 0,
				mode: 'square',
				postCount: 0,
				pageSize: 12,
				pageNum: 1,
				forId:'',
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
			handlePage(params) {
				this.pageNum = params.current;
				this.getList()
			
				uni.pageScrollTo({
					scrollTop: 0, // 滚动到页面的目标位置  这个是滚动到顶部, 0 
					duration: 100 // 滚动动画的时长
				})
			
			},
			carea(){
				uni.navigateTo({
					url:'../hierarchy/hierarchy'
				})
			},
			detail(item){
				uni.navigateTo({
					url: '../consult-details/consult-details?id=' + item.id + '&cate=' + this.cid
				})
			},
			select(id, title) {
				this.title = title;
				this.ShowHidden = !this.ShowHidden;
				this.cid = id
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
			// getClassify() {
			// 	this.$request('/api/article/get_all_cates', {
			// 		lang_type: "cn"
			// 	}, 'post', {}).then(res => {
			// 		if (res.code == 1) {
			// 			let list = res.data.lists
			// 			console.log(list)
			// 			let cid = list[1].id
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
			getList(){
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
			}
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

	.art {
		margin: 30rpx;
	}

	.art-item {
		position: relative;
		margin-bottom: 20rpx;
	}

	.art-img image {
		width: 690rpx;
		height: 380rpx;
		border-radius: 10rpx;
	}
	.art-name {
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: normal;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.art-cont {
		position: absolute;
		bottom: 20rpx;
		left: 24rpx;
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
	}

	.art-tips {
	/* 	display: flex; */
		margin-top: 10rpx;
	}
	.lala {
		display: flex;
	}

	.art-tips view {
		border-radius: 12rpx;
		background-color: rgba(255, 255, 255, 0.33);
		text-align: center;
		color: rgba(255, 255, 255, 100);
		font-size: 24rpx;
		padding: 2rpx 12rpx;
		margin-right: 12rpx;
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
</style>
