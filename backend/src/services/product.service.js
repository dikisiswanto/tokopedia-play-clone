const ProductRepository = require("../repositories/product.repository");

const getProducts = async () => {
  return await ProductRepository.getProducts();
};

const getProductById = async (id) => {
  return await ProductRepository.getProductById(id);
};

const getProductsByVideoId = async (videoId) => {
  return await ProductRepository.getProductsByVideoId(videoId);
}

const createProduct = async (productData) => {
  return await ProductRepository.createProduct(productData);
};

const updateProduct = async (id, productData) => {
  return await ProductRepository.updateProduct(id, productData);
};

const deleteProduct = async (id) => {
  return await ProductRepository.deleteProduct(id);
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByVideoId,
  createProduct,
  updateProduct,
  deleteProduct,
};
