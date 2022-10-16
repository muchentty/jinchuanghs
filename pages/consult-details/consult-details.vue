<template>
	<view>
		<view class="detail-top">
			<view class="detail-name">{{article.title}}</view>
			<view class="detail-cont">
				<view v-if="article.source!=''">来源:{{article.source}}</view>
				<view>{{article.create_time}}</view>
				<view class="read">阅读{{article.views}}</view>
			</view>
		</view>
		<view class="content">
			<u-parse class="cont" :content="context"></u-parse>
			<!-- <view class="img">
				<image src="../../static/banner.png"></image>
			</view>
			<view class="last">
				当前，我国文化产业已经进入经济建设的主战场，成为经济增长的新动能、新引擎。
			</view> -->
	<!-- 		<view class="read">阅读{{article.views}}</view> -->
		</view>
		<view class="line"></view>
		<view class="recommend">
			<view class="recommend-name">相关推荐</view>
			<view class="consult-item" v-for="(item,index) in list" @click="particulars(item)">
				<view class="consult-img">
					<image :src="item.cover"></image>
				</view>
				<view class="consult-details">
					<view class="consult-name">{{item.title}}</view>
					<view class="source">来源:xxx文化云</view>
					<view class="time">{{item.create_time}}</view>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="recommend">
			<view class="recommend-name">热门评论</view>
			<view>
				<view class="estimate-item" v-for="(item,index) in comments" :key="index">
					<view class="estimate-top">
						<view class="estimate-left">
							<view class="portrait">
								<image :src="item.avatar"></image>
							</view>
							<view class="estimate-person">
								<view class="estimate-name">{{item.nickname}}</view>
								<view>{{item.content}}</view>
							</view>
						</view>
						<view class="estimate-more">
							<image src="../../static/ic-more.png"></image>
						</view>
					</view>
					<view class="estimate-bottom">
						<view class="date">{{item.create_time}}</view>
						<view class="rights">
							<view class="getlike">
								<text>{{item.digg}}</text>
								<image @click="zan(item)" class="getlike-img" v-show="item.is_digg ==0" src="../../static/ic-like.png">
								</image>
								<image @click="zan(item)" class="getlike-img" v-show="item.is_digg ==1" src="../../static/ic-likes.png">
								</image>
							</view>
							<view class="msgs" @click="showPopup(item)">
								<image src="../../static/ic-msg.png"></image>
								<!-- <view>111</view> -->
							</view>
						</view>
					</view>
				</view>
				<!-- <view class="reply">
					<view class="reply-top">
						<view class="reply-left">
							<view class="reply-img">
								<image src="../../static/xiao.jpg"></image>
							</view>
							<view class="reply-person">
								<view class="reply-name">
									<text>源码</text>
									<image class="write-back" src="../../static/ic-sanjiao.png"></image>
									<view>可以叫我雨大人</view>
								</view>
								<view>不是有这个词吗</view>
							</view>
						</view>
						<view class="estimate-more">
							<image src="../../static/ic-more.png"></image>
						</view>
					</view>
					<view class="reply-bottom">
						<view class="date">10-09</view>
						<view class="rights">
							<view class="getlike">
								<text>574</text>
								<image class="getlike-img" src="../../static/get-like.png"></image>
							</view>
							<view class="msg">
								<image src="../../static/ic-message.png"></image>
							</view>
						</view>
					</view>
				</view>
				<view>
					<view class="unfold">展开其他2条回复</view>
				</view> -->
			</view>
		</view>
		<view style="height: 100rpx;"></view>
		<view class="bottom">
			<view class="bottom-input">
				<input v-model="comment" @confirm="messagesearch" placeholder="写评论..." />
			</view>
			<view class="bottom-right">
				<view class="msg-left">
					<image class="msg" @click="messagesearch" src="../../static/ic-msg.png"></image>
					<text>{{comments.length}}</text>
				</view>
				<view class="msg-right">
					<image class="like" v-show="contents.digged == 0" @click="gikeLick" src="../../static/ic-like.png">
					</image>
					<image class="like" v-show="contents.digged == 1" @click="gikeLick" src="../../static/ic-likes.png">
					</image>
					<text>{{article.digg}}</text>
				</view>
				
				<image class="share" src="../../static/ic-share.png"></image>
			</view>
		</view>

		<!-- 评论弹窗 -->
		<u-popup :show="show" :round="10" mode="bottom" @close="close" @open="open">
			<view class="bottoms">
				<view class="details">
					<view class="detail-tops">回复详情</view>
					<view class="top">
						<view class="detail-reply">
							<view class="reply-left">
								<view class="reply-img">
									<image :src="replyList.avatar"></image>
								</view>
								<view class="reply-names">
									<view class="namea">{{replyList.nickname}}</view>
									<view class="conts">{{replyList.content}}</view>
								</view>
							</view>
							<view class="reply-right">
								<text>{{replyList.digg}}</text>
								<image v-show="replyList.digg == 0" src="../../static/ic-like.png">
								</image>
								<image v-show="replyList.digg == 1" src="../../static/ic-likes.png">
								</image>
							</view>
						</view>
						<view class="reply-time">{{replyList.create_time}}</view>
					</view>
					<view class="reply-all">全部回复({{onereplyList.total}})</view>
					<view>
						<view class="top" v-for="(ite,ind) in onereplyList.lists">
							<view class="detail-reply">
								<view class="reply-left">
									<view class="reply-img">
										<image :src="ite.avatar"></image>
									</view>
									<view class="reply-names">
										<view class="namea">{{ite.nickname}}</view>
										<view class="conts">{{ite.content}}</view>
									</view>
								</view>
								<view class="reply-right">
									<text>{{ite.digg}}</text>
									<image @click="replylike(ite)" v-show="ite.is_digg ==0" src="../../static/ic-like.png">
									</image>
									<image @click="replylike(ite)" v-show="ite.is_digg ==1" src="../../static/ic-likes.png">
									</image>
								</view>
							</view>
							<view class="reply-time">{{ite.create_time}}</view>
						</view>
					</view>
				</view>
				<view class="compilea">
					<view class="compile">
						<input v-model="replayCommt" @confirm="goRemark" placeholder="写评论"/>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				comment: '',
				id: '',
				comments: [],
				contents: '',
				context: '',
				area: '9784',
				list: [],
				article: '',
				cate: '',
				show: false,
				replayCommt:'',
				replyId:'',
				replyList:'',
				reptotal:0,
				onereplyList:[]
			}
		},
		methods: {
			open() {
				// console.log('open');
			},
			//关闭评论弹窗
			close() {
				this.show = false
				// console.log('close');
			},
			//打开评论弹窗
			showPopup(it) {
				this.show = true
				this.replyId = it.id
				this.replyList = it
				this.reptotal = it.toal
				this.$request('/api/article/comments', {
					id: this.id,
					reply_id: this.replyId,
					pagesize: '30',
				}, 'post', {}).then(res => {
					if (res.code === 1) {
						this.onereplyList = res.data;
					}
				})
			},
			//评论点赞
			replylike(item){
				let type = ''
				if (item.is_digg == 0) {
					type = 'up'
				} else {
					type = "down"
				}
				this.$request('/api/article/comment_digg', {
					id: item.id,
					type: type
				}, 'post', {}, true).then(res => {
					this.$request('/api/article/comments', {
						id: this.id,
						reply_id: this.replyId,
						pagesize: '30',
					}, 'post', {}, true).then(res => {
						if (res.code === 1) {
							this.onereplyList = res.data;
						}
					})
				})
			},
			goRemark(){
				if (this.replayCommt != '') {
					this.$request('/api/article/do_comment', {
						id: this.id,
						reply_id: this.replyId,
						content: this.replayCommt,
					}, 'post', {}, true).then(res => {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						if (res.code == 1) {
							this.$request('/api/article/comments', {
								id: this.id,
								reply_id: this.replyId,
								pagesize: '30',
							}, 'post', {}).then(res => {
								if (res.code === 1) {
									this.onereplyList = res.data;
								}
							})
						}
						this.replayCommt = ''
					})
				} else {
					uni.showToast({
						title: '评论不能为空',
						icon: 'none'
					})
				}
			},
			particulars(item) {
				uni.navigateTo({
					url: '../consult-details/consult-details?id=' + item.id + '&cate=' + this.cate
				})
			},
			//评论
			messagesearch: function(event) {
				if(this.comment == ''){
					uni.showToast({
						title:'评论内容不能为空',
						icon:'none'
					})
				}else{
					this.$request('/api/article/do_comment', {
						id: this.id,
						content: this.comment,
					}, 'post', {}, true).then(res => {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						this.comment = ''
						this.commentList()
					})
				}
			},
			//点赞
			gikeLick() {
				let type = ''
				if (this.contents.digged == 0) {
					type = 'up'
				} else {
					type = "down"
				}
				this.$request('/api/article/digg', {
					id: this.id,
					type: type,
				}, 'post', {}, true).then(res => {
					this.detail()
					if (this.contents.digged == 0) {
						this.contents.digged = 0
					} else {
						this.contents.digged = 1
					}
				})
			},
			zan(item){
				let type = ''
				if (item.is_digg == 0) {
					type = 'up'
				} else {
					type = "down"
				}
				this.$request('/api/article/comment_digg', {
					id: item.id,
					type: type
				}, 'post', {}, true).then(res => {
					this.commentList()
				})
			},
			detail() {
				this.$request('/api/article/view', {
					id: this.id,
				}, 'post', {}).then(res => {
					if (res.code === 1) {
						this.contents = res.data;
						uni.setNavigationBarTitle({
							title: this.contents.article.title
						})
						this.context = this.contents.article.content;
						this.article = this.contents.article
					}
				})
			},
			commentList() {
				this.$request('/api/article/comments', {
					id: this.id,
					pagesize: '',
				}, 'post', {}).then(res => {
					if (res.code === 1) {
						this.comments = res.data.lists;
					}
				})
			}
		},
		onShow() {
			// this.detail()
			// this.commentList()

			// this.$request('/api/article/get_list', {
			// 	cate: this.cate,
			// 	area: this.area,
			// 	page: '1',
			// 	is_recommend: '1'
			// }, 'post', {}).then(res => {
			// 	if (res.code == 1) {
			// 		this.list = res.data.lists
			// 	}
			// });
		},
		onLoad(e) {
			this.id = e.id
			this.cate = e.cate
			
			if (e.area == 'undefined' || e.area == undefined || e.area == '' || e.area == null) {
				if (uni.getStorageSync('area')) {
					this.area = uni.getStorageSync('area')
				}
			} else {
				this.area = e.area
				uni.setStorageSync('area',this.area)
			}
			
			this.detail()
			this.commentList()

			this.$request('/api/article/get_list', {
				cate: this.cate,
				area: this.area,
				page: '1',
				is_recommend: '1'
			}, 'post', {}).then(res => {
				if (res.code == 1) {
					this.list = res.data.lists
				}
			});
		}
	}
