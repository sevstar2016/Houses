const fs = require('fs');

class Users {
    constructor(){
        fs.readFile('test.txt', (function (err, data) {
            if(err) throw err
            this.users = data.toString().split('\n').slice(1)
            console.log(data.toString())
        }).bind(this))
    }

    addUser(id){
        this.users.push(id)
        fs.appendFile('test.txt', "\n" + id.toString(), function (err) {
            if(err) throw err; 
        })
    }

    includes(id){
        return this.users.includes(id)
    }
}

module.exports = {
    Users
}