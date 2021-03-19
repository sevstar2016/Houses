const { Telegraf } = require('telegraf');
var Gpio = require('onoff').Gpio
var LED = new Gpio(4, 'out')

const bot = new Telegraf('1615771001:AAF522v6iLHQBChZdvx-kTJ9mmxg6aubor4')

bot.start( ctx => ctx.reply(`
`))

bot.hears('ping', async (ctx) => {
        blinkLED()
})

function blinkLED() {
        if (LED.readSync() === 0) { 
          LED.writeSync(1)
        } else {
          LED.writeSync(0)
        }
}


function endBlink() { 
        LED.writeSync(0)
        LED.unexport()
}

bot.launch()