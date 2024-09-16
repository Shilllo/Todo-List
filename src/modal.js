import { showProject } from "./showProject";
import { createEventsProject } from "./selectProject";
import { detailsModal } from "./detailsModal";
import { checkBox } from "./checkBox";
import { deleteBtnEvent } from "./deleteBtnEvent";
export function modalStart(instance) {
  let plusBtn = document.querySelector(".plus");

  let modalNew = document.querySelector(".createNew");

  let span = document.getElementsByClassName("close")[0];

  plusBtn.onclick = function () {
    modalNew.style.display = "block";
  };

  window.onclick = function (event) {
    if (event.target == modalNew) {
      modalNew.style.display = "none";
    }
  };

  let optionTodo = document.querySelector("#optionTodo");
  let optionProject = document.querySelector("#optionProject");

  let optionTodoContent = document.querySelector("#optionTodoContent");
  let optionProjectContent = document.querySelector("#optionProjectContent");

  optionTodo.addEventListener("click", function () {
    optionTodoContent.style.display = "flex";
    optionProjectContent.style.display = "none";
  });

  optionProject.addEventListener("click", function () {
    optionTodoContent.style.display = "none";
    optionProjectContent.style.display = "flex";
  });

  let addTodo = document.querySelector("#addTodo");
  let createProject = document.querySelector("#createProject");

  addTodo.addEventListener("click", function () {
    let title = document.querySelector("#titleInput").value;
    let details = document.querySelector("#detailsInput").value;
    let dueDate = document.querySelector("#dueDate").children[1].value;
    let priority = document.querySelector("#priority").children[1];
    if (title && details && dueDate) {
      instance.addTodo(instance.currentProject, {
        status: false,
        title: title,
        description: details,
        date: dueDate,
        priority: priority.value,
      });
      showProject(instance.getStorage()[instance.currentProject]);
      modalNew.style.display = "none";
      document.querySelector("#titleInput").value = "";
      document.querySelector("#detailsInput").value = "";
      document.querySelector("#priority").children[1].value = "low";
      document.querySelector("#dueDate").children[1].value = "";
    }
    detailsModal(instance);
    checkBox(instance);
    deleteBtnEvent(instance);
  });

  createProject.addEventListener("click", function () {
    let title = document.querySelector("#titleProjectInput").value;
    if (title) {
      instance.addProject(title);
      let newProject = document.createElement("button");
      newProject.classList.add("project");
      let h4 = document.createElement("h4");
      h4.textContent = title;
      newProject.appendChild(h4);

      let count = document.createElement("div");
      count.classList.add("count");
      count.textContent = 0;

      newProject.appendChild(count);
      document.querySelector(".projects").appendChild(newProject);
      document.querySelector("#titleProjectInput").value = "";
    }
    modalNew.style.display = "none";
    createEventsProject(instance);
    showProject([]);

    instance.currentProject = title;
  });
}
