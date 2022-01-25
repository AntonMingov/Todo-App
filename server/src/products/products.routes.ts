import express from 'express';
import * as productController from '../products/products.controller'

let router = express.Router()

router.post('/addProduct', productController.AddProduct);
router.get('/getAllProducts', productController.GetAllProducts);
router.delete('/removeProduct', productController.RemoveProduct);

export default router