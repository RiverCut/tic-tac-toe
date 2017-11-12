
require('dotenv').config();

import { Server } from 'rivercut';

import { TicTacToeRoom } from './tictactoe.room';

const server = new Server({ roomsPerWorker: 1, namespace: 'tictactoegame', resetStatesOnReboot: true });

server.init(process.env.DEEPSTREAM_URL, {});

server.registerRoom('tictactoe', TicTacToeRoom, {});

server.login({ token: process.env.DEEPSTREAM_TOKEN })
  .then(() => {
    console.log(`Logged In - TicTacToe - Server - ${server.uid}`);
  })
  .catch(err => {
    console.error(err);
  });

process.on('unhandledRejection', (e) => console.error(e));
process.on('uncaughtException', (e) => console.error(e));
