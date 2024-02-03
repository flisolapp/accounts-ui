const proxy = [{
  context: '/api',
  target: 'http://localhost:8080',
  secure: false,
  logLevel: "debug",
  pathRewrite: {
    '^/api': ''
  },
  changeOrigin: true
}];
module.exports = proxy;
