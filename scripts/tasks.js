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
    else if(response.status === 404 || response.status === 401){
        alert("Usuário não existe")
    }
    else {
        alert("Xi...deu ruim no server! Faz de novo.")   
    }
}
)
.then(data =>{
renderizapagina(data)
renderizaTarefas()
})
.catch(error => { 
    window.location.href = '/index.html';
}
)

function renderizapagina(infoUsuario){
    let usuarioLogado = document.getElementById("nomeUsuario");
    usuarioLogado.innerText = infoUsuario.firstName +' '+ infoUsuario.lastName
}

function renderizaTarefas(){
 fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestConfiguration)
        .then(response => response.json())
        .then(tarefas => {
            const tarefasIncompletas = document.querySelector(".tarefas-pendentes")
            
            const tarefasCompletas = document.querySelector(".tarefas-terminadas")

            tarefasCompletas.innerHTML = ''
            
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
                    let tarefaData = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(tarefa.createdAt))    

                    if(tarefa.completed){
                        tarefasCompletas.innerHTML += `<li class="tarefa">
                        <div class="not-done done" onclick="reiniciaTarefa(${tarefa.id})"></div>
                        <div class="descricao">
                        <p class="nome">${tarefa.description}</p>
                        <p class="timestamp">Criada em ${tarefaData}</p>
                        <img src="./assets/lixo.png" class="iconeLixo" onclick="deletaTarefa(${tarefa.id})">
                        </div>
                        </li>`
                    }
                    else{
                        tarefasIncompletas.innerHTML += `<li class="tarefa">
                        <div class="not-done" onclick="completaTarefa(${tarefa.id})"></div>
                        <div class="descricao">
                        <p class="nome">${tarefa.description}</p>
                        <p class="timestamp">Criada em ${tarefaData}</p>
                        <img src="./assets/lixo.png" class="iconeLixo" onclick="deletaTarefa(${tarefa.id})">
                        </div>
                        </li>`
                    }
                }
            }         
        })  
}

function criaTarefa(){
    
    let inputTarefaReference = document.querySelector("#novaTarefa")

    let novaTarefa = {
        description: inputTarefaReference.value,
        completed: false
    }

    const requestPostConfiguration = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': logged
        },
        body: JSON.stringify(novaTarefa), 
        method: "POST"
    }
    
    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestPostConfiguration)
        .then(response => response.json())
        .then( () => {
            inputTarefaReference.value = ""
            renderizaTarefas()
        })
}

let buttonCriarTarefaReference = document.querySelector("#criarTarefa")

buttonCriarTarefaReference.addEventListener("click", event => {
    event.preventDefault();
    criaTarefa();
})


function completaTarefa(id){

    let tarefaAtualizada = {
        completed: true
    }

    const requestPutConfiguration = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': logged
        },
        body: JSON.stringify(tarefaAtualizada), 
        method: "PUT"
    }
    
    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestPutConfiguration)
        .then(response => response.json())
        .then( () => {
            renderizaTarefas()
        })
}


function reiniciaTarefa(id){

    let tarefaAtualizada = {
        completed: false
    }

    const requestPutConfiguration = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': logged
        },
        body: JSON.stringify(tarefaAtualizada), 
        method: "PUT"
    }
    
    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestPutConfiguration)
        .then(response => response.json())
        .then( () => {
            renderizaTarefas()
        })
}




function deletaTarefa(id)
{
    const requestDeleteConfiguration = {
        headers: {
            'Authorization': logged
        },
        method: "DELETE"
    }
    
    Swal.fire({
        title: 'Você tem certeza disso?',
        text: "Não dá pra voltar atrás, campeão!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, delete!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestDeleteConfiguration)
            .then(response => response.json())
            .then( () => {
                renderizaTarefas()
            })
        }
      })
}

const finalizarSessaoReference = document.querySelector("#closeApp")

finalizarSessaoReference.addEventListener("click", event => {
    localStorage.removeItem("token")
    window.location.href = '/index.html';
})



