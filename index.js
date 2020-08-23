const bonjour = require('bonjour')()
const express = require('express')
const { Board, Led } = require('johnny-five')
const board = new Board()
const { createStore } = require('redux')
const app = express()


const PORT = 3000

bonjour.find({ type: 'gru' }, (service) => {
    console.log('found a gru server', service)
})

//Store
const s = {
    led: {
        pin: 13,
        value: 0
    }
};

function arduino(state = s, action) {
    switch (action.type) {
        case 'LED_TOGGLE':
            if (state.led.value === 0)
                state.led.value = 255
            if (state.led.value === 255)
                state.led.value = 0
            return state
        default:
            return state
    }
}

let store = createStore(arduino)

//Server
app.get('/led', (req, res) => {
    res.send('Hello World');
})

app.listen(PORT, () => {
    bonjour.publish({
        name: 'Gru Minion Manager',
        type: 'gru',
        port: PORT
    })
})

//Board
board.on('ready', () => {
    
    const led = new Led(13);
    led.blink()
})

