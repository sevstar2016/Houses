const { logining } = require('./logging.js')
const { PROJ_KEY, PASS } = process.env;
const { Telegraf } = require('telegraf')
const { arduino } = require('./arduinoLink.js')

const bot = new Telegraf(PROJ_KEY.toString())
const logi = new logining(PASS.toString())
const PiCamera = require('pi-camera');
const arduino1 = new arduino('COM8', '\n')
const myCamera = new PiCamera({
    mode: 'photo',
    output: `${__dirname}/test.jpg`,
    width: 640,
    height: 480,
    nopreview: true,
});

bot.command('/login', async (ctx) => {
    logi.login(ctx)
})

bot.command('/ping', async (ctx) => {
    arduino1.getSensorValue('enc', (val) => {
        ctx.reply(val);
    })
})

arduino1.getParser().on('data', data => {
    console.log(data)
})

bot.command('/shot', async (ctx) => {
    myCamera.snap()
        .then((result) => {
            ctx.replyWithPhoto(result)
        })
        .catch((error) => {
            console.log(error)
        });
})

bot.command('/water', async (ctx) => {
    arduino1.getSensorValue('0', (value)=>{
        ctx.reply(value)
        return
    })
})

console.log('started');



bot.launch()

