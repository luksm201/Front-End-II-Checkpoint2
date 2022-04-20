const userJWTToken = localStorage.getItem("token");

const getRequestConfiguration = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': userJWTToken
    }
}

fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', getRequestConfiguration)
    .then(response => {  
        if (response.ok) {
            return response.json()
        } else if(response.status === 404 || response.status === 401){
            alert("Usuário não existe.");
            throw new Error(`Erro: Usuário não existe. Status code: ${response.status}`);
        } else {
            alert("Erro no servidor. Tente fazer login novamente.");
            throw new Error(`Erro: Erro no servidor. Status code: ${response.status}`); 
        }
    })
    .then(userInfo => {
        renderPage(userInfo);
    })
    .catch(error => {
        console.log(error);
        window.location.href = '/index.html';
    }
)

function renderPage(userInfo) {
    
    renderUsername(userInfo);

    addCreateTaskButtonFunctionality();

    addEndSessionButtonFunctionality();

    renderTasks();
   
}

function renderUsername(userInfo) {

    const userNameReference = document.getElementById("nomeUsuario");
    userNameReference.innerText = userInfo.firstName + ' ' + userInfo.lastName;

}

function addCreateTaskButtonFunctionality() {

    const buttonCriarTarefaReference = document.querySelector("#criarTarefa");

    buttonCriarTarefaReference.addEventListener("click", event => {
        event.preventDefault();
        createTask();
    })

}

function addEndSessionButtonFunctionality() {

    const endSessionReference = document.querySelector("#closeApp")

    endSessionReference.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = '/index.html';
    })

}

function renderTasks() {

    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', getRequestConfiguration)
        .then(response => response.json())
        .then(tasks => {
            
            const incompleteTasksReference = document.querySelector(".tarefas-pendentes");
            const completeTasksReference = document.querySelector(".tarefas-terminadas");

            completeTasksReference.innerHTML = '';
            incompleteTasksReference.innerHTML = '';

            if (tasks.length === 0) {
                incompleteTasksReference.innerHTML += `<li class="tarefa">
                <div class="not-done"></div>
                <div class="descricao">
                <p class="nome">Você não tem tarefas, crie uma tarefa.</p>
                </div>
                </li>`
            } else {
                for (task of tasks){
                    
                    const taskDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(task.createdAt))    

                    if (task.completed) {
                        completeTasksReference.innerHTML += `<li class="tarefa">
                        <div class="not-done done" onclick="markTaskAsNotCompleted(${task.id})"></div>
                        <div class="descricao">
                        <p class="nome">${task.description}</p>
                        <p class="timestamp">Criada em ${taskDate}</p>
                        <img src="./assets/lixo.png" class="iconeLixo" onclick="deleteTask(${task.id})">
                        </div>
                        </li>`
                    } else {
                        incompleteTasksReference.innerHTML += `<li class="tarefa">
                        <div class="not-done" onclick="markTaskAsCompleted(${task.id})"></div>
                        <div class="descricao">
                        <p class="nome">${task.description}</p>
                        <p class="timestamp">Criada em ${taskDate}</p>
                        <img src="./assets/lixo.png" class="iconeLixo" onclick="deleteTask(${task.id})">
                        </div>
                        </li>`
                    }
                }
            }         
        })  
}

function createTask() {
    
    const taskInputReference = document.querySelector("#novaTarefa");

    const newTask = {
        description: taskInputReference.value,
        completed: false
    }

    const postRequestConfiguration = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': userJWTToken
        },
        body: JSON.stringify(newTask), 
        method: "POST"
    }
    
    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', postRequestConfiguration)
        .then(response => response.json())
        .then( () => {
            taskInputReference.value = "";
            renderTasks();
        })
}

function markTaskAsCompleted(taskId) {

    const updatedTask = {
        completed: true
    }

    const putRequestConfiguration = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': userJWTToken
        },
        body: JSON.stringify(updatedTask), 
        method: "PUT"
    }
    
    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${taskId}`, putRequestConfiguration)
        .then(response => response.json())
        .then( () => {
            renderTasks();
        })
}

function markTaskAsNotCompleted(taskId) {

    const updatedTask = {
        completed: false
    }

    const putRequestConfiguration = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': userJWTToken
        },
        body: JSON.stringify(updatedTask), 
        method: "PUT"
    }
    
    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${taskId}`, putRequestConfiguration)
        .then(response => response.json())
        .then( () => {
            renderTasks();
        })

}

function deleteTask(taskId) {

    const deleteRequestConfiguration = {
        headers: {
            'Authorization': userJWTToken
        },
        method: "DELETE"
    }
    
    Swal.fire({
        title: 'Você tem certeza que quer deletar essa tarefa?',
        text: 'Tarefas deletadas não podem ser recuperadas!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, delete!',
        cancelButtonText: 'Cancelar'
    })
        .then((result) => {
            if (result.isConfirmed) {
                fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${taskId}`, deleteRequestConfiguration)
                .then(response => response.json())
                .then( () => {
                    renderTasks()
                })
            }
        })
}