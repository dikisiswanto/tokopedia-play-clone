const ProductController = require('../controllers/product.controller');
const ProductValidator = require('../utilities/validations/product.validation');

const routes = [
  {
    method: 'get',
    path: '/products',
    handler: ProductController.getProducts,
  },
  {
    method: 'get',
    path: '/products/:id',
    handler: ProductController.getProductById,
  },
  {
    method: 'post',
    path: '/products',
    validator: ProductValidator.postProduct,
    handler: ProductController.createProduct,
  },
  {
    path: '/products/:id',
    method: 'put',
    validator: ProductValidator.postProduct,
    handler: ProductController.updateProduct,
  },
  {
    path: '/products/:id',
    method: 'delete',
    handler: ProductController.deleteProduct,
  },
  {
    method: 'get',
    path: '/videos/:videoId/products',
    handler: ProductController.getProductsByVideoId,
  },
];

module.exports = routes;
