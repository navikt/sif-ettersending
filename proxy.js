const { createProxyMiddleware } = require('http-proxy-middleware');
const { exchangeToken } = require('./tokenx');

const API_URL = process.env.API_URL;
const FRONTEND_API_PATH = process.env.FRONTEND_API_PATH;

const proxyConfig = {
    target: API_URL,
    changeOrigin: true,
    pathRewrite: (path) => {
        return path.replace(FRONTEND_API_PATH, '/');
    },
    router: async (req) => {
        const tokenSet = await exchangeToken(req);
        if (!tokenSet?.expired() && tokenSet?.access_token) {
            req.headers['authorization'] = `Bearer ${tokenSet.access_token}`;
        }
        return undefined;
    },
    secure: true,
    xfwd: true,
    logLevel: 'info',
};

const proxy = createProxyMiddleware(FRONTEND_API_PATH, proxyConfig);

module.exports = proxy;
