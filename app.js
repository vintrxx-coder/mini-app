const tg = window.Telegram.WebApp;

// Розгортаємо на весь екран
tg.expand();

// PROMPT для вставки шляху до фону
const bgPath = prompt("mobile.png");
if (bgPath) {
    // Встановлюємо фон
    document.body.style.backgroundImage = `url('${bgPath}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
}

// Функція для кнопок
document.getElementById("btn1").onclick = () => {
    alert("🔥 РЕЖИ");
};

document.getElementById("btn2").onclick = () => {
    alert("⚙️ Тут налаштування");
};

document.getElementById("btn3").onclick = () => {
    alert("ℹ️ Туо ап");
};



