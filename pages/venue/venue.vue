<template>
	<view>
		<view class="venue">
			<view class="backdrop"></view>
			<view class="stadium-warp">
				<view class="stadium">
					<view v-for="items in category">
						<view :class="items.flag ? 'active':''" @click="select(items)">{{items.title}}</view>
					</view>
				</view>
				<view class="stadium-list">
					<view class="stadium-item" v-for="(item,index) in  venue" :key="index" @click="detail(item)">
						<view class="stadium-img">
							<image :src="item.cover"></image>
						</view>
						<view class="stadium-name">
							<view class="names">{{item.name}}</view>
							<view class="time">开放时段:{{item.start_time}}-{{item.end_time}}</view>
							<view>{{item.address}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				venue:[],
				area:'1',
				c_id:'1',
				category:[]
			}
		},
		methods: {
			select(item){
				this.c_id = item.id;
				// item.flag = true
				this.category.forEach(items=>{
					if(items.id == item.id){
						items.flag = true
					}else{
						items.flag = false
					}
				})
				this.$request('/api/venue/list',{
					area: this.area,
					cate: this.c_id,
					pagesize: '10', 
					page: '1'
				},'post',{}).then(res=>{
					let list = res.data.lists
					this.venue = list.data
				})
			},
			detail(item){
				uni.navigateTo({
					url:'../venu-detail/venu-detail?id=' + item.id
				})
			},
			getList(){
				this.$request('/api/venue/list',{
					area: this.area,
					cate: this.c_id,
					pagesize: '10', 
					page: '1'
				},'post',{}).then(res=>{
					let list = res.data.lists
					this.category = res.data.category
					this.category.forEach((item,index)=>{
						item.flag = false
						if(index == 0){
							item.flag = true
						}
					})
					this.venue = list.data
				})
			}
		},
		onLoad(e){
			if (e.area == 'undefined' || e.area == undefined || e.area == '' || e.area == null) {
				if (uni.getStorageSync('area')) {
					this.area = uni.getStorageSync('area')
				}
			} else {
				this.area = e.area
				uni.setStorageSync('area',this.area)
			}
			
			this.getList()
		}
	}
</script>

<style>
.backdrop {
	width: 750rpx;
	height: 214rpx;
	background-color: #d9d9d9;
}
.venue {
	position: relative;
}
.stadium-warp {
	width: 100%;
	position: absolute;
	top: 170rpx;
	border-radius: 40rpx 40rpx 0 0;
	background-color: #fff;
}
.stadium {
	display: flex;
	padding: 32rpx 0rpx 20rpx 0rpx;
	color: rgba(16, 16, 16, 100);
	font-size: 28rpx;
	text-align: left;
	font-family: PingFangSC-regular;
	overflow-x: scroll;
	margin: 0 40rpx;
}
.stadium view {
	width: 120rpx;
	text-align: center;
	margin: 0 10rpx;
}
.active {
	position: relative;
}
.active::after{
	position: absolute;
	content: "";
	top: 46rpx;
	left: 40rpx;
	width: 44rpx;
	height: 8rpx;
	background-color: #1890FF;
	border-radius: 10rpx;
}
.stadium-list {
	/* margin: 30rpx; */
	margin: 30rpx;
}
.stadium-item {
	display: flex;
	margin-bottom: 30rpx;
}
.stadium-img image{
	width: 256rpx;
	height: 172rpx;
}
.stadium-name {
	margin-left: 22rpx;
	color: rgba(16, 16, 16, 100);
	font-size: 24rpx;
	text-align: left;
	font-family: PingFangSC-regular;
}
.names {
	color: rgba(16, 16, 16, 100);
	font-size: 32rpx;
	font-family: PingFangSC-regular;
	margin-bottom: 40rpx;
}
.time {
	margin-bottom: 20rpx;
}
</style>
