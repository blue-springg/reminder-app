document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('add-btn');
  const newTaskInput = document.getElementById('new-task');
  const taskTimeInput = document.getElementById('task-time');
  const taskCategorySelect = document.getElementById('task-category');
  const todoList = document.getElementById('todo-list');
  const progressBar = document.getElementById('progress-bar');
  const progressPercent = document.getElementById('progress-percent');
  const taskCount = document.getElementById('task-count');
  const modeToggle = document.getElementById('mode-toggle');
  const clearBtn = document.getElementById('clear-btn');
  const errorMessage = document.getElementById('error-message');
  const filterButtons = document.querySelectorAll('.filter-btn');

  // Load tasks from local storage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let currentFilter = 'all';

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
    const filteredTasks = currentFilter === 'all' ? tasks : tasks.filter(task => task.category === currentFilter);
    filteredTasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.className = task.done ? 'done' : '';
      li.setAttribute('tabindex', '0');
      li.innerHTML = `
        <span class="task-donut">☕</span>
        <span class="task-text">${task.text}</span>
        <span class="task-category">${task.category}</span>
        ${task.time ? `<span class="task-time">⏰ ${task.time}</span>` : ''}
        <button class="delete-btn" data-index="${index}" aria-label="Delete task">🗑️</button>
      `;
      li.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) return;
        const taskIndex = tasks.indexOf(task);
        tasks[taskIndex].done = !tasks[taskIndex].done;
        saveTasks();
        renderTasks();
      });
      li.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const taskIndex = tasks.indexOf(task);
          tasks[taskIndex].done = !tasks[taskIndex].done;
          saveTasks();
          renderTasks();
        }
      });
      todoList.appendChild(li);
    });

    // Add delete button listeners
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        const taskIndex = tasks.indexOf(filteredTasks[index]);
        tasks.splice(taskIndex, 1);
        saveTasks();
        renderTasks();
      });
    });

    updateProgress();
    updateTaskCount();
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

    if (!taskText) {
      errorMessage.textContent = 'Please enter a task!';
      errorMessage.classList.add('show');
      setTimeout(() => errorMessage.classList.remove('show'), 2000);
      return;
    }

    tasks.push({ text: taskText, time: taskTime, category: taskCategory, done: false });
    saveTasks();
    newTaskInput.value = '';
    taskTimeInput.value = '';
    taskCategorySelect.value = 'Personal';
    renderTasks();
  }

  addBtn.addEventListener('click', addTask);
  newTaskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });

  // Update Progress Bar
  function updateProgress() {
    const filteredTasks = currentFilter === 'all' ? tasks : tasks.filter(task => task.category === currentFilter);
    const doneTasks = filteredTasks.filter(task => task.done).length;
    const percent = filteredTasks.length > 0 ? (doneTasks / filteredTasks.length) * 100 : 0;
    progressBar.style.width = `${percent}%`;
    progressPercent.textContent = `${Math.round(percent)}%`;
  }

  // Update Task Count
  function updateTaskCount() {
    const filteredTasks = currentFilter === 'all' ? tasks : tasks.filter(task => task.category === currentFilter);
    const doneTasks = filteredTasks.filter(task => task.done).length;
    taskCount.textContent = `${filteredTasks.length} tasks (${doneTasks} done)`;
  }

  // Filter Tasks
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderTasks();
    });
    btn.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        renderTasks();
      }
    });
  });

  // Clear All Tasks
  clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all tasks?')) {
      tasks = [];
      saveTasks();
      renderTasks();
    }
  });
  clearBtn.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (confirm('Are you sure you want to clear all tasks?')) {
        tasks = [];
        saveTasks();
        renderTasks();
      }
    }
  });

  // Toggle Dark Mode
  modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    modeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  });
  modeToggle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      document.body.classList.toggle('dark');
      modeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    }
  });

  // Update Date Info
  const now = new Date();
  document.getElementById('weekday').textContent = now.toLocaleDateString('en-US', { weekday: 'long' });
  document.getElementById('day-circle').textContent = now.getDate();
  document.getElementById('month-text').textContent = now.toLocaleDateString('en-US', { month: 'long' });

  // Initial Render
  filterButtons[0].classList.add('active');
  renderTasks();
});
