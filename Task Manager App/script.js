class Task {
    constructor(id, description) {
        this.id = id;
        this.description = description;
        this.completed = false;
    }
}

class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.taskId = this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 0;
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const tasksJSON = localStorage.getItem('tasks');
        return tasksJSON ? JSON.parse(tasksJSON) : [];
    }

    addTask(description) {
        const newTask = new Task(this.taskId++, description);
        this.tasks.push(newTask);
        this.saveTasks();
        return newTask;
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
    }

    toggleTaskStatus(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
        }
    }

    getIncompleteCount() {
        return this.tasks.filter(task => !task.completed).length;
    }
}

const taskManager = new TaskManager();

const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskDescription = document.getElementById("taskDescription");

let currentFilter = "all";
const filterSelect = document.getElementById("filterSelect");

taskDescription.addEventListener("input", () => {
    addTaskBtn.disabled = taskDescription.value.trim() === "";
});

taskDescription.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTaskFromInput();
    }
});

function addTaskFromInput() {
    const desc = taskDescription.value.trim();
    if (desc) {
        taskManager.addTask(desc);
        taskDescription.value = "";
        addTaskBtn.disabled = true;
        renderTasks();
        showToast("Task added!");
    }
    taskDescription.focus();
}

addTaskBtn.addEventListener("click", addTaskFromInput);

filterSelect.addEventListener("change", () => {
    currentFilter = filterSelect.value;
    renderTasks();
});

renderTasks();

function renderTasks() {
    taskList.innerHTML = "";

    let tasksToRender = [...taskManager.tasks];

    if (currentFilter === "incomplete") {
        tasksToRender = tasksToRender.filter(task => !task.completed);
    } else if (currentFilter === "completed") {
        tasksToRender = tasksToRender.filter(task => task.completed);
    } else {
        tasksToRender = [
            ...tasksToRender.filter(task => !task.completed),
            ...tasksToRender.filter(task => task.completed)
        ];
    }

    tasksToRender.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.className = "task" + (task.completed ? " completed" : "");

        const descSpan = document.createElement("span");
        descSpan.textContent = task.description;
        taskElement.appendChild(descSpan);

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "task-buttons";

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Mark as Incomplete" : "Mark as Complete";
        completeBtn.className = task.completed ? "incomplete-btn" : "";
        completeBtn.onclick = () => {
            taskManager.toggleTaskStatus(task.id);
            showToast(task.completed ? "Marked as complete" : "Still remaining!");
            renderTasks();
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => {
            taskManager.deleteTask(task.id);
            showToast("Task deleted!");
            renderTasks();
        };

        buttonContainer.appendChild(completeBtn);
        buttonContainer.appendChild(deleteBtn);
        taskElement.appendChild(buttonContainer);

        taskList.appendChild(taskElement);
    });

    taskCount.textContent = "Remaining Tasks: " + taskManager.getIncompleteCount();
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}  
