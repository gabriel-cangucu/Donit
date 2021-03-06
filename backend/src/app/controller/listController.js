const path = require('path');
const listManag = require('../model/list_management.js');

class ListControl {

    static routes() {
        return {
            home: "/home",
            list: "/list",
            listall: "/listall"
        }
    }

    getAll() {
        return async function (req, resp) {
            const userId = req.user.id;
            const result = await listManag.retrieveAll(userId);
            if (result) {
                return resp.status(200).json(result);
            }
            else {
                return resp.status(404).send("Nao foi possivel encontrar nenhuma lista deste usuario.");
            }
        }
    }

    createList() {
        return async function (req, resp) {
            const userId = req.user.id;
            const name = req.body.name;
            const descList = req.body.desc;
            const type = req.body.type;
            const result = await listManag.create(userId, name, descList, type);
            if (result) {
                return resp.status(200).send("sucesso");
            }
            else {
                return resp.status(500).send("Houve um erro ao criar a lista.");
            }
        }
    }

    updateList() {
        return async function (req, resp) {
            const id = req.query.listId;
            const name = req.body.name;
            const descList = req.body.desc;
            const type = req.body.type;
            const result = await listManag.update(id, name, descList, type);
            if (result) {
                return resp.status(200).send("sucesso");
            }
            else {
                return resp.status(500).send("Houve um erro ao atualizar a lista.");
            }
        }
    }

    deleteList() {
        return async function (req, resp) {
            const listId = req.query.listId;
            const result = await listManag.delete(listId);
            if (result) {
                return resp.status(204).send('');
            }
            else {
                return resp.status(500).send("Nao foi possivel excluir a lista");
            }
        }
    }
}

module.exports = ListControl;