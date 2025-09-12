document.addEventListener('DOMContentLoaded', function () {
  const addBtn = document.getElementById('add-btn');
  const newTaskInput = document.getElementById('new-task');
  const taskTimeInput = document.getElementById('task-time');
  const todoList = document.getElementById('todo-list');
  const progressBar = document.getElementById('progress-bar');
  const modeToggle = document.getElementById('mode-toggle');

  // Add New Task
  addBtn.addEventListener('click', function () {
    const taskText = newTaskInput.value.trim();
    const taskTime = taskTimeInput.value;

    if (taskText !== '') {
      const li = document.createElement('li');

      li.innerHTML = `
        <span class="task-donut">🍩</span>
        <span class="task-text">${taskText}</span>
        ${taskTime ? `<span class="task-time">⏰ ${taskTime}</span>` : ''}
      `;

      li.addEventListener('click', function () {
        li.classList.toggle('done');
        updateProgress();
      });

      todoList.appendChild(li);
      newTaskInput.value = '';
      taskTimeInput.value = '';

      updateProgress();
    }
  });

  // Allow Enter to Add
  newTaskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addBtn.click();
    }
  });

  // Update Progress
  function updateProgress() {
    const allTasks = document.querySelectorAll('#todo-list li');
    const doneTasks = document.querySelectorAll('#todo-list li.done');

    if (allTasks.length === 0) {
      progressBar.style.width = '0%';
    } else {
      const percent = (doneTasks.length / allTasks.length) * 100;
      progressBar.style.width = percent + '%';
    }
  }

  // Theme Toggle
  modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    modeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  });
});

// Show current date
const dateBox = document.getElementById('date-box');
const now = new Date();
const options = { weekday: 'long', day: 'numeric', month: 'long' };
dateBox.textContent = `📅 ${now.toLocaleDateString('en-US', options)}`;

