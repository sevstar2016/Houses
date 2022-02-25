const fs = require('fs');
const { Telegraf, Context} = require('telegraf')
const Markup = require('telegraf/markup')
const {sa, mark, smirk, bread} = require('yarn/lib/cli');
const {deleteMenuFromContext} = require('telegraf-inline-menu')
require('dotenv').config()

let mainMenuButtons = []
let relMenuButtons = []
let termMenuButtons = []
let servMenuButtons = []
let settm = []

let addm = []
let editm = []
let delm = []

class ArduinoSettings{
    constructor(settingsPath) {
        this.settingsPath = settingsPath
        this.config = JSON.parse(fs.readFileSync(this.settingsPath).toString().trim())
        
        this.addb = false
        this.delb = false

        this.mainmenu
        this.remenu
        this.termmenu
        this.servmenu
        this.settmenu

        this.addmenu
        this.editmenu
        this.delmenu

        this.mus = [this.mainmenu, this.remenu, this.termmenu, this.servmenu, this.settmenu, this.addmenu, this.editmenu, this.delmenu]
        this.text = ['Главное меню', 'Реле', 'Температура', 'Сервоприводы', 'Настройки', 'Добавить', 'Редактирование', 'Удалить']
        
        this.update()
    }
    
    preview(ctx, id = 0){
        ctx.deleteMessage()
        ctx.reply(this.text[id], this.mus[id])
    }
    
    add(obj, name, id){
        const objId = this.config[obj].find((ob) => ob['id'] === id);
        if(objId >-1) {
            this.config[obj][objId].name = name
        }else{
            this.config[obj].push({id, name})
        }
        this.save()
        this.update()
    }
    
    delete(obj, id){
        const objId = this.config[obj].find((ob) => ob['id'] === id);
        if(objId > -1){
            delete this.config[obj]
        }
        this.save()
        this.update()
    }
    
    edit(obj, name, id){
        this.config[obj].forEach((ob) => {
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
        fs.writeFileSync(this.settingsPath, JSON.stringify(this.config))
    }
    
    update(){

        new Promise((resolve, reject) => {
            this.config = JSON.parse(fs.readFileSync(this.settingsPath).toString().trim())
            
            mainMenuButtons = []
            relMenuButtons = []
            termMenuButtons = []
            servMenuButtons = []
            settm = []
            
            if(this.config.rel.length){
                mainMenuButtons.push(Markup.callbackButton('Реле ⚡', 'relm'))

                this.config.rel.forEach(function(rel, index, array){
                    relMenuButtons.push(Markup.callbackButton(rel.name, 'rel*'+rel.id))
                })
                
                relMenuButtons.push(Markup.callbackButton('Гл. меню', '0'))
            }
            if(this.config.term.length){
                mainMenuButtons.push(Markup.callbackButton('Температура 🌡️️', 'termm'))

                this.config.term.forEach((term, index, array) =>{
                    termMenuButtons.push(Markup.callbackButton(term.name, 'term*'+term.id))
                })
                
                termMenuButtons.push(Markup.callbackButton('Гл. меню', '0'))
            }
            if(this.config.serv.length){
                mainMenuButtons.push(Markup.callbackButton('Серваки', 'servm'))

                this.config.serv.forEach((serv, index, array) => {
                    servMenuButtons.push(Markup.callbackButton(serv.name, 'serv*'+serv.id))
                })
                
                servMenuButtons.push(Markup.callbackButton('Гл. меню', '0'))
            }
            
            editm.push(Markup.callbackButton('Сменить пароль', 'editp'))
            editm.push(Markup.callbackButton('Гл. меню', '0'))
            
            mainMenuButtons.push(Markup.callbackButton('Настройки', '4'))
            settm.push(Markup.callbackButton('Добавить', 'add'))
            settm.push(Markup.callbackButton('Изменить', 'edit'))
            settm.push(Markup.callbackButton('Удалить', 'delete'))
            settm.push(Markup.callbackButton('Гл. меню', '0'))
            
            mainMenuButtons.push(Markup.callbackButton('Камера', 'cam'))
            
            resolve()
        }).then(() => {
            this.mainmenu = Markup.inlineKeyboard(mainMenuButtons).extra()
            this.remenu = Markup.inlineKeyboard(relMenuButtons).extra()
            this.termmenu = Markup.inlineKeyboard(termMenuButtons).extra()
            this.servmenu = Markup.inlineKeyboard(servMenuButtons).extra()
            this.settmenu = Markup.inlineKeyboard(settm).extra()
            
            this.addmenu = Markup.inlineKeyboard(addm).extra()
            this.editmenu = Markup.inlineKeyboard(editm).extra()
            this.delmenu = Markup.inlineKeyboard(delm).extra()
            
            this.mus = [ this.mainmenu, this.remenu, this.termmenu, this.servmenu, this.settmenu, this.addmenu, this.editmenu, this.delmenu]
        })
    }

    menu(id) {
        return this.mus[id]
    }
}

module.exports = {
    ArduinoSettings
}