const fs = require('fs');
const { Telegraf } = require('telegraf');

let c = 'c'

class logining {
        constructor(ctx, pass){
                this.ctx = ctx,
                this.pass = pass
        }

        
        
        isLogin(func) {
                console.log(this.ctx.message.chat.id)
                var id = this.ctx.message.chat.id
                fs.readFile('test.txt', function (err, data) {
                        if (err) throw err;
                        if(data.toString().includes(id.toString())){
                                func()
                        }
                        else {
                        }})
                
        }
        login(helloMesage = 'Welcome', loginMessage = 'You are already signed in') {
                var strq = this.ctx.message.text.split(' ');
                var pass = this.pass
                var id = this.ctx.message.chat.id
                var ctx = this.ctx
                var dd = new Boolean(false)
                if(strq[1] === pass) { 
                        fs.readFile('test.txt', function (err, data) {
                                if (err) throw err;
                                if(data.toString().includes(id.toString())){
                                        console.log(data.toString())
                                        dd = new Boolean(true)
                                }
                                if(dd === true){
                                        console.log(dd.toString())
                                        ctx.reply(loginMessage)
                                }else{
                                        fs.appendFile('test.txt', "\n" + id.toString(), function (err) {
                                        if(err) throw err; 
                                        })
                                        console.log(dd.toString())
                                        ctx.reply(helloMesage)
                                }
                        })
                }
                        
        }
}

module.exports = {
        logining
}