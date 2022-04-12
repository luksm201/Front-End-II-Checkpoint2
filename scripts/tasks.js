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
renderizatarefas()
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
        .then(tarefas => {
            const tarefasIncompletas = document.querySelector(".tarefas-pendentes")
            tarefasIncompletas.innerHTML = ''
                if (tarefas.length === 0){
            tarefasIncompletas.innerHTML += `<li class="tarefa">
            <div class="not-done"></div>
            <div class="descricao">
            <p class="nome">Você não tem tarefas, crie uma tarefa.</p>
            </div>
            </li>`
            }
            else {
                for (tarefa of tarefas){
                let formatoData = tarefa.createdAt.format("MMMM Do YYYY, h:mm:ss a")    
                tarefasIncompletas.innerHTML += `<li class="tarefa">
                <div class="not-done"></div>
                <div class="descricao">
                <p class="nome">${tarefa.description}</p>
                <p class="timestamp">Criada em ${formatoData}</p>
                </div>
                </li>`

                }
            }
           
        })
        
    
}



