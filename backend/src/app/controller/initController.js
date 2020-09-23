const path = require('path');
const userManag = require('../model/user_management.js');

class InitControl {

    static routes() {
        return {
            donit: "/donit",
            signin: "/signin"
        }
    }

    mainPage() {
        return function (req, resp) {
           return resp.send("Donit up!"); // trocar por pagina do front
        }
    }

    login() {
        return function (req, resp, next) {
            const passport = req.passport;
            passport.authenticate('local', (erro, user, info) => {
                if (info) {
                    return resp.send(404, "Email ou senha incorretos");  // trocar por pagina do front
                }
                if (erro) {
                    return next(erro);
                }

                req.login(user, (erro) => {
                    if (erro) {
                        return next(erro);
                    }
                    return resp.send("sucesso");  // trocar por pagina do front
                });
            })(req, resp, next);
        }
    }

    register() {
        return function (req, resp) {
            return resp.send("tela de registro"); //trocar por pagina do front
        }
    }

    signIn() {
        return async function (req, resp) {
            const name = req.body.name;
            const email = req.body.email;
            const pass = req.body.password;
            const result = await userManag.userRegister(name, email, pass);
            if (result == true) {
                return resp.send(200, "Usuário registrado com sucesso.");
            }
            else if (result == 0) {
                return resp.send(409, "Já existe uma conta com este email.");
            }
            else {
                return resp.send(500, "Não foi possível realizar o cadastro.");
            }
        }
    }
    
}

module.exports = InitControl;