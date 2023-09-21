import { UsersModel } from "../models/userJWT.model.js";

class UserDao{

constructor(){

     this.model = UsersModel;

}

async getAllUsers(){
    try {

        return await this.model.find()
        
    } catch (error) {

        req.logger.error("Error en la capa de persistencia. Metodo getAllUsers:",error);
        
    }
}


async getUserById(id){

    try {
        return await this.model.findById(id)
        
    } catch (error) {

        req.logger.error("Error getUserById - Capa de persistencia(DAO)");
        
    }
}

async addUser(userData){
    try {
        
        return await this.model.create(userData);

    } catch (error) {

        req.logger.error("Error en la capa de persistencia. Metodo addUser:",error);
        
    }
}

}

const userDao = new UserDao();

export default userDao;