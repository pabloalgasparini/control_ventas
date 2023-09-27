import { Persona } from "../persona/perosona.entity";
import { VendedorService } from "./vendedor.service";

export class VendedorServiceFileSystem implements VendedorService{
    list(): Promise<Persona[]>{
        throw new Error('Metodo no implementado');
    }

    find (id: string): Promise<Persona | null>{
        throw new Error('Metodo no implementado');
    }

    create(nombre: string, direccion: string, telefono: number, email: string, password: string): Promise<Persona | null> {
        throw new Error('Metodo no implementado');
    }

    update(id:string,nombre: string, direccion: string, telefono: number, email: string, password: string): Promise<Persona | null> {
        throw new Error('Metodo no implementado')
    }

    delete(id: string): Promise<Persona | null> {
        throw new Error('Metodo no implementado')
    }
}