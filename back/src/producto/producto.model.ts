import { Schema, model} from "mongoose"
import { Producto } from "./producto.entity"

const ProductoSchemaMongo = new Schema<Producto>({
    nombre_producto: {
        type: String,
        required: true,
        unique: true
    },
    precio_unitario: {
        type: Number,
        required: true
    },
    precio_cantidad:{
        type: Number,
        required: true
    },
    isActive:{
        type: Boolean,
        default: true
    },
    stock:{
        type: Number,
        required: true
    }
},{
    timestamps: true,
    id: true
})

const ProductoModelMongo = model<Producto>('Producto', ProductoSchemaMongo)

export { ProductoModelMongo } 