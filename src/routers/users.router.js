import { Router } from "express";
import passport from "passport";
import { generateToken } from "../middlewares/jwt.middleware.js";
const usersRouter = Router();



//Register passport
usersRouter.post('/', passport.authenticate('register',{failureRedirect: '/serverError'} ),
 async(req,res)=>{
    
    res.redirect('/login')

})


//Login con passport

 usersRouter.post(
    '/auth',
 passport.authenticate('login', {failureRedirect: '/serverError'}),
 async (req, res) =>{

        if (!req.user) return res.status(400).send('No user found');
        const user = req.user;
         const token=  generateToken(user);
         res.cookie("UserToken",token,{
             maxAge: 180000,
             httpOnly:true
         })
         
         res.redirect('/') 
        
       
    })


usersRouter.get('/logout',(req, res)=>{

    res.clearCookie('UserToken')
    res.redirect('/login')

})
export {usersRouter}

