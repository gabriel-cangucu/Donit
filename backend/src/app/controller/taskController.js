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
            const creation = new Date();
            const prio = req.body.priority || null;
            const conclusion = req.body.conclusiondate;
            const dueDate = req.body.dueDate != null ? new Date(req.body.dueDate) : null;

            const result = await taskManag.create(list, name, desc, prio, conclusion, dueDate, creation);
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
            const description = req.body.desc;
            const creation = req.body.creationDate;
            const prio = req.body.priority;
            const conclusion = req.body.conclusionDate != null ? new Date(req.body.conclusionDate) : null;
            const dueDate = req.body.dueDate != null ? new Date(req.body.dueDate) : null;

            const result = await taskManag.update(id, name, description, prio, conclusion, dueDate, creation);
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
                return resp.status(204).send('');
            }
            else {
                return resp.status(500).send("Nao foi possivel excluir a tarefa");
            }
        }
    }
}

module.exports = TaskControl;