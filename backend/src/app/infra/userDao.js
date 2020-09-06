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
        });
    }

    register(name, email, pass) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO users SET email=?, password=?, name=?';

            this._connection.query(sql, [email, pass, name], (erro, result) => {
                if (erro) return reject('Register Error!');
                return resolve(result);
            });
        });
    }
};

module.exports = UserDao;