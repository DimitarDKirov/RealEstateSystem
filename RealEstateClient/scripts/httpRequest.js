const serverAddress = 'http://realestatessystem.apphb.com/';
let request = {
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
                url: serverAddress + url,
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
                url: serverAddress + url,
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
                url: serverAddress + url,
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                data: $.param(body)
            })
                .done(resolve)
                .fail(reject);
        });
        return promise;
    },
    getJSON(url) {
        let promise = new Promise((resolve, reject) => {
            $.ajax({
                url: serverAddress + url,
                method: "GET",
                contentType: "application/json"
            })
                .done(resolve)
                .fail(reject);
        });
        return promise;
    }
};
