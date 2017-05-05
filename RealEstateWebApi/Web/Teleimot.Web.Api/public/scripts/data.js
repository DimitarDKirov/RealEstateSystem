//const HTTP_HEADER_KEY = "x-auth-key";

let data = {
    realEstates() {
        //return request.getJSON('api/RealEstates/');
        return Promise.resolve({
            result: [
                {
                    "Id": 2,
                    "Title": "My house is for sale!",
                    "SellingPrice": 28000,
                    "RentingPrice": null,
                    "CanBeSold": true,
                    "CanBeRented": false
                },
                {
                    "Id": 1,
                    "Title": "Some very interesting office",
                    "SellingPrice": 120000,
                    "RentingPrice": 500,
                    "CanBeSold": true,
                    "CanBeRented": true
                }
            ]
        }
        );
    },
    login(userData) {
        userData.grant_type = "password";
        var result = request.postJSON('token', $.param(userData), { contentType: "application/x-www-form-urlencoded" })
            .then(userDetails => {
                console.log('then');
                console.log(userDetails);
                if (usrDetails.result.err) {
                    return Promise.reject(usrDetails.result.err);
                }

                localStorage.setItem("username", usrDetails.username);
                localStorage.setItem("token", usrDetails.access_token);
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
