import { Producto } from "./producto.entity";
import { ProductoModelMongo } from "./producto.model";
import { ProductoService } from "./producto.service";

export class ProductoServiceMongo implements ProductoService{
    model = ProductoModelMongo;

    async list(): Promise<Producto[]>{
        return this.model.find({isActive: true})
    }

    async find(id: string): Promise<Producto | null> {
        try {
            const producto = await this.model.findById(id);
            if(producto){
                console.log(producto);
            }
            return producto || null;
        }catch(error){
            console.error('Error al buscar producto: '+ error);
            throw error;
        }        
    }

    async create(nombre_producto: string, precio_unitario: number, precio_cantidad: number, stock: number):Promise<Producto | null> {
        const producto = new this.model({
            nombre_producto,
            precio_unitario,
            precio_cantidad,
            isActive: true,
            stock
        })

        try {
            const nuevoProducto = await producto.save()
            return nuevoProducto
        }catch(error) {
            console.log('Error al crear producto: ' + error);
            throw error
        }
    }

    async update(id: string, nombre_producto: string, precio_unitario: number, precio_cantidad: number):Promise<Producto | null> {
       
        try {
            const producto = await this.model.findByIdAndUpdate(id,{
                nombre_producto,
                precio_unitario,
                precio_cantidad
            },{ new:true})
    
            return producto
        }catch(error) {
            console.log('Error al actualizar producto: ' + error);
            throw error
        }
    }

    async delete(id: string): Promise<Producto | null> {
        try {
            const borrarProducto = await this.model.findById(id)
            await borrarProducto?.updateOne({isActive: false})
            console.log('Producto borrado corroctamente: ' + borrarProducto);
            return borrarProducto || null
        }catch(error) {
            console.log('Error al borrar producto: ' + error);
            throw error
        }
    }

    async actualiar_Stock(id: string, stock: number): Promise<Producto | null> {
        try {
            const nuevoStock = await this.model.findByIdAndUpdate(id,{
                stock: stock
            },{new: true});
            console.log('Stock actualizado', nuevoStock);
            return nuevoStock || null;
        }catch (error) {
            console.error('Error al actualizar Stock'+error);
            throw error;
        }
    }
}