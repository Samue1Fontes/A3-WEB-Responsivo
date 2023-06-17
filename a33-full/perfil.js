// Função para obter o ID do usuário a partir do token
function getUserIdFromToken(token) {
  const base64Url = token.split(".")[1]; // Obtém a parte do token contendo as informações em formato base64
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Converte caracteres especiais
  const decodedToken = JSON.parse(window.atob(base64)); // Decodifica o token a partir do base64

  return decodedToken.id; // Retorna o ID do usuário do token decodificado
}

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const userId = getUserIdFromToken(token);

  // Selecionar os elementos do formulário
  const form = document.querySelector("form");
  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const cpfInput = document.getElementById("cpf");
  const dataNascimentoInput = document.getElementById("data-nascimento");

  // Preencher os campos do formulário com os dados do usuário
  fetch(`http://127.0.0.1:8080/api/users/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    mode: "cors", // Habilita o CORS
    method: "GET", // Envia uma requisição GET explícita para lidar com o preflight
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.user) {
        const user = data.user;
        nomeInput.value = user.fullName;
        emailInput.value = user.email;
        cpfInput.value = user.cpf;
        dataNascimentoInput.value = user.birthdate;
      } else {
        window.location.href = "/login.html";
      }
    })
    .catch((error) => {
      console.error("Erro ao obter os dados do usuário:", error);
    });

  // Atualizar os dados do usuário
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = nomeInput.value;
    const email = emailInput.value;
    const cpf = cpfInput.value;
    const dataNascimento = dataNascimentoInput.value;

    // Montar o objeto com os dados atualizados
    const userData = {
      fullName: nome,
      email: email,
      cpf: cpf,
      birthdate: dataNascimento,
    };

    // Enviar a requisição PATCH para atualizar os dados
    fetch(`http://127.0.0.1:8080/api/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors", // Habilita o CORS
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Verificar a resposta do servidor e agir de acordo
        if (data.success) {
          alert("Dados atualizados com sucesso!");
        } else {
          alert("Erro ao atualizar os dados do usuário.");
        }
      })
      .catch((error) => {
        console.error("Erro ao atualizar os dados do usuário:", error);
      });
  });

  // Excluir a conta do usuário
  const deleteButton = document.querySelector(".btn-danger");
  deleteButton.addEventListener("click", () => {
    if (confirm("Tem certeza que deseja excluir a sua conta?")) {
      // Enviar a requisição DELETE para excluir a conta
      fetch(`http://127.0.0.1:8080/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "cors", // Habilita o CORS
      })
        .then((response) => response.json())
        .then((data) => {
          // Verificar a resposta do servidor e agir de acordo
          if (data.success) {
            alert("Conta excluída com sucesso!");
            // Redirecionar o usuário para a página de login
            window.location.href = "/login.html";
          } else {
            alert("Erro ao excluir a conta do usuário.");
          }
        })
        .catch((error) => {
          console.error("Erro ao excluir a conta do usuário:", error);
        });
    }
  });
});
