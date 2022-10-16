<template>
	<view class="course-warp">
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
		<view class="course">
			<view class="course-item" v-for="(item,index) in activity" :key="index" @click="detail(item)">
				<view class="course-top">
					<view>音乐</view>
					<view>开课中</view>
				</view>
				<view class="course-center">
					<view class="course-cont">
						<view class="course-name">{{item.name}}</view>
						<view>主讲: {{item.teacher}}</view>
						<view>名额: 不限</view>
						<view>课程时间: 不限</view>
					</view>
					<view class="course-img">
						<image :src="item.cover"></image>
					</view>
				</view>
				<view class="course-bottom">
					<view class="book">
						<image class="course-book" src="../../static/ic-book.png"></image>
						<view>共22章节</view>
						<view class="lines"></view>
						<view>更新至22章</view>
					</view>
					<view class="course-heat">
						<image src="../../static/ic-heat.png"></image>
						<view class="num">10</view>
						<view>人已参与学习</view>
					</view>
				</view>
			</view>
		</view>
		<view class="arrivalNavigation" v-if="ShowHidden">
			<view class="sideNavigation">
				<nav>
					<ul>
						<li @click="select('','全部')">全部</li>
					</ul>
					<ul v-for="(item,index) in classify">
						<li @click="select(item.id,item.name)">{{item.name}}</li>
					</ul>
				</nav>
			</view>
		</view>
		<view class="arrivalNavigationright" v-if="ShowHiddenright">
			<view class="sideNavigation">
				<nav>
					<ul>
						<li @click="selectright('','默认排序')">默认排序</li>
					</ul>
					<ul v-for="(item,index) in format">
						<li @click="selectright(item.id,item.name)">{{item.name}}</li>
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
				area: '268',
				activity: [],
				title:'全部类型',
				formatName:'默认排序',
				ShowHidden: false,
				ShowHiddenright:false,
				classify:[],
				format:[{
					id:'1',
					name:'正序'
				},{
					id:'2',
					name:'倒序'
				}],
				order:'',
				type:''
			}
		},
		methods: {
			detail(item){
				uni.navigateTo({
					url:'../class-room-detail/class-room-detail?id=' + item.id
				})
			},
			getList(){
				this.$request('/api/culture/get_category', {
					area: this.area,
					type:this.type,
					order:this.order
				}, 'post', {}).then(res => {
					if (res.code === 1) {
						this.activity = res.data.lists;
						console.log(this.activity)
					}
				})
			},
			select(id, title) {
				this.title = title;
				this.ShowHidden = !this.ShowHidden;
				this.type = id
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
				this.order = id
				this.ShowHiddenright = !this.ShowHiddenright;
				this.getList()
			},
			getClassify() {
				this.$request('/api/culture/get_cate', {}, 'post', {}).then(res => {
					if (res.code == 200) {
						console.log(res)
						this.classify = res.data
					}
				});
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

<style>
	.course-warp {
		height: 100%;
		background-color: #f7f7f7;
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
.area-img image{
	width: 26rpx;
	height: 16rpx;
	margin-left: 14rpx;
}
.all {
	display: flex;
	align-items: center;
}
.all-img image{
	width: 26rpx;
	height: 16rpx;
	margin-left: 14rpx;
}
.format {
	display: flex;
	align-items: center;
	margin-left: 112rpx;
}
.format-img image{
	width: 26rpx;
	height: 16rpx;
	margin-left: 14rpx;
}
.course {
	margin: 30rpx;
}
.course-item {
	background-color: #fff;
	padding-bottom: 2rpx;
	margin-bottom: 30rpx;
}
.course-top {
	display: flex;
}
.course-top view {
	background-color: #BBA269;
	color: #fff;
	font-size: 24rpx;
	padding: 4rpx 20rpx;
	border-radius: 10rpx;
	margin-right: 10rpx;
}
.course-img image {
	width: 262rpx;
	height: 182rpx;
}
.course-center {
	display: flex;
	justify-content: space-between;
	margin-top: 12rpx;
	padding: 0 18rpx;
}
.course-cont {
	font-size: 24rpx;
	color: #999999;
	margin-right: 20rpx;
}
.course-cont view {
	margin-top: 6rpx;
}
.course-name {
	font-size: 32rpx;
	font-weight: 600;
	color: #343434;
	margin-bottom: 16rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.course-bottom {
	display: flex;
	align-items: center;
	margin: 20rpx 18rpx;
	justify-content: space-between;
}
.book {
	display: flex;
	align-items: center;
	font-size: 24rpx;
	color: #999999;
}
.course-book {
	width: 30rpx;
	height: 30rpx;
	margin-right: 10rpx;
}
.lines {
	width: 2rpx;
	height: 20rpx;
	background-color: #999999;
	margin: 0 10rpx;
}
.course-heat {
	display: flex;
	font-size: 24rpx;
	color: #999999;
}
.course-heat image{
	width: 30rpx;
	height: 30rpx;
}
.num {
	font-weight: 600;
	color: #7A3237;
	margin: 0 4rpx 0 6rpx;
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
