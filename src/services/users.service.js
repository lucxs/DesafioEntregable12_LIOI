
export default class UserService{

        constructor(dao){

         this.dao = dao;

        }

        async createUser(userData){
            try {

                return await this.dao.addUser(userData);
                
            } catch (error) {

                req.logger.error("Error en la capa de servicio metodo createUser:",error);
                
            }
    

    }

    async getAllUsers(){

        try {
                return await this.dao.getAllUsers()
            
        } catch (error) {

            req.logger.error("Error capa de servicio Getallusers: ", error);
        }
    }

    async getById(id){
        try {
                return await this.dao.getUserById(id)
        } catch (error) {

                req.logger.error("Error en la capa de servicio obteniendo userById:",error);
            
        }
    }

    
}




