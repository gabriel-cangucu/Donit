const ListDao = require('../infra/listDao.js');
const connection = require('../infra/connection.js');

module.exports = {

    async getLists(name, email, pass) {
        try {
            const list = new ListDao(connection);

            const data = await user.locate(userid)
                .then(result => {
                    if (result) {
                        return result;
                    }
                    else{
                        return false;
                    }
                });

            if (data == false) {
                return data;
            }
            else{
                //toDo: tratar data de forma a retornar somente os nomes
            }

        } catch (error) {
            return false;
        }
    }
} 