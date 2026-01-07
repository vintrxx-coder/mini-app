// Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();

// Секції
const langSection = document.getElementById("langSection");
const menuSection = document.getElementById("menuSection");

// --------------------------
// Вибір мови
// --------------------------
["btnUA","btnRU","btnEN"].forEach(id => {
    document.getElementById(id).onclick = () => {
        langSection.classList.add("hidden"); // приховуємо мову
        menuSection.classList.remove("hidden"); // показуємо меню
    };
});

// --------------------------
// Відкриття секцій з меню
// --------------------------
const menuButtons = document.querySelectorAll(".menu-btn");
menuButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        menuSection.classList.add("hidden");
        const targetId = btn.getAttribute("data-target");
        document.getElementById(targetId).classList.remove("hidden");
    });
});

// --------------------------
// Повернення з секції назад
// --------------------------
const backButtons = document.querySelectorAll(".btnBackSection");
backButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        // ховаємо всі секції
        document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
        menuSection.classList.remove("hidden");
    });
});

// Повернення назад з меню до вибору мови
document.getElementById("btnBackMenu").onclick = () => {
    menuSection.classList.add("hidden");
    langSection.classList.remove("hidden");
};
