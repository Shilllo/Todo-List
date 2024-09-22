export function detailsModal(instance: any) {
  let detailsModal = document.querySelector("#detailsModal");
  let detailsBtnArray = document.querySelectorAll(".details");

  let todos = instance.getStorage()[instance.currentProject];

  for (let i = 1; i < detailsBtnArray.length; i++) {
    detailsBtnArray[i].addEventListener("click", function () {
      const detailsTitleElement = document.querySelector("#detailsTitle");
      if (detailsTitleElement) {
        detailsTitleElement.textContent = todos[i - 1].title;
      }

      const detailsModalProject = document.querySelector(
        "#detailsModal-project"
      );
      if (detailsModalProject) {
        detailsModalProject.textContent = instance.currentProject;
      }

      const detailsModalPriority = document.querySelector(
        "#detailsModal-priority"
      );
      if (detailsModalPriority) {
        detailsModalPriority.textContent = todos[i - 1].priority;
      }

      const detailsModalDueDate = document.querySelector(
        "#detailsModal-dueDate"
      );
      if (detailsModalDueDate) {
        detailsModalDueDate.textContent = todos[i - 1].date;
      }

      const detailsModalDescription = document.querySelector(
        "#detailsModal-description"
      );
      if (detailsModalDescription) {
        detailsModalDescription.textContent = todos[i - 1].description;
      }

      (detailsModal as HTMLElement).style.display = "block";
    });
  }

  window.onclick = function (event) {
    if (event.target == detailsModal) {
      (detailsModal as HTMLElement).style.display = "none";
    }
  };

  document
    .querySelector("#detailsModal-close")
    ?.addEventListener("click", () => {
      (detailsModal as HTMLElement).style.display = "none";
    });
}
