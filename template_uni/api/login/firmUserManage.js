// login.js
const request = require('../request/request');
module.exports = {
    // data可以传入 url, data, ignoreToken, form, cToken
    apiName(data) {
        let url = 'api/firm_user_manage';
        let ignoreToken = false;
        return request.get({
            url,
            data,
            ignoreToken
        });
    }
};
