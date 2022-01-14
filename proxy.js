const { createProxyMiddleware } = require('http-proxy-middleware');
const { exchangeToken } = require('./tokenx');

const API_URL = process.env.API_URL;

const proxyConfig = {
    target: API_URL,
    changeOrigin: true,
    pathRewrite: (path) => {
        return path.replace(/^\/(?!.*\/soker)(?!.*\/vedlegg)(?!.*\/ettersend).*$/, '');
    },
    router: async (req) => {
        const tokenSet = await exchangeToken(req);
        if (tokenSet != null && !tokenSet.expired() && tokenSet.access_token) {
            req.headers['authorization'] = `Bearer ${tokenSet.access_token}`;
        }
        return undefined;
    },
    secure: true,
    xfwd: true,
    logLevel: 'info',
};

const proxy = createProxyMiddleware('/api', proxyConfig);

module.exports = proxy;
