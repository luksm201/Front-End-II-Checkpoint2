const inputNomeReference = document.querySelector("#inputNome");
const inputSobrenomeReference = document.querySelector("#inputSobrenome");
const inputEmailReference = document.querySelector("#inputEmail");
const inputSenhaReference = document.getElementById("inputSenha");
const inputRepetirSenhaReference = document.getElementById("inputRepetirSenha");
const formReference = document.querySelector("form");
const buttonReference = document.querySelector("button");

function validateForm() {

    formReference.checkValidity() && validar_senha() ? buttonReference.disabled = false : buttonReference.disabled = true;

}

function validateField(event) {

    event.target.checkValidity() ? event.target.classList.remove("invalid") : event.target.classList.add("invalid");

}

inputNomeReference.oninput = validateForm;
inputSobrenomeReference.oninput = validateForm;
inputEmailReference.oninput = validateForm;
inputSenhaReference.oninput = validateForm;
inputRepetirSenhaReference.oninput = validateForm;

inputNomeReference.onchange = validateField;
inputSobrenomeReference.onchange = validateField;
inputEmailReference.onchange = validateField;
inputSenhaReference.onchange = validateField;
inputRepetirSenhaReference.onchange = validar_senha;

function validar_senha() {
    let senha = inputSenhaReference.value;
    let senhaRepetir = inputRepetirSenhaReference.value;
    if ((senha != senhaRepetir) ||
      (senha == "") || (senhaRepetir == "")) {
      return false;
    } else {
      return true;
    }
  }

buttonReference.addEventListener("click", event => {

    event.preventDefault();

    const novoUsuario = {

        firstName: inputNomeReference.value,
        lastName: inputSobrenomeReference.value,
        email: inputEmailReference.value,
        password: inputSenhaReference.value

    }

    const requestConfiguration = {

        method: 'POST',
        body: JSON.stringify(novoUsuario),
        headers: {
            'Content-Type': 'application/json'
        }

    }

    fetch('https://ctd-todo-api.herokuapp.com/v1/users', requestConfiguration)
    .then( response => response.json())
    .then( data => {

        localStorage.setItem('token', data.jwt)
        console.log("Hello")

    });

    // window.location.href = '/index.html';

})