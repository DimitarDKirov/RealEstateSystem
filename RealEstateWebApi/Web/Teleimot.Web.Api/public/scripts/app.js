import {controller} from 'controller';

let router = new Navigo(null, true);

router
    .on("home", controller.home)
    .on("login", controller.login)
    .on("register", controller.register)
    .on("logout", controller.logout)
    .on("estates", controller.allEstates)
    .on("estate/add", controller.addEstate)
    .on("estate/details/:id", (params)=>controller.getEstateById(params.id))
    .on("estate/comments/:id", (params)=>controller.commentsByEstateId(params.id))
    .on('*', ()=>router.navigate("/home"))
    .resolve();

window.router=router;


