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
        paymentTitle: "💰 Оплата",
        paymentText: "Оберіть спосіб оплати:",
        starsBtn: "⭐ Оплата зірками",
        cryptoBtn: "💎 Оплата криптовалютою",
    },
    ru: {
        menuTitle: "🚀 Главное меню",
        paymentTitle: "💰 Оплата",
        paymentText: "Выберите способ оплаты:",
        starsBtn: "⭐ Оплата звёздами",
        cryptoBtn: "💎 Оплата криптовалютой",
    },
    en: {
        menuTitle: "🚀 Main Menu",
        paymentTitle: "💰 Payment",
        paymentText: "Choose payment method:",
        starsBtn: "⭐ Pay with Stars",
        cryptoBtn: "💎 Pay with Crypto",
    }
};

function applyLang() {
    if(!selectedLang) return;
    document.getElementById("menuTitle").innerText = texts[selectedLang].menuTitle;
    document.getElementById("paymentTitle").innerText = texts[selectedLang].paymentTitle;
    document.getElementById("paymentText").innerText = texts[selectedLang].paymentText;
    document.getElementById("btnStars").innerText = texts[selectedLang].starsBtn;
    document.getElementById("btnCrypto").innerText = texts[selectedLang].cryptoBtn;
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

// --------------------------
// ПОРТФОЛІО
// --------------------------
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

// ⭐ Оплата зірками
document.getElementById("btnStars").onclick = () => {
    const amount = prompt("Введіть кількість зірок для оплати (наприклад, 5, 10, 20):");
    if(!amount || isNaN(amount) || amount <= 0) return alert("Некоректна сума!");
    tg.sendData(JSON.stringify({ type: "stars_payment", amount: parseInt(amount) }));
    window.open("https://t.me/+6JmPwNPvDVk2NzBi", "_blank");
}

// 💎 Оплата криптовалютою TON / USDT TON
document.getElementById("btnCrypto").onclick = () => {
    const msg = `
💎 Оплата криптовалютою

TON / USDT (TON Network):
Адреса: UQBRaEiFd3KkCsaezd9_KvGZgBBxfKtvo6kfyKRwlLNgD76A

❗ Якщо у вас інша мережа — напишіть мені в особисті: t.me/v1ntrxx
    `;
    alert(msg);
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
