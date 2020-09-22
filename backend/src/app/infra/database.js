//Responsabilidade: define configurações para schema e tabela do banco de dados MySql

class Database {

  init(connection) {
      this.connection = connection;

      this.createSchema();
      this.createTableUsers();
      this.createTableLists();
      this.createTableTasks();
  }

  createSchema() {
    const schema = 'CREATE SCHEMA IF NOT EXISTS donit DEFAULT CHARACTER SET utf8';
    const use = 'USE donit';

    this.connection.query(schema, erro => {
        if(erro) {
            console.log(erro);
        } else {
            console.log('Success on Schema creation!');
        }
    })
    this.connection.query(use, erro => {
        if(erro) {
            console.log(erro);
        } else {
            console.log('Database changed');
        }
    })
  }

  createTableUsers() {
    const table = 'CREATE TABLE IF NOT EXISTS donit.users (userId INT NOT NULL AUTO_INCREMENT, email VARCHAR(100) NOT NULL, password VARCHAR(255) NOT NULL, name VARCHAR(100) NULL, token VARCHAR(8000), PRIMARY KEY (userId)) ENGINE = InnoDB';

    this.connection.query(table, erro => {
        if(erro) {
            console.log(erro);
        } else {
            console.log('Success on Table Users creation!');
        }
    })
    }

     createTableLists() {
         const table = 'CREATE TABLE IF NOT EXISTS donit.lists (listId INT NOT NULL AUTO_INCREMENT, userId INT NOT NULL, descList VARCHAR(8000) NOT NULL, type VARCHAR(20) NULL, name VARCHAR(100) NULL, PRIMARY KEY (listId), FOREIGN KEY (userId) REFERENCES users(userId))';

         this.connection.query(table, erro => {
             if (erro) {
                 console.log(erro);
             } else {
                 console.log('Success on Table Lists creation!');
             }
         })
     }

     createTableTasks() {
         const table = 'CREATE TABLE IF NOT EXISTS donit.tasks (taskId INT NOT NULL AUTO_INCREMENT, listId INT NOT NULL, descTask VARCHAR(8000) NOT NULL, creationDate DATE NOT NULL, conclusionDate DATE NULL, dueDate DATE NULL, done TINYINT(1) NOT NULL DEFAULT 0, name VARCHAR(100) NULL, priority VARCHAR(100) NULL, PRIMARY KEY (taskid), FOREIGN KEY (listId) REFERENCES lists(listId) ON DELETE CASCADE)';

         this.connection.query(table, erro => {
             if (erro) {
                 console.log(erro);
             } else {
                 console.log('Success on Table Tasks creation!');
             }
         })
     }
}

module.exports = new Database;
