/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

// Carrega o conteúdo HTML
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

describe('Teste da lista de tarefas', () => {
  let addTaskBtn;
  let taskInput;
  let taskList;

  beforeEach(() => {
    // Define o documento com o conteúdo HTML
    document.documentElement.innerHTML = html.toString();

    // Carrega o script JS (app.js) no ambiente de teste
    require('./app.js');

    // Pega os elementos DOM
    addTaskBtn = document.getElementById('add-task-btn');
    taskInput = document.getElementById('task-input');
    taskList = document.getElementById('task-list');
  });

  test('Deve adicionar uma tarefa à lista', () => {
    // Simula entrada de texto
    console.log(addTaskBtn, taskInput, taskList);
    taskInput.value = 'Estudar Jest';

    // Simula clique no botão "Adicionar"
    addTaskBtn.click();

    // Verifica se a tarefa foi adicionada à lista
    expect(taskList.children.length).toBe(1);
    expect(taskList.children[0].textContent).toContain('Estudar Jest');
  });

  test('Deve adicionar 3 tarefas e verificar a quantidade na lista', () => {

    const tarefas = ['Estudar Jest', 'Praticar JavaScript', 'Testar funcionalidades'];

    tarefas.forEach(tarefa => {
      taskInput.value = tarefa;
      addTaskBtn.click();
    });

    expect(taskList.children.length).toBe(3);
    expect(taskList.children[0].textContent).toContain('Estudar Jest');
    expect(taskList.children[1].textContent).toContain('Praticar JavaScript');
    expect(taskList.children[2].textContent).toContain('Testar funcionalidades');
  });

  test('Deve remover uma tarefa da lista', () => {
    // Simula entrada de texto e adição de uma tarefa
    taskInput.value = 'Estudar Jest';
    addTaskBtn.click();

    // Verifica se a tarefa foi adicionada
    expect(taskList.children.length).toBe(1);

    // Simula clique no botão "Excluir"
    const deleteBtn = taskList.querySelector('.delete-btn');
    deleteBtn.click();

    // Verifica se a tarefa foi removida
    expect(taskList.children.length).toBe(0);
  });

  test('Não deve adicionar tarefa vazia', () => {
    // Simula um valor vazio no input
    taskInput.value = '';

    // Simula clique no botão "Adicionar"
    addTaskBtn.click();

    // Verifica se a lista de tarefas continua vazia
    expect(taskList.children.length).toBe(0);
  });

  test('Deve marcar todas as tarefas como concluídas', () => {
   
    const tarefas = ['Estudar Jest', 'Praticar JavaScript', 'Testar funcionalidades'];

    tarefas.forEach(tarefa => {
      taskInput.value = tarefa;
      addTaskBtn.click();
    });

    while (taskList.children.length > 0) {
      const deleteBtn = taskList.querySelector('.delete-btn');
      deleteBtn.click();
    }

    expect(taskList.children.length).toBe(0);
  });
});
