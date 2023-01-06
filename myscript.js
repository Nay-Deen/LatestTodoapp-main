window.addEventListener("load", () => {
  //wait for page to fully load before running the code

  const form = document.querySelector("#task-form");
  //get the form from the DOM
  const input = document.querySelector("#task-input");
  //get the input element from the DOM
  const list = document.querySelector("#tasks");
  //get the list element from the DOM
  
  let task = JSON.parse(localStorage.getItem("task-")) || [];
  let EditTaskId = -1;
  form.addEventListener("submit", (e) => {
    //add an event listener to the for to listen for submit events
    e.preventDefault();
    //prevent the form from submitting and refreshing the page

    const task = input.value;
    //get the value of the input element (task content)
    if (!task) {
      //if the task value is empty
      return;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
    
      saveTodo();
      renderTodos();
      localStorage.setItem("task", JSON.stringify(task));
    })

    const task_div = document.createElement("div");
    //create a div element to represent the task
    task_div.classList.add("task");
    //add a class of 'task' to the div
    list.appendChild(task_div);
    //append the task div to the list element

    const task_content_div = document.createElement("div");
    //create a div element for the content of the task
    task_content_div.classList.add("content");
    //add a class of 'content' to the div element
    task_div.appendChild(task_content_div);
   //append the content div element to the task div element

    const task_input = document.createElement("input");
  //create an input element to hold the task content
    task_input.classList.add("text");
    //add a class of text to the input element
    task_input.type = "text";
    //set the type of the input element to text
    task_input.value = task;
    //set the value of the input element to the task content
    task_input.setAttribute("readonly", "readonly");
    //set the readonly attribute of the input element to readonly
    task_content_div.appendChild(task_input);
    //append the input element to the content div element

    const task_actions_div = document.createElement("div");
    //create a div element for the actions (edit,completed and delete buttons) of the task

    task_actions_div.classList.add("actions");
    //add a class of actions to the div element
    task_div.appendChild(task_actions_div);
    //append the actions div element to the task div element

    const task_edit_botton = document.createElement("button");
    //create a button element for the edit action
    task_edit_botton.classList.add("Edit");
    // add a class of edit to the button element
    task_edit_botton.innerHTML = "Edit";
    //set the inner html of the button element to edit

    const task_delete_button = document.createElement("button");
    //create a button element for the delete action
    task_delete_button.classList.add("Delete");
    task_delete_button.innerHTML = "Delete";

    const task_completed_button = document.createElement("button"); //create a complete button for the task
    task_completed_button.classList.add("Completed");
    task_completed_button.innerHTML = "Completed";

    task_actions_div.appendChild(task_edit_botton); //add the edit, completed and delete buttons to the task actions div
    task_actions_div.appendChild(task_completed_button);
    task_actions_div.appendChild(task_delete_button);


    //add an event listener to the edit button to allow the task text to be edited
    task_edit_botton.addEventListener("click", () => {
      //if the button's text is 'edit, maje the task text ditable and change the button's text to save
      if (task_edit_botton.innerText.toLowerCase() == "edit") {
        task_input.removeAttribute("readonly");
        task_input.focus();
        task_edit_botton.innerText = "Save";
        task_input.style.textDecoration = "none";
        //if the buttons text is 'save', make the task text read-only and change the buttons text to edit
      } else {
        task_input.setAttribute("readonly", "readonly");
        task_edit_botton.innerText = "Edit";
      }
    });

    task_delete_button.addEventListener("click", () => { //add event listener to the delete button to allow the task to be deleted
      //show a confirm dialog asking the user to confirm if they want to delete the task
      if (confirm("Are you sure you want to delete this task?")) {
        //if confirmed remove the task from the list
        list.removeChild(task_div);
      }
    });
//add event listener to the completed button to allow the task to be marked as compelete
    task_completed_button.addEventListener("click", () => {
      //strike through the task text and make it read-only
      task_input.style.textDecoration = "line-through";
      task_input.setAttribute("readonly", "readonly");
    });
//clear the input field
    input.value = "";
  });
});
