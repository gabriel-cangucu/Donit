const path = require('path');
const taskManag = require('../model/task_management.js');

class TaskControl {

    static routes() {
        return {
            task: "/task",
            list: "/list"
        }
    }

    exhibitTask() {
        return async function (req, resp) {
            const id = req.query.taskId;
            const result = await taskManag.retrieve(id);
            if (result) {
                return resp.status(200).json(result);
            }
            else {
                return resp.status(404).send("N�o foi poss�vel encontrar os dados sobre a tarefa.");
            }
        }
    }

    listTasks() {
        return async function (req, resp) {
            const id = req.query.listId;
            const result = await taskManag.retrieveAll(id);
            if (result) {
                return resp.status(200).json(result);
            }
            else {
                return resp.status(404).send("Nao foi possivel encontrar as tarefas para esta lista.");
            }
        }
    }


    createTask() {
        return async function (req, resp) {
            const list = req.query.listId;
            const name = req.body.name;
            const desc = req.body.desc;
            var creation = new Date;
            if (req.body.priority) {
                var prio = req.body.priority;
            }
            else var prio = null;
            if (req.body.conclusiondate) {
                var conclusion = req.body.conclusiondate;
            }
            else var conclusion = null;
            const result = await taskManag.create(list, name, desc, prio, conclusion, creation);
            if (result) {
                return resp.status(200).send("sucesso");
            }
            else {
                return resp.status(500).send("Houve um erro ao criar a tarefa.");
            }
        }
    }

    updateTask() {
        return async function (req, resp) {
            const id = req.query.taskId;
            const name = req.body.name;
            const description = req.body.description;
            var creation = req.body.creation;
            var prio = req.body.priority;
            var conclusion = req.body.conclusiondate;
            const result = await taskManag.update(id, name, description, prio, conclusion, creation);
            if (result) {
                return resp.status(200).send("sucesso");
            }
            else {
                return resp.status(500).send("Houve um erro ao atualizar a tarefa.");
            }
        }
    }

    deleteTask() {
        return async function (req, resp) {
            const id = req.query.taskId;
            const result = await taskManag.delete(id);
            if (result) {
                return resp.status(204);
            }
            else {
                return resp.status(500).send("Nao foi possivel excluir a tarefa");
            }
        }
    }
}

module.exports = TaskControl;