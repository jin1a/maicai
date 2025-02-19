// login.js
const request = require('../request/request');
module.exports = {
    // data可以传入 url, data, ignoreToken, form, cToken
    apiName(data) {
        let url = 'api/agreement';
        let ignoreToken = true;
        return request.get({
            url,
            data,
            ignoreToken
        });
    }
};
