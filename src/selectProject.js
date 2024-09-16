import { checkBox } from "./checkBox";
import { detailsModal } from "./detailsModal";
import { deleteBtnEvent } from "./deleteBtnEvent";
export function createEventsProject(instance) {
  let projects = document.querySelectorAll(".project");

  let content = document.querySelector(".content");

  for (let i = 0; i < projects.length; i++) {
    projects[i].addEventListener("click", function () {
      instance.currentProject = projects[i].children[0].textContent;
      content.innerHTML = "";
      const todos = instance.getStorage()[projects[i].children[0].textContent];

      let active = document.querySelectorAll(".active");
      active[0].classList.remove("active");
      projects[i].classList.add("active");

      if (todos.length === 0) {
        let text = document.createElement("p");
        text.textContent = "No todos";
        text.classList.add("no-todos");
        content.appendChild(text);
      } else {
        for (let j = 0; j < todos.length; j++) {
          let todo = document.querySelector("#todoExample").cloneNode(true);
          todo.children[0].children[1].textContent = todos[j].title;
          todo.children[1].children[1].textContent = todos[j].date.slice(5);
          todo.removeAttribute("id");
          todo.classList.add("todo");

          if (todos[j].status) {
            todo.classList.add("done");
          }

          if (todo.classList.contains("done")) {
            todo.children[0].children[0].children[0].style.display = "none";
            todo.children[0].children[0].children[1].style.display = "block";
          } else {
            todo.children[0].children[0].children[1].style.display = "none";
            todo.children[0].children[0].children[0].style.display = "block";
          }

          todo.classList.add(todos[j].priority);
          content.appendChild(todo);
        }

        checkBox(instance);
        detailsModal(instance);
        deleteBtnEvent(instance);
      }
      let sidebar = document.querySelector(".sidebar");
      sidebar.classList.remove("show-sidebar");
    });
  }
}
