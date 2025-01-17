import express = require('express');
import { createBasket, getBasket, addItemToBasket, updateItemQuantity, removeItemFromBasket } from './basketController';

export const basketRouter = express.Router();


basketRouter.post('/user/:userId/basket', createBasket);
basketRouter.get('/basket/:basketId', getBasket);
basketRouter.post('/basket/:basketId/items', addItemToBasket);
basketRouter.put('/basket/:basketId/items/:itemId', updateItemQuantity);
basketRouter.delete('/basket/:basketId/items/:itemId', removeItemFromBasket);
