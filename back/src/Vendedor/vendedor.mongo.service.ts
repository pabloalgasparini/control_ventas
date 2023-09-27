import { Persona } from '../persona/perosona.entity';
import { VendedorModelMongo } from './vendedor.model';
import { VendedorService } from './vendedor.service';

export class VendedorServiceMongo implements VendedorService {

    model = VendedorModelMongo;

    async list(): Promise<Persona[]> {
        return this.model.find({ isActive: true });
    }

    async find(id: string): Promise<Persona | null> {
        try {
            
            const vendedor = await this.model.findById(id);
            if (vendedor) {
                console.log(vendedor);
            }
            return vendedor || null;
        } catch (error) {
            console.error('Error al buscar un vendedor:', error);
            throw error;
        }
    }

    async create(nombre: string, direccion: string, telefono: number, email: string, password: string): Promise<Persona | null> {
        const vendedor = new this.model({
            nombre,
            direccion,
            telefono,
            email,
            password,
            isActive: true, // Establecer como activo por defecto
        });

        try {
            const nuevoVendedor = await vendedor.save();
            return nuevoVendedor;
        } catch (error) {
            console.error('Error al crear un vendedor:', error);
            throw error;
        }
    }

    async update(id: string, nombre: string, direccion: string, telefono: number, email: string, password: string): Promise<Persona | null> {
        try {
              const vendedor = await this.model.findByIdAndUpdate(id, {
                nombre,
                direccion,
                telefono,
                email,
                password,
            }, { new: true });

            return vendedor || null;
        } catch (error) {
            console.error('Error al actualizar un vendedor:', error);
            throw error;
        }
    }

    async delete(id: string): Promise<Persona | null> {
        try {
           
            const borrarVendedor = await this.model.findByIdAndUpdate(id, { isActive: false }, { new: true });
            console.log("vendedor borrado correctamente", borrarVendedor);
            return borrarVendedor || null;
        } catch (error) {
            console.error('Error al desactivar un vendedor:', error);
            throw error;
        }
    }
    
}
