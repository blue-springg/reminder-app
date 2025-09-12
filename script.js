// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  const addBtn = document.getElementById('add-btn');
  const newTaskInput = document.getElementById('new-task');
  const todoList = document.getElementById('todo-list');
  const progressBar = document.getElementById('progress-bar');

  // Add new task
  addBtn.addEventListener('click', function () {
    const taskText = newTaskInput.value.trim();

    if (taskText !== '') {
      const li = document.createElement('li');
      li.innerHTML = `
        <input type="checkbox" class="task-checkbox"> ${taskText}
      `;
      todoList.appendChild(li);
      newTaskInput.value = '';

      updateProgress();
    }
  });

  // Allow "Enter" key to add task too!
  newTaskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addBtn.click();
    }
  });

  // Update progress when checkbox is clicked (event delegation)
  todoList.addEventListener('change', function (e) {
    if (e.target.classList.contains('task-checkbox')) {
      updateProgress();
    }
  });

  // Update progress bar
  function updateProgress() {
    const checkboxes = document.querySelectorAll('.task-checkbox');
    const total = checkboxes.length;

    if (total === 0) {
      progressBar.style.width = '0%';
      return;
    }

    let checked = 0;
    checkboxes.forEach(cb => {
      if (cb.checked) checked++;
    });

    const percent = (checked / total) * 100;
    progressBar.style.width = percent + '%';
  }
});
