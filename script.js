const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const toggleTheme = document.getElementById("toggle-theme");

// Load tasks from localStorage
window.addEventListener("load", () => {
  const saved = JSON.parse(localStorage.getItem("todos")) || [];
  saved.forEach(({ text, completed }) => addTask(text, completed));
});

// Submit form
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const task = input.value.trim();
  if (task === "") return;
  addTask(task);
  input.value = "";
  saveTasks();
});

// Add a task
function addTask(taskText, completed = false) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed", checkbox.checked);
    saveTasks();
  });

  const span = document.createElement("span");
  span.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "x";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.classList.toggle("completed", completed);
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  list.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
  const todos = [];
  list.querySelectorAll("li").forEach((li) => {
    const text = li.querySelector("span").textContent;
    const completed = li.querySelector("input[type='checkbox']").checked;
    todos.push({ text, completed });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Dark mode toggle
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleTheme.textContent = document.body.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});
