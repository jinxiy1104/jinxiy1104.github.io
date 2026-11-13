// Start in light mode, regardless of the OS theme. Save only manual choices.
// A new preference key resets the previous design’s theme once.
(() => {
  let preference;
  try {
    preference = localStorage.getItem("jinxi-theme-v2");
  } catch {
    // The switch also works when browser storage is unavailable.
  }
  document.documentElement.dataset.theme =
    preference === "light" || preference === "dark"
      ? preference
      : "light";
})();
