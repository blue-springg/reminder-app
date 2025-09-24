document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('add-btn');
  const newTaskInput = document.getElementById('new-task');
  const taskTimeInput = document.getElementById('task-time');
  const taskCategorySelect = document.getElementById('task-category');
  const todoList = document.getElementById('todo-list');
  const progressBar = document.getElementById('progress-bar');
  const progressPercent = document.getElementById('progress-percent');
  const modeToggle = document.getElementById('mode-toggle');

  // Load tasks from local storage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Typing Animation
  const titleText = "☕ Coffee To-Do ☕";
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

  // Render Tasks
  function renderTasks() {
    todoList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.className = task.done ? 'done' : '';
      li.innerHTML = `
        <span class="task-donut">☕</span>
        <span class="task-text">${task.text}</span>
        <span class="task-category">${task.category}</span>
        ${task.time ? `<span class="task-time">⏰ ${task.time}</span>` : ''}
        <button class="delete-btn" data-index="${index}">🗑️</button>
      `;
      li.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) return;
        tasks[index].done = !tasks[index].done;
        saveTasks();
        renderTasks();
      });
      todoList.appendChild(li);
    });

    // Add delete button listeners
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });
    });

    updateProgress();
  }

  // Save Tasks to Local Storage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Add New Task
  function addTask() {
    const taskText = newTaskInput.value.trim();
    const taskTime = taskTimeInput.value;
    const taskCategory = taskCategorySelect.value;

    if (taskText) {
      tasks.push({ text: taskText, time: taskTime, category: taskCategory, done: false });
      saveTasks();
      newTaskInput.value = '';
      taskTimeInput.value = '';
      taskCategorySelect.value = 'Personal';
      renderTasks();
    }
  }

  addBtn.addEventListener('click', addTask);
  newTaskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });

  // Update Progress Bar
  function updateProgress() {
    const doneTasks = tasks.filter(task => task.done).length;
    const percent = tasks.length > 0 ? (doneTasks / tasks.length) * 100 : 0;
    progressBar.style.width = `${percent}%`;
    progressPercent.textContent = `${Math.round(percent)}%`;
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

  // Initial Render
  renderTasks();
});
