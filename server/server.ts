import { Request, Response, NextFunction } from 'express';
import productRoutes, { productRouter } from './product/productRouter';
import categoryRoutes, { categoryRouter } from './category/categoryRouter';
import userRouter from './user/userRouter';
import { basketRouter } from './basket/basketRouter';
const cors = require('cors');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());



// Middleware
app.use(express.json());

// Routes
app.use(categoryRouter);
app.use(productRouter);
app.use(userRouter);
app.use(basketRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});