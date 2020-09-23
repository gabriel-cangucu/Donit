class ListDao {

    constructor(connection) {
        this._connection = connection;
    }

    get(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM lists WHERE listId= ?';

            this._connection.query(sql, [id], (erro, result) => {
                if (erro) return reject('Task not found');
                return resolve(result[0]);
            });
        });
    }

    getLists(userid) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM lists WHERE userId= ?';

            this._connection.query(sql, [userid], (error, result) => {
                if (error) return reject('List not found');
                return resolve(result);
            });
        });
    }

    create(userId, name, descList, type) {
        return new Promise((resolve, reject) => {

            const sql = 'INSERT INTO lists SET userid=?, name=?, descList=?, type=?';

            this._connection.query(sql, [userId, name, descList, type], (erro, result) => {
                if (erro) return reject('Creation Error!');
                else{
                    return resolve(result);
                }
            });
        });
    }

    update(id, name, descList, type) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE lists SET name=?, descList=?, type=? WHERE listId= ?';

            this._connection.query(sql, [name, descList, type, id], (erro, result) => {
                if (erro) {
                    return reject('Update Error!');
                }
                return resolve(result);
            });
        });
    }

    erase(listid) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM lists WHERE listid= ?';

            this._connection.query(sql, [listid, listid], (error) => {
                if (error) return reject('List not found');
                return resolve(true);
            });
        });
    }
};

module.exports = ListDao;