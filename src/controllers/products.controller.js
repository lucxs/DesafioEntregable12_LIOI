import ProductsServices from "../services/products.service.js";
import productsDAO from "../dao/products.dao.js";
import productRepository from "../repositories/products/product.repository.js";
class ProductsController{

        constructor(){
            this.daoFiltered = new productRepository(productsDAO)
            this.service = new ProductsServices(productsDAO);
        }

        async getProds(){

        return await this.service.getProducts();
            
        }

        getProductById(id){

                return this.service.getProdById(id);
        }

        async addProduct(data){
        
            try {

                const productChecked = await this.daoFiltered.checkingProduct(data)
            const actualprods =await this.service.getProducts();
            const newfilter =await actualprods.filter(element => element.code == data.code)
            if (newfilter.length > 0) {
               
                     const messageError = {"messageError":"Este producto con code: "+data.code+" Ya se encuentra existente en otro producto"}
                 
                     return messageError
                     
            }else{

                return await this.service.addProduct(productChecked);

            }
                
            } catch (error) {

                req.logger.error("Error products.controller: ", error);
                
            }
            
        }

         async updateProduct(id, newObject){

            return await this.service.updateProduct(id, newObject);
        }

        deleteProduct(data){

            return this.service.deleteProduct(data)

          }

          prodsPaginated(limit =10, page=1, query=undefined, sort=undefined){
            
          return  this.service.prodsPaginated(limit, page, query, sort)
        }


}

const prodsController = new ProductsController();

export default prodsController;