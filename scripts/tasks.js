let logged = localStorage.getItem("token")


const requestConfiguration = {
headers: {
    'Content-Type': 'application/json',
    'Authorization': logged
}

}

fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', requestConfiguration)

.then( response => {
        
    if(response.ok)
    {
        return response.json()
    }
    else if(response.status === 404){
        alert("Usuário não existe")
        window.location.href = '/index.html';
    }
    else {
        alert("Xi...deu ruim no server! Faz de novo.")  
        window.location.href = '/index.html'; 
    }
}
)
.then(data =>{
renderizapagina(data)
})
.catch(error => { 
    console.log(error)
    window.location.reload()
}
)

function renderizapagina(infoUsuario){
    let usuarioLogado = document.getElementById("nomeUsuario");
    usuarioLogado.innerText = infoUsuario.firstName +' '+ infoUsuario.lastName
}

function renderizatarefas(){
    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestConfiguration)
        .then(response => response.json())
        .then(data=>)
}