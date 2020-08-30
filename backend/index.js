const customExpress = require("./src/config/custom-express.js");
const connection = require('./src/app/infra/connection.js');
const Database = require('./src/app/infra/database.js');

connection.connect((erro) => {
    if (erro) console.log(erro);
    else {
        console.log('Mysql connected');

        Database.init(connection);
        const app = customExpress();
        app.listen(8080, function () { console.log('Sever up! Port 8080') });
    }
});

//Endereço no navegador: http://localhost:8080/donit

/* Console.log de início (sucesso)
  -Mysql connected
  -Success on Schema creation!
  -Database changed
  -Success on Table Users creation!
  -Success on Table Lists creation!
  -Success on Table Tasks creation!
  -Sever up! Port 8080
*/

//npm install ->para instalar os módulos todos