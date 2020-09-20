const path = require('path');
const listManag = require('../model/list_management.js');

class ListControl {

    static routes() {
        return {
            home: "/home",
            list: "/list"
        }
    }

    home() {
        return async function (req, resp) {
            const userid = req.query.id;
            const result = await listManag.retrieveAll(userid);
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
            const userid = req.query.id;
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
            const id = req.query.id;
            const result = await listManag.delete(id);
            if (result) {
                return resp.status(204);
            }
            else {
                return resp.status(500).send("Nao foi possivel excluir a lista");
            }
        }
    }
}

module.exports = ListControl;