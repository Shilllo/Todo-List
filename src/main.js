// import './style.css';
// import { Storage } from "./storage";

class Storage {
    constructor() {
        this.storage = {
            Today: [
                {
                    status: false,
                    title: 'brush teeth',
                    description: 'brush teeth with tooth brush',
                    date: '2024-09-12',
                    priority: 'medium',
                },
                {
                    status: false,
                    title: 'eat breakfast',
                    description: 'eat breakfast with milk',
                    date: '2024-09-12',
                    priority: 'low',
                },
                {
                    status: false,
                    title: 'complete homework',
                    description: 'ex. 1, 2, 3',
                    date: '2024-09-25',
                    priority: 'high',
                },
            ],
            Week: [],
            Gym: [],
            Study: [],
            Notes: [
                {
                    status: false,
                    title: 'go for a walk',
                    description: 'go for a walk with my dog',
                    date: '2024-09-25',
                    priority: 'medium',
                },
            ],
        };
        this.currentProject = 'Today';

        if (localStorage.getItem('storage')) {
            this.storage = JSON.parse(localStorage.getItem('storage'));
        } else {
            localStorage.setItem('storage', JSON.stringify(this.storage));
        }

        showAllProjects(this);
        showProject(this.storage[this.currentProject], this);

        checkBox(this);
        deleteBtnEvent(this);
        createEventsProject(this);
        modalStart(this);
        showSidebar();
        detailsModal(this);
        refreshCounts(this);
    }

    addProject(project) {
        this.storage[project] = [];
        localStorage.setItem('storage', JSON.stringify(this.storage));
        refreshCounts(this);
    }

    addTodo(project, todo) {
        this.storage[project].push(todo);
        localStorage.setItem('storage', JSON.stringify(this.storage));
        refreshCounts(this);
    }

    getStorage() {
        return this.storage;
    }

    refreshStatus(project, index) {
        this.storage[project][index].status =
            !this.storage[project][index].status;
        localStorage.setItem('storage', JSON.stringify(this.storage));
    }

    deleteTodo(project, index) {
        this.storage[project].splice(index, 1);
        localStorage.setItem('storage', JSON.stringify(this.storage));
        refreshCounts(this);
    }

    deleteProject(project) {
        delete this.storage[project];
        localStorage.setItem('storage', JSON.stringify(this.storage));
    }
}

function modalStart(instance) {
    let plusBtn = document.querySelector('.plus');

    let modalNew = document.querySelector('.createNew');

    let span = document.getElementsByClassName('close')[0];

    plusBtn.onclick = function () {
        modalNew.style.display = 'block';
    };

    window.onclick = function (event) {
        if (event.target == modalNew) {
            modalNew.style.display = 'none';
        }
    };

    let optionTodo = document.querySelector('.optionTodo');
    let optionProject = document.querySelector('.optionProject');

    let optionTodoContent = document.querySelector('#optionTodoContent');
    let optionProjectContent = document.querySelector('#optionProjectContent');

    optionTodo.addEventListener('click', function () {
        optionTodoContent.style.display = 'flex';
        optionProjectContent.style.display = 'none';
        optionTodo.classList.add('activeOption');
        optionProject.classList.remove('activeOption');
    });

    optionProject.addEventListener('click', function () {
        optionTodoContent.style.display = 'none';
        optionProjectContent.style.display = 'flex';
        optionProject.classList.add('activeOption');
        optionTodo.classList.remove('activeOption');
    });

    let addTodo = document.querySelector('#addTodo');
    let createProject = document.querySelector('#createProject');

    document
        .querySelector('#titleCreate')
        .children[1].addEventListener('click', () => {
            document.querySelector('.modal').style.display = 'none';
        });

    addTodo.addEventListener('click', function () {
        let title = document.querySelector('#titleInput').value;
        let details = document.querySelector('#detailsInput').value;
        let dueDate = document.querySelector('#dueDate').children[1].value;
        let priority = document.querySelector('#priority').children[1];
        if (title && details && dueDate) {
            instance.addTodo(instance.currentProject, {
                status: false,
                title: title,
                description: details,
                date: dueDate,
                priority: priority.value,
            });
            showProject(instance.getStorage()[instance.currentProject]);
            document.querySelector('.modal').style.display = 'none';
            document.querySelector('.sidebar').classList.remove('show-sidebar');
            document.querySelector('#titleInput').value = '';
            document.querySelector('#detailsInput').value = '';
            document.querySelector('#priority').children[1].value = 'low';
            document.querySelector('#dueDate').children[1].value = '';
        }
        detailsModal(instance);
        checkBox(instance);
        deleteBtnEvent(instance);
    });

    createProject.addEventListener('click', function () {
        let title = document.querySelector('#titleProjectInput').value;
        if (title) {
            instance.addProject(title);
            let newProject = document.createElement('button');
            newProject.classList.add('project');
            let h4 = document.createElement('h4');
            h4.textContent = title;
            newProject.appendChild(h4);

            let count = document.createElement('div');
            count.classList.add('count');
            count.textContent = 0;

            newProject.appendChild(count);
            document.querySelector('.projects').appendChild(newProject);
            document.querySelector('#titleProjectInput').value = '';
        }
        document.querySelector('.modal').style.display = 'none';
        document.querySelector('.sidebar').classList.remove('show-sidebar');
        createEventsProject(instance);
        showProject([]);

        instance.currentProject = title;
    });
}

