document.addEventListener("DOMContentLoaded", function () {
  // Selecionar o formulário
  const form = document.querySelector("form");

  // Adicionar evento de envio do formulário
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar o envio padrão do formulário

    // Obter os valores dos campos
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const dataNascimento = document.getElementById("data-nascimento").value;
    const localizacao = document.getElementById("localizacao").value;
    const senha = document.getElementById("senha").value;

    // Realizar ações com os dados (exemplo: enviar para o servidor)

    // Exibir uma mensagem de sucesso
    alert("Dados salvos com sucesso!");
  });

  // Selecionar o botão "Excluir conta"
  const excluirBtn = document.querySelector(".btn-danger");

  // Adicionar evento de clique no botão "Excluir conta"
  excluirBtn.addEventListener("click", function () {
    // Confirmar a exclusão da conta
    const confirmacao = confirm("Tem certeza que deseja excluir sua conta?");

    if (confirmacao) {
      // Realizar ações para excluir a conta (exemplo: enviar solicitação ao servidor)

      // Exibir uma mensagem de confirmação
      alert("Sua conta foi excluída com sucesso!");
      // Redirecionar para a página inicial
      window.location.href = "index.html";
    }
  });

  // Exemplo de nome de usuário obtido do servidor
  const nomeUsuario = "Samuel Fontes";

  // Selecionar o elemento onde será exibido o nome de usuário na navbar
  const nomeUsuarioElement = document.getElementById("nome-usuario");

  // Atualizar o texto do elemento com o nome de usuário
  nomeUsuarioElement.textContent = nomeUsuario;

  // Selecionar o botão "Sair" na navbar
  const sairNavbarBtn = document.getElementById("sair-navbar");

  // Adicionar evento de clique no botão "Sair" na navbar
  sairNavbarBtn.addEventListener("click", function () {
    // Realizar ações para o logoff do usuário (exemplo: enviar solicitação ao servidor)

    // Redirecionar para a página principal
    window.location.href = "index.html";
  });
});
