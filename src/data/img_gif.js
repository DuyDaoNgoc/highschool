const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/XOsX.gif", // Update the path
    createProxyMiddleware({
      target: "http://localhost:5000", // This is where you're proxying the GIF request
      changeOrigin: true,
    })
  );
};
