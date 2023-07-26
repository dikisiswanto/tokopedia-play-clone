const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller");
const ProductValidator = require("../utilities/validations/product.validation");

const productRoutes = [
  {
    method: "get",
    path: "/products",
    handler: ProductController.getAllProducts,
  },
  {
    method: "get",
    path: "/products/:id",
    handler: ProductController.getProductById,
  },
  {
    method: "post",
    path: "/products",
    validator: ProductValidator.postProduct,
    handler: ProductController.createProduct,
  },
  {
    path: "/products/:id",
    method: "put",
    validator: ProductValidator.postProduct,
    handler: ProductController.updateProduct,
  },
  {
    path: "/products/:id",
    method: "delete",
    handler: ProductController.deleteProduct,
  },
];

productRoutes.forEach((route) => {
  const { method, path, validator, handler } = route;
  if (validator) {
    router[method](path, validator, handler);
  } else {
    router[method](path, handler);
  }
});

module.exports = router;
