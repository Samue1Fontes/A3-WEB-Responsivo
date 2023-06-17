const express = require('express');
const app = express();
const PORT = 8080; // Porta em que o servidor irá ouvir
const db = require('../models/db'); // Importe a instância do Sequelize do arquivo db.js
const User = require('../models/User')(db); // Importe o modelo de usuário

// Middleware para configurar o CORS
app.use((req, res, next) => {
    // Permite solicitações de qualquer origem
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Define os métodos HTTP permitidos
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Define os cabeçalhos permitidos
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Configurar o middleware para analisar o corpo das requisições como JSON
app.use(express.json());

// Rota para lidar com o cadastro de usuários
app.post('/api/users', async (req, res) => {
    console.log('Rota /api/users acionada');
    console.log('Dados do usuário:', req.body);

    // Obtenha os dados do usuário enviados pelo formulário
    const { fullName, cpf, birthdate, password, email } = req.body;

    // Verifique se todos os campos estão preenchidos
    if (!fullName || !cpf || !birthdate || !password || !email) {
        return res.status(400).json({ error: 'Todos os campos devem ser preenchidos.' });
    }

    try {
        // Verificar se o CPF já está em uso
        const existingCPF = await User.findOne({ where: { cpf: cpf.replace(/[^\d]/g, '') } });
        if (existingCPF) {
            return res.status(400).json({ error: 'CPF já está em uso.' });
        }

        // Verificar se o e-mail já está em uso
        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ error: 'E-mail já está em uso.' });
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


// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
