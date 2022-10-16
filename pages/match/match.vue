<template>
	<view class="content">
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
	    <view class="list">
	    	<view class="item" v-for="(item,index) in race" :key="index" @click="details(item)">
	    		<view class="item_img">
	    			<image :src="item.cover" mode=""></image>
	    		</view>
				<view class="item_txt">
					<view class="item_title">
						{{item.title}}
					</view>
					<view class="item_type">
						<view class="type_txt">
							<text>{{item.category}}</text>
						</view>
					</view>
				</view>
	    	</view>
	    </view>
		<view class="arrivalNavigation" v-if="ShowHidden">
			<view class="sideNavigation">
				<nav>
					<ul>
						<li @click="select('','全部类型')">全部类型</li>
					</ul>
					<ul v-for="(item,index) in competition">
						<li @click="select(item.category,item.category)">{{item.category}}</li>
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
				race:[],
				ShowHidden:false,
				competition:[],
				title:'全部类型',
				names:''
			}
		},
		methods: {
			//赛事名称
			details(item){
				uni.navigateTo({
					url:'../match_details/match_details?id=' + item.id
				})
			},
			select(title,name){
				this.title = name;
				this.names = title
				this.ShowHidden = !this.ShowHidden;
				this.getList()
			},
			getList(){
				this.$request('/api/race/list',{
					area: this.area,
					race_name:'',
					category:this.names
				},'post',{}).then(res=>{
					if (res.code === 200) {
						this.race = res.data.data;
					}
				})
				// this.$request('/api/race/get_list',{
				// 	area: this.area,
				// },'post',{}).then(res=>{
				// 	if (res.code === 1) {
				// 		this.race = res.data.lists;
				// 	}
				// })
			},
			classify(){
				this.$request('/api/race/cate',{},'get',{}).then(res=>{
					if (res.code === 200) {
						this.competition = res.data;
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
				that.getList() 
			})
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
			this.classify()
		}
	}
</script>

<style>
.content {
		height: 100%;
	}

	.consult-top {
		/* z-index: 9999;
		position: fixed; */
		background-color: #ffffff;
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
		/* border: 1rpx solid red; */
	}

	.area-img image {
		width: 26rpx;
		height: 16rpx;
		margin-left: 14rpx;
	}

	.all {
		display: flex;
		/* border: 1rpx solid red; */
	}

	.all-img image {
		width: 26rpx;
		height: 16rpx;
		margin-left: 14rpx;
	}
	.list{
		/* border: 1rpx solid red; */
		padding: 30rpx 30rpx 200rpx 30rpx;
	}
	.item{
		border-radius: 10rpx;
		/* border: 1rpx solid red; */
		height: 380rpx;
		width: 690rpx;
		margin-bottom: 20rpx;
	}
	.item_img image{
		width: 690rpx;
		height: 380rpx;
	}
	.item_txt{
		position: relative;
		bottom: 116rpx;
	}
	.item_title{
		margin-left: 20rpx;
		margin-right: 20rpx;
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: normal;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	.item_type{
		display: flex;
		margin-left: 24rpx;
		margin-top: 10rpx;
		display: flex;
	}
	.type_txt{
		margin-right: 22rpx;
		text-align: center;
		color: #ffffff;
		font-size: 24rpx;
		font-family: PingFangSC-regular;
		border-radius: 12rpx;
		padding: 4rpx 20rpx;
		background-color: rgba(255, 255, 255, 0.33); 
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
	
</style>
