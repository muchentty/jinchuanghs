<template>
	<view class="login">
		<view class="weloce">{{huanyingzhucezhihuishuziwenlvtong}}</view>
		<view class="user">
			<view class="name">
				<view><text class="xin">*</text>{{yonghuming}}</view>
				<view class="input">
					<input style="width: 100%;" type="text" v-model="userName" @input="username" :placeholder="qingshuruyonghuming+'('+shuzi+'+'+daxiaoxiezimu+')'" />
				</view>
			</view>
			<view class="name">
				<view><text class="xin">*</text>{{mima}}</view>
				<view class="input">
					<input type="text" v-model="password" @input="passWord" :placeholder="qingshurumima" />
				</view>
			</view>
			<view class="name">
				<view><text class="xin">*</text>{{querenmima}}</view>
				<view class="input">
					<input type="text" v-model="repassword" @input="rePassword" :placeholder="zaicishurumima" />
				</view>
			</view>
			<view class="name">
				<view>{{youxiang}}</view>
				<view class="input">
					<input type="text" v-model="email" @input="inEmail" :placeholder="qingshuruyouxiang" />
				</view>
			</view>
			<view class="name">
				<view>{{xingming}}</view>
				<view class="input">
					<input type="text" v-model="realname" @input="realName" :placeholder="qingshuruxingming" />
				</view>
			</view>
			<view class="name">
				<view><text class="xin">*</text>{{shoujihao}}</view>
				<view class="input">
					<input type="text" v-model="mobile" @input="inMobile" :placeholder="qingshurushoujihao" />
				</view>
			</view>
			<view class="name" v-show="sms_code">
				<view><text class="xin">*</text>{{yanzhengma}}</view>
				<view class="input">
					<input type="text" v-model="mobileCheck" @input="check" :placeholder="qingshuruyanzhengma" />
					<view v-if="codeStatus" class="yzm" @click="getcode">{{huoquyanzhengma}}</view>
					<view v-else class="yzzm">重新获取{{countdown}}秒</view>
				</view>
			</view>
			<view class="name" v-show="check_code">
				<view><text class="xin">*</text>{{yanzhengma}}</view>
				<view class="input">
					<input type="text" v-model="verify" @input="inVerify" :placeholder="qingshuruyanzhengma" />
					
					<image class="tcode" :src="verifyCode" @click="tcodes"></image>
				</view>
			</view>
		</view>
		<view>
			<button class="btn" @click="register">{{zhuce}}</button>
			<view class="no">{{yijingzhuceguo}}，<text class="go" @click="reg">{{qudenglu}}</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {huanyingzhucezhihuishuziwenlvtong:'',qingzaicishurumima:'',zaicishurumima:'',qingshurushoujihao:'',qingshuruyonghuming:'',qingshuruyanzhengma:'',qingshuruyanzhengma:'',qingshurushoujihao:'',qingshuruyanzhengma:'',qingshuruyonghuming:'',huoquyanzhengma:'',qingshuruyouxiang:'',qingshuruxingming:'',qingshurumima:'',daxiaoxiezimu:'',yijingzhuceguo:'',qingshurumima:'',querenmima:'',yanzhengma:'',qudenglu:'',yonghuming:'',shoujihao:'',yanzhengma:'',youxiang:'',mima:'',zhuce:'',shuzi:'',xingming:'',
				check_code: true,
				sms_code: false,
				userName: '', 
				password: '', 
				repassword: '', 
				email: '', 
				realname: '', 
				mobile: '', 
				mobileCheck: '', 
				verify: '', 
				assToken:'',
				verifyCode:'',
				codeStatus:true,
				countdown: 60,
			}
		},
		methods: {
			reg() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			
			getcode(){
				this.$request('/api/auth/smscode',{
					mobile:this.mobile
				},'post',{}).then(res=>{
					if(res.code==1){
						uni.showToast({
							title:'验证码已发送',
							icon:'none'
						})
						this.codeStatus = false
						this.countDown()
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				})
			},
			//倒计时
			countDown() {
				let self = this;
				self.countdown = 60;
				self.countdown -= 1;
				if (self.clear) {
					clearInterval(self.clear)
				}
				self.clear = null;
				self.clear = setInterval(_ => {
					console.log('倒计时',self.countdown)
					if (self.countdown > 0) {
						self.countdown -= 1;
					} else {
						if(!this.codeStatus){
							this.codeStatus = true
						}
						clearInterval(self.clear)
					}
				}, 1000)
			},
			tcodes(){
				
				this.$request('/api/auth/captcha',{},'get',
				{
					access_token:this.assToken
				}).then(res=>{
					
					this.verifyCode = res.data;
				})
			},
			
			username(e) {
				this.userName = e.detail.value
			},
			
			passWord(e) {
				this.password = e.detail.value
			},
			
			rePassword(e) {
				this.repassword = e.detail.value
			},
			
			inEmail(e) {
				this.email = e.detail.value
			},
			
			realName(e) {
				this.realname = e.detail.value
			},
			
			inMobile(e) {
				this.mobile = e.detail.value
			},
			
			check(e) {
				this.mobileCheck = e.detail.value
			},
			
			inVerify(e) {
				this.verify = e.detail.value
			},
			
			register() {
				
				if (this.userName == '') {
					uni.showModal({
						title:this.qingshuruyonghuming,
						icon: 'none'
					})
				} else if (this.password == '') {
					uni.showModal({
						title:this.qingshurumima,
						icon: 'none'
					})
				} else if (this.repassword == '') {
					uni.showModal({
						title:this.qingzaicishurumima,
						icon: 'none'
					})
				} else if (this.mobile == '') {
					uni.showModal({
						title:this.qingshurushoujihao,
						icon: 'none'
					})
				} else if (this.mobileCheck == '') {
					uni.showModal({
						title:this.qingshuruyanzhengma,
						icon: 'none'
					})
				} else {
					this.$request('/api/auth/register',{
						username:this.userName,
						password:this.password,
						repassword:	this.repassword,
						email:this.email,
						realname:this.realname,
						mobile:	this.mobile,
						mobilecheck:this.mobileCheck,
						verify:this.verify,
						access_token:this.assToken
					},'post',{}).then(res=>{
						
						if(res.code == 1){
							uni.showToast({
								title:res.msg,
								icon:'none'
							})
							setTimeout(function(){
								uni.navigateTo({
									url:'../login/login'
								})
							},1500)
						}else{
							uni.showToast({
								title:res.msg,
								icon:'none'
							})
							this.tcodes()
						}
					})
				}
			}
		},
		onShow(e) {this.huanyingzhucezhihuishuziwenlvtong = this.$lang.huanyingzhucezhihuishuziwenlvtong[uni.getStorageSync('lang')];this.qingzaicishurumima = this.$lang.qingzaicishurumima[uni.getStorageSync('lang')];this.zaicishurumima = this.$lang.zaicishurumima[uni.getStorageSync('lang')];this.qingshurushoujihao = this.$lang.qingshurushoujihao[uni.getStorageSync('lang')];this.qingshuruyonghuming = this.$lang.qingshuruyonghuming[uni.getStorageSync('lang')];this.qingshuruyanzhengma = this.$lang.qingshuruyanzhengma[uni.getStorageSync('lang')];this.qingshuruyanzhengma = this.$lang.qingshuruyanzhengma[uni.getStorageSync('lang')];this.qingshurushoujihao = this.$lang.qingshurushoujihao[uni.getStorageSync('lang')];this.qingshuruyanzhengma = this.$lang.qingshuruyanzhengma[uni.getStorageSync('lang')];this.qingshuruyonghuming = this.$lang.qingshuruyonghuming[uni.getStorageSync('lang')];this.huoquyanzhengma = this.$lang.huoquyanzhengma[uni.getStorageSync('lang')];this.qingshuruyouxiang = this.$lang.qingshuruyouxiang[uni.getStorageSync('lang')];this.qingshuruxingming = this.$lang.qingshuruxingming[uni.getStorageSync('lang')];this.qingshurumima = this.$lang.qingshurumima[uni.getStorageSync('lang')];this.daxiaoxiezimu = this.$lang.daxiaoxiezimu[uni.getStorageSync('lang')];this.yijingzhuceguo = this.$lang.yijingzhuceguo[uni.getStorageSync('lang')];this.qingshurumima = this.$lang.qingshurumima[uni.getStorageSync('lang')];this.querenmima = this.$lang.querenmima[uni.getStorageSync('lang')];this.yanzhengma = this.$lang.yanzhengma[uni.getStorageSync('lang')];this.qudenglu = this.$lang.qudenglu[uni.getStorageSync('lang')];this.yonghuming = this.$lang.yonghuming[uni.getStorageSync('lang')];this.shoujihao = this.$lang.shoujihao[uni.getStorageSync('lang')];this.yanzhengma = this.$lang.yanzhengma[uni.getStorageSync('lang')];this.youxiang = this.$lang.youxiang[uni.getStorageSync('lang')];this.mima = this.$lang.mima[uni.getStorageSync('lang')];this.zhuce = this.$lang.zhuce[uni.getStorageSync('lang')];this.shuzi = this.$lang.shuzi[uni.getStorageSync('lang')];this.xingming = this.$lang.xingming[uni.getStorageSync('lang')];},
		onLoad(e) {this.huanyingzhucezhihuishuziwenlvtong = this.$lang.huanyingzhucezhihuishuziwenlvtong[uni.getStorageSync('lang')];this.qingzaicishurumima = this.$lang.qingzaicishurumima[uni.getStorageSync('lang')];this.zaicishurumima = this.$lang.zaicishurumima[uni.getStorageSync('lang')];this.qingshurushoujihao = this.$lang.qingshurushoujihao[uni.getStorageSync('lang')];this.qingshuruyonghuming = this.$lang.qingshuruyonghuming[uni.getStorageSync('lang')];this.qingshuruyanzhengma = this.$lang.qingshuruyanzhengma[uni.getStorageSync('lang')];this.qingshuruyanzhengma = this.$lang.qingshuruyanzhengma[uni.getStorageSync('lang')];this.qingshurushoujihao = this.$lang.qingshurushoujihao[uni.getStorageSync('lang')];this.qingshuruyanzhengma = this.$lang.qingshuruyanzhengma[uni.getStorageSync('lang')];this.qingshuruyonghuming = this.$lang.qingshuruyonghuming[uni.getStorageSync('lang')];this.huoquyanzhengma = this.$lang.huoquyanzhengma[uni.getStorageSync('lang')];this.qingshuruyouxiang = this.$lang.qingshuruyouxiang[uni.getStorageSync('lang')];this.qingshuruxingming = this.$lang.qingshuruxingming[uni.getStorageSync('lang')];this.qingshurumima = this.$lang.qingshurumima[uni.getStorageSync('lang')];this.daxiaoxiezimu = this.$lang.daxiaoxiezimu[uni.getStorageSync('lang')];this.yijingzhuceguo = this.$lang.yijingzhuceguo[uni.getStorageSync('lang')];this.qingshurumima = this.$lang.qingshurumima[uni.getStorageSync('lang')];this.querenmima = this.$lang.querenmima[uni.getStorageSync('lang')];this.yanzhengma = this.$lang.yanzhengma[uni.getStorageSync('lang')];this.qudenglu = this.$lang.qudenglu[uni.getStorageSync('lang')];this.yonghuming = this.$lang.yonghuming[uni.getStorageSync('lang')];this.shoujihao = this.$lang.shoujihao[uni.getStorageSync('lang')];this.yanzhengma = this.$lang.yanzhengma[uni.getStorageSync('lang')];this.youxiang = this.$lang.youxiang[uni.getStorageSync('lang')];this.mima = this.$lang.mima[uni.getStorageSync('lang')];this.zhuce = this.$lang.zhuce[uni.getStorageSync('lang')];this.shuzi = this.$lang.shuzi[uni.getStorageSync('lang')];this.xingming = this.$lang.xingming[uni.getStorageSync('lang')];
			
			this.$request('/api/auth/verifysetting',{
				
			},'post',{}).then(res=>{
				
				if (res.code == 1) {
					if (res.data.sms_code == '2') {
						this.sms_code = false
					} else if (res.data.sms_code == '1') {
						this.sms_code = true
					}
					if (res.data.check_code == '0') {
						this.check_code = false
					} else if (res.data.check_code == '1') {
						this.check_code = true
					}
				}
			})
			
			this.$request('/api/auth/token',{
				
			},'post',{}).then(res=>{
				
				this.assToken = res.data
			})
			
			this.$request('/api/auth/captcha',{
				header:{
					access_token:this.assToken
				},
			},'post',{}).then(res=>{
				
				this.verifyCode = res.data;
			})
		},
		onShow(){
			
			this.$request('/api/auth/captcha',{
				header:{
					access_token:this.assToken
				},
			},'post',{}).then(res=>{
				
				this.verifyCode = res.data;
			})
		}
	}
