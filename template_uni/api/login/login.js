// login.js
const request = require('../request/request');
module.exports = {
    // data可以传入 url, data, ignoreToken, form, cToken
	// 登录
    apiLogin(data) {
        let url = 'api/login';
        return request.post({
            url,
            data
        });
    },
	// 获取验证码
	apiGetVerificationCode(data) {
	    let url = 'api/verify_code';
	    return request.post({
	        url,
	        data
	    });
	},
	// 修改密码
	apiRetrievePassword(data) {
	    let url = 'api/recover_password';
	    return request.post({
	        url,
	        data
	    });
	},
	// 注册
	apiRegister(data) {
	    let url = 'api/register';
	    return request.post({
	        url,
	        data
	    });
	},
	// app更新
	appUdata(data) {
	    let url = 'api/app_version';
	    return request.get({
	        url,
	        data
	    });
	},
};
