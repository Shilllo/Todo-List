import { checkBox } from "./checkBox";
import { detailsModal } from "./detailsModal";
import { deleteBtnEvent } from "./deleteBtnEvent";
export function createEventsProject(instance: any) {
  let projects = document.querySelectorAll(".project");

  let content = document.querySelector(".content");

  for (let i = 0; i < projects.length; i++) {
    projects[i].addEventListener("click", function () {
      instance.currentProject = projects[i].children[0].textContent;

      if (content) {
        content.innerHTML = "";
      }

      let projectNames = Object.keys(instance.getStorage());

      const todos = instance.getStorage()[projectNames[i]];

      let active = document.querySelectorAll(".active");
      active[0].classList.remove("active");
      projects[i].classList.add("active");

      if (todos.length === 0) {
        let text = document.createElement("p");
        text.textContent = "No todos";
        text.classList.add("no-todos");
        content?.appendChild(text);
      } else {
        for (let j = 0; j < todos.length; j++) {
          let todo = document.querySelector("#todoExample")?.cloneNode(true);

          if (todo) {
            (todo as HTMLElement).children[0].children[1].textContent =
              todos[j].title;
            (todo as HTMLElement).children[1].children[1].textContent =
              todos[j].date.slice(5);
            (todo as HTMLElement).removeAttribute("id");
            (todo as HTMLElement).classList.add("todo");
          }

          if (todos[j].status) {
            (todo as HTMLElement).classList.add("done");
          }

          if ((todo as HTMLElement).classList.contains("done")) {
            (
              (todo as HTMLElement).children[0].children[0]
                .children[0] as HTMLElement
            ).style.display = "none";
            (
              (todo as HTMLElement).children[0].children[0]
                .children[1] as HTMLElement
            ).style.display = "block";
          } else {
            (
              (todo as HTMLElement).children[0].children[0]
                .children[1] as HTMLElement
            ).style.display = "none";
            (
              (todo as HTMLElement).children[0].children[0]
                .children[0] as HTMLElement
            ).style.display = "block";
          }

          (todo as HTMLElement).classList.add(todos[j].priority);
          content?.appendChild(todo as HTMLElement);
        }

        checkBox(instance);
        detailsModal(instance);
        deleteBtnEvent(instance);
      }
      let sidebar = document.querySelector(".sidebar");
      sidebar?.classList.remove("show-sidebar");
    });
  }
}
