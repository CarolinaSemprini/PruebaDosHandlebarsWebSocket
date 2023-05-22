import express from 'express';
import ProductManager from '../controllers/ProductManager.js';
// Crear el enrutador
const router = express.Router();
const productManager = new ProductManager();

router.get('/', async (req, res) => {
  try {
    const allProducts = await productManager.getProducts();
    res.render('home', {
      title: 'Express avanzado',
      allProducts,
    });
  } catch (error) {
    res.status(500).send('Error al obtener los productos.');
  }
});

router.get('/realTimeProducts', async (req, res) => {
  try {
    const allProducts = await productManager.getProducts();
    res.render('realTimeProducts', {
      title: 'Express avanzado',
      allProducts,
    });
  } catch (error) {
    res.status(500).send('Error al obtener los productos.');
  }
});



// Ruta principal - Página de inicio
router.get('/', async(req, res) => {
  res.render('home');
});

// Ruta para la vista en tiempo real de productos
router.get('/realtimeproducts', async (req, res) => {
  res.render('realTimeProducts');
});





export default router;
