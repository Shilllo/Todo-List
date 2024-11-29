export function showSidebar() {
  const menuBtn = document.querySelector(".menu");

  const sidebar = document.querySelector(".sidebar");
  const icon = document.querySelector(".menu-icon");

  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("show-sidebar");
    icon.classList.toggle("opened");
  });
}
