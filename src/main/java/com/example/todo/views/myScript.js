const EMPTYBOX = "\u2610";
const TICKEDBOX = "\u2611";
const CHECKED = "checked";
const COMPLETED = "COMPLETED";

function fetchTodoTasks() {
    fetch('http://localhost:8080/task/all').then((response) => {
        if (!response.ok) {
            alert("An error has occurred.  Unable to read the TODO list")
            throw response.status;
        } else return response.json();
    }).then((tasks) => displayFetchedTodoTasks(tasks)); 


    function displayFetchedTodoTasks(tasks) {
        clearRenderedTodoTasks();
        tasks.forEach((task) => renderTodoTask(task));
    }
    
    function clearRenderedTodoTasks() {
        let todoListElement = document.getElementById("todoList");
        todoListElement.innerHTML = "";
    }

    function renderTodoTask(task) {
        let todoTaskNode = document.createElement("li");

        addTickboxOption(todoTaskNode, task);
        addDescription(todoTaskNode, task);
        addRemoveOption(todoTaskNode);

        addTodoTaskNodeToTodoList(todoTaskNode);
    }

    function addTickboxOption(todoTaskNode, task){
        let tickSpanNode = document.createElement("span");
        var tickText = document.createTextNode(EMPTYBOX);
        if (task.status === COMPLETED) {
            todoTaskNode.classList.toggle(CHECKED);
            tickText = document.createTextNode(TICKEDBOX);
        }
        tickSpanNode.appendChild(tickText);
        todoTaskNode.appendChild(tickSpanNode);
    }

    function addDescription(todoTaskNode, task){
        let descriptionSpanNode = document.createElement("span");
        let descriptionTextNode = document.createTextNode(task["description"]);
        descriptionSpanNode.className = "listItemDescriptionStyle";
        descriptionSpanNode.appendChild(descriptionTextNode);
        todoTaskNode.appendChild(descriptionSpanNode);
    }

    function addRemoveOption(todoTaskNode){
        let closeSpanNode = document.createElement("span");
        let closeText = document.createTextNode("X");
        closeSpanNode.appendChild(closeText);
        todoTaskNode.appendChild(closeSpanNode);
    }

    function addTodoTaskNodeToTodoList(todoTaskNode){
        let todoListElement = document.getElementById("todoList");
        todoListElement.appendChild(todoTaskNode);
    }
}
