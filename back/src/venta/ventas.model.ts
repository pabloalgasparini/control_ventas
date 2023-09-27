import { Schema, model, Types } from "mongoose";
import { Venta } from "./ventas.entity";



const VentaSchemaMongo = new Schema<Venta>({
    productos:[{
        producto: {type:Types.ObjectId,
            ref: 'Producto',
            required: true},
        cantidad: {
            type: Number,
            required: true
        },
    }],
    // vendedor:{
    //     type:Types.ObjectId,
    //     ref: 'Vendedor',
    //     required: true
    // },
    // comprador:{
    //     type:Types.ObjectId,
    //     ref: 'Usuario',
    //     required: true
    // },
    totalVenta:{
        type: Number,
        required: true
    }
},{
    timestamps: true,
    id: true
})

const VentaModelMongo = model<Venta>('Venta', VentaSchemaMongo)




export { VentaModelMongo } 