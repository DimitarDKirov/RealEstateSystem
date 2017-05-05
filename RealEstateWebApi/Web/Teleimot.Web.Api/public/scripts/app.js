let router = new Navigo(null, true);

router
    .on("home", controller.home)
    // .on("home/:params", (params)=>controller.search(params.params))
    // .on("materials", controller.addMaterial)
    // .on("materials/:id", (params)=>controller.details(params.id))
    //.on("users/:username", (params)=>controller.profile(params.username))
    .on("login", controller.login)
    //.on("register", controller.register)
    .on("logout", controller.logout)
    .on('*', ()=>router.navigate("/home"))
    .resolve();


