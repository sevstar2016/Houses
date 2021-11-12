const fs = require('fs');
const { Telegraf, Context} = require('telegraf')
const Markup = require('telegraf/markup')
const {sa} = require("yarn/lib/cli");
const { Arduino } = require('./arduinoLink.js')
require('dotenv').config()

const arduino = new Arduino(process.env.AADR)

let mm = Array()
let rm = Array()
let tm = Array()
let sm = Array()

let mainmenu
let relmenu
let termmenu
let servmenu

let mus = [mainmenu, relmenu, termmenu, servmenu]

class ArduinoSettings{
    constructor(settingsPath) {
        this.settingsPath = settingsPath
        this.json = JSON.parse(fs.readFileSync(this.settingsPath).toString().trim())
        
        this.update()
    }
    
    preview(ctx, menu){
        ctx.deleteMessage()
        ctx.reply('.', menu)
    }
    
    add(obj, name, id){
        this.json[obj].forEach((ob, index, array) => {
            if(ob['id'] === id){
                ob['name'] = name
            }else{
                this.json[obj].push({"id": id, "name": name})
            }
        })
        this.save()
        this.update()
    }
    
    save(){
        fs.writeFileSync(this.settingsPath, JSON.stringify(this.json))
    }
    
    update(){

        new Promise((resolve, reject) => {
            this.json = JSON.parse(fs.readFileSync(this.settingsPath).toString().trim())
            
            mm = Array()
            rm = Array()
            tm = Array()
            sm = Array()
            
            if(this.json['rels'].length){
                mm.push(Markup.callbackButton('Реле ⚡', '1'))

                this.json['rels'].forEach(function(rel, index, array){
                    rm.push(Markup.callbackButton(rel['name'], 'rel*'+rel['id']))
                })
                
                rm.push(Markup.callbackButton('Гл. меню', '0'))
            }
            if(this.json['terms'].length){
                mm.push(Markup.callbackButton('Температура 🌡️️', '2'))

                this.json['terms'].forEach((term, index, array) =>{
                    tm.push(Markup.callbackButton(term['name'], 'term*'+term['id']))
                })
                
                tm.push(Markup.callbackButton('Гл. меню', '0'))
            }
            if(this.json['servs'].length){
                mm.push(Markup.callbackButton('Серваки', '3'))

                this.json['servs'].forEach((serv, index, array) => {
                    sm.push(Markup.callbackButton(serv['name'], 'serv*'+serv['id']))
                })
                
                sm.push(Markup.callbackButton('Гл. меню', '0'))
            }
            resolve()
        }).then(() => {
            console.log('mr: ' + rm)
            mainmenu = Markup.inlineKeyboard(mm).extra()
            relmenu = Markup.inlineKeyboard(rm).extra()
            termmenu = Markup.inlineKeyboard(tm).extra()
            servmenu = Markup.inlineKeyboard(sm).extra()
            mus = [ mainmenu, relmenu, termmenu, servmenu]
        })
    }
    
    switch(typeid, ctx){
        console.log(typeid.indexOf('*'))
        if(typeid.indexOf('*') !== -1){
            let type = typeid.split('*')[0]
            let id = typeid.split('*')[1]
            
            console.log('*')
            
            if(type === 'rel'){
                arduino.sendToPin(id)
            }
            else if(type === 'term'){
                ctx.deleteMessage()
                ctx.reply('🌡️️: ' + arduino.getPinValue(id).toString)
                this.preview(ctx, mus[2])
            }
            else if(type === 'serv'){
                arduino.sendMessageFromAdress(id, '90')
            }
        }else{
            console.log('qq: ' + parseInt(typeid))
            return this.menu(parseInt(typeid))
        }
    }

    menu(id) {
        return mus[id]
    }
}

module.exports = {
    ArduinoSettings
}