const bonjour = require('bonjour')()
const express = require('express')
const app = express()

const PORT = 3000;

bonjour.find({ type: 'gru' }, (service) => {
    console.log('found a gru server', service)
})

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