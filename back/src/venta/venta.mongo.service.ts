import { Venta } from "./ventas.entity";
import { VentaModelMongo } from "./ventas.model";
import { VentaService } from "./venta.service";

export class VentaServiceMongo implements VentaService{
    
    model = VentaModelMongo

    async list(): Promise<Venta[]>{
        return this.model.find()
    }

    async find(id: string): Promise<Venta | null>{
        try{
            const venta = await this.model.findById(id)
            if(venta){
                console.log(venta);
            }else{
                console.log('No se encotró la venta');
            }
            return venta || null;
        }catch(error){
            console.error(error);
            throw error;
        }
    }

    async create(productos: string,  cantidad: number, precio: number, totalVenta: number): Promise<Venta | null> {
        const venta = new this.model({
            productos,
            cantidad,
            precio,
            totalVenta
        })

        try {
            const nuevaVenta = await venta.save()
            return nuevaVenta
        }catch(error){
            console.error(error)
            console.log('No se pudo generar Venta');
            throw error
        }
    }

    async update(id: string,productos: string,  cantidad: number, precio: number, totalVenta: number): Promise<Venta | null> {
        try {
            const venta= await this.model.findByIdAndUpdate(id,{
            productos,
            // vendedor,
            // comprador,
            cantidad,
            precio,
            totalVenta
            }, {new:true});
            return venta
        }catch(error){
            console.log('No se pudo actualizar Venta');
            console.error(error);
            throw error;
        }
    }

    async delete(id: string): Promise<Venta | null> {
        try{
            const borrarVenta = await this.model.findByIdAndDelete(id)
            console.log('La venta se borró correctamente: '+ borrarVenta);
            return borrarVenta
        }catch(error){
            console.error(error)
            console.log('No se pudo borrar venta');
            throw error
        }
    }
}