function validateRegistrationForm() {
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const cpfInput = document.getElementById('cpf');
    const birthdateInput = document.getElementById('birthdate');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const cpf = cpfInput.value.trim();
    const birthdate = birthdateInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();


    let isValid = true;

    if (fullName === '') {
        displayError(fullNameInput, 'Informe seu nome completo.');
        isValid = false;
    } else {
        removeError(fullNameInput);
    }

    if (email === '') {
        displayError(emailInput, 'Informe um email válido.');
        isValid = false;
    } else {
        removeError(emailInput);
    }

    if (cpf === '') {
        displayError(cpfInput, 'Informe um CPF válido.');
        isValid = false;
    } else {
        removeError(cpfInput);
    }

    if (birthdate === '') {
        displayError(birthdateInput, 'Informe sua data de nascimento.');
        isValid = false;
    } else {
        removeError(birthdateInput);
    }

    if (password === '') {
        displayError(passwordInput, 'Informe uma senha válida.');
        isValid = false;
    } else {
        removeError(passwordInput);
    }

    if (confirmPassword === '' || confirmPassword !== password) {
        displayError(confirmPasswordInput, 'As senhas não coincidem.');
        isValid = false;
    } else {
        removeError(confirmPasswordInput);
    }

    if (!isValid) {
        return false;
    }

    return isValid;
}

function sendRegistrationRequest(userData) {
    fetch('http://127.0.0.1:8080/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (response.ok) {
                console.log('Usuário cadastrado com sucesso!');
                alert('Usuário cadastrado com sucesso!')
                window.location.href = 'login.html';
                // Redirecionar para a página de sucesso de cadastro
            } else {
                console.error('Erro ao cadastrar usuário:', response.statusText);
                // Exibir mensagem de erro para o usuário
            }
        })
        .catch(error => {
            console.error('Erro ao cadastrar usuário:', error);
            // Exibir mensagem de erro para o usuário
        });
}

function getFormData() {
    // Obter referência aos campos do formulário
    var fullNameInput = document.getElementById('fullName');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var cpfInput = document.getElementById('cpf');
    var birthdateInput = document.getElementById('birthdate');

    // Obter valores dos campos
    var fullName = fullNameInput.value;
    var email = emailInput.value;
    var password = passwordInput.value;
    var cpf = cpfInput.value;
    var birthdate = birthdateInput.value;

    // Criar objeto com os dados do usuário
    var userData = {
        fullName: fullName,
        email: email,
        password: password,
        cpf: cpf,
        birthdate: birthdate
    };

    // Enviar requisição de registro
    sendRegistrationRequest(userData);
}


// Evento de envio do formulário
const registrationForm = document.getElementById('registrationForm');
if (registrationForm) {
    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Impedir o envio do formulário
        getFormData();
    });
} else {
    console.error('Elemento registrationForm não foi encontrado.');
}


function displayError(inputElement, errorMessage) {
    inputElement.classList.add('error');
    inputElement.setAttribute('title', errorMessage);
}

function removeError(inputElement) {
    inputElement.classList.remove('error');
    inputElement.removeAttribute('title');
}

function showPasswordRequirements() {
    const requirementsList = document.getElementById('password-requirements');
    requirementsList.style.opacity = '1';
    requirementsList.style.transform = 'translateY(0)';
}

function hidePasswordRequirements() {
    const requirementsList = document.getElementById('password-requirements');
    requirementsList.style.opacity = '0';
    requirementsList.style.transform = 'translateY(100%)';
}

