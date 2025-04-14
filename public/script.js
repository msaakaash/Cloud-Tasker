const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

function loadTasks() {
  fetch('/tasks')
    .then(res => res.json())
    .then(data => {
      taskList.innerHTML = '';
      data.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.title} [${task.status}]`;
        li.innerHTML += ` <button onclick="deleteTask(${task.id})">Delete</button>`;
        li.innerHTML += ` <button onclick="updateTask(${task.id})">Mark Done</button>`;
        taskList.appendChild(li);
      });
    });
}

taskForm.onsubmit = function (e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const status = document.getElementById('status').value;
  fetch('/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, status })
  }).then(() => {
    taskForm.reset();
    loadTasks();
  });
};

function deleteTask(id) {
  fetch(`/tasks/${id}`, { method: 'DELETE' }).then(loadTasks);
}

function updateTask(id) {
  fetch(`/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'done' })
  }).then(loadTasks);
}

loadTasks();
