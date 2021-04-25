const { Telegraf } = require('telegraf');
//const { led } = require('./led.js');
const fs = require('fs');
const {logining,login} = require('./logging.js')
const {PROJ_KEY} = process.env;

const bot = new Telegraf(PROJ_KEY.toString())

bot.command('/login', async (ctx) => {
        var logi = new logining(ctx.message.text, '1', ctx.message.chat.id.toString())
        ctx.reply(login(ctx.message.chat.id.toString(), '1', ctx.message.text))
})

bot.command('/ping', async (ctx) => {
        var logi = new logining(ctx.message.text, '1', ctx.message.chat.id.toString())
        if(logi.isLogin()){
                reply("pong!")
        }
})


console.log('started');



bot.launch()
  
