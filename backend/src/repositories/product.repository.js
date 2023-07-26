const Product = require("../models/product.model");

const getProducts = async () => {
  const products = await Product.find({}).populate("videoId").exec();
  const totalProducts = await Product.countDocuments();
  return { products, totalProducts };
};

const getProductById = async (id) => {
  return await Product.findById(id).populate("videoId").exec();
};

const getProductsByVideoId = async (videoId) => {
  const products = await Product.find({ videoId }).populate("videoId").exec();
  const totalProducts = await Product.countDocuments({ videoId });
  return { products, totalProducts, filter: { videoId } };
};

const createProduct = async (productData) => {
  return await Product.create(productData);
};

const updateProduct = async (id, productData) => {
  return await Product.findByIdAndUpdate(id, productData, { new: true });
};

const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByVideoId,
  createProduct,
  updateProduct,
  deleteProduct,
};
