import { checkBox } from "./checkBox";
import { showProject } from "./showProject";
import { detailsModal } from "./detailsModal";
export function deleteBtnEvent(instance) {
  let deleteBtnArray = document.querySelectorAll(".delete");
  for (let i = 1; i < deleteBtnArray.length; i++) {
    deleteBtnArray[i].addEventListener("click", function () {
      instance.deleteTodo(instance.currentProject, i - 1);
      showProject(instance.getStorage()[instance.currentProject]);
      deleteBtnEvent(instance);
      checkBox(instance);
      detailsModal(instance);
    });
  }
}
