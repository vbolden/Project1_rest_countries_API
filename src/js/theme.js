// VARIABLES
const themeBtn = document.getElementById("theme");
const themeIcon = document.getElementById("theme-icon")
const themeText = document.getElementById("theme-text");


// EVENT LISTENERS
window.addEventListener("load", () => {

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeText.innerHTML = "Light Mode";
        themeIcon.name = "sunny";
    } 
})

    themeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        changeTheme();
    });

// THEME SWITCHING FUNCTION
function changeTheme() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeText.innerHTML = "Light Mode";
        themeIcon.name = "sunny";
        localStorage.setItem("theme", "dark")
    } else {
        themeText.innerHTML = "Dark Mode";
        themeIcon.name = "moon-outline";
        localStorage.setItem("theme", "light");
    }
}