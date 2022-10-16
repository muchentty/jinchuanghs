<template>
	<view class="works-list">
		<view class="works-list-content" v-if="words_list.length!=0">
			<view class="list-content-item"  v-for="(item,index) in words_list">
				<view class="content-item-title">
					{{item.race_title}}
				</view>
				<view class="content-item-summary">
					{{item.create_time}}
				</view>
				<view class="content-item-area_name">
					{{item.area_name}}
				</view>
				<view class="content-item-img" v-for="it in item.pics">
					<image :src="it" mode="widthFix"></image>
				</view>
				<view class="content-item-time">
					{{item.content}}
				</view>
				<view class="line">
					X
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:'',
				pagesize:'',
				words_list:[],
				area_name:'',
				pics:[]
			}
		},
		methods: {
			hierarchy(){
				uni.navigateTo({
					url:'../hierarchy/hierarchy'
				})
			}
		},
		onLoad(e) {
			this.$request('/api/member/get_words_list',{
				page:'1',
				pagesize:'20',
				
			},'post',{},true).then(res=>{
				if(res.code==1){
					this.words_list=res.data.lists
				}
			})
		}
	}
</script>

<style>
	/* .content-item-img image{
		width: 750rpx;
		height: 350rpx;
	} */
	.works-list-content {
		
		width: 100%;
		height: 300rpx;
		padding: 0rpx 30rpx;
	}

	.list-content-item {
		width: 100%;
		
		margin-top: 20rpx;
	}

	.content-item-title {
		color: rgba(16, 16, 16, 100);
		font-size: 36rpx;
		font-family: PingFangSC-regular;
	}

	.content-item-summary {
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
		margin-top: 20rpx;
	}

	.line {
		margin-top: 20rpx;
		
		text-align: right;
		padding: 30rpx 0rpx;
		color: rgba(200, 200, 200, 0.75);
		border-bottom: 1rpx solid rgba(200, 200, 200, 0.75);
	}

	.top {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 26rpx 20rpx 30rpx;
		border-top: 1rpx solid rgba(200, 200, 200, 0.75);
		border-bottom: 1rpx solid rgba(200, 200, 200, 0.75);
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
</style>
