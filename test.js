﻿const fs = require('fs')
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
    settings.preview(ctx, settings.switch('1'))
})
bot.action('2', (ctx) =>{
    settings.preview(ctx, settings.switch('2'))
})
bot.action('3', (ctx) =>{
    settings.preview(ctx, settings.switch('3'))
})
bot.action('0', (ctx) =>{
    settings.preview(ctx, settings.switch('0'))
})

console.log('started');

bot.launch()