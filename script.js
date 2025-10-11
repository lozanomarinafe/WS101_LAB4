document.addEventListener("DOMContentLoaded", () => {
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;
        addTask(taskText);
        taskInput.value = "";
    });

    function addTask(text) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text">${text}</span>
            <button class="edit">edit</button>
            <button class="delete">delete</button>
        `;
        taskList.appendChild(li);

        li.querySelector(".edit").addEventListener("click", () => {
            const taskSpan = li.querySelector(".task-text");
            const currentText = taskSpan.textContent;

            // Create an input field for editing
            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = currentText;
            editInput.classList.add("edit-input");

            // Replace text with input
            li.insertBefore(editInput, taskSpan);
            taskSpan.style.display = "none";
            editInput.focus();

            // Save on Enter or blur
            editInput.addEventListener("blur", saveEdit);
            editInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") saveEdit();
            });

            function saveEdit() {
                const newText = editInput.value.trim();
                if (newText !== "") taskSpan.textContent = newText;
                taskSpan.style.display = "inline";
                li.removeChild(editInput);
            }
        });

        li.querySelector(".delete").addEventListener("click", () => {
            li.remove();
        });
    }
});
