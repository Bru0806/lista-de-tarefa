const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve HTML, CSS e JS da pasta public

const caminho = './tarefas.json';

function lerTarefas() {
  return JSON.parse(fs.readFileSync(caminho));
}

app.get('/tarefas', (req, res) => {
  res.json(lerTarefas());
});

app.post('/tarefas', (req, res) => {
  const tarefas = lerTarefas();
  tarefas.push(req.body);
  fs.writeFileSync(caminho, JSON.stringify(tarefas, null, 2));
  res.status(201).send();
});

app.delete('/tarefas/:index', (req, res) => {
  const tarefas = lerTarefas();
  tarefas.splice(req.params.index, 1);
  fs.writeFileSync(caminho, JSON.stringify(tarefas, null, 2));
  res.status(200).send();
});

app.listen(PORT, () =>
  console.log(`Servidor ativo em http://localhost:${PORT}`)
);
// Atualizar estado de conclusão (PATCH)
app.patch('/tarefas/:index', (req, res) => {
  const tarefas = lerTarefas();
  const index = req.params.index;
  tarefas[index].concluida = req.body.concluida;
  fs.writeFileSync(caminho, JSON.stringify(tarefas, null, 2));
  res.status(200).send();
});
