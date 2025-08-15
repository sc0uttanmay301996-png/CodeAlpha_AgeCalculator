document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage or initialize an empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to save tasks to localStorage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Function to render tasks to the DOM
    const renderTasks = () => {
        // Clear the current list
        taskList.innerHTML = '';

        // If there are no tasks, show a message
        if (tasks.length === 0) {
            taskList.innerHTML = '<p style="text-align:center; color:#999;">No tasks yet. Add one above!</p>';
            return;
        }

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.dataset.id = task.id; // Store task id in a data attribute
            if (task.completed) {
                li.classList.add('completed');
            }

            // Task Text Span
            const taskTextSpan = document.createElement('span');
            taskTextSpan.className = 'task-text';
            taskTextSpan.textContent = task.text;
            taskTextSpan.addEventListener('click', () => toggleCompleteTask(task.id)); // Mark as complete on text click

            // Actions Div (for buttons)
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'actions';

            // Edit Button
            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent the li click event from firing
                editTask(task.id, task.text);
            });

            // Delete Button
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent the li click event from firing
                deleteTask(task.id);
            });
            
            actionsDiv.appendChild(editBtn);
            actionsDiv.appendChild(deleteBtn);

            li.appendChild(taskTextSpan);
            li.appendChild(actionsDiv);
            
            taskList.appendChild(li);
        });
    };

    // Add a new task
    const addTask = (text) => {
        const newTask = {
            id: Date.now(), // Unique ID using timestamp
            text: text,
            completed: false
        };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
    };

    // Toggle a task's completed state
    const toggleCompleteTask = (id) => {
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        }
    };

    // Edit a task
    const editTask = (id, currentText) => {
        const newText = prompt('Edit your task:', currentText);
        if (newText !== null && newText.trim() !== '') {
            const task = tasks.find(t => t.id === id);
            if (task) {
                task.text = newText.trim();
                saveTasks();
                renderTasks();
            }
        }
    };
    
    // Delete a task
    const deleteTask = (id) => {
        if (confirm('Are you sure you want to delete this task?')) {
            tasks = tasks.filter(task => task.id !== id);
            saveTasks();
            renderTasks();
        }
    };

    // Event Listener for the form submission
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
            taskInput.focus();
        }
    });

    // Initial render of tasks when the page loads
    renderTasks();
});