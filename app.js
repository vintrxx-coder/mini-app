const tg = window.Telegram.WebApp;

// Розгортаємо на весь екран
tg.expand();

// --------------------------
// СТАРІ КНОПКИ МЕНЮ
// --------------------------
document.getElementById("btn1").onclick = () => {
    alert("🔥 РЕЖИ");
};

document.getElementById("btn2").onclick = () => {
    alert("⚙️ Тут налаштування");
};

document.getElementById("btn3").onclick = () => {
    alert("ℹ️ Туо ап");
};

// --------------------------
// КОЛЕСО ФОРТУНИ
// --------------------------
const wheelBtn = document.getElementById("btnWheel");
const wheelContainer = document.getElementById("wheelContainer");
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext('2d');
const resultDiv = document.getElementById("result");

const segments = ["10 ⭐","50 ⭐","100 ⭐","200 ⭐","500 ⭐","1000 ⭐"];
const colors = ["#FF5733","#33FF57","#3357FF","#FF33A6","#FF8F33","#33FFF3"];
const size = segments.length;
const arc = 2 * Math.PI / size;
let angle = 0;
let spinning = false;

// Малюємо колесо
function drawWheel() {
    for (let i = 0; i < size; i++) {
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

// Функція обертання колеса
function spin() {
    if(spinning) return;
    spinning = true;
    const spinAngle = Math.random() * 10 + 10;
    const duration = 3000;
    let start = null;

    function animate(timestamp) {
        if(!start) start = timestamp;
        const progress = timestamp - start;
        const ease = 1 - Math.pow(1 - progress/duration, 3);
        angle += spinAngle * ease / 60;
        ctx.clearRect(0,0,400,400);
        ctx.save();
        ctx.translate(200,200);
        ctx.rotate(angle);
        ctx.translate(-200,-200);
        drawWheel();
        ctx.restore();

        if(progress < duration) {
            requestAnimationFrame(animate);
        } else {
            spinning = false;
            const winnerIndex = Math.floor((size - (angle % (2*Math.PI))/arc) % size);
            resultDiv.innerText = `Вітаємо! Ви виграли: ${segments[winnerIndex]}`;
        }
    }

    requestAnimationFrame(animate);
}

// Показуємо колесо і додаємо кнопку "Крутити"
wheelBtn.onclick = () => {
    wheelContainer.style.display = "block";
    drawWheel();

    if(!document.getElementById("spinButton")) {
        const spinBtn = document.createElement("button");
        spinBtn.id = "spinButton";
        spinBtn.innerText = "Крутити 🎡";
        wheelContainer.appendChild(spinBtn);

        spinBtn.addEventListener('click', spin);
    }
};








