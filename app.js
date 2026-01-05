const tg = window.Telegram.WebApp;
tg.expand();

// --------------------------
// СЕКЦІЇ
// --------------------------
const langSection = document.getElementById("langSection");
const menuSection = document.getElementById("menuSection");
const wheelContainer = document.getElementById("wheelContainer");
const portfolioSection = document.getElementById("portfolioSection");
const paymentSection = document.getElementById("paymentSection");

function hideAllSections() {
    langSection.style.display = "none";
    menuSection.style.display = "none";
    wheelContainer.style.display = "none";
    portfolioSection.style.display = "none";
    if(paymentSection) paymentSection.style.display = "none";
}

// --------------------------
// ВИБІР МОВИ
// --------------------------
let selectedLang = localStorage.getItem("lang") || null;

const texts = {
    ua: {
        menuTitle: "🚀 Головне меню",
        btn1: "Режим",
        btn2: "Налаштування",
        btn3: "Інфо",
        wheelBtn: "🎰 Колесо Фортуни",
        portfolioBtn: "🎨 Портфоліо",
        paymentBtn: "💰 Оплата",
        paymentTitle: "💰 Оплата",
        paymentText: "Оберіть спосіб оплати:",
        starsBtn: "⭐ Оплата зірками",
        cryptoBtn: "💎 Оплата криптовалютою",
        backBtn: "⬅️ Назад",
        contactBtn: "✉️ Замовити дизайн"
    },
    ru: {
        menuTitle: "🚀 Главное меню",
        btn1: "Режим",
        btn2: "Настройки",
        btn3: "Инфо",
        wheelBtn: "🎰 Колесо Фортуны",
        portfolioBtn: "🎨 Портфолио",
        paymentBtn: "💰 Оплата",
        paymentTitle: "💰 Оплата",
        paymentText: "Выберите способ оплаты:",
        starsBtn: "⭐ Оплата звёздами",
        cryptoBtn: "💎 Оплата криптовалютой",
        backBtn: "⬅️ Назад",
        contactBtn: "✉️ Заказать дизайн"
    },
    en: {
        menuTitle: "🚀 Main Menu",
        btn1: "Mode",
        btn2: "Settings",
        btn3: "Info",
        wheelBtn: "🎰 Wheel of Fortune",
        portfolioBtn: "🎨 Portfolio",
        paymentBtn: "💰 Payment",
        paymentTitle: "💰 Payment",
        paymentText: "Choose payment method:",
        starsBtn: "⭐ Pay with Stars",
        cryptoBtn: "💎 Pay with Crypto",
        backBtn: "⬅️ Back",
        contactBtn: "✉️ Order Design"
    }
};

function applyLang() {
    if(!selectedLang) return;
    const t = texts[selectedLang];

    document.getElementById("menuTitle").innerText = t.menuTitle;
    document.getElementById("btn1").innerText = t.btn1;
    document.getElementById("btn2").innerText = t.btn2;
    document.getElementById("btn3").innerText = t.btn3;
    document.getElementById("btnWheel").innerText = t.wheelBtn;
    document.getElementById("btnPortfolio").innerText = t.portfolioBtn;
    document.getElementById("btnPayment").innerText = t.paymentBtn;

    document.getElementById("paymentTitle").innerText = t.paymentTitle;
    document.getElementById("paymentText").innerText = t.paymentText;
    document.getElementById("btnStars").innerText = t.starsBtn;
    document.getElementById("btnCrypto").innerText = t.cryptoBtn;

    const backBtns = document.querySelectorAll(".back-btn");
    backBtns.forEach(b => b.innerText = t.backBtn);

    const contactBtns = document.querySelectorAll(".contact-btn");
    contactBtns.forEach(b => b.innerText = t.contactBtn);
}

// Обробка кнопок вибору мови
document.getElementById("btnUA").onclick = () => { selectedLang="ua"; localStorage.setItem("lang","ua"); hideAllSections(); menuSection.style.display="block"; applyLang(); };
document.getElementById("btnRU").onclick = () => { selectedLang="ru"; localStorage.setItem("lang","ru"); hideAllSections(); menuSection.style.display="block"; applyLang(); };
document.getElementById("btnEN").onclick = () => { selectedLang="en"; localStorage.setItem("lang","en"); hideAllSections(); menuSection.style.display="block"; applyLang(); };

// Якщо мова вже обрана, показуємо меню
if(selectedLang) {
    hideAllSections();
    menuSection.style.display = "block";
    applyLang();
}

// --------------------------
// МЕНЮ КНОПКИ
// --------------------------
document.getElementById("btn1").onclick = () => alert("🔥 РЕЖИ");
document.getElementById("btn2").onclick = () => alert("⚙️ Тут налаштування");
document.getElementById("btn3").onclick = () => alert("ℹ️ Туо ап");

document.getElementById("btnPortfolio").onclick = () => {
    window.open("https://t.me/vintrxxproject/15", "_blank");
};

function contactMe() {
    tg.openTelegramLink("https://t.me/v1ntrxx");
}
window.contactMe = contactMe;

// --------------------------
// ОПЛАТА
// --------------------------
document.getElementById("btnPayment").onclick = () => {
    hideAllSections();
    if(paymentSection) paymentSection.style.display = "block";
}

// ⭐ Оплата зірками — одразу на канал
document.getElementById("btnStars").onclick = () => {
    window.open("https://t.me/+6JmPwNPvDVk2NzBi", "_blank");
}

// 💎 Оплата криптовалютою TON / USDT TON — одразу на профіль
document.getElementById("btnCrypto").onclick = () => {
    tg.openTelegramLink("https://t.me/v1ntrxx");
}

// --------------------------
// КОЛЕСО ФОРТУНИ
// --------------------------
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const resultDiv = document.getElementById("result");
const spinButton = document.getElementById("spinButton");

const segments = ["10 ⭐️","50 ⭐️","100 ⭐️","200 ⭐️","500 ⭐️","1000 ⭐️"];
const colors = ["#FF5733","#33FF57","#3357FF","#FF33A6","#FF8F33","#33FFF3"];
const arc = 2 * Math.PI / segments.length;
let angle = 0;
let spinning = false;

function drawWheel() {
    for (let i = 0; i < segments.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = colors[i];
        ctx.moveTo(200,200);
        ctx.arc(200,200,200, i*arc, (i+1)*arc);
        ctx.fill();

        ctx.save();
        ctx.translate(200,200);
        ctx.rotate(i*arc + arc/2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "bold 18px Arial";
        ctx.fillText(segments[i], 190, 10);
        ctx.restore();
    }
}

function spin() {
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
        ctx.clearRect(0,0,400,400);

        ctx.save();
        ctx.translate(200,200);
        ctx.rotate(angle);
        ctx.translate(-200,-200);
        drawWheel();
        ctx.restore();

        if (progress < duration) {
            requestAnimationFrame(animate);
        } else {
            spinning = false;
            const index = Math.floor((segments.length - (angle % (2*Math.PI)) / arc) % segments.length);
            resultDiv.innerText = `🎉 Ви виграли: ${segments[index]}`;
        }
    }

    requestAnimationFrame(animate);
}

document.getElementById("btnWheel").onclick = () => {
    hideAllSections();
    wheelContainer.style.display = "block";
    drawWheel();
};

spinButton.onclick = spin;

// --------------------------
// Функція відкриття меню
// --------------------------
function openMenu() {
    hideAllSections();
    menuSection.style.display = "block";
}
window.openMenu = openMenu;


