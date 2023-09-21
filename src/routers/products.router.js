import { Router } from "express";
import prodsController from "../controllers/products.controller.js";
import { generateProducts } from "../utils/generate.js";
import CustomErrors from "../tools/CustomErrors.js";
import EErros from "../tools/EErrors.js";


const prodsRouter = Router();

//Mocks
prodsRouter.get('/mockingproducts', async(req,res)=>{

    
    res.send(generateProducts())
    req.logger.debug("Se generaron:",generateProducts().length," productos");

})

//Instancio el objeto de productManager

prodsRouter.get('/', async (req, res)=>{

    try {
                
        let LimitProducts = req.query.limit;
        let pageProducts = req.query.page;
        let queryProducts = req.query.marca;
        let sortProducts = req.query.sort;


            let prodsPaginated =await  prodsController.prodsPaginated(LimitProducts, pageProducts, queryProducts, sortProducts )
            
            res.send(prodsPaginated);

    } catch (error) {

        res.send(`El error es - ProductsRouter: ${error}`);
        
    }


})


//Filtro un producto por ID
prodsRouter.get('/:pid', async (req,res)=>{

    try {
        let id = req.params.pid;
        let filterId = await prodsController.getProductById(id);

     res.send(filterId)
    
} catch (error) {
    res.send(`El error es: ${error}`);
}

            
})

    //Creando y añadiendo productos nuevos

prodsRouter.post('/', async(req, res)=>{


        //Añado productos
                const dataProds = await req.body;
                const addingProd = await prodsController.addProduct(dataProds)

                if (addingProd.messageError) {
                    CustomErrors.createError("Product Creation Error","Existing product" ,addingProd.messageError, EErros.EXISTING_PRODUCT);
                    
                }

                res.status(200).send({"Producto agregado": addingProd})

        
})

//Actualizando Productos

prodsRouter.put('/:pid', async(req, res)=>{

try {

            //guardo en newObject lo que recibo del body para actualizar
     let newObject = await req.body;
     let pid = req.params.pid


      const result = await prodsController.updateProduct(pid, newObject);
            res.send(result)
    
} catch (error) {
    req.logger.error(error);
    res.status(500).send(error)
}

})


    //Borrando productos

prodsRouter.delete('/', async(req, res)=>{

try {
         prodsController.deleteProduct(req.query.pid)

         res.status(200).send({"Producto de ID":req.query.pid+" eliminado"})
    
} catch (error) {

    res.status(404).send(error);
    
}


})

export {prodsRouter}