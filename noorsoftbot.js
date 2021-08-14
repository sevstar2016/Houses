const { logining } = require('./logging.js')
const { Telegraf } = require('telegraf')
const { arduino } = require('./arduinoLink.js')

require('dotenv').config()

const bot = new Telegraf(process.env.PROJ_KEY.toString())
const logi = new logining(process.env.PASS.toString())
const PiCamera = require('pi-camera');
const arduino1 = new arduino('/dev/ttyUSB0', '\n')

bot.command('/login', async (ctx) => {
    logi.login(ctx)
})

bot.command('/ping', async (ctx) => {
    if(logi.isLogin(ctx)){
        ctx.reply('pong!')
    }
})

bot.command('/water', async (ctx) => {
    if(logi.isLogin(ctx)){
        arduino1.getSensorValue('0', (value)=>{
            ctx.reply(value)
            return
        })
    }
})

bot.command('/exit', async (ctx) => {
    process.exit(1)
})

console.log('started');



bot.launch()

