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
                            router.navigate('/');
                        })
                        .catch(error=> {
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
                                    router.navigate('/');
                                })
                                .catch(error=> {
                                    console.log(error.responseJSON.ModelState);
                                    //toastr.error(error.responseText['message']);
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
                .attr("href", href = "#/users/" + username);
        });
}
