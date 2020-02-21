const { createProxyMiddleware } = require('http-proxy-middleware'); // in dev it is req to push req through express server

module.exports = function(app) {
  app.use('/auth/google', createProxyMiddleware(
    { target: 'http://localhost:5000' }
  ));
  app.use('/api/*', createProxyMiddleware(
    { target: 'http://localhost:5000' }
  ));
}
