const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const compression = require('compression');
const helmet = require('helmet');
const getDecorator = require('./src/build/scripts/decorator');
const envSettings = require('./envSettings');
const { initIdporten } = require('./idporten');
const { initTokenX, exchangeToken } = require('./tokenx');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cookieParser = require('cookie-parser');

const server = express();
server.use(
    helmet({
        contentSecurityPolicy: false,
    })
);
server.use(compression());
server.use(cookieParser());
server.set('views', `${__dirname}/dist`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

const verifyLoginUrl = () =>
    new Promise((resolve, reject) => {
        if (!process.env.LOGIN_URL) {
            reject();
        } else {
            resolve();
        }
    });

const renderApp = (decoratorFragments) =>
    new Promise((resolve, reject) => {
        server.render('index.html', decoratorFragments, (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });

const startServer = async (html) => {
    await Promise.all([initIdporten(), initTokenX()]);
    server.use(`${process.env.PUBLIC_PATH}/dist/js`, express.static(path.resolve(__dirname, 'dist/js')));
    server.use(`${process.env.PUBLIC_PATH}/dist/css`, express.static(path.resolve(__dirname, 'dist/css')));
    server.get(`${process.env.PUBLIC_PATH}/health/isAlive`, (req, res) => res.sendStatus(200));
    server.get(`${process.env.PUBLIC_PATH}/health/isReady`, (req, res) => res.sendStatus(200));
    server.get(`${process.env.PUBLIC_PATH}/dist/settings.js`, (req, res) => {
        res.set('content-type', 'application/javascript');
        res.send(`${envSettings()}`);
    });

    server.use(async function (req, res, next) {
        const tokenSet = await exchangeToken(req);
        if (tokenSet != null && !tokenSet.expired() && tokenSet.id_token) {
            res.cookie('selvbetjening-idtoken1', tokenSet.id_token, {
                domain: 'dev.nav.no',
                secure: true,
                httpOnly: true,
            });
        } else {
            res.cookie('feil-selvbetjening-idtoken', req.headers['authorization'], {
                domain: 'dev.nav.no',
                secure: true,
                httpOnly: true,
            });
        }

        next(); // <-- important!
    });

    server.use(function (req, res, next) {
        res.cookie('teste_cookie', req.headers['x-wonderwall-id-token'], {
            domain: 'dev.nav.no',
            secure: true,
            httpOnly: true,
        });

        next();
    });

    server.use(
        '/api',
        createProxyMiddleware({
            target: process.env.API_URL,
            changeOrigin: true,
            pathRewrite: (path) => {
                return path.replace(process.env.FRONTEND_API_PATH, '');
            },

            router: async (req, res) => {
                const tokenSet = await exchangeToken(req);
                if (tokenSet != null && !tokenSet.expired() && tokenSet.access_token) {
                    req.headers['authorization'] = `Bearer ${tokenSet.access_token}`;
                }
                return undefined;
            },
            secure: true,
            xfwd: true,
            logLevel: 'info',
        })
    );

    server.get(/^\/(?!.*api)(?!.*dist).*$/, (req, res) => {
        res.send(html);
    });

    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

const logError = (errorMessage, details) => console.log(errorMessage, details);

verifyLoginUrl()
    .then(getDecorator, () => {
        logError('LOGIN_URL is missing');
        process.exit(1);
    })
    .then(renderApp, (error) => {
        logError('Failed to get decorator', error);
        process.exit(1);
    })
    .then(startServer, (error) => logError('Failed to render app', error));
