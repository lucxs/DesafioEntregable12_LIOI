import UserService from "../services/users.service.js";
import userDao from "../dao/user.dao.js";
import UserRegisterRepository from "../repositories/users/register.repositories.js";


class UsersController {

    constructor(){
        //Creo en el constructor el dao con filtro por DTO
        this.daoFiltered = new UserRegisterRepository(userDao)
        this.service = new UserService(userDao);
    }

    async createUser(userData){

        try {
                    //Envio al DTO el objeto con la info del user a registrar
            const dataUserFiltered =await  this.daoFiltered.addUser(userData)

            return await this.service.createUser(dataUserFiltered);
        
        } catch (error) {

            req.logger.error("Error en la creación del user - userController");
            
        }
    }

    

    

    async getById(id){

        return await this.service.getById(id);
    }

    async getByEmail(email){
        const allUsers =await this.service.getAllUsers()
                const userByEmail = allUsers.find((user)=>user.email === email)
                return userByEmail;
    }

}

const userController = new UsersController();

export default userController;