const { Telegraf } = require('telegraf');
//const { led } = require('./led.js');
const fs = require('fs');

const bot = new Telegraf(process.env.PROJ_KEY.toString())

bot.command('/login', async (ctx) => {
        if(ctx.message.text.substr(7) === '1') { 
                ctx.reply('OK!')
                fs.appendFile('test.txt', "\n"+ctx.message.chat.id,function (err) {
                        if(err) throw err; 
               })
               } else {
                       ctx.reply('Failed')  
               }
})

bot.command('/ping', async (ctx) => {
         fs.readFile('test.txt', function (err, data) {
         if (err) throw err;
         if(data.includes(ctx.message.chat.id.toString())){
                 ctx.reply('pong')
         }
         })})


console.log('started');



bot.launch()
  
