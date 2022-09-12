const { createProxyMiddleware } = require('http-proxy-middleware');

const apiProxySettings = {
    target: "http://localhost:8080",
    secure: false,
    changeOrigin: true,
    pathRewrite: {
        "/api": ""
    }
};
const authProxySettings = {
    target: "http://127.0.0.1:8082",
    secure: false,
    changeOrigin: true,
    pathRewrite: {
        "/auth": ""
    }
}
module.exports = function (app) {
    app.use(createProxyMiddleware('/api', apiProxySettings));
    app.use(createProxyMiddleware("/auth", authProxySettings));
    app.use((req, res, next) => {
        res.set({
            "Access-Control-Allow-Origin": "http://127.0.0.1:8082",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Authorization, Accept"
        });
        next();
    });
}
