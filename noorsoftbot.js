const { Telegraf } = require('telegraf');
const { led } = require('./led.js');
const { TL_KEY } = process.env;
const fs = require('fs');

const bot = new Telegraf(PROJ_KEY)

bot.start( ctx => ctx.reply(`
`))

bot.hears('login', async (ctx) => {
        ctx.reply('password, pls')
        bot.hears('1234', async (ctx) => {
                ctx.reply('OK!')
        })
})


console.log('started');

bot.hears('ping', async (ctx) => {
        led.blinkLED()
})

bot.launch()
