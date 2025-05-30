**<!DOCTYPE html>
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Lista de Tarefas</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <h1>Lista de Tarefas</h1>

    <input type="text" id="tarefaInput" placeholder="Adicionar nova tarefa..." />
    
    <div id="relogio" class="relogio-lateral"></div>
   

    <!-- Botão -->
    <div class="btn-container">
      <button class="btn-effect-1" onclick="adicionarTarefa()">adicionar</button>
    </div>
    
    <div class="icones-laterais">
  <span class="icone" onclick="alternarTema()">🌙</span>
</div>
    
    <!-- Resumo de tarefas -->
    <div class="resumo-tarefas">
      <p>😃 Concluídas: <span id="contaConcluidas">0</span></p>
      <p>😐 Pendentes: <span id="contaPendentes">0</span></p>
    </div>

    <!-- Lista de tarefas -->
    <ul id="listaTarefas"></ul>

  </div>
  <script src="script.js"></script>
</body>
</html>
