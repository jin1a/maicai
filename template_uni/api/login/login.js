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
    }
};
