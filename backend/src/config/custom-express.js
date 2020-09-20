const express = require('express');
var cors = require('cors');
const routes = require('../app/route/router.js');
const bodyParser = require('body-parser');
const authentication = require('./session_auth.js');

global.authenticationMiddleware = () => {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/donit');
    }
};

const corsOptions = {
    origin: 'http://localhost:8081',
    credentials: true
};

module.exports = () => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use(cors(corsOptions));
    app.use(express.json());

    authentication(app);
    routes(app);
    return app;
}