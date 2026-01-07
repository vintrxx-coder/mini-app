const tg = window.Telegram.WebApp;
tg.expand();

/* =====================
   ВАЛЮТА І FREE SPIN
===================== */
let balance = parseInt(localStorage.getItem("virus_balance")) || 0;
let freeSpinUsed = localStorage.getItem("free_spin_used") === "1";

const balanceEl = document.getElementById("balance");

function updateBalance() {
    if(balanceEl) balanceEl.innerText = `🧬 Баланс: ${balance}`;
}
updateBalance();

/* =====================
   ВИБІР МОВИ
===================== */
["btnUA","btnRU","btnEN"].forEach(id=>{
    document.getElementById(id).onclick = () => {
        hideAllSections();
        openMenu();
    }
});

/* =====================
   МЕНЮ КНОПКИ
===================== */
document.getElementById("btn1").onclick = () => alert("🔥 РЕЖИ");
document.getElementById("btn2").onclick = () => alert("⚙️ Тут налаштування");
document.getElementById("btn3").onclick = () => alert("ℹ️ Туо ап");
document.getElementById("btnPortfolio").onclick = () => window.open("https://t.me/vintrxxproject/15", "_blank");

function contactMe() { tg.openTelegramLink("https://t.me/v1ntrxx"); }
window.contactMe = contactMe;

/* =====================
   КОПІЮВАННЯ КРИПТО
===================== */
function copyToClipboard(id){
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text)
    .then(()=>alert("✔ Адресу скопійовано!"))
    .catch(()=>alert("❌ Не вдалося скопіювати"));
}
window.copyToClipboard = copyToClipboard;

/* =====================
   ОПЛАТА
===================== */
document.getElementById("btnPayment").onclick = () => {
    hideAllSections();
    document.getElementById("paymentSection").style.display="block";
}

// ⭐️ Оплата зірками
document.getElementById("btnStars")?.addEventListener("click",()=>{
    window.open("https://t.me/starspaymenttt","_blank");
});

// 💎 Оплата крипто
document.getElementById("btnCrypto")?.addEventListener("click",()=>document.getElementById("paymentSection").style.display="block");

/* =====================
   КОЛЕСО ФОРТУНИ
===================== */
const canvas = document.getElementById("wheel");
const ctx = canvas?.getContext("2d");
const resultDiv = document.getElementById("result");
const spinButton = document.getElementById("spinButton");

const segments = [10, 50, 100, 200, 500, 1000];
const colors = ["#FF00FF","#00FFFF","#FF0","#0F0","#F0F","#0FF"];
const arc = 2*Math.PI/segments.length;
let angle=0, spinning=false;

function drawWheel(){
    if(!ctx) return;
    for(let i=0;i<segments.length;i++){
        ctx.beginPath();
        ctx.fillStyle=colors[i];
        ctx.moveTo(200,200);
        ctx.arc(200,200,200,i*arc,(i+1)*arc);
        ctx.fill();
        ctx.save();
        ctx.translate(200,200);
        ctx.rotate(i*arc+arc/2);
        ctx.textAlign="right";
        ctx.fillStyle="#0ff";
        ctx.font="bold 18px Arial";
        ctx.fillText(`${segments[i]} 🧬`,190,10);
        ctx.restore();
    }
}

function spin(){
    if(spinning) return;

    if(freeSpinUsed){
        alert("❌ Безкоштовний прокрут вже використаний");
        return;
    }

    spinning=true;
    freeSpinUsed=true;
    localStorage.setItem("free_spin_used","1");

    const spinAngle = Math.random()*10+10;
    const duration = 3000;
    let start = null;

    function animate(time){
        if(!start) start=time;
        const progress = time-start;
        const ease = 1-Math.pow(1-progress/duration,3);
        angle+=spinAngle*ease/60;

        ctx.clearRect(0,0,400,400);
        ctx.save();
        ctx.translate(200,200);
        ctx.rotate(angle);
        ctx.translate(-200,-200);
        drawWheel();
        ctx.restore();

        if(progress<duration) requestAnimationFrame(animate);
        else {
            spinning=false;
            const index = Math.floor((segments.length-(angle%(2*Math.PI))/arc)%segments.length);
            balance += segments[index];
            localStorage.setItem("virus_balance", balance);
            updateBalance();
            resultDiv.innerText = `🎉 Ви виграли: ${segments[index]} 🧬`;
        }
    }
    requestAnimationFrame(animate);
}

document.getElementById("btnWheel").onclick=()=>{
    hideAllSections();
    document.getElementById("wheelContainer").style.display="block";
    drawWheel();
};
spinButton?.addEventListener("click",spin);

/* =====================
   МАГАЗИН
===================== */
document.getElementById("btnShop")?.addEventListener("click",()=>{
    hideAllSections();
    document.getElementById("shopSection").style.display="block";
    updateBalance();
});

function buyItem(price){
    if(balance<price){
        alert("❌ Недостатньо 🧬");
        return;
    }
    balance-=price;
    localStorage.setItem("virus_balance", balance);
    updateBalance();
    alert("✅ Куплено!");
}
window.buyItem = buyItem;

/* =====================
   Меню та секції
===================== */
function openMenu(){
    hideAllSections();
    document.getElementById("menuSection").style.display="block";
}
window.openMenu = openMenu;

function hideAllSections(){
    document.querySelectorAll(".section").forEach(sec=>sec.style.display="none");
}
