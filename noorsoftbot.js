const { Telegraf } = require('telegraf');
//const { led } = require('./led.js');
const fs = require('fs');
const logining = require('./logging.js').logining
const {PROJ_KEY} = process.env;

const bot = new Telegraf(PROJ_KEY.toString())

bot.command('/login', async (ctx) => {
        var logi = new logining(ctx, '1')
        logi.login()
})

bot.command('/ping', async (ctx) => {
        var logi = new logining(ctx, '1')
        logi.isLogin(() => {
                ctx.reply('pong')
        })
})


console.log('started');



bot.launch()
  
