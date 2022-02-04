const fs = require('fs')
const { Telegraf, Context} = require('telegraf')
const Markup = require('telegraf/markup')
const {ArduinoSettings} = require('./arduinoSettings.js')
const { Arduino } = require('./arduinoLink.js')
require('dotenv').config()

const arduino = new Arduino(process.env.AADR)

const settings = new ArduinoSettings('settings.json')
const bot = new Telegraf(process.env.PROJ_KEY)
let editp = false
const NodeWebcam = require( "node-webcam" );
const {de} = require("yarn/lib/cli");
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

const Webcam = NodeWebcam.create( opts );

let strq = ''

bot.start((ctx) =>{
    settings.preview(ctx, settings.mus[0], 0)
})

bot.on('callback_query', (ctx) => {
    console.log(ctx.callbackQuery.data)
    let str = ctx.callbackQuery.data.split('*')
    
    switch (str[0]) {
        case 'cam':
            Webcam.capture( "test_picture", function( err, data ) {} )
            ctx.replyWithPhoto({source: 'test_picture.jpg'}, settings.mus[0])
            break
        case '4':
            settings.preview(ctx, 4)
            break
        case '0':
            settings.preview(ctx, 0)
            break
        case 'add':
            bot.use(ctx=>{
                strq = ctx.message.text.split(' ')
                settings.add(strq[0], strq[1], strq[2])
                ctx.deleteMessage()
            })
            break
        case 'delete':
            bot.use(ctx=>{
                strq = ctx.message.text.split(' ')
                settings.delete(strq[0], strq[1])
                ctx.deleteMessage()
            })
            break
        case 'edit':
            settings.preview(ctx, 6)
            break
        case 'editp':
            ctx.reply('Введите новый пароль')

            bot.use((ctx) => {
                fs.readFile('.env', 'utf-8', function(err, data){
                    let d = data.toString().split('\n')
                    d[2] = 'PASS='+ctx.message.text.toString()
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
            arduino.sendToPin(str[1])
            break
        case 'term':
            arduino.getSensorValue(str[1], (value)=>{
                ctx.reply(value)
            })
            break
        case 'serv':
            bot.use(cxt=>{
                arduino.sendMessageFromAdress(str[1], ctx.message.text)
            })
    }
})

console.log('started');

bot.launch()