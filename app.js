const tg = window.Telegram.WebApp;

// Розгортаємо на весь екран
tg.expand();

// Старі кнопки
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
// НОВА КНОПКА: Колесо Фортуни
// --------------------------

// Створюємо кнопку для запуску гри
const spinBtn = document.createElement("button");
spinBtn.innerText = "🎰 Колесо Фортуни";
spinBtn.style.marginTop = "10px";
spinBtn.style.padding = "10px 20px";
spinBtn.style.fontSize = "16px";
document.body.appendChild(spinBtn);

// Контейнер для результату
const resultDiv = document.createElement("div");
resultDiv.style.marginTop = "20px";
resultDiv.style.fontSize = "18px";
resultDiv.style.fontWeight = "bold";
document.body.appendChild(resultDiv);

// Колесо
const canvas = document.createElement("canvas");
canvas.id = "wheel";
canvas.width = 400;
canvas.height = 400;
canvas.style.display = "block";
canvas.style.margin = "20px auto";
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
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

// Функція крутіння
function spin() {
    if(spinning) return;
    spinning = true;
    let spinAngle = Math.random() * 10 + 10; // випадковий кут
    let duration = 3000; // тривалість анімації
    let start = null;

    function animate(timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;
        let ease = 1 - Math.pow(1 - progress/duration, 3);
        angle += spinAngle * ease / 60;
        ctx.clearRect(0,0,400,400);
        ctx.save();
        ctx.translate(200,200);
        ctx.rotate(angle);
        ctx.translate(-200,-200);
        drawWheel();
        ctx.restore();
        if(progress < duration){
            requestAnimationFrame(animate);
        } else {
            spinning = false;
            const winnerIndex = Math.floor((size - (angle % (2*Math.PI))/arc) % size);
            resultDiv.innerText = `Вітаємо! Ви виграли: ${segments[winnerIndex]}`;
        }
    }

    requestAnimationFrame(animate);
}

drawWheel();
spinBtn.addEventListener('click', spin);






