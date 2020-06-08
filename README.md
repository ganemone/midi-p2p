## midi-p2p

## Quickstart

- Set up volta as a node version manager: https://volta.sh/
- Install dependencies via `yarn install`
- Start the server via `node server.js`
- Start the client vai `node client.js`

Connect a midi controller or use a virtual midi controller like: https://flit.github.io/projects/midikeys/

Play some notes.

## How it works

`server.js` starts a websocket server on localhost:3000. It listens for incoming midi data and broadcasts to any connected clients.

`client.js` connects to the websocket server and listens for midi messages from the server. Upon receiving the midi messages, the client plays them through a default midi output device. On OSX this will be `Apple DLS Synth` by default.


## Future improvements

So far this has been tested for sending midi between processes on a single machine. In theory, this process could apply in an analogous way as peer to peer between any two IPs visible to eachother.
To test this we can update the destination ip in client.js. See comments




