import { ObjectId } from "mongoose";
import { Producto } from "../producto/producto.entity";

interface ProductItem {
    producto: Producto,
    catidad: number
}


export interface Venta {
    id: string;
    productos: ProductItem[];
    // vendedor: ObjectId;
    // comprador: ObjectId
    // cantidad_producto:number
    precio_producto:number
    totalVenta:number
}
