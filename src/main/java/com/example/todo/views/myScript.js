function fetchTodoTasks() {
    fetch('http://localhost:8080/task/all').then((response) => {
        if (!response.ok) {
            alert("An error has occurred.  Unable to read the TODO list")
            throw response.status;
        } else return response.json();
    }).then((tasks) => console.log(tasks)); 

}
