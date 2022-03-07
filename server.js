const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const compression = require('compression');
const helmet = require('helmet');
const getDecorator = require('./src/build/scripts/decorator');
const envSettings = require('./envSettings');
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

const checkSelvbetjeningIdtokenIsExpired = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            Buffer.from(base64, 'base64')
                .toString()
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );
        return Date.now() >= JSON.parse(jsonPayload).exp * 1000;
    } catch (err) {
        console.error('checkSelvbetjeningIdtokenIsExpired Error: ', err);
        return true;
    }
};

const startServer = async (html) => {
    await Promise.all([initTokenX()]);
    server.use(`${process.env.PUBLIC_PATH}/dist/js`, express.static(path.resolve(__dirname, 'dist/js')));
    server.use(`${process.env.PUBLIC_PATH}/dist/css`, express.static(path.resolve(__dirname, 'dist/css')));
    server.get(`${process.env.PUBLIC_PATH}/health/isAlive`, (req, res) => res.sendStatus(200));
    server.get(`${process.env.PUBLIC_PATH}/health/isReady`, (req, res) => res.sendStatus(200));
    server.get(`${process.env.PUBLIC_PATH}/dist/settings.js`, (req, res) => {
        res.set('content-type', 'application/javascript');
        res.send(`${envSettings()}`);
    });

    server.use(
        process.env.FRONTEND_API_PATH,
        createProxyMiddleware({
            target: process.env.API_URL,
            changeOrigin: true,
            pathRewrite: (path) => {
                return path.replace(process.env.FRONTEND_API_PATH, '');
            },

            router: async (req, res) => {
                const selvbetjeningIdtoken = getAppCookies(req)['selvbetjening-idtoken'];
                if (checkSelvbetjeningIdtokenIsExpired(selvbetjeningIdtoken)) {
                    res.writeHead(401);
                } else {
                    const exchangedToken = await exchangeToken(selvbetjeningIdtoken);
                    if (exchangedToken != null && !exchangedToken.expired() && exchangedToken.access_token) {
                        req.headers['authorization'] = `Bearer ${exchangedToken.access_token}`;
                    }
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

    // returns an object with the cookies' name as keys
    const getAppCookies = (req) => {
        const rawCookies = req.headers.cookie.split('; ');
        // rawCookies = ['myapp=secretcookie, 'analytics_cookie=beacon;']

        const parsedCookies = {};
        rawCookies.forEach((rawCookie) => {
            const parsedCookie = rawCookie.split('=');
            // parsedCookie = ['myapp', 'secretcookie'], ['analytics_cookie', 'beacon']
            parsedCookies[parsedCookie[0]] = parsedCookie[1];
        });
        return parsedCookies;
    };
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
