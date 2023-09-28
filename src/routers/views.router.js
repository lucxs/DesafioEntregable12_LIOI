import express from 'express'
import prodsController from '../controllers/products.controller.js';
import {middlewarePassportJWT, middlewarePassportJWTAdmin,middlewarePassportJWTUser, middlewareAccessToCart,middlewarePassportUser} from '../middlewares/auth.middleware.js'
import cartsController from '../controllers/carts.controller.js';
const viewRouter =express();


//Paso la lista de productos a home.handlebars y el user actualmente loggeado
viewRouter.get('/',middlewarePassportUser, async(req, res)=>{
            
            
            let LimitProducts = req.query.limit;
            let pageProducts = req.query.page;
            let queryProducts = req.query.marca;
            let sortProducts = req.query.sort;
            let user = null
            if (req.user.user) {
                user = {"name":req.user.user.first_name,
            "role":req.user.user.role,
             "cid":req.user.user.cart,
            }
            }
             
    try {

    
            const prodsPaginate = await prodsController.prodsPaginated(LimitProducts, pageProducts, queryProducts, sortProducts )

           prodsPaginate.query = queryProducts;
           prodsPaginate.sort = sortProducts;

            req.logger.debug(prodsPaginate);

            //Filtros de seguridad
            if (pageProducts > prodsPaginate.totalPages || pageProducts < 1) {

                    let text = "El numero de pagina que intenta setear no existe"
                    return res.render('serverError', {text})
            
            }else if(pageProducts == ""){
                return res.render('home', {prodsPaginate, user, role})

            }else if(/^[A-Za-z]+$/.test(pageProducts) && !pageProducts == ""){
                let text = "Para el numero de pagina debe setear un numero"
                return res.render('serverError', {text})
            }else{

           return res.render('home', {prodsPaginate, user})
        }
        
    } catch (error) {

        req.logger.error("Algo salió mal =>", error);
        
    }

})


viewRouter.get('/adminDashboard',middlewarePassportJWTAdmin,async(req, res)=>{

    const user =  req.user.user

    //Si user es premium le paso el id a adminDashboard
    if (user.role ==="premium") {

       const userID = user._id

    res.render('adminDashboard',{userID});
        
    }else{
        res.render('adminDashboard');

    }
    


}) 

//Renderizo carts.handlebars
viewRouter.get('/carts/:cid',middlewareAccessToCart, async(req,res)=>{

        let cid = req.params.cid;
        let user = null
            if (req.user.user) {
                user = {"name":req.user.user.first_name,
            "role":req.user.user.role,
             "cid":req.user.user.cart,
            }
            }
    
try {

    const cartById = await cartsController.getCartOnviews(cid)

    req.logger.debug(cartById);
    
    res.render('carts', {cartById, user});

    
} catch (error) {

    res.render(error)
    
}


})


//register

viewRouter.get('/register',(req,res)=>{

    
         res.render('register')
   

})

//Login

viewRouter.get('/login',(req,res)=>{

         res.render('login')
    
})


//current

viewRouter.get('/current',middlewarePassportJWT,(req, res) => {
         const user = req.user;
         req.logger.debug("ESTE ES EL USER:",user);
          res.render('privateCurrent',{user})
});


//chat


viewRouter.get('/chat',middlewarePassportJWTUser, (req, res)=>{

        const user = req.user;
        res.render('chat',{user})

})

//ServerError

viewRouter.get('/serverError', (req,res)=>{

        res.render('serverError')

})

export default viewRouter;