(function () {
  var KEY = "qb_theme";

  function currentTheme() {
    try {
      return localStorage.getItem(KEY) || "light";
    } catch (e) {
      return "light";
    }
  }

  function applyTheme(theme, root) {
    root = root || document.documentElement;
    root.setAttribute("data-theme", theme);
  }

  function setTheme(theme) {
    try {
      localStorage.setItem(KEY, theme);
    } catch (e) {}
    applyTheme(theme);

    try {
      var content = window.parent.frames["content_frame"];
      if (content && content !== window) {
        applyTheme(theme, content.document.documentElement);
      }
    } catch (e) {}
    try {
      var header = window.parent.frames["header_frame"];
      if (header && header !== window) {
        applyTheme(theme, header.document.documentElement);
      }
    } catch (e) {}

    highlightActiveButton(theme);
  }

  function highlightActiveButton(theme) {
    var buttons = document.querySelectorAll("[data-theme-option]");
    buttons.forEach(function (el) {
      el.classList.toggle(
        "active",
        el.getAttribute("data-theme-option") === theme,
      );
    });
  }

  window.setSiteTheme = setTheme;
  window.getSiteTheme = currentTheme;

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-theme-option]").forEach(function (el) {
      el.addEventListener("click", function () {
        setTheme(el.getAttribute("data-theme-option"));
      });
    });
    highlightActiveButton(currentTheme());
  });
})();
