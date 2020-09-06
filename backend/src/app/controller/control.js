const path = require('path');
const userManag = require('../model/user_management.js');

class Control {

    static routes() {
        return {
            donit: "/donit",
            home: "/home",
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
            console.log(req.body); //
            const passport = req.passport;
            passport.authenticate('local', (erro, user, info) => {
                if (info) {
                    return resp.send("Email ou senha incorretos");  // trocar por pagina do front
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
            const pass = req.body.pass;
            const result = await userManag.userRegister(name, email, pass);
            if (result == true) {
                return resp.marko(templates.home);
            }
            else if (result == 0) {
                return resp.marko(templates.register, { messageerro: "J� existe uma conta com este email." });
            }
            else {
                return resp.marko(templates.register, { messageerro: "N�o foi poss�vel realizar o cadastro." });
            }
        }
    }

    home() {
        return function (req, resp) {
            return resp.send("home"); //trocar por pagina do front
        }
    }
}

module.exports = Control;