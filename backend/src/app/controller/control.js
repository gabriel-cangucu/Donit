const path = require('path');

class Control {

    static routes() {
        return {
            donit: "/donit"
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
}

module.exports = Control;