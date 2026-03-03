const input = document.getElementById('taskInput')
const btn = document.getElementById('addBtn')
const list = document.getElementById('taskList')

btn.addEventListener('click', addTask)

input.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') addTask()
})

function addTask() {
  const task = input.value.trim()
  if(task === "") return

  const li = document.createElement("li")

  li.innerHTML = `
  <span class='task-text'>${task}</span>
  <div>
  <button class="completeBtn">✓</button>
  <button class="editBtn">Edit</button>
  <button class="deleteBtn" >Delete</button>
  </div>
  `

  list.appendChild(li)
  input.value = ""

  li.querySelector('.deleteBtn').addEventListener('click', () => {
    li.remove()
  })

  li.querySelector('.completeBtn').addEventListener('click', () => {
    li.querySelector('.task-text').classList.toggle('completed')
  })

  li.querySelector('.editBtn').addEventListener('click', () => {
    const textElement = li.querySelector('.task-text')
    const newTask = prompt('Updated your task: ', textElement.textContent)

    if(newTask !== null && newTask.trim() !== "") {
        textElement.textContent = newTask.trim()
    }
  })
}