const fs = require('fs')
const { Telegraf, Context} = require('telegraf')
const Markup = require('telegraf/markup')
const {ArduinoSettings} = require('./arduinoSettings.js')
const rasp = new require('./rasp.js').rasp()
const NodeWebcam = require( "node-webcam" )
const { logining } = require('./logging.js')
require('dotenv').config()

const settings = new ArduinoSettings('settings.json')
const logi = new logining(process.env.PASS.toString())
const bot = new Telegraf(process.env.PROJ_KEY)
const opts = {

    //Picture related

    width: 1280,

    height: 720,

    quality: 100,

    // Number of frames to capture
    // More the frames, longer it takes to capture
    // Use higher framerate for quality. Ex: 60

    frames: 60,


    //Delay in seconds to take shot
    //if the platform supports miliseconds
    //use a float (0.1)
    //Currently only on windows

    delay: 0,


    //Save shots in memory

    saveShots: true,


    // [jpeg, png] support varies
    // Webcam.OutputTypes

    output: "jpeg",


    //Which camera to use
    //Use Webcam.list() for results
    //false for default device

    device: false,


    // [location, buffer, base64]
    // Webcam.CallbackReturnTypes

    callbackReturn: "location",


    //Logging

    verbose: false

}

const Webcam = NodeWebcam.create( opts )

let strq = ''

bot.start((ctx) =>{
    ctx.reply('Главное меню: ', settings.mus[0])
})

bot.on('callback_query', (ctx) => {
    console.log(ctx.callbackQuery.data)
    
    if(logi.isLogin(ctx)) {
        let str = ctx.callbackQuery.data.split('*')

        switch (str[0]) {
            case 'cam':
                let pp = new Promise((resolve, reject) =>{
                        Webcam.capture("test_picture", function (err, data) {
                            resolve(data)
                            ctx.deleteMessage()
                            ctx.deleteMessage()
                            ctx.replyWithPhoto({source: data})
                    })
                }).then((value)=>{
                    ctx.reply('Главное меню:', settings.mus[0])
                })
                break
            case '4':
                settings.preview(ctx, 4)
                break
            case '0':
                settings.preview(ctx, 0)
                break
            case 'add':
                ctx.reply('Введи тип устройства (rel - реле, term - датчик температуры, serv - сервопривод), далее введи название и пин к которому подключено устройство')
                ctx.reply('Всё через пробел')
                bot.use(ctx => {
                    strq = ctx.message.text.split(' ')
                    settings.add(strq[0], strq[1], strq[2])
                    settings.update()
                    ctx.deleteMessage()
                    settings.preview(ctx, 0)
                })
                break
            case 'delete':
                ctx.reply('Введи тип устройства (rel - реле, term - датчик температуры, serv - сервопривод), далее введи пин')
                ctx.reply('Всё через пробел')
                bot.use(ctx => {
                    strq = ctx.message.text.split(' ')
                    settings.delete(strq[0], strq[1])
                    ctx.deleteMessage()
                    settings.preview(ctx, 0)
                })
                break
            case 'edit':
                settings.preview(ctx, 6)
                break
            case 'editp':
                ctx.reply('Введите новый пароль')

                bot.use((ctx) => {
                    fs.readFile('.env', 'utf-8', function (err, data) {
                        let d = data.toString().split('\n')
                        let pass = ctx.message.text.toString()
                        d[2] = 'PASS=' + pass
                        logi.pass = pass
                        let nd = d.join('\n')
                        fs.writeFileSync('.env', nd, 'utf-8')
                    });
                    settings.preview(ctx, 0)
                })
                break
            case 'relm':
                settings.preview(ctx, 1)
                break
            case 'termm':
                settings.preview(ctx, 2)
                break
            case 'servm':
                settings.preview(ctx, 3)
                break

            case 'rel':
                ctx.reply('Вкл')
                rasp.sendToPin(str[1])
                break
            case 'term':
                rasp.getSensorValue(str[1], (value) => {
                    ctx.reply(value)
                })
                break
            case 'serv':
                bot.use(cxt => {
                    rasp.sendMessageFromAdress(str[1], ctx.message.text)
                    ctx.reply('Отправлено')
                })
        }
    }
    else {
        ctx.reply('Войдите с помощью комманды /login {PASSWORD}')
        bot.command('/login', async (ctx) => {
            logi.login(ctx)
            if(logi.isLogin(ctx)){
                settings.preview(ctx, 0)
            }
        })
    }
})

console.log('started');

bot.launch()