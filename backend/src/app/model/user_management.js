const UserDao = require('../infra/userDao.js');
const connection = require('../infra/connection.js');
const bcrypt = require('bcrypt');

module.exports = {

    async userRegister(name, email, pass) {
        try {
            const user = new UserDao(connection);
            var success = false;
            const saltRounds = 13;

            const person = await user.locate(email)
                .then(person => {
                    if (person) {
                        return 0;
                    }
                });

            if (person == 0) {
                return person;
            }

            const salt = bcrypt.genSaltSync(saltRounds);   
            const password = bcrypt.hashSync(pass, salt); 

            if (password[0] == '$') { 
                success = await user.register(name, email, password) 
                    .then(specimen => {
                        if (specimen) {
                            return true; 
                        }
                        else {
                            return false; 
                        }
                    });
            }

            return success;  

        } catch (error) {
            return false;
        }
    }
} 