</script>

<style>
	.login {
		padding-bottom: 30rpx;
	}

	.weloce {
		font-size: 42rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #0E0F18;
		padding-top: 50rpx;
		padding-left: 61rpx;
	}

	.user {
		width: 667rpx;
		
		background: #FFFFFF;
		box-shadow: 0px 14rpx 120rpx 0px rgba(182, 182, 182, 0.42);
		border-radius: 36rpx;
		margin-left: 40rpx;
		margin-top: 56rpx;
		padding-bottom: 30rpx;
	}

	.name {
		font-size: 25rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #333333;
		padding: 45rpx 38rpx 0rpx 38rpx;
	}

	.xin {
		color: #FF4E5A;
	}

	.input {
		font-size: 32rpx;
		margin-top: 30rpx;
		padding-bottom: 30rpx;
		border-bottom: solid 1rpx #D4D4D4;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.yzm {
		font-size: 28rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #FF4E5A;
	}
	
	.yzzm {
		font-size: 28rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #c3c3c3;
	}

	.btn {
		width: 591rpx;
		height: 84rpx;
		background: #FF4E5A;
		box-shadow: 0px 25rpx 54rpx 0px rgba(255, 113, 123, 0.4);
		border-radius: 42rpx;
		font-size: 33rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #FFFFFF;
		line-height: 84rpx;
		text-align: center;
		margin-top: 96rpx;
	}

	.no {
		margin-top: 20rpx;
		text-align: center;
		font-size: 24rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #cacaca;
	}

	.go {
		color: #FF4E5A;
	}

	.tcode {
		width: 200rpx;
		height: 80rpx;
	}
</style>
