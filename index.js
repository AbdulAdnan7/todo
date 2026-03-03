const input = document.getElementById('taskInput')
const btn = document.getElementById('addBtn')
const list = document.getElementById('taskList')

document.addEventListener('DOMContentLoaded', loadTasks)

btn.addEventListener('click', addTask)

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask()
})

function addTask(taskText = "", completed = false) {
    const task = taskText || input.value.trim()
    if (task === "") return

    const li = document.createElement("li")

    li.innerHTML = `
  <span class='task-text ${completed ? "completed" : ""}'>${task}</span>
  <div>
  <button class="completeBtn">✓</button>
  <button class="editBtn">Edit</button>
  <button class="deleteBtn" >Delete</button>
  </div>
  `

    list.appendChild(li)
    input.value = ""

    //for delete
    li.querySelector('.deleteBtn').addEventListener('click', () => {
        li.remove()
        saveTasks()
    })

    //for complete
    li.querySelector('.completeBtn').addEventListener('click', () => {
        li.querySelector('.task-text').classList.toggle('completed')
        saveTasks()
    })

    //for edit
    li.querySelector('.editBtn').addEventListener('click', () => {
        const textElement = li.querySelector('.task-text')
        const newTask = prompt('Updated your task: ', textElement.textContent)

        if (newTask !== null && newTask.trim() !== "") {
            textElement.textContent = newTask.trim()
            saveTasks()
        }
    })
    saveTasks()
}

function saveTasks() {
    const tasks = []

    document.querySelectorAll('#taskList li').forEach((li) => {

        tasks.push({ 
            text: li.querySelector('.task-text').textContent,
            completed: li.querySelector('.task-text').classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []

    tasks.forEach(task => 
        addTask(task.text, task.completed)
    )
}