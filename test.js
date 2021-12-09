const fs = require('fs')
const { Telegraf, Context} = require('telegraf')
const Markup = require('telegraf/markup')
const {ArduinoSettings} = require('./arduinoSettings.js')
require('dotenv').config()

const settings = new ArduinoSettings('settings.json')
const bot = new Telegraf(process.env.PROJ_KEY)
let editp = false


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
        var strq = ctx.message.text.split(' ');
        settings.add(strq[0], strq[1], strq[2])
        ctx.deleteMessage()
    }
    else if(settings.delb){
        settings.delb = false
        var strq = ctx.message.text.split(' ');
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