const { Users } = require("./users.js")

class logining {
    constructor(pass) {
        // this.ctx = ctx
        this.pass = pass
        this.users = new Users();
    }

    isLogin(ctx) {
        let id = ctx.message.chat.id.toString()
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
}

module.exports = {
    logining
}