let httpRequester = (function () {
    let requests = {
        getTemplate(url) {
            let promise = new Promise((resolve, reject) => {
                $.ajax({
                    url,
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
                    url,
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
                    url,
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
                    url,
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
                    url,
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

    return {
        getTemplate: requests.getTemplate,
        putJSON: requests.putJSON,
        postJSON: requests.postJSON,
        postAuth: requests.postAuth,
        getJSON: requests.getJSON
    }
}());
