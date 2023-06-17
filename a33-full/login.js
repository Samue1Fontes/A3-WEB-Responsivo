document.addEventListener('DOMContentLoaded', () => {
    const cpfInput = document.getElementById('cpf');
    cpfInput.addEventListener('input', formatCPF);

    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', login);
});

function login(event) {
    event.preventDefault(); // Impede o envio do formulário por padrão

    // Obtenha os valores do formulário (exemplo: nome de usuário e senha)
    const emailCpf = document.getElementById('cpf').value;
    const password = document.getElementById('password').value;

    // Faça uma requisição POST para o servidor com os dados do login
    fetch('http://127.0.0.1:8080/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cpf: emailCpf, password })
    })
        .then(response => response.json())
        .then(data => {
            // Verifique a resposta do servidor e aja de acordo
            if (data.success) {
                // O login foi bem-sucedido, redirecione o usuário para a página de perfil
                localStorage.setItem('token', data.token);
                alert('Login feito com sucesso!')
                window.location.href = '../index.html';
            } else {
                // O login falhou, exiba uma mensagem de erro adequada para o usuário
                const errorMessage = document.getElementById('errorlog');
                errorMessage.textContent = 'Login inválido. Por favor, tente novamente.';
                errorMessage.style.display = 'block';

            }
        })
        .catch(error => {
            // Lida com erros de conexão ou outros erros durante a requisição
            console.error('Erro durante o login:', error);
        });
}

function formatCPF() {
    const cpfInput = document.getElementById('cpf');
    let cpf = cpfInput.value;

    cpf = cpf.replace(/\D/g, ''); // Remove qualquer caractere não numérico

    if (cpf.length > 11) {
        cpf = cpf.slice(0, 11); // Limita o CPF a 11 dígitos
    }

    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona um ponto após os primeiros 3 dígitos
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona um ponto após os próximos 3 dígitos
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona um hífen antes dos últimos 2 dígitos

    cpfInput.value = cpf;
}
