let inputEmailReference = document.querySelector("#inputEmail");
let inputSenhaReference = document.querySelector("#inputPassword");
let formReference = document.querySelector("form");
let buttonReference = document.querySelector("button");

function validateForm() {

    if (formReference.checkValidity()){
        buttonReference.classList.remove("disabled")
        buttonReference.disabled = false
    }
    else{
        buttonReference.classList.add("disabled")
        buttonReference.disabled = true
    }

}

function validateField(event) {

    event.target.checkValidity() ? event.target.classList.remove("invalid") : event.target.classList.add("invalid");

}

inputEmailReference.oninput = validateForm;
inputSenhaReference.oninput = validateForm;
inputEmailReference.onchange = validateField;
inputSenhaReference.onchange = validateField;

buttonReference.addEventListener("click", event => {
    
    event.preventDefault();

    const Usuario = {
        email: inputEmailReference.value.trim().toLowerCase(),
        password: inputSenhaReference.value
    }

    const requestConfiguration = {

        method: 'POST',
        body: JSON.stringify(Usuario),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch('https://ctd-todo-api.herokuapp.com/v1/users/login', requestConfiguration)
    .then( response => {
        
        if(response.ok)
        {
            return response.json()
        }
        else if(response.status === 400){
            alert("Senha Incorreta")
        }
        else if(response.status === 404){
            alert("Usuário já existente")
        }
        else {
            alert("Opss, houve um erro nesta página")   
        }
    }
    )
    .then( data => {
        localStorage.setItem('token', data.jwt)
        window.location.href = './tarefas.html';
    })
    .catch(error => { 
        console.log(error)
        window.location.reload()
    }
    )
})