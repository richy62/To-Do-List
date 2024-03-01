
document.addEventListener('DOMContentLoaded', function() {
  const taskForm = document.getElementById('taskForm');
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');

  taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      addTask(taskText);
      taskInput.value = '';
    }
  });

  taskList.addEventListener('change', function(event) {
    if (event.target.type === 'checkbox') {
      const taskItem = event.target.parentElement;
      if (event.target.checked) {
        taskItem.classList.add('completed');
      } else {
        taskItem.classList.remove('completed');
      }
      saveTasks();
    }
  });

  taskList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
      event.target.parentElement.remove();
      saveTasks();
    }
  });

  function addTask(taskText) {
    const taskItem = document.createElement('li');
    taskItem.className = 'task';
    taskItem.innerHTML = `
      <input type="checkbox">
      <span>${taskText}</span>
      <button type="button" class="btn btn-danger delete-btn">Delete</button>
    `;
    taskList.appendChild(taskItem);
    saveTasks();
  }

  function saveTasks() {
    localStorage.setItem('tasks', taskList.innerHTML);
  }

  function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      taskList.innerHTML = savedTasks;
    }
  }

  loadTasks();
});
