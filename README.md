<div align="right"> <img src="https://github.com/lipollis/Imagens-Git/blob/main/sun.png" /> </div>

<h1 align="center"> PROJETO To-Do List </h1>
<h2 align="center">MATERIA FRONT-END II - CHECKPOINT FRONT END II </h2>

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg" width="50px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg" width="50px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="50px"/>
  <br>
  <br>
  <a href="https://lipollis.github.io/DH-FrontEndII-Checkpoint_2/">
    <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" /></a>
</div>
<br>
<br>

<h2>🛠️ Construído por</h2>

- [Aanderson Silva](https://github.com/andersonsilva8609)
- [Hebert Santos](https://github.com/HbTechdev)
- [Henrique Arantes](https://github.com/)
- [Lucas Mota](https://github.com/)
- [Mozarth Spier](https://github.com/mozarthspier)

<br>
<h2>:beginner: Objetivo</h2>

<p align="justify">Esta atividade tem como objetivo servir como segundo instrumento avaliativo da disciplina Front-end II. Se atente às instruções e bom trabalho. O entregável é uma aplicação de to-do (lista de coisas a fazer). O projeto terá 2 páginas.</p>

<br>
<h2>:heavy_check_mark: Requisitos </h2>

<ol>
  <li> A primeira página deve ter um *formulário de cadastro* com os inputs: </li>
    <ul>
      <li>Nome</li>
      <li>Senha</li>
      <li>Repetir senha</li>
      <li>E-mail</li>
      <li>Botão de submit para criar a conta</li>
  </ul>
  
<br>
  <li> A segunda página deve ter um *formulário para criação de tarefas* com os inputs: </li>
    <ul>
      <li>Data de criação: o usuário não poderá alterar esse input, mas ele deve ser exibido.</li>
      <li>Data limite da tarefa: data que o usuário deseja terminar aquela tarefa.</li>
      <li>Descrição: texto da tarefa.</li>
      <li>Botão de submit.</li>
  </ul>
  
  <br>
  <li> Validações: </li>
    <ul>
      <li>Nenhum campo pode ser vazio.</li>
      <li>A descrição deve ter mais que 10 caracteres.</li>
      <li>IMPORTANTE: Quando o usuário não preencher corretamente deve ser exibido um alerta indicando que existem erros na criação da tarefa.</li>
      <li>OPCIONAL/EXTRA: a data limite da tarefa deve ser hoje ou no futuro.</li>
  </ul>
  
  <br>
  <li> Funcionalidades: </li>
    <ul>
      <li>Quando o usuário clicar em submit, se ele passar pela validação, a anotação deve ser exibida na tela por meio de um card.</li>
      <li>No card da anotação deve ter um botão para excluir a anotação. Quando ele for clicado deverá ser exibido um aviso confirmando a intenção de excluir a anotação. Se o usuário confirmar a intenção de excluir, o card desta nota deve desaparecer.</li>
      <li>Ainda no card da anotação, deverá existir um checkbox que ao ser clicado faz o texto daquela anotação ficar tachado. Tarefa concluida.</li>
      <li>OPCIONAL/EXTRA: versão dark mode.</li>
  </ul>
  
  <br>
  <li> Na segunda página, iremos consumir uma api de lista de tarefas. </li>
    <ul>
      <li>O end-point (https://jsonplaceholder.typicode.com/todos/) responde com um JSON com 200 tarefas. Essas 200 tarefas devem ser consumidas pelo JS e renderizadas também como cards na página.</li>
      <li>Nas tarefas onde o atributo “completed": true” o texto do atributo title deve estar tachado. Pois significa que a tarefa ja foi completada.</li>
      <li>Nas tarefas onde o atributo “completed": false” o texto do atributo title deve estar em negrito. Pois significa que a tarefa está a fazer.</li>
      <li>Exiba também o conteúdo do atributo “id”.</li>
  </ul>
</ol>