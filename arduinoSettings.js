const fs = require('fs');
const { Telegraf, Context} = require('telegraf')
const Markup = require('telegraf/markup')
const {sa, mark, smirk, bread} = require("yarn/lib/cli");
const { Arduino } = require('./arduinoLink.js')
const {deleteMenuFromContext} = require("telegraf-inline-menu");
require('dotenv').config()

const arduino = new Arduino(process.env.AADR)

let mm = Array()
let rm = Array()
let tm = Array()
let sm = Array()
let settm = Array()

let addm = Array()
let editm = Array()
let delm = Array()

let mainmenu
let relmenu
let termmenu
let servmenu
let settmenu

let addmenu
let editmenu
let delmenu

let mus = [mainmenu, relmenu, termmenu, servmenu, settmenu, addmenu, editmenu, delmenu]


let addb = false
let delb = false

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
                this.save()
                this.update()
            }else if(ob['id'] !== id){
                this.json[obj].push({"id": id, "name": name})
                this.save()
                this.update()
            }
        })
    }
    
    delete(obj, id){
        this.json[obj].forEach((ob, index, array) => {
            if(ob['id'] === id) {
                delete this.json[obj]
                this.save()
                this.update()
            }
        })
    }
    
    edit(obj, name, id){
        this.json[obj].forEach((ob, index, array) => {
            if(ob['id'] === id) {
                ob['name'] = name
            }
            else if(ob['name'] === name){
                ob['id'] = id
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
            
            if(this.json['rel'].length){
                mm.push(Markup.callbackButton('Реле ⚡', '1'))

                this.json['rel'].forEach(function(rel, index, array){
                    rm.push(Markup.callbackButton(rel['name'], 'rel*'+rel['id']))
                })
                
                rm.push(Markup.callbackButton('Гл. меню', '0'))
            }
            if(this.json['term'].length){
                mm.push(Markup.callbackButton('Температура 🌡️️', '2'))

                this.json['term'].forEach((term, index, array) =>{
                    tm.push(Markup.callbackButton(term['name'], 'term*'+term['id']))
                })
                
                tm.push(Markup.callbackButton('Гл. меню', '0'))
            }
            if(this.json['serv'].length){
                mm.push(Markup.callbackButton('Серваки', '3'))

                this.json['serv'].forEach((serv, index, array) => {
                    sm.push(Markup.callbackButton(serv['name'], 'serv*'+serv['id']))
                })
                
                sm.push(Markup.callbackButton('Гл. меню', '0'))
            }
            
            mm.push(Markup.callbackButton('Настройки', '4'))
            settm.push(Markup.callbackButton('Добавить', 'add'))
            //settm.push(Markup.callbackButton('Изменить', 'edit'))
            settm.push(Markup.callbackButton('Удалить', 'delete'))
            settm.push(Markup.callbackButton('Гл. меню', '0'))
            
            
            
            resolve()
        }).then(() => {
            mainmenu = Markup.inlineKeyboard(mm).extra()
            relmenu = Markup.inlineKeyboard(rm).extra()
            termmenu = Markup.inlineKeyboard(tm).extra()
            servmenu = Markup.inlineKeyboard(sm).extra()
            settmenu = Markup.inlineKeyboard(settm).extra()
            
            addmenu = Markup.inlineKeyboard(addm).extra()
            //editmenu = Markup.inlineKeyboard(editm).extra()
            delmenu = Markup.inlineKeyboard(delm).extra()
            
            mus = [ mainmenu, relmenu, termmenu, servmenu, settmenu, addmenu, editmenu, delmenu]
        })
    }
    
    switch(typeid, ctx){
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
            return this.menu(parseInt(typeid))
        }
    }

    menu(id) {
        return mus[id]
    }
    
    setAddB(b){
        addb = b
    }
    getAddB(){
        return addb
    }
    
    setDelB(b){
        delb = b
    }
    getDelB(){
        return delb
    }
}

module.exports = {
    ArduinoSettings
}