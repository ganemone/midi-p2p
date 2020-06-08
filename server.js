const jazz = require('jazz-midi');
const midi = new jazz.MIDI();
const io = require('socket.io')();
io.on('connection', socket => { 
  console.log('Connected to client');
});
// if communicating p2p the host will need to configure their
// machine to accept incoming connections on this port.
// The port is arbitrary and can be changed or set as an input
io.listen(3000);

const res = midi.MidiInOpen(0, function(t, msg){
  io.emit('midi', msg);
});

if (!res) {
  throw new Error('Could not open default MIDI-In port');
}

