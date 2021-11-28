const fs = require('fs')
const { Telegraf, Context} = require('telegraf')
const Markup = require('telegraf/markup')
const {ArduinoSettings} = require('./arduinoSettings.js')
require('dotenv').config()

const settings = new ArduinoSettings('settings.json')
const bot = new Telegraf(process.env.PROJ_KEY)

bot.start((ctx) =>{
    settings.preview(ctx, settings.menu(0))
})

bot.action('1', (ctx) =>{
    settings.preview(ctx, settings.switch('1',ctx))
})
bot.action('2', (ctx) =>{
    settings.preview(ctx, settings.switch('2',ctx))
})
bot.action('3', (ctx) =>{
    settings.preview(ctx, settings.switch('3',ctx))
})
bot.action('4', (ctx) =>{
    settings.preview(ctx, settings.switch('4', ctx))
})
bot.action('0', (ctx) =>{
    settings.preview(ctx, settings.switch('0',ctx))
})
bot.action('add', (ctx) =>{
    settings.setAddB(true)
})
bot.action('delete', (ctx) =>{
    settings.setDelB(true)
})

bot.use((ctx) => {
    if(settings.getAddB()){
        settings.setAddB(false)
        var strq = ctx.message.text.split(' ');
        settings.add(strq[0], strq[1], strq[2])
        ctx.deleteMessage()
    }
    else if(settings.getDelB()){
        settings.setDelB(false)
        var strq = ctx.message.text.split(' ');
        settings.delete(strq[0], strq[1])
        ctx.deleteMessage()
    }
})

console.log('started');

bot.launch()