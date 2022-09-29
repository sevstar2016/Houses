const { Users } = require("./users.js")

class logining {
    constructor(pass) {
        // this.ctx = ctx
        this.pass = pass
        this.users = new Users();
    }

    isLogin(ctx) {
        let id = ''
        try{
            id = ctx.callbackQuery.message.chat.id.toString()
        }
        catch {
            id = ctx.message.chat.id.toString()
        }
        console.log(this.users)
        return this.users.includes(id)
    }

    login(ctx, helloMesage = 'Welcome', loginMessage = 'You are already signed in') {
        var strq = ctx.message.text.split(' ');
        var pass = this.pass
        var id = ctx.message.chat.id.toString()
        if (strq[1] === pass) {
            if (this.users.includes(id)) {
                ctx.reply(loginMessage)
            }
            else {
                this.users.addUser(id)
                ctx.reply(helloMesage)
            }
        }

    }

    delete(ctx){
        let k = 0;
        for(let i = 0; i <= 100; i++ ){
            k =  ctx.message.message_id-i;
        ctx.deleteMessage(k)
        }
    }
}

module.exports = {
    logining
}