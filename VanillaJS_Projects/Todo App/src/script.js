//Fetching add button and task text
const todo = document.querySelector("#task");
const addButton = document.querySelector("#addBtn");
const taskSection = document.querySelector("#taskSection");

let tasks = JSON.parse(localStorage.getItem("todos")) || [];

function deleteTask(id) {
  const newTasks = tasks.filter((element) => {
    return element.id !== id;
  });
  tasks = [...newTasks];
  saveTasks();
  renderTasks(tasks);
}

const editTask = (id) => {
  alert("Editing task #" + id);
};

const completeTask = (id) => {
  for (let task of tasks) {
    if (task.id === id) task.completed = !task.completed;
  }
  saveTasks();
  renderTasks(tasks);
};

const renderTasks = (tasks) => {
  taskSection.innerHTML = "";
  tasks.forEach((element) => {
    // Creating parent div with id holding 2 sections, left and right
    const todoDIV = document.createElement("div");
    todoDIV.setAttribute("id", element.id);
    todoDIV.classList.add("flex", "justify-between", "items-center");

    // Creating Left Section with a checkbox and task paragraph
    const leftSection = document.createElement("section");
    leftSection.classList.add("left", "flex");
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("onchange", `completeTask(${element.id})`);
    if (element.completed) {
      checkbox.checked = true;
    }
    checkbox.classList.add("mr-2");
    const taskParagraph = document.createElement("p");
    taskParagraph.innerText = element.taskName;
    if (element.completed) {
      taskParagraph.style.textDecoration = "line-through";
      taskParagraph.style.color = "grey";
    } else {
      taskParagraph.style.textDecoration = "none";
      taskParagraph.style.color = "black";
    }
    leftSection.appendChild(checkbox);
    leftSection.appendChild(taskParagraph);

    // Creating Right Section with 2 buttons
    const rightSection = document.createElement("section");
    rightSection.classList.add("right", "flex", "gap-1.5");
    const editButton = document.createElement("button");
    editButton.setAttribute("onclick", `editTask(${element.id})`);
    editButton.classList.add(
      "bg-[#3a88fc]",
      "w-[35px]",
      "h-[35px]",
      "rounded-[50%]",
      "text-white"
    );
    editButton.style.boxShadow = "3px 3px black";
    editButton.innerHTML = `<i class="fa-solid fa-pencil"></i>`;
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("onclick", `deleteTask(${element.id})`);
    deleteButton.classList.add(
      "bg-red-500",
      "w-[35px]",
      "h-[35px]",
      "rounded-[50%]",
      "text-white"
    );
    deleteButton.style.boxShadow = "3px 3px black";
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    rightSection.appendChild(editButton);
    rightSection.appendChild(deleteButton);

    // Adding the 2 sections to todoDIV
    todoDIV.appendChild(leftSection);
    todoDIV.appendChild(rightSection);

    // Adding the todoDIV to taskSection
    taskSection.appendChild(todoDIV);
  });
};

const saveTasks = () => {
  localStorage.setItem("todos", JSON.stringify(tasks));
  console.log(tasks);
};

//console.log(taskSection);

renderTasks(tasks);

addButton.addEventListener("click", () => {
  if (todo.value.trim() === "") return;

  const taskObject = {
    id: Date.now(),
    taskName: todo.value.trim(),
    completed: false,
  };
  tasks.push(taskObject);
  saveTasks();
  todo.value = "";
  renderTasks(tasks);
});
