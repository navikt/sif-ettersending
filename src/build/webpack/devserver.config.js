require('dotenv').config();
const mustacheExpress = require('mustache-express');
const path = require('path');
const envSettings = require('../../../envSettings');
const { createProxyMiddleware } = require('http-proxy-middleware');
/* Start */

const configureDevServer = (decoratorFragments) => ({
    onBeforeSetupMiddleware: (devServer) => {
        devServer.app.engine('html', mustacheExpress());
        devServer.app.set('view engine', 'mustache');
        devServer.app.set('views', `${__dirname}/../../../dist/dev`);

        devServer.app.get(`${process.env.PUBLIC_PATH}/dist/settings.js`, (req, res) => {
            res.set('content-type', 'application/javascript');
            res.send(`${envSettings()}`);
        });
        devServer.app.get('/dist/settings.js', (req, res) => {
            res.set('content-type', 'application/javascript');
            res.send(`${envSettings()}`);
        });

        devServer.app.use(
            '/api',
            createProxyMiddleware({
                target: process.env.API_URL,
                changeOrigin: true,
                pathRewrite: (path) => {
                    return path.replace('/api', '');
                },
            })
        );
        devServer.app.get(/^\/(?!.*api)(?!.*dist).*$/, (req, res) => {
            res.render('index.html', Object.assign(decoratorFragments));
        });
    },
    devMiddleware: {
        index: true,
        stats: 'minimal',
        publicPath: `${process.env.PUBLIC_PATH}/dist`,
    },
    static: {
        directory: path.resolve(`${__dirname}/../../../dist`),
        serveIndex: true,
    },
});

module.exports = configureDevServer;
