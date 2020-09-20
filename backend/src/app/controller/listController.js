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
            const lists = await listManag.getLists(userid);
            if (!lists) {
                return resp.send("No lists were found") //trocar por pagina do front
            }
            else {
                return resp.json(lists);
            }
        }
    }

    //pegar todos os dados que uma lista tem // não seria criar a lista?
    createList() {
        return async function (req, resp) {
            const userid = req.query.id;
            const list = await listManag.createLists(userid);
            if (!lists) {
                return resp.send("No lists were found") //trocar por pagina do front
            }
            else {
                return resp.json(lists);
            }
        }
    }

    deleteList() {
        return async function (req, resp) {
            const listid = req.query.id;
            await listManag.deleteList(listid);
            return resp.status(204);
        }
    }
}

module.exports = ListControl;