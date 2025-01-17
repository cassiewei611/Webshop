"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var userController_1 = require("./userController");
var router = express.Router();
router.post('/users', userController_1.UserController.createUser);
exports.default = router;
