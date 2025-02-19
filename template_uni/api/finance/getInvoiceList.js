const request = require('../request/request');
module.exports = {
    // data可以传入 url, data, ignoreToken, form, cToken
    apiName(data) {
        let url = 'api/get_invoice_list';
        let ignoreToken = false;
        return request.get({
            url,
            data,
            ignoreToken
        });
    }
};
