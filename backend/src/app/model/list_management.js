const ListDao = require('../infra/listDao.js');
const connection = require('../infra/connection.js');

module.exports = {

    async getLists(userid) {
        try {
            const list = new ListDao(connection);

            const data = await list.locate(userid)
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
    },

    async createLists(userid) {
        try {
            const list = new ListDao(connection);
            const data = await list.create(userid)
                .then(result => {
                    if (result) {
                        return true;
                    }
                });

            return data;

        } catch (error) {
            return false;
        }
    },

    async deleteList(listid) {
        try {
            //verificar se lista do usuário
            const list = new ListDao(connection);

            const data = await list.erase(listid)
                .then(result => {
                    return result;
                    }
                );

        } catch (error) {
            return false;
        }
    }
} 