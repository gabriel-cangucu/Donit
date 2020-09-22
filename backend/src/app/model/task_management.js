const TaskDao = require('../infra/taskDao.js');
const connection = require('../infra/connection.js');

module.exports = {

    async retrieve(id) {
        try {
            const task = new TaskDao(connection);
            const result = await task.get(id)
                .then(data => {
                    if (data) {
                        return data;
                    }
                });

            const info = {
                name: result.name,
                desc: result.descTask,
                creation: result.creationDate,
                conclusion: result.conclusionDate,
                prio: result.priority,
                status: result.done
            }
            return info;

        } catch (erro) {
            return false;
        }
    },

    async retrieveAll(id) {
        try {
            const task = new TaskDao(connection);
            const result = await task.getTasks(id)
                .then(data => {
                    if (data) {
                        return data;
                    }
                });
            return result;
            // var info = [];
            // for (var i in result) {
            //     info.push({
            //         id: result[i].taskId,
            //         name: result[i].name
            //     });
            // }
            // return info;

        } catch (erro) {
            return false;
        }
    },

    async create(list, name, desc, prio, conclusion, dueDate, creation) {
        try {
            const task = new TaskDao(connection);
            const result = await task.create(list, name, desc, prio, conclusion, dueDate, creation)
                .then(data => {
                    if (data) {
                        return true;
                    }
                });

            return result;

        } catch (erro) {
            return false;
        }
    },

    async update(taskId, name, description, priority, conclusiondate, dueDate, creation) {
        try {
            const task = new TaskDao(connection);
            const result = await task.update(taskId, name, description, priority, conclusiondate, dueDate, creation)
                .then(data => {
                    if (data) {
                        console.log(data); //
                        return true;
                    }
                });

            return result;

        } catch (erro) {
            return false;
        }
    },

    async delete(id) {
        try {
            const task = new TaskDao(connection);
            const result = await task.erase(id)
                .then(data => {
                    if (data) {
                        return true;
                    }
                });

            return result;

        } catch (erro) {
            return false;
        }
    }
}