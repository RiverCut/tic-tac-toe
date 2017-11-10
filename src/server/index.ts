
require('dotenv').config();

import { Server } from 'rivercut';

import { TicTacToeRoom } from './tictactoe.room';

const server = new Server({ roomsPerWorker: 1, namespace: 'tictactoegame', resetStatesOnReboot: true });

server.init(process.env.DEEPSTREAM_URL, {});

server.registerRoom('tictactoe', TicTacToeRoom, {});

server.login({})
  .then(() => {
    console.log(`Logged In - TicTacToe - ${server.uid}`);
  });
