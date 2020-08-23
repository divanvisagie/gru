const bonjour = require('bonjour')()
const express = require('express')
const { Board, Led } = require('johnny-five')
const board = new Board()
const { createStore } = require('redux')
const app = express()

const PORT = 3000

bonjour.find({ type: 'http' }, (service) => {
    console.log('found a gru server', service)
})

//Store
let s = {
    led: {
        pin: 13,
        value: 0
    }
};

function arduino(state = s, action) {
    console.log(state)
    switch (action.type) {
        case 'LED_TOGGLE':
            console.log('toggle', state.led.value)
            console.log('toggle to', state.led.value)
            return {
                led: {
                    pin: state.led.pin,
                    value: state.led.value === 0 ? 1 : 0
                }
            };
        default:
            return state
    }
}

let store = createStore(arduino)

//Server
app.get('/led', (req, res) => {
    store.dispatch({ type: 'LED_TOGGLE' })
    const led = store.getState().led


    res.send(`state is ${led.value}`)
})

app.listen(PORT, () => {
    bonjour.publish({
        name: 'Gru Minion Manager',
        type: 'http',
        host: 'gru.local',
        port: PORT
    })
})

//Board
board.on('ready', () => {
    const state = store.getState()
    const led = new Led(parseInt(state.led.pin, 10))

    store.subscribe(() => {
        const state = store.getState()
        state.led.value === 0 ? led.off() : led.on()
    })
})

