import { Producto } from "./producto.entity";

export interface ProductoService {
    list(): Promise<Producto[]>;
    find(id: string): Promise<Producto | null>
    create(nombre_producto: string, precio_unitario: number, precio_cantidad: number, stock: number): Promise<Producto | null>
    update(id: string, nombre_producto: string, precio_unitario: number, precio_cantidad: number): Promise<Producto | null>
    delete(id: string): Promise<Producto | null>
    actualiar_Stock(id: string, stock:number): Promise<Producto | null>
}