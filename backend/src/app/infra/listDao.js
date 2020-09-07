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
};

module.exports = ListDao;