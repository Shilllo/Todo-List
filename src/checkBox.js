export function checkBox(instance) {
  let checkBoxArray = document.querySelectorAll(".checkBox");
  let todoArray = document.querySelectorAll(".todo");

  for (let i = 0; i < todoArray.length; i++) {
    checkBoxArray[i + 1].addEventListener("click", function () {
      todoArray[i].classList.toggle("done");
      instance.refreshStatus(instance.currentProject, i);

      if (todoArray[i].classList.contains("done")) {
        todoArray[i].children[0].children[0].children[0].style.display = "none";
        todoArray[i].children[0].children[0].children[1].style.display =
          "block";
      } else {
        todoArray[i].children[0].children[0].children[1].style.display = "none";
        todoArray[i].children[0].children[0].children[0].style.display =
          "block";
      }
    });
  }
}
