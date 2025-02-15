let taskbox = document.querySelector("#taskbox");
let tasklist = document.querySelector("#task-list");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;

document.addEventListener("DOMContentLoaded", () => {
    tasks.forEach(task => addDom(task));
});

// "Enter" key press
taskbox.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && taskbox.value.trim() !== "") {
        let newTask = {
            id: id,
            title: taskbox.value,
            status: "Pending"
        };
        tasks.push(newTask);
        saveToLocalStorage();
        id++;

        addDom(newTask);
        taskbox.value = ""; // Clear input box
    }
});

// Function to add task to DOM
function addDom(task) {
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    let titleSpan = document.createElement("span");
    titleSpan.innerHTML = task.title;
    if (task.status === "Completed") {
        titleSpan.classList.add("completed");
    }

    let chkbox = document.createElement("input");
    chkbox.classList.add("box");
    chkbox.type = "checkbox";
    chkbox.checked = task.status === "Completed";

    let delBtn = document.createElement("button");
    delBtn.innerHTML = "Delete";

    let editbtn = document.createElement("button");
    editbtn.innerHTML = "Edit";

    taskDiv.append(titleSpan, chkbox, delBtn,editbtn);
    tasklist.append(taskDiv);

    // task as completed checked
    chkbox.addEventListener("change", () => {
        titleSpan.classList.toggle("completed", chkbox.checked);

        tasks = tasks.map(item => {
            if (item.id === task.id) {
                item.status = chkbox.checked ? "Completed" : "Pending";
            }
            return item;
        });
        saveToLocalStorage();
    });


    delBtn.addEventListener("click", () => {
        tasks = tasks.filter(item => item.id !== task.id);
        tasklist.removeChild(taskDiv);
        saveToLocalStorage();
    });

    editbtn.addEventListener("click", () => {
        let newTitle = prompt("Edit task:", task.title);
        if (newTitle !== null && newTitle.trim() !== "") {
            task.title = newTitle;
            titleSpan.innerHTML = newTitle;
            saveToLocalStorage();
        }
    });
    
}

function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
