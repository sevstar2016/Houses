const { Telegraf } = require('telegraf');
//const { led } = require('./led.js');
const logining = require('./logging.js').logining
const {PROJ_KEY, PASS} = process.env;

const bot = new Telegraf(PROJ_KEY.toString())
const logi = new logining(PASS.toString())

bot.command('/login', async (ctx) => {
        logi.login(ctx)
})

bot.command('/ping', async (ctx) => {
        ctx.reply(logi.isLogin(ctx))
})


console.log('started');



bot.launch()
  
