/* -------------------------------
Purpose: Main JS File
Version: 0.6
Author: Itamar Rosenblum
Date: 24-12-20
Last Update: 31-12-20
------------------------------- */

// Get elements
var form = document.querySelector("form");
var ul = document.querySelector("ul");
var containerStatus = document.querySelector("#container-status");

// Get input elements
var taskContent = document.querySelector("#task-content");
var taskDate = document.querySelector("#task-date");
var taskTime = document.querySelector("#task-time");

// Create empty array
var arr = [];
// Form submit event
form.addEventListener("submit", addItem);
// Delete button event
ul.addEventListener("click", removeItem);

// First function: Create new notes and set them inside the local sotrage
function addItem(e) {
  // Get element
  var containerStatus = document.querySelector("#container-status");
  // Prevents the form from refreshing
  e.preventDefault();

  // Form validation
  if (taskContent.value === "") {
    // Display action status
    containerStatus.innerText = "⚠️ Please enter task description";
    containerStatus.style.padding = "2px 0";
    containerStatus.style.backgroundColor = "#e63922";
  } else if (taskDate.value === "") {
    // Display action status
    containerStatus.innerText = "⚠️ Please enter task date";
    containerStatus.style.padding = "2px 0";
    containerStatus.style.backgroundColor = "#e63922";
  } else {
    // Display action status
    containerStatus.innerText = "✅ The task was successfully added";
    containerStatus.style.padding = "2px 0";
    containerStatus.style.backgroundColor = "#2ecc71";

    // Set user's inputs inside object and push them into array
    arr.push({
      taskContent: taskContent.value,
      taskDate: taskDate.value,
      taskTime: taskTime.value,
    });

    // Create li element
    var li = document.createElement("li");
    // Set id to new note object and new note element in the dom
    for (var i = 0; i < arr.length; i++) {
        li.className = "note-style";
        // Set dynamic id to each new note object
        arr[i].id = "note" + i;
        // Set dynamic id to each new note element in the dom
        li.id = arr[i].id;
      }

    // Set the array inside the local storage and convert the array to a string
    localStorage.setItem('notes', JSON.stringify(arr));

    // Create container for the delete button
    var delContainer = document.createElement("div");
    delContainer.className = "container-delete-icon";
    li.appendChild(delContainer);
    // Create delete button
    var delBtn = document.createElement("button");
    delBtn.setAttribute("type", "button");
    delContainer.appendChild(delBtn);
    var delIcon = document.createElement("i");
    delIcon.className = "fas fa-window-close delete";
    delBtn.appendChild(delIcon);

    // Create container for the task content
    var contentContainer = document.createElement("div");
    contentContainer.className = "task-note";
    // Create paragraph for the task input
    var contentPargraph = document.createElement("p");
    contentContainer.appendChild(contentPargraph);
    contentPargraph.appendChild(document.createTextNode(taskContent.value));
    li.appendChild(contentContainer);

    // Create container for the date and time content
    var dateTimeContainer = document.createElement("div");
    dateTimeContainer.className = "task-date-time";
    // Create paragraph for the date input
    var datePargraph = document.createElement("p");
    // Create paragraph for the time input
    var timePargraph = document.createElement("p");
    dateTimeContainer.appendChild(datePargraph);
    datePargraph.appendChild(document.createTextNode(taskDate.value));
    dateTimeContainer.appendChild(timePargraph);
    timePargraph.appendChild(document.createTextNode(taskTime.value));
    li.appendChild(dateTimeContainer);
    // Append the li element inside the ul element
    ul.appendChild(li);  
  }

  // Once a note has been added, clear the form's inputs automatically
  document.querySelector("#task-content").value = "";
  document.querySelector("#task-date").value = "";
  document.querySelector("#task-time").value = "";
}