function checkBox(instance) {
    let checkBoxArray = document.querySelectorAll('.checkBox');
    let todoArray = document.querySelectorAll('.todo');

    for (let i = 0; i < todoArray.length; i++) {
        checkBoxArray[i + 1].addEventListener('click', function () {
            todoArray[i].classList.toggle('done');
            instance.refreshStatus(instance.currentProject, i);

            if (todoArray[i].classList.contains('done')) {
                todoArray[i].children[0].children[0].children[0].style.display =
                    'none';
                todoArray[i].children[0].children[0].children[1].style.display =
                    'block';
            } else {
                todoArray[i].children[0].children[0].children[1].style.display =
                    'none';
                todoArray[i].children[0].children[0].children[0].style.display =
                    'block';
            }
        });
    }
}

function deleteBtnEvent(instance) {
    let deleteBtnArray = document.querySelectorAll('.delete');
    for (let i = 1; i < deleteBtnArray.length; i++) {
        deleteBtnArray[i].addEventListener('click', function () {
            instance.deleteTodo(instance.currentProject, i - 1);
            showProject(instance.getStorage()[instance.currentProject]);
            deleteBtnEvent(instance);
            checkBox(instance);
            detailsModal(instance);
        });
    }
}

function refreshCounts(instance) {
    let projects = document.querySelectorAll('.project');

    for (let i = 0; i < projects.length; i++) {
        projects[i].children[1].textContent =
            instance.getStorage()[projects[i].children[0].textContent].length;
    }
}

function createEventsProject(instance) {
    let projects = document.querySelectorAll('.project');

    let content = document.querySelector('.content');

    for (let i = 0; i < projects.length; i++) {
        projects[i].addEventListener('click', function () {
            instance.currentProject = projects[i].children[0].textContent;
            content.innerHTML = '';
            const todos =
                instance.getStorage()[projects[i].children[0].textContent];

            let active = document.querySelectorAll('.active');
            active[0].classList.remove('active');
            projects[i].classList.add('active');

            if (todos.length === 0) {
                let text = document.createElement('p');
                text.textContent = 'No todos';
                text.classList.add('no-todos');
                content.appendChild(text);

                // let deleteProject = document.createElement("button");
                // deleteProject.textContent = "Delete Project";
                // content.appendChild(deleteProject);

                // deleteProject.addEventListener("click", function () {
                //   instance.deleteProject(instance.currentProject);
                //   showProject(instance.getStorage()["Today"], instance);
                //   showAllProjects(instance);

                //   checkBox(instance);
                //   detailsModal(instance);
                //   deleteBtnEvent(instance);
                // });
            } else {
                for (let j = 0; j < todos.length; j++) {
                    let todo = document
                        .querySelector('#todoExample')
                        .cloneNode(true);
                    todo.children[0].children[1].textContent = todos[j].title;
                    todo.children[1].children[1].textContent =
                        todos[j].date.slice(5);
                    todo.removeAttribute('id');
                    todo.classList.add('todo');

                    if (todos[j].status) {
                        todo.classList.add('done');
                    }

                    if (todo.classList.contains('done')) {
                        todo.children[0].children[0].children[0].style.display =
                            'none';
                        todo.children[0].children[0].children[1].style.display =
                            'block';
                    } else {
                        todo.children[0].children[0].children[1].style.display =
                            'none';
                        todo.children[0].children[0].children[0].style.display =
                            'block';
                    }

                    todo.classList.add(todos[j].priority);
                    content.appendChild(todo);
                }

                checkBox(instance);
                detailsModal(instance);
                deleteBtnEvent(instance);
            }
            let sidebar = document.querySelector('.sidebar');
            sidebar.classList.remove('show-sidebar');
        });
    }
}

function showAllProjects(instance) {
    let sidebar = document.querySelector('.projects');
    sidebar.innerHTML = '';

    let projects = instance.getStorage();
    for (let i in projects) {
        let project = document.createElement('button');
        project.classList.add('project');

        let h4 = document.createElement('h4');
        h4.textContent = i;

        let count = document.createElement('div');
        count.classList.add('count');
        count.textContent = projects[i].length;

        project.appendChild(h4);
        project.appendChild(count);

        if (i === instance.currentProject) {
            project.classList.add('active');
        }

        sidebar.appendChild(project);
    }
}

function showProject(todos, instance) {
    let content = document.querySelector('.content');
    content.innerHTML = '';
    if (todos.length === 0) {
        let text = document.createElement('p');
        text.textContent = 'No todos';
        text.classList.add('no-todos');
        content.appendChild(text);
    }
    for (let j = 0; j < todos.length; j++) {
        let todo = document.querySelector('#todoExample').cloneNode(true);
        todo.children[0].children[1].textContent = todos[j].title;
        todo.children[1].children[1].textContent = todos[j].date.slice(5);

        if (todos[j].status) {
            todo.classList.add('done');
        }

        todo.classList.add(todos[j].priority);

        todo.removeAttribute('id');
        todo.classList.add('todo');

        content.appendChild(todo);
    }

    let todoArray = document.querySelectorAll('.todo');

    for (let i = 0; i < todoArray.length; i++) {
        if (todoArray[i].classList.contains('done')) {
            todoArray[i].children[0].children[0].children[0].style.display =
                'none';
            todoArray[i].children[0].children[0].children[1].style.display =
                'block';
        } else {
            todoArray[i].children[0].children[0].children[1].style.display =
                'none';
            todoArray[i].children[0].children[0].children[0].style.display =
                'block';
        }
    }
}

function showSidebar() {
    const menuBtn = document.querySelector('.menu');

    const sidebar = document.querySelector('.sidebar');
    const icon = document.querySelector('.menu-icon');

    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('show-sidebar');
        icon.classList.toggle('opened');
    });
}

let storage = new Storage();

// localStorage.clear();
