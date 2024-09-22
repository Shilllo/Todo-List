import { modalStart } from "./modal";
import { checkBox } from "./checkBox";
import { showSidebar } from "./showSidebar";
import { createEventsProject } from "./selectProject";
import { detailsModal } from "./detailsModal";
import { deleteBtnEvent } from "./deleteBtnEvent";
import { showProject } from "./showProject";
import { refreshCounts } from "./refreshCounts";
import { showAllProjects } from "./showAllProjects";
export class Storage {
  storage: { [key: string]: any } = {};

  currentProject: string = "";
  constructor() {
    this.storage = {
      Today: [
        {
          status: false,
          title: "brush teeth",
          description: "brush teeth with tooth brush",
          date: "2024-09-12",
          priority: "medium",
        },
        {
          status: false,
          title: "eat breakfast",
          description: "eat breakfast with milk",
          date: "2024-09-12",
          priority: "low",
        },
        {
          status: false,
          title: "complete homework",
          description: "ex. 1, 2, 3",
          date: "2024-09-25",
          priority: "high",
        },
      ],
      Week: [],
      Gym: [],
      Study: [],
      Notes: [
        {
          status: false,
          title: "go for a walk",
          description: "go for a walk with my dog",
          date: "2024-09-25",
          priority: "medium",
        },
      ],
    };
    this.currentProject = "Today";

    if (localStorage.getItem("storage")) {
      this.storage = JSON.parse(localStorage.getItem("storage") ?? "{}");
    } else {
      localStorage.setItem("storage", JSON.stringify(this.storage));
    }

    showAllProjects(this);
    showProject(this.storage[this.currentProject as keyof typeof this.storage]);

    checkBox(this);
    deleteBtnEvent(this);
    createEventsProject(this);
    modalStart(this);
    showSidebar();
    detailsModal(this);
    refreshCounts(this);
  }

  addProject(project: string) {
    this.storage[project] = [];
    localStorage.setItem("storage", JSON.stringify(this.storage));
    refreshCounts(this);
  }

  addTodo(project: string, todo: object) {
    this.storage[project].push(todo);
    localStorage.setItem("storage", JSON.stringify(this.storage));
    refreshCounts(this);
  }

  getStorage() {
    return this.storage;
  }

  refreshStatus(project: string, index: number) {
    this.storage[project][index].status = !this.storage[project][index].status;
    localStorage.setItem("storage", JSON.stringify(this.storage));
  }

  deleteTodo(project: string, index: number) {
    this.storage[project].splice(index, 1);
    localStorage.setItem("storage", JSON.stringify(this.storage));
    refreshCounts(this);
  }

  deleteProject(project: string) {
    delete this.storage[project];
    localStorage.setItem("storage", JSON.stringify(this.storage));
  }
}
