
import { Client } from 'rivercut';

const client = new Client({});

client.init(process.env.DEEPSTREAM_URL, {});

client.onData$.subscribe(data => console.log('Received:', data));

client.login()
  .then(({ id }) => {
    console.log(`Logged In - TicTacToe - Client - ${id}`);
    return client.join('tictactoe');
  })
  .then(data => {
    console.log('Joined tictactoe!', data);
  })
  .catch(err => {
    console.error(err);
  });
