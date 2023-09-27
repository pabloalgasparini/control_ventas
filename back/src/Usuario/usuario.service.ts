import { Persona } from "../persona/perosona.entity";

export interface UsuarioService {
    list(): Promise<Persona[]>
    find(id: string): Promise<Persona | null>
    create (nombre:string, direccion:string, telefono:number, email:string, password:string): Promise<Persona | null>
    update (id: string,nombre:string, direccion:string, telefono:number, email:string, password:string): Promise<Persona | null>
    delete (id: string): Promise<Persona | null>
}
