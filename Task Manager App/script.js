class Task {
    constructor(id, description) {
        this.id = id;
        this.description = description;
        this.completed = false;
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
        this.taskId = 0;
    }

    addTask(description) {
        const newTask = new Task(this.taskId++, description);
        this.tasks.push(newTask);
        return newTask;
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    toggleTaskStatus(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) task.completed = !task.completed;
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

addTaskBtn.addEventListener("click", () => {
    const desc = taskDescription.value.trim();
    if (desc) {
        taskManager.addTask(desc);
        taskDescription.value = "";
        renderTasks();
    }
});

function renderTasks() {
    taskList.innerHTML = "";

    // Sort: incomplete first, then completed
    const sortedTasks = [
        ...taskManager.tasks.filter(task => !task.completed),
        ...taskManager.tasks.filter(task => task.completed)
    ];

    sortedTasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.className = "task" + (task.completed ? " completed" : "");

        const descSpan = document.createElement("span");
        descSpan.textContent = task.description;
        taskElement.appendChild(descSpan);

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "task-buttons";

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Incomplete" : "Complete";
        completeBtn.onclick = () => {
            taskManager.toggleTaskStatus(task.id);
            renderTasks();
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => {
            taskManager.deleteTask(task.id);
            renderTasks();
        };

        buttonContainer.appendChild(completeBtn);
        buttonContainer.appendChild(deleteBtn);
        taskElement.appendChild(buttonContainer);

        taskList.appendChild(taskElement);
    });

    taskCount.textContent = "Remaining Tasks: " + taskManager.getIncompleteCount();
}