// Second Function: Display notes from the local storage
function getLocal() {
  // Check if localStorage isn't null
  if (localStorage.getItem("notes") != null) {
    // Store localStorage items in the array
    arr = JSON.parse(localStorage.getItem("notes"));

    // Notes are created based to array 'arr'
    for (var i = 0; i < arr.length; i++) {
        // Create li element
        var li = document.createElement("li");
        li.className = "note-style";
        // Set dynamic id to each new note object
        arr[i].id = "note" + i;
        // Set dynamic id to each new note element in the dom
        li.id = "note" + i;

        // Create container for the delete button
        var delContainer = document.createElement("div");
        delContainer.className = "container-delete-icon";
        li.appendChild(delContainer);
        // Create delete button
        var delBtn = document.createElement("button");
        delBtn.setAttribute("type", "button");
        delContainer.appendChild(delBtn);
        var delIcon = document.createElement("i");
        delIcon.className = "fas fa-window-close delete";
        delBtn.appendChild(delIcon);

        // Create container for the task content
        var contentContainer = document.createElement("div");
        contentContainer.className = "task-note";
        // Create paragraph for the task input
        var contentPargraph = document.createElement("p");
        contentContainer.appendChild(contentPargraph);
        contentPargraph.appendChild(document.createTextNode(arr[i].taskContent));
        li.appendChild(contentContainer);

        // Create container for the date and time content
        var dateTimeContainer = document.createElement("div");
        dateTimeContainer.className = "task-date-time";
        // Create paragraph for the date input
        var datePargraph = document.createElement("p");
        // Create paragraph for the time input
        var timePargraph = document.createElement("p");
        dateTimeContainer.appendChild(datePargraph);
        datePargraph.appendChild(document.createTextNode(arr[i].taskDate));
        dateTimeContainer.appendChild(timePargraph);
        timePargraph.appendChild(document.createTextNode(arr[i].taskTime));
        li.appendChild(dateTimeContainer);
        // Append the li element inside the ul element
        ul.appendChild(li);
      }
  }

  // Date range restriction
  // Browswer's time zone
  var dateObj = new Date();
  // Returns the current month
  // - return 0 to 11. '+ 1' turns it into 1 to 12
  var month = dateObj.getUTCMonth() + 1;
  // Returns the current day
  var day = dateObj.getUTCDate();
  // Returns the current year
  var year = dateObj.getUTCFullYear();
  // Construct the variables to the current date
  var minDate = year + "-" + month + "-" + day;
  var maxDate = year + 1 + "-" + month + "-" + day;
  // Set the range restriction inside the date input element
  taskDate.setAttribute("min", minDate);
  taskDate.setAttribute("max", maxDate);
}
// Once the page is loaded run the getLocal function
getLocal();

// Third function: Remove items from the dom and local storage
function removeItem(e) {
  // Check if the clicked element has the class 'delete'
  if (e.target.classList.contains("delete")) {
    // Delete task confirmation
    if (confirm("🗑 Delete Task?\nAre you sure want to delete this task?\n- This action cannot be undone.\n- Delething this task will remove all of its data.")) {
      // Get etlement
      var li = e.target.parentElement.parentElement.parentElement;
      var noteId = e.target.parentElement.parentElement.parentElement.id;

      // Finde the index of the object inside the array
      var index = 0;
      for (var i = 0; i < arr.length; i++) {
        for (var k = 0; k < arr[i].id.length; k++) {
          if (noteId === arr[i].id) { 
            index = i;
          }
        }
      }

      // Remove item from dom
      ul.removeChild(li);  
      // Remove item from array
      arr.splice(index, 1);

      // Resets all element's ids after deleting a note
      // Get element
      var note = document.querySelectorAll("li");
      // It prevents from a new note to contain the same id as the nearest sibling
      for (var i = 0; i < arr.length; i++) {
        // Set dynamic id to each new note object
        arr[i].id = "note" + i;
        // Set dynamic id to each new note element in the dom
        note[i].id = "note" + i;
      }

      // Set new array in localStorage
      localStorage.setItem('notes', JSON.stringify(arr));

      // Clear localstorage if it contains empty array '[]'
      if (localStorage.notes === "[]") {
        localStorage.removeItem("notes");
      }

      // Display action status
      containerStatus.innerText = "✅ The task was successfully removed";
      containerStatus.style.padding = "2px 0";
      containerStatus.style.backgroundColor = "#2ecc71";
    }
  }
}