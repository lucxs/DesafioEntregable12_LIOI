import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productsScheme = new mongoose.Schema({

    title:{
        type: String
    }, 
    description:{
        type: String
    },
    price:{
        type: Number
    },
    thumbnail:{
        type: String
    },
    code:{
        type:Number
    },
    stock:{
        type:Number
    },
    status:{
        type:Boolean
    },
    marca:{
        type:String
    },

    carts:{
            type: Array,
            default: []
    }

})

productsScheme.plugin(mongoosePaginate)

export const productsModel = mongoose.model("products", productsScheme)