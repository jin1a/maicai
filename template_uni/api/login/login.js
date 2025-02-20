// login.js
const request = require('../request/request');
module.exports = {
    // data可以传入 url, data, ignoreToken, form, cToken
    apiLogin(data) {
        let url = 'api/login';
        return request.post({
            url,
            data
        });
    },
	apiGetVerificationCode(data) {
	    let url = 'api/verify_code';
	    return request.post({
	        url,
	        data
	    });
	},
	apiRetrievePassword(data) {
	    let url = 'api/recover_password';
	    return request.post({
	        url,
	        data
	    });
	}
};
