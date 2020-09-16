class ListDao {

    constructor(connection) {
        this._connection = connection;
    }

    locate(userid) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM lists WHERE userId= ?';

            this._connection.query(sql, [userid], (error, list) => {
                if (error) return reject('List not found');
                return resolve(list[0]);
            });
        });
    }

    create(userid) {
        return new Promise((resolve, reject) => {
            //arrumar query
            const sql = 'INSERT INTO lists SET userid = ?';

            this._connection.query(sql, [userid], (erro, result) => {
                if (erro) return reject('Register Error!');
                else{
                    const sql = 'SELECT * FROM lists WHERE userId= ?';
                    this._connection.query(sql, [userid], (error, list) => {
                        if (error) return reject('List not found');
                        return resolve(list[0]);
                    });
                }
            });
        });
    }

    erase(listid) {
        return new Promise((resolve, reject) => {
            //arrumar query
            const sql = 'DELETE FROM lists WHERE listid= ?';

            this._connection.query(sql, [listid], (error) => {
                if (error) return reject('List not found');
                return resolve(true);
            });
        });
    }
};

module.exports = ListDao;