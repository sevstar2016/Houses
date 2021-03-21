const { Telegraf } = require('telegraf');
const { led } = require('./led.js');

const bot = new Telegraf('1615771001:AAF522v6iLHQBChZdvx-kTJ9mmxg6aubor4')

bot.start( ctx => ctx.reply(`
`))

console.log('started');

bot.hears('ping', async (ctx) => {
        led.blinkLED()
})

bot.launch()