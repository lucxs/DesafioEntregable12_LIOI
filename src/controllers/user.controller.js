import UserService from "../services/users.service.js";
import userDao from "../dao/user.dao.js";
import UserRegisterRepository from "../repositories/users/register.repositories.js";
import MailingService from "../services/mail.service.js";

class UsersController {

    constructor(){
        //Creo en el constructor el dao con filtro por DTO
        this.daoFiltered = new UserRegisterRepository(userDao)
        this.service = new UserService(userDao);
        this.MailingService = new MailingService();
    }

    async createUser(userData){

        try {
                    //Envio al DTO el objeto con la info del user a registrar
            const dataUserFiltered =await  this.daoFiltered.addUser(userData)

            return await this.service.createUser(dataUserFiltered);
        
        } catch (error) {

            //req.logger.error("Error en la creación del user - userController",error);
            console.log("Error en la creación del user - userController",error);
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

    async SendResetPassword(email){

        const mailOptions = {
            from: 'Optics <lioilucas75@gmail.com>',
            to: `${email}`,
            subject:`resetPassword`,
            html: `<h1>You recently requested to reset your password. Use the button below to reset it. This password reset is only valid for the next hour.</h1>

            <div class="btn btn-info"><a href="http://localhost:8080/resetPassword/${email}">ResetPassword</a></div>
            `    
        };

       await this.MailingService.sendMail(mailOptions)

    }

}

const userController = new UsersController();

export default userController;