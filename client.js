const io = require('socket.io-client');
// Update this value based on your desired destination IP
const socket = io('http://localhost:3000');
const jazz = require('jazz-midi');
const midi = new jazz.MIDI();

const out_name = midi.MidiOutOpen(0);

if(!out_name){ 
  throw new Error('Could not open out')
}

socket.on('connect', () => {
  console.log('Connected to server');
  socket.on('midi', data => {
    const [a,b,c] = data;
    midi.MidiOut(a,b,c);
  })
})

