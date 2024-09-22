import { detailsModal } from "./detailsModal";
export function showProject(todos: Array<any>) {
  let content = document.querySelector(".content");
  if (content) {
    content.innerHTML = "";
  }

  if (!todos) {
    let text = document.createElement("p");
    text.textContent = "No todos";
    text.classList.add("no-todos");
    content?.appendChild(text);
  }
  for (let j = 0; j < todos.length; j++) {
    let todo = document.querySelector("#todoExample")?.cloneNode(true);
    (todo as HTMLElement).children[0].children[1].textContent = todos[j].title;
    (todo as HTMLElement).children[1].children[1].textContent =
      todos[j].date.slice(5);

    if (todos[j].status) {
      (todo as HTMLElement).classList.add("done");
    }

    (todo as HTMLElement).classList.add(todos[j].priority);

    (todo as HTMLElement).removeAttribute("id");
    (todo as HTMLElement).classList.add("todo");

    content?.appendChild(todo as HTMLElement);
  }

  let todoArray = document.querySelectorAll(".todo");

  for (let i = 0; i < todoArray.length; i++) {
    if (todoArray[i].classList.contains("done")) {
      (
        todoArray[i].children[0].children[0].children[0] as HTMLElement
      ).style.display = "none";
      (
        todoArray[i].children[0].children[0].children[1] as HTMLElement
      ).style.display = "block";
    } else {
      (
        todoArray[i].children[0].children[0].children[1] as HTMLElement
      ).style.display = "none";
      (
        todoArray[i].children[0].children[0].children[0] as HTMLElement
      ).style.display = "block";
    }
  }
}
