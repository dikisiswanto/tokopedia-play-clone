const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    photos: [{ type: String, required: true, trim: true }],
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
