const Control = require("../controller/control.js");
const control = new Control();

module.exports = (app) => {
    const controlRoutes = Control.routes();

    app.get(controlRoutes.donit, control.mainPage());
    app.post(controlRoutes.donit, control.login());
    app.get(controlRoutes.home, global.authenticationMiddleware(), control.home());
    app.get(controlRoutes.signin, control.register());
    app.post(controlRoutes.signin, control.signIn());
}