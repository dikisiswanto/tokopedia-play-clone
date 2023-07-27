const ProductRepository = require('../repositories/product.repository');

const getProducts = async () => await ProductRepository.getProducts();

const getProductById = async (id) => await ProductRepository.getProductById(id);

const getProductsByVideoId = async (videoId) =>
  await ProductRepository.getProductsByVideoId(videoId);

const createProduct = async (productData) => await ProductRepository.createProduct(productData);

const updateProduct = async (id, productData) =>
  await ProductRepository.updateProduct(id, productData);

const deleteProduct = async (id) => await ProductRepository.deleteProduct(id);

module.exports = {
  getProducts,
  getProductById,
  getProductsByVideoId,
  createProduct,
  updateProduct,
  deleteProduct,
};
