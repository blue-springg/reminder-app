document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('add-btn');
  const newTaskInput = document.getElementById('new-task');
  const taskTimeInput = document.getElementById('task-time');
  const todoList = document.getElementById('todo-list');
  const progressBar = document.getElementById('progress-bar');
  const modeToggle = document.getElementById('mode-toggle');

  // Typing Animation
  const titleText = "🍪 To-Do List 🍪";
  const titleElement = document.getElementById('typing-title');
  let index = 0;

  function typeTitle() {
    if (index < titleText.length) {
      titleElement.textContent += titleText.charAt(index);
      index++;
      setTimeout(typeTitle, 80);
    }
  }
  typeTitle();

  // Add New Task
  function addTask() {
    const taskText = newTaskInput.value.trim();
    const taskTime = taskTimeInput.value;

    if (taskText) {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="task-donut">🍩</span>
        <span class="task-text">${taskText}</span>
        ${taskTime ? `<span class="task-time">⏰ ${taskTime}</span>` : ''}
      `;
      li.addEventListener('click', () => {
        li.classList.toggle('done');
        updateProgress();
      });
      todoList.appendChild(li);
      newTaskInput.value = '';
      taskTimeInput.value = '';
      updateProgress();
    }
  }

  addBtn.addEventListener('click', addTask);
  newTaskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });

  // Update Progress Bar
  function updateProgress() {
    const allTasks = document.querySelectorAll('#todo-list li');
    const doneTasks = document.querySelectorAll('#todo-list li.done');
    const percent = allTasks.length > 0 ? (doneTasks.length / allTasks.length) * 100 : 0;
    progressBar.style.width = `${percent}%`;
  }

  // Toggle Dark Mode
  modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    modeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  });

  // Update Date Info
  const now = new Date();
  document.getElementById('weekday').textContent = now.toLocaleDateString('en-US', { weekday: 'long' });
  document.getElementById('day-circle').textContent = now.getDate();
  document.getElementById('month-text').textContent = now.toLocaleDateString('en-US', { month: 'long' });
});
