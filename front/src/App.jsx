import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [producto, setProducto] = useState([])
  const [newProduct, setNewProduct] = useState({nombre_producto:"",precio_unitario:0, precio_cantidad:0,stock:0})


  const fetchProductos = async () =>{
    const getProducto =  await axios.get('http://localhost:3000/api/producto/')
    console.log(getProducto.data);
    setProducto(getProducto.data)

  }

  const agreagarProducto = async (newProduct) =>{
    try {
      const addProducto = await axios.post('http://localhost:3000/api/producto/crear',newProduct)
      console.log(addProducto.data.newProduct);
      fetchProductos()
    }catch(err){
      console.log(err)
    }
  }

  const venderProducto = async (id)=>{
    try {
      const productos={productos:[{producto:id, cantidad:1}]}
      /* 
        { 
          "productos":[{
          "producto": "asd12rt132gwea",
          "cantidad": 13
          }], 
          "vendedor", 
          "comprador", 
          "cantidad" 
        }
        */
      await axios.post('http://localhost:3000/api/venta/crear',productos)
      fetchProductos()
    } catch (error) {
      console.log(error);
    }
  }

  const borrarProducto = async (id)=>{
    try {
      
      await axios.delete(`http://localhost:3000/api/producto/borrar/${id}`)

      fetchProductos()
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() =>{fetchProductos()}, [])
  return (<>
    <div className='container'>
      <h1>Contro-Ventas</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Nombre Producto</th>
              <th>Precio</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {producto.map((product, y)=>(
              <tr key={y} id={product._id}>
              <td>{product.nombre_producto}</td>
              <td >{product.precio_unitario}</td>
              <td>{product.stock}</td>
              <td><button type='button' className="btn btn-primary" onClick={()=>borrarProducto(product._id)}>Eliminar</button></td>
              <td><button type='button' className="btn btn-primary" onClick={()=>venderProducto(product._id)}>Comprar</button></td>
            </tr>
            ))}
            
          </tbody>
        </table>
      </div>
      <div className='botones'>
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{margin:'10px'}}>Agregar</button>
          </div>
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Agrega un nuevo producto</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="form-floating mb-3">
                    <input 
                      type="text" 
                      className="form-control" 
                      id="floatingInput" 
                      placeholder="Notebook"
                      onChange={(e) => setNewProduct({ ...newProduct, nombre_producto: e.target.value })}  
                    />
                    <label htmlFor="floatingInput">Nombre</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input 
                      type="number" 
                      className="form-control" 
                      id="floatingInput" 
                      placeholder="Red Dragon"
                      onChange={(e) => setNewProduct({ ...newProduct, precio_unitario: e.target.value })}  
                    />
                    <label htmlFor="floatingPassword">Precio Unitario</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input 
                    type="number" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="200000"
                    onChange={(e) => setNewProduct({ ...newProduct, precio_cantidad: e.target.value })}
                  />
                    <label htmlFor="floatingPassword">Precio Cantidad</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input 
                      type="number" 
                      className="form-control" 
                      id="floatingInput" 
                      placeholder="10000"
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    />
                    <label htmlFor="floatingPassword">Stock</label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Atras</button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      agreagarProducto(newProduct)
                      setNewProduct({ nombre_producto: '', precio_unitario: '', precio_cantidad: 0, stock: 0 });
                    }}
                  >
                      Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
    </div>
  </>)
}

export default App
