window.addEventListener("load", () => {
   // Select the form, input, and list elements from the DOM
  const form = document.querySelector("#task-form");
  const input = document.querySelector("#task-input");
  const list = document.querySelector("#tasks");
})
  // Retrieve the tasks from local storage and display them on the page
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(displayTask);

// Add event listener for when the form is submitted
  form.addEventListener("submit", (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get the task from the input element
    const task = input.value;
     // Return if there is no task
    if (!task) {
      return;
    }

    // Create the task and display it on the page
    displayTask(tasks);

    // Store the task in local storage
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

     // Clear the input field
    input.value = "";
  });

  // Function to display a task on the page
  function displayTask(tasks) {
      // Create a new div element for the task
    const task_div = document.createElement("div");
    task_div.classList.add("task-input");
    list.appendChild(task_div);
  }

   // Create a div element for the task content
    const task_content_div = document.createElement("div");
    task_content_div.classList.add("content");
    task_div.appendChild(task_content_div);

    // Create an input element for the task
    const task_input = document.createElement("input");
    task_input.classList.add("text");
    task_input.type = "text";
    task_input.value = task;
    task_input.setAttribute("readonly", "readonly");
    task_content_div.appendChild(task_input);

    
  // Create a div element for the task actions
    const task_actions_div = document.createElement("div");
    task_actions_div.classList.add("actions");
    task_div.appendChild(task_actions_div);

    
  // Create the Edit, Delete, and Completed buttons
    const task_edit_botton = document.createElement("button");
    task_edit_botton.classList.add("Edit");
    task_edit_botton.innerHTML = "Edit";

    const task_delete_button = document.createElement("button");
    task_delete_button.classList.add("Delete");
    task_delete_button.innerHTML = "Delete";

    const task_completed_button = document.createElement("button");
    task_completed_button.classList.add("Completed");
    task_completed_button.innerHTML = "Completed";

    task_actions_div.appendChild(task_edit_botton);
    task_actions_div.appendChild(task_completed_button);
    task_actions_div.appendChild(task_delete_button);


  // Append the buttons to the actions div
    task_edit_botton.addEventListener("click",() => {
      if (task_edit_botton.innerText.toLowerCase() == "edit") {
        task_input.removeAttribute("readonly");
        task_input.focus();
      }});