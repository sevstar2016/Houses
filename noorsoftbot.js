const { Telegraf } = require('telegraf');
//const { led } = require('./led.js');
const fs = require('fs');
const {logining,login} = require('./logging.js')
const {PROJ_KEY} = process.env;

const PiCamera = require('pi-camera');
const myCamera = new PiCamera({
  mode: 'photo',
  output: `${ __dirname }/test.jpg`,
  width: 640,
  height: 480,
  nopreview: true,
});

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

bot.command('/shot', async (ctx) =>{
        myCamera.snap()
  .then((result) => {
          ctx.replyWithPhoto(result)
  })
  .catch((error) => {

  });
})


console.log('started');



bot.launch()
  
