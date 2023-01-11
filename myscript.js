/**
 * Globals
 */

window.addEventListener("DOMContentLoaded", (e) => {

  /**
   * Declare my DOM Element
   */

  const tasksList = document.querySelector("#tasks");
  const addTaskInput = document.querySelector("#task-input");
  const taskForm = document.querySelector("#task-form");
  const todoFeedback = document.querySelector("#feedback");

  /**
   * Retrieve tasks from Local Storage
   */
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  /**
   * Check if tasks exist, if so show them on the list
   * Else render a "No tasks, Please add a task"
   */

  if (tasks.length > 0) {
      
      // Clear previous Tasks on the tasks List
      tasksList.innerHTML = "";

      // // Display the task on the page
      tasks.forEach(displayTask);
  } else {
      todoFeedback.innerHTML = "No Tasks, Please Add A Task";
  }

  taskForm.addEventListener("submit", (e) => {
      // Prevent the default form submission behavior
      e.preventDefault();

      // Get the task from the input element
      const task = addTaskInput.value;

      // clear Previous Errors from feedback
      todoFeedback.innerHTML = "";
      
      // Return if there is no task
      if (!task) {
          todoFeedback.innerHTML = "Error: Please Add A Task Title";
          return;
      }

      // Add the task to the tasks array
       tasks.push({id:tasks.length+1, title:task, completed: false});

      // Store the tasks in local storage
      localStorage.setItem("tasks", JSON.stringify(tasks));

      // Clear previous Tasks on the tasks List
      tasksList.innerHTML = "";

      // // Display the task on the page
      tasks.forEach(displayTask);

      // Clear the input field
      addTaskInput.value = "";
  });

  /***
   * Helper Functions
   */

    function displayTask(task) {

    // Create a new div element for the task
      const task_div = document.createElement("div");
      task_div.classList.add("task");
      tasksList.appendChild(task_div);
  

  // Create a div element for the task content
      const task_content_div = document.createElement("div");
      task_content_div.classList.add("content");
      task_div.appendChild(task_content_div);

      // Create an input element for the task
      const task_input = document.createElement("input");
      task_input.classList.add("text");

      if (task.completed) {
          task_input.classList.add("strike");
      }

      task_input.type = "text";
      task_input.value = task?.title;
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

      task_input.addEventListener("keyup", (e) => {
          
          if (e.keyCode === 13) {
              task.title = e.target.value;
              console.log(tasks);
              localStorage.setItem("tasks", JSON.stringify(tasks));
              task_input.setAttribute("readonly", "readonly");
          }
      });

      task_edit_button.addEventListener("click", (e) => {

          task_input.removeAttribute("readonly", "");
          task_input.focus();
      });

      task_completed_button.addEventListener("click",() => {

          if (task.completed) {
              task.completed = false;
              task_input.classList.remove("strike");
          } else {
              task.completed = true;
              task_input.classList.add("strike");
          }

          localStorage.setItem("tasks", JSON.stringify(tasks));
      });

      task_delete_button.addEventListener("click", (e) => {

          const filteredTasks = tasks.filter(task_s => task_s.id !== task.id);
          localStorage.setItem("tasks", JSON.stringify(filteredTasks));
          task_div.remove();
          tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      });
  }

});