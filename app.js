// ===============================
// APP.JS - VINTRXX MINI APP
// ===============================

const tg = window.Telegram.WebApp;

// ------------------------------
// КОНСТАНТИ
// ------------------------------
const LANGUAGES = ["UA", "RU", "EN"];
const SEGMENTS = ["10 VINTRXX", "50 VINTRXX", "100 VINTRXX", "200 VINTRXX", "500 VINTRXX", "1000 VINTRXX"];
const COLORS = ["#7F00FF","#00FFFF","#FF00FF","#4B0082","#8A2BE2","#00CED1"];
const WHEEL_RADIUS = 160;

// ------------------------------
// СЕКЦІЇ
// ------------------------------
function hideAllSections() {
    document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
}

function openMenu() {
    hideAllSections();
    document.getElementById("menuSection")?.style.display = "block";
}
window.openMenu = openMenu;

// ------------------------------
// ВИБІР МОВИ
// ------------------------------
LANGUAGES.forEach(lang => {
    document.getElementById(`btn${lang}`)?.addEventListener("click", () => {
        setLanguage(lang);
        openMenu();
    });
});

function setLanguage(lang) {
    document.documentElement.setAttribute("lang", lang);
    console.log("Language set to:", lang);
    // Тут можна додати локалізацію текстів
}

// ------------------------------
// МЕНЮ КНОПКИ
// ------------------------------
document.getElementById("btnWheel")?.addEventListener("click", () => {
    hideAllSections();
    document.getElementById("wheelSection")?.style.display = "block";
    drawWheel();
});

document.getElementById("btnShop")?.addEventListener("click", openShop);
document.getElementById("btnPortfolio")?.addEventListener("click", () => {
    hideAllSections();
    document.getElementById("portfolioSection")?.style.display = "block";
});

// ------------------------------
// КОНТАКТИ
// ------------------------------
function contactMe() { tg.openTelegramLink("https://t.me/v1ntrxx"); }
window.contactMe = contactMe;

// ------------------------------
// КОЛЕСО ФОРТУНИ
// ------------------------------
const canvas = document.getElementById("wheel");
const ctx = canvas?.getContext("2d");
const resultDiv = document.getElementById("result");
const spinButton = document.getElementById("spinButton");

let angle = 0;
let spinning = false;
const arc = 2 * Math.PI / SEGMENTS.length;

function drawWheel() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < SEGMENTS.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = COLORS[i];
        ctx.moveTo(WHEEL_RADIUS, WHEEL_RADIUS);
        ctx.arc(WHEEL_RADIUS, WHEEL_RADIUS, WHEEL_RADIUS, i * arc, (i + 1) * arc);
        ctx.fill();

        // Текст
        ctx.save();
        ctx.translate(WHEEL_RADIUS, WHEEL_RADIUS);
        ctx.rotate(i * arc + arc / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#00FFFF";
        ctx.font = "bold 16px Arial";
        ctx.fillText(SEGMENTS[i], WHEEL_RADIUS - 10, 10);
        ctx.restore();
    }
}

function spinWheel() {
    if (spinning) return;
    spinning = true;

    const spinAngle = Math.random() * 10 + 10;
    const duration = 3000;
    let start = null;

    function animate(time) {
        if (!start) start = time;
        const progress = time - start;
        const ease = 1 - Math.pow(1 - progress / duration, 3);
        angle += spinAngle * ease / 60;

        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(WHEEL_RADIUS, WHEEL_RADIUS);
        ctx.rotate(angle);
        ctx.translate(-WHEEL_RADIUS, -WHEEL_RADIUS);
        drawWheel();
        ctx.restore();

        if (progress < duration) requestAnimationFrame(animate);
        else {
            spinning = false;
            const index = Math.floor((SEGMENTS.length - (angle % (2 * Math.PI)) / arc) % SEGMENTS.length);
            if (resultDiv) resultDiv.innerText = `🎉 Ви виграли: ${SEGMENTS[index]}`;
        }
    }
    requestAnimationFrame(animate);
}

// ------------------------------
// МАГАЗИН
// ------------------------------
const shopItems = [
    { id: 1, name: "VIP Пакет", price: 500 },
    { id: 2, name: "Секретний Кейс", price: 300 },
    { id: 3, name: "Ексклюзивний Аватар", price: 200 },
];

function openShop() {
    hideAllSections();
    const shopSection = document.getElementById("shopSection");
    if (!shopSection) return;
    shopSection.style.display = "block";

    shopSection.innerHTML = "<h2 style='color:#00FFFF;'>🛒 Магазин VINTRXX COIN</h2>";
    shopItems.forEach(item => {
        const btn = document.createElement("button");
        btn.innerText = `${item.name} — ${item.price} VINTRXX`;
        btn.className = "glass-btn shopItemBtn";
        btn.addEventListener("click", () => alert(`💎 Ви купили: ${item.name} за ${item.price} VINTRXX`));
        shopSection.appendChild(btn);
    });

    const backBtn = document.createElement("button");
    backBtn.innerText = "⬅ Back";
    backBtn.className = "glass-btn back-btn";
    backBtn.addEventListener("click", openMenu);
    shopSection.appendChild(backBtn);
}

// ------------------------------
// ІНІЦІАЛІЗАЦІЯ
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
    hideAllSections();
    document.getElementById("langSection")?.style.display = "block";
});

window.spinWheel = spinWheel;
window.openShop = openShop;
