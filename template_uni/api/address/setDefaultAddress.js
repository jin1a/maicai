const request = require('../request/request');
module.exports = {
    // data可以传入 url, data, ignoreToken, form, cToken
    apiName(data) {
        let url = 'api/set_default_address';
        let ignoreToken = false;
        return request.post({
            url,
            data,
            ignoreToken
        });
    }
};
