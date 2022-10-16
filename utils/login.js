import request from 'utils/request.js'
import config from 'utils/config.js'

//未登录返回空
const getToken = (must=false) => {
	return new Promise((resolve, reject) => {
		//验证token
		let token = uni.getStorageSync('wtoken');
		if(!token.length){
			if(must){
				uni.showModal({
					title: '请先登录',
					content: '',
					showCancel: true,
					success: function(res) {
						if (res.confirm) {
							//#ifndef  MP-WEIXIN
							//获取失败 跳转登录页
							
							uni.navigateTo({
								url: '../login/login'
							})
							//#endif
							//#ifdef MP-WEIXIN
							uni.navigateTo({
								url: '../wx_login/wx_login'
							})
							//#endif
						}
					}
				});
				return
			}
			resolve(null)
			return
		}
		//刷新token
		let retoken = uni.getStorageSync('retoken');
		//过期时间戳
		let expire_in = uni.getStorageSync('expire');
		//判断过期
		let now_time = Math.round(new Date() / 1000)
		if(expire_in > now_time){
			//未过期
			resolve(token)
			return
		}else{
			//已过期 重新获取token
			uni.request({
				method: 'post',
				url: config.baseUrl + '/api/auth/refresh',
				data: {refresh_token: retoken},
				dataType: 'json',         
				success:(res)=>{
					if (res.data.code == 1) {
						uni.setStorageSync('wtoken', res.data.data.token);
						uni.setStorageSync('retoken', res.data.data.refresh_token);
						uni.setStorageSync('expire', res.data.data.expire_in+res.data.time);
						resolve(res.data.data.token)
						return
					} else {
						uni.setStorageSync('wtoken', '');
						uni.setStorageSync('retoken', '');
						uni.setStorageSync('expire', '');
						if(must){
							uni.showModal({
								title: '请重新登录',
								content: '',
								showCancel: true,
								success: function(res) {
									if (res.confirm) {
										//#ifndef  MP-WEIXIN
										//获取失败 跳转登录页
										uni.navigateTo({
											url: '../login/login'
										})
										//#endif
										//#ifdef MP-WEIXIN
										uni.navigateTo({
											url: '../wx_login/wx_login'
										})
										//#endif
									}
								}
							});
							return
						}
						resolve(null)
						return
					}
				}
			})
		}
    });
}
export default getToken

