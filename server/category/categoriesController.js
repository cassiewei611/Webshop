"use strict";
// controllers/categoryController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = void 0;
var categoriesData = require('../categories.json');
var getAllCategories = function (req, res) {
    res.json(categoriesData.filters);
};
exports.getAllCategories = getAllCategories;
