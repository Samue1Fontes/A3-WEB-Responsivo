// config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql', // substitua pelo seu banco de dados (por exemplo, 'postgres', 'sqlite', etc.)
  host: 'localhost', // substitua pelo host do seu banco de dados
  port: 3306, // substitua pela porta do seu banco de dados
  username: 'root', // substitua pelo nome de usuário do seu banco de dados
  password: '', // substitua pela senha do seu banco de dados
  database: 'banco' // substitua pelo nome do seu banco de dados
});

module.exports = sequelize;