</script>

<style>
	.detail-top {
		margin: 26rpx 30rpx;
		color: rgba(153, 153, 153, 100);
		font-size: 24rpx;
		font-family: PingFangSC-regular;
		padding-bottom: 30rpx;
		border-bottom: solid 1rpx rgba(153, 153, 153, 0.25);
		margin-bottom: 28rpx;
	}

	.detail-name {
		color: rgba(16, 16, 16, 100);
		font-size: 40rpx;
		font-family: PingFangSC-medium;
		margin-bottom: 16rpx;
	}
	
	.detail-cont {
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
	}

	.content {
		/* margin: 0 30rpx; */
		color: rgba(51, 51, 51, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
		margin-right: 30rpx;
		margin-left: 30rpx;
	}

	.cont {
		font-size: 28rpx;
		color: rgba(51, 51, 51, 100);
	}

	.img image {
		margin-top: 30rpx;
		width: 690rpx;
		height: 460rpx;
	}

	.last {
		margin-top: 40rpx;
	}

	.read {
		/* margin-top: 22rpx; */
	}

	.line {
		margin-top: 26rpx;
		height: 20rpx;
		background-color: rgba(247, 247, 247, 100);
	}

	.consult-item {
		display: flex;
		padding-bottom: 26rpx;
		margin-bottom: 20rpx;
		border-bottom: solid 1rpx rgba(153, 153, 153, 0.17);
	}

	.consult-items {
		display: flex;
	}

	.consult-img image {
		width: 300rpx;
		height: 180rpx;
		border-radius: 10rpx;
	}

	.consult-details {
		margin-top: 4rpx;
		margin-left: 28rpx;
		color: rgba(153, 153, 153, 100);
		font-size: 24rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.consult-name {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		margin-bottom: 20rpx;
		font-size: 28rpx;
		color: #101010;
	}

	.time {
		margin-top: 10rpx;
	}

	.recommend {
		margin: 26rpx 30rpx;
		/* padding-bottom: 110rpx; */
	}

	.estimate-item {
		margin-top: 20rpx;
	}

	.recommend-name {
		margin-bottom: 16rpx;
	}

	.estimate-top {
		display: flex;
		justify-content: space-between;
	}

	.estimate-left {
		display: flex;
	}

	.portrait image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.estimate-person {
		color: rgb(19, 19, 19);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-left: 9rpx;
	}

	.estimate-name {
		color: #131313;
		font-size: 30rpx;
		text-align: left;
		font-family: PingFangSC-bold;
	}
	
	/* .estimate-more {
		display: flex;
	} */

	.estimate-more image {
		width: 40rpx;
		height: 40rpx;
	}

	.estimate-bottom {
		display: flex;
		margin-left: 98rpx;
		justify-content: space-between;
		padding-bottom: 30rpx;
		border-bottom: solid 1rpx #e7e7e7;
		margin-top: 10rpx;
	}

	.reply {
		margin-left: 98rpx;
		margin-top: 60rpx;
	}

	.reply-top {
		display: flex;
		justify-content: space-between;
	}

	.reply-left {
		display: flex;
	}

	.reply-img image {
		width: 44rpx;
		height: 44rpx;
		border-radius: 50%;
	}

	.reply-person {
		color: rgba(68, 68, 68, 100);
		font-size: 30rpx;
		font-family: PingFangSC-regular;
		margin-left: 8rpx;
	}

	.reply-name {
		display: flex;
		align-items: center;
		color: rgba(138, 138, 138, 100);
		font-size: 26rpx;
		font-family: PingFangSC-regular;
	}

	.unfold {
		color: rgba(40, 158, 255, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-left: 148rpx;
		margin-top: 20rpx;
	}
	
	.msgs {
		display: flex;
		align-items: center;
		color: rgba(123, 123, 123, 100);
		font-size: 24rpx;
	}

	.msgs image {
		width: 32rpx;
		height: 32rpx;
		margin-right: 4rpx;
	}

	.date {
		color: rgba(89, 89, 89, 100);
		font-size: 26rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.rights {
		display: flex;
	}

	.getlike {
		display: flex;
		color: rgba(123, 123, 123, 100);
		font-size: 24rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.getlike-img {
		width: 32rpx;
		height: 32rpx;
		margin-left: 10rpx;
		margin-right: 40rpx;
	}

	.write-back {
		width: 20rpx;
		height: 20rpx;
		margin: 0 4rpx;
	}

	.reply-bottom {
		display: flex;
		margin-left: 58rpx;
		justify-content: space-between;
		padding-bottom: 38rpx;
		border-bottom: solid 1rpx #e7e7e7;
		margin-top: 30rpx;
	}

	.bottom {
		display: flex;
		width: 690rpx;
		padding: 20rpx 30rpx;
		justify-content: space-between;
		border-top: solid 1rpx #cecece;
		position: fixed;
		bottom: 0;
		background: #fff;
		z-index: 1;
	}

	.bottom-input {
		width: 386rpx;
		height: 56rpx;
		border-radius: 104rpx;
		background-color: rgba(244, 244, 244, 100);
		color: rgba(131, 131, 131, 100);
		font-size: 24rpx;
		font-family: PingFangSC-regular;
	}

	.bottom-input input {
		color: rgba(131, 131, 131, 100);
		font-size: 24rpx;
		font-family: PingFangSC-regular;
		padding-top: 10rpx;
		padding-left: 16rpx;
	}

	.bottom-right {
		display: flex;
	}

	.msg {
		width: 40rpx;
		height: 40rpx;
		/* margin-right: 66rpx; */
	}

	.like {
		width: 40rpx;
		height: 40rpx;
		/* margin-right: 68rpx; */
	}

	.share {
		width: 40rpx;
		height: 40rpx;
	}

	.detail-reply {}

	.top {
		margin: 0rpx 30rpx;
		padding-bottom: 20rpx;
		border-bottom: solid 1rpx #e2e2e2;
	}

	.detail-tops {
		text-align: center;
		padding: 30rpx;
	}

	.detail-reply {
		display: flex;
		justify-content: space-between;
	}

	.reply-left {
		display: flex;
	}

	.reply-img image {
		width: 70rpx;
		height: 70rpx;
	}

	.reply-name {}

	.namea {
		color: rgba(61, 176, 218, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
	}

	.conts {
		margin-top: 8rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
	}

	.reply-right {
		display: flex;
		align-items: center;
		font-size: 24rpx;
	}

	.reply-right image {
		width: 40rpx;
		height: 40rpx;
		margin-left: 10rpx;
	}

	.reply-time {
		font-size: 24rpx;
		margin-top: 10rpx;
		margin-left: 70rpx;
		color: #7B7B7B;
	}

	.reply-all {
		font-size: 30rpx;
		margin-left: 30rpx;
		padding: 20rpx 0;
		color: #484848;
	}
	.compilea {
		position: fixed;
		bottom: 0;
		/* height: 80rpx; */
		background: #FFFFFF;
		padding: 15rpx 30rpx;
		border-top: solid 1rpx #e1e1e1;
	}
	
	.compile {
		width: 690rpx;
		height: 50rpx;
		background: #F2F2F2;
		border-radius: 23rpx;
		line-height: 50rpx;
		display: flex;
		align-items: center;
	}
	
	.compile image {
		width: 24rpx;
		height: 24rpx;
		margin-left: 17rpx;
		margin-right: 17rpx;
	}
	
	.compile input {
		padding-left: 30rpx;
		font-size: 28rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #999999;
	}
	.details {
		padding-bottom: 80rpx;
	}
	.bottoms {
		width: 100%;
		height: 600rpx;
		overflow-y: scroll;
	}
	.source {
		height: 36rpx;
	}
	.msg-left {
		display: flex;
		margin-right: 60rpx;
		color: #737373;
	}
	.msg-right {
		display: flex;
		margin-right: 60rpx;
		color: #737373;
	}
</style>
