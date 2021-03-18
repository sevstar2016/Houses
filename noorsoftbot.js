const { Telegraf } = require('telegraf');
var Gpio = require('onoff').Gpio
var LED = new Gpio(4, 'out')
var blinkInterval = setInterval(blinkLED, 250)

const bot = new Telegraf('1615771001:AAF522v6iLHQBChZdvx-kTJ9mmxg6aubor4')

bot.start( ctx => ctx.reply(`
`))

bot.hears('ping', async (ctx) => {
        blinkLED()
        endBlink()
})

bot.launch()


function blinkLED() {
        if (LED.readSync() === 0) { 
          LED.writeSync(1)
        } else {
          LED.writeSync(0)
        }
}


function endBlink() { 
        clearInterval(blinkInterval)
        LED.writeSync(0)
        LED.unexport()
}

setTimeout(endBlink, 5000)