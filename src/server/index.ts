
require('dotenv').config();

import { Server } from 'rivercut';

import { TicTacToeRoom } from './tictactoe.room';

const server = new Server({
  roomsPerWorker: 3,
  namespace: 'tictactoegame',
  resetStatesOnReboot: true,
  serializeByRoomId: true
});

console.log('Initializing...');
server.init(process.env.DEEPSTREAM_URL, {});

console.log('Registering...');
server.registerRoom('tictactoe', TicTacToeRoom, {});

console.log('Logging in...');
server.login({ token: process.env.DEEPSTREAM_TOKEN })
  .then(() => {
    console.log(`Logged In - TicTacToe - Server - ${server.uid}`);
  })
  .catch(err => {
    console.error(err);
  });

process.on('uncaughtException', (err) => console.error(err));
process.on('unhandledRejection', (err) => console.error(err));
