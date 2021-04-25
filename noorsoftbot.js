const logining = require('./logging.js').logining
const { PROJ_KEY, PASS } = process.env;
const { Telegraf } = require('telegraf')

const bot = new Telegraf(PROJ_KEY.toString())
const logi = new logining(PASS.toString())
const PiCamera = require('pi-camera');
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
    ctx.reply(logi.isLogin(ctx))
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


console.log('started');



bot.launch()

