const { logining } = require('./logging.js')
const { Telegraf } = require('telegraf')
const { Keyboard } = require('telegram-keyboard')
const { Arduino } = require('./arduinoLink.js')

require('dotenv').config()

const bot = new Telegraf(process.env.PROJ_KEY.toString())
const logi = new logining(process.env.PASS.toString())
const PiCamera = require('pi-camera');
const arduino = new Arduino('/dev/ttyUSB0', '\n')


bot.hears('help', async ({ reply }) => {
    const keyboard = Keyboard.make(['help', 'ping', 'water'], {pattern: [1,2]})
    reply('ping')
    await reply('water', keyboard.reply())
    console.log(keyboard)
})

bot.command('/login', async (ctx) => {
    logi.login(ctx)
})

bot.hears('ping', async (ctx) => {
    if(logi.isLogin(ctx)){
        ctx.reply('pong!')
    }
})

bot.hears('water', async (ctx) => {
    if(logi.isLogin(ctx)){
        arduino.getSensorValue('0', (value)=>{
            ctx.reply(value)
            return
        })
    }
})

console.log('started');



bot.launch()

