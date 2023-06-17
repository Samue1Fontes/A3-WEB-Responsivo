const { DataTypes } = require('sequelize');
// const db = require('./db');

module.exports = (sequelize) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
      unique: true,
      defaultValue: () => Math.floor(10000 + Math.random() * 90000), // Gera um valor aleatório entre 10000 e 99999
    },
    email: {
      type: DataTypes.STRING(35),
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    fullName: {
      type: DataTypes.STRING(50),
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true,
      validate: {
        is: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, // Regex para validar o formato do CPF (XXX.XXX.XXX-XX)
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

    //User.sync(); // Cria a tabela do modelo caso não exista
    //User.sync({ alter: true })  // Caso exista diferença na tabela, faz a alteração

  return User;
};