const bcrypt = require('bcrypt');
const sessao = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { v4: uuidv4 } = require('uuid');

const UserDao = require('../app/infra/userDao.js');
const connection = require('../app/infra/connection.js');

module.exports = (app) => {

    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, done) => {
            const user = new UserDao(connection);
            user.locate(email)
                .then(user => {
                    if (!user) {
                        return done(null, false, {

                            mensagem: 'Incorrect username or password!'
                        });
                    }
                    else {
                        bcrypt.compare(password, user.password, (err, isValid) => {
                            if (err) return done(err);
                            if (!isValid) {
                                return done(null, false, { mensagem: 'Login e senha incorretos!' });
                            }
                            return done(null, user);
                        })
                    }
                })
                .catch(erro => done(erro, false));
        }
    ));

    //Serialização de usuário
    passport.serializeUser((user, done) => {
        const userSession = {
            id: user.Id
        };
        done(null, userSession);
    });

    //Desserialização de usuário
    passport.deserializeUser((userSession, done) => {
        done(null, userSession);
    });

    //Configuração da sessão
    app.use(sessao({
        secret: 'birthday cake',
        genid: function (req) {
            return uuidv4();
        },
        cookie: { expires: false },
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(function (req, resp, next) {
        req.passport = passport;
        next();
    });
}