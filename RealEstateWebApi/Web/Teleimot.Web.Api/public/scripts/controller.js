import { data } from 'data';
import { loadTemplate } from 'templateLoader';
import { RealEstate } from 'realestate';
import { Comment } from 'comment';

let controller = {
    home() {
        loadTemplate('home')
            .then(template => {
                var html = template();
                $('#content').html(html);
            })
            .catch(console.log);
    },
    allEstates() {
        var templateOffers;
        loadTemplate('allEstatesCommon')
            .then(template => {
                var html = template();
                $('#content').html(html);

                $('#btn-more').on('click', ev => {
                    loadNextEstates(templateOffers);

                    ev.preventDefault();
                    return false;
                });

                return loadTemplate('allEstates');
            })
            .then(template => {
                templateOffers = template;
                return loadNextEstates(template);
            })
            .catch(console.log);
    },
    addEstate() {
        let realEstateTypes;
        data.realEstateTypes()
            .then(types => {
                realEstateTypes = types;
                return loadTemplate('addEstate');
            })
            .then(template => {
                var html = template(realEstateTypes);
                $('#content').html(html);

                $('#btn-create').on('click', (ev) => {
                    let estateOffer = {
                        title: $('#tb-title').val(),
                        description: $('#tb-description').val(),
                        address: $('#tb-address').val(),
                        contact: $('#tb-contact').val(),
                        constructionYear: $('#tb-year').val() || 0,
                        sellingPrice: $('#tb-selling-price').val(),
                        rentingPrice: $('#tb-renting-price').val(),
                        type: $('#sel-type').val()
                    };

                    data.addEstate(estateOffer)
                        .then(window.router.navigate('/'))
                        .catch(error => {
                            console.log(error);
                            toastr.error(error.responseJSON.Message);
                        });

                    ev.preventDefault();
                    return false;
                });
            })
            .catch(console.log);
    },
    getEstateById(id) {
        let realEstateDetails;
        let commentsTemplate;
        data.getEstateById(id)
            .then(details => {
                realEstateDetails = new RealEstate(details);
                return loadTemplate('estateDetails');
            })
            .then(template => {
                let html = template(realEstateDetails);
                $('#content').html(html);

                $('#btn-add-comment').on('click', (ev) => {
                    let comment = {
                        realestateid: realEstateDetails.id,
                        content: $('#comment-content').val()
                    };

                    data.addCommnet(comment)
                        .then(newComment => {
                            let comment = new Comment(newComment);
                            let html = commentsTemplate([comment]);
                            $('#comments').append(html);
                        })
                        .catch(error => {
                            console.log(error);
                            toastr.error(error.responseJSON.Message);
                        });

                    ev.preventDefault();
                    return false;
                });

                return loadTemplate('comments');
            })
            .then(template => {
                commentsTemplate = template;
                var html = template(realEstateDetails.comments);
                $('#comments').html(html);
            })
            .catch(error => {
                console.log(error);
                toastr.error(error.responseJSON.Message);
            });
    },
    //commentsByEstateId(realEstateId){
    //    var comments;
    //    data.getCommentsByEstateId(realEstateId)
    //    .then(com=>{
    //        comments=com;
    //        return loadTemplate('commentsSection')
    //    })
    //    .then(template=>{
    //        var html=template();
    //        $('#content').html(html);

    //        $('#btn-add-comment').on('click', (ev)=>{
    //            let comment={
    //                realestateid:realEstateId,
    //                content:$('#comment-content').val()
    //            };

    //            data.addCommnet(comment)
    //            .then(newComment=>{
    //                comments.push(newComment);
    //                var newHtml=template(comments);
    //                $('#content').html(html);
    //            })
    //            .catch(console.log);

    //            ev.preventDefault();
    //            return false;
    //        });

    //        return loadTemplate('comments');
    //    })
    //    .then(template=>{
    //        var html=template(comments);
    //        $('#comments').html(html);
    //    })
    //    .catch(console.log);
    //},
    login() {
        loadTemplate('userLogin')
            .then((template) => {
                var html = template();
                $('#content').html(html);

                $("#btn-login").on("click", (ev) => {
                    let userData = {
                        username: $('#tb-username').val(),
                        password: $('#tb-password').val()
                    };

                    data.login(userData)
                        .then((userDetails) => {
                            userLoggedIn();
                            window.router.navigate('/');
                        })
                        .catch(error => {
                            toastr.error(error);
                        });

                    ev.preventDefault();
                    return false;
                });
            });
    },
    register() {
        loadTemplate('userRegistration')
            .then((template) => {
                var html = template();
                $('#content').html(html);

                $("#btn-register").on("click", (ev) => {
                    let userData = {
                        username: $('#tb-username').val(),
                        email: $('#tb-email').val(),
                        password: $('#tb-password').val()
                    };

                    data.register(userData)
                        .then(() => {
                            return data.login(userData);
                        })
                        .then((userDetails) => {
                            userLoggedIn();
                            window.router.navigate('/');
                        })
                        .catch(error => {
                            for (let modelStateMessages of Object.values(error.responseJSON.ModelState)) {
                                for (let message of modelStateMessages) {
                                    toastr.error(message);
                                }
                            }
                        });
                    ev.preventDefault();
                    return false;
                });
            });
    },
    logout() {
        data.logout();
        $('.visible-loggedout').show();
        $('.visible-loggedin').hide();
        window.router.navigate('/');
    }
};

function userLoggedIn() {
    $('.visible-loggedout').hide();
    $('.visible-loggedin').show();
    data.loggedInUsername()
        .then(username => {
            $('#logged-user')
                .text(username)
                .attr("href", "#/users/" + username);
        });
}

function loadNextEstates(template) {
    let $offersContainer = $('#offers');
    let page = $offersContainer.attr('page-number') | 0;
    return data.realEstates(page * 10)
        .then(estates => {
            var html = template(estates);
            $('#offers').append(html);
            $offersContainer.attr('page-number', page + 1);
            if (estates.length < 10) {
                $('#btn-more').hide();
            }
        });
}

export { controller };
