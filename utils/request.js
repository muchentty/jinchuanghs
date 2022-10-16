import config from 'utils/config.js'
import getToken from 'utils/login.js'

const request = (url = '', datas = {}, type = '', header = {}, must = false) => {
	return new Promise((resolve, reject) => {
		getToken(must).then(res => {
			if (url != "/api/auth/login" && url != "/api/auth/register" && url !=
				"/api/auth/wx_login") {
				datas.token = res
			}
			if(uni.getStorageSync('lang')){
				datas.lang_type = uni.getStorageSync('lang')
			}
			uni.request({
				method: type,
				url: config.baseUrl + url,
				data: datas,
				header: header,
				dataType: 'json',
			}).then((response) => {
				let code = response[1].data.code
				if (code == 99 || code == 101 || code == 102 || code == 103) {
					uni.setStorageSync('wtoken', '');
					uni.setStorageSync('retoken', '');
					uni.setStorageSync('expire', '');
					uni.showModal({
						title: response[1].data.msg,
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
				setTimeout(function() {
					uni.hideLoading();
				}, 200);
				let [error, res] = response;
				resolve(res.data);
			}).catch(error => {
				let [err, res] = error;
				reject(err)
			})
		})

	});
}
export default request
