const fs = require('fs');

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
                        }})
                
        }

        login(helloMesage = 'Welcome', loginMessage = 'You are already signed in') {
                var strq = this.ctx.message.text.split(' ');
                var pass = this.pass
                var id = this.ctx.message.chat.id
                var ctx = this.ctx
                var dd = false
                if(strq[1] === pass) { 
                        fs.readFile('test.txt', function (err, data) {
                                if (err) throw err;
                                if(data.toString().includes(id.toString())){
                                        dd = true
                                }
                                if(dd === true){
                                        ctx.reply(loginMessage)
                                }
                                else{
                                        fs.appendFile('test.txt', "\n" + id.toString(), function (err) {
                                        if(err) throw err; 
                                        })
                                        ctx.reply(helloMesage)
                                }
                        })
                }
                else {

                }
                        
        }
}

module.exports = {
        logining
}