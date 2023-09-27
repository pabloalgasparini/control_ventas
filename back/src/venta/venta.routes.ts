import { Router } from "express";
import { VentaService } from '../venta/venta.service'
import mongoose from "mongoose";
import { ProductoModelMongo } from "../producto/producto.model";
// import { Producto } from "../producto/producto.entity";
import { VendedorModelMongo } from "../Vendedor/vendedor.model";
import { UsuarioModelMongo } from "../Usuario/usuario.model";
import { Producto } from "../producto/producto.entity";

function startVentaRouter(ventaService: VentaService) {
    const ventaRouter = Router();

    // rutas
    ventaRouter.get('/', async (req, res) => {
        const allVentas = await ventaService.list()
        res.status(200).json(allVentas)
    })

    ventaRouter.get('/buscar', async (req, res) => {
        const id = req.header('idHeader') || ''
        try {
            const isValidObjectId = mongoose.isValidObjectId(id);

            if (!isValidObjectId) {
                return res.status(400).json({ error: 'ID inválido' });
            }

            const buscarVenta = await ventaService.find(id);
            res.status(201).json(buscarVenta);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    })

    ventaRouter.post('/crear', async (req, res) => {

        var subtotal = 0

        const { productos } = req.body
        
        /* 
        { "productos":[{
        "producto": "asd12rt132gwea",
        "cantidad": 13
        }], 
        "vendedor", 
        "comprador", 
        "cantidad" }
        */
        // const vendedorInfo = await VendedorModelMongo.findById(vendedor)
        // if (!vendedorInfo) {
        //     return res.status(404)
        // }
        // const compradorInfo = await UsuarioModelMongo.findById(comprador)
        // if (!compradorInfo) {
        //     return res.status(404)
        // }.
        for (const producto of productos) {
            const productoEncontrado = await ProductoModelMongo.findById(producto.producto)
            const thisStock = productoEncontrado?.stock ?? 0
            if(thisStock < producto.cantidad){
                return res.status(400).json({})
            }
            await productoEncontrado?.updateOne({
                stock: thisStock - producto.cantidad
            })
            return res.status(200).json({})
            break
        }

        console.log({
            productos,
            // vendedor: {
            //     id: vendedorInfo._id,
            //     nombre: vendedorInfo.nombre
            // },
            // comprador: compradorInfo.nombre,
        });
        //    for (const { nombre_producto, precio_unitario, stock } of productos.producto) {
        //         let productDoc: Producto[] = await ProductoModelMongo.find({ nombre_producto })
        //         // let stockProd: Producto = productDoc.stock
        //         if (!productDoc) {
        //             console.log('ingrese productos');
        //         }

        //         if (productDoc < cantidad) {

        //         }
        //     }



        // const nuevaVenta = await ventaService.create(productos, vendedor, comprador, cantidad, precio, totalVenta)
        res.status(201).json({})
    })

    // ventaRouter.patch('/actualizar', async(req,res)=>{
    //     const {nombre,direccion, telefono, email, password } = req.body
    //     const id = req.header('idHeader') || '';

    //     try {
    //         const isValidObjectId = mongoose.isValidObjectId(id);

    //         if (!isValidObjectId) {
    //             return res.status(400).json({ error: 'ID inválido' });
    //         }

    //         const actualizarVendedor = await vendedorService.update(id,nombre,direccion,telefono,email,password);
    //         res.status(201).json(actualizarVendedor);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: 'Error interno del servidor' });
    //     }
    // })

    // ventaRouter.patch('/borrar', async(req,res)=>{
    //     const id = req.header('idHeader') || '';

    //     try {
    //         const isValidObjectId = mongoose.isValidObjectId(id);

    //         if (!isValidObjectId) {
    //             return res.status(400).json({ error: 'ID inválido' });
    //         }

    //         const borrarVendedor = await vendedorService.delete(id);
    //         res.status(201).json(borrarVendedor);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: 'Error interno del servidor' });
    //     }

    // })

    return ventaRouter
}

export { startVentaRouter } 
