const bonjour = require('bonjour')();

const port = 3000;

bonjour.publish({
    name: 'Gru Minion Manager',
    type: 'gru',
    port
});

bonjour.find({ type: 'gru' }, (service) => {
    console.log('found a gru server', service)
});

bonjour.find({ type: '' }, (service) => {
    console.log('>> server', service)
});