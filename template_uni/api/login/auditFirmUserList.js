// login.js
const request = require('../request/request');
module.exports = {
    // data可以传入 url, data, ignoreToken, form, cToken
    apiName(data) {
        let url = 'api/audit_firm_user_list';
        let ignoreToken = false;
        return request.get({
            url,
            data,
            ignoreToken
        });
    }
};
