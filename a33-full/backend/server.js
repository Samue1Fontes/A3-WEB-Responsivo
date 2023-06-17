const express = require('express');
const app = express();
const PORT = 8080; // Porta em que o servidor irá ouvir
const db = require('../models/db'); // Importe a instância do Sequelize do arquivo db.js
const User = require('../models/User')(db); // Importe o modelo de usuário
const path = require('path');
const jwt = require('jsonwebtoken');

// Middleware para configurar o CORS
app.use((req, res, next) => {
  // Permite solicitações de qualquer origem
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Define os métodos HTTP permitidos
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // Define os cabeçalhos permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Adicione 'Authorization' aqui
  next();
});


// Configurar o middleware para analisar o corpo das requisições como JSON
app.use(express.json());

// Configuração da chave secreta para assinar e verificar os tokens JWT
const secretKey = 'bandido4@'; // Substitua com sua própria chave secreta

// Função para gerar um token de autenticação
function generateToken(userId) {
  const token = jwt.sign({ id: userId }, secretKey, { expiresIn: '1h' });
  return token;

}

// Rota para lidar com o cadastro de usuários
app.post('/api/users', async (req, res) => {
  console.log('Rota /api/users acionada');
  console.log('Dados do usuário:', req.body);

  // Obtenha os dados do usuário enviados pelo formulário
  const { fullName, cpf, birthdate, password, email } = req.body;

  try {
    // Verificar se o CPF já está em uso
    if (cpf) {
      const existingCPF = await User.findOne({ where: { cpf } });
      if (existingCPF) {
        return res.status(400).json({ error: 'CPF já está em uso.' });
      }
    } else {
      return res.status(400).json({ error: 'CPF não fornecido.' });
    }

    // Criar um novo usuário no banco de dados
    const newUser = await User.create({ fullName, cpf, birthdate, password, email });

    // Log para verificar o novo usuário cadastrado
    console.log('Novo usuário cadastrado:', newUser);

    // Enviar uma resposta indicando que o usuário foi cadastrado com sucesso
    res.json({ message: 'Usuário cadastrado com sucesso!', user: newUser });
  } catch (error) {
    // Se ocorrer algum erro, enviar uma resposta com o status de erro e a mensagem
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o usuário.' });
  }
});

// Rota para lidar com o login de usuários
app.post('/api/login', async (req, res) => {
  console.log('Rota /api/login acionada');
  console.log('Dados do login:', req.body);

  // Obtenha os dados de login enviados pelo formulário
  const { cpf, password } = req.body;

  try {
    // Verificar se o CPF e a senha correspondem a um usuário registrado
    const user = await User.findOne({ where: { cpf, password } });

    if (user) {
      // O login foi bem-sucedido, enviar uma resposta com sucesso
      const token = generateToken(user.id); // Função para gerar um token de autenticação
      res.json({ success: true, token, userId: user.id });
      console.log('USUÁRIO LOGADO COM SUCESSO');
      console.log(token, user.id)

    } else {
      // O login falhou, enviar uma resposta com falha
      res.json({ success: false });
    }
  } catch (error) {
    // Se ocorrer algum erro, enviar uma resposta com o status de erro e a mensagem
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao fazer login.' });
  }
});

// Rota para buscar os dados do usuário pelo ID
app.get('/api/users/:id', async (req, res) => {
  console.log('Rota /api/users/:id acionada');
  const userId = req.params.id;

  try {
    // Buscar o usuário pelo ID no banco de dados
    const user = await User.findByPk(userId);

    if (user) {
      // Enviar uma resposta com os dados do usuário
      res.json({ user });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao buscar os dados do usuário:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao buscar os dados do usuário.' });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});