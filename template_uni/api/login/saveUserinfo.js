// login.js
const request = require('../request/request');
module.exports = {
    // data可以传入 url, data, ignoreToken, form, cToken
    apiName(data) {
        let url = 'api/save_user_info';
        let ignoreToken = false;
        return request.post({
            url,
            data,
            ignoreToken
        });
    },
	loginOut(data) {
	    let url = 'api/login_out';
	    let ignoreToken = false;
	    return request.get({
	        url,
	        data,
	        ignoreToken
	    });
	}
	,
	loginOut2(data) {
	    let url = 'api/deregister_account';
	    let ignoreToken = false;
	    return request.get({
	        url,
	        data,
	        ignoreToken
	    });
	}
};
