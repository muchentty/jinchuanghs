<template>
	<view>
		<view class="contetn">
			<view class="title">在线报名</view>
			<view class="message">
				<view class="message-item">
					<view class="name">选手名称</view>
					<view class="input">
						<input v-model="pname" placeholder="请输入选手名称" />
					</view>
				</view>
				<view class="message-item">
					<view class="name">选手手机号</view>
					<view class="input">
						<input v-model="phone" @blur='inputBlur' placeholder="请输入手机号" />
					</view>
				</view>
				<view class="message-item">
					<view class="name">选手描述</view>
					<view class="inputs">
						<input v-model="describe" placeholder="请输入选手描述" />
					</view>
				</view>
				<view class="updowd">
					<view>上传选手图片（1~3张）</view>
					<u-upload class="lolo" :fileList="fileList6" @afterRead="afterRead" @delete="deletePic" name="6"
						multiple :maxCount="3" width="85" height="85">
						<view class="updowd-img">
							<image src="../../static/jia.png"></image>
							<view>添加图片</view>
						</view>
					</u-upload>

					<!-- <view class="picImg">
						<view class="img" v-for="item in picUrl">
							<image :src="item"></image>
						</view>
						<view class="updowd-img" v-if="picUrl.length<3" @click="upload">
							<image src="../../static/jia.png"></image>
							<view>添加图片</view>
						</view>
					</view> -->

				</view>
				<view class="updowd">
					<view>上传选手视频</view>
					<view class="updowd-img" v-if="videourl == ''" @click="uploadVideo">
						<image src="../../static/jia.png"></image>
						<view>添加视频</view>
					</view>
					<view class="upload-other" v-else>
						<view class="updowd-img" @click="uploadVideo">
							<video :src="videourl"></video>
						</view>
						<view class="del" @click='remove'>
							<image src="../../static/del.png"></image>
						</view>
					</view>
				</view>
				<view class="hint">以下信息仅作为活动主办方和您联系使用</view>
				<view class="submit" @click="submit">提交</view>
			</view>
		</view>
		<view class="are" v-if="showsla" @click="protocol">
			<image class="are-img" src="../../static/are.png"></image>
			同意用户使用协议
		</view>
		<view class="are" v-else @click="protocol">
			<view class="yuan"></view>
			同意用户使用协议
		</view>
	</view>
</template>

<script>
	import config from 'utils/config.js'
	export default {
		data() {
			return {
				describe: '',
				pname: '',
				phone: '',
				picUrl: [],
				videourl: '',
				id: '',
				fileList6: [],
				showsla: false,
			}
		},
		onLoad(e) {
			this.id = e.id
		},
		methods: {
			protocol() {
				this.showsla = !this.showsla
			},
			//删除视频
			remove(){
				this.videourl = ''
				
			},
			//监听手机号失去焦点时
			inputBlur(){
				if(this.phone.length!=11){
					uni.showToast({
						title:'请输入十一位手机号',
						icon:'none'
					})
				}else{
					this.phoneFun(this.phone)
				}
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
				this.picUrl.splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: config.baseUrl + '/api/upload/up_video', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							type: 'race_image',
						},
						success: (res) => {
							// console.log(res)
							let data = JSON.parse(res.data);
							// console.log(data)
							if (data.code == 200) {
								this.picUrl.push(data.data.url)
								setTimeout(() => {
									resolve(res.data.data)
								}, 600)
							}
						}
					});
				})
			},

			upload() {
				let that = this
				uni.chooseImage({
					count: 1,
					success: function(res) {
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: config.baseUrl + '/api/upload/up_video',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								type: 'race_image',
								// file: tempFilePaths[0]
							},
							success: (res) => {
								let data = JSON.parse(res.data);
								console.log(data)
								if (data.code == 200) {
									that.picUrl.push(data.data.url)
								}
							}
						})
					}
				});
			},

			// 上传视频
			async uploadVideo() {
				// uploadFile 存储需要上传的文件
				let uploadFile = ''
				// 1.选择要上传的视频
				const res = await uni.chooseVideo({
					maxDuration: 60, // 拍摄视频最长拍摄时间，单位秒。最长支持 60 秒。
					sourceType: ['album'], // album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera']
				});
				uploadFile = res[1].tempFilePath;
				// console.log(uploadFile);
				var that2 = this;
				// 2.上传所选视频到服务器
				uni.showLoading({
					mask: true,
					title: '上传中...'
				})
				const arr = await uni.uploadFile({
					// 需要上传的地址
					url: config.baseUrl + '/api/upload/up_video',
					// filePath  需要上传的文件
					filePath: uploadFile,
					name: 'file',
					formData: {
						type: 'race_video',
					},
				});
				let data = JSON.parse(arr[1].data)
				console.log('data:', data);
				if (data.code !== 200) { // 视频上传失败了
					uni.hideLoading()
					uni.showToast({
						title: data.msg,
						icon: 'none'
					})
					return
				}
				// 上传成功(把上传成功后的文件路径 push 到页面需要显示的视频数据列表中)
				that2.videourl = data.data.url
				// that2.formData.video_url = data.data.url
				uni.hideLoading()
			},
			//判断手机号
			phoneFun(phones) {
				var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if (!myreg.test(phones)) {
					uni.showToast({
						title:'请输入正确的手机号',
						icon:'none'
					})
					return false;
				} else {
					console.log('手机号格式正确')
					return true;
				}
			},
			//判断身份证号码
			idCardFn(idCard) {
				var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
				if (!reg.test(idCard)) {
					console.log('身份证号错误', idCard);
					return false;
				} else {
					console.log('身份证号正确', idCard);
				}
			},
			submit() {
				// let idcard = this.idCardFn(this.pname)
				// let phone = this.phoneFun(this.phone)
				// console.log(idcard)
				// console.log(phone)
				if (this.pname == '') {
					uni.showToast({
						title: '请输入选手名称',
						icon: 'none'
					})
				} else if (this.phone == '') {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
				} else if (!this.showsla) {
					uni.showToast({
						title: '请勾选用户使用协议',
						icon: 'none'
					})
				} else {
					this.$request('/api/race/join', {
						race_id: this.id,
						tel: this.phone,
						player_name: this.pname,
						content: this.describe,
						video: this.videourl,
						pics: this.picUrl
					}, 'post', {}, true).then(res => {
						if (res.code == 200) {
							uni.showToast({
								title: '报名成功',
								icon: 'none'
							})
							uni.navigateBack()
						} else {
							uni.showToast({
								title: '报名失败',
								icon: 'none'
							})
						}
					})
				}
			}
		}
	}
