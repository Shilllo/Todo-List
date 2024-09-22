import { showProject } from "./showProject";
import { createEventsProject } from "./selectProject";
import { detailsModal } from "./detailsModal";
import { checkBox } from "./checkBox";
import { deleteBtnEvent } from "./deleteBtnEvent";
export function modalStart(instance: any) {
  let plusBtn = document.querySelector(".plus") as HTMLElement;

  let modalNew = document.querySelector(".createNew") as HTMLElement;

  plusBtn.onclick = function () {
    modalNew.style.display = "block";
  };

  window.onclick = function (event) {
    if (event.target == modalNew) {
      modalNew.style.display = "none";
    }
  };

  let optionTodo = document.querySelector(".optionTodo") as HTMLElement;
  let optionProject = document.querySelector(".optionProject") as HTMLElement;

  let optionTodoContent = document.querySelector(
    "#optionTodoContent"
  ) as HTMLElement;
  let optionProjectContent = document.querySelector(
    "#optionProjectContent"
  ) as HTMLElement;

  optionTodo.addEventListener("click", function () {
    optionTodoContent.style.display = "flex";
    optionProjectContent.style.display = "none";
    optionTodo.classList.add("activeOption");
    optionProject.classList.remove("activeOption");
  });

  optionProject.addEventListener("click", function () {
    optionTodoContent.style.display = "none";
    optionProjectContent.style.display = "flex";
    optionProject.classList.add("activeOption");
    optionTodo.classList.remove("activeOption");
  });

  let addTodo = document.querySelector("#addTodo") as HTMLElement;
  let createProject = document.querySelector("#createProject") as HTMLElement;

  document
    .querySelector("#titleCreate")
    ?.children[1].addEventListener("click", () => {
      (document.querySelector(".modal") as HTMLElement).style.display = "none";
    });

  addTodo.addEventListener("click", function () {
    let title = document.querySelector("#titleInput") as HTMLInputElement;
    let details = document.querySelector("#detailsInput") as HTMLInputElement;
    let dueDate = document.querySelector("#dueDate")
      ?.children[1] as HTMLInputElement;
    let priority = document.querySelector("#priority")
      ?.children[1] as HTMLInputElement;
    if (title.value && details.value && dueDate.value) {
      instance.addTodo(instance.currentProject, {
        status: false,
        title: title.value,
        description: details.value,
        date: dueDate.value,
        priority: priority.value,
      });
      showProject(instance.getStorage()[instance.currentProject]);
      (document.querySelector(".modal") as HTMLElement).style.display = "none";
      document.querySelector(".sidebar")?.classList.remove("show-sidebar");
      title.value = "";
      details.value = "";
      priority.value = "low";
      dueDate.value = "";
    }
    detailsModal(instance);
    checkBox(instance);
    deleteBtnEvent(instance);
  });

  createProject.addEventListener("click", function () {
    let title = document.querySelector(
      "#titleProjectInput"
    ) as HTMLInputElement;
    if (title.value) {
      instance.addProject(title.value);
      let newProject = document.createElement("button");
      newProject.classList.add("project");
      let h4 = document.createElement("h4");
      h4.textContent = title.value;
      newProject.appendChild(h4);

      let count = document.createElement("div");
      count.classList.add("count");
      count.textContent = "0";

      newProject.appendChild(count);
      document.querySelector(".projects")?.appendChild(newProject);
      (document.querySelector("#titleProjectInput") as HTMLInputElement).value =
        "";
    }
    (document.querySelector(".modal") as HTMLElement).style.display = "none";
    document.querySelector(".sidebar")?.classList.remove("show-sidebar");
    createEventsProject(instance);
    showProject([]);

    instance.currentProject = title;
  });
}
