import { Schema, model} from 'mongoose'
import{ Persona } from '../persona/perosona.entity'


const VendedorSchemaMongo = new Schema<Persona>({
    nombre: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    telefono: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    }
},{
    timestamps: true,
    id: true,
})

const VendedorModelMongo = model<Persona>('Vendedor', VendedorSchemaMongo)

export { VendedorModelMongo}