function validatePassword() {
    const passwordInput = document.getElementById('password');
    const password = passwordInput.value.trim();

    const requirementsList = document.getElementById('password-requirements');
    requirementsList.innerHTML = '';

    // Verifica se a senha tem pelo menos 8 caracteres
    const lengthRequirement = document.createElement('li');
    lengthRequirement.textContent = 'Pelo menos 8 caracteres';
    if (password.length >= 8) {
        lengthRequirement.classList.add('valid');
        lengthRequirement.innerHTML += ' &#x2713;'; // Código HTML do símbolo de "C" correto
    } else {
        lengthRequirement.classList.add('error');
        lengthRequirement.innerHTML += ' &#x2717;'; // Código HTML do símbolo de "X" erro
    }
    requirementsList.appendChild(lengthRequirement);

    // Verifica se a senha tem pelo menos uma letra maiúscula
    const uppercaseRequirement = document.createElement('li');
    uppercaseRequirement.textContent = 'Pelo menos uma letra maiúscula';
    if (/[A-Z]/.test(password)) {
        uppercaseRequirement.classList.add('valid');
        uppercaseRequirement.innerHTML += ' &#x2713;'; // Código HTML do símbolo de "C" correto
    } else {
        uppercaseRequirement.classList.add('error');
        uppercaseRequirement.innerHTML += ' &#x2717;'; // Código HTML do símbolo de "X" erro
    }
    requirementsList.appendChild(uppercaseRequirement);

    // Verifica se a senha tem pelo menos um caractere especial
    const specialCharRequirement = document.createElement('li');
    specialCharRequirement.textContent = 'Pelo menos um caractere especial';
    if (/[!@#$%^&*(),.?":{}|<>_-]/.test(password)) {
        specialCharRequirement.classList.add('valid');
        specialCharRequirement.innerHTML += ' &#x2713;'; // Código HTML do símbolo de "C" correto
    } else {
        specialCharRequirement.classList.add('error');
        specialCharRequirement.innerHTML += ' &#x2717;'; // Código HTML do símbolo de "X" erro
    }
    requirementsList.appendChild(specialCharRequirement);
}

function validateConfirmPassword() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        // Senhas não coincidem
        confirmPasswordInput.setCustomValidity("As senhas não coincidem.");
    } else {
        // Senhas coincidem
        confirmPasswordInput.setCustomValidity('');
    }
}

document.addEventListener('DOMContentLoaded', hidePasswordRequirements);

const passwordInput = document.getElementById('password');
passwordInput.addEventListener('focus', showPasswordRequirements);
passwordInput.addEventListener('blur', hidePasswordRequirements);
passwordInput.addEventListener('input', validatePassword);


function validateCPF(cpf) {
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }

    // Calcula o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit >= 10) {
        digit = 0;
    }
    if (parseInt(cpf.charAt(9)) !== digit) {
        return false;
    }

    // Calcula o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit >= 10) {
        digit = 0;
    }
    if (parseInt(cpf.charAt(10)) !== digit) {
        return false;
    }

    return true;
}

function formatCPF(cpf) {
    if (typeof cpf !== 'string') {
        return cpf; // Retorna o valor original se não for uma string
    }

    cpf = cpf.replace(/[^\d]/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    return cpf;
}

function handleCPFInput() {
    const cpfInput = document.getElementById('cpf');
    const formattedCPF = formatCPF(cpfInput.value);
    cpfInput.value = formattedCPF;
}

document.addEventListener('DOMContentLoaded', function () {
    const cpfInput = document.getElementById('cpf');
    cpfInput.addEventListener('input', handleCPFInput);
});


// --------------- Async version ---------------

async function ValidateRegistrationForm() {
    const fullNameInput = document.getElementById('fullName');
    const cpfInput = document.getElementById('cpf');
    const birthdateInput = document.getElementById('birthdate');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const fullName = fullNameInput.value.trim();
    const cpf = cpfInput.value.trim();
    const birthdate = birthdateInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    let isValid = true;

    if (fullName === '') {
        displayError(fullNameInput, 'Informe seu nome completo.');
        isValid = false;
    } else {
        removeError(fullNameInput);
    }

    if (cpf === '') {
        displayError(cpfInput, 'Informe um CPF válido.');
        isValid = false;
    } else {
        removeError(cpfInput);
    }

    if (birthdate === '') {
        displayError(birthdateInput, 'Informe sua data de nascimento.');
        isValid = false;
    } else {
        removeError(birthdateInput);
    }

    if (password === '') {
        displayError(passwordInput, 'Informe uma senha válida.');
        isValid = false;
    } else {
        removeError(passwordInput);
    }

    if (confirmPassword === '' || confirmPassword !== password) {
        displayError(confirmPasswordInput, 'As senhas não coincidem.');
        isValid = false;
    } else {
        removeError(confirmPasswordInput);
    }

    if (isValid) {
        try {
            const response = await fetch('http://127.0.0.1:8080/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fullName, cpf, birthdate, password })
            });
            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
                // Redirecionar para a página de sucesso de cadastro
            } else {
                console.error(data.error);
                // Exibir mensagem de erro para o usuário
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            // Exibir mensagem de erro para o usuário
        }
    }
    return isValid;
}
