const html = document.querySelector("html");
const changeThemeBtn = document.querySelector("#btn-change-theme");
let isDarkThemeActive = false;

const getStyle = (element, style) =>
  window.getComputedStyle(element).getPropertyValue(style).trim();

const lightTheme = {
  black: getStyle(html, "--black"),
  white: getStyle(html, "--white"),
  gray: getStyle(html, "--gray"),
  background: getStyle(html, "--background"),
};

const darkTheme = {
  black: "#fff",
  white: "#000",
  gray: "#222",
  background: "linear-gradient(45deg, rgb(0, 0, 0), var(--blue))",
};

const transformKey = (key) =>
  "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();

const changeTheme = (colors) => {
  Object.keys(colors).map((key) =>
    html.style.setProperty(transformKey(key), colors[key])
  );
};

changeThemeBtn.addEventListener("click", () => {
  changeThemeBtn.classList.toggle("fa-sun");

  if (!isDarkThemeActive) {
    changeTheme(darkTheme);
    isDarkThemeActive = true;
  } else {
    changeTheme(lightTheme);
    isDarkThemeActive = false;
  }
});
