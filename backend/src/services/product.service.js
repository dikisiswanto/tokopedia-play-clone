const ProductRepository = require("../repositories/product.repository");

const getAllProducts = async () => {
  return await ProductRepository.getAllProducts();
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
  getAllProducts,
  getProductById,
  getProductsByVideoId,
  createProduct,
  updateProduct,
  deleteProduct,
};
