// login.js
const request = require('../request/request');
module.exports = {
    // data可以传入 url, data, ignoreToken, form, cToken
    apiName(data) {
        let url = 'api/top_up';
        let ignoreToken = false;
        return request.post({
            url,
            data,
            ignoreToken
        });
    }
};
