const { Telegraf } = require('telegraf');

const bot = new Telegraf('1615771001:AAF522v6iLHQBChZdvx-kTJ9mmxg6aubor4')

bot.start( ctx => ctx.reply(`
`))

bot.hears('ping', async (ctx) => {
        ctx.reply('pong!')
})
bot.launch()
