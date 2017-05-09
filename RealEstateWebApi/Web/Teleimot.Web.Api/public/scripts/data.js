//import { httpRequest as request } from 'httpRequester';
var data = (function (request) {
    let cachedRealEstateTypes;
       
    function realEstates(page) {
        return request.getJSON('api/realestates/?skip=' + page, getAuthHeader());
    }

    function realEstateTypes() {
        if (typeof cachedRealEstateTypes === 'undefined') {
            return request.getJSON('api/realestatetypes/getall')
                .then(types => {
                    cachedRealEstateTypes = types;
                    return types;
                });
        } else {
            return Promise.resolve(cachedRealEstateTypes);
        }
    }

    function getRealEstateById(id) {
        let options = getAuthHeader();
        return request.getJSON('api/realestates/' + id, options);
    }

    function addRealEstate(estateOffer) {
        let options = getAuthHeader();
        return request.postJSON('api/realestates', estateOffer, options);
    }

    //getCommentsByEstateId(realEstateId) {
    //    let options = getAuthHeader();
    //    return request.getJSON('api/comments/' + realEstateId, options);
    //},

    function addCommnet(comment) {
        let options = getAuthHeader();
        return request.postJSON('api/comments', comment, options);
    }

    function login(userData) {
        userData.grant_type = 'password';
        var result = request.postAuth('token', userData)
            .then(userDetails => {
                localStorage.setItem('username', userDetails.userName);
                localStorage.setItem('token', userDetails.access_token);
            })
            .catch(error => {
                return Promise.reject(error.responseJSON ? error.responseJSON.error_description : error.statusText);
            });

        return result;
    }
    function register(userData) {
        return request.postAuth('api/account/register', userData);
    }

    function loggedInUsername() {
        return Promise.resolve()
            .then(() => {
                return localStorage.getItem("username");
            });
    }

    function logout() {
        let header = getAuthHeader();
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        return request.postJSON('api/account/logout', {}, header);
    }

    function getAuthHeader() {
        return {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        };
    }

    return{
        realEstates:{
            realEstates,
            realEstateTypes,
            getRealEstateById,
            addRealEstate
        },
        comments:{
            addCommnet
        },
        users:{
            login,
            register,
            loggedInUsername,
            logout
        }
    }
}(httpRequester));

//export { data };