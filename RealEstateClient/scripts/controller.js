import { data } from 'data';
import { loadTemplate } from 'templateLoader';

let controller = {
    home() {
        var realEstates;
        data.realEstates()
            .then(estates => {
                realEstates = estates;
                return loadTemplate('home');
            })
            .then(template => {
                var html = template(realEstates);
                console.log(realEstates);
                $('#content').html(html);
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
            });
    },
    getEstateById(id) {
        var realEstateDetails;
        data.getEstateById(id)
            .then(details => {
                return loadTemplate('addEstate');
            })
            .then(template => {
                var html = template(realEstateDetails);
                $('#content').html(html);
            })
            .catch(error => {
                console.log(error);
                toastr.error(error.responseJSON.Message);
            });
    },
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
        data.logout()
            .then(() => {
                $('.visible-loggedout').show();
                $('.visible-loggedin').hide();
            });
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

export { controller };
