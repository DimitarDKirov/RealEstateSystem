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
                        username: $("#username").val(),
                        password: $("#password").val()
                    };

                    data.login(userData)
                        .then((userDetails) => {
                            userLoggedIn();
                            router.navigate('/');
                        })
                        .catch(console.log);

                    ev.preventDefault();
                    return false;
                });

                $("#btn-register").on("click", (ev) => {
                    let userData = {
                        "username": $("#username").val(),
                        "password": $("#password").val()
                    };

                    data.register(userData)
                        .then((userName) => {
                            return data.login(userData);
                        })
                        .then((userDetails) => {
                            userLoggedIn();
                            router.navigate('/');
                        })
                        .catch(console.log);
                    ev.preventDefault();
                    return false;
                });
            });
    },
    logout() {

    }
};
