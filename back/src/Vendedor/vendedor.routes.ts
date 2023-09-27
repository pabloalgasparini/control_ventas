import { Router } from "express";
import { VendedorService } from "./vendedor.service";
import  mongoose  from "mongoose";
function startVendedorRouter(vendedorService: VendedorService){

    const vendedorRouter = Router()

    // rutas
    vendedorRouter.get('/', async(req,res)=>{
        const allVendedores = await vendedorService.list()
        res.status(200).json(allVendedores)
    })


    vendedorRouter.get('/buscar', async (req, res) => {
        const id = req.header('idHeader') || '';
    
        try {
            const isValidObjectId = mongoose.isValidObjectId(id);
    
            if (!isValidObjectId) {
                return res.status(400).json({ error: 'ID inválido' });
            }
    
            const buscarVendedor = await vendedorService.find(id);
            res.status(201).json(buscarVendedor);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });
    
    


    vendedorRouter.post('/crear', async(req,res)=>{
        const { nombre, direccion, telefono, email, password } = req.body
        const newVendedor = await vendedorService.create(nombre, direccion, telefono, email, password)
        res.status(201).json(newVendedor)
    })

    vendedorRouter.patch('/actualizar', async(req,res)=>{
        const {nombre,direccion, telefono, email, password } = req.body
        const id = req.header('idHeader') || '';
    
        try {
            const isValidObjectId = mongoose.isValidObjectId(id);
    
            if (!isValidObjectId) {
                return res.status(400).json({ error: 'ID inválido' });
            }
    
            const actualizarVendedor = await vendedorService.update(id,nombre,direccion,telefono,email,password);
            res.status(201).json(actualizarVendedor);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    })

    vendedorRouter.patch('/borrar', async(req,res)=>{
        const id = req.header('idHeader') || '';
    
        try {
            const isValidObjectId = mongoose.isValidObjectId(id);
    
            if (!isValidObjectId) {
                return res.status(400).json({ error: 'ID inválido' });
            }
    
            const borrarVendedor = await vendedorService.delete(id);
            res.status(201).json(borrarVendedor);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    })

    return vendedorRouter
}

export { startVendedorRouter } 