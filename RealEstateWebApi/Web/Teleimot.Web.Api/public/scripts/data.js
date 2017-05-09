import {httpRequest as request} from 'httpRequester';

let realEstateTypes;

let data = {
    realEstates(page) {
        return request.getJSON('api/realestates/?skip='+page, getAuthHeader());
    },
    realEstateTypes(){
        if(typeof realEstateTypes ==='undefined'){
            return request.getJSON('api/realestatetypes/getall')
            .then(types=>{
                realEstateTypes=types;
                return types;
            });
        }else{
            return Promise.resolve(realEstateTypes);
        }
    },
    getEstateById(id){
        let options=getAuthHeader();
        return request.getJSON('api/realestates/'+id, options);
    },
    addEstate(estateOffer){
        let options=getAuthHeader();
        return request.postJSON('api/realestates', estateOffer, options);
    },
    getCommentsByEstateId(realEstateId){
        let options=getAuthHeader();
        return request.getJSON('api/comments/'+realEstateId, options);
    },
    addCommnet(comment){
        let options=getAuthHeader();
        return request.postJSON('api/comments', comment, options);
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
        let header=getAuthHeader();
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        return request.postJSON('api/account/logout', {}, header);
    }
};

function getAuthHeader(){
    return {
        headers:{
            Authorization: 'Bearer '+ localStorage.getItem('token')
        }
    };
}

export {data};