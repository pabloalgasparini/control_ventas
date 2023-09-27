import { Router } from "express";
import { UsuarioService } from "./usuario.service";
import mongoose from "mongoose";

function startUsuarioRouter(usuarioService: UsuarioService){

    const usuarioRouter = Router();

    // rutas
    usuarioRouter.get('/', async(req,res)=>{
        const allUsuarios =await usuarioService.list();
        res.status(200).json(allUsuarios);
    })

    usuarioRouter.get('/buscar', async(req,res)=>{
        const id = req.header('idHeader') || '';

        try {
            const isValidObjectId = mongoose.isValidObjectId(id);

            if (!isValidObjectId) {
                return res.status(400).json({error: 'ID inválido'});
            }
            const buscarUsuario = await usuarioService.find(id)
            res.status(200).json(buscarUsuario)
        }catch (error){
            console.error(error);
            res.status(500).json({error: 'Error interno del servidor'})
        }
        
    });

    
    usuarioRouter.post('/crear', async(req,res)=>{
        const { nombre, direccion, telefono, email, password } = req.body
        const newUsuario = await usuarioService.create(nombre, direccion, telefono, email, password)
        res.status(201).json(newUsuario)
    })

    usuarioRouter.patch('/actualizar', async(req,res)=>{
        const {nombre,direccion, telefono, email, password } = req.body
        const id = req.header('idHeader') || '';
    
        try {
            const isValidObjectId = mongoose.isValidObjectId(id);
    
            if (!isValidObjectId) {
                return res.status(400).json({ error: 'ID inválido' });
            }
    
            const actualizarUsuario = await usuarioService.update(id,nombre,direccion,telefono,email,password);
            res.status(201).json(actualizarUsuario);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    })

    usuarioRouter.patch('/borrar', async(req,res)=>{
        const id = req.header('idHeader') || '';
    
        try {
            const isValidObjectId = mongoose.isValidObjectId(id);
    
            if (!isValidObjectId) {
                return res.status(400).json({ error: 'ID inválido' });
            }
    
            const borrarUsuario = await usuarioService.delete(id);
            res.status(201).json(borrarUsuario);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    })
    return usuarioRouter
}

export { startUsuarioRouter }