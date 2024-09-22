export function refreshCounts(instance: any) {
  let projects = document.querySelectorAll(".project");

  let projectNames = Object.keys(instance.getStorage());

  for (let i = 0; i < projects.length; i++) {
    projects[i].children[1].textContent =
      instance.getStorage()[projectNames[i]].length;
  }
}
