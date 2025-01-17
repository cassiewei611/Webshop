const express = require('express');
import * as productController from './productsController';

export const productRouter = express.Router();

productRouter.get('/products', productController.getProducts);
productRouter.get('/products/:productId', productController.getProductById);
export default productRouter;