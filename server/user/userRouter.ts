import express = require('express');
import { UserController } from './userController';

const router = express.Router();

router.post('/users', UserController.createUser);

export default router;