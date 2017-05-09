//import {Navigo} from 'navigo';
import {controller} from 'controller';

let router = new Navigo(null, true);

router
    .on("home", controller.home)
    // .on("home/:params", (params)=>controller.search(params.params))
    // .on("materials", controller.addMaterial)
    // .on("materials/:id", (params)=>controller.details(params.id))
    //.on("users/:username", (params)=>controller.profile(params.username))
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


