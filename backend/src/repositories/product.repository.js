const Product = require('../models/product.model');

const getProducts = async () => {
  const products = await Product.find({});
  const totalProducts = await Product.countDocuments();
  return { products, totalProducts };
};

const getProductById = async (id) => await Product.findById(id);

const getProductsByVideoId = async (videoId) => {
  const products = await Product.find({ videoId });
  const totalProducts = await Product.countDocuments({ videoId });
  return { products, totalProducts, filter: { videoId } };
};

const createProduct = async (productData) => await Product.create(productData);

const updateProduct = async (id, productData) =>
  await Product.findByIdAndUpdate(id, productData, { new: true });

const deleteProduct = async (id) => await Product.findByIdAndDelete(id);

module.exports = {
  getProducts,
  getProductById,
  getProductsByVideoId,
  createProduct,
  updateProduct,
  deleteProduct,
};
