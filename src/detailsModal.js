export function detailsModal(instance) {
  let detailsModal = document.querySelector("#detailsModal");
  let detailsBtnArray = document.querySelectorAll(".details");

  let todos = instance.getStorage()[instance.currentProject];

  for (let i = 1; i < detailsBtnArray.length; i++) {
    detailsBtnArray[i].addEventListener("click", function () {
      document.querySelector("#detailsTitle").textContent = todos[i - 1].title;
      document.querySelector("#detailsModal-project").textContent =
        instance.currentProject;
      document.querySelector("#detailsModal-priority").textContent =
        todos[i - 1].priority;
      document.querySelector("#detailsModal-dueDate").textContent =
        todos[i - 1].date;
      document.querySelector("#detailsModal-description").textContent =
        todos[i - 1].description;
      detailsModal.style.display = "block";
    });
  }

  window.onclick = function (event) {
    if (event.target == detailsModal) {
      detailsModal.style.display = "none";
    }
  };
}
