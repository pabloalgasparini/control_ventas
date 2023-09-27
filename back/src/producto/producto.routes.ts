import { Router } from "express";
import { ProductoService } from "./producto.service";
import mongoose from "mongoose";

function startProductoRouter(productoService: ProductoService){

    const productoRouter = Router();

    // rutas
    productoRouter.get('/', async(req,res)=>{
        const allProductos =await productoService.list();
        res.status(200).json(allProductos);
    })

    productoRouter.get('/buscar', async(req,res)=>{
        const id = req.header('idHeader') || '';

        try {
            const isValidObjectId = mongoose.isValidObjectId(id);

            if (!isValidObjectId) {
                return res.status(400).json({error: 'ID inválido'});
            }
            const buscarProducto = await productoService.find(id)
            res.status(200).json(buscarProducto)
        }catch (error){
            console.error(error);
            res.status(500).json({error: 'Error interno del servidor'})
        }
        
    });

    
    productoRouter.post('/crear', async(req,res)=>{
        const { nombre_producto, precio_unitario, precio_cantidad, stock } = req.body
        const newProducto = await productoService.create(nombre_producto, precio_unitario, precio_cantidad, stock)
        res.status(201).json(newProducto)
    })

    productoRouter.patch('/actualizar', async(req,res)=>{
        const {nombre_producto, precio_unitario, precio_cantidad } = req.body
        const id = req.header('idHeader') || '';
    
        try {
            const isValidObjectId = mongoose.isValidObjectId(id);
    
            if (!isValidObjectId) {
                return res.status(400).json({ error: 'ID inválido' });
            }
    
            const actualizarProducto = await productoService.update(id,nombre_producto, precio_unitario, precio_cantidad);
            res.status(201).json(actualizarProducto);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    })

    productoRouter.delete('/borrar/:id', async(req,res)=>{
        const {id} = req.params;
    
        try {
            const isValidObjectId = mongoose.isValidObjectId(id);
    
            if (!isValidObjectId) {
                return res.status(400).json({ error: 'ID inválido' });
            }
    
            const borrarProducto = await productoService.delete(id);
            res.status(201).json(borrarProducto);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    })
    return productoRouter
}

export { startProductoRouter }