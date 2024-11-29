export function refreshCounts(instance) {
  let projects = document.querySelectorAll(".project");

  for (let i = 0; i < projects.length; i++) {
    projects[i].children[1].textContent =
      instance.getStorage()[projects[i].children[0].textContent].length;
  }
}
