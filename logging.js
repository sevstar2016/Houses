const fs = require('fs');

let c = 'c'

class logining {
        constructor(message, pass, id){
                this.message = message,
                this.pass = pass,
                this.id = id
        }

        
        
        isLogin() {
                console.log(logining.id)
                fs.readFile('test.txt', function (err, data) {
                        if (err) throw err;
                        if(data.toString().includes(logining.id)){
                                return true;
                        }
                        else {
                                return false;
                        }})
                
        }
        login(id, pass, message) {
                var strq = message.split(' ');
                var dd = new Boolean(false)
        
                        setTimeout(() =>{
                                if(strq[1] === pass) { 
                                        fs.readFile('test.txt', function (err, data) {
                                            if (err) throw err;
                                            if(data.toString().includes(id)){
                                                console.log(data.toString())
                                                dd = new Boolean(true)
                                                        if(dd){
                                                                console.log(dd.toString())
                                                                return ('1');
                                                        }else{
                                                                fs.appendFile('test.txt', "\n" + id.toString(), function (err) {
                                                                        if(err) throw err; 
                                                                })
                                                                console.log(dd.toString())
                                                                return ('2');
                                                        }
                                            }})
                                        }
                        })
                        
        }
}

module.exports = {
        logining,
        login
}