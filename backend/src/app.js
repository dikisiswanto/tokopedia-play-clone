const express = require("express");
const app = express();
const connectDatabase = require("./database");

connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const channelRoutes = require("./routes/channel.router");
const productRoutes = require("./routes/product.router");
const commentRoutes = require("./routes/comment.router");
const videoRoutes = require("./routes/video.router");

const routes = [channelRoutes, productRoutes, commentRoutes, videoRoutes];

routes.forEach((route) => {
  app.use("/api", route);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
