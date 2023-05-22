import { Server } from 'socket.io';
import ProductManager from './controllers/ProductManager.js';

// Crear una instancia de Socket.io y adjuntarla al servidor HTTP existente
const io = new Server(server);

// Crear una instancia de ProductManager
const productManager = new ProductManager();

// Manejar la conexión de un cliente WebSocket
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Enviar todos los productos al cliente cuando se conecte
  socket.emit('products', productManager.getProducts());

  // Manejar el evento de agregar un producto
  socket.on('addProduct', (productData) => {
    const newProduct = productManager.addProduct(productData);

    // Enviar el producto agregado a todos los clientes conectados
    io.emit('productAdded', newProduct);
  });

  // Manejar el evento de eliminar un producto
  socket.on('deleteProduct', (productId) => {
    const deletedProduct = productManager.deleteProduct(productId);

    // Enviar el producto eliminado a todos los clientes conectados
    io.emit('productDeleted', deletedProduct);
  });

  // Manejar la desconexión de un cliente WebSocket
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});
