class TaskDao {

    constructor(connection) {
        this._connection = connection;
    }

    get(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM tasks WHERE taskId= ?';

            this._connection.query(sql, [id], (erro, result) => {
                if (erro) return reject('Task not found');
                return resolve(result[0]);
            });
        });
    }

    getTasks(listId) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM tasks WHERE listId= ?';

            this._connection.query(sql, [listId], (erro, result) => {
                if (erro) return reject('Tasks not found');
                return resolve(result);
            });
        });
    }

    create(list, name, desc, prio, conclusion, creation) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO tasks SET listId=?, descTask=?, creationDate=?, conclusionDate=?, name=?, priority=?';

            this._connection.query(sql, [list, desc, creation, conclusion, name, prio], (erro, result) => {
                if (erro) return reject('Creation Error!');
                return resolve(result);
            });
        });
    }

    update(id, name, description, prio, conclusion, creation) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE tasks SET descTask=?, conclusionDate=?, creationDate=?, name=?, priority=? WHERE taskId= ?';

            this._connection.query(sql, [description, conclusion, creation, name, prio, id], (erro, result) => {
                if (erro) {
                    console.log(erro); //
                    return reject('Creation Error!');
                }
                return resolve(result);
            });
        });
    }

    erase(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM tasks WHERE taskId= ?';

            this._connection.query(sql, [id], (erro, result) => {
                if (erro)
                    return reject('Task not found');
                return resolve(result);
            });
        });
    }
};

module.exports = TaskDao;