const { Telegraf } = require('telegraf');
var LED = require('./led.js');

const bot = new Telegraf('1615771001:AAF522v6iLHQBChZdvx-kTJ9mmxg6aubor4')

bot.start( ctx => ctx.reply(`
`))

bot.hears('ping', async (ctx) => {
        led.blinkLED(4)
})

bot.launch()