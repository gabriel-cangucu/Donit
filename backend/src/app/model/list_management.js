const ListDao = require('../infra/listDao.js');
const connection = require('../infra/connection.js');

module.exports = {

    async retrieve(id) {
        try {
            const list = new ListDao(connection);
            const result = await list.get(id)
                .then(data => {
                    if (data) {
                        return data;
                    }
                });

            const info = {
                id: result[i].listId,
                userid: result[i].userid,
                name: result[i].name,
                type: result[i].type,
                descList: result[i].descList
            }
            return info;

        } catch (erro) {
            return false;
        }
    },
    
    async retrieveAll(userid) {
        try {
            const list = new ListDao(connection);
            const result = await list.getLists(id)
                .then(data => {
                    if (data) {
                        return data;
                    }
                });

            var info = [];
            for (var i in result) {
                info.push({
                    id: result[i].listId,
                    name: result[i].name,
                    type: result[i].type
                });
            }
            return info;

        } catch (erro) {
            return false;
        }
    },

    async create(userId, name, descList, type) {
        try {
            const list = new ListDao(connection);
            const result = await list.create(userId, name, descList, type)
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

    async update(id, name, descList, type) {
        try {
            const list = new ListDao(connection);
            const result = await list.update(id, name, descList, type)
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
            const list = new ListDao(connection);
            const result = await list.erase(id)
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