function addtask(){
    let inputbox = document.getElementById("taskinput");
    let tasktext = inputbox.value.trim();
    
    if(tasktext === "") {
        alert("Please enter a task.");
        return;
    }

    let listitem = document.createElement("li");

    listitem.className = "task-item";

    let taskspan = document.createElement("span");
    taskspan.textContent = tasktext;
    taskspan.className = "task-text";

    // creating edit button
    let editbtn = document.createElement("button");
    editbtn.textContent = "Edit";
    editbtn.className = "edit-btn";

    editbtn.onclick = function() {
        if (editbtn.textContent === "Edit") {
            let editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = taskspan.textContent;
            editInput.className = "edit-input";

            listitem.insertBefore(editInput, taskspan);
            listitem.removeChild(taskspan);
            editbtn.textContent = "Save";
            editInput.focus();
        } else {
            let editInput = listitem.querySelector(".edit-input");
            let newText = editInput.value.trim();

            if (newText === "") {
                alert("Task cannot be empty.");
                editInput.focus();
                return;
            }

            taskspan.textContent = newText;
            listitem.insertBefore(taskspan, editInput);
            listitem.removeChild(editInput);
            editbtn.textContent = "Edit";
        }
    };

    //creating delete button
    let deletebtn = document.createElement("button");
    deletebtn.textContent = "Delete";
    deletebtn.className = "delete-btn";

    deletebtn.onclick = function() {
        listitem.remove();
    };

    let completedCheckbox = document.createElement("input");
    completedCheckbox.type = "checkbox";
    completedCheckbox.className = "complete-checkbox";

    completedCheckbox.onchange = function() {
        taskspan.classList.toggle("completed", completedCheckbox.checked);
    };

    listitem.appendChild(completedCheckbox);
    listitem.appendChild(taskspan);
    listitem.appendChild(editbtn);
    listitem.appendChild(deletebtn);

    document.getElementById("tasklist").appendChild(listitem);

    inputbox.value = "";
}

function cleartasks() {
    const tasks = document.querySelectorAll(".task-item");
    tasks.forEach(task => {
        const checkbox = task.querySelector(".complete-checkbox");
        if (checkbox && checkbox.checked) {
            task.remove();
        }
    });
}