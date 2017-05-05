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
        userData.grant_type = 'password';
        var result = request.postAuth('token', userData)
            .then(userDetails => {
                localStorage.setItem('username', userDetails.userName);
                localStorage.setItem('token', userDetails.access_token);
            })
            .catch(error=> {
                return Promise.reject(error.responseJSON ? error.responseJSON.error_description : error.statusText);
            });

        return result;
    },
    register(userData) {
        return request.postAuth('api/account/register', userData);
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
                localStorage.removeItem("token");
            });
    }
}
