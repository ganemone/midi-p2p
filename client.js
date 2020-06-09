const io = require('socket.io-client');
const inquirer = require('inquirer');
// Update this value based on your desired destination IP
const jazz = require('jazz-midi');
const {Input, Output} = require('midi');
const midi = new jazz.MIDI();
const output = new Output();

// Count the available output ports.
const outputPortCount = output.getPortCount();
const outputOptions = ['System Default'];
let j = 0;
while (j < outputPortCount) {
  outputOptions.push(output.getPortName(j));
  j++;
}

inquirer.prompt([
  {
    type: 'list',
    name: 'port',
    message: 'Select an output source',
    choices: outputOptions.map((name, index) => {
      return {
        name, 
        value: index,
      }
    })
  }
]).then((result) => {
  const {port} = result;
  const outName = midi.MidiOutOpen(port);
  if(!outName) { 
    throw new Error('Could not open out')
  } else {
    console.log(`Opened MidiOut connection to ${outName}`)
  }
  const socket = io('http://localhost:3000');
  socket.on('connect', () => {
    console.log('Connected to server');
    socket.on('midi', data => {
      const [a,b,c] = data;
      midi.MidiOut(a,b,c);
    });
  });
});
