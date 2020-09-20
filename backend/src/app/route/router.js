const initControl = require("../controller/initController.js");
const begin = new initControl();
const listControl = require("../controller/listController.js");
const list = new listControl();
const taskControl = require("../controller/taskController.js");
const task = new taskControl();

module.exports = (app) => {
    const beginRoutes = initControl.routes();
    const listRoutes = listControl.routes();
    const taskRoutes = taskControl.routes();

    app.get(beginRoutes.donit, begin.mainPage());
    app.post(beginRoutes.donit, begin.login());
    app.get(beginRoutes.signin, begin.register());
    app.post(beginRoutes.signin, begin.signIn());

    //app.get(listRoutes.home, global.authenticationMiddleware(), list.home());
    app.get(listRoutes.listall, list.getAll());

    app.post(listRoutes.list, list.createList());
    app.delete(listRoutes.list, list.deleteList());
    app.put(listRoutes.list, list.updateList());

    app.get(taskRoutes.task, global.authenticationMiddleware(), task.exhibitTask());
    app.get(taskRoutes.list, global.authenticationMiddleware(), task.listTasks());
    app.post(taskRoutes.task, global.authenticationMiddleware(), task.createTask());
    app.put(taskRoutes.task, global.authenticationMiddleware(), task.updateTask());
    app.delete(taskRoutes.task, global.authenticationMiddleware(), task.deleteTask());

}