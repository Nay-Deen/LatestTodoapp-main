const list = document.querySelector("#tasks");
const input = document.querySelector("#task-input");
const form = document.querySelector("#task-form");

 // Retrieve the tasks from local storage and display them on the page
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(displayTask);
console.log(tasks);

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

 // Add the task to the tasks array
  tasks.push(task);
  // Store the tasks in local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));



  // Display the task on the page
  tasks.forEach(displayTask);

  // Clear the input field
  input.value = "";
});

//  // Retrieve the tasks from local storage and display them on the page
//   const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//   tasks.forEach(displayTask);
//   // Function to display a task on the page
  function displayTask(task) {
      // Create a new div element for the task
    const task_div = document.createElement("div");
    task_div.classList.add("task");
    list.appendChild(task_div);
  

   // Create a div element for the task content
    const task_content_div = document.createElement("div");
    task_content_div.classList.add("content");
    task_div.appendChild(task_content_div);

    // Create an input element for the task
    const task_input = document.createElement("input");
    task_input.classList.add("text");
    task_input.type = "text";
    task_input.value = task?.content;
    task_input.setAttribute("readonly", "readonly");
    task_content_div.appendChild(task_input);

    
  // Create a div element for the task actions
    const task_actions_div = document.createElement("div");
    task_actions_div.classList.add("actions");
    task_div.appendChild(task_actions_div);

    
  // Create the Edit, Delete, and Completed buttons
    const task_edit_button = document.createElement("button");
    task_edit_button.classList.add("Edit");
    task_edit_button.innerHTML = "Edit";

    const task_delete_button = document.createElement("button");
    task_delete_button.classList.add("Delete");
    task_delete_button.innerHTML = "Delete";

    const task_completed_button = document.createElement("button");
    task_completed_button.classList.add("Completed");
    task_completed_button.innerHTML = "Completed";

    task_actions_div.appendChild(task_edit_button);
    task_actions_div.appendChild(task_completed_button);
    task_actions_div.appendChild(task_delete_button);


  // Append the buttons to the actions div
    task_edit_button.addEventListener("click",() => {
      if (task_edit_button.innerText.toLowerCase() == "edit") {
        task_input.removeAttribute("readonly");
        task_input.focus();
      }});

      task_completed_button.addEventListener("click",() => {
        if (task_completed_button.innerText.toLowerCase() == "completed") {
          task_input.removeAttribute("readonly");
          task_input.focus();
        }});
        task_delete_button.addEventListener("click",() => {
          if (task_delete_button.innerText.toLowerCase() == "deleted") {
            task_input.removeAttribute("readonly");
            task_input.focus();
          }});
    }