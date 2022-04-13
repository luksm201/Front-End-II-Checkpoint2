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
renderizaTarefas()
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
                        <div class="not-done"></div>
                        <div class="descricao">
                        <p class="nome">${tarefa.description}</p>
                        <p class="timestamp">Criada em ${tarefaData}</p>
                        </div>
                        </li>`
                    }
                    else{
                        tarefasIncompletas.innerHTML += `<li class="tarefa">
                        <div class="not-done" onclick="atualizaTarefa(${tarefa.id})"></div>
                        <div class="descricao">
                        <p class="nome">${tarefa.description}</p>
                        <p class="timestamp">Criada em ${tarefaData}</p>
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
            renderizaTarefas()
        })
}

let buttonCriarTarefaReference = document.querySelector("#criarTarefa")

buttonCriarTarefaReference.addEventListener("click", event => {
    event.preventDefault();
    criaTarefa();
})

let marcadorReference = document.querySelector('ul');
list.addEventListener('click', event => {
  if( event.target.tagName === 'LI') {
     event.target.classList.toggle('done');

  }
}, false);


function atualizaTarefa(id){



}



