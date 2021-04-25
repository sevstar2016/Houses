const { Telegraf } = require('telegraf');
const { led } = require('./led.js');
const {PROJ_KEY} = process.env;

const bot = new Telegraf(PROJ_KEY)

bot.start( ctx => ctx.reply(`
`))

console.log('started');

bot.hears('ping', async (ctx) => {
        led.blinkLED()
})

bot.launch()
