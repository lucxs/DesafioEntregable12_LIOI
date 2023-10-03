import passport from 'passport';

//Middleware generico para pasar el userData

const middlewarePassportUser = async (req, res, next) => {
	passport.authenticate('current', { session: false }, (err, usr, info) => {
		if (err) {
			next(err);
		}

		if (!usr) {
			req.user = null;
		}

		req.user = usr;
		next();
	})(req, res, next);
};

		//paso solo el rol del user a nivel app
const middlewarePassportUserOnlyRoleAndId = async (req, res, next) => {
	passport.authenticate('current', { session: false }, (err, usr, info) => {
		if (err) {
			next(err);
		}

		if (!usr) {
			req.user = null;
		}

		req.user = {"id":usr.user._id, "role":usr.user.role};
		next();
	})(req, res, next);
};


const middlewarePassportJWT = async (req, res, next) => {
	passport.authenticate('current', { session: false }, (err, usr, info) => {
		if (err) {
			next(err);
		}

		if (!usr) {
            return res.send({"message":"error de usuario"});
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

		   	 if (usr.user.role === "admin" ||usr.user.role ==="premium" ) {

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



export { middlewarePassportJWT,middlewarePassportJWTAdmin, middlewarePassportJWTUser,middlewareAccessToCart, middlewarePassportUser, middlewarePassportUserOnlyRoleAndId };


