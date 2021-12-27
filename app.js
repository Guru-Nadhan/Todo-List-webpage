//selectors

const todoInput =document.querySelector('.todo-input');
const todoButton =document.querySelector('.todo-button');
const todoList =document.querySelector('.todo-list');

//event listnerts
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click',deleteCheck);

//functions

function addTodo(event){
    event.preventDefault();
    //add div 
    const todoDiv=document.createElement('div');
    todoDiv.classList.add('todo');
    //add li inside div
    const newTodo=document.createElement('li');
    newTodo.innerText=todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add the todo to localstorage
    saveLocalTodos(todoInput.value);
    //check button
    const completedButton=document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //trash button 
    const trashButton=document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to the list li
    todoList.appendChild(todoDiv);
    //clear input text value
    todoInput.value="";
}

function deleteCheck(e){
    const item= e.target;
    //delete btn clicked
    if(item.classList[0] === "trash-btn"){
        const todo =item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend',function(){
            todo.remove();
        });
    }
    //complete btn clicked
    if(item.classList[0] === "complete-btn"){
        const todo=item.parentElement;
        todo.classList.toggle("completed");
    }
}

function saveLocalTodos(todo){
    //check if we already have todos in local storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos(){
     //check if we already have todos in local storage
     let todos;
     if(localStorage.getItem('todos') === null){
         todos=[];
     }
     else{
         todos=JSON.parse(localStorage.getItem('todos'));
     }

     todos.forEach(function(todo){
        //add div 
        const todoDiv=document.createElement('div');
        todoDiv.classList.add('todo');
        //add li inside div
        const newTodo=document.createElement('li');
        newTodo.innerText=todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //check button
        const completedButton=document.createElement('button');
        completedButton.innerHTML='<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //trash button 
        const trashButton=document.createElement('button');
        trashButton.innerHTML='<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //append to the list li
        todoList.appendChild(todoDiv);
     });
}

function removeLocalTodos(todo){
//check if we already have todos in local storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex= todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}