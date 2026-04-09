/* ---------- GLOBAL DARK MODE ---------- */

function initDarkMode() {
    const toggle = document.getElementById("darkToggle");
    if (!toggle) return;

    // Manuelles Umschalten
    toggle.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
        toggle.textContent = document.documentElement.classList.contains("dark") ? "☀️" : "🌙";
        localStorage.setItem("darkmode", document.documentElement.classList.contains("dark") ? "on" : "off");
    });

    // Gespeicherte Einstellung laden
    const saved = localStorage.getItem("darkmode");
    if (saved === "on") {
        document.documentElement.classList.add("dark");
        toggle.textContent = "☀️";
        return;
    }

    // Automatischer Dark Mode vom Gerät
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
        toggle.textContent = "☀️";
    }
}

// Starten
document.addEventListener("DOMContentLoaded", initDarkMode);
