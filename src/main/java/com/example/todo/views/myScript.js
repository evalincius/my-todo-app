function fetchTodoTasks() {
    fetch('http://localhost:8080/task/all').then((response) => {
        if (!response.ok) {
            alert("An error has occurred.  Unable to read the TODO list")
            throw response.status;
        } else return response.json();
    }).then((tasks) => displayFetchedTodoTasks(tasks)); 

}

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
    addRemoveOption(todoTaskNode, task);

    
    let todoListElement = document.getElementById("todoList");
    todoListElement.appendChild(todoTaskNode);

}

function addTickboxOption(todoTaskNode, task){
    let tickSpanNode = document.createElement("span");
    var tickText = document.createTextNode("\u2610");
    if (task.status === "COMPLETED") {
        tickText = document.createTextNode("\u2611");
        todoTaskNode.className = "checked";
    }
    tickSpanNode.appendChild(tickText);
    tickSpanNode.className = "pointerIconStyle";
    tickSpanNode.onclick = function () {
        onTickBoxToggled(task, tickSpanNode, todoTaskNode);
    }
    todoTaskNode.appendChild(tickSpanNode);
}

function addDescription(todoTaskNode, task){
    let descriptionSpanNode = document.createElement("span");
    let descriptionTextNode = document.createTextNode(task["description"]);
    descriptionSpanNode.className = "listItemDescriptionStyle";
    descriptionSpanNode.appendChild(descriptionTextNode);
    todoTaskNode.appendChild(descriptionSpanNode);
}

function addRemoveOption(todoTaskNode, task){
    let removeSpanNode = document.createElement("span");
    let removeText = document.createTextNode("X");
    removeSpanNode.appendChild(removeText);
    removeSpanNode.className = "pointerIconStyle";
    removeSpanNode.onclick = function () {
        onRemoveItemClicked(task, todoTaskNode);
    }
    todoTaskNode.appendChild(removeSpanNode);
}

function submitNewTodoTaskForm(form) {
    let newTodoItemDesciption = form.newItemDescription.value.trim();
    if (newTodoItemDesciption === "") {
        alert("Please enter a value for your task");
    } else {
        createTodoItem(newTodoItemDesciption);
        form.newItemDescription.value = "";
    }
    return false;
}

function createTodoItem(listItemDescription) {
    const newItem = {
        "description": listItemDescription,
        "status": "NEW"
    };

    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newItem)
    };

    fetch("http://localhost:8080/task", requestOptions).then((response) => {
        if (!response.ok) {
            alert("An error has occurred. Unable to create the TODO task")
            throw response.status;
        } else return response.json();
    }).then(task => {
        renderTodoTask(task);
    });
}


function searchTodoTasks(searchKeywordElement) {
    let searchKeyword = searchKeywordElement.value.trim();
    if (searchKeyword === "") {
        fetchTodoTasks();
    } else {
        fetch("http://localhost:8080/task/searchByKeyword/"+ searchKeyword).then((response) => {
            if (!response.ok) {
                alert("An error has occurred.  Unable to fetch TODO items")
                throw response.status;
            } else return response.json();
        }).then((tasks) => displayFetchedTodoTasks(tasks));
    }
}

function onTickBoxToggled(task, tickSpanNode, todoTaskNode){
    if (task["status"] === "NEW") {
        task["status"] = "COMPLETED";
        tickSpanNode.textContent = "\u2611";
    } else {
        task["status"] = "NEW";
        tickSpanNode.textContent = "\u2610";
    }
    todoTaskNode.classList.toggle("checked");
    updateTodoTask(task);
}

function updateTodoTask(task) {
    const requestOptions = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task)
    };
    fetch("http://localhost:8080/task", requestOptions).then((response) => {
        if (!response.ok) {
            alert("An error has occurred.  Unable to UPDATE the TODO task")
            throw response.status;
        } else return response.json();
    });

}

function onRemoveItemClicked(task, todoTaskNode){
    let toDelete = confirm("Are you sure that you want to delete " + task.description + "?");

    if(toDelete){
        deleteTodoItem(task["id"]);
        todoTaskNode.remove();
    }
}

function deleteTodoItem(todoTaskId) {
    const requestOptions = {
        method: "DELETE"
    }

    fetch("http://localhost:8080/task/" + todoTaskId, requestOptions).then((response) => {
        if (!response.ok) {
            alert("An error has occurred.  Unable to DELETE the TODO task")
            throw response.status;
        } else return response.json();
    });
}
