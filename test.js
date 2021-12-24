const fs = require('fs')
const { Telegraf, Context} = require('telegraf')
const Markup = require('telegraf/markup')
const {ArduinoSettings} = require('./arduinoSettings.js')
require('dotenv').config()

const settings = new ArduinoSettings('settings.json')
const bot = new Telegraf(process.env.PROJ_KEY)
let editp = false
const NodeWebcam = require( "node-webcam" );
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


bot.start((ctx) =>{
    settings.preview(ctx, settings.mus[0], 0)
})

bot.action('1', (ctx) =>{
    settings.preview(ctx, settings.switch('1',ctx), 1)
})
bot.action('2', (ctx) =>{
    settings.preview(ctx, settings.switch('2',ctx), 2)
})
bot.action('3', (ctx) =>{
    settings.preview(ctx, settings.switch('3',ctx), 3)
})
bot.action('4', (ctx) =>{
    settings.preview(ctx, settings.switch('4', ctx), 4)
})
bot.action('0', (ctx) =>{
    settings.preview(ctx, settings.switch('0',ctx), 0)
})
bot.action('add', (ctx) =>{
    addb = true
})
bot.action('delete', (ctx) =>{
    delb = true
})
bot.action('cam', (ctx)=>{
    Webcam.capture( "test_picture", function( err, data ) {} );
    ctx.replyWithPhoto({source: 'test_picture.jpg'}, {caption: ''})
})

bot.action('edit', (ctx) => {
    settings.preview(ctx, settings.mus[6], 6)
})
bot.action('editp', (ctx) => {
    ctx.reply('Введите новый пароль')
    editp = true
})

bot.use((ctx) => {
    if(settings.addb){
        settings.addb = false
        let strq = ctx.message.text.split(' ');
        settings.add(strq[0], strq[1], strq[2])
        ctx.deleteMessage()
    }
    else if(settings.delb){
        settings.delb = false
        let strq = ctx.message.text.split(' ');
        settings.delete(strq[0], strq[1])
        ctx.deleteMessage()
    }
    if(editp){
        editp = false
        fs.readFile('.env', 'utf-8', function(err, data){
            let d = data.toString().split('\n')
            d[2] = 'PASS='+ctx.message.text.toString()
            let nd = d.join('\n')
            fs.writeFileSync('.env', nd, 'utf-8')
        });
        settings.preview(ctx, settings.mus[0], 0)
    }
})

console.log('started');

bot.launch()