const tg = window.Telegram.WebApp;
tg.expand();

// --------------------------
// СЕКЦІЇ
// --------------------------
const menuSection = document.getElementById("menuSection");
const wheelContainer = document.getElementById("wheelContainer");
const portfolioSection = document.getElementById("portfolioSection");

function hideAllSections() {
    menuSection.style.display = "none";
    wheelContainer.style.display = "none";
    portfolioSection.style.display = "none";
}

function openMenu() {
    hideAllSections();
    menuSection.style.display = "block";
}
window.openMenu = openMenu;

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
// КОЛЕСО ФОРТУНИ
// --------------------------
const wheelBtn = document.getElementById("btnWheel");
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const resultDiv = document.getElementById("result");

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

wheelBtn.onclick = () => {
    hideAllSections();
    wheelContainer.style.display = "block";
    drawWheel();

    if (!document.getElementById("spinButton")) {
        const spinBtn = document.createElement("button");
        spinBtn.id = "spinButton";
        spinBtn.innerText = "Крутити 🎡";
        spinBtn.style.marginTop = "15px";
        spinBtn.style.background = "linear-gradient(135deg, #6a11cb, #2575fc)";
        spinBtn.style.color = "#fff";
        spinBtn.style.borderRadius = "18px";
        spinBtn.style.padding = "12px";
        spinBtn.style.fontWeight = "bold";
        spinBtn.style.cursor = "pointer";
        spinBtn.style.transition = "all 0.3s ease";
        spinBtn.onmouseover = () => spinBtn.style.transform = "translateY(-2px) scale(1.02)";
        spinBtn.onmouseout = () => spinBtn.style.transform = "translateY(0)";
        wheelContainer.appendChild(spinBtn);
        spinBtn.onclick = spin;
    }
};











