const { logining } = require('./logging.js')
const { Telegraf, Context} = require('telegraf')
const Markup = require('telegraf/markup')
//const { Arduino } = require('./arduinoLink.js')

require('dotenv').config()

const bot = new Telegraf(process.env.PROJ_KEY.toString())
const logi = new logining(process.env.PASS.toString())
//const arduino = new Arduino('COM7', '\n')

//menu
const mainMenu = Markup.inlineKeyboard([
    Markup.callbackButton('Реле ⚡️', 'rel'),
    Markup.callbackButton('Вода', 'water')
], {columns: 2}).extra()
let relMenu = Markup.inlineKeyboard([
    Markup.callbackButton('✅ Реле 1', 'lamp'),
    Markup.callbackButton('✅ Реле 2', 'rel2'),
    Markup.callbackButton('Назад', 'back')
], {columns: 3}).extra()

bot.action('rel', async ctx =>{
    ctx.deleteMessage()
    /*arduino.getPinValue('5', (value) => {
        if(value == '0'){
            relMenu = Markup.inlineKeyboard([
                Markup.callbackButton('❎ Реле 1', 'lamp'),
                Markup.callbackButton('❎ Реле 2', 'rel2'),
                Markup.callbackButton('Назад', 'back')
            ], {columns: 3}).extra
        }
        else{
            relMenu = Markup.inlineKeyboard([
                Markup.callbackButton('✅ Реле 1', 'lamp'),
                Markup.callbackButton('✅ Реле 2', 'rel2'),
                Markup.callbackButton('Назад', 'back')
            ], {columns: 3}).extra()
        }
    })*/
    ctx.reply('Реле ⚡️', relMenu)
})


bot.action('back', (ctx) => {
    ctx.deleteMessage()
    ctx.reply('Hello', mainMenu)
})


bot.command('/login', async (ctx) => {
    logi.login(ctx)
    if(logi.isLogin(ctx)){
        ctx.reply('Hello', mainMenu)
    }
})

bot.hears('ping', async (ctx) => {
    if(logi.isLogin(ctx)){
        ctx.reply('Hello', mainMenu)
    }
})

bot.hears('water', async (ctx) => {
    if(logi.isLogin(ctx)){
        /*arduino.getSensorValue('0', (value)=>{
            ctx.reply(value)
            return
        })*/
    }
})

bot.action('lamp', ctx => {
    //arduino.sendToPin('2')
})


console.log('started');



bot.launch()

