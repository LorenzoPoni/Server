const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("../config/env");

const app = express();

app.get('/', (req, res) => {
    res.redirect('/api/v1/');
});

app.use("/api/v1/wanted", createProxyMiddleware({
    target: config.WANTED_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        "^/api/v1/wanted": ""
    }
}));

app.use("/api/v1/auth", createProxyMiddleware({
    target: config.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        "^/api/v1/auth": ""
    }
}));

app.use("/api/v1", createProxyMiddleware({
    target: config.SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/v1': ''
    }
}));

app.listen(config.GATEWAY_PORT, () => {
    console.log(`Gateway attivo su http://localhost:${config.GATEWAY_PORT}/api/v1/`);
});
