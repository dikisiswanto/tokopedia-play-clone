const ProductController = require('../controllers/product.controller');
const ProductValidator = require('../utilities/validations/product.validation');

const routes = [
  {
    method: 'get',
    path: '/products',
    isPrivate: false,
    handler: ProductController.getProducts,
  },
  {
    method: 'get',
    path: '/products/:id',
    isPrivate: false,
    handler: ProductController.getProductById,
  },
  {
    method: 'post',
    path: '/products',
    isPrivate: true,
    validator: ProductValidator.postProduct,
    handler: ProductController.createProduct,
  },
  {
    method: 'put',
    path: '/products/:id',
    isPrivate: true,
    validator: ProductValidator.postProduct,
    handler: ProductController.updateProduct,
  },
  {
    method: 'delete',
    path: '/products/:id',
    isPrivate: true,
    handler: ProductController.deleteProduct,
  },
  {
    method: 'get',
    path: '/videos/:videoId/products',
    isPrivate: false,
    handler: ProductController.getProductsByVideoId,
  },
];

module.exports = routes;
