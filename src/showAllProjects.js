export function showAllProjects(instance) {
  let sidebar = document.querySelector(".projects");
  sidebar.innerHTML = "";

  let projects = instance.getStorage();
  for (let i in projects) {
    let project = document.createElement("button");
    project.classList.add("project");

    let h4 = document.createElement("h4");
    h4.textContent = i;

    let count = document.createElement("div");
    count.classList.add("count");
    count.textContent = projects[i].length;

    project.appendChild(h4);
    project.appendChild(count);

    if (i === instance.currentProject) {
      project.classList.add("active");
    }

    sidebar.appendChild(project);
  }
}
