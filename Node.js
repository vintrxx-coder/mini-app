const { Telegraf } = require('telegraf');
const bot = new Telegraf('YOUR_BOT_TOKEN'); // встав свій токен

// Обробка даних від WebApp
bot.on('message', async (ctx) => {
    if(ctx.message?.web_app_data) {
        try {
            const data = JSON.parse(ctx.message.web_app_data.data);
            if(data.type === "stars_payment") {
                const stars = data.amount;
                await ctx.replyWithInvoice({
                    title: "Моя послуга",
                    description: `Оплата ${stars} ⭐`,
                    payload: `stars_${stars}_${Date.now()}`,
                    provider_token: "", // для XTR порожньо
                    currency: "XTR",
                    prices: [{ label: "Послуга", amount: stars*100 }] // Telegram: 1⭐ = 100
                });
            }
        } catch(e) {
            console.error(e);
        }
    }
});

// Після успішної оплати
bot.on('successful_payment', (ctx) => {
    ctx.reply(`Дякую за оплату! 🎉 Ти заплатив ${ctx.message.successful_payment.total_amount / 100} ⭐`);
});

bot.launch();
console.log("Bot запущено!");
