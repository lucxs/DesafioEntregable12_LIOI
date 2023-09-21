import passport from 'passport';


const middlewarePassportJWT = async (req, res, next) => {
	passport.authenticate('current', { session: false }, (err, usr, info) => {
		if (err) {
			next(err);
		}

		if (!usr) {
            const message = "No tiene permitido el acceso a esta seccion"
			res.redirect('/serverError');
		}

		req.user = usr;
		next();
	})(req, res, next);
};

// middleware for role admin administration

const middlewarePassportJWTAdmin = async (req, res, next) => {
	passport.authenticate('current', { session: false }, (err, usr, info) => {
		
		if (err) {
			next(err);
		}
		
			if(!usr){

				return res.send({"message":"error de usuario"});
	   
		   }

		   	 if (usr.user.role === "admin") {

					req.user =  usr;
			 		return next();
   
			 }else{

				return res.send({"message":"error de usuario: No puede ingresar, no tiene privilegios de ADMIN"});
			 }
   
		
		
	})(req, res, next);
};

// middleware for role users adminitration

const middlewarePassportJWTUser = async (req, res, next) => {
	passport.authenticate('current', { session: false }, (err, usr, info) => {
		
		if (err) {
			next(err);
		}
		
			if(!usr){

				return res.send({"message":"error de usuario"});
	   
		   }

		   	 if (usr.user.role === "user") {

					req.user =  usr;
			 		return next();
   
			 }else{

				return res.send({"message":"error de usuario: Solo acceso exclusivo a usuarios"});
			 }
   
		
		
	})(req, res, next);

};

const middlewareAccessToCart = async (req, res, next) => {
	passport.authenticate('current', { session: false }, (err, usr, info) => {
		
		if (err) {
			next(err);
		}
		
			if(!usr){

				return res.send({"message":"error de usuario"});
	   
		   }

		   	 if (usr.user.role === "admin") {

				 res.send({"message":"error de usuario: Solo acceso exclusivo a usuarios, por favor inicie sesion como usuario"});
					
			 }else{

				req.user =  usr;
			 		return next();

			 }
   
		
		
	})(req, res, next);


	
};



export { middlewarePassportJWT,middlewarePassportJWTAdmin, middlewarePassportJWTUser,middlewareAccessToCart };


