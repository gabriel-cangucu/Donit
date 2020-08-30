class UserDao {

    constructor(connection) {
        this._connection = connection;
    }

    locate(email) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE email= ?';

            this._connection.query(sql, [email], (erro, user) => {
                if (erro) return reject('Email not found');
                return resolve(user[0]);
            });
        }
        )
    }
};

module.exports = UserDao;