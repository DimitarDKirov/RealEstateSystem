//const serverUrl = 'http://localhost:15334/';
const serverUrl = 'http://realestatessystem.apphb.com/';

let httpRequest = {
    getTemplate(url) {
        let promise = new Promise((resolve, reject) => {
            $.ajax({
                url: serverUrl + url,
                method: "GET",
                success(response) {
                    resolve(response);
                }
            });
        });
        return promise;
    },
    putJSON(url, body, options = {}) {
        let promise = new Promise((resolve, reject) => {
            var headers = options.headers || {};
            $.ajax({
                url: serverUrl + url,
                headers,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(body)
            })
                .done(resolve)
                .fail((er) => reject(er.responseJSON.result.err));
        });
        return promise;
    },
    postJSON(url, body, options = {}) {
        let promise = new Promise((resolve, reject) => {
            let headers = options.headers || {};
            $.ajax({
                url: serverUrl + url,
                headers,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(body)
            })
                .done(resolve)
                .fail(reject);
        });
        return promise;
    },
    postAuth(url, body) {
        let promise = new Promise((resolve, reject) => {
            $.ajax({
                url: serverUrl + url,
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                data: $.param(body)
            })
                .done(resolve)
                .fail(reject);
        });
        return promise;
    },
    getJSON(url, options = {}) {
        let headers = options.headers || {};
        let promise = new Promise((resolve, reject) => {
            $.ajax({
                url: serverUrl + url,
                headers,
                method: "GET",
                contentType: "application/json"
            })
                .done(resolve)
                .fail(reject);
        });
        return promise;
    }
};

export { httpRequest };
