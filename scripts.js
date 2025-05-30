const lista = document.getElementById('listaTarefas');
const input = document.getElementById('tarefaInput');

// Carrega tarefas do servidor ao iniciar
window.onload = function () {
  fetch('http://localhost:3000/tarefas')
    .then(res => res.json())
    .then(tarefas => {
      tarefas.forEach((tarefa, index) => criarTarefa(tarefa.texto, tarefa.concluida, index));
    });
};

// Adicionar nova tarefa
function adicionarTarefa() {
  const texto = input.value.trim();
  if (texto === '') {
    alert('Por favor, escreve uma tarefa!');
    return;
  }

  const novaTarefa = { texto: texto, concluida: false };

  fetch('http://localhost:3000/tarefas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(novaTarefa)
  })
    .then(() => location.reload()); // recarrega para mostrar a nova tarefa
}

// Criar item na interface
function criarTarefa(texto, concluida, index) {
  const item = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = concluida;

  const span = document.createElement('span');
  span.textContent = texto;
  if (concluida) span.classList.add('concluida');

 checkbox.onchange = () => {
  span.classList.toggle('concluida');

  fetch(`http://localhost:3000/tarefas/${index}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ concluida: checkbox.checked })
  });
};
;
  // Atualização no servidor pode ser adicionada aqui
  const remover = document.createElement('span');
  remover.textContent = '✖';
  remover.classList.add('remover-tarefa');
  remover.onclick = () => {
    fetch(`http://localhost:3000/tarefas/${index}`, {
      method: 'DELETE'
    }).then(() => location.reload());
  };

  item.appendChild(checkbox);
  item.appendChild(span);
  item.appendChild(remover);
  lista.appendChild(item);
}

// Extras: relógio, tema, etc.
function atualizarRelogio() {
  const agora = new Date();
  const horas = String(agora.getHours()).padStart(2, '0');
  const minutos = String(agora.getMinutes()).padStart(2, '0');
  const segundos = String(agora.getSeconds()).padStart(2, '0');
  const tempoFormatado = `${horas}:${minutos}:${segundos}`;
  document.getElementById('relogio').textContent = tempoFormatado;
}
setInterval(atualizarRelogio, 1000);
atualizarRelogio();

function alternarTema() {
  document.body.classList.toggle("claro");
}
