const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = themeToggle.querySelector(".theme-label");

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const dark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(dark));
  themeToggle.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} mode`);
  themeToggle.title = dark ? "切换日间模式" : "切换夜间模式";
  themeLabel.textContent = dark ? "Light" : "Dark";
}

setTheme(document.documentElement.dataset.theme);
themeToggle.addEventListener("click", () => {
  const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(theme);
  try {
    localStorage.setItem("jinxi-theme-v2", theme);
  } catch {
    // The current page still uses the selected theme.
  }
});
window.addEventListener("storage", (event) => {
  if (event.key !== "jinxi-theme-v2" && event.key !== null) return;
  setTheme(event.newValue === "dark" ? "dark" : "light");
});

const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const sections = sectionLinks.map((link) => document.querySelector(link.getAttribute("href")));
let scrollPending = false;
function updateActiveSection() {
  const offset = document.querySelector(".site-header").offsetHeight + 70;
  let active = -1;
  sections.forEach((section, index) => {
    if (section.getBoundingClientRect().top <= offset) active = index;
  });
  sectionLinks.forEach((link, index) => {
    if (index === active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  scrollPending = false;
}
window.addEventListener("scroll", () => {
  if (!scrollPending) {
    scrollPending = true;
    requestAnimationFrame(updateActiveSection);
  }
}, { passive: true });
window.addEventListener("resize", updateActiveSection);
updateActiveSection();
