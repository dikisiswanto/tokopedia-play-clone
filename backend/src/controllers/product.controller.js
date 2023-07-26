const ProductService = require("../services/product.service");
const VideoService = require("../services/video.service");
const { validationResult } = require("express-validator");
const {
  handleServerError,
  handleResponse,
  handleClientError,
} = require("../utilities/responseHandler");

const getProducts = async (req, res) => {
  try {
    const products = await ProductService.getProducts();

    handleResponse(res, 200, "Data retrieved successfully", products);
  } catch (error) {
    handleServerError(res, error);
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await ProductService.getProductById(productId);

    if (!product) {
      return handleClientError(res, 404, "Product not found");
    }

    handleResponse(res, 200, "Data retrieved successfully", product);
  } catch (error) {
    handleServerError(res, error);
  }
};

const getProductsByVideoId = async (req, res) => {
  const videoId = req.params.videoId;

  try {
    const { video } = await VideoService.getVideoById(videoId);

    if (!video) {
      return handleClientError(res, 404, "videoId you provide doesn't match any record");
    }

    const products = await ProductService.getProductsByVideoId(videoId);

    handleResponse(res, 200, "Data retrieved successfully", products);
  } catch (error) {
    handleServerError(res, error);
  }
}

const createProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return handleClientError(res, 400, errors.array());
  }

  const productData = req.body;

  try {
    const video = await VideoService.getVideoById(productData.videoId);

    if (!video) {
      return handleClientError(res, 404, "videoId you provide doesn't match any record");
    }

    const createdProduct = await ProductService.createProduct(productData);

    handleResponse(res, 201, "Data created successfully", createdProduct);
  } catch (error) {
    handleServerError(res, error);
  }
};

const updateProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return handleClientError(res, 400, errors.array());
  }

  const productId = req.params.id;
  const productData = req.body;

  try {
    const video = await VideoService.getVideoById(productData.videoId);

    if (!video) {
      return handleClientError(res, 404, "videoId you provide doesn't match any record");
    }

    const updatedProduct = await ProductService.updateProduct(
      productId,
      productData
    );

    if (!updatedProduct) {
      return handleClientError(res, 404, "Product not found");
    }

    handleResponse(res, 200, "Data updated successfully", updatedProduct);
  } catch (error) {
    handleServerError(res, error);
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await ProductService.deleteProduct(productId);

    if (!deletedProduct) {
      return handleClientError(res, 404, "Product not found");
    }

    handleResponse(res, 202, "Data deleted successfully", deletedProduct);
  } catch (error) {
    handleServerError(res, error);
  }
};

module.exports = {
  getProducts,
  getProductsByVideoId,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
