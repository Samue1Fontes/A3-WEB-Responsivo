const Sequelize = require('sequelize');

const conn = new Sequelize("banco", "root", "", {
    host: 'localhost',
    dialect: 'mysql'
});

/*conn.authenticate()
.then(function(){
    console.log("Conexão com o banco realizada com sucesso!")

}).catch(function(){
    console.log("Erro: Conecxão com banco de dados não realizada!");
});
*/

conn.authenticate()
    .then(() => {
        console.log("Conexão com o banco realizada com sucesso!");
    })
    .catch((error) => {
        console.error("Erro na conexão com o banco de dados:", error);
    });

module.exports = conn;