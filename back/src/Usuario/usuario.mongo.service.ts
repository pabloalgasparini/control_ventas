import { Persona } from "../persona/perosona.entity";
import { UsuarioModelMongo } from "./usuario.model";
import { UsuarioService } from "./usuario.service";

export class UsuarioServiceMongo implements UsuarioService {
    model = UsuarioModelMongo;

    async list(): Promise<Persona[]> {
        return this.model.find({ isActive: true})
    }

    async find (id: string): Promise<Persona | null> {
        try{
            const usuario = await this.model.findById(id)
            if(usuario){
                console.log(usuario);
            }
            return usuario || null;
        }catch(error){
            console.error('Error al buscar usuario: ' + error);
            throw error;
        }
    }

    async create(nombre: string, direccion: string, telefono: number, email:string, password: string): Promise<Persona | null> {
        const usuario = new this.model({
            nombre,
            direccion,
            telefono,
            email,
            password,
            isActive: true
        })

        try{
            const nuevoUsuario = await usuario.save()
            return nuevoUsuario
        }catch(error){
            console.log('Error al crear usuario: ' + error);
            throw error
        }
    }

    async update(id: string, nombre: string, direccion: string, telefono: number, email: string, password: string): Promise<Persona | null> {
        try{
            const usuario = await this.model.findByIdAndUpdate(id, {
                nombre,
                direccion,
                telefono,
                email,
                password,
            }, { new: true})

            return usuario || null
        }catch(error) {
            console.log('Error al actualizar usuario: ' + error);
            throw error
        }
    }

    async delete (id: string): Promise<Persona | null>{
        try{
            const borrarUsuario = await this.model.findByIdAndUpdate(id, { isActive: false}, {new: true})
            console.log('Usuario borrado correctamente: ' + borrarUsuario);
            return borrarUsuario || null;
        }catch(error) {
            console.log('Error al borrar usuario: ' + error);
            throw error;
        }
    }
}