</script>

<style>
	.contetn {
		width: 690rpx;
		margin: 30rpx;
		box-shadow: 0 2rpx 6rpx 0 #dadada;
	}

	.title {
		font-size: 30rpx;
		color: #717378;
		font-weight: 600;
		text-align: center;
		padding-top: 30rpx;
		border-bottom: solid 1rpx #f7f7f7;
		padding-bottom: 30rpx;
	}

	.message {
		padding-bottom: 30rpx;
	}

	.message-item {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
	}

	.name {
		width: 140rpx;
		font-size: 26rpx;
		color: #717378;
		margin-left: 30rpx;
	}

	.input input {
		border: solid 1rpx #eee;
		background-color: #FBFCFE;
		padding: 10rpx 20rpx;
		margin-left: 20rpx;
		font-size: 28rpx;
	}

	.inputs input {
		height: 100rpx;
		border: solid 1rpx #eee;
		background-color: #FBFCFE;
		padding: 10rpx 20rpx;
		margin-left: 20rpx;
		font-size: 28rpx;
	}

	.updowd {
		position: relative;
		margin: 30rpx;
		color: #b8b8b8;
	}

	.updowd-img {
		width: 170rpx;
		height: 170rpx;
		border: solid 1rpx #aaadb4;
		text-align: center;
		margin-top: 20rpx;
	}

	.updowd-img image {
		width: 40rpx;
		height: 40rpx;
		margin-top: 30rpx;
		margin-bottom: 10rpx;
	}

	.updowd-img video {
		width: 170rpx;
		height: 170rpx;
		margin-bottom: 10rpx;
	}

	.hint {
		text-align: center;
		font-size: 24rpx;
		color: #717378;
	}

	.submit {
		width: 650rpx;
		height: 80rpx;
		background-color: #479F6C;
		color: #fff;
		text-align: center;
		line-height: 80rpx;
		margin-top: 30rpx;
		margin-left: 20rpx;
	}

	.are-img {
		width: 40rpx;
		height: 40rpx;
		margin-right: 10rpx;
	}

	.are {
		text-align: center;
		font-size: 24rpx;
		color: #717378;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.picImg {
		display: flex;
	}

	.img {
		width: 160rpx;
		height: 160rpx;
		margin-right: 30rpx;
		margin-top: 20rpx;
	}

	.img image {
		width: 100%;
		height: 100%;
	}

	.lolo {
		margin-top: 20rpx;
	}

	.yuan {
		width: 32rpx;
		height: 32rpx;
		margin-right: 10rpx;
		border-radius: 50%;
		border: solid 1rpx #aaadb4;
	}
	
	.upload-other {
		display:flex;
		align-items:center;
	}

	.del {
		/* position: absolute;
		top: 46rpx;
		left: 160rpx; */
	}

	.del image {
		width: 40rpx;
		height: 40rpx;
		margin-left:30rpx;
	}
</style>
