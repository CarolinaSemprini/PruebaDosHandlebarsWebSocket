import express, {urlencoded} from "express"
import handlebars from 'express-handlebars'
import __dirname from "../utils.js"
import ProductRouter from "./router/product.routes.js"
import ProductManager from "./controllers/ProductManager.js"
import CartRouter from "./router/carts.routes.js"
import views from './router/views.routes.js'
import { Server } from 'socket.io';
import path from 'path';
import http from 'http';

const app= express()
const server = http.createServer(app);
const io = new Server(server);

const PORT=8080
const product=new ProductManager();


app.use(express.json())
app.use (express.urlencoded({extended:true}));


// Configuración de Handlebars como motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/src/views');

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
  
    // Manejador para la ruta POST del formulario
app.post('/productos', (req, res) => {
    // Lógica para procesar los datos del formulario
  
    // Emitir el evento a través de websockets
    io.emit('addProduct', allProducts);
    
  
    // Enviar una respuesta al cliente HTTP
    res.status(200).send('Producto agregado exitosamente');
  });
  
    // Evento para eliminar un producto
    socket.on('deleteProduct', (productId) => {
      // Lógica para eliminar el producto
      // ...
  
      // Emitir el evento 'productDeleted' a todos los clientes conectados
      io.emit('productDeleted', productId);
    });
  
    // Manejar la desconexión del cliente
    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });

// Middleware para el manejo de archivos estáticos
app.use(express.static(path.join(path.resolve(), 'public')));

app.use('/', views)
app.use("/api/products", ProductRouter)
app.use("/api/cart", CartRouter)
app.use("/realTimeProducts", views)

app.get("/", async(req,res)=>{
    let allProducts= await product.getProducts()
    res.render("home", {
        title:"Express avanzado",
        products: allProducts

    })
})





/*app.get( "/products", async(req,res)=>{
    //creo el limite que le paso a traves de query por navegador
    let limit=parseInt(req.query.limit);
    //si no se pasa un limite, entonces me devuelve todos los productos
    if(!limit)return res.send(await readProducts)
    //en caso de que si se pase un limit entonces me devuelve el producto indicado
    let allProduct=await readProducts
    let productLimit=allProduct.slice(0, limit)
    console.log(limit)
    res.send(productLimit)
});*/




/*app.get("*", (req, res) => {
    return res
      .status(404)
      .json({ status: "error", msg: "No se encuentra esa ruta", data: {} });
  });*/

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });