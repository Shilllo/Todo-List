import { detailsModal } from "./detailsModal";
export function showProject(todos, instance) {
  let content = document.querySelector(".content");
  content.innerHTML = "";
  if (todos.length === 0) {
    let text = document.createElement("p");
    text.textContent = "No todos";
    text.classList.add("no-todos");
    content.appendChild(text);
  }
  for (let j = 0; j < todos.length; j++) {
    let todo = document.querySelector("#todoExample").cloneNode(true);
    todo.children[0].children[1].textContent = todos[j].title;
    todo.children[1].children[1].textContent = todos[j].date;

    if (todos[j].status) {
      todo.classList.add("done");
    }

    todo.classList.add(todos[j].priority);

    todo.removeAttribute("id");
    todo.classList.add("todo");

    content.appendChild(todo);
  }

  let todoArray = document.querySelectorAll(".todo");

  for (let i = 0; i < todoArray.length; i++) {
    if (todoArray[i].classList.contains("done")) {
      todoArray[i].children[0].children[0].children[0].style.display = "none";
      todoArray[i].children[0].children[0].children[1].style.display = "block";
    } else {
      todoArray[i].children[0].children[0].children[1].style.display = "none";
      todoArray[i].children[0].children[0].children[0].style.display = "block";
    }
  }
}
