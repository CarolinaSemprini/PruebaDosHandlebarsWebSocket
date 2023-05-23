import { io } from 'socket.io-client'


const configureWebSockets = (io) => {
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");

    // Escuchar el evento de eliminación de un producto
    socket.on("deleteProduct", (productId) => {
      // Lógica para eliminar el producto
      // ...

      // Emitir el evento 'productDeleted' a todos los clientes conectados
      io.emit("productDeleted", productId);
    });

    // Manejar la desconexión del cliente
    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });
  });
};

export default configureWebSockets;
