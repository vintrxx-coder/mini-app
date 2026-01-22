const tg = window.Telegram.WebApp;
tg.expand();

const orderBtn = document.getElementById("orderBtn");

orderBtn.addEventListener("click", () => {
  tg.showPopup({
    title: "Order Design",
    message: "Payment system connects here (Telegram Pay / Crypto / Stripe)",
    buttons: [
      { type: "ok", text: "Continue" },
      { type: "cancel" }
    ]
  });
});

