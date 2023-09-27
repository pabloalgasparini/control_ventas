import express, { Application } from 'express'
import { connectToMongo } from './configs/database'

// import { TaskServiceMysql } from './tasks/services/task.mysql.service'
// import { TaskServiceFileSystem } from './tasks/services/task.filesystem.service'

import { startVendedorRouter } from './Vendedor/vendedor.routes'
import { VendedorServiceMongo } from './Vendedor/vendedor.mongo.service'
import { startUsuarioRouter } from './Usuario/usuario.routes'
import { UsuarioServiceMongo } from './Usuario/usuario.mongo.service'
import { startProductoRouter } from './producto/producto.routes'
import { ProductoServiceMongo } from './producto/producto.mongo.service'
import { startVentaRouter } from './venta/venta.routes'
import { VentaServiceMongo } from './venta/venta.mongo.service'
import cors from 'cors'
// función de inicio del servidor

export function startServer () {
  // instancia de express
  const app: Application = express()

  // middlewares
  app.use(express.json())
  app.use(cors())
  // rutas
 
  app.use('/api/vendedor', startVendedorRouter(new VendedorServiceMongo()))
  app.use('/api/usuario', startUsuarioRouter(new UsuarioServiceMongo()))
   app.use('/api/producto', startProductoRouter(new ProductoServiceMongo()))
   app.use('/api/venta', startVentaRouter(new VentaServiceMongo()))
  // levantar el servidor
  app.listen(3000, () => {
    // Conectarse a la base de datos

    // * MongoDB
    connectToMongo()
    // * MySQL
   // connectToMysql()

    // mensaje de éxito
    console.log('Server is running on port 3000')
  })

  return app
}
