//const HTTP_HEADER_KEY = "x-auth-key";

let data = {
    login(userData) {
        var result = request.putJSON('api/users/auth/', userData)
            .then(usrDetails => {
                if (usrDetails.result.err) {
                    return Promise.reject(usrDetails.result.err);
                }

                localStorage.setItem("username", usrDetails.result.username);
                localStorage.setItem("authKey", usrDetails.result.authKey);
            });

        return result;
    },
    register(userData) {
        return request.postJSON('api/users', userData);
    },
    loggedInUsername() {
        return Promise.resolve()
            .then(() => {
                return localStorage.getItem("username");
            });
    },
    logout() {
        return Promise.resolve()
            .then(() => {
                localStorage.removeItem("username");
                localStorage.removeItem("authKey");
            });
    }
}
