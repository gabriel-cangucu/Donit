const express = require('express');
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

module.exports = () => {
    const app = express();

    //Conferir com o front se eles precisam de uma pasta para static
    //app.use('/static', express.static('src/app/public'));
    app.use(bodyParser.urlencoded({ extended: true }));

    authentication(app);
    routes(app);
    return app;
}