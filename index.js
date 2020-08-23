const bonjour = require('bonjour')()
const express = require('express')
const { createStore } = require('redux')
const app = express()


const PORT = 3000

bonjour.find({ type: 'gru' }, (service) => {
    console.log('found a gru server', service)
})

//Store
const state = {
    led: {
        pin: 13,
        value: 0
    }
};

function arduino(state = state, action) {
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

