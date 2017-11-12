
import { Client } from 'rivercut';

const client = new Client({});

client.init(process.env.DEEPSTREAM_URL, {});

client.login({})
  .then(() => {
    console.log(`Logged In - TicTacToe - Client - ${client.uid}`);

    client.join('tictactoe')
      .then((data) => {
        console.log('Joined tictactoe!', data);
      });
  })
  .catch(err => {
    console.error(err);
  });

