const taskInput = document.querySelector("#task")
const ulItem = document.querySelector("#list")
const deleteAllButton = document.querySelector("#clear-all")


eventListeners()

function eventListeners () {
    ulItem.addEventListener("click", deleteTodo)
    document.addEventListener("DOMContentLoaded", loadDataUI)
    deleteAllButton.addEventListener("click", deleteAllTodos)
}


function deleteAllTodos () {    
    ulItem.innerHTML = ""
    localStorage.removeItem("todos")
}

function deleteTodo (e) {   
    
    if(e.target.className === "fa-solid fa-xmark") {
        e.target.parentElement.remove()                
        deleteTodoStorage(e.target.parentElement.textContent)                                      
    }
    if(e.target) {        
        e.target.classList.toggle("checked")
    }   
} 

function deleteTodoStorage(del) {
    let todos = getTodosFromStorage()    
    todos.forEach(function(todo,index){
        if(todo === del){
            todos.splice(index,1)             
        }             
    })
    localStorage.setItem("todos",JSON.stringify(todos))    
}

function loadDataUI () {
    let todos = getTodosFromStorage()
    
    todos.forEach(todo => {
        addTodoUI(todo)
    })
}


function newElement () {
    const newTodo = taskInput.value.trim()
    
    if(newTodo === "") {            
        $('#liveToastErr').toast('show')                      
    }      
    else {
        addTodoUI(newTodo)
        addTodoFromStorage(newTodo)
        $('#liveToast').toast('show')
    }    
}


function getTodosFromStorage () {
    let todos
    if(localStorage.getItem("todos") === null){
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos
}


function addTodoFromStorage(newTodo) {
    let todos = getTodosFromStorage()

    todos.push(newTodo)

    localStorage.setItem("todos",JSON.stringify(todos))
}


function addTodoUI (newTodo) {
    const listItem = document.createElement("li")
    listItem.classList.add("list-item")
    listItem.innerHTML = newTodo 

    const spanElement = document.createElement("i")
    spanElement.className = "fa-solid fa-xmark"      
    
    ulItem.appendChild(listItem)
    listItem.appendChild(spanElement)    

    taskInput.value = ""   
}
