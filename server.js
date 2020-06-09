const jazz = require('jazz-midi');
const inquirer = require('inquirer');
const io = require('socket.io')();
const midi = new jazz.MIDI();
const {Input, Output} = require('midi');

const input = new Input();
 
// Count the available input ports.
const inputPortCount = input.getPortCount();
const inputOptions = [];
let i = 0;
while (i < inputPortCount) {
  inputOptions.push(input.getPortName(i));
  i++;
}

inquirer.prompt([
  {
    type: 'list',
    name: 'port',
    message: 'Select an input source',
    choices: inputOptions.map((name, index) => {
      return {
        name, 
        value: index,
      }
    })
  }
]).then((result) => {
  const {port} = result;
  const res = midi.MidiInOpen(0, function(t, msg){
    io.emit('midi', msg);
  });

  if (!res) {
    throw new Error(`Could not open MIDI-In port ${port}`);
  } else {
    console.log(`Opened MIDI-In connection to ${res}`);
  }
})

io.on('connection', socket => { 
  console.log('Connected to client');
});
// if communicating p2p the host will need to configure their
// machine to accept incoming connections on this port.
// The port is arbitrary and can be changed or set as an input
io.listen(3000);


