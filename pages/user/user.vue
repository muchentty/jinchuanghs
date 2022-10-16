<template>
	<view class="content">
		<view class="top">
			<view class="topshow" v-if="profile !=''">
				<view class="top_img" @click="personal">
					<image v-if="profile.avatar" :src="profile.avatar" mode=""></image>
					<image v-else src="../../static/user-img.jpg" mode=""></image>
				</view>
				<view class="top_name">
					{{profile.nickname || '默认'}}
				</view>
			</view>
			<view class="topshow" v-else>
				<view class="top_img">
					<image src="../../static/user-img.jpg" mode=""></image>
				</view>
				<view class="top_name">未登录</view>
			</view>
		</view>
	    <!-- 中部菜单 -->
		<view class="list">
			<view class="item" @click="venue">
				<view class="item_img">
					<image src="../../static/changguan.png" mode=""></image>
				</view>
				<view class="item_txt">
					场馆订单
				</view>
			</view>
			<view class="item" @click="active">
				<view class="item_img">
					<image src="../../static/saishi.png" mode=""></image>
				</view>
				<view class="item_txt">
					活动订单
				</view>
			</view>
			<view class="item" @click="carny">
				<view class="item_img">
					<image src="../../static/huodong.png" mode=""></image>
				</view>
				<view class="item_txt">
					艺团订单
				</view>
			</view>
			<view class="item" @click="competition">
				<view class="item_img">
					<image src="../../static/zuoping1.png" mode=""></image>
				</view>
				<view class="item_txt">
					赛事作品
				</view>
			</view>
		</view>
	    <view class="solid">
	    	
	    </view>
		<view class="menu">
			<view class="menuitem" @click="security">
				<view class="mitem_left">
					安全中心
				</view>
				<view class="mitem_right">
					<image src="../../static/ic_ri.png" mode=""></image>
				</view>
			</view>
			<view class="menuitem" @click="scook">
				<view class="mitem_left">
					我的收藏
				</view>
				<view class="mitem_right">
					<image src="../../static/ic_ri.png" mode=""></image>
				</view>
			</view>
			<view class="menuitem" @click="user">
				<view class="mitem_left">
					关于我们
				</view>
				<view class="mitem_right">
					<image src="../../static/ic_ri.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				profile:[]
			}
		},
		methods: {
			//个人资料
			personal(){
				uni.navigateTo({
					url:'../personal/personal'
				})
			},
			//安全中心
			security(){
				uni.navigateTo({
					url:'../security/security'
				})
			},
			//场馆订单
			venue(){
				uni.navigateTo({
					url:'../venue-booking/venue-booking'
				})
			},
			//赛事作品
			competition(){
				uni.navigateTo({
					url:'../competition/competition'
				})
			},
			//收藏
			scook(){
				uni.navigateTo({
					url:'../scolo/scolo'
				})
			},
			//活动
			active(){
				uni.navigateTo({
					url:'../activity-booking/activity-booking'
				})
			},
			carny(){
				uni.navigateTo({
					url:'../carny-booking/carny-booking'
				})
			},
			user(){
				uni.navigateTo({
					url:'../user-adout/user-adout'
				})
			}
		},
		onShow() {
			this.$request('/api/member/profile', {}, 'post', {}, true).then(res => {
				if (res.code == 1) {
					this.profile = res.data.profile;
				} else {
					this.profile = ''
				}
			})
		}
	}
</script>

<style>
.content{
	height: 100%;
}
.top{
	/* padding-top: 52rpx; */
	text-align: center;
	width: 750rpx;
	height: 380rpx;
	background-color: #e8e8e8;
}
.topshow{
	padding-top: 52rpx;
	text-align: center;
}
.top_img image{
	width: 224rpx;
	height: 224rpx;
	border-radius: 50%;
}
.top_name{
	margin-top: 22rpx;
	/* border: 1rpx solid red; */
	text-align: center;
	color: rgba(16, 16, 16, 100);
	font-size: 28rpx;
	font-family: PingFangSC-regular;
}
.list{
	width: 750rpx;
	height: 210rpx;
	display: flex;
	justify-content: space-around;
	/* border: 1rpx solid red; */
}
.item_img image{
	margin-top: 34rpx;
	width: 70rpx;
	height: 70rpx;
}
.item{
	text-align:  center;
}
.item_txt{
	margin-top: 22rpx;
	color: rgba(16, 16, 16, 100);
	font-size: 28rpx;
	text-align: left;
	font-family: PingFangSC-regular;
}
.solid{
	width: 750rpx;
	height: 20rpx;
	background-color: #f7f7f7;
}
.menu{
	padding:0rpx 30rpx ;
}
.menuitem{
	display: flex;
	justify-content: space-between;
	height: 108rpx;
	line-height: 108rpx;
	border-bottom: 1rpx solid #eee;
}
.mitem_right image{
	width: 40rpx;
	height: 40rpx;
	margin-top: 30rpx;
}
.mitem_left{
	color: rgba(16, 16, 16, 100);
	font-size: 28rpx;
	text-align: left;
	font-family: PingFangSC-regular;
}
</style>
