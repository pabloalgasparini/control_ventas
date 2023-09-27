import { connect } from 'mongoose'


// Conexión a la base de datos de MongoDB
export async function connectToMongo () {
  connect("mongodb://127.0.0.1:27017/gestor_ventas")
    .then((db) => console.log('MongoDB is connected to', db.connection.db.databaseName))
    .catch(err => console.log(err))
}
