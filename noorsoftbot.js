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

bot.action('ping', async (ctx) => {
    if(logi.isLogin(ctx)){
        ctx.reply('pong!')
    }
})

bot.action('water', async (ctx) => {
    if(logi.isLogin(ctx)){
        arduino1.getSensorValue('0', (value)=>{
            ctx.reply(value)
            return
        })
    }
})

console.log('started');



bot.launch()

